import React from 'react';
import { Star, Clock, User, Award, Check } from 'lucide-react';

export default function CourseCard({ course, enrollment, onClick, onEnrollDirectly }) {
  const { title, description, category, rating, ratingCount, enrolledCount, duration, price, image, instructor } = course;

  const isEnrolled = !!enrollment;
  const progressPercent = enrollment ? Math.round((enrollment.completedLectures.length / course.curriculum.reduce((acc, m) => acc + m.lectures.length, 0)) * 100) : 0;

  // Helper to render stars
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

  return (
    <div className="glass-card course-card" onClick={onClick}>
      {/* Cover image & Category badge */}
      <div className="course-card-image-wrapper">
        <img src={image} alt={title} className="course-card-image" />
        <span className="course-card-badge">{category}</span>
      </div>

      <div className="course-card-content">
        {/* Rating summary */}
        <div className="course-card-rating">
          <span style={{ color: 'var(--accent-warning)', fontWeight: 700 }}>{rating}</span>
          <div className="stars-container">{renderStars(rating)}</div>
          <span style={{ color: 'var(--text-muted)' }}>({ratingCount.toLocaleString()})</span>
        </div>

        {/* Title & brief desc */}
        <h3 className="course-card-title">{title}</h3>
        <p className="course-card-desc">{description}</p>

        {/* Enrollments Progress bar if enrolled */}
        {isEnrolled ? (
          <div style={{ width: '100%', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              <span>Course Progress</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="progress-bar-bg" style={{ height: '4px' }}>
              <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={12} /> {duration}</span>
            <span>•</span>
            <span>{enrolledCount.toLocaleString()} students enrolled</span>
          </div>
        )}

        {/* Footer meta: Instructor & Price/CTA */}
        <div className="course-card-meta">
          <div className="instructor-info">
            <img src={instructor.avatar} alt={instructor.name} className="instructor-avatar" />
            <span className="instructor-name">{instructor.name.split(' ').slice(0,2).join(' ')}</span>
          </div>

          <div className="course-footer">
            {isEnrolled ? (
              <span 
                className="btn btn-outline" 
                style={{ 
                  padding: '0.4rem 1rem', 
                  fontSize: '0.8rem', 
                  borderColor: progressPercent === 100 ? 'var(--accent-success)' : 'var(--accent-primary)',
                  color: progressPercent === 100 ? 'var(--accent-success)' : 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                {progressPercent === 100 ? (
                  <>
                    <Check size={12} /> Certified
                  </>
                ) : (
                  'Resume'
                )}
              </span>
            ) : (
              <span className="course-price">${price}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
