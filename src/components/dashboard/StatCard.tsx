import type { LucideIcon } from 'lucide-react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Card } from '@/components/common/Card'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string
  change: number
  icon: LucideIcon
}

export function StatCard({ label, value, change, icon: Icon }: StatCardProps) {
  const isPositive = change >= 0

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-control bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
          <Icon size={18} />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-semibold text-slate-900 dark:text-white">{value}</span>
        <span
          className={cn(
            'flex items-center gap-0.5 text-xs font-medium',
            isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
          )}
        >
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(change)}%
        </span>
      </div>
    </Card>
  )
}
