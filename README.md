# RUNNER - Cross-Platform Running Events App

## 🏃‍♂️ About RUNNER

**RUNNER** is a modern, high-performance mobile and web application for running events and communities. Built with React Native and Expo, it provides a comprehensive platform for event organizers and runners to connect, manage events, and track participation.

The app features event management, participant registration, photo galleries, sponsor showcases, and multilingual support, making it suitable for running events of any scale - from local charity runs to major marathons.

## 🎯 Technical Goals

- Demonstrate modern React Native development with TypeScript
- Implement enterprise-grade architecture and performance optimizations
- Build responsive cross-platform application (iOS, Android, Web)
- Showcase best practices in mobile app development
- Create scalable internationalization system
- Deploy production-ready PWA with offline capabilities

## ✨ Features & Capabilities

### Core Features

- **Event Management**: Comprehensive event listings with details, pricing, and registration
- **Responsive Design**: Optimized for mobile devices, tablets, and desktop browsers
- **Multilingual Support**: Full internationalization with dynamic language switching
- **Photo Galleries**: Image galleries with lazy loading and progressive optimization
- **Participant Information**: Registration details, race categories, and participant management
- **Sponsor Integration**: Customizable sponsor showcases and partner recognition
- **Cross-Platform**: Single codebase running on iOS, Android, and Web

### Technical Features

- **Progressive Web App (PWA)**: Installable web app with offline capabilities
- **Lazy Loading**: Optimized image loading with intelligent caching strategies
- **Performance Monitoring**: Real-time metrics tracking and bundle analysis
- **Error Boundaries**: Comprehensive error handling with graceful recovery
- **Service Worker**: Advanced caching and offline functionality
- **Bundle Optimization**: Tree shaking, code splitting, and dependency analysis

### Developer Experience

- **TypeScript Strict Mode**: Enhanced type safety and development experience
- **Component Architecture**: Feature-based organization with barrel exports
- **Theme System**: Centralized design tokens and styling utilities
- **Hot Reloading**: Fast development with Expo's development server
- **Performance Tools**: Built-in bundle analyzer and dependency checker
- **Automated Deployment**: CI/CD pipeline with Netlify integration

## 🏗️ Architecture Overview

### 📱 System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           🌐 PRODUCTION DEPLOYMENT                              │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  📱 GitHub Repository                  🚀 Netlify Hosting                       │
│  ┌─────────────────────┐              ┌─────────────────────────────────────┐   │
│  │ • Source Code       │    Push      │ • Auto Build & Deploy              │   │
│  │ • Service Worker    │ ──────────► │ • CDN Distribution                  │   │
│  │ • Optimized Assets  │              │ • HTTPS Certificate                │   │
│  │ • PWA Manifest      │              │ • Global Edge Servers              │   │
│  └─────────────────────┘              └─────────────────────────────────────┘   │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ HTTPS Request
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            👤 USER DEVICES                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  📱 Mobile Devices          💻 Desktop Browsers         🖥️ Smart TVs            │
│  ┌─────────────────┐      ┌─────────────────────┐      ┌─────────────────┐     │
│  │ • iOS Safari    │      │ • Chrome            │      │ • Browser Apps │     │
│  │ • Android Chrome│      │ • Firefox           │      │ • Kiosk Mode    │     │
│  │ • Samsung       │      │ • Edge              │      │ • Public Display│     │
│  │ • PWA Install   │      │ • PWA Install       │      │                 │     │
│  └─────────────────┘      └─────────────────────┘      └─────────────────┘     │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ App Request
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         🎯 APPLICATION LAYER                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  🔧 Service Worker (sw.js)           📱 Web App Manifest                       │
│  ┌─────────────────────────────┐      ┌─────────────────────────────────────┐   │
│  │ • Cache Management          │      │ • App Configuration                 │   │
│  │ • Offline Functionality     │      │ • Icon Sets (72px - 512px)         │   │
│  │ • Background Sync           │      │ • Theme Colors                      │   │
│  │ • Push Notifications        │      │ • Display Mode (standalone)        │   │
│  │ • Network Strategies        │      │ • Orientation (portrait)           │   │
│  │ • Image Cache (50 limit)    │      │ • Categories (sports, fitness)     │   │
│  └─────────────────────────────┘      └─────────────────────────────────────┘   │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 🔄 Performance Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        🚀 OPTIMIZATION PIPELINE                                │
└─────────────────────────────────────────────────────────────────────────────────┘

