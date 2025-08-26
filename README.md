# Reflect ⚡

> **We convert your thoughts into reality as this is what we do - Reflects.**

Reflect is a modern, AI-inspired creative studio built with Next.js that allows users to upload images, craft prompts, and apply artistic styles for instant creative generations. It's a lightweight, responsive web application that demonstrates modern web development practices with a focus on user experience and creative expression.

## Features

### Core Functionality

- **Image Upload & Processing**: Image upload with preview and downscaling more images more than 10Mb
- **Style Selection**: Choose from multiple artistic styles (Editorial, Streetwear, Vintage)
- **Prompt Engineering**: Natural language descriptions for image transformations
- **Real-time Generation**: Simulated AI image generation with retry(MAX 3) mechanisms with 20% fail chances
- **Chat History**: Persistent storage of all generated images and prompts, with functionality to rename and delete chat
- **Storage Management**: Built-in storage limits with visual indicators as browser allow limited storage so added this functionality to show storage utilised and improve performance

### User Experience

- **Responsive Design**: Mobile-first approach with PWA capabilities
- **Dark/Light Theme**: Automatic theme switching with system preference detection and manual toggle
- **Real-time Feedback**: Live form validation and progress indicators
- **Retry Logic**: Intelligent retry system with exponential backoff
- **Storage Monitoring**: Visual storage usage tracking with color-coded alerts
- **Accessibility**: Used Radix UI which allows navigation of app via keyboard with visible focus states and ARIA where needed.

### Technical Features

- **Modern Stack**: Next.js 15, React 19, TypeScript
- **State Management**: Zustand for client-side state with persistence
- **UI Components**: Radix UI primitives with custom styling
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with custom design system and theme support
- **Theme Management**: Next-themes integration for seamless dark/light mode switching
- **PWA Ready**: Service worker and app manifest for mobile experience

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **UI Library**: React 19
- **State Management**: Zustand
- **Styling**: Tailwind CSS 4 with theme support
- **UI Components**: Radix UI
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Theme Management**: next-themes
- **Build Tool**: Turbopack
- **Package Manager**: pnpm

## Installation

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/karanjas39/reflect.git
   cd reflect
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

```bash
# Development
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production with Turbopack
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Alternative commands
npm run dev
npm run build
npm run start
npm run lint
```

## Usage

### Creating New Images

1. **Upload Image**: Click to select an image file
2. **Choose Style**: Select from Editorial, Streetwear, or Vintage styles
3. **Write Prompt**: Describe the changes you want to see in the image
4. **Generate**: Click the generate button to create your transformation
5. **Monitor Progress**: Watch the retry system handle any generation failures

### Managing Your Collection

- **View History**: All generated images are stored in your chat history
- **Storage Management**: Monitor your storage usage with visual indicators
- **Delete Images**: Remove unwanted generations to free up space
- **Rename Chats**: Customize the names of your creative sessions

### Features in Action

- **Retry System**: Automatic retry on failure with exponential backoff
- **Storage Limits**: 3MB storage limit with real-time monitoring
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Theme Switching**: Automatic light/dark mode based on system preferences with manual override

## Design Notes

### Design Philosophy

Reflect follows a minimalist, creative-focused design approach that emphasizes:

- **Simplicity**: Clean, uncluttered interfaces that don't distract from creativity
- **Accessibility**: High contrast, readable typography, and intuitive navigation
- **Responsiveness**: Mobile-first design that scales beautifully to all devices
- **Visual Hierarchy**: Clear information architecture with logical content flow

### Color Scheme

- **Primary**: Brand colors for main actions and highlights
- **Secondary**: Supporting colors for backgrounds and borders
- **Accent**: Vibrant colors for interactive elements and feedback
- **Neutral**: Subtle grays for text and subtle UI elements
- **Theme Support**: Full dark and light mode with CSS variables for consistent theming

### Typography

- **Logo Font**: Custom font for the Reflect brand identity
- **Body Text**: Highly readable system fonts for content
- **Hierarchy**: Clear distinction between headings, body text, and captions

### Component Design

- **Cards**: Clean, elevated surfaces for content organization
- **Buttons**: Clear call-to-action elements with loading states
- **Forms**: Intuitive input fields with real-time validation
- **Feedback**: Toast notifications and progress indicators
- **Theme Toggle**: Accessible theme switcher with system preference detection

## Architecture

### Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── chat/[chatid]/  # Dynamic chat detail routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout component
│   └── page.tsx        # Home page
├── components/          # Reusable UI components
│   ├── chat-detail/    # Chat detail view components
│   ├── new-chat/       # New chat creation components
│   ├── sidebar/        # Navigation sidebar components
│   └── ui/             # Base UI component library
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and services
├── providers/          # Context providers and theme
└── store/              # Zustand state management
```

### State Management

- **Chat Store**: Manages chat history, storage, and image data
- **Persistence**: Local storage with Zustand persist middleware
- **Storage Calculation**: Real-time storage usage tracking
- **CRUD Operations**: Create, read, update, delete chat functionality

### Data Flow

1. **User Input**: Image upload, style selection, and prompt writing
2. **Validation**: Form validation using Zod schemas
3. **API Simulation**: Mock API service with retry logic
4. **State Update**: Zustand store updates with new chat data
5. **Persistence**: Automatic saving to local storage
6. **UI Update**: Reactive component updates based on state changes

## Configuration

### Build Configuration

- **Turbopack**: Enabled for faster development builds
- **TypeScript**: Strict type checking enabled
- **ESLint**: Next.js recommended configuration
- **Tailwind**: JIT compilation for optimal CSS

## Testing

### Current Testing Status

The application currently includes:

- **Type Safety**: Full TypeScript coverage
- **Form Validation**: Zod schema validation
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Mock API**: Simulated API responses for development

## PWA Features

### Progressive Web App

- **Installable**: Add to home screen on mobile devices
- **Offline Support**: Service worker for offline functionality
- **App-like Experience**: Full-screen mode and native feel
- **Splash Screens**: Optimized loading screens for all device sizes

### Mobile Optimization

- **Touch-friendly**: Optimized for touch interactions
- **Responsive Images**: Adaptive image sizing
- **Performance**: Optimized for mobile networks
- **Accessibility**: Mobile-first accessibility features

---

**Reflect** - Where thoughts become reality through creative expression. ✨
