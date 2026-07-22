import React from 'react';
import { Award, ShieldAlert, Sparkles, BookOpen, Layers, ShieldCheck } from 'lucide-react';

export default function HeroSection({ onExploreClick, onGetStartedClick, isLoggedIn }) {
  return (
    <header className="hero">
      {/* Floating Sparkle Badge */}
      <div className="hero-badge">
        <Sparkles size={14} />
        <span>Empowering Future Minds & Leaders</span>
      </div>

      {/* Main headings */}
      <h1>Master the Tech & Design Skills of Tomorrow</h1>
      
      <p>
        Accelerate your career with curated courses designed by industry experts.
        Complete hands-on curriculum, pass final quizzes, and earn printable certification.
      </p>

      {/* CTA buttons */}
      <div className="hero-cta">
        <button className="btn btn-primary" onClick={onExploreClick}>
          Explore Courses
        </button>
        {!isLoggedIn && (
          <button className="btn btn-secondary" onClick={onGetStartedClick}>
            Get Started Free
          </button>
        )}
      </div>

      {/* Features showcase */}
      <div className="features-grid">
        <div className="feature-item">
          <div className="feature-icon-wrapper">
            <BookOpen size={20} />
          </div>
          <h3>Expert-Curated Syllabus</h3>
          <p>
            Dive into deep reading documents and professional quality videos prepared for engineering, design, and AI.
          </p>
        </div>

        <div className="feature-item">
          <div className="feature-icon-wrapper">
            <Layers size={20} />
          </div>
          <h3>Interactive Assessment Quizzes</h3>
          <p>
            Test your knowledge module-by-module. Gain at least 80% to successfully unlock course sections and credentials.
          </p>
        </div>

        <div className="feature-item">
          <div className="feature-icon-wrapper">
            <ShieldCheck size={20} />
          </div>
          <h3>Verified PDF Certificates</h3>
          <p>
            Showcase your achievement with printable high-end certifications complete with verification hashes.
          </p>
        </div>
      </div>
    </header>
  );
}
