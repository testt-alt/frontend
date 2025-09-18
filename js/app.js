// Main application logic
class ProBookingApp {
    constructor() {
        this.currentUser = null;
        this.currentRole = null;
        this.currentPage = 'home';
        this.theme = localStorage.getItem('theme') || 'light';
        this.isLoading = true;
        
        this.init();
    }

    init() {
        this.initializeTheme();
        this.setupEventListeners();
        this.showLoadingScreen();
        
        // Simulate loading time
        setTimeout(() => {
            this.hideLoadingScreen();
            this.checkAuthStatus();
        }, 3000);
    }

    initializeTheme() {
        if (this.theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.initializeTheme();
        
        // Update theme toggle icon
        const themeBtn = document.getElementById('theme-toggle');
        const icon = themeBtn.querySelector('i');
        icon.setAttribute('data-lucide', this.theme === 'dark' ? 'sun' : 'moon');
        lucide.createIcons();
    }

    setupEventListeners() {
        // Theme toggle
        document.addEventListener('click', (e) => {
            if (e.target.closest('#theme-toggle')) {
                this.toggleTheme();
            }
        });

        // Logo click
        document.addEventListener('click', (e) => {
            if (e.target.closest('#logo-btn')) {
                this.navigateToHome();
            }
        });

        // Mobile menu toggle
        document.addEventListener('click', (e) => {
            if (e.target.closest('#mobile-menu-btn')) {
                this.toggleMobileMenu();
            }
        });
    }

    showLoadingScreen() {
        document.getElementById('loading-screen').classList.remove('hidden');
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-app').classList.add('hidden');
        
        // Animate progress bar
        const progressBar = document.getElementById('progress-bar');
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            }
            progressBar.style.width = progress + '%';
        }, 200);
    }

    hideLoadingScreen() {
        document.getElementById('loading-screen').classList.add('hidden');
        this.isLoading = false;
    }

    checkAuthStatus() {
        const savedUser = localStorage.getItem('probooking_user');
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                this.currentRole = this.currentUser.role;
                this.showMainApp();
            } catch (error) {
                localStorage.removeItem('probooking_user');
                this.showLoginScreen();
            }
        } else {
            this.showLoginScreen();
        }
    }

    showLoginScreen() {
        document.getElementById('loading-screen').classList.add('hidden');
        document.getElementById('login-screen').classList.remove('hidden');
        document.getElementById('main-app').classList.add('hidden');
        
        // Initialize login functionality
        if (window.AuthManager) {
            window.AuthManager.init();
        }
    }

    showMainApp() {
        document.getElementById('loading-screen').classList.add('hidden');
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-app').classList.remove('hidden');
        
        this.setupNavigation();
        this.loadDashboard();
    }

    setupNavigation() {
        const navItems = this.getNavigationItems();
        const navContainer = document.getElementById('nav-items');
        
        navContainer.innerHTML = navItems.map(item => `
            <button
                data-page="${item.href}"
                class="nav-item relative px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-500 hover:bg-white/60 dark:hover:bg-gray-800/60 hover:shadow-xl hover:scale-110 group text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
                <i data-lucide="${item.icon}" class="h-4 w-4 inline mr-2 group-hover:scale-125 transition-transform duration-300"></i>
                ${item.name}
                <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-0 group-hover:w-full transition-all duration-300 opacity-50"></div>
            </button>
        `).join('');

        // Add click listeners
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const page = e.currentTarget.getAttribute('data-page');
                this.navigateToPage(page);
            });
        });

        lucide.createIcons();
    }

    getNavigationItems() {
        const navigationMap = {
            professional: [
                { name: 'Home', href: 'home', icon: 'home' },
                { name: 'Profile', href: 'profile', icon: 'user' },
                { name: 'Services', href: 'services', icon: 'scissors' },
                { name: 'Calendar', href: 'calendar', icon: 'calendar' },
                { name: 'Appointments', href: 'appointments', icon: 'clock' },
                { name: 'Reviews', href: 'reviews', icon: 'star' },
                { name: 'Subscription', href: 'subscription', icon: 'credit-card' }
            ],
            client: [
                { name: 'Home', href: 'home', icon: 'home' },
                { name: 'Professionals', href: 'professionals', icon: 'user' },
                { name: 'Payments', href: 'payments', icon: 'credit-card' },
                { name: 'Appointments', href: 'appointments', icon: 'calendar' },
                { name: 'Reviews', href: 'reviews', icon: 'star' }
            ],
            superadmin: [
                { name: 'Home', href: 'home', icon: 'home' },
                { name: 'Professionals', href: 'professionals', icon: 'users' },
                { name: 'Clients', href: 'clients', icon: 'user' },
                { name: 'Appointments', href: 'appointments', icon: 'calendar' },
                { name: 'Services', href: 'services', icon: 'star' },
                { name: 'Reviews', href: 'reviews', icon: 'message-circle' },
                { name: 'Subscriptions', href: 'subscriptions', icon: 'credit-card' },
                { name: 'Reports', href: 'reports', icon: 'bar-chart-3' }
            ]
        };

        return navigationMap[this.currentRole] || [];
    }

    navigateToPage(page) {
        this.currentPage = page;
        this.updateActiveNavItem(page);
        this.loadPageContent(page);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navigateToHome() {
        this.navigateToPage('home');
    }

    updateActiveNavItem(page) {
        document.querySelectorAll('.nav-item').forEach(item => {
            const itemPage = item.getAttribute('data-page');
            if (itemPage === page) {
                item.classList.add('text-blue-600', 'dark:text-blue-400', 'bg-white/60', 'dark:bg-gray-800/60');
                item.classList.remove('text-gray-700', 'dark:text-gray-300');
                
                // Add active indicator
                const indicator = item.querySelector('.absolute.bottom-0');
                if (indicator) {
                    indicator.classList.add('w-full');
                    indicator.classList.remove('w-0');
                }
            } else {
                item.classList.remove('text-blue-600', 'dark:text-blue-400', 'bg-white/60', 'dark:bg-gray-800/60');
                item.classList.add('text-gray-700', 'dark:text-gray-300');
                
                // Remove active indicator
                const indicator = item.querySelector('.absolute.bottom-0');
                if (indicator) {
                    indicator.classList.remove('w-full');
                    indicator.classList.add('w-0');
                }
            }
        });
    }

    loadPageContent(page) {
        const mainContent = document.getElementById('main-content');
        
        // Show loading state
        mainContent.innerHTML = `
            <div class="flex items-center justify-center py-20">
                <div class="relative">
                    <div class="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin"></div>
                    <div class="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        `;

        // Load page content based on role and page
        setTimeout(() => {
            if (window.DashboardManager) {
                window.DashboardManager.loadPage(this.currentRole, page);
            }
        }, 500);
    }

    loadDashboard() {
        this.loadPageContent('home');
    }

    toggleMobileMenu() {
        // Implementation for mobile menu toggle
        console.log('Toggle mobile menu');
    }

    logout() {
        this.currentUser = null;
        this.currentRole = null;
        localStorage.removeItem('probooking_user');
        this.showLoginScreen();
    }

    // Utility methods
    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatTime(date) {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
        
        const bgColor = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
            info: 'bg-blue-500'
        }[type] || 'bg-blue-500';
        
        notification.classList.add(bgColor);
        notification.innerHTML = `
            <div class="flex items-center space-x-2 text-white">
                <i data-lucide="check-circle" class="h-5 w-5"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        lucide.createIcons();
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ProBookingApp();
});

// Global utility functions
window.utils = {
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },
    
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    formatTime: (date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    },
    
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    generateId: () => {
        return Math.random().toString(36).substr(2, 9);
    }
};