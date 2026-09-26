import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card } from '@/components/common/Card'
import { cn, formatCurrency, formatDateShort } from '@/lib/utils'
import type { DateRangeFilter, RevenuePoint } from '@/types'

const ranges: { value: DateRangeFilter; label: string }[] = [
  { value: '7d', label: '7 ngày' },
  { value: '30d', label: '30 ngày' },
  { value: '3m', label: '3 tháng' },
  { value: '12m', label: '12 tháng' },
]

interface RevenueChartProps {
  data: RevenuePoint[]
  range: DateRangeFilter
  onRangeChange: (range: DateRangeFilter) => void
}

export function RevenueChart({ data, range, onRangeChange }: RevenueChartProps) {
  const tickInterval = Math.max(Math.floor(data.length / 6), 1)

  return (
    <Card>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Doanh thu</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Tổng doanh thu theo thời gian</p>
        </div>
        <div className="flex gap-1 rounded-control bg-slate-100 p-1 dark:bg-slate-900">
          {ranges.map((r) => (
            <button
              key={r.value}
              onClick={() => onRangeChange(r.value)}
              className={cn(
                'rounded-[8px] px-2.5 py-1.5 text-xs font-medium transition-colors',
                range === r.value
                  ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-200 dark:stroke-slate-700" />
            <XAxis
              dataKey="date"
              tickFormatter={formatDateShort}
              interval={tickInterval}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `$${v >= 1000 ? `${Math.round(v / 1000)}k` : v}`}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              width={48}
            />
            <Tooltip
              formatter={(value: number) => [formatCurrency(value), 'Doanh thu']}
              labelFormatter={(label: string) => formatDateShort(label)}
              contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13 }}
            />
            <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2} fill="url(#revenueGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
