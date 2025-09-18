# ProBooking - HTML/Tailwind Version

Professional Calendar System for Appointments built with HTML, Tailwind CSS, and Vanilla JavaScript.

## Features

- **Multi-Role Authentication**: Professional, Client, and Super Admin dashboards
- **Responsive Design**: Beautiful UI that works on all devices
- **Dark Mode Support**: Automatic theme switching
- **Professional Dashboard**: Manage appointments, services, calendar, reviews, and subscriptions
- **Client Dashboard**: Book appointments, find professionals, manage payments and reviews
- **Super Admin Dashboard**: System-wide management and analytics
- **Modern Animations**: Smooth transitions and micro-interactions
- **Component-Based Architecture**: Reusable UI components in vanilla JavaScript

## Technology Stack

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework
- **Vanilla JavaScript**: Modern ES6+ features
- **Lucide Icons**: Beautiful icon library
- **Local Storage**: Client-side data persistence

## Getting Started

### Prerequisites

- Modern web browser
- Node.js (for development server)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Demo Credentials

#### Professional Account
- **Email**: john@probooking.com
- **Password**: password123

#### Client Account
- **Email**: sarah@email.com
- **Password**: password123

#### Super Admin Account
- **Email**: admin@probooking.com
- **Password**: password123

## Project Structure

```
├── index.html              # Main HTML file
├── js/
│   ├── app.js              # Main application logic
│   ├── auth.js             # Authentication management
│   ├── dashboard.js        # Dashboard content management
│   └── components.js       # Reusable UI components
├── package.json            # Project configuration
└── README.md              # Project documentation
```

## Features by Role

### Professional Dashboard
- **Profile Management**: Personal and professional information
- **Service Management**: Create and manage service offerings
- **Calendar View**: Visual schedule management
- **Appointment Management**: Track and manage client appointments
- **Review Management**: Monitor client feedback
- **Subscription Management**: Plan and billing management

### Client Dashboard
- **Professional Discovery**: Find and browse professionals
- **Appointment Booking**: Schedule appointments with professionals
- **Payment Management**: Handle payments and billing
- **Review System**: Leave and manage reviews
- **Appointment History**: Track past and upcoming appointments

### Super Admin Dashboard
- **User Management**: Manage all platform users
- **System Analytics**: Platform-wide statistics and insights
- **Content Moderation**: Review and moderate content
- **Subscription Management**: Oversee all subscriptions
- **System Reports**: Comprehensive reporting tools

## Customization

### Themes
The application supports light and dark themes with automatic detection of system preferences.

### Colors
Modify the Tailwind configuration in `index.html` to customize the color scheme:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: {
                    // Your custom primary colors
                }
            }
        }
    }
}
```

### Components
Add new reusable components in `js/components.js`:

```javascript
createCustomComponent(options) {
    // Your component logic
}
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- **Lightweight**: No heavy frameworks
- **Fast Loading**: Minimal dependencies
- **Optimized**: Efficient vanilla JavaScript
- **Responsive**: Smooth animations and interactions

## Security

- Input sanitization
- XSS protection
- Secure local storage
- CSRF protection ready

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support, email support@probooking.com or visit our documentation.

## Changelog

### Version 1.0.0
- Initial HTML/Tailwind migration
- Complete feature parity with React version
- Multi-role authentication system
- Responsive design implementation
- Dark mode support
- Component-based architecture