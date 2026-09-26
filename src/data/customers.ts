import type { Customer } from '@/types'

const firstNames = ['Nguyen', 'Tran', 'Le', 'Pham', 'Hoang', 'Vu', 'Dang', 'Bui', 'Do', 'Ho', 'Ngo', 'Duong']
const lastNames = ['An', 'Binh', 'Chi', 'Dung', 'Giang', 'Hoa', 'Khanh', 'Linh', 'Minh', 'Nam', 'Phuong', 'Quyen']

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

const rand = seededRandom(7)

export const customers: Customer[] = Array.from({ length: 26 }, (_, i) => {
  const first = firstNames[i % firstNames.length]
  const last = lastNames[(i * 3) % lastNames.length]
  const name = `${first} ${last}`
  const totalOrders = Math.floor(rand() * 24)
  const totalSpent = Math.round(totalOrders * (rand() * 80 + 20) * 100) / 100
  return {
    id: `cust-${i + 1}`,
    name,
    email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@example.com`,
    phone: `09${String(10000000 + Math.floor(rand() * 89999999))}`,
    avatar: `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(name + i)}`,
    totalOrders,
    totalSpent,
    status: rand() > 0.15 ? 'active' : 'inactive',
    joinedAt: `2023-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 27) + 1).padStart(2, '0')}`,
  }
})
