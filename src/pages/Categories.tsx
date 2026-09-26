import { useMemo, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card } from '@/components/common/Card'
import { SearchInput } from '@/components/common/SearchInput'
import { Select } from '@/components/common/Select'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import { EmptyState } from '@/components/common/EmptyState'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { CategoryModal } from '@/components/categories/CategoryModal'
import { categories as initialCategories } from '@/data/categories'
import { useDebounce } from '@/hooks/useDebounce'
import { useToastStore } from '@/store/toastStore'
import { formatDate } from '@/lib/utils'
import { statusLabelMap, statusToneMap } from '@/lib/statusStyles'
import type { Category, Status } from '@/types'

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)
  const [statusFilter, setStatusFilter] = useState('all')

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [deleting, setDeleting] = useState<Category | null>(null)

  const { showToast } = useToastStore()

  const filtered = useMemo(() => {
    let result = categories.filter((c) => c.name.toLowerCase().includes(debouncedSearch.toLowerCase()))
    if (statusFilter !== 'all') result = result.filter((c) => c.status === statusFilter)
    return result
  }, [categories, debouncedSearch, statusFilter])

  function handleSave(data: { name: string; description: string; status: Status }) {
    if (editing) {
      setCategories((prev) => prev.map((c) => (c.id === editing.id ? { ...c, ...data } : c)))
      showToast('Đã cập nhật danh mục')
    } else {
      const newCategory: Category = {
        ...data,
        id: `cat-${crypto.randomUUID()}`,
        productCount: 0,
        createdAt: new Date().toISOString().slice(0, 10),
      }
      setCategories((prev) => [newCategory, ...prev])
      showToast('Đã thêm danh mục mới')
    }
    setModalOpen(false)
  }

  function handleDeleteConfirm() {
    if (!deleting) return
    setCategories((prev) => prev.filter((c) => c.id !== deleting.id))
    showToast('Đã xóa danh mục', 'info')
    setDeleting(null)
  }

  return (
    <div>
      <PageHeader
        title="Danh mục"
        subtitle={`${categories.length} danh mục sản phẩm`}
        actions={
          <Button
            icon={<Plus size={16} />}
            onClick={() => {
              setEditing(null)
              setModalOpen(true)
            }}
          >
            Thêm danh mục
          </Button>
        }
      />

      <Card>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput value={search} onChange={setSearch} placeholder="Tìm theo tên danh mục..." />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: 'all', label: 'Tất cả trạng thái' },
              { value: 'active', label: 'Hoạt động' },
              { value: 'inactive', label: 'Ngừng' },
            ]}
            className="sm:w-48"
          />
        </div>

        {filtered.length === 0 ? (
          <EmptyState message="Không tìm thấy danh mục nào" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700">
                  <th className="py-3 pr-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Danh mục
                  </th>
                  <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Số sản phẩm
                  </th>
                  <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Trạng thái
                  </th>
                  <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Ngày tạo
                  </th>
                  <th className="py-3 pl-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {filtered.map((category) => (
                  <tr key={category.id}>
                    <td className="py-3 pr-3">
                      <p className="font-medium text-slate-800 dark:text-slate-100">{category.name}</p>
                      <p className="text-xs text-slate-400">{category.description}</p>
                    </td>
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-300">{category.productCount}</td>
                    <td className="px-3 py-3">
                      <Badge tone={statusToneMap[category.status]}>{statusLabelMap[category.status]}</Badge>
                    </td>
                    <td className="px-3 py-3 text-slate-500 dark:text-slate-400">{formatDate(category.createdAt)}</td>
                    <td className="py-3 pl-3">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => {
                            setEditing(category)
                            setModalOpen(true)
                          }}
                          className="rounded-control p-1.5 text-slate-400 hover:bg-slate-100 hover:text-primary-600 dark:hover:bg-slate-700"
                          aria-label={`Sửa ${category.name}`}
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => setDeleting(category)}
                          className="rounded-control p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/20"
                          aria-label={`Xóa ${category.name}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <CategoryModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} initial={editing} />

      <ConfirmDialog
        open={!!deleting}
        title="Xóa danh mục"
        message={`Bạn có chắc muốn xóa "${deleting?.name}"? Hành động này không thể hoàn tác.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleting(null)}
      />
    </div>
  )
}
