import { useMemo, useState } from 'react'
import { Download } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card } from '@/components/common/Card'
import { SearchInput } from '@/components/common/SearchInput'
import { Select } from '@/components/common/Select'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import { Pagination } from '@/components/common/Pagination'
import { OrderTable } from '@/components/orders/OrderTable'
import { OrderDetailModal } from '@/components/orders/OrderDetailModal'
import { orders as initialOrders } from '@/data/orders'
import { useDebounce } from '@/hooks/useDebounce'
import { usePagination } from '@/hooks/usePagination'
import { useToastStore } from '@/store/toastStore'
import { exportToCsv } from '@/lib/csv'
import type { Order, OrderStatus } from '@/types'

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)
  const [statusFilter, setStatusFilter] = useState('all')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const [viewingOrder, setViewingOrder] = useState<Order | null>(null)
  const { showToast } = useToastStore()

  const filtered = useMemo(() => {
    let result = orders.filter(
      (o) =>
        o.id.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        o.customerName.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    if (statusFilter !== 'all') result = result.filter((o) => o.status === statusFilter)
    if (fromDate) result = result.filter((o) => o.createdAt >= fromDate)
    if (toDate) result = result.filter((o) => o.createdAt <= toDate)
    return [...result].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
  }, [orders, debouncedSearch, statusFilter, fromDate, toDate])

  const { page, totalPages, pageItems, goToPage, setPage } = usePagination(filtered, 8)

  function handleStatusChange(orderId: string, status: OrderStatus) {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)))
    setViewingOrder((prev) => (prev && prev.id === orderId ? { ...prev, status } : prev))
    showToast('Đã cập nhật trạng thái đơn hàng')
  }

  function handleExport() {
    exportToCsv(
      `orders-${new Date().toISOString().slice(0, 10)}.csv`,
      filtered.map((o) => ({
        'Mã đơn': o.id,
        'Khách hàng': o.customerName,
        'Ngày đặt': o.createdAt,
        'Tổng tiền': o.total,
        'Trạng thái': o.status,
        'Thanh toán': o.paymentMethod,
      }))
    )
    showToast(`Đã xuất ${filtered.length} đơn hàng ra CSV`)
  }

  return (
    <div>
      <PageHeader
        title="Đơn hàng"
        subtitle={`${orders.length} đơn hàng`}
        actions={
          <Button variant="secondary" icon={<Download size={16} />} onClick={handleExport}>
            Xuất CSV
          </Button>
        }
      />

      <Card>
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
          <SearchInput value={search} onChange={setSearch} placeholder="Tìm theo mã đơn hoặc khách hàng..." />
          <div className="flex flex-wrap gap-3">
            <Select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setPage(1)
              }}
              options={[
                { value: 'all', label: 'Tất cả trạng thái' },
                { value: 'pending', label: 'Chờ xử lý' },
                { value: 'processing', label: 'Đang xử lý' },
                { value: 'shipped', label: 'Đang giao' },
                { value: 'delivered', label: 'Đã giao' },
                { value: 'cancelled', label: 'Đã hủy' },
              ]}
              className="min-w-[150px]"
            />
            <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="min-w-[150px]" />
            <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="min-w-[150px]" />
          </div>
        </div>

        <OrderTable orders={pageItems} onView={setViewingOrder} />

        {filtered.length > 0 && (
          <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} totalItems={filtered.length} pageSize={8} />
        )}
      </Card>

      <OrderDetailModal
        open={!!viewingOrder}
        onClose={() => setViewingOrder(null)}
        order={viewingOrder}
        onStatusChange={handleStatusChange}
      />
    </div>
  )
}
