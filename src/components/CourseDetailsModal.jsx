import React from 'react';
import { X, Clock, Play, BookOpen, HelpCircle, Award, Star, Check } from 'lucide-react';

export default function CourseDetailsModal({ isOpen, onClose, course, enrollment, onEnroll, onResume }) {
  if (!isOpen || !course) return null;

  const { title, description, longDescription, category, rating, ratingCount, enrolledCount, duration, price, instructor, curriculum } = course;

  const isEnrolled = !!enrollment;

  // Render stars
  const renderStars = (rating) => {
    const stars = [];
    const floor = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={14} 
          fill={i < floor ? "currentColor" : "none"} 
          strokeWidth={2}
        />
      );
    }
    return stars;
  };

  const getLectureIcon = (type) => {
    switch (type) {
      case 'video': return <Play size={14} className="lecture-icon" />;
      case 'reading': return <BookOpen size={14} className="lecture-icon" />;
      case 'quiz': return <HelpCircle size={14} className="lecture-icon" />;
      default: return <Play size={14} className="lecture-icon" />;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        {/* Header banner */}
        <div className="course-detail-header">
          <div className="course-detail-category">{category}</div>
          <h2 className="course-detail-title">{title}</h2>
          
          <div className="course-detail-stats">
            <div style={{ display: 'flex', color: 'var(--accent-warning)', gap: '0.25rem' }}>
              <span style={{ fontWeight: 700 }}>{rating}</span>
              <div style={{ display: 'flex', color: 'var(--accent-warning)' }}>{renderStars(rating)}</div>
            </div>
            <span>({ratingCount.toLocaleString()} ratings)</span>
            <span>•</span>
            <span>{enrolledCount.toLocaleString()} students</span>
          </div>

          <div className="course-detail-instructor">
            <img src={instructor.avatar} alt={instructor.name} />
            <div>
              <div style={{ fontWeight: 600, color: 'white' }}>{instructor.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{instructor.title}</div>
            </div>
          </div>
        </div>

        {/* Body content */}
        <div className="course-detail-body">
          <div className="detail-section-title">About the Course</div>
          <p>{longDescription}</p>

          <div className="detail-section-title">
            <span>Course Syllabus</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 400, color: 'var(--text-muted)', marginLeft: 'auto' }}>
              {curriculum.length} modules • {curriculum.reduce((a, m) => a + m.lectures.length, 0)} lectures
            </span>
          </div>

          {/* Curriculum accordion */}
          <div className="curriculum-list">
            {curriculum.map((module) => (
              <div key={module.id} className="curriculum-module">
                <div className="module-header">{module.title}</div>
                <div className="module-lectures">
                  {module.lectures.map((lecture) => (
                    <div key={lecture.id} className="lecture-row">
                      <div className="lecture-left">
                        {getLectureIcon(lecture.type)}
                        <span>{lecture.title}</span>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{lecture.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Certificate notice */}
          <div className="quiz-feedback-box correct-box" style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeftWidth: '4px' }}>
            <Award size={24} style={{ color: 'var(--accent-success)', flexShrink: 0 }} />
            <div>
              <div className="quiz-feedback-title" style={{ color: 'white' }}>Official Completion Certificate</div>
              <p className="quiz-feedback-text" style={{ margin: 0, fontSize: '0.85rem' }}>
                Complete all course sections and achieve at least an 80% passing score on the final assessment quiz to earn your printable, verified certificate.
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="course-detail-footer">
          <div>
            {!isEnrolled && (
              <>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Price</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', fontFamily: 'var(--font-display)' }}>${price}</div>
              </>
            )}
          </div>

          <div>
            {isEnrolled ? (
              <button className="btn btn-primary" onClick={onResume}>
                Resume Learning
              </button>
            ) : (
              <button className="btn btn-primary" onClick={onEnroll} style={{ padding: '0.8rem 2.5rem' }}>
                Enroll Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
