'use client'

import { useState } from 'react'
import { Mail, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export function NewsletterForm({ source = 'website', className }: { source?: string; className?: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError(null)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })
      if (!res.ok) throw new Error((await res.json().catch(() => null))?.error || 'Could not subscribe')
      setStatus('ok')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (status === 'ok') {
    return (
      <p className={cn('rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-600 dark:text-emerald-400', className)}>
        You&apos;re on the list — welcome to the scoop. 🎉
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className={cn('w-full max-w-md', className)}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            aria-label="Email address"
            className="h-9 pl-9"
          />
        </div>
        <Button type="submit" disabled={status === 'sending'} className="h-9 rounded-full">
          <Send className="size-3.5" />
          {status === 'sending' ? 'Joining…' : 'Subscribe'}
        </Button>
      </div>
      {error ? <p className="mt-2 text-xs font-medium text-destructive">{error}</p> : null}
      <p className="mt-2 text-xs text-muted-foreground">Creator tips and network news. No spam, unsubscribe anytime.</p>
    </form>
  )
}
