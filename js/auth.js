// Authentication management
class AuthManager {
    constructor() {
        this.selectedRole = 'professional';
        this.isLoading = false;
        this.demoCredentials = {
            professional: { email: 'john@probooking.com', password: 'password123' },
            client: { email: 'sarah@email.com', password: 'password123' },
            superadmin: { email: 'admin@probooking.com', password: 'password123' }
        };
    }

    init() {
        this.setupEventListeners();
        this.updateLoginForm('professional');
    }

    setupEventListeners() {
        // User type selection
        document.querySelectorAll('.user-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const role = e.currentTarget.getAttribute('data-role');
                this.selectUserType(role);
            });
        });

        // Login form submission
        document.getElementById('login-form-element').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Demo credentials button
        document.getElementById('demo-credentials').addEventListener('click', () => {
            this.fillDemoCredentials();
        });

        // Password toggle
        document.getElementById('toggle-password').addEventListener('click', () => {
            this.togglePasswordVisibility();
        });
    }

    selectUserType(role) {
        this.selectedRole = role;
        this.updateUserTypeSelection(role);
        this.updateLoginForm(role);
        this.clearError();
    }

    updateUserTypeSelection(selectedRole) {
        document.querySelectorAll('.user-type-btn').forEach(btn => {
            const role = btn.getAttribute('data-role');
            if (role === selectedRole) {
                btn.className = 'user-type-btn w-full p-6 rounded-3xl border-2 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-left group border-transparent bg-gradient-to-br text-white shadow-2xl scale-105';
                
                // Update gradient based on role
                if (role === 'professional') {
                    btn.classList.add('from-blue-500', 'to-cyan-600');
                } else if (role === 'client') {
                    btn.classList.add('from-green-500', 'to-emerald-600');
                } else if (role === 'superadmin') {
                    btn.classList.add('from-purple-500', 'to-pink-600');
                }
            } else {
                btn.className = 'user-type-btn w-full p-6 rounded-3xl border-2 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-left group border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-xl';
            }
        });
    }

    updateLoginForm(role) {
        const roleData = {
            professional: {
                title: 'Sign In as Professional',
                subtitle: 'Manage your practice',
                icon: 'user',
                gradient: 'from-blue-500 to-cyan-600'
            },
            client: {
                title: 'Sign In as Client',
                subtitle: 'Book services',
                icon: 'calendar',
                gradient: 'from-green-500 to-emerald-600'
            },
            superadmin: {
                title: 'Sign In as Super Admin',
                subtitle: 'Manage the system',
                icon: 'shield',
                gradient: 'from-purple-500 to-pink-600'
            }
        };

        const data = roleData[role];
        
        // Update form header
        document.getElementById('selected-role-title').textContent = data.title;
        document.getElementById('selected-role-subtitle').textContent = data.subtitle;
        
        // Update icon
        const iconElement = document.querySelector('#selected-role-icon i');
        iconElement.setAttribute('data-lucide', data.icon);
        
        // Update gradient
        const iconContainer = document.getElementById('selected-role-icon');
        iconContainer.className = `w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${data.gradient} flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300 group`;
        
        // Update demo credentials
        const demoInfo = document.getElementById('demo-info');
        const credentials = this.demoCredentials[role];
        demoInfo.innerHTML = `
            <p><strong>Email:</strong> ${credentials.email}</p>
            <p><strong>Password:</strong> ${credentials.password}</p>
        `;
        
        lucide.createIcons();
    }

    fillDemoCredentials() {
        const credentials = this.demoCredentials[this.selectedRole];
        document.getElementById('email').value = credentials.email;
        document.getElementById('password').value = credentials.password;
    }

    togglePasswordVisibility() {
        const passwordInput = document.getElementById('password');
        const toggleBtn = document.getElementById('toggle-password');
        const icon = toggleBtn.querySelector('i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.setAttribute('data-lucide', 'eye-off');
        } else {
            passwordInput.type = 'password';
            icon.setAttribute('data-lucide', 'eye');
        }
        
        lucide.createIcons();
    }

    async handleLogin() {
        if (this.isLoading) return;

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            this.showError('Please fill in all fields');
            return;
        }

        this.setLoading(true);
        this.clearError();

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock authentication
            const credentials = this.demoCredentials[this.selectedRole];
            if (email === credentials.email && password === credentials.password) {
                const user = {
                    id: `${this.selectedRole}-1`,
                    email: email,
                    name: this.getUserName(this.selectedRole),
                    role: this.selectedRole,
                    avatar: this.getUserAvatar(this.selectedRole),
                    isActive: true,
                    createdAt: new Date().toISOString(),
                    lastLogin: new Date().toISOString()
                };

                // Save user data
                localStorage.setItem('probooking_user', JSON.stringify(user));
                
                // Update app state
                window.app.currentUser = user;
                window.app.currentRole = this.selectedRole;
                
                // Show main app
                window.app.showMainApp();
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            this.showError(error.message || 'Login failed');
        } finally {
            this.setLoading(false);
        }
    }

    getUserName(role) {
        const names = {
            professional: 'John Professional',
            client: 'Sarah Johnson',
            superadmin: 'System Administrator'
        };
        return names[role] || 'User';
    }

    getUserAvatar(role) {
        const avatars = {
            professional: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
            client: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
            superadmin: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
        };
        return avatars[role] || '';
    }

    setLoading(loading) {
        this.isLoading = loading;
        const submitBtn = document.getElementById('login-submit');
        
        if (loading) {
            submitBtn.innerHTML = `
                <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Signing in...</span>
            `;
            submitBtn.disabled = true;
        } else {
            submitBtn.innerHTML = `
                <span>Sign In</span>
                <i data-lucide="arrow-right" class="w-5 h-5"></i>
            `;
            submitBtn.disabled = false;
            lucide.createIcons();
        }
    }

    showError(message) {
        const errorDiv = document.getElementById('error-message');
        const errorText = errorDiv.querySelector('p');
        
        errorText.textContent = message;
        errorDiv.classList.remove('hidden');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.clearError();
        }, 5000);
    }

    clearError() {
        const errorDiv = document.getElementById('error-message');
        errorDiv.classList.add('hidden');
    }
}

// Initialize AuthManager
window.AuthManager = new AuthManager();