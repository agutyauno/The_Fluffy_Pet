export class ProductHandler {
    constructor(config = {}) {
        this.config = {
            apiBaseUrl: config.apiBaseUrl || 'https://localhost:5201/api',
            gridSelector: config.gridSelector || '.product-grid',
            imagePlaceholder: config.imagePlaceholder || './assets/image/img-placeholder.png',
            onSelect: config.onSelect || null,
            customRender: config.customRender || null,
            currency: config.currency || 'đ',
            selectButtonText: config.selectButtonText || 'chọn'
        };
    }

    async fetchAndDisplayProducts(type, limit = 0) {
        try {
            const response = await fetch(`${this.config.apiBaseUrl}/${type}?limit=${limit}`);
            const data = await response.json();
            this.renderProducts(data, type);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    renderProducts(data, type) {
        const productGrid = document.querySelector(this.config.gridSelector);
        if (!productGrid) {
            console.error(`Element with selector "${this.config.gridSelector}" not found`);
            return;
        }
        
        productGrid.innerHTML = '';

        data.forEach(item => {
            if (this.config.customRender) {
                productGrid.appendChild(this.config.customRender(item, type));
                return;
            }

            const productItem = this.createProductElement(item, type);
            productGrid.appendChild(productItem);
        });
    }

    createProductElement(item, type) {
        const discountedPrice = item.price * (1 - item.discount / 100);
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        
        productItem.innerHTML = `
            <img src="${item.imageUrl || this.config.imagePlaceholder}" alt="${item.name}" class="product-img">
            <div class="product-tag">${item.breed || item.category || ''}</div>
            ${type !== 'products' ? `
                <div class="pet_gender">${item.gender ? 'Đực' : 'Cái'}</div>
            ` : ''}
            <p class="product-name">${item.name}</p>
            <div class="product-price">
                <p class="product-current_price">${discountedPrice.toLocaleString()}<span class="product-price-unit">${this.config.currency}</span></p>
                ${item.discount > 0 ? `
                    <p class="product-old_price">${item.price.toLocaleString()}<span class="product-price-unit">${this.config.currency}</span></p>
                    <p class="discount">${item.discount}<span class="product-discount_unit">%</span></p>
                ` : ''}
            </div>
            <input type="button" value="${this.config.selectButtonText}" class="select-button">
        `;

        const selectButton = productItem.querySelector('.select-button');
        if (this.config.onSelect) {
            selectButton.addEventListener('click', () => this.config.onSelect(item, type));
        }
        
        return productItem;
    }
}