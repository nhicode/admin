import type { Order, OrderStatus } from '@/types'
import { customers } from './customers'
import { products } from './products'

const statuses: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
const paymentMethods = ['Credit Card', 'Bank Transfer', 'Cash on Delivery', 'E-Wallet']

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

const rand = seededRandom(99)

export const orders: Order[] = Array.from({ length: 48 }, (_, i) => {
  const customer = customers[i % customers.length]
  const itemCount = 1 + Math.floor(rand() * 3)
  const items = Array.from({ length: itemCount }, () => {
    const product = products[Math.floor(rand() * products.length)]
    const quantity = 1 + Math.floor(rand() * 3)
    return {
      productId: product.id,
      productName: product.name,
      quantity,
      price: product.price,
    }
  })
  const total = Math.round(items.reduce((sum, it) => sum + it.price * it.quantity, 0) * 100) / 100
  const dayOffset = i * 2
  const date = new Date(2025, 8, 26 - dayOffset)

  return {
    id: `ORD-${String(10000 + i)}`,
    customerId: customer.id,
    customerName: customer.name,
    items,
    total,
    status: statuses[Math.floor(rand() * statuses.length)],
    paymentMethod: paymentMethods[Math.floor(rand() * paymentMethods.length)],
    createdAt: date.toISOString().slice(0, 10),
  }
})