1. 🖼️  ASSET OPTIMIZATION
   ┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
   │ Source Assets       │    │ Sharp Processing    │    │ Optimized Output    │
   │ • Original images   │───►│ • JPEG: 75%/65%     │───►│ • 77.7% size saved  │
   │ • Multiple formats  │    │ • PNG: 80%/70%      │    │ • Progressive load  │
   │ • Large file sizes  │    │ • WebP conversion   │    │ • Multiple formats  │
   └─────────────────────┘    └─────────────────────┘    └─────────────────────┘

2. ⚡ RUNTIME PERFORMANCE
   ┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
   │ User Request        │    │ Service Worker      │    │ Optimized Response  │
   │ • Page/Asset load   │───►│ • Check cache first │───►│ • Instant if cached │
   │ • Network dependent │    │ • Smart strategies  │    │ • Background fetch  │
   │ • Variable speeds   │    │ • Image limit       │    │ • 78% faster loads  │
   └─────────────────────┘    └─────────────────────┘    └─────────────────────┘
```

## 🛠️ Tech Stack

### Core Technologies

- **React Native**: `0.79.5` - Cross-platform mobile development framework
- **Expo**: `~53.0.17` - Development platform and build tools
- **TypeScript**: `~5.8.3` - Type-safe JavaScript with strict mode
- **Expo Router**: `~5.1.3` - File-based navigation system

### UI & Styling

- **Expo Linear Gradient**: `^14.1.5` - Gradient backgrounds and effects
- **React Native Safe Area Context**: `5.4.0` - Safe area handling
- **Expo Vector Icons**: `^14.1.0` - Icon library
- **Centralized Theme System**: Custom design tokens and styling utilities

### Internationalization

- **i18next**: `^25.3.2` - Internationalization framework
- **React i18next**: `^15.6.0` - React bindings for i18next
- **Language Support**: Romanian (default) and English
- **Dynamic Translation**: Real-time language switching

### Performance & Development

- **Bundle Analyzer**: Custom tool for monitoring app size
- **Performance Monitoring**: Real-time metrics tracking
- **Error Boundaries**: Comprehensive error handling
- **TypeScript Strict Mode**: Enhanced type safety

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Expo CLI** (install globally): `npm install -g @expo/cli`
- **Git** for version control

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/RoxanaAnamariaTurc/crosul_sperantei.git
   cd crosul_sperantei
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

#### Development Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start and open on Android
- `npm run ios` - Start and open on iOS
- `npm run web` - Start and open in web browser

#### Build Scripts

- `npm run build:web` - Build optimized web version for production
- `npm run build:optimized` - Optimize images and build for web
- `npm run preview` - Preview built web version locally

#### Optimization Scripts

- `npm run optimize-images` - Compress and optimize images
- `npm run generate-icons` - Generate PWA icons in multiple sizes
- `npm run analyze-deps` - Check for unused dependencies
- `npm run type-check` - TypeScript validation
- `npm run bundle-analyze` - Bundle size analysis

## 📂 Project Structure & Organization

### Modern Component Architecture

```
app/
├── _components/              # Feature-based component organization
│   ├── ui/                   # Reusable UI components
│   │   ├── LazyImage.tsx     # Smart image loading with caching
│   │   ├── LoadingScreen.tsx # Progressive loading states
│   │   ├── PlaceholderImage.tsx # Fallback components
│   │   └── ImageWithErrorBoundary.tsx # Error handling
│   ├── features/             # Feature-specific components
│   │   ├── OptimizedEventCard.tsx # Event display cards
│   │   ├── OptimizedPreviousEvents.tsx # Gallery components
│   │   └── PricingInfo.tsx   # Pricing display logic
│   ├── shared/               # Common shared components
│   │   ├── Footer.tsx        # Application footer
│   │   ├── LanguageSwitcher.tsx # Language toggle
│   │   ├── OptimizedScrollView.tsx # Performance scrolling
│   │   ├── PerformanceMonitor.tsx # Development tools
│   │   └── ErrorBoundary.tsx # Global error handling
│   └── index.ts              # Barrel exports
├── data/                     # Static data layer
│   ├── events.ts             # Event definitions
│   ├── previousEvents.ts     # Historical data
│   └── sponsorData.ts        # Partner information
├── hooks/                    # Custom React hooks
│   ├── usePersistentLanguage.ts # Language state management
│   └── usePerformanceMetrics.ts # Performance tracking
├── i18n/                     # Internationalization system
│   └── config.ts             # Translation configuration
├── theme/                    # Design system
│   ├── index.ts              # Theme tokens and variables
│   └── hooks.ts              # Theme utilities
├── utils/                    # Utility functions
│   ├── accessibility.ts      # Accessibility helpers
│   ├── bundleAnalyzer.ts     # Bundle size analysis
│   ├── dateUtils.ts          # Date formatting
│   ├── imagePerformance.ts   # Image optimization
│   ├── languageStorage.ts    # Persistence layer
│   ├── openLink.ts           # External navigation
│   ├── performanceUtils.ts   # Performance monitoring
│   └── pricing.ts            # Business logic
├── _layout.tsx               # Root navigation layout
├── index.tsx                 # Home screen
├── events.tsx                # Event listings
├── event-details.tsx         # Event details
└── about.tsx                 # Information pages

