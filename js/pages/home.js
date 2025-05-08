import { ProductHandler } from '../components/productHandler.js';

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

const PromoManager = {
    productHandler: null,

    init() {
        this.productHandler = new ProductHandler({
            apiBaseUrl: 'https://localhost:5201/api',
            gridSelector: '.promo-grid',
            selectButtonText: 'CHỌN',
        });

        this.loadPromoProducts();
    },

    async loadPromoProducts() {
        try {
            await this.productHandler.fetchAndDisplayProducts('products', 15);
        } catch (error) {
            console.error('Error loading products:', error);
        }
    },
};

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    SliderManager.init();
    PetSearchManager.init();
    PromoManager.init();
});

// Pet Search Functionality
document.addEventListener('DOMContentLoaded', () => {
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

