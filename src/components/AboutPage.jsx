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
      name: 'Alex Johnson',
      role: 'Lead Developer',
      description: 'Passionate about algorithms and creating educational tools',
      avatar: '👨‍💻',
      skills: ['React', 'Algorithm Design', 'UI/UX']
    },
    {
      name: 'Sarah Chen',
      role: 'Data Structures Expert',
      description: 'PhD in Computer Science with focus on algorithm optimization',
      avatar: '👩‍🔬',
      skills: ['Data Structures', 'Complexity Analysis', 'Research']
    },
    {
      name: 'Mike Rodriguez',
      role: 'Visual Designer',
      description: 'Creates beautiful and intuitive user experiences',
      avatar: '🎨',
      skills: ['Visual Design', 'Animation', 'User Experience']
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
            About AlgoViz
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
                AlgoViz was created to make algorithm learning more accessible and engaging. 
                We believe that visual learning is one of the most effective ways to understand 
                complex computer science concepts.
              </p>
              <p>
                Our platform combines interactive visualizations with comprehensive explanations 
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
          <h2 className="section-title">Meet the Team</h2>
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
              AlgoViz is open source and we welcome contributions from the community. 
              Whether you're fixing bugs, adding new algorithms, improving documentation, 
              or suggesting features, your help is appreciated!
            </p>
            <div className="contribution-actions">
              <button className="contribution-btn primary">
                <span className="btn-icon">🌟</span>
                Star on GitHub
              </button>
              <button className="contribution-btn secondary">
                <span className="btn-icon">🤝</span>
                Contribute
              </button>
              <button className="contribution-btn tertiary">
                <span className="btn-icon">🐛</span>
                Report Issues
              </button>
            </div>
          </div>
        </div>

        <div className="contact-section">
          <h2 className="section-title">Get in Touch</h2>
          <div className="contact-content">
            <p className="contact-text">
              Have questions, suggestions, or just want to say hello? We'd love to hear from you!
            </p>
            <div className="contact-links">
              <a href="#" className="contact-link">
                <span className="contact-icon">📧</span>
                hello@algoviz.com
              </a>
              <a href="#" className="contact-link">
                <span className="contact-icon">🐦</span>
                @AlgoViz
              </a>
              <a href="#" className="contact-link">
                <span className="contact-icon">💬</span>
                Discord Community
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
