// State management
const cartState = {
    items: [],
    pagination: {
        itemsPerPage: 5,
        currentPage: 1,
        totalPages: 0
    }
};

// API functions
async function fetchCartData() {
    try {
        const response = await fetch('https://localhost:5201/api/Carts');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        cartState.items = data;
        return data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        return [];
    }
}

// Pagination functions
function getCurrentPageItems() {
    const { currentPage, itemsPerPage } = cartState.pagination;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return cartState.items.slice(startIndex, endIndex);
}

function updatePagination() {
    const { items, pagination } = cartState;
    pagination.totalPages = Math.ceil(items.length / pagination.itemsPerPage);
    renderPagination();
}

function renderPagination() {
    const { currentPage, totalPages } = cartState.pagination;
    const paginationContainer = document.querySelector('.pagination');
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <button class="page-btn prev" ${currentPage === 1 ? 'disabled' : ''}>
            Trước
        </button>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <button class="page-btn number ${i === currentPage ? 'active' : ''}" 
                    data-page="${i}">
                ${i}
            </button>
        `;
    }

    // Next button
    paginationHTML += `
        <button class="page-btn next" ${currentPage === totalPages ? 'disabled' : ''}>
            Sau
        </button>
    `;

    paginationContainer.innerHTML = paginationHTML;
}

// Display functions
function renderCartItems() {
    const cartContainer = document.querySelector('.product-list');
    cartContainer.innerHTML = ''; // Clear existing items

    const itemsToShow = getCurrentPageItems();
    itemsToShow.forEach(item => {
        const cartItem = createCartItemElement(item);
        cartContainer.appendChild(cartItem);
    });

    // Update cart count and total
    updateCartCount(cartState.items.length);
    updateCartTotal(calculateTotal(cartState.items));
}

function createCartItemElement(item) {
    const discountedPrice = item.price - (item.price * item.discount / 100);
    const cartItem = document.createElement('div');
    cartItem.className = 'product';
    cartItem.innerHTML = `
        <div class="image-container">
            <img src="${item.imageUrl}" alt="${item.name}">
            ${item.discount ? `<p class="discount">${item.discount}%</p>` : ''}
        </div>
        <div class="product-details">
            <h2>${item.name}</h2>
            <div class="price-row">
                <p class="original-price">${item.price.toLocaleString()}đ</p>
            </div>
            <p class="subtotal">${discountedPrice.toLocaleString()}đ</p>
        </div>
    `;
    return cartItem;
}

function updateCartCount(total) {
    const cartSubtext = document.querySelector('.cart-subtext');
    if (cartSubtext) {
        cartSubtext.innerHTML = `Bạn đang có <span class="bold">${total} sản phẩm</span> trong giỏ hàng`;
    }
}

// Add new function to calculate total
function calculateTotal(items) {
    return items.reduce((total, item) => {
        const discountedPrice = item.price - (item.price * item.discount / 100);
        return total + discountedPrice;
    }, 0);
}

// Add new function to update total in UI
function updateCartTotal(total) {
    const totalElement = document.querySelector('.order-summary .total span');
    if (totalElement) {
        totalElement.textContent = `${total.toLocaleString()}đ`;
    }
}

// Event handlers
function setupPaginationEvents() {
    const paginationContainer = document.querySelector('.pagination');
    
    paginationContainer.addEventListener('click', (e) => {
        const btn = e.target;
        if (!btn.classList.contains('page-btn')) return;

        const { pagination } = cartState;

        if (btn.classList.contains('prev') && pagination.currentPage > 1) {
            pagination.currentPage--;
        } else if (btn.classList.contains('next') && pagination.currentPage < pagination.totalPages) {
            pagination.currentPage++;
        } else if (btn.classList.contains('number')) {
            pagination.currentPage = parseInt(btn.dataset.page);
        }

        renderCartItems();
        renderPagination();
    });
}

// Initialize
async function initializeCart() {
    const data = await fetchCartData();
    updatePagination();
    renderCartItems();
    setupPaginationEvents();
}

document.addEventListener('DOMContentLoaded', initializeCart);