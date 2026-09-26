import { useState } from 'react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card } from '@/components/common/Card'
import { Tabs } from '@/components/common/Tabs'
import { Input } from '@/components/common/Input'
import { Select } from '@/components/common/Select'
import { Button } from '@/components/common/Button'
import { Switch } from '@/components/common/Switch'
import { useThemeStore } from '@/store/themeStore'
import { useToastStore } from '@/store/toastStore'

const tabs = [
  { id: 'general', label: 'Chung' },
  { id: 'profile', label: 'Hồ sơ' },
  { id: 'security', label: 'Bảo mật' },
  { id: 'notifications', label: 'Thông báo' },
  { id: 'appearance', label: 'Giao diện' },
]

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general')
  const { showToast } = useToastStore()

  // General
  const [storeName, setStoreName] = useState('Nova Admin Store')
  const [contactEmail, setContactEmail] = useState('contact@novaadmin.com')
  const [timezone, setTimezone] = useState('Asia/Ho_Chi_Minh')
  const [currency, setCurrency] = useState('USD')

  // Profile
  const [fullName, setFullName] = useState('Minh Anh')
  const [email, setEmail] = useState('minhanh@novaadmin.com')
  const [phone, setPhone] = useState('0901234567')
  const [bio, setBio] = useState('Quản trị viên hệ thống')

  // Security
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [twoFactor, setTwoFactor] = useState(false)

  // Notifications
  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif, setPushNotif] = useState(true)
  const [orderUpdates, setOrderUpdates] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)

  // Appearance
  const { theme, toggleTheme } = useThemeStore()

  function handleSaveGeneral() {
    showToast('Đã lưu cài đặt chung')
  }

  function handleSaveProfile() {
    showToast('Đã cập nhật hồ sơ')
  }

  function handleChangePassword() {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Vui lòng điền đầy đủ thông tin')
      return
    }
    if (newPassword.length < 8) {
      setPasswordError('Mật khẩu mới phải có ít nhất 8 ký tự')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Mật khẩu xác nhận không khớp')
      return
    }
    setPasswordError('')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    showToast('Đã đổi mật khẩu thành công')
  }

  function handleSaveNotifications() {
    showToast('Đã lưu tùy chọn thông báo')
  }

  return (
    <div>
      <PageHeader title="Cài đặt" subtitle="Quản lý thông tin cửa hàng và tài khoản của bạn" />

      <Card className="!p-0 overflow-hidden">
        <div className="px-5 pt-2">
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        </div>

        <div className="p-5">
          {activeTab === 'general' && (
            <div className="flex max-w-lg flex-col gap-4">
              <Input label="Tên cửa hàng" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
              <Input
                label="Email liên hệ"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
              <Select
                label="Múi giờ"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                options={[
                  { value: 'Asia/Ho_Chi_Minh', label: '(GMT+7) Hồ Chí Minh' },
                  { value: 'Asia/Tokyo', label: '(GMT+9) Tokyo' },
                  { value: 'America/New_York', label: '(GMT-5) New York' },
                  { value: 'Europe/London', label: '(GMT+0) London' },
                ]}
              />
              <Select
                label="Tiền tệ"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                options={[
                  { value: 'USD', label: 'USD - US Dollar' },
                  { value: 'VND', label: 'VND - Việt Nam Đồng' },
                  { value: 'EUR', label: 'EUR - Euro' },
                ]}
              />
              <div>
                <Button onClick={handleSaveGeneral}>Lưu thay đổi</Button>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="flex max-w-lg flex-col gap-4">
              <div className="flex items-center gap-4">
                <img
                  src="https://api.dicebear.com/9.x/notionists/svg?seed=admin-user"
                  alt="Ảnh đại diện"
                  className="h-16 w-16 rounded-full bg-slate-100"
                />
                <Button variant="secondary" size="sm">
                  Đổi ảnh đại diện
                </Button>
              </div>
              <Input label="Họ và tên" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input label="Số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Giới thiệu</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full rounded-control border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
              <div>
                <Button onClick={handleSaveProfile}>Lưu thay đổi</Button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="flex max-w-lg flex-col gap-4">
              <Input
                label="Mật khẩu hiện tại"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <Input
                label="Mật khẩu mới"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input
                label="Xác nhận mật khẩu mới"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={passwordError}
              />
              <div>
                <Button onClick={handleChangePassword}>Đổi mật khẩu</Button>
              </div>
              <div className="border-t border-slate-100 pt-4 dark:border-slate-700">
                <Switch
                  checked={twoFactor}
                  onChange={setTwoFactor}
                  label="Xác thực hai yếu tố"
                  description="Tăng cường bảo mật cho tài khoản của bạn"
                />
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="flex max-w-lg flex-col divide-y divide-slate-100 dark:divide-slate-700">
              <Switch checked={emailNotif} onChange={setEmailNotif} label="Thông báo qua email" description="Nhận cập nhật quan trọng qua email" />
              <Switch checked={pushNotif} onChange={setPushNotif} label="Thông báo đẩy" description="Nhận thông báo trực tiếp trên trình duyệt" />
              <Switch checked={orderUpdates} onChange={setOrderUpdates} label="Cập nhật đơn hàng" description="Thông báo khi trạng thái đơn hàng thay đổi" />
              <Switch checked={marketingEmails} onChange={setMarketingEmails} label="Email tiếp thị" description="Nhận tin tức và ưu đãi mới nhất" />
              <div className="pt-4">
                <Button onClick={handleSaveNotifications}>Lưu tùy chọn</Button>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="flex max-w-lg flex-col gap-4">
              <Switch
                checked={theme === 'dark'}
                onChange={toggleTheme}
                label="Chế độ tối"
                description="Chuyển đổi giữa giao diện sáng và tối"
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
