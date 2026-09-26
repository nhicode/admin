import { useMemo } from 'react'
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { PageHeader } from '@/components/common/PageHeader'
import { Card } from '@/components/common/Card'
import { StatCard } from '@/components/dashboard/StatCard'
import { orders } from '@/data/orders'
import { customers } from '@/data/customers'
import { products } from '@/data/products'
import { salesByCategory, customerGrowth, orderStatusBreakdown, conversionRate } from '@/data/analytics'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { orderStatusLabelMap } from '@/lib/statusStyles'

const PIE_COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#f43f5e', '#0ea5e9', '#8b5cf6', '#ec4899', '#14b8a6']
const STATUS_COLORS: Record<string, string> = {
  pending: '#f59e0b',
  processing: '#3b82f6',
  shipped: '#8b5cf6',
  delivered: '#10b981',
  cancelled: '#f43f5e',
}

export default function Analytics() {
  const totalRevenue = useMemo(() => orders.reduce((sum, o) => sum + o.total, 0), [])

  const topProductsByRevenue = useMemo(() => {
    const revenueByProduct = new Map<string, number>()
    orders.forEach((order) => {
      order.items.forEach((item) => {
        revenueByProduct.set(item.productId, (revenueByProduct.get(item.productId) ?? 0) + item.price * item.quantity)
      })
    })
    return products
      .map((p) => ({ name: p.name, revenue: revenueByProduct.get(p.id) ?? 0 }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 6)
  }, [])

  const orderStatusData = orderStatusBreakdown.map((s) => ({
    name: orderStatusLabelMap[s.status],
    value: s.count,
    color: STATUS_COLORS[s.status],
  }))

  return (
    <div>
      <PageHeader title="Phân tích" subtitle="Chỉ số hoạt động kinh doanh chi tiết" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Doanh thu" value={formatCurrency(totalRevenue)} change={12.4} icon={DollarSign} />
        <StatCard label="Đơn hàng" value={formatNumber(orders.length)} change={8.1} icon={ShoppingCart} />
        <StatCard label="Khách hàng" value={formatNumber(customers.length)} change={5.7} icon={Users} />
        <StatCard label="Tỷ lệ chuyển đổi" value={`${conversionRate}%`} change={1.2} icon={TrendingUp} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">Doanh số theo danh mục</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByCategory} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={40} />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), 'Doanh số']}
                  contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13 }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">Tăng trưởng khách hàng</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={customerGrowth} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={36} />
                <Tooltip
                  formatter={(value: number) => [formatNumber(value), 'Khách hàng mới']}
                  contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13 }}
                />
                <Line type="monotone" dataKey="customers" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">Trạng thái đơn hàng</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={orderStatusData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                  {orderStatusData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={32} wrapperStyle={{ fontSize: 12 }} />
                <Tooltip formatter={(value: number) => [formatNumber(value), 'Đơn hàng']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">Sản phẩm bán chạy nhất</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProductsByRevenue} layout="vertical" margin={{ top: 5, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis type="number" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={110}
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), 'Doanh thu']}
                  contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13 }}
                />
                <Bar dataKey="revenue" radius={[0, 6, 6, 0]} fill="#f59e0b">
                  {topProductsByRevenue.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}
