// Filter Handler
const filterHandler = {
    init() {
        this.setupSearchButton();
        this.setupResetButton();
    },

    setupSearchButton() {
        document.querySelector('.search-button').addEventListener('click', () => {
            const filters = this.getFilterValues();
            console.log('Bộ lọc:', filters);
            // TODO: Implement filter logic
            // this.applyFilters(filters);
        });
    },

    setupResetButton() {
        document.querySelector('.reset-button').addEventListener('click', () => {
            this.resetFilters();
            console.log('Đã reset bộ lọc');
        });
    },

    getFilterValues() {
        return {
            breed: document.getElementById('cat-breed').value,
            gender: document.querySelector('input[name="gender"]:checked').value,
            price: document.getElementById('price-range').value,
            vaccination: document.querySelector('input[name="vaccination"]:checked').value
        };
    },

    resetFilters() {
        // Reset breed select
        const breedInput = document.getElementById('cat-breed');
        if (breedInput) {
            breedInput.value = '';
            // Remove active class from options
            const options = breedInput.closest('.custom-select').querySelector('.select-options');
            options.classList.remove('active');
        }

        // Reset gender radio
        const defaultGender = document.querySelector('input[name="gender"][value="none"]');
        if (defaultGender) {
            defaultGender.checked = true;
        }

        // Reset price range
        const priceRange = document.getElementById('price-range');
        if (priceRange) {
            priceRange.value = '';
            // Remove active class from options
            const options = priceRange.closest('.custom-select').querySelector('.select-options');
            options.classList.remove('active');
        }

        // Reset vaccination radio
        const defaultVaccination = document.querySelector('input[name="vaccination"][value="none"]');
        if (defaultVaccination) {
            defaultVaccination.checked = true;
        }

        // Reset any hidden inputs or data attributes
        document.querySelectorAll('.select-input').forEach(input => {
            input.dataset.value = '';
        });

        // Refresh the product display
        const productType = getProductTypeFromUrl();
        shopProducts.fetchAndDisplayProducts(productType, 20);
    }
};

