import Link from 'next/link'

import { SOCIAL_PLATFORM_LABELS } from '@/lib/constants'
import type { SocialLink } from '@/lib/types'
import { cn } from '@/lib/utils'
import { socialIcon } from './icon'

const labels = SOCIAL_PLATFORM_LABELS as Record<string, string>

export function SocialLinks({
  links,
  className,
  size = 'default',
}: {
  links: SocialLink[]
  className?: string
  size?: 'default' | 'sm'
}) {
  if (!links?.length) return null
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {links.map((link) => {
        const Icon = socialIcon(link.platform)
        const isExternal = link.url.startsWith('http')
        return (
          <Link
            key={`${link.platform}-${link.url}`}
            href={link.url}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className={cn(
              'inline-flex items-center gap-2 rounded-full border bg-card font-medium transition hover:border-primary/40 hover:bg-muted',
              size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm',
            )}
          >
            <Icon className={size === 'sm' ? 'size-3.5' : 'size-4'} />
            {link.label || labels[link.platform] || link.platform}
          </Link>
        )
      })}
    </div>
  )
}
