import { useEffect, useState } from 'react'
import { Modal } from '@/components/common/Modal'
import { Input } from '@/components/common/Input'
import { Select } from '@/components/common/Select'
import { Button } from '@/components/common/Button'
import type { Category, Status } from '@/types'

interface CategoryModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: { name: string; description: string; status: Status }) => void
  initial?: Category | null
}

export function CategoryModal({ open, onClose, onSave, initial }: CategoryModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<Status>('active')
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) {
      setName(initial?.name ?? '')
      setDescription(initial?.description ?? '')
      setStatus(initial?.status ?? 'active')
      setError('')
    }
  }, [open, initial])

  function handleSubmit() {
    if (!name.trim()) {
      setError('Tên danh mục là bắt buộc')
      return
    }
    onSave({ name: name.trim(), description: description.trim(), status })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? 'Chỉnh sửa danh mục' : 'Thêm danh mục'}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSubmit}>{initial ? 'Lưu thay đổi' : 'Thêm danh mục'}</Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Input label="Tên danh mục" value={name} onChange={(e) => setName(e.target.value)} error={error} />
        <Input label="Mô tả" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Select
          label="Trạng thái"
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
          options={[
            { value: 'active', label: 'Hoạt động' },
            { value: 'inactive', label: 'Ngừng' },
          ]}
        />
      </div>
    </Modal>
  )
}
