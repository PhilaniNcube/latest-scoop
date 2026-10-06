'use client'

import { useState } from 'react'
import { CalendarClock } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { SERVICE_CATEGORY_LABELS, SERVICE_CATEGORIES } from '@/lib/constants'

const serviceOptions = [
  { value: 'not-sure', label: 'Not sure yet' },
  { value: 'start-channel', label: 'Start a new channel' },
  ...SERVICE_CATEGORIES.map((value) => ({ value, label: SERVICE_CATEGORY_LABELS[value] })),
]

export function ConsultationForm({ source = 'contact' }: { source?: string }) {
  const [serviceType, setServiceType] = useState('not-sure')
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError(null)
    const fd = new FormData(e.currentTarget)
    const body = {
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      phone: String(fd.get('phone') || ''),
      channelName: String(fd.get('channelName') || ''),
      channelUrl: String(fd.get('channelUrl') || ''),
      budget: String(fd.get('budget') || ''),
      preferredDate: String(fd.get('preferredDate') || ''),
      preferredTime: String(fd.get('preferredTime') || ''),
      serviceType,
      message: String(fd.get('message') || ''),
      source,
    }
    try {
      const res = await fetch('/api/consultations', {
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
          <CalendarClock className="size-6" />
        </span>
        <p className="mt-4 text-lg font-bold">Request received!</p>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ll be in touch within 1–2 business days with times for your session.
        </p>
        <Button variant="outline" className="mt-4 rounded-full" onClick={() => setStatus('idle')}>
          Send another request
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="c-name">Your name *</Label>
          <Input id="c-name" name="name" required placeholder="Full name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="c-email">Email *</Label>
          <Input id="c-email" name="email" type="email" required placeholder="you@email.com" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="c-phone">Phone / WhatsApp</Label>
          <Input id="c-phone" name="phone" placeholder="+27 …" />
        </div>
        <div className="space-y-2">
          <Label>What do you need help with? *</Label>
          <Select value={serviceType} onValueChange={(v) => setServiceType(v || 'not-sure')}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {serviceOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="c-channel">Channel / brand name</Label>
          <Input id="c-channel" name="channelName" placeholder="e.g. My Channel" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="c-url">Channel / website URL</Label>
          <Input id="c-url" name="channelUrl" placeholder="https://youtube.com/@…" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="c-date">Preferred date</Label>
          <Input id="c-date" name="preferredDate" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="c-time">Preferred time</Label>
          <Input id="c-time" name="preferredTime" placeholder="Weekday mornings" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="c-budget">Budget (optional)</Label>
          <Input id="c-budget" name="budget" placeholder="e.g. R2 000" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="c-message">Tell us about your goals *</Label>
        <Textarea
          id="c-message"
          name="message"
          required
          rows={5}
          placeholder="Where you are now, where you want to be, and anything you're stuck on…"
        />
      </div>
      {status === 'error' ? <p className="text-sm font-medium text-destructive">{error}</p> : null}
      <Button type="submit" disabled={status === 'sending'} className="w-full rounded-full sm:w-auto">
        <CalendarClock className="size-4" />
        {status === 'sending' ? 'Sending…' : 'Request consultation'}
      </Button>
      <p className="text-xs text-muted-foreground">
        Online scheduling and payments are coming soon. For now we confirm every booking by email.
      </p>
    </form>
  )
}
