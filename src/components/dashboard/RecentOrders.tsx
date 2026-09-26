import { Link } from 'react-router-dom'
import { Card } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { formatCurrency, formatDate } from '@/lib/utils'
import { orderStatusLabelMap, orderStatusToneMap } from '@/lib/statusStyles'
import type { Order } from '@/types'

export function RecentOrders({ orders }: { orders: Order[] }) {
  return (
    <Card className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Đơn hàng gần đây</h3>
        <Link to="/orders" className="text-xs font-medium text-primary-600 hover:underline dark:text-primary-400">
          Xem tất cả
        </Link>
      </div>
      <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between gap-3 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">{order.customerName}</p>
              <p className="text-xs text-slate-400">
                {order.id} · {formatDate(order.createdAt)}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {formatCurrency(order.total)}
              </span>
              <Badge tone={orderStatusToneMap[order.status]}>{orderStatusLabelMap[order.status]}</Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
