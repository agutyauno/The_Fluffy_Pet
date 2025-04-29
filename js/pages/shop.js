// Dropdown Handler
const dropdownHandler = {
    init() {
        document.querySelectorAll('.dropdown-input').forEach(input => {
            const dropdown = input.parentElement;
            const list = dropdown.querySelector('.dropdown-list');
            const options = list.querySelectorAll('.option');

            this.setupEventListeners(input, list, options);
        });
    },

    setupEventListeners(input, list, options) {
        input.addEventListener('focus', () => this.showDropdown(list));
        input.addEventListener('blur', () => this.hideDropdown(list));
        input.addEventListener('input', () => this.filterOptions(input, options));

        options.forEach(option => {
            option.addEventListener('click', () => this.selectOption(input, list, option));
        });
    },

    showDropdown(list) {
        list.style.display = 'block';
    },

    hideDropdown(list) {
        setTimeout(() => {
            list.style.display = 'none';
        }, 100);
    },

    filterOptions(input, options) {
        const value = input.value.toLowerCase();
        options.forEach(option => {
            option.style.display = option.textContent.toLowerCase().includes(value) ? 'block' : 'none';
        });
    },

    selectOption(input, list, option) {
        input.value = option.textContent;
        list.style.display = 'none';
    }
};

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
        document.querySelectorAll('.dropdown-input').forEach(input => input.value = '');
        document.querySelector('input[name="gender"][value="none"]').checked = true;
        document.querySelector('input[name="vaccination"][value="none"]').checked = true;
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

const productHandler = {
    async fetchAndDisplayProducts(type, limit = 0) {
        try {
            const response = await fetch(`https://localhost:5201/api/${type}?limit=${limit}`);
            const data = await response.json();
            this.renderProducts(data, type);
        } catch (error) {
            console.error('Error fetching products:', error);
            this.showError();
        }
    },

    renderProducts(data, type) {
        const productGrid = document.querySelector('.product-grid');
        productGrid.innerHTML = '';

        data.forEach(item => {
            const discountedPrice = item.price * (1 - item.discount / 100);
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            
            productItem.innerHTML = `
                <img src="${item.imageUrl || './assets/image/img-placeholder.png'}" alt="${item.name}" class="product-img">
                <div class="product-tag">${item.breed || item.category || ''}</div>
                ${type !== 'products' ? `
                    <div class="pet_gender">${item.gender ? 'Đực' : 'Cái'}</div>
                ` : ''}
                <p class="product-name">${item.name}</p>
                <div class="product-price">
                    <p class="product-current_price">${discountedPrice.toLocaleString()}<span class="product-price-unit">đ</span></p>
                    ${item.discount > 0 ? `
                        <p class="product-old_price">${item.price.toLocaleString()}<span class="product-price-unit">đ</span></p>
                        <p class="discount">${item.discount}<span class="product-discount_unit">%</span></p>
                    ` : ''}
                </div>
                <input type="button" value="chọn" onclick="select${type.slice(0,-1)}(${item.id})">
            `;
            
            productGrid.appendChild(productItem);
        });
    },
};

// Initialize all handlers
document.addEventListener('DOMContentLoaded', () => {
    dropdownHandler.init();
    filterHandler.init();
    // Có thể gọi với các tham số khác nhau
    productHandler.fetchAndDisplayProducts('cats', 20);
});