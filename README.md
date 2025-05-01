# 🎮 Retro Galactic Fishing Game

A nostalgic Windows 95-styled galactic fishing game that displays leaderboard and market data. Built with Vite, React, and TypeScript.

![Screenshot on Mobile](/readme_images/screenshot_on_mobile.png)

## ✨ Key Features

- **Windows 95 UI Experience**: Complete with start menu, desktop icons, and application windows
- **Real-time Data**: Fetches and displays live leaderboard and market information
- **Fully Responsive**: Optimized for mobile, tablet, and desktop (up to 4K displays)
- **Complete Offline Support**: Works without internet connection through PWA capabilities
- **Tiny Bundle Size**: Optimized production build with minimal footprint
- **TypeScript**: Full type safety throughout the codebase
- **Performance Optimized**: Excellent lighthouse scores

## 📱 PWA Support & Offline Functionality

This application is built as a Progressive Web App with robust offline capabilities:
- Can be installed on home screen
- Works completely offline with cached data
- Shows network status indicator when connection is lost
- Service worker manages API response caching

![PWA Support](/readme_images/PWA_support.png)
![Offline Support Indicator](/readme_images/offline_support_indicator.png)

## 🚀 Performance

Optimized for lightning-fast load times and smooth performance on all devices:

<div style="display: flex; gap: 10px;">
  <img src="/readme_images/lighthouse_mobile_performance.png" alt="Mobile Performance" width="400"/>
  <img src="/readme_images/lighthouse_desktop_performance.png" alt="Desktop Performance" width="400"/>
</div>

## 🔧 Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 🏗️ Building for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

## 🛠️ Technology Stack

- **Vite**: For fast development and efficient bundling
- **React 19**: Utilizing the latest React features
- **TypeScript**: Complete type safety
- **Tailwind CSS**: For responsive and utility-first styling
- **ESLint & Prettier**: Ensuring code quality and consistency
- **PWA Plugin**: For service worker and manifest generation
