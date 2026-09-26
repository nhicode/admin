import type { Message } from '@/types'
import { customers } from './customers'

const subjects = [
  'Question about my order', 'Refund request', 'Product not as described',
  'When will my order ship?', 'Love the new collection!', 'Issue with payment',
  'Can I change my shipping address?', 'Bulk order inquiry', 'Damaged item received',
  'Thank you for the fast delivery',
]

export const messages: Message[] = subjects.map((subject, i) => {
  const customer = customers[i % customers.length]
  const date = new Date(2025, 8, 26 - i)
  return {
    id: `msg-${i + 1}`,
    customerId: customer.id,
    customerName: customer.name,
    avatar: customer.avatar,
    subject,
    preview: `Hi, I wanted to reach out regarding ${subject.toLowerCase()}...`,
    body: `Hi team,\n\nI wanted to reach out regarding: ${subject}.\n\nCould you please help me look into this? Thanks in advance for your support.\n\nBest,\n${customer.name}`,
    read: i % 3 !== 0,
    createdAt: date.toISOString().slice(0, 10),
  }
})
