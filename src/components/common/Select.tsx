import { type SelectHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: SelectOption[]
  error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className, id, ...rest }, ref) => {
    const selectId = id ?? rest.name
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'w-full rounded-control border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors',
            'focus:border-primary-500 focus:ring-2 focus:ring-primary-100',
            'dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-primary-900',
            error ? 'border-rose-400' : 'border-slate-200 dark:border-slate-700',
            className
          )}
          {...rest}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="text-xs text-rose-500">{error}</span>}
      </div>
    )
  }
)
Select.displayName = 'Select'
