# YouTube Mini 🎬

A modern, feature-rich YouTube clone built with React, TypeScript, and Tailwind CSS. This project demonstrates clean architecture principles, modern UI/UX design, and responsive web development.

## ✨ Features

### 🎨 Modern UI/UX
- **Tailwind CSS**: Sleek, utility-first styling with a premium dark mode
- **Responsive Design**: Mobile-first approach with adaptive layouts (1-4 column grid)
- **Glassmorphism**: Modern design aesthetics with smooth transitions and hover effects
- **Lucide React Icons**: Beautiful, consistent iconography

### 🔐 Authentication
- **Mock Authentication System**: Login/Signup with form validation
- **Session Persistence**: User state saved in localStorage
- **User Menu**: Dropdown with profile, settings, and logout options
- **Protected Routes**: Seamless authentication flow

### 🎥 Video Features
- **Video Feed**: Browse videos with rich metadata (views, dates, channel info)
- **Video Player Page**: Dedicated page with player, description, comments, and related videos
- **Search Functionality**: Real-time search with query parameters
- **Click Navigation**: Seamless routing between pages

### 🎛️ Core Functionality
- **Dark/Light Theme**: Toggle between themes with persistence
- **Collapsible Sidebar**: Responsive navigation with smooth animations
- **Clean Architecture**: Separation of concerns (Domain, Infrastructure, Presentation)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/TheApostroff/youtube-demo.git
cd youtube-demo

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## 🏗️ Project Structure

```
src/
├── core/
│   ├── domain/        # Business entities (Video, User)
│   └── usecases/      # Application logic
├── infrastructure/
│   ├── api/           # API clients
│   ├── data/          # Mock data
│   └── repositories/  # Data access layer
├── presentation/
│   ├── components/    # Reusable UI components
│   ├── layouts/       # Page layouts
│   ├── pages/         # Route pages
│   └── styles/        # Component styles
└── shared/
    └── utils.ts       # Shared utilities
```

## 🧪 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons

## 🎯 Demo Credentials

Use any email and password (minimum 6 characters) to test the authentication system.

Example:
- Email: `demo@example.com`
- Password: `password123`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by YouTube's clean and intuitive interface
- Built as a learning project to demonstrate modern React development practices
