# Crosul Speranței Blaj - React Native App

## 🏃‍♂️ About This Project

This is a mobile and web application built for **Crosul Speranței Blaj**, a charity running event in Blaj, Alba County, Romania. This project was developed as a learning experience to explore **React Native** and **Expo** technologies while contributing to a meaningful cause.

The app serves as a digital platform for the charity event, featuring event information, registration details, previous events showcase, and sponsor recognition.

## 🎯 Project Goals

- Learn and practice React Native development
- Build a responsive cross-platform application (iOS, Android, Web)
- Create a modern, user-friendly interface for a charity event
- Implement best practices in mobile app development

## ✨ Features

- **Responsive Design**: Works seamlessly on mobile devices and web browsers
- **Featured Events Carousel**: Interactive horizontal scroll with event details
- **Previous Events Section**: Animated infinite scroll showcasing past editions
- **Sponsors Recognition**: Display of event partners and sponsors
- **Event Details**: Comprehensive information about registration, pricing, and distances
- **Cross-Platform**: Runs on iOS, Android, and Web with consistent experience

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
   git clone https://github.com/yourusername/crosul-sperantei-blaj.git
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

## 🎨 Design Features

- **Dark Theme**: Elegant black background with golden accents
- **Responsive Cards**: Event cards that adapt to screen size
- **Smooth Animations**: Arrow animations and infinite scroll effects
- **Modern UI**: Clean, modern design with subtle shadows and gradients
- **Accessibility**: Proper contrast ratios and touch targets

## 📂 Project Structure

```
app/
├── (tabs)/              # Tab-based navigation (if applicable)
├── _components/         # Reusable components
│   └── Footer.tsx
├── data/               # Static data and configurations
│   └── events.ts
├── _layout.tsx         # Root layout with navigation
├── index.tsx           # Home screen
├── events.tsx          # Events listing
├── event-details.tsx   # Event details screen
└── about.tsx           # About page

assets/
├── images/             # App images and logos
└── ...

```

## 🔧 Configuration

The app is configured through:

- `app.json` - Expo configuration
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration

## 🙏 Acknowledgments

- **Crosul Speranței Blaj** organization for the opportunity
- **Expo team** for the excellent development platform
- **React Native community** for resources and support

---

_Built with ❤️ for learning React Native and supporting a great cause._
