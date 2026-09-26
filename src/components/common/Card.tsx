import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-card border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-800',
        className
      )}
    >
      {children}
    </div>
  )
}
