// Dashboard content management
class DashboardManager {
    constructor() {
        this.currentRole = null;
        this.currentPage = null;
    }

    loadPage(role, page) {
        this.currentRole = role;
        this.currentPage = page;
        
        const content = this.getPageContent(role, page);
        document.getElementById('main-content').innerHTML = content;
        
        // Initialize page-specific functionality
        this.initializePageFeatures(role, page);
        
        // Reinitialize icons
        lucide.createIcons();
        
        // Add animations
        this.addPageAnimations();
    }

    getPageContent(role, page) {
        const contentMap = {
            professional: {
                home: this.getProfessionalHome(),
                profile: this.getProfessionalProfile(),
                services: this.getProfessionalServices(),
                calendar: this.getProfessionalCalendar(),
                appointments: this.getProfessionalAppointments(),
                reviews: this.getProfessionalReviews(),
                subscription: this.getProfessionalSubscription()
            },
            client: {
                home: this.getClientHome(),
                professionals: this.getClientProfessionals(),
                payments: this.getClientPayments(),
                appointments: this.getClientAppointments(),
                reviews: this.getClientReviews()
            },
            superadmin: {
                home: this.getSuperAdminHome(),
                professionals: this.getSuperAdminProfessionals(),
                clients: this.getSuperAdminClients(),
                appointments: this.getSuperAdminAppointments(),
                services: this.getSuperAdminServices(),
                reviews: this.getSuperAdminReviews(),
                subscriptions: this.getSuperAdminSubscriptions(),
                reports: this.getSuperAdminReports()
            }
        };

        return contentMap[role]?.[page] || this.getNotFoundPage();
    }

    // Professional Dashboard Pages
    getProfessionalHome() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
                <!-- Hero Section -->
                <section class="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="text-center">
                            <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
                                Manage your practice
                                <span class="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                    professionally
                                </span>
                            </h1>
                            
                            <p class="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
                                The comprehensive platform you need to manage appointments, clients and grow your business efficiently and professionally.
                            </p>

                            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                                <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 hover:shadow-xl">
                                    <div class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4">
                                        <i data-lucide="users" class="h-6 w-6 text-white"></i>
                                    </div>
                                    <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">2,847</div>
                                    <div class="text-sm text-gray-600 dark:text-gray-400">Active Clients</div>
                                </div>
                                <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 hover:shadow-xl">
                                    <div class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4">
                                        <i data-lucide="calendar" class="h-6 w-6 text-white"></i>
                                    </div>
                                    <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">342</div>
                                    <div class="text-sm text-gray-600 dark:text-gray-400">Appointments This Month</div>
                                </div>
                                <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 hover:shadow-xl">
                                    <div class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4">
                                        <i data-lucide="clock" class="h-6 w-6 text-white"></i>
                                    </div>
                                    <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">1,680</div>
                                    <div class="text-sm text-gray-600 dark:text-gray-400">Hours Worked</div>
                                </div>
                                <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 hover:shadow-xl">
                                    <div class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4">
                                        <i data-lucide="trending-up" class="h-6 w-6 text-white"></i>
                                    </div>
                                    <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">+24%</div>
                                    <div class="text-sm text-gray-600 dark:text-gray-400">Growth</div>
                                </div>
                            </div>

                            <button class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                                Get Started Now
                            </button>
                        </div>
                    </div>
                </section>

