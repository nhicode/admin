import { ArrowUp, ArrowDown, ArrowUpDown, Pencil, Trash2 } from 'lucide-react'
import { Badge } from '@/components/common/Badge'
import { EmptyState } from '@/components/common/EmptyState'
import { formatCurrency } from '@/lib/utils'
import { statusLabelMap, statusToneMap } from '@/lib/statusStyles'
import { categories } from '@/data/categories'
import type { Product, SortState } from '@/types'

export type ProductSortField = 'name' | 'price' | 'stock'

interface ProductTableProps {
  products: Product[]
  sort: SortState<ProductSortField>
  onSortChange: (field: ProductSortField) => void
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

function SortHeader({
  label,
  field,
  sort,
  onSortChange,
}: {
  label: string
  field: ProductSortField
  sort: SortState<ProductSortField>
  onSortChange: (field: ProductSortField) => void
}) {
  const active = sort.field === field
  return (
    <button
      onClick={() => onSortChange(field)}
      className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
    >
      {label}
      {active ? sort.direction === 'asc' ? <ArrowUp size={13} /> : <ArrowDown size={13} /> : <ArrowUpDown size={13} className="opacity-40" />}
    </button>
  )
}

export function ProductTable({ products, sort, onSortChange, onEdit, onDelete }: ProductTableProps) {
  if (products.length === 0) return <EmptyState message="Không tìm thấy sản phẩm nào" />

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 dark:border-slate-700">
            <th className="py-3 pr-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <SortHeader label="Sản phẩm" field="name" sort={sort} onSortChange={onSortChange} />
            </th>
            <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Danh mục
            </th>
            <th className="px-3 py-3">
              <SortHeader label="Giá" field="price" sort={sort} onSortChange={onSortChange} />
            </th>
            <th className="px-3 py-3">
              <SortHeader label="Tồn kho" field="stock" sort={sort} onSortChange={onSortChange} />
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
          {products.map((product) => {
            const category = categories.find((c) => c.id === product.categoryId)
            return (
              <tr key={product.id} className="group">
                <td className="py-3 pr-3">
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt="" className="h-9 w-9 shrink-0 rounded-control bg-slate-100 p-1.5" />
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-800 dark:text-slate-100">{product.name}</p>
                      <p className="text-xs text-slate-400">{product.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 text-slate-600 dark:text-slate-300">{category?.name ?? '—'}</td>
                <td className="px-3 py-3 font-medium text-slate-800 dark:text-slate-100">
                  {formatCurrency(product.price)}
                </td>
                <td className="px-3 py-3 text-slate-600 dark:text-slate-300">{product.stock}</td>
                <td className="px-3 py-3">
                  <Badge tone={statusToneMap[product.status]}>{statusLabelMap[product.status]}</Badge>
                </td>
                <td className="py-3 pl-3">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => onEdit(product)}
                      className="rounded-control p-1.5 text-slate-400 hover:bg-slate-100 hover:text-primary-600 dark:hover:bg-slate-700"
                      aria-label={`Sửa ${product.name}`}
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => onDelete(product)}
                      className="rounded-control p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/20"
                      aria-label={`Xóa ${product.name}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
