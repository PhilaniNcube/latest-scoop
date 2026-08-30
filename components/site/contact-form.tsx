'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const types = [
  { value: 'sponsored', label: 'Sponsored segment' },
  { value: 'review', label: 'Product review' },
  { value: 'event', label: 'Event / appearance' },
  { value: 'ambassador', label: 'Brand ambassador' },
  { value: 'other', label: 'Other' },
] as const

export function ContactForm() {
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
      type,
      message: String(fd.get('message') || ''),
    }
    try {
      const res = await fetch('/api/inquiries', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
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
        <p className="text-lg font-bold">Thanks — we got your inquiry! 🎉</p>
        <p className="mt-2 text-sm text-muted-foreground">We&apos;ll be in touch within 24–48 hours. Keep an eye on {String.fromCharCode(9993)} your inbox.</p>
        <Button variant="outline" className="mt-4 rounded-full" onClick={() => setStatus('idle')}>
          Send another
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="brandName">Brand / company *</Label>
          <Input id="brandName" name="brandName" required placeholder="e.g. Amapiano Records" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactName">Your name *</Label>
          <Input id="contactName" name="contactName" required placeholder="Full name" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" required placeholder="you@brand.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" placeholder="+27 ..." />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input id="website" name="website" placeholder="https://…" />
        </div>
        <div className="space-y-2">
          <Label>Partnership type *</Label>
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
        <Label htmlFor="message">Tell us about the opportunity *</Label>
        <Textarea id="message" name="message" required rows={5} placeholder="Goals, budget range, timeline, deliverables…" />
      </div>
      {status === 'error' && <p className="text-sm font-medium text-destructive">{error}</p>}
      <Button type="submit" disabled={status === 'sending'} className="w-full rounded-full sm:w-auto">
        {status === 'sending' ? 'Sending…' : 'Send inquiry'}
      </Button>
      <p className="text-xs text-muted-foreground">We reply within 24–48h. No spam — just the scoop.</p>
    </form>
  )
}
