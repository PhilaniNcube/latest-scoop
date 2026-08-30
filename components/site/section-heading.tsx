import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = 'left',
}: {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  align?: 'left' | 'center'
}) {
  return (
    <div className={cn('space-y-2', align === 'center' && 'mx-auto max-w-2xl text-center', className)}>
      {eyebrow ? <p className="text-xs font-bold tracking-[0.16em] text-primary">{eyebrow}</p> : null}
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      {description ? <p className="text-sm leading-6 text-muted-foreground sm:text-[15px]">{description}</p> : null}
    </div>
  )
}