// Pagination Handler
const paginationHandler = {
    itemsPerPage: 20,
    currentPage: 1,

    init() {
        this.setupPaginationStyles();
        this.showPage(1);
        this.setupEventListeners();
    },

    setupEventListeners() {
        document.querySelector('.pagination').addEventListener('click', (e) => {
            if (e.target.classList.contains('page')) {
                this.showPage(parseInt(e.target.textContent));
            } else if (e.target.classList.contains('prev') && !e.target.disabled) {
                this.showPage(this.currentPage - 1);
            } else if (e.target.classList.contains('next') && !e.target.disabled) {
                this.showPage(this.currentPage + 1);
            }
        });
    },

    updatePagination() {
        const items = document.querySelectorAll('.product-item');
        const totalPages = Math.ceil(items.length / this.itemsPerPage);
        const pagination = document.querySelector('.pagination');

        pagination.innerHTML = '';

        this.createNavigationButton('prev', 'Prev', this.currentPage === 1, pagination);
        this.createPageButtons(totalPages, pagination);
        this.createNavigationButton('next', 'Next', this.currentPage === totalPages, pagination);
    },

    createNavigationButton(className, text, disabled, container) {
        const button = document.createElement('button');
        button.classList.add(className);
        button.textContent = text;
        button.disabled = disabled;
        container.appendChild(button);
    },

    createPageButtons(totalPages, container) {
        let startPage = Math.max(1, this.currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);

        if (endPage === totalPages) {
            startPage = Math.max(1, endPage - 4);
        }

        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement('button');
            pageButton.classList.add('page');
            pageButton.textContent = i;
            if (i === this.currentPage) {
                pageButton.classList.add('active');
            }
            container.appendChild(pageButton);
        }
    },

    showPage(pageNumber) {
        const items = document.querySelectorAll('.product-item');
        const startIndex = (pageNumber - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;

        items.forEach((item, index) => {
            item.style.display = (index >= startIndex && index < endIndex) ? 'block' : 'none';
        });

        this.currentPage = pageNumber;
        this.updatePagination();
    },

    setupPaginationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .pagination .page.active {
                background-color: #007bff;
                color: white;
            }
            .pagination button:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            .pagination button {
                margin: 0 calc(4px*var(--scale-factor));
                border: 1px solid #ddd;
                background-color: white;
                cursor: pointer;
                border-radius: calc(4px*var(--scale-factor));
                font-size: var(--font-medium);
            }
            .pagination button.page {
                width: 30px;
                height: 30px;
                padding: 0;
                box-sizing: border-box;
                display: inline-flex;
                align-items: center;
                justify-content: center;
            }
            .pagination button.prev,
            .pagination button.next {
                padding: 0 12px;
                height: 30px;
            }
            .pagination button:hover:not(:disabled) {
                background-color: #f0f0f0;
            }
        `;
        document.head.appendChild(style);
    }
};

const customSelectHandler = {
    init() {
        document.querySelectorAll('.custom-select').forEach(select => {
            this.setupSelect(select);
        });
    },

    setupSelect(select) {
        const input = select.querySelector('.select-input');
        const options = select.querySelector('.select-options');
        let highlightedIndex = -1;

        // Xử lý input
        input.addEventListener('input', () => {
            const value = input.value.toLowerCase();
            let hasVisibleOptions = false;

            options.classList.add('active');
            
            options.querySelectorAll('li').forEach(option => {
                const text = option.textContent.toLowerCase();
                const isVisible = text.includes(value);
                option.classList.toggle('hidden', !isVisible);
                if (isVisible) hasVisibleOptions = true;
            });

            options.classList.toggle('empty', !hasVisibleOptions);
            highlightedIndex = -1;
        });

        // Xử lý focus
        input.addEventListener('focus', () => {
            options.classList.add('active');
        });

        // Xử lý keyboard navigation
        input.addEventListener('keydown', (e) => {
            const visibleOptions = Array.from(options.querySelectorAll('li:not(.hidden)'));
            
            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    highlightedIndex = Math.min(highlightedIndex + 1, visibleOptions.length - 1);
                    this.updateHighlight(visibleOptions, highlightedIndex);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    highlightedIndex = Math.max(highlightedIndex - 1, 0);
                    this.updateHighlight(visibleOptions, highlightedIndex);
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (highlightedIndex >= 0) {
                        this.selectOption(visibleOptions[highlightedIndex], input, options);
                    }
                    break;
                case 'Escape':
                    options.classList.remove('active');
                    input.blur();
                    break;
            }
        });

        // Xử lý click option
        options.querySelectorAll('li').forEach(option => {
            option.addEventListener('click', () => {
                this.selectOption(option, input, options);
                options.classList.remove('active');
            });
        });

        // Đóng dropdown khi click ngoài
        document.addEventListener('click', (e) => {
            if (!select.contains(e.target)) {
                options.classList.remove('active');
            }
        });
    },

    updateHighlight(options, index) {
        options.forEach(opt => opt.classList.remove('highlighted'));
        if (index >= 0) {
            options[index].classList.add('highlighted');
            options[index].scrollIntoView({ block: 'nearest' });
        }
    },

    selectOption(option, input, options) {
        input.value = option.textContent;
        input.dataset.value = option.dataset.value;
        options.classList.remove('active');
        input.focus();
    }
};

import { ProductHandler } from "../components/productHandler.js";  // Thêm .js

const shopProducts = new ProductHandler({
    apiBaseUrl: 'https://localhost:5201/api',
    selectButtonText: 'Thêm vào giỏ',
    onSelect: (item, type) => {
        console.log(`Selected ${type} item:`, item);
        if (type === 'cats' ) {
            window.location.href = `./Shopping_Pet.html?${item.catId}`;
        }
        else if (type === 'dogs'){
            window.location.href = `./Shopping_Pet.html?${item.dogId}`;
        }
        else{
            window.location.href = `./shoppingfood.html?productId=${item.productId}`
        }
    }
});

// Hàm lấy loại sản phẩm từ URL
function getProductTypeFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('type') || 'all'; // Mặc định hiển thị tất cả nếu không có type
}

function updatePageBanner(type) {
    const banner = document.querySelector('.shop-banner');
    if (banner) {
        switch (type) {
            case 'cats':
                banner.src = './assets/image/banner/cat-banner.jpg';
                break;
            case 'dogs':
                banner.src = './assets/image/banner/dog-banner.jpg';
                break;
            default:
                banner.src = './assets/image/banner/default-banner.jpg';
        }
    }
}

// Hàm cập nhật tiêu đề trang
function updatePageTitle(type) {
    const titleMap = {
        'cats': 'Bé Mèo',
        'dogs': 'Bé Chó',
        'products': 'Sản Phẩm',
    };
    
    const shopTitle = document.querySelector('.shop-title');
    if (shopTitle) {
        shopTitle.textContent = titleMap[type] || 'Tất Cả Sản Phẩm';
    }
}

// Initialize all handlers
document.addEventListener('DOMContentLoaded', () => {
    const productType = getProductTypeFromUrl();
    
    filterHandler.init();
    paginationHandler.init();
    customSelectHandler.init();
    
    // Cập nhật tiêu đề
    updatePageTitle(productType);
    updatePageBanner(productType);
    
    // Fetch sản phẩm theo loại
    shopProducts.fetchAndDisplayProducts(productType, 20);
});