import React, { useState } from 'react';
import './styles/globals.css';
import Landing from './pages/Landing';
import Home from './pages/Home';
import PortfolioPage from './pages/PortfolioPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudioDashboard from './pages/StudioDashboard';
import Toast from './components/Toast';
import HireModal from './components/HireModal';
import { MOCK_CREATORS, INITIAL_INQUIRIES } from './data/constants';

/**
 * App — Root Component for Artisync Platform
 */
export default function App() {
  const [page, setPage] = useState('landing');
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [inquiries, setInquiries] = useState(INITIAL_INQUIRIES);
  const [toast, setToast] = useState(null);
  const [hiringCreator, setHiringCreator] = useState(null);

  // Show floating toast notification with auto-timeout
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3800);
  };

  // Seamless router navigation
  const nav = (destination, data = {}) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (data.creator) {
      setSelectedCreator(data.creator);
    } else if (destination === 'portfolio' && !selectedCreator) {
      setSelectedCreator(currentUser || MOCK_CREATORS[0]);
    }
    setPage(destination);
  };

  // Handle Client Project Inquiry Submission
  const handleInquirySubmit = (inquiry) => {
    const newInquiry = {
      id: Date.now(),
      clientName: inquiry.clientName || 'Private Client',
      clientCompany: inquiry.clientEmail || 'Direct Studio',
      projectTitle: inquiry.title,
      budget: inquiry.budget,
      timeline: inquiry.timeline,
      status: 'New Inquiry',
      date: 'Just now',
      message: inquiry.message,
    };
    setInquiries([newInquiry, ...inquiries]);
    showToast(`Project inquiry sent to ${inquiry.creatorName || 'creator'}!`);
  };

  // Add new artwork to current user's portfolio
  const handleAddProject = (newArt) => {
    const targetUser = currentUser || MOCK_CREATORS[0];
    const updatedUser = {
      ...targetUser,
      artworks: [newArt, ...(targetUser.artworks || [])],
      projects: (targetUser.projects || 0) + 1,
    };

    if (currentUser) {
      setCurrentUser(updatedUser);
    }
    if (selectedCreator && selectedCreator.id === targetUser.id) {
      setSelectedCreator(updatedUser);
    }

    // Also update in MOCK_CREATORS if found
    const idx = MOCK_CREATORS.findIndex((c) => c.id === targetUser.id);
    if (idx !== -1) {
      MOCK_CREATORS[idx] = updatedUser;
    }

    showToast('New masterpiece published to your showcase!');
  };

  // Delete artwork from current user's portfolio
  const handleDeleteProject = (artId) => {
    const targetUser = currentUser || MOCK_CREATORS[0];
    const updatedUser = {
      ...targetUser,
      artworks: (targetUser.artworks || []).filter((a) => a.id !== artId),
      projects: Math.max(0, (targetUser.projects || 1) - 1),
    };

    if (currentUser) {
      setCurrentUser(updatedUser);
    }
    if (selectedCreator && selectedCreator.id === targetUser.id) {
      setSelectedCreator(updatedUser);
    }

    const idx = MOCK_CREATORS.findIndex((c) => c.id === targetUser.id);
    if (idx !== -1) {
      MOCK_CREATORS[idx] = updatedUser;
    }

    showToast('Artwork removed from showcase.');
  };

  // Sign in handler
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setSelectedCreator(user);
    showToast(`Signed in as ${user.name} (${user.role || user.jobType})`);
    if (user.role === 'Client / Studio') {
      nav('home');
    } else {
      nav('dashboard');
    }
  };

  // Sign up handler
  const handleSignupSuccess = (newUser) => {
    setCurrentUser(newUser);
    setSelectedCreator(newUser);
    // Add to creators pool if creator
    if (newUser.role === 'Creator') {
      MOCK_CREATORS.unshift(newUser);
    }
    showToast(`Welcome to Artisync, ${newUser.name}!`);
    if (newUser.role === 'Creator') {
      nav('dashboard');
    } else {
      nav('home');
    }
  };

  // Sign out handler
  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedCreator(null);
    showToast('Signed out successfully.');
    nav('landing');
  };

  return (
    <>
      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Direct Hire Modal from Explore page */}
      {hiringCreator && (
        <HireModal
          creator={hiringCreator}
          isOpen={Boolean(hiringCreator)}
          onClose={() => setHiringCreator(null)}
          onSubmitInquiry={(inquiry) => {
            handleInquirySubmit(inquiry);
            setHiringCreator(null);
          }}
        />
      )}

      {/* 1. Landing Page */}
      {page === 'landing' && (
        <Landing
          onSignup={() => nav('signup')}
          onLogin={() => nav('login')}
          onExplore={() => nav('home')}
          onCreatorClick={(creator) => nav('portfolio', { creator })}
        />
      )}

      {/* 2. Browse / Explore Creators Marketplace */}
      {page === 'home' && (
        <Home
          currentUser={currentUser}
          onNavigate={nav}
          onLogout={handleLogout}
          onCreatorClick={(creator) => nav('portfolio', { creator })}
          onHireClick={(creator) => setHiringCreator(creator)}
        />
      )}

      {/* 3. Creator Portfolio Showcase */}
      {page === 'portfolio' && (
        <PortfolioPage
          creator={selectedCreator || currentUser || MOCK_CREATORS[0]}
          currentUser={currentUser}
          onNavigate={nav}
          onLogout={handleLogout}
          onHireSubmit={handleInquirySubmit}
        />
      )}

      {/* 4. Creator Studio / Dashboard */}
      {page === 'dashboard' && (
        <StudioDashboard
          currentUser={currentUser || MOCK_CREATORS[0]}
          inquiries={inquiries}
          onNavigate={nav}
          onLogout={handleLogout}
          onAddProject={handleAddProject}
          onDeleteProject={handleDeleteProject}
        />
      )}

      {/* 5. Sign In Page */}
      {page === 'login' && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onNavigate={nav}
        />
      )}

      {/* 6. Multi-Step Sign Up / Onboarding */}
      {page === 'signup' && (
        <Signup
          onSignupSuccess={handleSignupSuccess}
          onNavigate={nav}
        />
      )}
    </>
  );
}
