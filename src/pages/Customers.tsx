import { useMemo, useState } from 'react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card } from '@/components/common/Card'
import { SearchInput } from '@/components/common/SearchInput'
import { Select } from '@/components/common/Select'
import { Pagination } from '@/components/common/Pagination'
import { CustomerTable } from '@/components/customers/CustomerTable'
import { customers } from '@/data/customers'
import { useDebounce } from '@/hooks/useDebounce'
import { usePagination } from '@/hooks/usePagination'

export default function Customers() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = useMemo(() => {
    let result = customers.filter(
      (c) =>
        c.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        c.email.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    if (statusFilter !== 'all') result = result.filter((c) => c.status === statusFilter)
    return result
  }, [debouncedSearch, statusFilter])

  const { page, totalPages, pageItems, goToPage, setPage } = usePagination(filtered, 8)

  return (
    <div>
      <PageHeader title="Khách hàng" subtitle={`${customers.length} khách hàng`} />

      <Card>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput value={search} onChange={setSearch} placeholder="Tìm theo tên hoặc email..." />
          <Select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setPage(1)
            }}
            options={[
              { value: 'all', label: 'Tất cả trạng thái' },
              { value: 'active', label: 'Hoạt động' },
              { value: 'inactive', label: 'Ngừng' },
            ]}
            className="sm:w-48"
          />
        </div>

        <CustomerTable customers={pageItems} />

        {filtered.length > 0 && (
          <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} totalItems={filtered.length} pageSize={8} />
        )}
      </Card>
    </div>
  )
}
