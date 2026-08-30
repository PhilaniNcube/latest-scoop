import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(req: Request) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}` && process.env.VERCEL !== '1') {
  }
  const apiKey = process.env.YOUTUBE_API_KEY
  const handle = process.env.YOUTUBE_CHANNEL_HANDLE || '@latestscoop000'
  let channelId = process.env.YOUTUBE_CHANNEL_ID
  if (!apiKey) return Response.json({ error: 'Missing YOUTUBE_API_KEY' }, { status: 500 })
  if (!channelId) {
    const r = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${encodeURIComponent(handle)}&key=${apiKey}`)
    const j = await r.json()
    channelId = j.items?.[0]?.id
    if (!channelId) return Response.json({ error: 'Could not resolve channel', data: j }, { status: 404 })
  }
  const uploads = `UU${(channelId as string).slice(2)}`
  let pageToken = ''
  let synced = 0
  const payload = await getPayload({ config })
  do {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploads}&maxResults=50&key=${apiKey}${pageToken ? `&pageToken=${pageToken}` : ''}`
    const res = await fetch(url)
    const data = await res.json()
    if (data.error) return Response.json({ error: data.error }, { status: 500 })
    const ids: string[] = data.items.map((i: { contentDetails: { videoId: string } }) => i.contentDetails.videoId)
    const statsRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${ids.join(',')}&key=${apiKey}`)
    const stats = await statsRes.json()
    const byId = new Map<string, unknown>(stats.items.map((v: { id: string }) => [v.id, v]))
    for (const item of data.items) {
      const vid = (item as { contentDetails: { videoId: string } }).contentDetails.videoId as string
      const v = byId.get(vid) as unknown as { snippet: { title: string; description: string; publishedAt: string; thumbnails: { high: { url: string }; medium: { url: string } } }; statistics: { viewCount: string; likeCount: string }; contentDetails: { duration: string } } | undefined
      if (!v) continue
      const existing = await payload.find({ collection: 'videos', where: { youtubeId: { equals: vid } }, limit: 1 })
      const doc = {
        youtubeId: vid,
        title: v.snippet.title,
        description: v.snippet.description,
        thumbnail: v.snippet.thumbnails?.high?.url || v.snippet.thumbnails?.medium?.url,
        publishedAt: v.snippet.publishedAt,
        duration: v.contentDetails.duration,
        viewCount: parseInt(v.statistics.viewCount || '0', 10),
        likeCount: parseInt(v.statistics.likeCount || '0', 10),
      }
      if (existing.docs[0]) await payload.update({ collection: 'videos', id: existing.docs[0].id, data: doc })
      else await payload.create({ collection: 'videos', data: doc })
      synced++
    }
    pageToken = data.nextPageToken || ''
    if (synced >= 200) break
  } while (pageToken)
  return Response.json({ synced, channelId })
}
