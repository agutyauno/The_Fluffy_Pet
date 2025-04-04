# The_Fluffy_Pet
Dự án cuối kì môn lập trình 

cấu trúc của các thư mục như sau:

THE_FLUFFY_PET/
├── index.html          # Trang chủ
├── about.html          # Trang Giới thiệu
├── contact.html        # Trang Liên hệ
├── css/                # Thư mục CSS
│   ├── global.css      # CSS chung (reset, biến, utility classes)
│   ├── components/     # CSS cho các components (header, footer)
│   ├── pages/          # CSS riêng cho từng trang
│   │   ├── home.css
│   │   ├── about.css
│   │   └── contact.css
│   └── main.css        # File tổng hợp (nếu dùng preprocessor)
├── js/                 # Thư mục JavaScript
│   ├── main.js         # JS chung (functions, event listeners)
│   └── pages/          # JS riêng cho từng trang
│       ├── home.js
│       ├── about.js
│       └── contact.js
├── assets/             # Thư mục tài nguyên
│   ├── images/         # Hình ảnh
│   ├── fonts/          # Font chữ
│   └── icons/          # Icons (SVG, etc.)
└── components/         # Thư mục chứa HTML components
    ├── header.html     # Header
    ├── footer.html     # Footer
    └── navbar.html     # Navigation bar

    <----------- Giải thích chi tiết: ----------->
HTML Files (Trang chính):

    Đặt trực tiếp ở thư mục gốc để dễ truy cập (ví dụ: index.html, about.html).

    Mỗi trang con có HTML riêng, giúp quản lý nội dung cụ thể.

Thư mục css/:

    global.css: Chứa biến CSS, reset styles, và các lớp utility dùng chung.

    components/: CSS cho các thành phần tái sử dụng (header, footer).

    pages/: CSS riêng cho từng trang (tránh override code).

Thư mục js/:

    main.js: Xử lý logic chung (ví dụ: load components, event listeners toàn cục).

    pages/: JS riêng cho từng trang (ví dụ: form validation ở trang contact).

Thư mục assets/:

    Tách biệt hình ảnh, fonts, icons để dễ quản lý.

Thư mục components/:

    Chứa các file HTML phần tử lặp lại (header, footer).

    Cách sử dụng: Dùng JavaScript để load dynamic content.