                <!-- Modules Section -->
                <section class="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="text-center mb-16">
                            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Everything you need in one place
                            </h2>
                            <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                Discover the professional tools that will help you manage your practice efficiently and grow your business.
                            </p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            ${this.getProfessionalModules()}
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    getProfessionalModules() {
        const modules = [
            {
                icon: 'user',
                title: 'My Profile',
                description: 'Manage your personal and professional information',
                color: 'from-blue-500 to-cyan-600',
                bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
                features: ['Personal information', 'Certifications', 'Work schedules'],
                page: 'profile'
            },
            {
                icon: 'scissors',
                title: 'My Services',
                description: 'Manage your services and pricing',
                color: 'from-purple-500 to-pink-600',
                bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
                features: ['Service catalog', 'Dynamic pricing', 'Categorization'],
                page: 'services'
            },
            {
                icon: 'calendar',
                title: 'My Calendar',
                description: 'Visualize and organize your schedule',
                color: 'from-green-500 to-emerald-600',
                bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
                features: ['Monthly/weekly view', 'Synchronization', 'Reminders'],
                page: 'calendar'
            },
            {
                icon: 'clock',
                title: 'My Appointments',
                description: 'Manage all your appointments and clients',
                color: 'from-orange-500 to-red-600',
                bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
                features: ['Complete management', 'Appointment status', 'Detailed history'],
                page: 'appointments'
            },
            {
                icon: 'message-circle',
                title: 'My Reviews',
                description: 'Monitor your client satisfaction',
                color: 'from-yellow-500 to-orange-600',
                bgColor: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
                features: ['Ratings', 'Comments', 'Trend analysis'],
                page: 'reviews'
            },
            {
                icon: 'credit-card',
                title: 'My Subscription',
                description: 'Manage your plan and billing',
                color: 'from-indigo-500 to-purple-600',
                bgColor: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
                features: ['Flexible plans', 'Billing', 'Premium support'],
                page: 'subscription'
            }
        ];

        return modules.map((module, index) => `
            <div
                class="module-card group bg-gradient-to-br ${module.bgColor} rounded-3xl p-8 border border-white/20 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer"
                data-page="${module.page}"
                style="animation-delay: ${index * 150}ms"
            >
                <div class="flex items-center justify-between mb-6">
                    <div class="w-16 h-16 rounded-2xl bg-gradient-to-r ${module.color} flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                        <i data-lucide="${module.icon}" class="w-8 h-8 text-white"></i>
                    </div>
                    <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <i data-lucide="arrow-right" class="w-6 h-6 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"></i>
                    </div>
                </div>

                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:scale-105 transition-transform duration-300">
                    ${module.title}
                </h3>
                
                <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    ${module.description}
                </p>

                <div class="space-y-2">
                    ${module.features.map(feature => `
                        <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <div class="w-2 h-2 rounded-full bg-gradient-to-r ${module.color}"></div>
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>

                <div class="mt-6 pt-6 border-t border-gray-200/50 dark:border-gray-600/50">
                    <button class="w-full py-3 px-4 bg-gradient-to-r ${module.color} text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 opacity-0 group-hover:opacity-100">
                        Explore Module
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Client Dashboard Pages
    getClientHome() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 transition-all duration-500">
                <!-- Hero Section -->
                <section class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 overflow-hidden pt-20">
                    <!-- Background elements -->
                    <div class="absolute inset-0 overflow-hidden">
                        <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20 dark:opacity-10 animate-blob"></div>
                        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400 to-pink-600 rounded-full opacity-20 dark:opacity-10 animate-blob" style="animation-delay: 2s;"></div>
                    </div>

                    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div class="animate-fade-in">
                            <div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full mb-8">
                                <i data-lucide="star" class="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2"></i>
                                <span class="text-blue-800 dark:text-blue-300 font-medium">Trusted by 50,000+ clients</span>
                            </div>
                            
                            <h1 class="text-5xl md:text-7xl font-bold text-gray-900 dark:text-gray-50 mb-6 leading-tight">
                                Book Your Perfect
                                <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Professional</span>
                                <br />in Minutes
                            </h1>
                            
                            <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                                Connect with verified professionals across all industries. From healthcare to legal services, 
                                find and book appointments with top-rated experts instantly.
                            </p>

                            <!-- CTA buttons -->
                            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                                <button class="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-500 hover:scale-110 hover:shadow-2xl shadow-lg">
                                    Book Appointment Now
                                    <i data-lucide="arrow-right" class="ml-2 h-5 w-5 group-hover:translate-x-2 group-hover:scale-125 transition-transform duration-300"></i>
                                </button>
                                
                                <button class="group inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-500 hover:scale-110 shadow-lg hover:shadow-xl">
                                    <i data-lucide="play" class="mr-2 h-5 w-5 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300"></i>
                                    Browse Professionals
                                </button>
                            </div>

                            <!-- Trust indicators -->
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                                <div class="flex items-center justify-center space-x-3 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 group">
                                    <i data-lucide="check-circle" class="h-8 w-8 text-green-500"></i>
                                    <div class="text-left">
                                        <div class="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-green-600 transition-colors">100%</div>
                                        <div class="text-gray-600 dark:text-gray-400">Verified Professionals</div>
                                    </div>
                                </div>
                                
                                <div class="flex items-center justify-center space-x-3 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 group">
                                    <i data-lucide="users" class="h-8 w-8 text-blue-500"></i>
                                    <div class="text-left">
                                        <div class="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors">50K+</div>
                                        <div class="text-gray-600 dark:text-gray-400">Happy Clients</div>
                                    </div>
                                </div>
                                
                                <div class="flex items-center justify-center space-x-3 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 group">
                                    <i data-lucide="star" class="h-8 w-8 text-yellow-500"></i>
                                    <div class="text-left">
                                        <div class="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-yellow-600 transition-colors">4.9</div>
                                        <div class="text-gray-600 dark:text-gray-400">Average Rating</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    getProfessionalProfile() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 p-6">
                <div class="max-w-7xl mx-auto">
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">My Profile</h1>
                    
                    <!-- Profile content will be implemented here -->
                    <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                        <div class="text-center py-12">
                            <i data-lucide="user" class="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-4"></i>
                            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Profile Management</h3>
                            <p class="text-gray-600 dark:text-gray-400">
                                Profile management interface will be implemented here
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getProfessionalServices() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 p-6">
                <div class="max-w-7xl mx-auto">
                    <div class="flex items-center justify-between mb-8">
                        <h1 class="text-4xl font-bold text-gray-900 dark:text-white">My Services</h1>
                        <button class="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-bold">
                            <i data-lucide="plus" class="w-5 h-5"></i>
                            <span>Add Service</span>
                        </button>
                    </div>
                    
                    <!-- Services grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${this.getServiceCards()}
                    </div>
                </div>
            </div>
        `;
    }

    getServiceCards() {
        const services = [
            {
                name: 'Premium Hair Cut & Style',
                description: 'Professional hair cutting and styling service with consultation',
                duration: '90 min',
                price: '$85',
                rating: 4.9,
                bookings: 342,
                image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=400',
                tags: ['Popular', 'Premium']
            },
            {
                name: 'Full Color Treatment',
                description: 'Complete hair coloring service including highlights and lowlights',
                duration: '3 hours',
                price: '$150',
                rating: 4.8,
                bookings: 198,
                image: 'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=400',
                tags: ['Color Expert']
            },
            {
                name: 'Bridal Hair Package',
                description: 'Complete bridal hair styling including trial session',
                duration: '4 hours',
                price: '$300',
                rating: 5.0,
                bookings: 45,
                image: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400',
                tags: ['Bridal', 'Special Event']
            }
        ];

        return services.map(service => `
            <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
                <!-- Image Header -->
                <div class="relative h-48 overflow-hidden">
                    <img src="${service.image}" alt="${service.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    <!-- Tags -->
                    <div class="absolute top-4 left-4 flex flex-wrap gap-2">
                        ${service.tags.map(tag => `
                            <span class="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">${tag}</span>
                        `).join('')}
                    </div>

                    <!-- Price -->
                    <div class="absolute bottom-4 right-4 text-right">
                        <div class="text-3xl font-bold text-white">${service.price}</div>
                    </div>
                </div>

                <!-- Content -->
                <div class="p-6">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${service.name}</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-4">${service.description}</p>
                    
                    <!-- Details -->
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div class="flex items-center space-x-2">
                            <i data-lucide="clock" class="w-4 h-4 text-blue-600"></i>
                            <span class="text-sm text-gray-600 dark:text-gray-400">${service.duration}</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <i data-lucide="users" class="w-4 h-4 text-green-600"></i>
                            <span class="text-sm text-gray-600 dark:text-gray-400">${service.bookings} bookings</span>
                        </div>
                    </div>

                    <!-- Rating -->
                    <div class="flex items-center space-x-2 mb-6">
                        <div class="flex items-center">
                            ${Array.from({length: 5}, (_, i) => `
                                <i data-lucide="star" class="w-4 h-4 ${i < Math.floor(service.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}"></i>
                            `).join('')}
                        </div>
                        <span class="text-sm font-medium text-gray-900 dark:text-white">${service.rating}</span>
                    </div>

                    <!-- Actions -->
                    <div class="flex space-x-3">
                        <button class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <i data-lucide="edit" class="w-4 h-4 inline mr-2"></i>
                            Edit
                        </button>
                        <button class="px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all duration-300 hover:scale-105">
                            <i data-lucide="eye" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getProfessionalCalendar() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 p-6">
                <div class="max-w-7xl mx-auto">
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">My Calendar</h1>
                    
                    <!-- Calendar interface -->
                    <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                        <div class="text-center py-12">
                            <i data-lucide="calendar" class="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-4"></i>
                            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Calendar View</h3>
                            <p class="text-gray-600 dark:text-gray-400">
                                Interactive calendar interface will be implemented here
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getProfessionalAppointments() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 p-6">
                <div class="max-w-7xl mx-auto">
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">My Appointments</h1>
                    
                    <!-- Appointments list -->
                    <div class="space-y-6">
                        ${this.getAppointmentCards()}
                    </div>
                </div>
            </div>
        `;
    }

    getAppointmentCards() {
        const appointments = [
            {
                id: '1',
                title: 'Premium Hair Cut & Style',
                clientName: 'Sarah Johnson',
                clientAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
                date: '2025-01-20',
                time: '10:00 AM',
                duration: '90 min',
                service: 'Hair Cut & Style',
                status: 'confirmed',
                price: 85,
                location: 'Salon Main Floor'
            },
            {
                id: '2',
                title: 'Full Color Treatment',
                clientName: 'Michael Chen',
                clientAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
                date: '2025-01-20',
                time: '2:00 PM',
                duration: '3 hours',
                service: 'Color Treatment',
                status: 'pending',
                price: 150,
                location: 'Color Station 2'
            }
        ];

        return appointments.map(appointment => `
            <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
                <!-- Header -->
                <div class="p-6 bg-gradient-to-r ${appointment.status === 'confirmed' ? 'from-green-500 to-emerald-600' : 'from-yellow-500 to-orange-600'} text-white relative overflow-hidden">
                    <div class="relative flex items-start justify-between">
                        <div class="flex items-center space-x-4">
                            <img src="${appointment.clientAvatar}" alt="${appointment.clientName}" class="w-16 h-16 rounded-full object-cover border-4 border-white/30 shadow-lg" />
                            <div>
                                <h3 class="text-xl font-bold mb-1">${appointment.title}</h3>
                                <p class="text-white/80 font-medium">${appointment.clientName}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-bold bg-white/20 backdrop-blur-sm">
                                <i data-lucide="check-circle" class="w-4 h-4"></i>
                                <span class="capitalize">${appointment.status}</span>
                            </div>
                            <div class="text-2xl font-bold mt-2">$${appointment.price}</div>
                        </div>
                    </div>
                </div>

                <!-- Content -->
                <div class="p-6">
                    <!-- Time and Date -->
                    <div class="grid grid-cols-2 gap-4 mb-6">
                        <div class="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                            <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                                <i data-lucide="calendar" class="w-5 h-5 text-white"></i>
                            </div>
                            <div>
                                <p class="text-xs text-gray-500 dark:text-gray-400">Date</p>
                                <p class="font-bold text-gray-900 dark:text-white">${this.formatDate(appointment.date)}</p>
                            </div>
                        </div>
                        
                        <div class="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                            <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                                <i data-lucide="clock" class="w-5 h-5 text-white"></i>
                            </div>
                            <div>
                                <p class="text-xs text-gray-500 dark:text-gray-400">Time</p>
                                <p class="font-bold text-gray-900 dark:text-white">${appointment.time} (${appointment.duration})</p>
                            </div>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div class="flex space-x-2">
                            <button class="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300 hover:scale-110">
                                <i data-lucide="eye" class="w-4 h-4"></i>
                            </button>
                            <button class="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl transition-all duration-300 hover:scale-110">
                                <i data-lucide="edit" class="w-4 h-4"></i>
                            </button>
                            <button class="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all duration-300 hover:scale-110">
                                <i data-lucide="message-square" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getProfessionalReviews() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 p-6">
                <div class="max-w-7xl mx-auto">
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">My Reviews</h1>
                    
                    <!-- Reviews content -->
                    <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                        <div class="text-center py-12">
                            <i data-lucide="star" class="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-4"></i>
                            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Reviews Management</h3>
                            <p class="text-gray-600 dark:text-gray-400">
                                Review management interface will be implemented here
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getProfessionalSubscription() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 transition-colors duration-300 p-6">
                <div class="max-w-7xl mx-auto">
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">My Subscription</h1>
                    
                    <!-- Subscription content -->
                    <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                        <div class="text-center py-12">
                            <i data-lucide="credit-card" class="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-4"></i>
                            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Subscription Management</h3>
                            <p class="text-gray-600 dark:text-gray-400">
                                Subscription management interface will be implemented here
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Client Dashboard Pages
    getClientProfessionals() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 transition-all duration-500 p-6">
                <div class="max-w-7xl mx-auto">
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Find Professionals</h1>
                    
                    <!-- Professionals grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${this.getProfessionalCards()}
                    </div>
                </div>
            </div>
        `;
    }

    getProfessionalCards() {
        const professionals = [
            {
                name: 'Dr. Alexandra Chen',
                specialty: 'Cardiologist',
                rating: 4.9,
                reviews: 456,
                price: '$200',
                location: 'New York, NY',
                image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop&crop=face',
                availability: 'Available Today',
                badges: ['Top Rated', 'Expert']
            },
            {
                name: 'James Rodriguez',
                specialty: 'Corporate Lawyer',
                rating: 4.8,
                reviews: 342,
                price: '$300',
                location: 'Los Angeles, CA',
                image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop&crop=face',
                availability: 'Available Now',
                badges: ['Expert', 'Available Now']
            },
            {
                name: 'Dr. Sarah Williams',
                specialty: 'Clinical Psychologist',
                rating: 4.9,
                reviews: 523,
                price: '$150',
                location: 'Chicago, IL',
                image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop&crop=face',
                availability: 'Available Tomorrow',
                badges: ['Most Booked', 'Certified']
            }
        ];

        return professionals.map(professional => `
            <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
                <!-- Professional Image -->
                <div class="relative h-64 overflow-hidden">
                    <img src="${professional.image}" alt="${professional.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    <!-- Badges -->
                    <div class="absolute top-4 left-4 flex flex-wrap gap-2">
                        ${professional.badges.map(badge => `
                            <span class="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">${badge}</span>
                        `).join('')}
                    </div>

                    <!-- Price -->
                    <div class="absolute bottom-4 right-4 text-right">
                        <div class="text-3xl font-bold text-white">${professional.price}</div>
                    </div>
                </div>

                <!-- Content -->
                <div class="p-6">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${professional.name}</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-4">${professional.specialty}</p>
                    
                    <!-- Rating and Location -->
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-2">
                            <div class="flex items-center">
                                ${Array.from({length: 5}, (_, i) => `
                                    <i data-lucide="star" class="w-4 h-4 ${i < Math.floor(professional.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}"></i>
                                `).join('')}
                            </div>
                            <span class="text-sm font-medium text-gray-900 dark:text-white">${professional.rating} (${professional.reviews})</span>
                        </div>
                    </div>

                    <!-- Location -->
                    <div class="flex items-center space-x-2 mb-4">
                        <i data-lucide="map-pin" class="w-4 h-4 text-gray-400"></i>
                        <span class="text-sm text-gray-600 dark:text-gray-400">${professional.location}</span>
                    </div>

                    <!-- Availability -->
                    <div class="mb-6">
                        <span class="px-3 py-1 rounded-full text-xs font-medium ${professional.availability.includes('Now') ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'}">
                            ${professional.availability}
                        </span>
                    </div>

                    <!-- Actions -->
                    <div class="flex space-x-3">
                        <button class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <i data-lucide="calendar" class="w-4 h-4 inline mr-2"></i>
                            Book Now
                        </button>
                        <button class="px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all duration-300 hover:scale-105">
                            <i data-lucide="message-circle" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getClientPayments() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 transition-all duration-500 p-6">
                <div class="max-w-7xl mx-auto">
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Payments</h1>
                    
                    <!-- Payments content -->
                    <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                        <div class="text-center py-12">
                            <i data-lucide="credit-card" class="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-4"></i>
                            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Payment Management</h3>
                            <p class="text-gray-600 dark:text-gray-400">
                                Payment management interface will be implemented here
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getClientAppointments() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 transition-all duration-500 p-6">
                <div class="max-w-7xl mx-auto">
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">My Appointments</h1>
                    
                    <!-- Appointments content -->
                    <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                        <div class="text-center py-12">
                            <i data-lucide="calendar" class="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-4"></i>
                            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Appointments Overview</h3>
                            <p class="text-gray-600 dark:text-gray-400">
                                Appointments management interface will be implemented here
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getClientReviews() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 transition-all duration-500 p-6">
                <div class="max-w-7xl mx-auto">
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">My Reviews</h1>
                    
                    <!-- Reviews content -->
                    <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                        <div class="text-center py-12">
                            <i data-lucide="star" class="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-4"></i>
                            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Reviews Management</h3>
                            <p class="text-gray-600 dark:text-gray-400">
                                Reviews management interface will be implemented here
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Super Admin Dashboard Pages
    getSuperAdminHome() {
        return `
            <div class="pt-24 pb-16 bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center">
                        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            Super Admin
                            <span class="block bg-gradient-to-r from-red-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                                Dashboard
                            </span>
                        </h1>
                        
                        <p class="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
                            Monitor and manage the entire ProBooking platform with comprehensive administrative tools.
                        </p>

                        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                            <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 hover:shadow-xl">
                                <div class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg mb-4">
                                    <i data-lucide="users" class="h-6 w-6 text-white"></i>
                                </div>
                                <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">15,247</div>
                                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Users</div>
                                <div class="text-xs text-green-600 dark:text-green-400">+12%</div>
                            </div>
                            <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 hover:shadow-xl">
                                <div class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg mb-4">
                                    <i data-lucide="calendar" class="h-6 w-6 text-white"></i>
                                </div>
                                <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">1,342</div>
                                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Appointments Today</div>
                                <div class="text-xs text-green-600 dark:text-green-400">+8%</div>
                            </div>
                            <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 hover:shadow-xl">
                                <div class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg mb-4">
                                    <i data-lucide="star" class="h-6 w-6 text-white"></i>
                                </div>
                                <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">4.9</div>
                                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Average Rating</div>
                                <div class="text-xs text-green-600 dark:text-green-400">+0.1</div>
                            </div>
                            <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 hover:shadow-xl">
                                <div class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg mb-4">
                                    <i data-lucide="trending-up" class="h-6 w-6 text-white"></i>
                                </div>
                                <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">+24%</div>
                                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Revenue Growth</div>
                                <div class="text-xs text-green-600 dark:text-green-400">This month</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getSuperAdminProfessionals() {
        return `
            <div class="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
                <div class="max-w-7xl mx-auto">
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Professionals Management</h1>
                    
                    <!-- Stats -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                        <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 hover:shadow-xl">
                            <div class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4">
                                <i data-lucide="users" class="h-6 w-6 text-white"></i>
                            </div>
                            <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">2,847</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Professionals</div>
                            <div class="text-xs text-green-600 dark:text-green-400">+12%</div>
                        </div>
                        <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 hover:shadow-xl">
                            <div class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4">
                                <i data-lucide="user-check" class="h-6 w-6 text-white"></i>
                            </div>
                            <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">2,156</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Active This Month</div>
                            <div class="text-xs text-green-600 dark:text-green-400">+8%</div>
                        </div>
                        <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 hover:shadow-xl">
                            <div class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4">
                                <i data-lucide="trending-up" class="h-6 w-6 text-white"></i>
                            </div>
                            <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">156</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">New Registrations</div>
                            <div class="text-xs text-green-600 dark:text-green-400">+24%</div>
                        </div>
                        <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 hover:shadow-xl">
                            <div class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4">
                                <i data-lucide="user-x" class="h-6 w-6 text-white"></i>
                            </div>
                            <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">23</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending Approval</div>
                            <div class="text-xs text-red-600 dark:text-red-400">-5%</div>
                        </div>
                    </div>

                    <!-- Management Interface -->
                    <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Professional Directory</h2>
                            <div class="flex space-x-4">
                                <button class="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    <i data-lucide="search" class="h-4 w-4"></i>
                                    <span>Search</span>
                                </button>
                                <button class="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                    <i data-lucide="filter" class="h-4 w-4"></i>
                                    <span>Filter</span>
                                </button>
                            </div>
                        </div>
                        
                        <div class="text-center py-12">
                            <i data-lucide="users" class="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-4"></i>
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Professional Management</h3>
                            <p class="text-gray-600 dark:text-gray-400">
                                Detailed professional management interface will be implemented here
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getSuperAdminClients() {
        return `
            <div class="pt-24 pb-16 bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
                <div class="max-w-7xl mx-auto">
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Clients Management</h1>
                    
                    <!-- Content placeholder -->
                    <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                        <div class="text-center py-12">
                            <i data-lucide="user" class="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-4"></i>
                            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Client Management</h3>
                            <p class="text-gray-600 dark:text-gray-400">
                                Client management interface will be implemented here
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getSuperAdminAppointments() {
        return `
            <div class="pt-24 pb-16 bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
                <div class="max-w-7xl mx-auto">
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Appointments Overview</h1>
                    
                    <!-- Content placeholder -->
                    <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                        <div class="text-center py-12">
                            <i data-lucide="calendar" class="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-4"></i>
                            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Appointments Analytics</h3>
                            <p class="text-gray-600 dark:text-gray-400">
                                Appointments analytics interface will be implemented here
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getSuperAdminServices() {
        return `
            <div class="pt-24 pb-16 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
                <div class="max-w-7xl mx-auto">
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Services Management</h1>
                    
                    <!-- Content placeholder -->
                    <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                        <div class="text-center py-12">
                            <i data-lucide="star" class="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-4"></i>
                            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Service Management</h3>
                            <p class="text-gray-600 dark:text-gray-400">
                                Service management interface will be implemented here
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getSuperAdminReviews() {
        return `
            <div class="pt-24 pb-16 bg-gradient-to-br from-yellow-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
                <div class="max-w-7xl mx-auto">
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Reviews Management</h1>
                    
                    <!-- Content placeholder -->
                    <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                        <div class="text-center py-12">
                            <i data-lucide="message-circle" class="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-4"></i>
                            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Review Management</h3>
                            <p class="text-gray-600 dark:text-gray-400">
                                Review management interface will be implemented here
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getSuperAdminSubscriptions() {
        return `
            <div class="pt-24 pb-16 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
                <div class="max-w-7xl mx-auto">
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Subscriptions Management</h1>
                    
                    <!-- Content placeholder -->
                    <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                        <div class="text-center py-12">
                            <i data-lucide="credit-card" class="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-4"></i>
                            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Subscription Management</h3>
                            <p class="text-gray-600 dark:text-gray-400">
                                Subscription management interface will be implemented here
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getSuperAdminReports() {
        return `
            <div class="pt-24 pb-16 bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
                <div class="max-w-7xl mx-auto">
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Reports & Analytics</h1>
                    
                    <!-- Content placeholder -->
                    <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                        <div class="text-center py-12">
                            <i data-lucide="bar-chart-3" class="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-4"></i>
                            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Advanced Analytics</h3>
                            <p class="text-gray-600 dark:text-gray-400">
                                Analytics and reporting interface will be implemented here
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getNotFoundPage() {
        return `
            <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
                <div class="text-center">
                    <i data-lucide="alert-circle" class="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-4"></i>
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
                    <p class="text-gray-600 dark:text-gray-400 mb-8">The requested page could not be found.</p>
                    <button onclick="window.app.navigateToHome()" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Go Home
                    </button>
                </div>
            </div>
        `;
    }

    initializePageFeatures(role, page) {
        // Add module card click listeners for professional home
        if (role === 'professional' && page === 'home') {
            document.querySelectorAll('.module-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    const targetPage = e.currentTarget.getAttribute('data-page');
                    window.app.navigateToPage(targetPage);
                });
            });
        }

        // Initialize other page-specific features here
        this.initializeInteractiveElements();
    }

    initializeInteractiveElements() {
        // Add hover effects and interactions
        document.querySelectorAll('[data-hover="scale"]').forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'scale(1.05)';
            });
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'scale(1)';
            });
        });
    }

    addPageAnimations() {
        // Add entrance animations to elements
        const animatedElements = document.querySelectorAll('.animate-on-load');
        animatedElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('loaded');
            }, index * 100);
        });
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    }
}

// Initialize DashboardManager
window.DashboardManager = new DashboardManager();