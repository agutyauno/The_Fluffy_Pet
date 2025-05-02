// Load header
fetch('./components/header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  });

// Load footer
fetch('./components/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  });

  window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.nav_bar');
    const body = document.body;
    const scrollPosition = window.scrollY;
  
    if (scrollPosition > 49 * scaleFactor) { // Thay đổi giá trị này theo nhu cầu
      navbar.classList.add('fixed');
      body.classList.add('navbar-fixed');
    } else {
      navbar.classList.remove('fixed');
      body.classList.remove('navbar-fixed');
    }
});

// Khởi tạo NavbarManager khi DOM đã load
document.addEventListener('DOMContentLoaded', () => {
    NavbarManager.init();
});