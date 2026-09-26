import { Modal } from '@/components/common/Modal'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { Select } from '@/components/common/Select'
import { formatCurrency, formatDate } from '@/lib/utils'
import { orderStatusLabelMap, orderStatusToneMap } from '@/lib/statusStyles'
import type { Order, OrderStatus } from '@/types'

interface OrderDetailModalProps {
  open: boolean
  onClose: () => void
  order: Order | null
  onStatusChange: (orderId: string, status: OrderStatus) => void
}

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: 'pending', label: 'Chờ xử lý' },
  { value: 'processing', label: 'Đang xử lý' },
  { value: 'shipped', label: 'Đang giao' },
  { value: 'delivered', label: 'Đã giao' },
  { value: 'cancelled', label: 'Đã hủy' },
]

export function OrderDetailModal({ open, onClose, order, onStatusChange }: OrderDetailModalProps) {
  if (!order) return null

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Đơn hàng ${order.id}`}
      size="lg"
      footer={
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Khách hàng</p>
            <p className="font-medium text-slate-800 dark:text-slate-100">{order.customerName}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Ngày đặt</p>
            <p className="font-medium text-slate-800 dark:text-slate-100">{formatDate(order.createdAt)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Thanh toán</p>
            <p className="font-medium text-slate-800 dark:text-slate-100">{order.paymentMethod}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-slate-500 dark:text-slate-400">Trạng thái</p>
            <Select
              value={order.status}
              onChange={(e) => onStatusChange(order.id, e.target.value as OrderStatus)}
              options={statusOptions}
              className="!py-1.5"
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">Sản phẩm</p>
          <div className="flex flex-col divide-y divide-slate-100 rounded-control border border-slate-100 dark:divide-slate-700 dark:border-slate-700">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between px-3 py-2.5 text-sm">
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-100">{item.productName}</p>
                  <p className="text-xs text-slate-400">Số lượng: {item.quantity}</p>
                </div>
                <p className="font-medium text-slate-800 dark:text-slate-100">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-700">
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">Tổng cộng</span>
          <span className="text-lg font-semibold text-slate-900 dark:text-white">{formatCurrency(order.total)}</span>
        </div>

        <div>
          <Badge tone={orderStatusToneMap[order.status]}>{orderStatusLabelMap[order.status]}</Badge>
        </div>
      </div>
    </Modal>
  )
}
