    // Chức năng hiển thị form đã chọn và ẩn các form khác
function showForm(formId) {
    // Ẩn tất cả biểu mẫu
    document.querySelectorAll('.form').forEach(form => {
        form.classList.add('hidden');
    });
    
    // Hiển thị biểu mẫu đã chọn
    document.getElementById(formId).classList.remove('hidden');
}

// Thêm trình xử lý gửi biểu mẫu
document.querySelectorAll('.form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Lấy tất cả các giá trị đầu vào từ biểu mẫu
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Ở đây bạn thường sẽ gửi dữ liệu đến phần phụ trợ của bạn(backend)
        console.log('Form submitted:', data);
        
        // Xóa biểu mẫu
        this.reset();
        
        // Hiển thị thông báo thành công (bạn có thể tùy chỉnh)
        alert('Form submitted successfully!');
        
        // Chuyển hướng đến biểu mẫu đăng nhập nếu đang đăng ký hoặc đặt lại mật khẩu
        if (this.id !== 'loginForm') {
            showForm('loginForm');
        }
    });
});
