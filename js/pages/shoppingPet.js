// Xử lý sự kiện cho phần tiêm chủng
function setupVaccineHandlers() {
    document.querySelectorAll('.dose').forEach(item => {
        item.addEventListener('click', function () {
            const type = this.getAttribute('data-type');
            const doseNumber = this.getAttribute('data-dose');
            const details = document.getElementById(`${type}-details-${doseNumber}`);

            if (details) {
                details.classList.toggle('active');
            }
        });
    });
}

// Xử lý sự kiện cho phần mô tả
function setupDescriptionHandler() {
    document.querySelector('.description-header').addEventListener('click', function () {
        const content = document.getElementById('description-content');

        if (content) {
            content.classList.toggle('active');
        }
    });
}

// Xử lý slider
function setupImageSlider() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const leftArrow = document.querySelector('.arrow.left');
    const rightArrow = document.querySelector('.arrow.right');
    let currentIndex = 0;

    function updateSlider() {
        const scrollAmount = slides[0].clientWidth + 10; // Cộng 10px cho margin
        slider.scrollTo({
            left: currentIndex * scrollAmount,
            behavior: 'smooth'
        });
    }

    if (leftArrow) {
        leftArrow.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
    }

    if (rightArrow) {
        rightArrow.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                updateSlider();
            }
        });
    }

    // Tự động điều chỉnh khi resize window
    window.addEventListener('resize', updateSlider);
}

function getTypeFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    let id;
    if (type === 'cat') {
        // Fetch and display cat products
        id = params.get('catId');
        fetchPet(type, id);
    }
    else if (type === 'dog') {
        // Fetch and display dog products
        id = params.get('dogId');
        fetchPet(type, id);
    }
    else {
        console.error('Invalid type parameter');
    }
}

async function fetchPet(type, id) {
    try {
        let response;
        if (type === 'dog') {
            response = await fetch(`https://localhost:5201/api/dogs/${id}`);
        }
        else if (type === 'cat') {
            response = await fetch(`https://localhost:5201/api/cats/${id}`);
        }
        else {
            throw new Error('Invalid type parameter');
        }

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayPetDetails(data);
    } catch (error) {
        console.error('Error fetching pet data:', error);
    }
}

function displayPetDetails(pet) {
    const petDetail = document.querySelector('.centered-fixed');
    const defaultImage = './assets/image/img-placeholder.png'; // Add a default image path

    // Helper function to safely get image URL
    const getImageUrl = (urls, index) => {
        return urls && urls[index] ? urls[index] : defaultImage;
    };

    // Calculate discounted price
    const price = pet.price;
    const discountedPrice = pet.discount ? price * (1 - pet.discount / 100) : price;
    petDetail.innerHTML = ''; // Clear previous content
    petDetail.innerHTML = `
    <div class="group_head">
            <div class="image_pet_left">
                <div class="imgage_pet">
                    <div class="image_pet_big"><img src="${getImageUrl(pet.imageUrls, 0)}" alt="${pet.name}" class="pet"></div>
                    <div class="image_pet_small">
                        <img src="${getImageUrl(pet.imageUrls, 1)}" alt="${pet.name}" class="image_small">
                        <img src="${getImageUrl(pet.imageUrls, 2)}" alt="${pet.name}" class="image_small">
                        <img src="${getImageUrl(pet.imageUrls, 3)}" alt="${pet.name}" class="image_small">
                        <img src="${getImageUrl(pet.imageUrls, 4)}" alt="${pet.name}" class="image_small">
                    </div>
                </div>
            </div>
            <div class="information_right">
                <div class="name_pet">${pet.name}</div>
                <div class="Buy">
                    ${discountedPrice.toLocaleString()}đ
                    ${pet.discount ? `<span class="original-price">${price.toLocaleString()}đ</span>` : ''}
                </div>
                <div class="group">
                    <div class="info_section">
                        <div class="label_bold">Giới tính:</div>
                        <div class="value">${pet.gender ? 'Đực' : 'Cái'}</div>
                    </div>
                    <div class="info_section">
                        <div class="label_bold">Ngày sinh:</div>
                        <div class="value">${pet.birthDate || 'Chưa có thông tin'}</div>
                    </div>
                </div>
                <div class="group">
                    <div class="info_section">
                        <div class="label_bold">Màu lông:</div>
                        <div class="value">${pet.color || 'Chưa có thông tin'}</div>
                    </div>
                    <div class="info_section">
                        <div class="label_bold">Cân nặng hiện tại:</div>
                        <div class="value">${pet.weight ? pet.weight + 'kg' : 'Chưa có thông tin'}</div>
                    </div>
                </div>
                <div class="group">
                    <div class="info_section">
                        <div class="label_bold">Sức khỏe:</div>
                        <div class="value">${pet.health || 'Khỏe mạnh'}</div>
                    </div>
                </div>
                <h>Tiêm chủng</h>
                <div class="group">
                    <div class="container">
                        <div class="section">
                            <div class="group_group">
                                <div class="dose-group">
                                    ${pet.vaccinateDates ? renderVaccinations(pet.vaccinateDates) : 'Chưa có thông tin tiêm chủng'}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="info_section">
                        <div class="label_bold">Tẩy giun:</div>
                        <div class="value">${pet.dewormed ? 'Đã tẩy' : 'Chưa tẩy'}</div>
                    </div>
                </div>
                <div class="grouppp">
                    <button class="buy_pet">Nhận nuôi</button>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="description-section">
              <div class="description-header">
                Mô tả: <span>+</span>
              </div>
              <div id="description-content" class="description-content">
                ${pet.description || 'Chưa có mô tả'}
              </div>
            </div>
        </div>
    `;

    // Reattach event handlers after updating HTML
    setupVaccineHandlers();
    setupDescriptionHandler();
    setupImageSlider();
}

// Add helper function for rendering vaccinations
function renderVaccinations(vaccinateDates) {
    if (!vaccinateDates || vaccinateDates.length === 0) return '';
    
    return vaccinateDates.map((date, index) => `
        <div class="dose" data-type="vaccine" data-dose="${index + 1}">
            Lần ${index + 1}: ${new Date(date).toLocaleDateString('vi-VN')}
        </div>
    `).join('');
}

// Khởi tạo tất cả các handlers khi DOM được load
document.addEventListener('DOMContentLoaded', () => {
    setupVaccineHandlers();
    setupDescriptionHandler();
    setupImageSlider();
    getTypeFromUrl();
});