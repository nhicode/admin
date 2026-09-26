import type { OrderStatus, Status } from '@/types'

export const statusToneMap: Record<Status, 'green' | 'slate'> = {
  active: 'green',
  inactive: 'slate',
}

export const statusLabelMap: Record<Status, string> = {
  active: 'Hoạt động',
  inactive: 'Ngừng',
}

export const orderStatusToneMap: Record<OrderStatus, 'amber' | 'blue' | 'violet' | 'green' | 'red'> = {
  pending: 'amber',
  processing: 'blue',
  shipped: 'violet',
  delivered: 'green',
  cancelled: 'red',
}

export const orderStatusLabelMap: Record<OrderStatus, string> = {
  pending: 'Chờ xử lý',
  processing: 'Đang xử lý',
  shipped: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã hủy',
}
