const SliderManager = {
    listImage: null,
    imgs: null,
    prevBtn: null,
    nextBtn: null,
    dots: null,
    currentIndex: 1,
    slideInterval: null,
    isTransitioning: false,

    init() {
        this.cacheElements();
        this.setupInitialPosition();
        this.setupEventListeners();
        this.startAutoSlide();
        this.updateDots();
    },

    cacheElements() {
        this.listImage = document.querySelector('.list-images');
        this.imgs = document.querySelectorAll('.list-images img');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.dots = document.querySelectorAll('.dot');
    },

    setupInitialPosition() {
        const width = this.imgs[0].offsetWidth;
        this.listImage.style.transition = 'none';
        this.listImage.style.transform = `translateX(${-width}px)`;
        requestAnimationFrame(() => {
            this.listImage.style.transition = 'transform 0.5s ease';
        });
    },

    updateDots() {
        const numRealImages = this.imgs.length - 2;
        this.dots.forEach((dot, index) => {
            const activeIndex = (this.currentIndex - 1 + numRealImages) % numRealImages;
            dot.classList.toggle('active', index === activeIndex);
        });
    },

    moveSlide(direction) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        const width = this.imgs[0].offsetWidth;
        if (direction === 'next') {
            this.currentIndex++;
        } else {
            this.currentIndex--;
        }
        
        this.listImage.style.transform = `translateX(${-width * this.currentIndex}px)`;

        setTimeout(() => {
            const numRealImages = this.imgs.length - 2;
            if (this.currentIndex === this.imgs.length - 1) {
                this.currentIndex = 1;
                this.listImage.style.transition = 'none';
                this.listImage.style.transform = `translateX(${-width * this.currentIndex}px)`;
                requestAnimationFrame(() => {
                    this.listImage.style.transition = 'transform 0.5s ease';
                });
            } else if (this.currentIndex === 0) {
                this.currentIndex = numRealImages;
                this.listImage.style.transition = 'none';
                this.listImage.style.transform = `translateX(${-width * this.currentIndex}px)`;
                requestAnimationFrame(() => {
                    this.listImage.style.transition = 'transform 0.5s ease';
                });
            }
            this.updateDots();
            this.isTransitioning = false;
        }, 500);
    },

    goToSlide(index) {
        if (this.isTransitioning) return;
        this.stopAutoSlide();
        this.isTransitioning = true;
        const width = this.imgs[0].offsetWidth;
        this.currentIndex = index + 1;
        this.listImage.style.transform = `translateX(${-width * this.currentIndex}px)`;
        this.updateDots();
        setTimeout(() => {
            this.isTransitioning = false;
            this.startAutoSlide();
        }, 500);
    },

    startAutoSlide() {
        this.stopAutoSlide();
        this.slideInterval = setInterval(() => {
            this.moveSlide('next');
        }, 4000);
    },

    stopAutoSlide() {
        clearInterval(this.slideInterval);
    },

    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => {
            this.stopAutoSlide();
            this.moveSlide('prev');
        });

        this.nextBtn.addEventListener('click', () => {
            this.stopAutoSlide();
            this.moveSlide('next');
        });

        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
    }
};

const PetSearchManager = {
    init() {
        this.setupTabs();
    },

    setupTabs() {
        const tabs = document.querySelectorAll('.tab-btn');
        const grids = document.querySelectorAll('.pets-grid');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and grids
                tabs.forEach(t => t.classList.remove('active'));
                grids.forEach(g => g.classList.remove('active'));

                // Add active class to clicked tab and corresponding grid
                tab.classList.add('active');
                const category = tab.dataset.category;
                document.getElementById(`${category}-grid`).classList.add('active');
            });
        });
    }
};

// Initialize managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    SliderManager.init();
    PetSearchManager.init();
});

// Pet Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const dogBreeds = document.getElementById('dogBreeds');
    const catBreeds = document.getElementById('catBreeds');

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show/hide appropriate content
            const category = tab.dataset.category;
            if (category === 'dog') {
                dogBreeds.classList.remove('hidden');
                catBreeds.classList.add('hidden');
            } else {
                catBreeds.classList.remove('hidden');
                dogBreeds.classList.add('hidden');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const instaGrid = document.getElementById('instaGrid');
    let scrollPosition = 0;
    const speed = 0.2; // Tốc độ cuộn (pixel mỗi frame)
    const postWidth = instaGrid.querySelector('.insta-post').offsetWidth; // Chiều rộng của mỗi post
    const totalPosts = instaGrid.querySelectorAll('.insta-post').length; // Tổng số post
    const originalPosts = totalPosts / 5; // Số post gốc (trước khi nhân bản)
    const loopPoint = postWidth * originalPosts; // Điểm để reset vòng lặp

    function scrollGrid() {
        scrollPosition += speed;
        // Nếu cuộn qua một chu kỳ (4 post gốc), reset vị trí
        if (scrollPosition >= loopPoint) {
            scrollPosition = 0;
        }
        instaGrid.style.transform = `translateX(-${scrollPosition}px)`;
        requestAnimationFrame(scrollGrid);
    }

    // Bắt đầu cuộn
    requestAnimationFrame(scrollGrid);
});
