# Nova Admin Dashboard

SaaS Admin Dashboard hiện đại, responsive, xây dựng bằng React + Vite + TypeScript + Tailwind CSS. Dữ liệu hiện tại là mock (trong `src/data/`) — chưa cần backend để chạy thử.

## Bắt đầu

```bash
npm install
npm run dev
```

Mở [http://localhost:5173](http://localhost:5173).

## Scripts

- `npm run dev` — chạy dev server
- `npm run build` — type-check (`tsc -b`) rồi build production vào `dist/`
- `npm run preview` — xem thử bản build production
- `npm run lint` — chạy ESLint

## Công nghệ

React 18 · Vite · TypeScript (strict) · Tailwind CSS · React Router DOM · Zustand · Recharts · Axios · Lucide React

## Cấu trúc thư mục

```
src/
├── components/
│   ├── layout/       Sidebar, Header, MainLayout
│   ├── dashboard/     StatCard, RevenueChart, RecentOrders, TopProducts
│   ├── products/      ProductTable, ProductModal
│   ├── categories/    CategoryModal
│   ├── orders/        OrderTable, OrderDetailModal
│   ├── customers/     CustomerTable
│   └── common/        Các component dùng chung (Button, Modal, Input, ...)
├── pages/             8 trang: Dashboard, Products, Categories, Orders, Customers, Analytics, Messages, Settings
├── data/              Mock data (products, orders, customers, categories, analytics, messages)
├── store/             Zustand stores: theme, sidebar, toast
├── hooks/             useDebounce, usePagination
├── types/             Type dùng chung toàn app
└── lib/                api.ts (Axios instance), utils.ts, csv.ts, statusStyles.ts
```

## Kết nối API thật

Toàn bộ dữ liệu hiện đọc trực tiếp từ `src/data/*`. File `src/lib/api.ts` đã cấu hình sẵn một Axios instance (base URL đọc từ biến môi trường `VITE_API_BASE_URL`, tự đính kèm Bearer token). Khi có backend thật, chỉ cần thay các lệnh gọi `src/data/*` trong từng trang bằng lệnh gọi `api.get(...)` tương ứng — UI và component không cần đổi.

## Dark mode

Bật/tắt bằng icon mặt trời/mặt trăng trên Header, hoặc trong Cài đặt → Giao diện. Lựa chọn được lưu vào `localStorage`.
