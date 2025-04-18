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

const NavbarManager = {
    init() {
        this.setupNavbarScroll();
    },

    setupNavbarScroll() {
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.nav_bar');
            const body = document.body;
            const scrollPosition = window.scrollY;
            const scaleFactor = ScaleManager.getScaleFactor();
            
            if (scrollPosition > 115 * scaleFactor) {
                navbar.classList.add('fixed');
                body.classList.add('navbar-fixed');
            } else {
                navbar.classList.remove('fixed');
                body.classList.remove('navbar-fixed');
            }
        });
    }
};

// Khởi tạo NavbarManager khi DOM đã load
document.addEventListener('DOMContentLoaded', () => {
    NavbarManager.init();
});