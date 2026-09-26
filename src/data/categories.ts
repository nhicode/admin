import type { Category } from '@/types'

export const categories: Category[] = [
  { id: 'cat-1', name: 'Electronics', description: 'Phones, laptops and gadgets', status: 'active', productCount: 18, createdAt: '2024-01-10' },
  { id: 'cat-2', name: 'Fashion', description: 'Clothing and accessories', status: 'active', productCount: 24, createdAt: '2024-01-15' },
  { id: 'cat-3', name: 'Home & Living', description: 'Furniture and decor', status: 'active', productCount: 12, createdAt: '2024-02-02' },
  { id: 'cat-4', name: 'Beauty', description: 'Skincare and cosmetics', status: 'active', productCount: 9, createdAt: '2024-02-20' },
  { id: 'cat-5', name: 'Sports', description: 'Sportswear and equipment', status: 'active', productCount: 7, createdAt: '2024-03-05' },
  { id: 'cat-6', name: 'Books', description: 'Fiction and non-fiction', status: 'inactive', productCount: 4, createdAt: '2024-03-18' },
  { id: 'cat-7', name: 'Toys', description: 'Kids toys and games', status: 'active', productCount: 6, createdAt: '2024-04-01' },
  { id: 'cat-8', name: 'Groceries', description: 'Everyday essentials', status: 'inactive', productCount: 3, createdAt: '2024-04-22' },
]
