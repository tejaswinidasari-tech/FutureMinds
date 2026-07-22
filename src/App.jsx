import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CourseCard from './components/CourseCard';
import CourseDetailsModal from './components/CourseDetailsModal';
import CoursePlayer from './components/CoursePlayer';
import AuthModal from './components/AuthModal';
import ProfileView from './components/ProfileView';
import CertificateView from './components/CertificateView';
import { coursesData } from './data/courses';
import './App.css';

function App() {
  // App views: 'home' | 'player' | 'profile'
  const [currentView, setCurrentView] = useState('home');
  const [activeCourseId, setActiveCourseId] = useState(null);
  
  // Auth state
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('fm_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Enrollments state (maps courseId -> enrollment details)
  const [enrolledCourses, setEnrolledCourses] = useState({});

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Modal controls
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState('login');
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedCertCourseId, setSelectedCertCourseId] = useState(null);

  // Load enrollment data when current user changes
  useEffect(() => {
    if (currentUser) {
      const savedEnrollments = localStorage.getItem(`fm_enrollments_${currentUser.email}`);
      if (savedEnrollments) {
        setEnrolledCourses(JSON.parse(savedEnrollments));
      } else {
        setEnrolledCourses({});
      }
    } else {
      setEnrolledCourses({});
    }
  }, [currentUser]);

  // Sync enrollments to localStorage helper
  const saveEnrollments = (updatedEnrollments) => {
    setEnrolledCourses(updatedEnrollments);
    if (currentUser) {
      localStorage.setItem(`fm_enrollments_${currentUser.email}`, JSON.stringify(updatedEnrollments));
    }
  };

  // Sign out handler
  const handleSignOut = () => {
    localStorage.removeItem('fm_user');
    setCurrentUser(null);
    setEnrolledCourses({});
    setCurrentView('home');
  };

  // Auth success handler
  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('fm_user', JSON.stringify(user));
  };

  // Enroll handler
  const handleEnroll = (courseId) => {
    if (!currentUser) {
      // Trigger login first
      setAuthType('login');
      setShowAuthModal(true);
      return;
    }

    if (enrolledCourses[courseId]) {
      // Already enrolled, just open player
      setActiveCourseId(courseId);
      setCurrentView('player');
      setSelectedCourseId(null); // close details modal if open
      return;
    }

    // Initialize new enrollment
    const updatedEnrollments = {
      ...enrolledCourses,
      [courseId]: {
        progress: 0,
        completedLectures: [],
        completed: false,
        dateCompleted: null,
        certHash: null
      }
    };
    saveEnrollments(updatedEnrollments);

    // Increment enrolledCount in session/local state if we wanted, but static count is fine.
    // Open player
    setActiveCourseId(courseId);
    setCurrentView('player');
    setSelectedCourseId(null);
  };

  // Toggle lecture complete
  const handleToggleLectureComplete = (lectureId, isComplete) => {
    if (!activeCourseId || !currentUser) return;

    const currentEnrollment = enrolledCourses[activeCourseId];
    if (!currentEnrollment) return;

    let updatedCompletedLectures = [...currentEnrollment.completedLectures];

    if (isComplete) {
      if (!updatedCompletedLectures.includes(lectureId)) {
        updatedCompletedLectures.push(lectureId);
      }
    } else {
      updatedCompletedLectures = updatedCompletedLectures.filter(id => id !== lectureId);
    }

    // Calculate completion status
    const currentCourse = coursesData.find(c => c.id === activeCourseId);
    const totalLecturesCount = currentCourse.curriculum.reduce((acc, m) => acc + m.lectures.length, 0);
    const isNowCompleted = updatedCompletedLectures.length === totalLecturesCount;

    const updatedEnrollments = {
      ...enrolledCourses,
      [activeCourseId]: {
        ...currentEnrollment,
        completedLectures: updatedCompletedLectures,
        completed: isNowCompleted,
        dateCompleted: isNowCompleted ? (currentEnrollment.dateCompleted || new Date().toISOString()) : null,
        certHash: isNowCompleted ? (currentEnrollment.certHash || `FM-${activeCourseId.toUpperCase()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`) : null
      }
    };

    saveEnrollments(updatedEnrollments);
  };

  // Category filter tabs list
  const categories = ['All', 'Development', 'Design', 'AI & Data Science', 'Cloud & DevOps'];

  // Filtered courses selector
  const filteredCourses = coursesData.filter(course => {
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeCourse = coursesData.find(c => c.id === activeCourseId);
  const selectedCourse = coursesData.find(c => c.id === selectedCourseId);
  const selectedCertCourse = coursesData.find(c => c.id === selectedCertCourseId);

  return (
    <div className="app-container">
      <Navbar 
        currentUser={currentUser}
        onSearchChange={setSearchQuery}
        onAuthClick={(type) => { setAuthType(type); setShowAuthModal(true); }}
        onSignOut={handleSignOut}
        onViewProfile={() => setCurrentView('profile')}
        onGoHome={() => setCurrentView('home')}
      />

      {currentView === 'home' && (
        <>
          <HeroSection 
            onExploreClick={() => {
              const catalogElement = document.getElementById('catalog-section');
              if (catalogElement) {
                catalogElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            onGetStartedClick={() => { setAuthType('signup'); setShowAuthModal(true); }}
            isLoggedIn={!!currentUser}
          />

          <main className="catalog-section" id="catalog-section">
            <div className="section-header">
              <h2>Explore Our Masterclasses</h2>
            </div>

            {/* Categories filter tabs */}
            <div className="categories-bar">
              {categories.map(cat => (
                <button 
                  key={cat}
                  className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Courses grid */}
            {filteredCourses.length === 0 ? (
              <div className="empty-state" style={{ margin: '2rem 0' }}>
                <h3>No courses found</h3>
                <p>We couldn't find any courses matching your search query. Try searching for other topics.</p>
              </div>
            ) : (
              <div className="courses-grid">
                {filteredCourses.map(course => (
                  <CourseCard 
                    key={course.id}
                    course={course}
                    enrollment={enrolledCourses[course.id]}
                    onClick={() => {
                      if (enrolledCourses[course.id]) {
                        // Resume straight away if enrolled
                        setActiveCourseId(course.id);
                        setCurrentView('player');
                      } else {
                        // Open details modal
                        setSelectedCourseId(course.id);
                      }
                    }}
                  />
                ))}
              </div>
            )}
          </main>
        </>
      )}

      {currentView === 'player' && activeCourse && (
        <CoursePlayer 
          course={activeCourse}
          enrollment={enrolledCourses[activeCourseId]}
          onToggleLectureComplete={handleToggleLectureComplete}
          onBackToDashboard={() => setCurrentView('profile')}
          onViewCertificate={() => setSelectedCertCourseId(activeCourseId)}
        />
      )}

      {currentView === 'profile' && currentUser && (
        <ProfileView 
          currentUser={currentUser}
          enrolledCourses={enrolledCourses}
          courses={coursesData}
          onResumeCourse={(courseId) => {
            setActiveCourseId(courseId);
            setCurrentView('player');
          }}
          onViewCertificate={(courseId) => {
            setSelectedCertCourseId(courseId);
          }}
          onDiscoverCourses={() => setCurrentView('home')}
        />
      )}

      {/* Auth Modal overlay */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialType={authType}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Course Detail Modal overlay */}
      <CourseDetailsModal 
        isOpen={selectedCourseId !== null}
        onClose={() => setSelectedCourseId(null)}
        course={selectedCourse}
        enrollment={selectedCourse ? enrolledCourses[selectedCourse.id] : null}
        onEnroll={() => selectedCourse && handleEnroll(selectedCourse.id)}
        onResume={() => {
          if (selectedCourse) {
            setActiveCourseId(selectedCourse.id);
            setCurrentView('player');
            setSelectedCourseId(null);
          }
        }}
      />

      {/* Certificate Modal overlay */}
      <CertificateView 
        isOpen={selectedCertCourseId !== null}
        onClose={() => setSelectedCertCourseId(null)}
        course={selectedCertCourse}
        userName={currentUser ? currentUser.name : 'Learner'}
        certInfo={selectedCertCourse ? enrolledCourses[selectedCertCourse.id] : null}
      />

      {/* Footer (only on dashboard and profile, hide on distraction-free learning player) */}
      {currentView !== 'player' && (
        <footer className="footer">
          <div className="footer-grid">
            <div className="footer-col">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-display)', fontWeight: 800 }}>
                FutureMinds
              </h3>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                Curating the educational pathways of tomorrow. Discover high quality syllabus, complete final tests, and earn globally verifiable certificates.
              </p>
            </div>
            <div className="footer-col">
              <h3>Categories</h3>
              <ul>
                <li><a href="#catalog-section" onClick={() => setActiveCategory('Development')}>Development</a></li>
                <li><a href="#catalog-section" onClick={() => setActiveCategory('Design')}>Design</a></li>
                <li><a href="#catalog-section" onClick={() => setActiveCategory('AI & Data Science')}>AI & Data Science</a></li>
                <li><a href="#catalog-section" onClick={() => setActiveCategory('Cloud & DevOps')}>Cloud & DevOps</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>Platform</h3>
              <ul>
                <li><a href="#catalog-section">Browse Courses</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); if (currentUser) setCurrentView('profile'); else { setAuthType('login'); setShowAuthModal(true); } }}>My Learning Console</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setAuthType('signup'); setShowAuthModal(true); }}>Create Account</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} FutureMinds Academy. All rights reserved.</span>
            <span>Made with passion for Education & Training.</span>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
