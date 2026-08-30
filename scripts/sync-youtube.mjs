import { createClient } from '@libsql/client'
import { readFileSync } from 'fs'

const raw = readFileSync('.env.local', 'utf8').split('\n')
const env = {}
for (const l of raw) { const t = l.trim(); if (!t || t.startsWith('#')) continue; const i = t.indexOf('='); if (i > 0) env[t.slice(0, i).trim()] = t.slice(i + 1).trim() }

const apiKey = env.YOUTUBE_API_KEY
const channelId = env.YOUTUBE_CHANNEL_ID
if (!apiKey || !channelId) { console.error('Missing YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID'); process.exit(1) }

const client = createClient({ url: env.TURSO_DATABASE_URL, authToken: env.TURSO_AUTH_TOKEN })
const uploads = `UU${channelId.slice(2)}`
let pageToken = ''
let synced = 0
let page = 0

console.log(`Syncing channel ${channelId} (playlist ${uploads})...`)

do {
  page++
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploads}&maxResults=50&key=${apiKey}${pageToken ? `&pageToken=${pageToken}` : ''}`
  const res = await fetch(url)
  const data = await res.json()
  if (data.error) { console.error('playlistItems error', data.error); process.exit(1) }
  console.log(`Page ${page}: ${data.items.length} items`)

  const ids = data.items.map(i => i.contentDetails.videoId)
  const statsRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${ids.join(',')}&key=${apiKey}`)
  const stats = await statsRes.json()
  if (stats.error) { console.error('videos error', stats.error); process.exit(1) }
  const byId = new Map(stats.items.map(v => [v.id, v]))

  for (const item of data.items) {
    const vid = item.contentDetails.videoId
    const v = byId.get(vid)
    if (!v) continue
    const doc = {
      youtube_id: vid,
      title: v.snippet.title,
      description: v.snippet.description || null,
      thumbnail: v.snippet.thumbnails?.high?.url || v.snippet.thumbnails?.medium?.url || null,
      published_at: v.snippet.publishedAt,
      duration: v.contentDetails.duration,
      view_count: parseInt(v.statistics.viewCount || '0', 10),
      like_count: parseInt(v.statistics.likeCount || '0', 10),
    }
    const existing = await client.execute({ sql: 'SELECT id FROM videos WHERE youtube_id = ?', args: [vid] })
    const now = new Date().toISOString()
    if (existing.rows[0]) {
      await client.execute({
        sql: 'UPDATE videos SET title=?, description=?, thumbnail=?, published_at=?, duration=?, view_count=?, like_count=?, updated_at=? WHERE youtube_id=?',
        args: [doc.title, doc.description, doc.thumbnail, doc.published_at, doc.duration, doc.view_count, doc.like_count, now, vid],
      })
    } else {
      await client.execute({
        sql: 'INSERT INTO videos (youtube_id, title, description, thumbnail, published_at, duration, view_count, like_count, featured, updated_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)',
        args: [doc.youtube_id, doc.title, doc.description, doc.thumbnail, doc.published_at, doc.duration, doc.view_count, doc.like_count, now, now],
      })
    }
    synced++
  }
  console.log(`  synced ${synced} total`)
  pageToken = data.nextPageToken || ''
  if (synced >= 200) break
} while (pageToken)

console.log(`Done. Synced ${synced} videos.`)
const check = await client.execute('SELECT count(*) as c FROM videos')
console.log('Total in DB:', check.rows[0].c)
