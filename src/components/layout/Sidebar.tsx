import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  BarChart3,
  MessageSquare,
  Settings,
  ChevronsLeft,
  X,
  Boxes,
} from 'lucide-react'
import { useSidebarStore } from '@/store/sidebarStore'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/dashboard', label: 'Tổng quan', icon: LayoutDashboard },
  { to: '/products', label: 'Sản phẩm', icon: Package },
  { to: '/categories', label: 'Danh mục', icon: FolderTree },
  { to: '/orders', label: 'Đơn hàng', icon: ShoppingCart },
  { to: '/customers', label: 'Khách hàng', icon: Users },
  { to: '/analytics', label: 'Phân tích', icon: BarChart3 },
  { to: '/messages', label: 'Tin nhắn', icon: MessageSquare },
  { to: '/settings', label: 'Cài đặt', icon: Settings },
]

function SidebarContent({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  return (
    <>
      <div className={cn('flex h-16 shrink-0 items-center gap-2 px-4', collapsed && 'justify-center px-0')}>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-primary-600 text-white">
          <Boxes size={18} />
        </div>
        {!collapsed && <span className="text-base font-semibold text-slate-900 dark:text-white">Nova Admin</span>}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-control px-3 py-2.5 text-sm font-medium transition-colors',
                collapsed && 'justify-center px-0',
                isActive
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              )
            }
          >
            <Icon size={18} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </>
  )
}

export function Sidebar() {
  const { collapsed, toggleCollapsed, mobileOpen, closeMobile } = useSidebarStore()

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'hidden shrink-0 flex-col border-r border-slate-200 bg-white transition-[width] duration-200 dark:border-slate-700 dark:bg-slate-800 lg:flex',
          collapsed ? 'w-[76px]' : 'w-64'
        )}
      >
        <SidebarContent collapsed={collapsed} />
        <button
          onClick={toggleCollapsed}
          className="flex h-12 shrink-0 items-center justify-center gap-2 border-t border-slate-100 text-slate-400 hover:bg-slate-50 hover:text-slate-600 dark:border-slate-700 dark:hover:bg-slate-700"
          aria-label={collapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}
        >
          <ChevronsLeft size={16} className={cn('transition-transform', collapsed && 'rotate-180')} />
        </button>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50 animate-fade-in" onClick={closeMobile} />
          <aside className="animate-drawer-in relative flex h-full w-72 max-w-[80vw] flex-col bg-white dark:bg-slate-800">
            <div className="absolute right-3 top-3">
              <button
                onClick={closeMobile}
                className="rounded-control p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                aria-label="Đóng menu"
              >
                <X size={18} />
              </button>
            </div>
            <SidebarContent collapsed={false} onNavigate={closeMobile} />
          </aside>
        </div>
      )}
    </>
  )
}
