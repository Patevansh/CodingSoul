import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-text">✨ Welcome to the future</span>
        </div>
        
        <h1 className="hero-title">
          <span className="title-main">Beautiful</span>
          <span className="title-gradient">Experiences</span>
          <span className="title-main">Made Simple</span>
        </h1>
        
        <p className="hero-description">
          Crafting digital experiences with modern design, smooth animations, 
          and thoughtful interactions. Every detail matters in creating 
          something truly exceptional.
        </p>
        
        <div className="hero-actions">
          <button className="btn-primary">
            Get Started
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button className="btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
            Watch Demo
          </button>
        </div>
        
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-number">99%</div>
            <div className="stat-label">Satisfaction</div>
          </div>
          <div className="stat">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support</div>
          </div>
          <div className="stat">
            <div className="stat-number">1M+</div>
            <div className="stat-label">Users</div>
          </div>
        </div>
      </div>
      
      <div className="hero-visual">
        <div className="floating-card card-1">
          <div className="card-content">
            <div className="card-icon">🎨</div>
            <div className="card-title">Design</div>
          </div>
        </div>
        <div className="floating-card card-2">
          <div className="card-content">
            <div className="card-icon">⚡</div>
            <div className="card-title">Fast</div>
          </div>
        </div>
        <div className="floating-card card-3">
          <div className="card-content">
            <div className="card-icon">🚀</div>
            <div className="card-title">Modern</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
