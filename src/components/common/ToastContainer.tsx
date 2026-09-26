import { CheckCircle2, XCircle, Info, X } from 'lucide-react'
import { useToastStore } from '@/store/toastStore'
import { cn } from '@/lib/utils'
import type { ToastType } from '@/types'

const iconMap: Record<ToastType, typeof CheckCircle2> = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

const toneMap: Record<ToastType, string> = {
  success: 'border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400',
  error: 'border-rose-200 text-rose-700 dark:border-rose-800 dark:text-rose-400',
  info: 'border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-400',
}

export function ToastContainer() {
  const { toasts, dismissToast } = useToastStore()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => {
        const Icon = iconMap[toast.type]
        return (
          <div
            key={toast.id}
            className={cn(
              'animate-slide-in-right flex items-center gap-2.5 rounded-control border bg-white px-4 py-3 shadow-lg dark:bg-slate-800',
              toneMap[toast.type]
            )}
          >
            <Icon size={18} className="shrink-0" />
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{toast.message}</p>
            <button
              onClick={() => dismissToast(toast.id)}
              className="ml-2 shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Đóng"
            >
              <X size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
