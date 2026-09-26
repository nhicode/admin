import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...rest }, ref) => {
    const inputId = id ?? rest.name
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-control border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors',
            'placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100',
            'dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-primary-900',
            error ? 'border-rose-400' : 'border-slate-200 dark:border-slate-700',
            className
          )}
          {...rest}
        />
        {error && <span className="text-xs text-rose-500">{error}</span>}
      </div>
    )
  }
)
Input.displayName = 'Input'
