import { getPayload } from 'payload'
import config from '@payload-config'
import { Resend } from 'resend'

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, string | undefined>
    const brandName = String(body.brandName || '').trim()
    const contactName = String(body.contactName || '').trim()
    const email = String(body.email || '').trim()
    const message = String(body.message || '').trim()

    if (!brandName || !contactName || !email || !message) {
      return Response.json({ error: 'Please complete all required fields.' }, { status: 400 })
    }

    const payload = await getPayload({ config })
    const doc = await payload.create({
      collection: 'inquiries',
      data: {
        brandName,
        contactName,
        email,
        phone: body.phone || undefined,
        website: body.website || undefined,
        budget: body.budget || undefined,
        type: (body.type as never) || 'other',
        message,
        source: body.source || 'website',
      },
    })

    if (process.env.RESEND_API_KEY && process.env.RESEND_FROM) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails
        .send({
          from: process.env.RESEND_FROM,
          to: process.env.RESEND_TO || process.env.RESEND_FROM,
          replyTo: email,
          subject: `New ${body.type || 'partnership'} enquiry: ${brandName}`,
          html: `
            <h2>New partnership enquiry</h2>
            <p><b>${brandName}</b> — ${contactName} (<a href="mailto:${email}">${email}</a>)</p>
            <p><b>Type:</b> ${body.type || 'other'}</p>
            ${body.budget ? `<p><b>Budget:</b> ${body.budget}</p>` : ''}
            ${body.website ? `<p><b>Website:</b> ${body.website}</p>` : ''}
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
