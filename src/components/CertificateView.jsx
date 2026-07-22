import React from 'react';
import { X, Printer, Download, Award } from 'lucide-react';

export default function CertificateView({ isOpen, onClose, course, userName, certInfo }) {
  if (!isOpen || !course) return null;

  // Formatting date
  const completionDate = certInfo?.dateCompleted 
    ? new Date(certInfo.dateCompleted).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

  const certId = certInfo?.certHash || `FM-${course.id.toUpperCase()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div className="modal-content certificate-modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        {/* Certificate Paper wrapper */}
        <div className="certificate-paper">
          <div className="certificate-paper-inner">
            {/* Elegant corner designs */}
            <div className="cert-corner cert-corner-tl"></div>
            <div className="cert-corner cert-corner-tr"></div>
            <div className="cert-corner cert-corner-bl"></div>
            <div className="cert-corner cert-corner-br"></div>

            <div className="cert-logo">FutureMinds Academy</div>
            <Award size={36} style={{ color: '#b45309', marginBottom: '1.5rem' }} />

            <div className="cert-title">Certificate of Completion</div>
            <div className="cert-subtitle">This official certificate is proudly presented to</div>

            <div className="cert-recipient-name">{userName}</div>
            <div className="cert-recipient-text">for successfully completing all requirements and assessments for the course</div>

            <div className="cert-course-text">
              <span className="cert-course-name">{course.title}</span>
            </div>

            <div className="cert-date-text">
              Granted on {completionDate} • Authorized by FutureMinds Education Board
            </div>

            <div className="cert-footer-row">
              <div className="cert-signature-block">
                <span className="cert-signature-name">{course.instructor.name}</span>
                <div className="cert-signature-line"></div>
                <span className="cert-signature-title">Lead Instructor</span>
              </div>

              <div className="cert-seal">
                <div className="cert-seal-text cert-seal-text-top">FUTUREMINDS</div>
                <div className="cert-seal-star">★</div>
                <div className="cert-seal-text cert-seal-text-bottom">ACADEMY</div>
              </div>

              <div className="cert-signature-block">
                <span className="cert-signature-name" style={{ fontFamily: 'Georgia, serif' }}>Sophia Carter</span>
                <div className="cert-signature-line"></div>
                <span className="cert-signature-title">Director of Education</span>
              </div>
            </div>

            <div className="cert-id-badge">
              Verification ID: {certId}
            </div>
          </div>
        </div>

        {/* Actions bar */}
        <div className="cert-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handlePrint}>
            <Printer size={16} /> Print Certificate
          </button>
        </div>
      </div>
    </div>
  );
}
