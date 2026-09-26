export type Status = 'active' | 'inactive'

export interface Category {
  id: string
  name: string
  description: string
  status: Status
  productCount: number
  createdAt: string
}

export interface Product {
  id: string
  name: string
  sku: string
  categoryId: string
  price: number
  stock: number
  status: Status
  image: string
  createdAt: string
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  customerId: string
  customerName: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  paymentMethod: string
  createdAt: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  totalOrders: number
  totalSpent: number
  status: Status
  joinedAt: string
}

export interface RevenuePoint {
  date: string
  revenue: number
  orders: number
}

export interface SalesByCategory {
  category: string
  value: number
}

export interface CustomerGrowthPoint {
  month: string
  customers: number
}

export interface OrderStatusCount {
  status: OrderStatus
  count: number
}

export interface Message {
  id: string
  customerId: string
  customerName: string
  avatar: string
  subject: string
  preview: string
  body: string
  read: boolean
  createdAt: string
}

export type DateRangeFilter = '7d' | '30d' | '3m' | '12m'

export interface PaginationState {
  page: number
  pageSize: number
}

export type SortDirection = 'asc' | 'desc'

export interface SortState<T extends string = string> {
  field: T
  direction: SortDirection
}

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  type: ToastType
  message: string
}
