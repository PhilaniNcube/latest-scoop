import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
  className?: string
}) {
  return (
    <section className={cn('relative overflow-hidden border-b bg-muted/30', className)}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_75%_at_20%_0%,hsl(var(--primary)/0.14),transparent_60%),radial-gradient(45%_60%_at_90%_0%,hsl(var(--accent)/0.14),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {eyebrow ? (
          <p className="text-xs font-bold tracking-[0.18em] text-primary uppercase">{eyebrow}</p>
        ) : null}
        <h1 className="mt-2 max-w-3xl text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted-foreground">{description}</p>
        ) : null}
        {children ? <div className="mt-7 flex flex-wrap gap-3">{children}</div> : null}
      </div>
    </section>
  )
}
