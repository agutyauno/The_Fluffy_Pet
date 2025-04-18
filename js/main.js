const ScaleManager = {
    viewportWidth: 0,
    scaleFactor: 1,

    init() {
        this.updateScaleFactor();
        window.addEventListener('resize', () => this.updateScaleFactor());
    },

    updateScaleFactor() {
        this.viewportWidth = window.innerWidth;
        if (this.viewportWidth > 1920) {
            this.scaleFactor = 1;
        } else {
            this.scaleFactor = this.viewportWidth / 1920;
        }
        document.documentElement.style.setProperty('--scale-factor', this.scaleFactor);
    },

    getScaleFactor() {
        return this.scaleFactor;
    }
};

// Khởi tạo ScaleManager khi DOM đã load
document.addEventListener('DOMContentLoaded', () => {
    ScaleManager.init();
});

