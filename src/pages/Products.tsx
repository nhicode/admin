import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card } from '@/components/common/Card'
import { SearchInput } from '@/components/common/SearchInput'
import { Select } from '@/components/common/Select'
import { Button } from '@/components/common/Button'
import { Pagination } from '@/components/common/Pagination'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { ProductTable, type ProductSortField } from '@/components/products/ProductTable'
import { ProductModal } from '@/components/products/ProductModal'
import { products as initialProducts } from '@/data/products'
import { categories } from '@/data/categories'
import { useDebounce } from '@/hooks/useDebounce'
import { usePagination } from '@/hooks/usePagination'
import { useToastStore } from '@/store/toastStore'
import type { Product, SortState } from '@/types'

export default function Products() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sort, setSort] = useState<SortState<ProductSortField>>({ field: 'name', direction: 'asc' })

  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)

  const { showToast } = useToastStore()

  const filtered = useMemo(() => {
    let result = products.filter((p) => p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || p.sku.toLowerCase().includes(debouncedSearch.toLowerCase()))
    if (categoryFilter !== 'all') result = result.filter((p) => p.categoryId === categoryFilter)
    if (statusFilter !== 'all') result = result.filter((p) => p.status === statusFilter)

    result = [...result].sort((a, b) => {
      const dir = sort.direction === 'asc' ? 1 : -1
      if (sort.field === 'name') return a.name.localeCompare(b.name) * dir
      return (a[sort.field] - b[sort.field]) * dir
    })

    return result
  }, [products, debouncedSearch, categoryFilter, statusFilter, sort])

  const { page, totalPages, pageItems, goToPage, setPage } = usePagination(filtered, 8)

  function handleSortChange(field: ProductSortField) {
    setSort((prev) =>
      prev.field === field ? { field, direction: prev.direction === 'asc' ? 'desc' : 'asc' } : { field, direction: 'asc' }
    )
  }

  function openAddModal() {
    setEditingProduct(null)
    setModalOpen(true)
  }

  function openEditModal(product: Product) {
    setEditingProduct(product)
    setModalOpen(true)
  }

  function handleSave(data: Omit<Product, 'id' | 'createdAt' | 'image'>) {
    if (editingProduct) {
      setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? { ...p, ...data } : p)))
      showToast('Đã cập nhật sản phẩm')
    } else {
      const newProduct: Product = {
        ...data,
        id: `prod-${crypto.randomUUID()}`,
        createdAt: new Date().toISOString().slice(0, 10),
        image: `https://api.dicebear.com/9.x/icons/svg?seed=${encodeURIComponent(data.name)}`,
      }
      setProducts((prev) => [newProduct, ...prev])
      showToast('Đã thêm sản phẩm mới')
    }
    setModalOpen(false)
    setPage(1)
  }

  function handleDeleteConfirm() {
    if (!deletingProduct) return
    setProducts((prev) => prev.filter((p) => p.id !== deletingProduct.id))
    showToast('Đã xóa sản phẩm', 'info')
    setDeletingProduct(null)
  }

  return (
    <div>
      <PageHeader
        title="Sản phẩm"
        subtitle={`${products.length} sản phẩm trong hệ thống`}
        actions={
          <Button icon={<Plus size={16} />} onClick={openAddModal}>
            Thêm sản phẩm
          </Button>
        }
      />

      <Card>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput value={search} onChange={setSearch} placeholder="Tìm theo tên hoặc SKU..." />
          <div className="flex gap-3">
            <Select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value)
                setPage(1)
              }}
              options={[{ value: 'all', label: 'Tất cả danh mục' }, ...categories.map((c) => ({ value: c.id, label: c.name }))]}
              className="min-w-[160px]"
            />
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
              className="min-w-[150px]"
            />
          </div>
        </div>

        <ProductTable products={pageItems} sort={sort} onSortChange={handleSortChange} onEdit={openEditModal} onDelete={setDeletingProduct} />

        {filtered.length > 0 && (
          <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} totalItems={filtered.length} pageSize={8} />
        )}
      </Card>

      <ProductModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} initial={editingProduct} />

      <ConfirmDialog
        open={!!deletingProduct}
        title="Xóa sản phẩm"
        message={`Bạn có chắc muốn xóa "${deletingProduct?.name}"? Hành động này không thể hoàn tác.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingProduct(null)}
      />
    </div>
  )
}
