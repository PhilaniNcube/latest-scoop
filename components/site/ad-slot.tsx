import { cn } from '@/lib/utils'
import type { ResolvedSiteSettings } from '@/lib/types'

type AdSlotProps = {
  settings: ResolvedSiteSettings
  variant?: 'leaderboard' | 'rectangle' | 'inline'
  slot?: 'websiteSlot' | 'channelSlot' | 'blogSlot'
  className?: string
}

/**
 * Reserved advertising space.
 *
 * Nothing is rendered until an admin enables ads in Payload → Site settings, so
 * the site never looks cluttered before you are ready. The container below is
 * exactly where an AdSense unit should be dropped in.
 */
export function AdSlot({ settings, variant = 'leaderboard', slot = 'websiteSlot', className }: AdSlotProps) {
  if (!settings.ads.enabled) return null
  const slotId = settings.ads[slot] || settings.ads.websiteSlot
  return (
    <div className={cn('mx-auto w-full', className)} aria-label="Advertisement">
      <p className="mb-1.5 text-center text-[10px] font-semibold tracking-[0.2em] text-muted-foreground/70 uppercase">
        Advertisement
      </p>
      <div
        className={cn(
          'flex items-center justify-center rounded-xl border border-dashed bg-muted/30 text-xs text-muted-foreground',
          variant === 'rectangle' && 'min-h-[250px]',
          variant === 'inline' && 'min-h-[90px]',
          variant === 'leaderboard' && 'min-h-[90px] sm:min-h-[110px]',
        )}
        data-ad-client={settings.ads.client || undefined}
        data-ad-slot={slotId || undefined}
      >
        <span className="px-4 text-center">Reserved advertising space</span>
      </div>
    </div>
  )
}
