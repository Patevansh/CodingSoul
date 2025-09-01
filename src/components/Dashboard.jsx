import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'All', icon: '🎯' },
    { id: 'algorithms', name: 'Algorithms', icon: '⚡' },
    { id: 'data-structures', name: 'Data Structures', icon: '🗂️' },
    { id: 'sorting', name: 'Sorting', icon: '📊' },
    { id: 'searching', name: 'Searching', icon: '🔍' },
    { id: 'trees', name: 'Trees', icon: '🌳' },
    { id: 'graphs', name: 'Graphs', icon: '🕸️' },
    { id: 'oop', name: 'OOP Concepts', icon: '🏗️' },
  ];

  const visualizations = [
    {
      id: 'bubble-sort',
      title: 'Bubble Sort',
      description: 'Visualize how bubble sort compares and swaps elements',
      category: 'sorting',
      difficulty: 'Easy',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      color: 'var(--color-primary)',
      route: '/bubble-sort',
      implemented: true,
    },
    {
      id: 'quick-sort',
      title: 'Quick Sort',
      description: 'See the divide-and-conquer approach in action',
      category: 'sorting',
      difficulty: 'Medium',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(log n)',
      color: 'var(--color-secondary)',
      route: '/quick-sort',
      implemented: false,
    },
    {
      id: 'binary-search',
      title: 'Binary Search',
      description: 'Search efficiently in sorted arrays',
      category: 'searching',
      difficulty: 'Easy',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      color: 'var(--color-accent)',
      route: '/binary-search',
      implemented: false,
    },
    {
      id: 'binary-tree',
      title: 'Binary Tree',
      description: 'Explore tree traversal algorithms',
      category: 'trees',
      difficulty: 'Medium',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      color: 'var(--color-success)',
      route: '/binary-tree',
      implemented: false,
    },
    {
      id: 'linked-list',
      title: 'Linked List',
      description: 'Dynamic data structure operations',
      category: 'data-structures',
      difficulty: 'Easy',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      color: 'var(--color-warning)',
      route: '/linked-list',
      implemented: false,
    },
    {
      id: 'stack-queue',
      title: 'Stack & Queue',
      description: 'LIFO and FIFO data structures',
      category: 'data-structures',
      difficulty: 'Easy',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(n)',
      color: 'var(--color-error)',
      route: '/stack-queue',
      implemented: false,
    },
    {
      id: 'dijkstra',
      title: 'Dijkstra\'s Algorithm',
      description: 'Find shortest paths in weighted graphs',
      category: 'graphs',
      difficulty: 'Hard',
      timeComplexity: 'O((V + E) log V)',
      spaceComplexity: 'O(V)',
      color: 'var(--color-primary)',
      route: '/dijkstra',
      implemented: false,
    },
    {
      id: 'inheritance',
      title: 'Inheritance',
      description: 'Object-oriented inheritance concepts',
      category: 'oop',
      difficulty: 'Medium',
      timeComplexity: 'N/A',
      spaceComplexity: 'N/A',
      color: 'var(--color-secondary)',
      route: '/inheritance',
      implemented: false,
    }
  ];

  const filteredVisualizations = selectedCategory === 'all' 
    ? visualizations 
    : visualizations.filter(viz => viz.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'var(--color-success)';
      case 'Medium': return 'var(--color-warning)';
      case 'Hard': return 'var(--color-error)';
      default: return 'var(--color-text-muted)';
    }
  };

  const handleVisualizationClick = (viz) => {
    if (viz.implemented) {
      navigate(viz.route);
    } else {
      alert(`${viz.title} visualization is coming soon!`);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Algorithm Visualizer</h1>
        <p>Interactive learning for Data Structures, Algorithms, and OOP Concepts</p>
      </div>

      <div className="dashboard-categories">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </button>
        ))}
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{filteredVisualizations.length}</div>
          <div className="stat-label">Available Visualizations</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{categories.length - 1}</div>
          <div className="stat-label">Categories</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">Interactive</div>
          <div className="stat-label">Learning Experience</div>
        </div>
      </div>

      <div className="dashboard-grid">
        {filteredVisualizations.map(viz => (
          <div key={viz.id} className={`visualization-card ${!viz.implemented ? 'coming-soon' : ''}`} style={{ '--card-color': viz.color }}>
            <div className="card-header">
              <h3 className="card-title">{viz.title}</h3>
              <div className="card-badges">
                <span 
                  className="difficulty-badge" 
                  style={{ color: getDifficultyColor(viz.difficulty) }}
                >
                  {viz.difficulty}
                </span>
                {!viz.implemented && (
                  <span className="coming-soon-badge">
                    Coming Soon
                  </span>
                )}
              </div>
            </div>
            
            <p className="card-description">{viz.description}</p>
            
            <div className="card-complexity">
              <div className="complexity-item">
                <span className="complexity-label">Time:</span>
                <span className="complexity-value">{viz.timeComplexity}</span>
              </div>
              <div className="complexity-item">
                <span className="complexity-label">Space:</span>
                <span className="complexity-value">{viz.spaceComplexity}</span>
              </div>
            </div>
            
            <button 
              className={`card-action ${!viz.implemented ? 'disabled' : ''}`}
              onClick={() => handleVisualizationClick(viz)}
              disabled={!viz.implemented}
            >
              {viz.implemented ? 'Start Visualization' : 'Coming Soon'}
              {viz.implemented && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
