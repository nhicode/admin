import type { Product } from '@/types'
import { categories } from './categories'

const names = [
  'Wireless Mouse', 'Mechanical Keyboard', 'USB-C Hub', 'Noise Cancelling Headphones',
  'Smart Watch', 'Bluetooth Speaker', 'Laptop Stand', 'Webcam 1080p',
  'Denim Jacket', 'Cotton T-Shirt', 'Running Shoes', 'Leather Wallet',
  'Sunglasses', 'Wool Scarf', 'Canvas Backpack', 'Baseball Cap',
  'Ceramic Vase', 'Table Lamp', 'Throw Pillow', 'Wall Clock',
  'Scented Candle', 'Storage Basket', 'Facial Serum', 'Moisturizer Cream',
  'Lipstick Set', 'Hair Dryer', 'Yoga Mat', 'Dumbbell Set',
  'Water Bottle', 'Resistance Bands', 'Novel: The Long Road', 'Cookbook Deluxe',
  'Building Blocks Set', 'Remote Control Car', 'Board Game Classic', 'Puzzle 1000pcs',
  'Organic Coffee Beans', 'Green Tea Box', 'Pasta Variety Pack', 'Olive Oil 1L',
]

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

const rand = seededRandom(42)

export const products: Product[] = names.map((name, i) => {
  const category = categories[i % categories.length]
  const price = Math.round((rand() * 180 + 15) * 100) / 100
  const stock = Math.floor(rand() * 120)
  return {
    id: `prod-${i + 1}`,
    name,
    sku: `SKU-${String(i + 1).padStart(4, '0')}`,
    categoryId: category.id,
    price,
    stock,
    status: stock > 0 ? 'active' : 'inactive',
    image: `https://api.dicebear.com/9.x/icons/svg?seed=${encodeURIComponent(name)}`,
    createdAt: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 27) + 1).padStart(2, '0')}`,
  }
})
