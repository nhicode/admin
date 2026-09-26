import { Eye } from 'lucide-react'
import { Badge } from '@/components/common/Badge'
import { EmptyState } from '@/components/common/EmptyState'
import { formatCurrency, formatDate } from '@/lib/utils'
import { orderStatusLabelMap, orderStatusToneMap } from '@/lib/statusStyles'
import type { Order } from '@/types'

export function OrderTable({ orders, onView }: { orders: Order[]; onView: (order: Order) => void }) {
  if (orders.length === 0) return <EmptyState message="Không tìm thấy đơn hàng nào" />

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 dark:border-slate-700">
            <th className="py-3 pr-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Mã đơn
            </th>
            <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Khách hàng
            </th>
            <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Ngày đặt
            </th>
            <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Tổng tiền
            </th>
            <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Trạng thái
            </th>
            <th className="py-3 pl-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="py-3 pr-3 font-medium text-slate-800 dark:text-slate-100">{order.id}</td>
              <td className="px-3 py-3 text-slate-600 dark:text-slate-300">{order.customerName}</td>
              <td className="px-3 py-3 text-slate-500 dark:text-slate-400">{formatDate(order.createdAt)}</td>
              <td className="px-3 py-3 font-medium text-slate-800 dark:text-slate-100">{formatCurrency(order.total)}</td>
              <td className="px-3 py-3">
                <Badge tone={orderStatusToneMap[order.status]}>{orderStatusLabelMap[order.status]}</Badge>
              </td>
              <td className="py-3 pl-3 text-right">
                <button
                  onClick={() => onView(order)}
                  className="rounded-control p-1.5 text-slate-400 hover:bg-slate-100 hover:text-primary-600 dark:hover:bg-slate-700"
                  aria-label={`Xem đơn ${order.id}`}
                >
                  <Eye size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
