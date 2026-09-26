import { Link } from 'react-router-dom'
import { Card } from '@/components/common/Card'
import { formatCurrency } from '@/lib/utils'
import type { Product } from '@/types'

export function TopProducts({ products }: { products: (Product & { sold: number })[] }) {
  return (
    <Card className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Sản phẩm bán chạy</h3>
        <Link to="/products" className="text-xs font-medium text-primary-600 hover:underline dark:text-primary-400">
          Xem tất cả
        </Link>
      </div>
      <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-3 py-3">
            <img src={product.image} alt="" className="h-10 w-10 shrink-0 rounded-control bg-slate-100 p-1.5" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">{product.name}</p>
              <p className="text-xs text-slate-400">Đã bán {product.sold}</p>
            </div>
            <span className="shrink-0 text-sm font-semibold text-slate-800 dark:text-slate-100">
              {formatCurrency(product.price)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
