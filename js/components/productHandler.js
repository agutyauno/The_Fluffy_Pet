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
            let endpoint;
            switch(type) {
                case 'cats':
                    endpoint = 'cats';
                    break;
                case 'dogs':
                    endpoint = 'dogs';
                    break;
                default:
                    endpoint = 'Products';
            }

            const response = await fetch(`${this.config.apiBaseUrl}/${endpoint}?limit=${limit}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Fetched products:', data);
            
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
        let discountedPrice;
        let productItem = document.createElement('div');
        productItem.className = 'product-item';

        if (type !== 'products') {
            discountedPrice = item.price * (1 - item.discount / 100);
            
            productItem.innerHTML = `
                <img src="${item.imageUrl || this.config.imagePlaceholder}" alt="${item.name}" class="product-img">
                <div class="product-tag">${item.breed || ''}</div>
                <div class="pet_gender">${item.gender ? 'Đực' : 'Cái'}</div>
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
        }
        else{
            const defaultVariant = item.variants[0];
            const imageUrl = item.imageUrl[0];
            discountedPrice = defaultVariant.price * (1 - item.discount / 100);

            productItem.innerHTML = `
                <img src="${imageUrl || this.config.imagePlaceholder}" alt="${item.name}" class="product-img">
                <div class="product-tag">${item.category || ''}</div>
                <p class="product-name">${item.name}</p>
                <div class="product-price">
                    <p class="product-current_price">${discountedPrice.toLocaleString()}<span class="product-price-unit">${this.config.currency}</span></p>
                    ${item.discount > 0 ? `
                        <p class="product-old_price">${defaultVariant.price.toLocaleString()}<span class="product-price-unit">${this.config.currency}</span></p>
                        <p class="discount">${item.discount}<span class="product-discount_unit">%</span></p>
                    ` : ''}
                </div>
                <input type="button" value="${this.config.selectButtonText}" class="select-button">
            `;
        }

        const selectButton = productItem.querySelector('.select-button');
        if (this.config.onSelect) {
            selectButton.addEventListener('click', () => this.config.onSelect(item, type));
        }
        
        return productItem;
    }
}