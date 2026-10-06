import {
  Award,
  BarChart3,
  Briefcase,
  CalendarClock,
  Camera,
  Clapperboard,
  Compass,
  DollarSign,
  Film,
  Gauge,
  Globe,
  Hash,
  Image as ImageIcon,
  Lightbulb,
  LineChart,
  Mail,
  Megaphone,
  MessageCircle,
  Music2,
  Palette,
  PenTool,
  Play,
  Rocket,
  Rss,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Video,
  Wallet,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { createElement, type ReactNode } from 'react'

const icons: Record<string, LucideIcon> = {
  Award,
  BarChart3,
  Briefcase,
  CalendarClock,
  Camera,
  Clapperboard,
  Compass,
  DollarSign,
  Film,
  Gauge,
  Globe,
  Hash,
  Image: ImageIcon,
  Lightbulb,
  LineChart,
  Mail,
  Megaphone,
  MessageCircle,
  Music2,
  Palette,
  PenTool,
  Play,
  Rocket,
  Rss,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Video,
  Wallet,
  Zap,
}

/** Resolve a CMS icon name to a Lucide icon, falling back to a sparkle. */
export function resolveIcon(name?: string | null): LucideIcon {
  if (!name) return Sparkles
  return icons[name] ?? Sparkles
}

/** Render a CMS-defined icon without creating a component during render. */
export function renderIcon(name: string | null | undefined, className?: string): ReactNode {
  return createElement(resolveIcon(name), { className })
}

/** Icons used for social platforms (lucide has no brand icons). */
const socialIcons: Record<string, LucideIcon> = {
  youtube: Play,
  instagram: Camera,
  tiktok: Music2,
  facebook: Users,
  x: Hash,
  linkedin: Briefcase,
  threads: MessageCircle,
  whatsapp: MessageCircle,
  newsletter: Mail,
  website: Globe,
}

export function socialIcon(platform: string): LucideIcon {
  return socialIcons[platform] ?? Globe
}
