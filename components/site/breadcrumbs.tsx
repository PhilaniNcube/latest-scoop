import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export type Crumb = { name: string; path: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs font-medium text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={item.path} className="inline-flex items-center gap-1.5">
              {last ? (
                <span className="text-foreground" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-foreground">
                  {item.name}
                </Link>
              )}
              {!last ? <ChevronRight className="size-3 opacity-60" /> : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
