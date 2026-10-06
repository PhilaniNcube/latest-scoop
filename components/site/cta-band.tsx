import Link from 'next/link'
import type { ReactNode } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type CtaAction = {
  label: string
  href: string
  external?: boolean
  variant?: 'default' | 'outline' | 'secondary' | 'ghost'
}

export function CtaBand({
  title,
  description,
  primary,
  secondary,
  children,
  className,
}: {
  title: string
  description?: string
  primary?: CtaAction
  secondary?: CtaAction
  children?: ReactNode
  className?: string
}) {
  return (
    <section className={cn('mx-auto max-w-6xl px-4 py-12 sm:px-6', className)}>
      <div className="overflow-hidden rounded-[1.5rem] border bg-gradient-to-br from-primary via-fuchsia-600 to-amber-400 p-[1px]">
        <div className="rounded-[calc(1.5rem-1px)] bg-card px-6 py-10 text-center sm:px-10 sm:py-12">
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{title}</h2>
          {description ? (
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-[15px]">{description}</p>
          ) : null}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {primary ? (
              <Link
                href={primary.href}
                target={primary.external ? '_blank' : undefined}
                rel={primary.external ? 'noopener noreferrer' : undefined}
                className={buttonVariants({ size: 'lg', variant: primary.variant ?? 'default', className: 'rounded-full' })}
              >
                {primary.label}
              </Link>
            ) : null}
            {secondary ? (
              <Link
                href={secondary.href}
                target={secondary.external ? '_blank' : undefined}
                rel={secondary.external ? 'noopener noreferrer' : undefined}
                className={buttonVariants({ size: 'lg', variant: secondary.variant ?? 'outline', className: 'rounded-full' })}
              >
                {secondary.label}
              </Link>
            ) : null}
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}
