import React, { useState } from 'react';
import { X, Mail, Lock, User, AlertCircle } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialType = 'login', onAuthSuccess }) {
  if (!isOpen) return null;

  const [authType, setAuthType] = useState(initialType); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (authType === 'signup' && !fullName)) {
      setError('Please fill in all fields.');
      return;
    }

    // Retrieve users list from local storage
    const users = JSON.parse(localStorage.getItem('fm_users_list') || '[]');

    if (authType === 'signup') {
      // Check if user already exists
      const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (userExists) {
        setError('An account with this email already exists.');
        return;
      }

      // Create new user
      const newUser = {
        name: fullName,
        email: email.toLowerCase(),
        password: password // In real app, this would be hashed
      };

      users.push(newUser);
      localStorage.setItem('fm_users_list', JSON.stringify(users));
      
      // Auto login
      onAuthSuccess({ name: fullName, email: email.toLowerCase() });
      onClose();
    } else {
      // Login
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (!user) {
        setError('Invalid email or password.');
        return;
      }

      onAuthSuccess({ name: user.name, email: user.email });
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content auth-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div className="auth-header">
          <h2>{authType === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p>
            {authType === 'login' 
              ? 'Sign in to access your courses and certifications' 
              : 'Join FutureMinds and start your educational journey'}
          </p>
        </div>

        <div className="auth-body">
          {error && (
            <div className="quiz-feedback-box incorrect-box" style={{ marginTop: 0, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <AlertCircle size={18} className="lecture-icon" style={{ color: 'var(--accent-danger)' }} />
              <span className="quiz-feedback-text" style={{ color: 'var(--accent-danger)', fontWeight: 600 }}>{error}</span>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            {authType === 'signup' && (
              <div className="input-group">
                <label htmlFor="name-input">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="name-input"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            )}

            <div className="input-group">
              <label htmlFor="email-input">Email Address</label>
              <input
                id="email-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password-input">Password</label>
              <input
                id="password-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem' }}>
              {authType === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="auth-switch">
            {authType === 'login' ? (
              <>
                Don't have an account?{' '}
                <span onClick={() => { setAuthType('signup'); setError(''); }}>Sign Up</span>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <span onClick={() => { setAuthType('login'); setError(''); }}>Sign In</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
