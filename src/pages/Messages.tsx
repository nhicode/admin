import { useState } from 'react'
import { Send } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { EmptyState } from '@/components/common/EmptyState'
import { messages as initialMessages } from '@/data/messages'
import { useToastStore } from '@/store/toastStore'
import { cn, formatDate } from '@/lib/utils'
import type { Message } from '@/types'

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [selectedId, setSelectedId] = useState<string | null>(initialMessages[0]?.id ?? null)
  const [reply, setReply] = useState('')
  const { showToast } = useToastStore()

  const selected = messages.find((m) => m.id === selectedId) ?? null

  function handleSelect(message: Message) {
    setSelectedId(message.id)
    setReply('')
    if (!message.read) {
      setMessages((prev) => prev.map((m) => (m.id === message.id ? { ...m, read: true } : m)))
    }
  }

  function handleSendReply() {
    if (!reply.trim()) return
    showToast('Đã gửi phản hồi')
    setReply('')
  }

  return (
    <div>
      <PageHeader title="Tin nhắn" subtitle={`${messages.filter((m) => !m.read).length} tin nhắn chưa đọc`} />

      <Card className="!p-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr]">
          <div className="max-h-[32rem] divide-y divide-slate-100 overflow-y-auto border-b border-slate-100 lg:max-h-[36rem] lg:border-b-0 lg:border-r dark:divide-slate-700 dark:border-slate-700">
            {messages.map((message) => (
              <button
                key={message.id}
                onClick={() => handleSelect(message)}
                className={cn(
                  'flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50',
                  selectedId === message.id && 'bg-primary-50 dark:bg-primary-900/20'
                )}
              >
                <img src={message.avatar} alt="" className="h-9 w-9 shrink-0 rounded-full bg-slate-100" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={cn(
                        'truncate text-sm',
                        message.read ? 'text-slate-600 dark:text-slate-300' : 'font-semibold text-slate-900 dark:text-white'
                      )}
                    >
                      {message.customerName}
                    </p>
                    {!message.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary-600" />}
                  </div>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">{message.subject}</p>
                  <p className="mt-0.5 truncate text-xs text-slate-400">{formatDate(message.createdAt)}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="flex min-h-[24rem] flex-col p-5">
            {!selected ? (
              <EmptyState message="Chọn một tin nhắn để xem chi tiết" />
            ) : (
              <>
                <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-700">
                  <img src={selected.avatar} alt="" className="h-10 w-10 rounded-full bg-slate-100" />
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-100">{selected.customerName}</p>
                    <p className="text-xs text-slate-400">{formatDate(selected.createdAt)}</p>
                  </div>
                </div>
                <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-white">{selected.subject}</h3>
                <p className="flex-1 whitespace-pre-line text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {selected.body}
                </p>
                <div className="mt-4 flex items-end gap-2 border-t border-slate-100 pt-4 dark:border-slate-700">
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Nhập phản hồi..."
                    rows={2}
                    className="flex-1 resize-none rounded-control border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
                  />
                  <Button icon={<Send size={15} />} onClick={handleSendReply} disabled={!reply.trim()}>
                    Gửi
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
