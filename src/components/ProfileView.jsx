import React, { useState } from 'react';
import { Award, BookOpen, Clock, Play, CheckCircle } from 'lucide-react';

export default function ProfileView({ currentUser, enrolledCourses, courses, onResumeCourse, onViewCertificate, onDiscoverCourses }) {
  const [activeTab, setActiveTab] = useState('courses'); // 'courses' | 'certificates'

  const enrolledIds = Object.keys(enrolledCourses);
  const enrolledList = courses.filter(c => enrolledIds.includes(c.id));
  
  // Calculate completed courses
  const completedList = enrolledList.filter(c => enrolledCourses[c.id].completed || enrolledCourses[c.id].completedLectures.length === c.curriculum.reduce((acc, m) => acc + m.lectures.length, 0));

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substr(0, 2);
  };

  return (
    <div className="profile-container">
      {/* Profile summary header */}
      <div className="profile-card">
        <div className="profile-avatar-large">
          {getInitials(currentUser.name)}
        </div>
        <div className="profile-info">
          <h2>{currentUser.name}</h2>
          <p>{currentUser.email}</p>
          
          <div style={{ display: 'flex', gap: '2rem', marginTop: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
              <BookOpen size={16} color="var(--accent-primary)" />
              <span style={{ fontWeight: 600, color: 'white' }}>{enrolledIds.length}</span> Enrolled Courses
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
              <Award size={16} color="var(--accent-warning)" />
              <span style={{ fontWeight: 600, color: 'white' }}>{completedList.length}</span> Certifications
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tab-header">
        <span 
          className={`profile-tab ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          My Courses
        </span>
        <span 
          className={`profile-tab ${activeTab === 'certificates' ? 'active' : ''}`}
          onClick={() => setActiveTab('certificates')}
        >
          My Certificates
        </span>
      </div>

      {/* Tab Contents */}
      {activeTab === 'courses' && (
        <div>
          {enrolledList.length === 0 ? (
            <div className="empty-state">
              <BookOpen size={44} className="empty-state-icon" />
              <h3>No enrolled courses yet</h3>
              <p style={{ marginBottom: '1.5rem' }}>Start learning new skills today by exploring our hand-picked masterclasses.</p>
              <button className="btn btn-primary" onClick={onDiscoverCourses}>
                Discover Courses
              </button>
            </div>
          ) : (
            <div className="enrolled-grid">
              {enrolledList.map(course => {
                const enrollment = enrolledCourses[course.id];
                const totalLectures = course.curriculum.reduce((acc, m) => acc + m.lectures.length, 0);
                const completedCount = enrollment.completedLectures.length;
                const progressPercent = Math.round((completedCount / totalLectures) * 100);
                const isFinished = enrollment.completed || progressPercent === 100;

                return (
                  <div key={course.id} className="enrolled-card glass-panel">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      style={{ width: '100%', height: '160px', objectFit: 'cover' }} 
                    />
                    
                    <div className="enrolled-card-content">
                      <h3 className="enrolled-card-title">{course.title}</h3>
                      
                      <div className="enrolled-card-progress">
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                          <span>Course Progress</span>
                          <span>{progressPercent}%</span>
                        </div>
                        <div className="progress-bar-bg">
                          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                      </div>

                      <div style={{ marginTop: 'auto', display: 'flex', gap: '0.75rem' }}>
                        <button 
                          className="btn btn-secondary" 
                          style={{ flexGrow: 1, padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                          onClick={() => onResumeCourse(course.id)}
                        >
                          Resume Learning
                        </button>
                        
                        {isFinished && (
                          <button 
                            className="btn btn-primary" 
                            style={{ 
                              padding: '0.5rem 1rem', 
                              fontSize: '0.85rem',
                              background: 'var(--gold-gradient)',
                              border: 'none',
                              color: '#0f172a'
                            }}
                            onClick={() => onViewCertificate(course.id)}
                          >
                            <Award size={14} /> Certificate
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'certificates' && (
        <div>
          {completedList.length === 0 ? (
            <div className="empty-state">
              <Award size={44} className="empty-state-icon" />
              <h3>No certificates earned yet</h3>
              <p style={{ marginBottom: '1.5rem' }}>Complete 100% of all lectures and pass the final course quiz to generate your certification.</p>
              <button className="btn btn-primary" onClick={onDiscoverCourses}>
                Resume Learning
              </button>
            </div>
          ) : (
            <div className="certificates-grid">
              {completedList.map(course => {
                const enrollment = enrolledCourses[course.id];
                const dateStr = enrollment?.dateCompleted 
                  ? new Date(enrollment.dateCompleted).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                  : 'Recent';

                return (
                  <div key={course.id} className="certificate-card">
                    <div className="certificate-card-icon">
                      <Award size={24} />
                    </div>
                    <div className="certificate-card-info">
                      <div className="certificate-card-title">{course.title}</div>
                      <div className="certificate-card-date">Completed on {dateStr}</div>
                    </div>
                    <button 
                      className="btn btn-outline" 
                      style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', flexShrink: 0 }}
                      onClick={() => onViewCertificate(course.id)}
                    >
                      View & Print
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
