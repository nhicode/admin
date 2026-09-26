import type { RevenuePoint, SalesByCategory, CustomerGrowthPoint, OrderStatusCount } from '@/types'
import { categories } from './categories'
import { orders } from './orders'

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

const rand = seededRandom(2024)

// Daily revenue for the last 365 days, newest last (for charting)
export const dailyRevenue: RevenuePoint[] = Array.from({ length: 365 }, (_, i) => {
  const date = new Date(2025, 8, 26)
  date.setDate(date.getDate() - (364 - i))
  const weekday = date.getDay()
  const weekendDip = weekday === 0 || weekday === 6 ? 0.7 : 1
  const seasonal = 1 + 0.3 * Math.sin((i / 365) * Math.PI * 2)
  const base = 1200 * seasonal * weekendDip
  const noise = rand() * 500
  const revenue = Math.round(base + noise)
  const orderCount = Math.max(3, Math.round(revenue / 85))
  return { date: date.toISOString().slice(0, 10), revenue, orders: orderCount }
})

export function getRevenueForRange(range: '7d' | '30d' | '3m' | '12m'): RevenuePoint[] {
  const days = range === '7d' ? 7 : range === '30d' ? 30 : range === '3m' ? 90 : 365
  return dailyRevenue.slice(-days)
}

export const salesByCategory: SalesByCategory[] = categories.map((c) => ({
  category: c.name,
  value: Math.round(rand() * 8000 + 1500),
}))

export const customerGrowth: CustomerGrowthPoint[] = [
  'Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12',
].map((month, i) => ({ month, customers: Math.round(20 + i * 6.5 + rand() * 10) }))

export const orderStatusBreakdown: OrderStatusCount[] = (() => {
  const counts: Record<string, number> = {}
  orders.forEach((o) => {
    counts[o.status] = (counts[o.status] ?? 0) + 1
  })
  return Object.entries(counts).map(([status, count]) => ({
    status: status as OrderStatusCount['status'],
    count,
  }))
})()

export const conversionRate = 3.42 // percent, mock
