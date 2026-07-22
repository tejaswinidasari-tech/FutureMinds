import React, { useState } from 'react';
import { BookOpen, Search, LogOut, User, Menu, Award } from 'lucide-react';

export default function Navbar({ currentUser, onSearchChange, onCategoryChange, onAuthClick, onSignOut, onViewProfile, onGoHome }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substr(0, 2);
  };

  return (
    <nav className="navbar glass-panel">
      {/* Brand logo */}
      <div className="nav-brand" onClick={onGoHome}>
        <div className="nav-brand-logo">
          <BookOpen size={22} />
        </div>
        <span>FutureMinds</span>
      </div>

      {/* Search bar */}
      <div className="nav-search">
        <Search size={18} color="var(--text-muted)" />
        <input 
          type="text" 
          placeholder="Search for courses, skills, or topics..." 
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>

      {/* Nav Actions / Links */}
      <div className="nav-links">
        <span className="nav-link" onClick={onGoHome}>Courses</span>
        
        {currentUser ? (
          <>
            <span className="nav-link" onClick={onViewProfile}>My Learning</span>
            
            {/* User Profile dropdown wrapper */}
            <div style={{ position: 'relative' }}>
              <div className="user-menu" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <div className="avatar">
                  {getInitials(currentUser.name)}
                </div>
                <span className="nav-link" style={{ margin: 0, color: 'white', fontWeight: 600 }}>
                  {currentUser.name.split(' ')[0]}
                </span>
              </div>

              {dropdownOpen && (
                <div 
                  className="glass-panel" 
                  style={{
                    position: 'absolute',
                    top: '55px',
                    right: '0',
                    width: '180px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    padding: '0.5rem 0',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'var(--shadow-md)',
                    zIndex: 200
                  }}
                  onClick={() => setDropdownOpen(false)}
                >
                  <button 
                    onClick={onViewProfile}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: '0.75rem 1.25rem',
                      color: 'var(--text-primary)',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      cursor: 'pointer',
                      width: '100%',
                      fontFamily: 'inherit',
                      fontSize: '0.9rem'
                    }}
                  >
                    <User size={15} /> My Profile
                  </button>
                  <button 
                    onClick={onSignOut}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: '0.75rem 1.25rem',
                      color: 'var(--accent-danger)',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      cursor: 'pointer',
                      width: '100%',
                      fontFamily: 'inherit',
                      fontSize: '0.9rem'
                    }}
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button className="btn btn-secondary" style={{ padding: '0.5rem 1.25rem' }} onClick={() => onAuthClick('login')}>
              Sign In
            </button>
            <button className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }} onClick={() => onAuthClick('signup')}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
