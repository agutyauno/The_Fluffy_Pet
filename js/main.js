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

// Load header
fetch('../components/header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  });

// Load footer
fetch('../components/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  });

window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.nav_bar');
  const body = document.body;
  const scrollPosition = window.scrollY;

  if (scrollPosition > 115 * scaleFactor) { // Thay đổi giá trị này theo nhu cầu
    navbar.classList.add('fixed');
    body.classList.add('navbar-fixed');
  } else {
    navbar.classList.remove('fixed');
    body.classList.remove('navbar-fixed');
  }
});
