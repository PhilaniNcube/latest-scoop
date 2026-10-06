import { getPayload } from 'payload'
import config from '@payload-config'
import { Resend } from 'resend'

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, string | undefined>
    const name = String(body.name || '').trim()
    const email = String(body.email || '').trim()
    const message = String(body.message || '').trim()

    if (!name || !email || !message) {
      return Response.json({ error: 'Name, email and message are required.' }, { status: 400 })
    }

    const payload = await getPayload({ config })
    const doc = await payload.create({
      collection: 'consultations',
      data: {
        name,
        email,
        phone: body.phone || undefined,
        channelName: body.channelName || undefined,
        channelUrl: body.channelUrl || undefined,
        serviceType: (body.serviceType as never) || 'not-sure',
        budget: body.budget || undefined,
        preferredDate: body.preferredDate ? body.preferredDate : undefined,
        preferredTime: body.preferredTime || undefined,
        message,
        source: body.source || 'contact',
      },
    })

    if (process.env.RESEND_API_KEY && process.env.RESEND_FROM) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails
        .send({
          from: process.env.RESEND_FROM,
          to: process.env.RESEND_TO || process.env.RESEND_FROM,
          replyTo: email,
          subject: `New consultation request: ${name}`,
          html: `
            <h2>New consultation request</h2>
            <p><b>${name}</b> — <a href="mailto:${email}">${email}</a></p>
            <p><b>Interested in:</b> ${body.serviceType || 'not sure'}</p>
            ${body.channelName ? `<p><b>Channel:</b> ${body.channelName}${body.channelUrl ? ` (${body.channelUrl})` : ''}</p>` : ''}
            ${body.budget ? `<p><b>Budget:</b> ${body.budget}</p>` : ''}
            ${body.preferredDate ? `<p><b>Preferred date:</b> ${body.preferredDate}</p>` : ''}
            <p>${message}</p>
          `,
        })
        .catch(() => null)
    }

    return Response.json(doc, { status: 201 })
  } catch {
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
