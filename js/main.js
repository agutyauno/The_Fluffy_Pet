// Cập nhật tỷ lệ khi load và resize
function updateScaleFactor() {
    const viewportWidth = window.innerWidth;
    const scaleFactor = viewportWidth / 1920;
    document.documentElement.style.setProperty('--scale-factor', scaleFactor);
  }
  
  window.addEventListener('load', updateScaleFactor); // Khởi chạy lần đầu
  window.addEventListener('resize', updateScaleFactor); // Cập nhật khi thay đổi kích thước cửa sổ
  
