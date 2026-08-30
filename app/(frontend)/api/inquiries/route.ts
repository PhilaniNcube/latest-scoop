import { getPayload } from 'payload'
import config from '@payload-config'
import { Resend } from 'resend'

export async function POST(req: Request) {
  const body = await req.json()
  const payload = await getPayload({ config })
  const doc = await payload.create({ collection: 'inquiries', data: body })
  if (process.env.RESEND_API_KEY && process.env.RESEND_FROM) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.RESEND_TO || process.env.RESEND_FROM,
      subject: `New partnership inquiry: ${body.brandName}`,
      html: `<p><b>${body.contactName}</b> (${body.email}) — ${body.type}</p><p>${body.message}</p>`,
    })
  }
  return Response.json(doc, { status: 201 })
}
