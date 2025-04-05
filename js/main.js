// Cập nhật tỷ lệ khi load và resize
function updateScaleFactor() {
    const viewportWidth = window.innerWidth;
    const scaleFactor = viewportWidth / 1920;
    document.documentElement.style.setProperty('--scale-factor', scaleFactor);
  }
  
  window.addEventListener('resize', updateScaleFactor);
  updateScaleFactor(); // Khởi chạy lần đầu
  window.addEventListener('load', updateScaleFactor);
  updateScaleFactor();
