# Crosul Speranței Blaj - React Native App

## 🏃‍♂️ About This Project

This is a mobile and web application built for **Crosul Speranței Blaj**, a charity running event in Blaj, Alba County, Romania. This project was developed as a learning experience to explore **React Native** and **Expo** technologies while contributing to a meaningful cause.

The app serves as a digital platform for the charity event, featuring event information, registration details, previous events showcase, sponsor recognition, and multilingual support for both Romanian and English speakers.

## 🎯 Project Goals

- Learn and practice React Native development
- Build a responsive cross-platform application (iOS, Android, Web)
- Create a modern, user-friendly interface for a charity event
- Implement best practices in mobile app development
- Support international users with multilingual functionality
- Optimize performance for production deployment

## ✨ Features

### Core Features

- **Responsive Design**: Works seamlessly on mobile devices and web browsers
- **Multilingual Support**: Full internationalization with Romanian and English languages
- **Featured Events Carousel**: Interactive horizontal scroll with event details
- **Previous Events Gallery**: Animated infinite scroll showcasing past editions with lazy loading
- **Event Details**: Comprehensive information about registration, pricing, and distances
- **About Section**: Detailed information about the organization and projects
- **Sponsors Recognition**: Display of event partners and sponsors
- **Cross-Platform**: Runs on iOS, Android, and Web with consistent experience

### Performance Features

- **Lazy Loading**: Optimized image loading for better performance
- **Smart Loading System**: State-based app initialization instead of fixed timeouts
- **Performance Monitoring**: Built-in metrics tracking for load times and memory usage
- **Progressive Web App**: Web version optimized for mobile and desktop

### User Experience

- **Language Switcher**: Easy toggle between Romanian 🇷🇴 and English 🇺🇸
- **Dark Theme**: Forest green background (`#1f3e25`) with golden accents (`#f0d26e`)
- **Smooth Animations**: Enhanced loading screens and scroll effects
- **Accessibility**: Proper contrast ratios and touch targets

## 🛠️ Tech Stack

### Core Technologies

- **React Native**: `0.79.5` - Cross-platform mobile development framework
- **Expo**: `~53.0.17` - Development platform and build tools
- **TypeScript**: `~5.8.3` - Type-safe JavaScript
- **Expo Router**: `~5.1.3` - File-based navigation system

### UI & Styling

- **Expo Linear Gradient**: `^14.1.5` - Gradient backgrounds and effects
- **React Native Safe Area Context**: `5.4.0` - Safe area handling
- **Expo Vector Icons**: `^14.1.0` - Icon library

### Internationalization

- **i18next**: `^25.3.2` - Internationalization framework
- **React i18next**: `^15.6.0` - React bindings for i18next
- **Language Support**: Romanian (default) and English
- **Dynamic Translation**: Real-time language switching

### Additional Dependencies

- **React**: `^19.0.0`
- **React DOM**: `^19.0.0` (for web support)
- **React Native Web**: `^0.20.0` - Web compatibility
- **React Native Screens**: `~4.11.1` - Native navigation optimization
- **Expo Linking**: `~7.1.7` - Deep linking support
- **Expo Constants**: `~17.1.7` - App constants and configuration

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Expo CLI** (install globally): `npm install -g @expo/cli`
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/RoxanaAnamariaTurc/crosul_sperantei.git
   cd crosul-sperantei-blaj
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

### Running on Different Platforms

Once the development server is running, you can:

- **Web**: Press `w` in the terminal or visit `http://localhost:8081`
- **iOS Simulator**: Press `i` (requires Xcode on macOS)
- **Android Emulator**: Press `a` (requires Android Studio)
- **Physical Device**: Scan the QR code with Expo Go app

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start and open on Android
- `npm run ios` - Start and open on iOS
- `npm run web` - Start and open in web browser
- `npm run build:web` - Build optimized web version for production
- `npm run preview` - Preview built web version locally

## 🌐 Language Support

### Switching Languages

The app includes a language switcher in the header that allows users to toggle between:

- **Romanian** 🇷🇴 (Default)
- **English** 🇺🇸

### Supported Content

All content is fully translated including:

- Navigation and UI elements
- Event titles, descriptions, and details
- About page content and project descriptions
- Pricing information and difficulty levels
- Error messages and user feedback

## 🚀 Deployment

### Web Deployment (Netlify)

The app is configured for automatic deployment to Netlify:

1. **Connect Repository**: Link your GitHub repo to Netlify
2. **Build Settings**:
   - Build command: `npx expo export --platform web`
   - Publish directory: `dist`
   - Node version: `18`
3. **Auto Deploy**: Every push to `main` branch triggers a new deployment

### Manual Web Build

To build for web locally:

```bash
# Build for web
npx expo export --platform web

# The built files will be in the 'dist' folder
# You can then deploy the 'dist' folder to any static hosting service
```

## 📱 Platform Support

- **iOS**: Native iOS application
- **Android**: Native Android application
- **Web**: Progressive Web App (PWA) compatible

## 🎨 Design & Theme

### Color Palette

- **Primary Background**: Forest Green (`#1f3e25`) - Elegant, nature-inspired dark theme
- **Accent Color**: Golden Yellow (`#f0d26e`) - Warm, energetic highlights for buttons and text
- **Text Colors**:
  - Primary: White (`#ffffff`) for main content
  - Secondary: Light gray variations (`#E8E8E8`, `#D0D0D0`, `#B8B8B8`) for supporting text
