// Xử lý dropdown
document.querySelectorAll('.dropdown-input').forEach(input => {
  const dropdown = input.parentElement;
  const list = dropdown.querySelector('.dropdown-list');
  const options = list.querySelectorAll('.option');

  input.addEventListener('focus', () => {
    list.style.display = 'block';
  });

  input.addEventListener('blur', () => {
    setTimeout(() => {
      list.style.display = 'none';
    }, 100); // Delay để xử lý click vào option
  });

  input.addEventListener('input', () => {
    const value = input.value.toLowerCase();
    options.forEach(option => {
      if (option.textContent.toLowerCase().includes(value)) {
        option.style.display = 'block';
      } else {
        option.style.display = 'none';
      }
    });
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      input.value = option.textContent;
      list.style.display = 'none';
    });
  });
});

// Xử lý nút tìm kiếm
document.querySelector('.search-button').addEventListener('click', () => {
  const breed = document.getElementById('cat-breed').value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const price = document.getElementById('price-range').value;
  const vaccination = document.querySelector('input[name="vaccination"]:checked').value;

  // In giá trị để kiểm tra (thay bằng logic lọc sản phẩm của bạn)
  console.log('Bộ lọc:', { breed, gender, price, vaccination });

  // Ví dụ: Gửi dữ liệu lọc đến hàm xử lý sản phẩm
  // applyFilters({ breed, gender, price, vaccination });
});

// Xử lý nút reset
document.querySelector('.reset-button').addEventListener('click', () => {
  document.querySelectorAll('.dropdown-input').forEach(input => input.value = '');
  document.querySelector('input[name="gender"][value="none"]').checked = true;
  document.querySelector('input[name="vaccination"][value="none"]').checked = true;

  // Gọi lại hàm áp dụng bộ lọc với giá trị mặc định nếu cần
  console.log('Đã reset bộ lọc');
});

const grid = document.querySelector('.product-grid');
const items = grid.children;
const maxItems = 20; // 4 cột x 5 hàng
for (let i = maxItems; i < items.length; i++) {
  items[i].style.display = 'none';
}