// Reusable UI components
class ComponentManager {
    constructor() {
        this.components = {};
    }

    // Modal component
    createModal(title, content, options = {}) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in';
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 animate-slide-in">
                <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div class="flex items-center justify-between">
                        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">${title}</h2>
                        <button class="modal-close p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110">
                            <i data-lucide="x" class="h-6 w-6 text-gray-400"></i>
                        </button>
                    </div>
                </div>
                <div class="p-6">
                    ${content}
                </div>
            </div>
        `;

        // Add close functionality
        modal.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });

        document.body.appendChild(modal);
        lucide.createIcons();

        return modal;
    }

    closeModal(modal) {
        modal.classList.add('opacity-0');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }

    // Notification component
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
        
        const bgColor = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
            info: 'bg-blue-500'
        }[type] || 'bg-blue-500';
        
        const icon = {
            success: 'check-circle',
            error: 'alert-circle',
            warning: 'alert-triangle',
            info: 'info'
        }[type] || 'info';
        
        notification.classList.add(bgColor);
        notification.innerHTML = `
            <div class="flex items-center space-x-2 text-white">
                <i data-lucide="${icon}" class="h-5 w-5"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        lucide.createIcons();
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remove after duration
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, duration);
    }

    // Loading spinner component
    createLoadingSpinner(size = 'md') {
        const sizeClasses = {
            sm: 'w-4 h-4',
            md: 'w-8 h-8',
            lg: 'w-12 h-12',
            xl: 'w-16 h-16'
        };

        return `
            <div class="flex items-center justify-center">
                <div class="relative">
                    <div class="${sizeClasses[size]} border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin"></div>
                    <div class="absolute top-0 left-0 ${sizeClasses[size]} border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        `;
    }

    // Card component
    createCard(title, content, options = {}) {
        const { className = '', icon = null, actions = [] } = options;
        
        return `
            <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-500 ${className}">
                ${title ? `
                    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                ${icon ? `<i data-lucide="${icon}" class="h-6 w-6 text-blue-600 dark:text-blue-400"></i>` : ''}
                                <h3 class="text-xl font-bold text-gray-900 dark:text-white">${title}</h3>
                            </div>
                            ${actions.length > 0 ? `
                                <div class="flex space-x-2">
                                    ${actions.map(action => `
                                        <button class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
                                            <i data-lucide="${action.icon}" class="h-4 w-4"></i>
                                        </button>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}
                <div class="p-6">
                    ${content}
                </div>
            </div>
        `;
    }

    // Button component
    createButton(text, options = {}) {
        const {
            variant = 'primary',
            size = 'md',
            icon = null,
            onClick = null,
            className = '',
            disabled = false
        } = options;

        const variants = {
            primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white',
            secondary: 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300',
            success: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white',
            danger: 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white',
            warning: 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white'
        };

        const sizes = {
            sm: 'px-4 py-2 text-sm',
            md: 'px-6 py-3 text-base',
            lg: 'px-8 py-4 text-lg',
            xl: 'px-10 py-5 text-xl'
        };

        const button = document.createElement('button');
        button.className = `
            ${variants[variant]} 
            ${sizes[size]} 
            font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg 
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
            ${className}
        `;
        
        button.innerHTML = `
            ${icon ? `<i data-lucide="${icon}" class="h-5 w-5 ${text ? 'mr-2' : ''}"></i>` : ''}
            ${text ? `<span>${text}</span>` : ''}
        `;

        if (onClick && !disabled) {
            button.addEventListener('click', onClick);
        }

        return button;
    }

    // Form input component
    createInput(options = {}) {
        const {
            type = 'text',
            placeholder = '',
            label = '',
            icon = null,
            required = false,
            className = ''
        } = options;

        return `
            <div class="space-y-2">
                ${label ? `
                    <label class="block text-sm font-bold text-gray-700 dark:text-gray-300">
                        ${label}${required ? ' *' : ''}
                    </label>
                ` : ''}
                <div class="relative">
                    ${icon ? `
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i data-lucide="${icon}" class="h-5 w-5 text-gray-400"></i>
                        </div>
                    ` : ''}
                    <input
                        type="${type}"
                        placeholder="${placeholder}"
                        ${required ? 'required' : ''}
                        class="w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg hover:shadow-xl focus:scale-105 border-gray-200 dark:border-gray-600 ${className}"
                    />
                </div>
            </div>
        `;
    }

    // Stats card component
    createStatsCard(label, value, change, icon, color = 'from-blue-500 to-purple-500') {
        return `
            <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 hover:shadow-xl">
                <div class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${color} rounded-lg mb-4">
                    <i data-lucide="${icon}" class="h-6 w-6 text-white"></i>
                </div>
                <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">${value}</div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">${label}</div>
                <div class="text-xs text-green-600 dark:text-green-400">${change}</div>
            </div>
        `;
    }

    // Search component
    createSearchBar(placeholder = 'Search...', onSearch = null) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'relative';
        searchContainer.innerHTML = `
            <div class="absolute left-4 top-1/2 transform -translate-y-1/2">
                <i data-lucide="search" class="h-5 w-5 text-gray-400"></i>
            </div>
            <input
                type="text"
                placeholder="${placeholder}"
                class="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
        `;

        if (onSearch) {
            const input = searchContainer.querySelector('input');
            input.addEventListener('input', (e) => {
                onSearch(e.target.value);
            });
        }

        lucide.createIcons();
        return searchContainer;
    }

    // Dropdown component
    createDropdown(options, onSelect = null) {
        const dropdown = document.createElement('div');
        dropdown.className = 'relative';
        
        const selectedOption = options[0];
        dropdown.innerHTML = `
            <button class="dropdown-toggle w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-left flex items-center justify-between">
                <span class="dropdown-text">${selectedOption.label}</span>
                <i data-lucide="chevron-down" class="h-4 w-4 text-gray-400 transition-transform duration-300"></i>
            </button>
            <div class="dropdown-menu hidden absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg z-10">
                ${options.map(option => `
                    <button class="dropdown-option w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-xl last:rounded-b-xl" data-value="${option.value}">
                        ${option.label}
                    </button>
                `).join('')}
            </div>
        `;

        // Add functionality
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        const text = dropdown.querySelector('.dropdown-text');
        const chevron = dropdown.querySelector('[data-lucide="chevron-down"]');

        toggle.addEventListener('click', () => {
            menu.classList.toggle('hidden');
            chevron.style.transform = menu.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
        });

        dropdown.querySelectorAll('.dropdown-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const value = e.target.getAttribute('data-value');
                const selectedOpt = options.find(opt => opt.value === value);
                
                text.textContent = selectedOpt.label;
                menu.classList.add('hidden');
                chevron.style.transform = 'rotate(0deg)';
                
                if (onSelect) {
                    onSelect(selectedOpt);
                }
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                menu.classList.add('hidden');
                chevron.style.transform = 'rotate(0deg)';
            }
        });

        lucide.createIcons();
        return dropdown;
    }

    // Tab component
    createTabs(tabs, onTabChange = null) {
        const tabContainer = document.createElement('div');
        tabContainer.className = 'w-full';
        
        tabContainer.innerHTML = `
            <div class="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                ${tabs.map((tab, index) => `
                    <button class="tab-btn flex-1 py-4 px-6 font-medium transition-all duration-300 ${index === 0 ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'}" data-tab="${tab.id}">
                        ${tab.icon ? `<i data-lucide="${tab.icon}" class="h-4 w-4 mr-2"></i>` : ''}
                        ${tab.label}
                    </button>
                `).join('')}
            </div>
            <div class="tab-content">
                ${tabs[0].content}
            </div>
        `;

        // Add tab functionality
        tabContainer.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabId = e.currentTarget.getAttribute('data-tab');
                const selectedTab = tabs.find(tab => tab.id === tabId);
                
                // Update active tab
                tabContainer.querySelectorAll('.tab-btn').forEach(b => {
                    b.classList.remove('text-blue-600', 'dark:text-blue-400', 'border-b-2', 'border-blue-600', 'dark:border-blue-400');
                    b.classList.add('text-gray-600', 'dark:text-gray-400');
                });
                
                e.currentTarget.classList.add('text-blue-600', 'dark:text-blue-400', 'border-b-2', 'border-blue-600', 'dark:border-blue-400');
                e.currentTarget.classList.remove('text-gray-600', 'dark:text-gray-400');
                
                // Update content
                const contentDiv = tabContainer.querySelector('.tab-content');
                contentDiv.innerHTML = selectedTab.content;
                
                if (onTabChange) {
                    onTabChange(selectedTab);
                }
                
                lucide.createIcons();
            });
        });

        lucide.createIcons();
        return tabContainer;
    }

    // Progress bar component
    createProgressBar(progress, options = {}) {
        const { 
            color = 'from-blue-500 to-purple-600',
            height = 'h-2',
            showPercentage = true,
            animated = true
        } = options;

        return `
            <div class="w-full">
                ${showPercentage ? `
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                        <span class="text-sm font-bold text-gray-900 dark:text-white">${progress}%</span>
                    </div>
                ` : ''}
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full ${height} overflow-hidden">
                    <div class="bg-gradient-to-r ${color} ${height} rounded-full transition-all duration-1000 ease-out ${animated ? 'animate-pulse' : ''}" style="width: ${progress}%">
                        <div class="absolute inset-0 bg-white/30 animate-pulse"></div>
                    </div>
                </div>
            </div>
        `;
    }

    // Badge component
    createBadge(text, variant = 'primary') {
        const variants = {
            primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
            success: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
            warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
            danger: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
            info: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
        };

        return `
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]}">
                ${text}
            </span>
        `;
    }

    // Avatar component
    createAvatar(src, name, size = 'md') {
        const sizes = {
            sm: 'w-8 h-8',
            md: 'w-12 h-12',
            lg: 'w-16 h-16',
            xl: 'w-20 h-20'
        };

        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

        return `
            <div class="relative ${sizes[size]} rounded-full overflow-hidden ring-2 ring-white dark:ring-gray-700 shadow-lg">
                ${src ? `
                    <img src="${src}" alt="${name}" class="w-full h-full object-cover" />
                ` : `
                    <div class="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        ${initials}
                    </div>
                `}
            </div>
        `;
    }
}

// Initialize ComponentManager
window.ComponentManager = new ComponentManager();

// Global component helper functions
window.createModal = (title, content, options) => window.ComponentManager.createModal(title, content, options);
window.showNotification = (message, type, duration) => window.ComponentManager.showNotification(message, type, duration);
window.createCard = (title, content, options) => window.ComponentManager.createCard(title, content, options);
window.createButton = (text, options) => window.ComponentManager.createButton(text, options);