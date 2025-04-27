'use strict';
// Cập nhật tỷ lệ khi load và resize
var viewportWidth;
var scaleFactor;
function updateScaleFactor() {
  viewportWidth = window.innerWidth;
  if (viewportWidth > 1920) {
    document.documentElement.style.setProperty('--scale-factor', 1);
    return;
  }
  scaleFactor = viewportWidth / 1920;
  document.documentElement.style.setProperty('--scale-factor', scaleFactor);
}

window.addEventListener('load', updateScaleFactor); // Khởi chạy lần đầu
window.addEventListener('resize', updateScaleFactor); // Cập nhật khi thay đổi kích thước cửa sổ
