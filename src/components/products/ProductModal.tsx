import { useEffect, useState } from 'react'
import { Modal } from '@/components/common/Modal'
import { Input } from '@/components/common/Input'
import { Select } from '@/components/common/Select'
import { Button } from '@/components/common/Button'
import { categories } from '@/data/categories'
import type { Product, Status } from '@/types'

interface ProductModalProps {
  open: boolean
  onClose: () => void
  onSave: (product: Omit<Product, 'id' | 'createdAt' | 'image'>) => void
  initial?: Product | null
}

interface FormState {
  name: string
  sku: string
  categoryId: string
  price: string
  stock: string
  status: Status
}

const emptyForm: FormState = {
  name: '',
  sku: '',
  categoryId: categories[0]?.id ?? '',
  price: '',
  stock: '',
  status: 'active',
}

export function ProductModal({ open, onClose, onSave, initial }: ProductModalProps) {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  useEffect(() => {
    if (open) {
      setForm(
        initial
          ? {
              name: initial.name,
              sku: initial.sku,
              categoryId: initial.categoryId,
              price: String(initial.price),
              stock: String(initial.stock),
              status: initial.status,
            }
          : emptyForm
      )
      setErrors({})
    }
  }, [open, initial])

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) next.name = 'Tên sản phẩm là bắt buộc'
    if (!form.sku.trim()) next.sku = 'SKU là bắt buộc'
    const priceNum = Number(form.price)
    if (!form.price || isNaN(priceNum) || priceNum <= 0) next.price = 'Giá phải lớn hơn 0'
    const stockNum = Number(form.stock)
    if (form.stock === '' || isNaN(stockNum) || stockNum < 0) next.stock = 'Tồn kho không hợp lệ'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit() {
    if (!validate()) return
    onSave({
      name: form.name.trim(),
      sku: form.sku.trim(),
      categoryId: form.categoryId,
      price: Number(form.price),
      stock: Number(form.stock),
      status: form.status,
    })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSubmit}>{initial ? 'Lưu thay đổi' : 'Thêm sản phẩm'}</Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Tên sản phẩm"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
        />
        <Input
          label="SKU"
          value={form.sku}
          onChange={(e) => setForm({ ...form, sku: e.target.value })}
          error={errors.sku}
        />
        <Select
          label="Danh mục"
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          options={categories.map((c) => ({ value: c.id, label: c.name }))}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Giá ($)"
            type="number"
            step="0.01"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            error={errors.price}
          />
          <Input
            label="Tồn kho"
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            error={errors.stock}
          />
        </div>
        <Select
          label="Trạng thái"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value as Status })}
          options={[
            { value: 'active', label: 'Hoạt động' },
            { value: 'inactive', label: 'Ngừng' },
          ]}
        />
      </div>
    </Modal>
  )
}
