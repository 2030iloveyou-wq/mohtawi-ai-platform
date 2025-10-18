import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import MyCreations from './pages/MyCreations';
import About from './pages/About';
import Contact from './pages/Contact';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  const renderPage = () => {
    if (user && currentPage !== 'home' && currentPage !== 'tools' && currentPage !== 'about' && currentPage !== 'contact' && currentPage !== 'pricing') {
      if (currentPage === 'login' || currentPage === 'signup') {
        setCurrentPage('dashboard');
        return <Dashboard onNavigate={setCurrentPage} />;
      }
      return <Dashboard onNavigate={setCurrentPage} />;
    }

    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'tools':
        return <Tools onNavigate={setCurrentPage} />;
      case 'pricing':
        return <Pricing onNavigate={setCurrentPage} />;
      case 'login':
        return <Login onNavigate={setCurrentPage} />;
      case 'signup':
        return <Signup onNavigate={setCurrentPage} />;
      case 'dashboard':
        return user ? <Dashboard onNavigate={setCurrentPage} /> : <Login onNavigate={setCurrentPage} />;
      case 'settings':
        return user ? <Settings onNavigate={setCurrentPage} /> : <Login onNavigate={setCurrentPage} />;
      case 'my-creations':
        return user ? <MyCreations onNavigate={setCurrentPage} /> : <Login onNavigate={setCurrentPage} />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  const showFooter = currentPage !== 'dashboard' && currentPage !== 'login' && currentPage !== 'signup' && currentPage !== 'settings' && currentPage !== 'my-creations';

  return (
    <>
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
      {showFooter && <Footer onNavigate={setCurrentPage} />}
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
