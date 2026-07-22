import React, { useState, useEffect } from 'react';
import { Play, BookOpen, HelpCircle, Check, ArrowLeft, Award, RefreshCw, ChevronRight } from 'lucide-react';

export default function CoursePlayer({ course, enrollment, onToggleLectureComplete, onBackToDashboard, onViewCertificate, onUpdateQuizResult }) {
  const [activeLectureId, setActiveLectureId] = useState(null);
  
  // Find first lecture as default
  useEffect(() => {
    if (course && course.curriculum.length > 0) {
      setActiveLectureId(course.curriculum[0].lectures[0].id);
    }
  }, [course]);

  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  
  // Reset quiz when switching to/from a quiz lecture
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    quizFinishedState(false);
  };
  
  // Track quiz finished state locally
  const [localQuizFinished, quizFinishedState] = useState(false);

  // Flat list of all lectures for easy navigation
  const allLectures = course.curriculum.reduce((acc, module) => {
    return [...acc, ...module.lectures];
  }, []);

  const activeLecture = allLectures.find(l => l.id === activeLectureId);

  // Reset quiz when active lecture changes
  useEffect(() => {
    resetQuiz();
  }, [activeLectureId]);

  if (!course || !activeLecture) return null;

  // Enrollment stats
  const completedList = enrollment?.completedLectures || [];
  const totalLecturesCount = allLectures.length;
  const completedLecturesCount = completedList.length;
  const progressPercent = Math.round((completedLecturesCount / totalLecturesCount) * 100);

  // Handle quiz option click
  const handleOptionSelect = (optionIdx) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionIndex(optionIdx);
  };

  // Submit current quiz answer
  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null || isAnswerSubmitted) return;

    const currentQuestion = activeLecture.quizQuestions[currentQuestionIndex];
    const isCorrect = selectedOptionIndex === currentQuestion.correctAnswerIndex;

    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }
    setIsAnswerSubmitted(true);
  };

  // Next quiz question or finish
  const handleNextQuestion = () => {
    const questionsCount = activeLecture.quizQuestions.length;
    if (currentQuestionIndex + 1 < questionsCount) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);
    } else {
      // Calculate final score percentage
      const finalScore = quizScore + (selectedOptionIndex === activeLecture.quizQuestions[currentQuestionIndex].correctAnswerIndex ? 1 : 0);
      const scorePercent = Math.round((finalScore / questionsCount) * 100);
      
      quizFinishedState(true);
      
      // If passed (score >= 80%), auto-mark lecture as complete!
      const passed = scorePercent >= 80;
      if (passed && !completedList.includes(activeLecture.id)) {
        onToggleLectureComplete(activeLecture.id, true);
      }
    }
  };

  const handleRetryQuiz = () => {
    resetQuiz();
  };

  // Render player content area
  const renderPlayerContent = () => {
    if (activeLecture.type === 'video') {
      return (
        <div className="player-video-wrapper">
          <video 
            key={activeLecture.id} 
            controls 
            src={activeLecture.videoUrl}
            poster={course.image}
            onEnded={() => {
              // Auto-mark video complete when ended
              if (!completedList.includes(activeLecture.id)) {
                onToggleLectureComplete(activeLecture.id, true);
              }
            }}
          />
        </div>
      );
    }

    if (activeLecture.type === 'reading') {
      return (
        <div className="player-text-content">
          <h2>{activeLecture.title}</h2>
          <div style={{ whiteSpace: 'pre-line' }}>
            {activeLecture.readingContent}
          </div>
          <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
            {!completedList.includes(activeLecture.id) ? (
              <button 
                className="btn btn-success" 
                onClick={() => onToggleLectureComplete(activeLecture.id, true)}
              >
                <Check size={18} /> Mark as Read
              </button>
            ) : (
              <div className="quiz-feedback-box correct-box" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                <Check size={18} style={{ color: 'var(--accent-success)' }} />
                <span style={{ color: 'var(--accent-success)', fontWeight: 600 }}>You've read this module.</span>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (activeLecture.type === 'quiz') {
      const questions = activeLecture.quizQuestions;
      const questionsCount = questions.length;

      if (localQuizFinished) {
        const scorePercent = Math.round((quizScore / questionsCount) * 100);
        const hasPassed = scorePercent >= 80;

        return (
          <div className="quiz-container quiz-result-card">
            <Award size={48} style={{ color: hasPassed ? 'var(--accent-success)' : 'var(--text-muted)', marginBottom: '1rem' }} />
            <h2>Quiz Results</h2>
            <div className="quiz-result-score">{quizScore} / {questionsCount}</div>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
              {hasPassed 
                ? `Outstanding! You passed with ${scorePercent}%. You can now claim your certification upon completing all lectures.` 
                : `You scored ${scorePercent}%. You need at least 80% to pass this module. Please try again.`}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button className="btn btn-secondary" onClick={handleRetryQuiz}>
                <RefreshCw size={16} /> Retry Quiz
              </button>
              {hasPassed && (
                <button className="btn btn-primary" onClick={() => onToggleLectureComplete(activeLecture.id, true)}>
                  Proceed to Next Lesson
                </button>
              )}
            </div>
          </div>
        );
      }

      const currentQuestion = questions[currentQuestionIndex];
      const isCorrectAnswer = selectedOptionIndex === currentQuestion.correctAnswerIndex;

      return (
        <div className="quiz-container">
          <div className="quiz-header">
            <h3>{activeLecture.title}</h3>
            <span className="quiz-progress-text">Question {currentQuestionIndex + 1} of {questionsCount}</span>
          </div>

          <div className="quiz-question">
            {currentQuestion.question}
          </div>

          <div className="quiz-options-list">
            {currentQuestion.options.map((option, idx) => {
              let optionClass = 'quiz-option-button';
              if (selectedOptionIndex === idx) optionClass += ' selected';
              if (isAnswerSubmitted) {
                if (idx === currentQuestion.correctAnswerIndex) {
                  optionClass += ' correct';
                } else if (selectedOptionIndex === idx) {
                  optionClass += ' incorrect';
                }
              }

              return (
                <button 
                  key={idx}
                  className={optionClass}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={isAnswerSubmitted}
                >
                  <div className="quiz-option-indicator">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  {option}
                </button>
              );
            })}
          </div>

          {isAnswerSubmitted && (
            <div className={`quiz-feedback-box ${isCorrectAnswer ? 'correct-box' : 'incorrect-box'}`}>
              <div className="quiz-feedback-title">
                {isCorrectAnswer ? 'Correct Answer!' : 'Incorrect'}
              </div>
              <p className="quiz-feedback-text">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {!isAnswerSubmitted ? (
              <button 
                className="btn btn-primary" 
                onClick={handleSubmitAnswer}
                disabled={selectedOptionIndex === null}
              >
                Submit Answer
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleNextQuestion}>
                {currentQuestionIndex + 1 < questionsCount ? 'Next Question' : 'Finish Quiz'} <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      );
    }
  };

  // Helper to render type icons
  const getLectureIcon = (type) => {
    switch (type) {
      case 'video': return <Play size={14} />;
      case 'reading': return <BookOpen size={14} />;
      case 'quiz': return <HelpCircle size={14} />;
      default: return <Play size={14} />;
    }
  };

  return (
    <div className="player-container">
      {/* Main content pane */}
      <div className="player-main">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <button className="btn btn-secondary" onClick={onBackToDashboard} style={{ padding: '0.5rem 1.2rem' }}>
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          
          {progressPercent === 100 && (
            <button className="btn btn-primary" onClick={onViewCertificate} style={{ background: 'var(--gold-gradient)', color: '#0f172a', fontWeight: 700, border: 'none', boxShadow: '0 0 15px rgba(245, 158, 11, 0.4)' }}>
              <Award size={16} /> Claim Certificate
            </button>
          )}
        </div>

        <div className="player-header-info">
          <div className="player-course-title">{course.title}</div>
          <h1 className="player-lecture-title">{activeLecture.title}</h1>
        </div>

        {renderPlayerContent()}
      </div>

      {/* Sidebar navigation */}
      <div className="player-sidebar">
        <div className="sidebar-header">
          <div className="progress-info">
            <span>Course Progress</span>
            <span>{progressPercent}% Complete</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        {course.curriculum.map((module, mIdx) => (
          <div key={module.id} style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="sidebar-module-title">{module.title}</div>
            <div className="sidebar-lecture-list">
              {module.lectures.map((lecture) => {
                const isActive = lecture.id === activeLectureId;
                const isCompleted = completedList.includes(lecture.id);

                return (
                  <div 
                    key={lecture.id}
                    className={`sidebar-lecture-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveLectureId(lecture.id)}
                  >
                    <div className="sidebar-lecture-info">
                      <div className="sidebar-lecture-title">{lecture.title}</div>
                      <div className="sidebar-lecture-meta">
                        {getLectureIcon(lecture.type)}
                        <span>{lecture.duration || 'Lecture'}</span>
                      </div>
                    </div>

                    <div 
                      className={`lecture-checkbox ${isCompleted ? 'checked' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        // For quiz, checkbox shouldn't be easily toggled off/on manually if user hasn't passed it
                        if (lecture.type === 'quiz' && !isCompleted) {
                          setActiveLectureId(lecture.id); // jump to quiz
                          return;
                        }
                        onToggleLectureComplete(lecture.id, !isCompleted);
                      }}
                    >
                      {isCompleted && <Check size={12} strokeWidth={3} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
