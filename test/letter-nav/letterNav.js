class LetterNav{
    constructor(config) {
        this.nav = config.nav;
        this.callback = config.callback;
        this.extent = config.extent || 4;
        this.init();
    }

    init() {
        this.initView();
        this.registerListener();
    }

    /**
     * 初始化视图
     */
    initView() {
        let wrap = this.wrap = document.createElement('ul');
        wrap.className = 'letter-nav';
        wrap.innerHTML = this.nav.map(item => `<li class="item">${item}</li>`).join('');
        document.body.appendChild(wrap);
        this.navItems = Array.from(wrap.querySelectorAll('.item'));
        let halfNavItemHeight = this.activeDistance = this.navItems[0].clientHeight / 2;
        this.navPositionCache = this.navItems.map(item => item.getBoundingClientRect().top + halfNavItemHeight);
    }

    /**
     * 注册事件
     */
    registerListener() {
        let body = document.body;
        let touchMove = (e) => {
            let clientY = e.touches[0].clientY;
            this.refreshTouchView(clientY);
        }

        this.wrap.addEventListener('touchstart', (e) => {
            if (this.wrap.classList.contains('touched')) {
                return;
            }
            let clientY = e.touches[0].clientY;
            this.refreshTouchView(clientY);
            body.addEventListener('touchmove', touchMove);
            setTimeout(() => {
                this.wrap.classList.add('touched');
            }, 300)
        });

        body.addEventListener('touchend', () => {
            this.wrap.classList.remove('touched')
            this.restoreStyle();
            body.removeEventListener('touchmove', touchMove)
        })
    }

    refreshTouchView(clientY) {
        let activeIndex = this.navPositionCache.findIndex(y => Math.abs(clientY - y) <= this.activeDistance);
        if (this.activeIndex !== activeIndex) {
            this.callback(this.nav[activeIndex]);
            if (this.activeIndex > -1) {
                this.navItems[this.activeIndex].classList.remove('active');
            }
            this.navItems[activeIndex].classList.add('active');
            this.activeIndex = activeIndex;
        }
        let startIndex = Math.max(0, activeIndex - this.extent);
        let endIndex = Math.min(activeIndex + this.extent, this.navItems.length - 1);
        // this.restoreStyle();
        for (let i = startIndex; i <= endIndex; i++) {
            this.updateNavItemStyle(i, clientY);
        }
    }

    /**
     * 更新单个 导航的样式
     * @param index
     * @param clientY
     */
    updateNavItemStyle(index, clientY) {
        let nav = this.navItems[index];
        let percent = Math.min(Math.abs(clientY - this.navPositionCache[index]) / (this.activeDistance * 2 * this.extent), 1);
        nav.style.opacity = Number((0.75 + 0.25 * percent).toFixed(2));
        nav.style.left = `${~~(-100 * Math.cos(Math.PI / 2 * percent))}px`;
        nav.style.transform = `scale(${((1-percent) * 2 + 1).toFixed(2)})`
    }

    /**
     * 复原样式
     */
    restoreStyle() {
        this.navItems.forEach((nav) => {
            nav.style.opacity = 1;
            nav.style.left = 0;
            nav.style.transform = 'scale(1)';
        })
    }
}