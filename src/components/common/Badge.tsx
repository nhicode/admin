import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Tone = 'slate' | 'green' | 'red' | 'amber' | 'blue' | 'violet'

const toneClasses: Record<Tone, string> = {
  slate: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
  green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  red: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  violet: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400',
}

export function Badge({ tone = 'slate', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium', toneClasses[tone])}>
      {children}
    </span>
  )
}