- **Interactive Elements**: Darker gold (`#B8860B`, `#CD853F`) for buttons and highlights

### Design Features

- **Dark Theme**: Forest green background with golden accents for premium feel
- **Responsive Cards**: Event cards that adapt to screen size with subtle shadows
- **Smooth Animations**: Loading screens, arrow animations, and infinite scroll effects
- **Modern UI**: Clean, contemporary design with gradient overlays and rounded corners
- **Accessibility**: Proper contrast ratios and touch targets for all users
- **Language Indicator**: Flag-based language switcher (🇷🇴/🇺🇸) with visual feedback

## 📂 Project Structure

```
app/
├── _components/         # Reusable components
│   ├── Footer.tsx
│   ├── LanguageSwitcher.tsx   # Language toggle component
│   ├── LoadingScreen.tsx      # Enhanced loading with progress
│   ├── LazyImage.tsx          # Optimized image loading
│   └── PricingInfo.tsx
├── data/               # Static data and configurations
│   ├── events.ts
│   ├── previousEvents.ts      # 26 previous event images
│   └── sponsorData.ts
├── i18n/               # Internationalization
│   ├── config.ts              # Translation resources
│   └── config_new.ts
├── utils/              # Utility functions
│   ├── openLink.ts
│   ├── pricing.ts
│   └── imagePerformance.ts    # Performance monitoring
├── _layout.tsx         # Root layout with state-based loading
├── index.tsx           # Home screen with lazy loading
├── events.tsx          # Events listing
├── event-details.tsx   # Event details with translations
└── about.tsx           # Multilingual about page

assets/
├── images/             # App images and logos
├── previousImages/     # 26 previous event photos
└── ...

```

## 🌍 Internationalization

The app supports both Romanian and English languages with comprehensive translation coverage:

### Supported Languages

- **Romanian (RO)** 🇷🇴 - Default language
- **English (EN)** 🇺🇸 - Secondary language

### Translation Features

- **Complete Coverage**: All UI elements, event details, and content are translated
- **Dynamic Switching**: Real-time language change without app restart
- **Persistent Settings**: Language preference saved across sessions
- **Fallback Support**: English fallback for missing translations
- **Context-Aware**: Event-specific content properly localized

### Implementation

- **i18next Framework**: Industry-standard internationalization
- **React Integration**: Seamless React Native integration
- **Resource Management**: Organized translation files for maintainability
- **Type Safety**: TypeScript support for translation keys

## 🚀 Performance Optimizations

### Lazy Loading System

- **Smart Image Loading**: 26 previous event images load progressively
- **Viewport Detection**: Uses Intersection Observer API for web
- **Bandwidth Optimization**: Reduces initial load by ~85% for image-heavy sections
- **Memory Management**: Prevents memory spikes on mobile devices

### App Initialization

- **State-Based Loading**: Replaced timeout-based loading with intelligent readiness detection
- **Resource Tracking**: Monitors translations, DOM, fonts, images, and network status
- **Progressive Loading**: Staggered loading for optimal performance
- **Performance Metrics**: Built-in monitoring for load times and memory usage

### Production Optimizations

- **Netlify Deployment**: Optimized build configuration for web deployment
- **Asset Optimization**: Compressed images and optimized bundle size
- **Caching Strategy**: Intelligent caching for repeated visits

## � Configuration

The app is configured through:

- `app.json` - Expo configuration and build settings
- `package.json` - Dependencies, scripts, and project metadata
- `tsconfig.json` - TypeScript configuration and compiler options
- `netlify.toml` - Netlify deployment configuration
- `app/i18n/config.ts` - Internationalization settings and translations

### Environment Setup

- **Development**: Full hot reload with Expo development server
- **Production**: Optimized builds with asset compression and caching
- **Web Deployment**: Netlify integration with automatic deployments

## 📱 Platform Support

- **iOS**: Native iOS application with platform-specific optimizations
- **Android**: Native Android application with material design elements
- **Web**: Progressive Web App (PWA) compatible with desktop and mobile browsers
- **Cross-Platform**: Consistent experience across all platforms with responsive design

## 🏗️ Recent Updates

### Version 1.0.0 Features

- ✅ **Multilingual Support**: Complete Romanian/English internationalization
- ✅ **Performance Optimization**: Lazy loading for 26 previous event images
- ✅ **Smart Loading**: State-based app initialization with progress tracking
- ✅ **Enhanced UI**: Forest green theme with golden accents
- ✅ **Production Ready**: Netlify deployment with optimization
- ✅ **Accessibility**: Improved contrast ratios and user experience
- ✅ **Performance Monitoring**: Built-in metrics and optimization tracking

## 🙏 Acknowledgments

- **Crosul Speranței Blaj** organization for the opportunity to support this meaningful cause
- **Expo team** for the excellent development platform and tools
- **React Native community** for comprehensive resources and support
- **i18next team** for robust internationalization framework
- **Contributors** who helped with testing and feedback

## 📚 Documentation

- [Expo Documentation](https://docs.expo.dev/) - Platform-specific guides
- [React Native Documentation](https://reactnative.dev/) - Framework reference

---

_Built with ❤️ for learning React Native, supporting charity, and creating accessible multilingual experiences._

**🌟 Star this project if you found it helpful for learning React Native with internationalization!**
