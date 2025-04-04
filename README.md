# The Fluffy Pet 🐾 
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

**Dự án cuối kì môn Lập trình Web** - Trang web quản lý thú cưng với giao diện thân thiện

## 📂 Cấu trúc thư mục

```bash
THE_FLUFFY_PET/
├── index.html          # Trang chủ
├── about.html          # Trang Giới thiệu
├── contact.html        # Trang Liên hệ
├── css/                # Stylesheets
│   ├── global.css      # Biến CSS + Reset
│   ├── components/     # CSS components
│   ├── pages/          # Trang cụ thể
│   └── main.css        # Tổng hợp CSS
├── js/                 # JavaScript
│   ├── main.js         # Logic chung
│   └── pages/          # JS theo trang
├── assets/             # Tài nguyên
│   ├── images/         # Hình ảnh
│   ├── fonts/          # Font chữ
│   └── icons/          # Icon hệ thống
└── components/         # HTML components
    ├── header.html     # Header
    ├── footer.html     # Footer
    └── navbar.html     # Thanh điều hướng
```
## 🧩 Giải thích chi tiết

### 🎨 Thiết kế css

|File/Folder	| Chức năng|
|---------------|-------------------------------------------|
|global.css	| Chứa biến CSS, reset styles, và các lớp utility dùng chung|
|components/	| CSS cho các thành phần tái sử dụng vd: header/footer/navbar|
|pages/	| CSS riêng cho từng trang|

### ⚙️ Cấu trúc JavaScript

- `main.js`: xử lý logic chung
  - Xử lý sự kiện toàn cục
  - Load dynamic components
  - Common functions

- `pages/`: js riêng cho từng trang
  - `home.js`: Logic trang chủ (carousel, animation)
  - `contact.js`: Validate form + Xử lý 

### 📦 Components 
Chứa các file HTML phần tử lặp lại (header, footer)

ví dụ sử dụng:
```html
<!-- Ví dụ: header.html -->
<header class="main-header">
  <!-- Navigation -->
  <!-- Logo -->
</header>

<!-- Sử dụng trong trang chính -->
<script>
  fetch('components/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;
    });
</script>
```
