# Zara Mobile App UI/UX Redesign - Dual-Screen Web Prototype
> **Master BIS (Business Information Systems) - UI/UX Design Course Project**  
> *Interactive Dual-Device Comparative Prototype: Original vs. Enhanced Experience*

[![Deploy Prototype to GitHub Pages](https://github.com/Dangtrunghieu2002/zara-mobile-redesign-prototype/actions/workflows/deploy.yml/badge.svg)](https://github.com/Dangtrunghieu2002/zara-mobile-redesign-prototype/actions/workflows/deploy.yml)

🌐 **Live Demo Website**: [https://dangtrunghieu2002.github.io/zara-mobile-redesign-prototype/](https://dangtrunghieu2002.github.io/zara-mobile-redesign-prototype/)

---

## 📱 Project Overview

This web prototype demonstrates a comprehensive UI/UX redesign of the **Zara Mobile Shopping App**, developed for the Master BIS program. 

Instead of static slide decks, this interactive prototype renders **two realistic mobile devices side-by-side**:
- **Left Screen**: Current / Original Zara Mobile UI (identifying key pain points and cognitive overload).
- **Right Screen**: Proposed Enhanced Redesign (introducing modern e-commerce UX best practices, clearer visual hierarchy, streamlined checkout, and intuitive self-service returns).

---

## ✨ Key Features

1. **Dual Side-by-Side Comparison**:
   - Compare original Zara design flaws with enhanced redesign solutions across every screen.
   - Screen mirroring / sync navigation toggle (`Đồng bộ 2 màn hình`).

2. **Dynamic Device Switching**:
   - **iPhone 15 Pro Max**: Titanium bezel, Dynamic Island, iOS Home indicator bar.
   - **Samsung Galaxy S24 Ultra**: Boxy modern frame, center punch-hole camera, Android 3-button navigation bar (`≡ Recents`, `○ Home`, `< Back`) with interactive toast feedback.

3. **13 Redesigned Screens Across 5 Core Shopping Journeys**:
   - **Part 1: Khám phá & Trang chủ**
     - Home Feed (Clean editorial hero vs. cluttered campaign lookbook)
     - Visual Category Grid (Clear typography, high-contrast category cards)
   - **Part 2: Tìm kiếm & Danh sách Sản phẩm**
     - Search with Instant Suggestions & Recent History
     - Product Listing with Multi-attribute Filter Chips (Size, Color, Price, In-stock)
     - Interactive Filter Drawer
   - **Part 3: Trang Chi tiết Sản phẩm (PDP)**
     - Visual Color Swatches & Dynamic Studio Images
     - One-touch Size Selector with real-time stock alerts ("Chỉ còn 2 chiếc!")
     - Persistent Sticky "Thêm vào giỏ" Action Bar
     - Expandable Material & Care transparency accordion
   - **Part 4: Giỏ hàng & Thanh toán Tốc độ cao**
     - Shopping Bag with dynamic item counter, quantity controls, and transparent price breakdown
     - 3-Step Express Checkout (Giao hàng ➔ Thanh toán ➔ Xác nhận)
     - Multiple Payment Options (Apple Pay, Credit Card, COD, MoMo)
     - Order Confirmation Screen
   - **Part 5: Quản lý Đơn hàng & Đổi trả Tự động**
     - Order History & Live Shipping Timeline
     - 1-Click Self-Service Return Flow with instant return QR Code

4. **Interactive Product Catalog**:
   - 13 distinct studio-photographed fashion products.
   - Dynamic passing of product data, color swatches, prices, and sizes through PDP, Bag, Checkout, and Confirmation.

5. **Presenter Tools**:
   - Quick navigation buttons (`‹ Trước` / `Tiếp ›`) and keyboard arrow shortcuts (`←` / `→`).
   - Jump directly to any of the 13 screens via the top control bar.

---

## 🛠 Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Dangtrunghieu2002/zara-mobile-redesign-prototype.git
   cd zara-mobile-redesign-prototype
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Production Build
To create an optimized production build:
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
zara-prototype/
├── docs/                      # Original Master BIS presentation slides (.pptx)
├── public/
│   └── products/              # High-quality studio product images
├── src/
│   ├── components/            # UI components (PhoneFrame, ZaraOriginalScreen, ZaraEnhancedScreen, etc.)
│   ├── data/
│   │   ├── products.js        # Catalog of 13 dynamic Zara products
│   │   └── screens.js         # Screen definitions and navigation metadata
│   ├── App.jsx                # Main comparative presenter application
│   ├── index.css              # Global styles and phone frame aesthetics
│   └── main.jsx               # React entrypoint
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 👥 Credits

Developed for **Master of Business Information Systems (BIS) - UI/UX Design Course**.
