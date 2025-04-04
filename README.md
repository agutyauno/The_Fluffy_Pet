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
🧩 Giải thích chi tiết
🎨 Thiết kế 

|-----------------------------------------------------------|
|File/Folder	| Chức năng|
|global.css	| Reset CSS + Biến màu + Utility classes|
|components/	| Style header/footer/navbar|
|pages/	| CSS riêng cho từng trang|
|main.css	| Import tất cả file CSS (nếu dùng preprocessor)|

⚙️ Cấu trúc JavaScript
- `main.js`: 
  - Xử lý sự kiện toàn cục
  - Load dynamic components
  - Common functions

- `pages/`:
  - `home.js`: Logic trang chủ (carousel, animation)
  - `contact.js`: Validate form + Xử lý 
  
📦 Components 
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
