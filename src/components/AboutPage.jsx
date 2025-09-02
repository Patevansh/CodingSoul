import React, { useState } from 'react';
import './AboutPage.css';

const AboutPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: '🎯',
      title: 'Interactive Visualizations',
      description: 'Watch algorithms come to life with smooth, real-time animations that help you understand each step of the process.',
      details: [
        'Step-by-step execution control',
        'Custom input arrays',
        'Multiple speed settings',
        'Visual highlighting of operations'
      ]
    },
    {
      icon: '💻',
      title: 'Multi-Language Code',
      description: 'View algorithm implementations in multiple programming languages to understand concepts across different syntaxes.',
      details: [
        'JavaScript implementations',
        'Python code examples',
        'Java solutions',
        'C++ and C# versions'
      ]
    },
    {
      icon: '📊',
      title: 'Complexity Analysis',
      description: 'Understand time and space complexity with detailed explanations and visual comparisons.',
      details: [
        'Big O notation explanations',
        'Performance comparisons',
        'Best and worst case analysis',
        'Memory usage insights'
      ]
    },
    {
      icon: '🎨',
      title: 'Beautiful Design',
      description: 'Modern, responsive interface with smooth animations and multiple theme options for comfortable learning.',
      details: [
        'Multiple color themes',
        'Glass-morphism design',
        'Responsive mobile layout',
        'Smooth transitions'
      ]
    }
  ];

  const team = [
    {
      name: 'Vansh Patel',
      role: 'Lead Developer & Creator',
      description: 'Passionate full-stack developer dedicated to creating educational tools that make learning algorithms and data structures engaging and accessible.',
      avatar: '👨‍💻',
      skills: ['React', 'JavaScript', 'Algorithm Design', 'UI/UX', 'Full Stack Development']
    }
  ];

  const technologies = [
    { name: 'React', icon: '⚛️', description: 'Modern UI framework' },
    { name: 'JavaScript', icon: '🟨', description: 'Core programming language' },
    { name: 'CSS3', icon: '🎨', description: 'Advanced styling and animations' },
    { name: 'Vite', icon: '⚡', description: 'Fast build tool' },
    { name: 'React Router', icon: '🛤️', description: 'Navigation and routing' }
  ];

  const stats = [
    { number: '15+', label: 'Algorithms', icon: '🧠' },
    { number: '10+', label: 'Data Structures', icon: '🏗️' },
    { number: '5', label: 'Programming Languages', icon: '💻' },
    { number: '100%', label: 'Open Source', icon: '🔓' }
  ];

  return (
    <div className="about-page">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="title-icon">ℹ️</span>
            About DSA Visualizer
          </h1>
          <p className="page-description">
            A modern, interactive platform for learning algorithms and data structures through beautiful visualizations
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="mission-section">
          <div className="mission-content">
            <h2 className="section-title">Our Mission</h2>
            <div className="mission-text">
              <p>
                DSA Visualizer was created to make algorithm learning more accessible and engaging. 
                I believe that visual learning is one of the most effective ways to understand 
                complex computer science concepts.
              </p>
              <p>
                This platform combines interactive visualizations with comprehensive explanations 
                to help students, developers, and enthusiasts master algorithms and data structures 
                at their own pace.
              </p>
            </div>
          </div>
          <div className="mission-visual">
            <div className="floating-elements">
              <div className="element element-1">🎯</div>
              <div className="element element-2">💡</div>
              <div className="element element-3">🚀</div>
              <div className="element element-4">⭐</div>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <span className="stat-icon">{stat.icon}</span>
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="features-section">
          <h2 className="section-title">Key Features</h2>
          <div className="features-container">
            <div className="features-list">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`feature-item ${activeFeature === index ? 'active' : ''}`}
                  onClick={() => setActiveFeature(index)}
                >
                  <span className="feature-icon">{feature.icon}</span>
                  <div className="feature-content">
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="feature-details">
              <div className="details-card">
                <span className="details-icon">{features[activeFeature].icon}</span>
                <h3 className="details-title">{features[activeFeature].title}</h3>
                <p className="details-description">{features[activeFeature].description}</p>
                <ul className="details-list">
                  {features[activeFeature].details.map((detail, index) => (
                    <li key={index} className="detail-item">{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="technologies-section">
          <h2 className="section-title">Built With</h2>
          <div className="technologies-grid">
            {technologies.map((tech, index) => (
              <div key={index} className="tech-card">
                <span className="tech-icon">{tech.icon}</span>
                <h3 className="tech-name">{tech.name}</h3>
                <p className="tech-description">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="team-section">
          <h2 className="section-title">About the Developer</h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-avatar">{member.avatar}</div>
                <h3 className="member-name">{member.name}</h3>
                <span className="member-role">{member.role}</span>
                <p className="member-description">{member.description}</p>
                <div className="member-skills">
                  {member.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contribution-section">
          <div className="contribution-content">
            <h2 className="section-title">Contributing</h2>
            <p className="contribution-text">
              DSA Visualizer is open source and I welcome contributions from the community. 
              Whether you're fixing bugs, adding new algorithms, improving documentation, 
              or suggesting features, your help is appreciated!
            </p>
            <div className="contribution-actions">
              <a 
                href="https://github.com/Patevansh/CodingSoul" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contribution-btn primary"
              >
                <span className="btn-icon">🌟</span>
                Star on GitHub
              </a>
              <a 
                href="https://github.com/Patevansh/CodingSoul/fork" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contribution-btn secondary"
              >
                <span className="btn-icon">🤝</span>
                Fork & Contribute
              </a>
              <a 
                href="https://github.com/Patevansh/CodingSoul/issues" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contribution-btn tertiary"
              >
                <span className="btn-icon">🐛</span>
                Report Issues
              </a>
            </div>
          </div>
        </div>

        <div className="contact-section">
          <h2 className="section-title">Get in Touch</h2>
          <div className="contact-content">
            <p className="contact-text">
              Have questions, suggestions, or want to collaborate? I'd love to hear from you!
            </p>
            <div className="contact-links">
              <a href="mailto:Vanshp9824@gmail.com" className="contact-link">
                <span className="contact-icon">📧</span>
                Vanshp9824@gmail.com
              </a>
              <a href="tel:+919054255770" className="contact-link">
                <span className="contact-icon">📱</span>
                +91 9054255770
              </a>
              <a href="https://github.com/Patevansh/CodingSoul" className="contact-link" target="_blank" rel="noopener noreferrer">
                <span className="contact-icon">🐙</span>
                View Project on GitHub
              </a>
              <a href="https://linkedin.com/in/vanshpatel005" className="contact-link" target="_blank" rel="noopener noreferrer">
                <span className="contact-icon">💼</span>
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