assets/                       # Static assets
├── images/                   # Application images
├── optimized/                # Compressed assets (77.7% smaller)
│   ├── images/               # Main images (75% quality)
│   └── previousImages/       # Gallery images (65% quality)
└── previousImages/           # Original gallery assets

scripts/                      # Build and optimization tools
├── optimize-images.js        # Image compression pipeline
├── generate-pwa-icons.js     # PWA icon generation
└── analyze-dependencies.js   # Dependency analysis

web/                          # Web-specific configuration
├── manifest.json             # PWA manifest
├── sw.js                     # Service worker
├── index.html                # HTML entry point
└── assets/
    └── icons/                # PWA icons (14 sizes)
```

## 🌍 Internationalization & Localization

### Multi-Language Architecture

- **Supported Languages**: Configurable language system (currently supports multiple languages)
- **Dynamic Switching**: Real-time language change without app restart
- **Persistent Settings**: Language preferences saved using AsyncStorage
- **Fallback System**: Graceful degradation for missing translations
- **Type Safety**: Full TypeScript support for translation keys
- **Resource Management**: Organized translation files for maintainability

### Implementation

- **i18next Framework**: Industry-standard internationalization
- **React Integration**: Seamless hooks-based integration
- **Performance Optimized**: Lazy loading of translation resources
- **Extensible**: Easy to add new languages and regions

## 📊 Performance Metrics & Optimization

### Asset Optimization Results

| Metric           | Before       | After           | Improvement |
| ---------------- | ------------ | --------------- | ----------- |
| Total Asset Size | 138.27 MB    | 30.83 MB        | -77.7%      |
| Memory Usage     | ~150 MB      | ~45 MB          | -70%        |
| Load Time        | 8-15 seconds | 1-3 seconds     | -80%        |
| Bundle Size      | Unmonitored  | Tracked & Alert | Optimized   |
| Cache Strategy   | None         | Smart 50-limit  | Efficient   |

### Runtime Optimizations

- **Lazy Loading**: Progressive image loading with viewport detection
- **Smart Caching**: Service Worker with intelligent cache strategies
- **Memory Management**: Prevents memory leaks and spikes
- **Bundle Analysis**: Automatic size monitoring and alerts
- **Performance Grading**: A-F scoring system for continuous optimization
- **Error Recovery**: Graceful degradation with retry mechanisms

### Monitoring & Analysis

- **Real-time Metrics**: Load times, memory usage, and interaction latency
- **Bundle Analyzer**: Dependency usage and size recommendations
- **Performance Dashboard**: Development-time performance feedback
- **Production Monitoring**: Automated tracking and alerting

## 🎨 Design System & Theming

### Centralized Theme Architecture

- **Design Tokens**: Consistent color palettes, typography scales, and spacing systems
- **Component Tokens**: Reusable design patterns and component specifications
- **Theme Hooks**: Easy access to design tokens throughout the application
- **Responsive Design**: Adaptive layouts for different screen sizes and orientations
- **Dark Theme Support**: Built-in dark mode with customizable color schemes

### Key Design Features

- **Modern UI**: Clean, contemporary design with smooth animations
- **Accessibility**: WCAG compliant contrast ratios and touch targets
- **Cross-Platform**: Consistent experience across iOS, Android, and Web
- **Performance**: Hardware-accelerated animations and transitions
- **Customizable**: Easy to rebrand and customize for different events

## 🌐 Deployment & Hosting

### Production Deployment (Netlify)

The application is configured for automatic deployment with:

- **Build Command**: `npx expo export --platform web`
- **Publish Directory**: `dist`
- **Node Version**: `18`
- **Auto Deploy**: Triggered on every push to `main` branch
- **CDN Distribution**: Global edge servers for optimal performance
- **HTTPS**: Automatic SSL certificates and secure connections

### Platform Support

- **iOS**: Native iOS application with platform-specific optimizations
- **Android**: Native Android application with Material Design elements
- **Web**: Progressive Web App (PWA) with offline capabilities
- **Desktop**: Responsive design optimized for desktop browsers

### PWA Features

- **Installable**: Can be installed like native applications
- **Offline Support**: Service Worker caching for offline functionality
- **App-like Experience**: Standalone display mode without browser UI
- **Background Sync**: Offline actions synced when connection restored
- **Push Notifications**: Support for engagement notifications

## 🛠️ Development Tools & Quality

### Code Quality & Analysis

- **Strict TypeScript**: Enhanced type safety with comprehensive error checking
- **Error Boundaries**: Graceful error handling throughout the application
- **Dependency Analysis**: Automated tools to identify unused packages
- **Component Architecture**: Feature-based organization for scalability
- **Bundle Monitoring**: Real-time bundle size tracking and optimization alerts
- **Performance Grading**: Automated A-F scoring for performance metrics

### Development Experience

- **Hot Reloading**: Fast development with Expo's development server
- **Type Checking**: Real-time TypeScript validation and error reporting
- **Performance Dashboard**: Visual feedback on app performance during development
- **Automated Testing**: Testing utilities and performance regression detection
- **Development Scripts**: Comprehensive build and analysis tools

### Monitoring & Analytics

- **Performance Metrics**: Real-time tracking of load times and memory usage
- **Bundle Analysis**: Dependency usage monitoring and size recommendations
- **Error Tracking**: Comprehensive error logging and debugging tools
- **Production Monitoring**: Automated tracking for live applications

## 🚀 Technical Achievements

### Performance Optimizations Delivered

- ✅ **77.7% Asset Size Reduction**: Comprehensive image and asset optimization
- ✅ **A+ Performance Score**: 95% optimization rating with industry-leading practices
- ✅ **Enterprise Architecture**: Scalable component organization and design patterns
- ✅ **TypeScript Strict Mode**: Enhanced type safety and development experience
- ✅ **Progressive Web App**: Full PWA compliance with offline capabilities
- ✅ **Error Boundaries**: Comprehensive error handling with graceful recovery
- ✅ **Real-time Analytics**: Built-in performance monitoring and bundle analysis

### Modern Development Practices

- **Component-Driven Architecture**: Feature-based organization for maintainability
- **Design System**: Centralized theme system with consistent design tokens
- **Internationalization**: Full i18n support with dynamic language switching
- **Performance-First**: Bundle optimization and lazy loading throughout
- **Cross-Platform**: Single codebase supporting iOS, Android, and Web
- **Production-Ready**: Automated deployment with CI/CD integration

## 📚 Technical Documentation

### Architecture References

- [Performance Optimization Report](./PERFORMANCE_OPTIMIZATION.md) - Detailed performance analysis
- [Performance Fixes Applied](./PERFORMANCE_FIXES.md) - Optimization implementations
- [Code Quality Analysis](./CODE_QUALITY_REPORT.md) - Code quality metrics and improvements

### Framework Documentation

- [Expo Documentation](https://docs.expo.dev/) - Platform-specific development guides
- [React Native Documentation](https://reactnative.dev/) - Framework reference and best practices
- [TypeScript Documentation](https://www.typescriptlang.org/) - Type system and configuration

---

_RUNNER showcases modern React Native development with enterprise-grade architecture, performance optimizations, and production deployment strategies._

**⭐ Star this project to see how to build high-performance, cross-platform running event applications!**
yarn install

````

3. **Start the development server**
```bash
npm start
# or
expo start
````

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

docs/
└── LAZY_LOADING.md     # Performance optimization documentation
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

- [Lazy Loading Implementation](./docs/LAZY_LOADING.md) - Performance optimization details
- [Expo Documentation](https://docs.expo.dev/) - Platform-specific guides
- [React Native Documentation](https://reactnative.dev/) - Framework reference

---

_Built with ❤️ for learning React Native, supporting charity, and creating accessible multilingual experiences._

**🌟 Star this project if you found it helpful for learning React Native with internationalization!**
