import { Inbox } from 'lucide-react'

export function EmptyState({ message = 'Không tìm thấy kết quả' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-slate-400 dark:text-slate-500">
      <Inbox size={32} strokeWidth={1.5} />
      <p className="text-sm">{message}</p>
    </div>
  )
}
