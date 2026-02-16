import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './presentation/components/ThemeContext';
import { AuthProvider } from './presentation/components/AuthContext';
import { MainLayout } from './presentation/layouts/MainLayout';
import { HomePage } from './presentation/pages/HomePage';
import { VideoPlayerPage } from './presentation/pages/VideoPlayerPage';
import { LoginPage } from './presentation/pages/LoginPage';
import { SignupPage } from './presentation/pages/SignupPage';
import './index.css'; // Make sure Tailwind is imported

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth Routes (no layout) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Main App Routes (with layout) */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="video/:id" element={<VideoPlayerPage />} />
              {/* Future routes: /profile, /settings */}
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
