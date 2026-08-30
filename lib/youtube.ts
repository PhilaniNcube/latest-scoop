export async function resolveChannelId(handle: string, apiKey: string) {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${encodeURIComponent(handle)}&key=${apiKey}`,
    { cache: 'no-store' },
  )
  const data = await res.json()
  return data.items?.[0]?.id as string | undefined
}

export async function fetchChannelStats(channelId: string, apiKey: string) {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${apiKey}`,
    { next: { tags: ['youtube-stats'] } },
  )
  const data = await res.json()
  return data.items?.[0]
}

export async function fetchRecentVideos(channelId: string, apiKey: string, max = 12) {
  const uploadsPlaylist = `UU${channelId.slice(2)}`
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylist}&maxResults=${max}&key=${apiKey}`,
    { next: { tags: ['videos'] } },
  )
  const data = await res.json()
  return data.items ?? []
}
