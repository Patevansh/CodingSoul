import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'All', icon: '🎯' },
    { id: 'sorting', name: 'Sorting', icon: '📊' },
    { id: 'searching', name: 'Searching', icon: '🔍' },
    { id: 'data-structures', name: 'Data Structures', icon: '🗂️' },
    { id: 'graph', name: 'Graph', icon: '🕸️' },
    { id: 'dynamic', name: 'Dynamic Programming', icon: '🧮' },
    { id: 'greedy', name: 'Greedy', icon: '💰' },
    { id: 'divide', name: 'Divide & Conquer', icon: '⚔️' },
    { id: 'string', name: 'String', icon: '📝' },
    { id: 'backtracking', name: 'Backtracking', icon: '�' },
    { id: 'tree', name: 'Tree', icon: '�' },
  ];

  const visualizations = [
    // ===== SORTING ALGORITHMS =====
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
      category: 'divide',
      difficulty: 'Medium',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(log n)',
      color: 'var(--color-secondary)',
      route: '/quick-sort',
      implemented: true,
    },
    {
      id: 'merge-sort',
      title: 'Merge Sort',
      description: 'Divide and conquer sorting algorithm',
      category: 'divide',
      difficulty: 'Medium',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      color: '#8b5cf6',
      route: '/merge-sort',
      implemented: true,
    },
    {
      id: 'selection-sort',
      title: 'Selection Sort',
      description: 'Find minimum and place at beginning',
      category: 'sorting',
      difficulty: 'Easy',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      color: '#f59e0b',
      route: '/selection-sort',
      implemented: true,
    },
    {
      id: 'insertion-sort',
      title: 'Insertion Sort',
      description: 'Build sorted array one element at a time',
      category: 'sorting',
      difficulty: 'Easy',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      color: '#06b6d4',
      route: '/insertion-sort',
      implemented: true,
    },
    {
      id: 'heap-sort',
      title: 'Heap Sort',
      description: 'Tree-based sorting using binary heap',
      category: 'sorting',
      difficulty: 'Hard',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      color: '#ef4444',
      route: '/heap-sort',
      implemented: false,
    },

    // ===== SEARCHING ALGORITHMS =====
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
      implemented: true,
    },
    {
      id: 'linear-search',
      title: 'Linear Search',
      description: 'Sequential search through array',
      category: 'searching',
      difficulty: 'Easy',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      color: '#ef4444',
      route: '/linear-search',
      implemented: true,
    },
    {
      id: 'jump-search',
      title: 'Jump Search',
      description: 'Search by jumping through blocks',
      category: 'searching',
      difficulty: 'Medium',
      timeComplexity: 'O(√n)',
      spaceComplexity: 'O(1)',
      color: '#10b981',
      route: '/jump-search',
      implemented: false,
    },

    // ===== DATA STRUCTURES =====
    {
      id: 'stack',
      title: 'Stack',
      description: 'LIFO data structure operations',
      category: 'data-structures',
      difficulty: 'Easy',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(n)',
      color: '#8b5cf6',
      route: '/stack',
      implemented: true,
    },
    {
      id: 'queue',
      title: 'Queue',
      description: 'FIFO data structure operations',
      category: 'data-structures',
      difficulty: 'Easy',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(n)',
      color: '#10b981',
      route: '/queue',
      implemented: true,
    },
    {
      id: 'linked-list',
      title: 'Linked List',
      description: 'Dynamic data structure operations',
      category: 'data-structures',
      difficulty: 'Easy',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      color: '#f59e0b',
      route: '/linked-list',
      implemented: true,
    },
    {
      id: 'binary-tree',
      title: 'Binary Tree',
      description: 'Tree traversal and search operations',
      category: 'tree',
      difficulty: 'Medium',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(h)',
      color: '#06b6d4',
      route: '/binary-tree',
      implemented: true,
    },

    // ===== GRAPH ALGORITHMS =====
    {
      id: 'graph',
      title: 'Graph Visualizer',
      description: 'Interactive graph with nodes and edges',
      category: 'graph',
      difficulty: 'Medium',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      color: '#8b5cf6',
      route: '/graph',
      implemented: true,
    },
    {
      id: 'bfs',
      title: 'Breadth-First Search',
      description: 'Level-by-level graph traversal',
      category: 'graph',
      difficulty: 'Medium',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      color: '#3b82f6',
      route: '/bfs',
      implemented: true,
    },
    {
      id: 'dfs',
      title: 'Depth-First Search',
      description: 'Deep graph traversal using recursion',
      category: 'graph',
      difficulty: 'Medium',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      color: '#6366f1',
      route: '/dfs',
      implemented: true,
    },
    {
      id: 'dijkstra',
      title: 'Dijkstra\'s Algorithm',
      description: 'Find shortest paths in weighted graphs',
      category: 'graph',
      difficulty: 'Hard',
      timeComplexity: 'O((V + E) log V)',
      spaceComplexity: 'O(V)',
      color: 'var(--color-primary)',
      route: '/dijkstra',
      implemented: false,
    },

    // ===== DYNAMIC PROGRAMMING =====
    {
      id: 'fibonacci',
      title: 'Fibonacci Sequence',
      description: 'Classic dynamic programming example',
      category: 'dynamic',
      difficulty: 'Easy',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      color: '#fbbf24',
      route: '/fibonacci',
      implemented: false,
    },
    {
      id: 'knapsack',
      title: '0/1 Knapsack',
      description: 'Optimize item selection with weight constraints',
      category: 'dynamic',
      difficulty: 'Hard',
      timeComplexity: 'O(nW)',
      spaceComplexity: 'O(nW)',
      color: '#34d399',
      route: '/knapsack',
      implemented: false,
    },

    // ===== GREEDY ALGORITHMS =====
    {
      id: 'activity-selection',
      title: 'Activity Selection',
      description: 'Select maximum non-overlapping activities',
      category: 'greedy',
      difficulty: 'Medium',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      color: '#10b981',
      route: '/activity-selection',
      implemented: false,
    },

    // ===== STRING ALGORITHMS =====
    {
      id: 'kmp',
      title: 'KMP Algorithm',
      description: 'Efficient string pattern matching',
      category: 'string',
      difficulty: 'Hard',
      timeComplexity: 'O(n + m)',
      spaceComplexity: 'O(m)',
      color: '#8b5cf6',
      route: '/kmp',
      implemented: false,
    },

    // ===== BACKTRACKING =====
    {
      id: 'n-queens',
      title: 'N-Queens Problem',
      description: 'Place N queens on chessboard without attacks',
      category: 'backtracking',
      difficulty: 'Hard',
      timeComplexity: 'O(N!)',
      spaceComplexity: 'O(N)',
      color: '#ef4444',
      route: '/n-queens',
      implemented: false,
    },

    // ===== TREE ALGORITHMS =====
    {
      id: 'tree-traversal',
      title: 'Tree Traversal',
      description: 'Inorder, Preorder, Postorder traversals',
      category: 'tree',
      difficulty: 'Medium',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      color: '#059669',
      route: '/tree-traversal',
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
