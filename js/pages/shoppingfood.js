document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('productId');
    console.log(productId);
    
    fetchProduct(productId);
})

function fetchProduct(productId) {
    fetch(`https://localhost:5201/api/Products/${productId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Fetched product:', data);
        displayProductDetails(data, 0);
    })
}

async function addToCart(product, variantNum = 0) {
    try {
        const cartItem = {
            name: product.name,
            imageUrl: product.imageUrl[0],
            price: product.variants[variantNum].price,
            discount: product.discount || 0 // Ensure discount is 0 if not provided
        };

        const response = await fetch('https://localhost:5201/api/Carts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(cartItem)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to add item to cart');
        }

        const result = await response.json();
        console.log('Added to cart:', result);
        
        // Show success message
        alert('Đã thêm sản phẩm vào giỏ hàng!');
        
    } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Không thể thêm vào giỏ hàng. Vui lòng thử lại!');
    }
}

function displayProductDetails(product, variantNum = 0) {
    const discountedPrice = product.variants[variantNum].price - (product.variants[variantNum].price * product.discount / 100);
    const productDetails = document.querySelector('.centered-fixed');
    productDetails.innerHTML = `
       <div class="image-food">
            <div class="image-left">
                <img src="${product.imageUrl[0]}" alt="#" class="image-left-small">
                <img src="${product.imageUrl[1]}" alt="#" class="image-left-small">
                <img src="${product.imageUrl[2]}" alt="#" class="image-left-small">
                <img src="${product.imageUrl[3]}" alt="#" class="image-left-small">
                <img src="${product.imageUrl[4]}" alt="#" class="image-left-small">
            </div>
            <div class="image-rigt">
                <img src="${product.imageUrl[0]}" alt="#" class="image-right-big">
            </div>
        </div>
        <!-- Thông tin sản phẩm -->
        <div class="product">
            <div class="information">
                <div class="name_product">${product.name}</div>
                <div class="combine">
                    <div class="trademark">Thương hiệu:
                        <div class="name_trademark">${product.brand}</div>
                    </div>
                </div>
                <div class="invertory">Tình trạng: ${product.variants[variantNum].isAvailable?'Còn Hàng':'Hết Hàng'}</div>
            </div>
            <div class="money">
                ${product.discount > 0?`
                    <div class="sale">${product.discount}</div>
                    <div class="sale_money">${product.variants[variantNum].price}</div>`:``}
                <div class="principal">${discountedPrice}</div>
            </div>
            <div class="group_other">
                <div class="other">Hương vị:</div>
                ${product.variants.map((variant, index) => `
                    <div class="group_type${index + 1}">
                        <a href="#" class="lnik_type">
                            <div class="type">${variant.name}</div>
                        </a>
                    </div>
                `).join('')}
            </div>
            <!-- Thanh thêm sản phẩm, và thêm giỏ hàng -->
            <div class="grop_products">
                <button class="add_to_cart">THÊM VÀO GIỎ</button>
            </div>
            <!-- Thông tin sản phẩm -->
            <div class="product_info">
                <div class="info_header">
                    <h2>Thông tin sản phẩm</h2>
                    <span class="toggle_icon">+</span>
                </div>
                <div class="info_content">
                    <ul>
                        <li class="font_info_content">${product.description}</li>
                        
                    </ul>
                </div>
            </div>
            <!-- Dịch vụ giao hàng -->
            <div class="product_info2">
                <div class="info_header">
                    <h2>Dịch vụ giao hàng</h2>
                    <span class="toggle_icon">+</span>
                </div>
                <div class="group_information">
                    <div class="information1">
                        <img src="./assets/image/shoppingfood/icon1.png" alt="#" class="icon_information1">
                        <div class="thongtin">
                            Miễn phí đổi hàng</div>
                    </div>
                    <div class="information1">
                        <img src="./assets/image/shoppingfood/icon2.png" alt="#" class="icon_information1">
                        <div class="thongtin">
                            Giao hàng trong ngày:
                            <div class="bold">Đối với đơn nội thành Biên Hoà</div>
                        </div>
                    </div>
                </div>
                <div class="information1">
                    <img src="./assets/image/shoppingfood/icon3.png" alt="#" class="icon_information1">
                    <div class="thongtin">
                        Đặt hàng trực tuyến:
                        <div class="bold">Hotline: 0363.850.JQK</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const addToCartButton = document.querySelector('.add_to_cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            addToCart(product, variantNum);
        });
    }
}