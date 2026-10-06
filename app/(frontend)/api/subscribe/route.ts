import { getPayload } from 'payload'
import config from '@payload-config'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as { email?: string; name?: string; source?: string }
    const email = String(body.email || '').trim().toLowerCase()
    if (!EMAIL_RE.test(email)) {
      return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const payload = await getPayload({ config })
    const existing = await payload.find({
      collection: 'subscribers',
      where: { email: { equals: email } },
      limit: 1,
      depth: 0,
    })

    if (existing.docs[0]) {
      if (existing.docs[0].status === 'unsubscribed') {
        await payload.update({ collection: 'subscribers', id: existing.docs[0].id, data: { status: 'active' } })
      }
      return Response.json({ ok: true, alreadySubscribed: true })
    }

    const doc = await payload.create({
      collection: 'subscribers',
      data: { email, name: body.name || undefined, source: body.source || 'website' },
    })
    return Response.json(doc, { status: 201 })
  } catch {
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
