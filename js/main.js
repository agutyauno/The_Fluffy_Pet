// Cập nhật tỷ lệ khi load và resize
function updateScaleFactor() {
  const viewportWidth = window.innerWidth;
  if (viewportWidth > 1920) {
    document.documentElement.style.setProperty('--scale-factor', 1);
    return;
  }
  const scaleFactor = viewportWidth / 1920;
  document.documentElement.style.setProperty('--scale-factor', scaleFactor);
}

window.addEventListener('load', updateScaleFactor); // Khởi chạy lần đầu
window.addEventListener('resize', updateScaleFactor); // Cập nhật khi thay đổi kích thước cửa sổ

// Load header
fetch('../components/header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
    highlightActiveLink(); // (Tùy chọn) Thêm logic cho navigation
  });

// Load footer
fetch('../components/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  });

// (Tùy chọn) Hàm highlight menu theo trang hiện tại
function highlightActiveLink() {
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}