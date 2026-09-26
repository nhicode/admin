import { Menu, Sun, Moon, Bell, LogOut, User, Settings as SettingsIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSidebarStore } from '@/store/sidebarStore'
import { useThemeStore } from '@/store/themeStore'
import { useToastStore } from '@/store/toastStore'
import { Dropdown, DropdownItem } from '@/components/common/Dropdown'
import { messages } from '@/data/messages'

export function Header() {
  const { openMobile } = useSidebarStore()
  const { theme, toggleTheme } = useThemeStore()
  const { showToast } = useToastStore()
  const navigate = useNavigate()
  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-700 dark:bg-slate-800 sm:px-6">
      <button
        onClick={openMobile}
        className="rounded-control p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 lg:hidden"
        aria-label="Mở menu"
      >
        <Menu size={20} />
      </button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={toggleTheme}
          className="rounded-control p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
          aria-label="Đổi giao diện sáng/tối"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <Dropdown
          trigger={
            <button
              className="relative rounded-control p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
              aria-label="Thông báo"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" />
              )}
            </button>
          }
        >
          <div className="max-h-80 w-72 overflow-y-auto">
            <p className="border-b border-slate-100 px-3.5 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:border-slate-700">
              Tin nhắn mới
            </p>
            {messages.slice(0, 4).map((m) => (
              <button
                key={m.id}
                onClick={() => navigate('/messages')}
                className="flex w-full flex-col items-start gap-0.5 px-3.5 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                <span className="text-sm font-medium text-slate-800 dark:text-slate-100">{m.customerName}</span>
                <span className="line-clamp-1 text-xs text-slate-500 dark:text-slate-400">{m.subject}</span>
              </button>
            ))}
          </div>
        </Dropdown>

        <Dropdown
          trigger={
            <button className="flex items-center gap-2 rounded-control p-1 pr-2 hover:bg-slate-100 dark:hover:bg-slate-700">
              <img
                src="https://api.dicebear.com/9.x/notionists/svg?seed=admin-user"
                alt="Ảnh đại diện"
                className="h-8 w-8 rounded-full bg-slate-100"
              />
              <span className="hidden text-sm font-medium text-slate-700 dark:text-slate-200 sm:block">Minh Anh</span>
            </button>
          }
        >
          <DropdownItem onClick={() => navigate('/settings')}>
            <User size={15} /> Hồ sơ
          </DropdownItem>
          <DropdownItem onClick={() => navigate('/settings')}>
            <SettingsIcon size={15} /> Cài đặt
          </DropdownItem>
          <DropdownItem danger onClick={() => showToast('Đã đăng xuất (demo)', 'info')}>
            <LogOut size={15} /> Đăng xuất
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  )
}
