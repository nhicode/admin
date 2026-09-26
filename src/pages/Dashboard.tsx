import { useMemo, useState } from 'react'
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { StatCard } from '@/components/dashboard/StatCard'
import { RevenueChart } from '@/components/dashboard/RevenueChart'
import { RecentOrders } from '@/components/dashboard/RecentOrders'
import { TopProducts } from '@/components/dashboard/TopProducts'
import { orders } from '@/data/orders'
import { customers } from '@/data/customers'
import { products } from '@/data/products'
import { getRevenueForRange } from '@/data/analytics'
import { formatCurrency, formatNumber } from '@/lib/utils'
import type { DateRangeFilter } from '@/types'

export default function Dashboard() {
  const [range, setRange] = useState<DateRangeFilter>('30d')
  const revenueData = useMemo(() => getRevenueForRange(range), [range])

  const totalRevenue = useMemo(() => orders.reduce((sum, o) => sum + o.total, 0), [])
  const recentOrders = useMemo(
    () => [...orders].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, 5),
    []
  )

  const topProducts = useMemo(() => {
    const soldCount = new Map<string, number>()
    orders.forEach((order) => {
      order.items.forEach((item) => {
        soldCount.set(item.productId, (soldCount.get(item.productId) ?? 0) + item.quantity)
      })
    })
    return products
      .map((p) => ({ ...p, sold: soldCount.get(p.id) ?? 0 }))
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5)
  }, [])

  return (
    <div>
      <PageHeader title="Tổng quan" subtitle="Số liệu hoạt động kinh doanh của bạn" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Doanh thu" value={formatCurrency(totalRevenue)} change={12.4} icon={DollarSign} />
        <StatCard label="Đơn hàng" value={formatNumber(orders.length)} change={8.1} icon={ShoppingCart} />
        <StatCard label="Khách hàng" value={formatNumber(customers.length)} change={-2.3} icon={Users} />
        <StatCard label="Sản phẩm" value={formatNumber(products.length)} change={4.6} icon={Package} />
      </div>

      <div className="mt-4">
        <RevenueChart data={revenueData} range={range} onRangeChange={setRange} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RecentOrders orders={recentOrders} />
        <TopProducts products={topProducts} />
      </div>
    </div>
  )
}
