import { getPayload } from 'payload'
import config from '@payload-config'

type PayloadClient = Awaited<ReturnType<typeof getPayload>>

type YTVideo = {
  id: string
  snippet: {
    title: string
    description: string
    publishedAt: string
    thumbnails?: { high?: { url?: string }; medium?: { url?: string }; default?: { url?: string } }
  }
  statistics?: { viewCount?: string; likeCount?: string }
  contentDetails?: { duration?: string }
}

async function resolveChannelId(apiKey: string): Promise<string | undefined> {
  const handle = process.env.YOUTUBE_CHANNEL_HANDLE || '@latestscoop000'
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${encodeURIComponent(handle)}&key=${apiKey}`,
    { cache: 'no-store' },
  )
  const data = await res.json()
  return data.items?.[0]?.id as string | undefined
}

async function syncChannel(opts: {
  channelId: string
  channelDocId: string | number | null
  apiKey: string
  payload: PayloadClient
  max?: number
}): Promise<number> {
  const { channelId, channelDocId, apiKey, payload, max = 200 } = opts
  const uploads = `UU${channelId.slice(2)}`
  let pageToken = ''
  let synced = 0

  do {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploads}&maxResults=50&key=${apiKey}${pageToken ? `&pageToken=${pageToken}` : ''}`
    const res = await fetch(url, { cache: 'no-store' })
    const data = await res.json()
    if (data.error) break

    const items = (data.items ?? []) as { contentDetails: { videoId: string } }[]
    const ids = items.map((i) => i.contentDetails.videoId)
    if (ids.length) {
      const statsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${ids.join(',')}&key=${apiKey}`,
        { cache: 'no-store' },
      )
      const stats = await statsRes.json()
      const byId = new Map<string, YTVideo>((stats.items ?? []).map((v: YTVideo) => [v.id, v]))

      for (const item of items) {
        const vid = item.contentDetails.videoId
        const v = byId.get(vid)
        if (!v) continue
        const doc = {
          youtubeId: vid,
          title: v.snippet.title,
          description: v.snippet.description,
          thumbnail: v.snippet.thumbnails?.high?.url || v.snippet.thumbnails?.medium?.url,
          publishedAt: v.snippet.publishedAt,
          duration: v.contentDetails?.duration,
          viewCount: parseInt(v.statistics?.viewCount || '0', 10),
          likeCount: parseInt(v.statistics?.likeCount || '0', 10),
          ...(channelDocId ? { channel: channelDocId } : {}),
        }
        const existing = await payload.find({
          collection: 'videos',
          where: { youtubeId: { equals: vid } },
          limit: 1,
          depth: 0,
        })
        if (existing.docs[0]) {
          await payload.update({ collection: 'videos', id: existing.docs[0].id, data: doc as never })
        } else {
          await payload.create({ collection: 'videos', data: doc as never })
        }
        synced++
      }
    }

    pageToken = data.nextPageToken || ''
    if (synced >= max) break
  } while (pageToken)

  // Refresh the channel's public stats as well.
  try {
    const chRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`,
      { cache: 'no-store' },
    )
    const chData = await chRes.json()
    const stats = chData.items?.[0]?.statistics
    if (channelDocId && stats) {
      await payload.update({
        collection: 'channels',
        id: channelDocId,
        data: {
          subscriberCount: parseInt(stats.subscriberCount || '0', 10),
          viewCount: parseInt(stats.viewCount || '0', 10),
          videoCount: parseInt(stats.videoCount || '0', 10),
        },
      })
    }
  } catch {
    /* stats are best-effort */
  }

  return synced
}

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET
  if (secret && req.headers.get('authorization') !== `Bearer ${secret}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) return Response.json({ error: 'Missing YOUTUBE_API_KEY' }, { status: 500 })

  const payload = await getPayload({ config })

  const channelsRes = await payload.find({
    collection: 'channels',
    where: { status: { not_equals: 'archived' } } as never,
    limit: 100,
    depth: 0,
  })

  const targets: { docId: string | number | null; channelId: string }[] = channelsRes.docs
    .map((c) => ({ docId: c.id as string | number, channelId: (c.channelId as string | undefined) || '' }))
    .filter((t) => Boolean(t.channelId))

  if (!targets.length) {
    const resolved = process.env.YOUTUBE_CHANNEL_ID || (await resolveChannelId(apiKey))
    if (!resolved) {
      return Response.json({ error: 'No channels to sync and could not resolve the YouTube channel.' }, { status: 404 })
    }
    targets.push({ docId: null, channelId: resolved })
  }

  let synced = 0
  for (const target of targets) {
    synced += await syncChannel({
      channelId: target.channelId,
      channelDocId: target.docId,
      apiKey,
      payload,
    })
  }

  return Response.json({ synced, channels: targets.length })
}
