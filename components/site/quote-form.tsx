'use client'

import { useState } from 'react'
import { Megaphone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const types = [
  { value: 'sponsored', label: 'Sponsored YouTube video' },
  { value: 'review', label: 'Product review / unboxing' },
  { value: 'website-advertising', label: 'Website advertising' },
  { value: 'social-campaign', label: 'Social media campaign' },
  { value: 'event', label: 'Event / appearance' },
  { value: 'ambassador', label: 'Brand ambassador' },
  { value: 'youtube-services', label: 'YouTube services' },
  { value: 'other', label: 'Other' },
]

export function QuoteForm({ source = 'advertise' }: { source?: string }) {
  const [type, setType] = useState('sponsored')
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError(null)
    const fd = new FormData(e.currentTarget)
    const body = {
      brandName: String(fd.get('brandName') || ''),
      contactName: String(fd.get('contactName') || ''),
      email: String(fd.get('email') || ''),
      phone: String(fd.get('phone') || ''),
      website: String(fd.get('website') || ''),
      budget: String(fd.get('budget') || ''),
      type,
      message: String(fd.get('message') || ''),
      source,
    }
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error((await res.json().catch(() => null))?.error || 'Failed to send')
      setStatus('ok')
      ;(e.target as HTMLFormElement).reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (status === 'ok') {
    return (
      <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
          <Megaphone className="size-6" />
        </span>
        <p className="mt-4 text-lg font-bold">Enquiry sent — thank you!</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Our team will send a tailored proposal within 24–48 hours. Check your inbox.
        </p>
        <Button variant="outline" className="mt-4 rounded-full" onClick={() => setStatus('idle')}>
          Send another enquiry
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="q-brand">Brand / company *</Label>
          <Input id="q-brand" name="brandName" required placeholder="e.g. Amapiano Records" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="q-contact">Your name *</Label>
          <Input id="q-contact" name="contactName" required placeholder="Full name" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="q-email">Email *</Label>
          <Input id="q-email" name="email" type="email" required placeholder="you@brand.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="q-phone">Phone</Label>
          <Input id="q-phone" name="phone" placeholder="+27 …" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2 sm:col-span-1">
          <Label htmlFor="q-website">Website</Label>
          <Input id="q-website" name="website" placeholder="https://…" />
        </div>
        <div className="space-y-2 sm:col-span-1">
          <Label htmlFor="q-budget">Budget range</Label>
          <Input id="q-budget" name="budget" placeholder="e.g. R10k–R25k" />
        </div>
        <div className="space-y-2 sm:col-span-1">
          <Label>Opportunity *</Label>
          <Select value={type} onValueChange={(v) => setType(v || 'sponsored')}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {types.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="q-message">Tell us about the campaign *</Label>
        <Textarea id="q-message" name="message" required rows={5} placeholder="Goals, audience, timeline, deliverables…" />
      </div>
      {status === 'error' ? <p className="text-sm font-medium text-destructive">{error}</p> : null}
      <Button type="submit" disabled={status === 'sending'} className="w-full rounded-full sm:w-auto">
        <Megaphone className="size-4" />
        {status === 'sending' ? 'Sending…' : 'Request a quote'}
      </Button>
      <p className="text-xs text-muted-foreground">We reply within 24–48 hours. No spam — just a tailored proposal.</p>
    </form>
  )
}
