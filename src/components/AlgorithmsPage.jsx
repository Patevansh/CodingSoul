import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AlgorithmsPage.css';

const AlgorithmsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const algorithmCategories = [
    { id: 'all', name: 'All Algorithms', icon: '🔍' },
    { id: 'sorting', name: 'Sorting', icon: '📊' },
    { id: 'searching', name: 'Searching', icon: '🎯' },
    { id: 'graph', name: 'Graph', icon: '🕸️' },
    { id: 'dynamic', name: 'Dynamic Programming', icon: '🧮' },
    { id: 'greedy', name: 'Greedy', icon: '💰' },
    { id: 'divide', name: 'Divide & Conquer', icon: '⚔️' },
  ];

  const algorithms = [
    {
      id: 'bubble-sort',
      name: 'Bubble Sort',
      category: 'sorting',
      difficulty: 'Easy',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
      implemented: true,
      icon: '🫧'
    },
    {
      id: 'quick-sort',
      name: 'Quick Sort',
      category: 'sorting',
      difficulty: 'Medium',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(log n)',
      description: 'An efficient divide-and-conquer algorithm that works by selecting a pivot element and partitioning the array around it.',
      implemented: false,
      icon: '⚡'
    },
    {
      id: 'merge-sort',
      name: 'Merge Sort',
      category: 'sorting',
      difficulty: 'Medium',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      description: 'A stable divide-and-conquer algorithm that divides the array into halves and merges them in sorted order.',
      implemented: false,
      icon: '🔀'
    },
    {
      id: 'binary-search',
      name: 'Binary Search',
      category: 'searching',
      difficulty: 'Easy',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      description: 'An efficient algorithm for finding an item from a sorted list by repeatedly dividing the search interval in half.',
      implemented: false,
      icon: '🎯'
    },
    {
      id: 'linear-search',
      name: 'Linear Search',
      category: 'searching',
      difficulty: 'Easy',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      description: 'A simple search algorithm that finds a target value by checking each element sequentially.',
      implemented: false,
      icon: '🔍'
    },
    {
      id: 'dijkstra',
      name: "Dijkstra's Algorithm",
      category: 'graph',
      difficulty: 'Hard',
      timeComplexity: 'O((V + E) log V)',
      spaceComplexity: 'O(V)',
      description: 'Finds the shortest path between nodes in a weighted graph with non-negative edge weights.',
      implemented: false,
      icon: '🗺️'
    },
    {
      id: 'bfs',
      name: 'Breadth-First Search',
      category: 'graph',
      difficulty: 'Medium',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      description: 'Explores nodes level by level, visiting all neighbors before moving to the next level.',
      implemented: false,
      icon: '🌊'
    },
    {
      id: 'dfs',
      name: 'Depth-First Search',
      category: 'graph',
      difficulty: 'Medium',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      description: 'Explores as far as possible along each branch before backtracking.',
      implemented: false,
      icon: '🏔️'
    },
    {
      id: 'fibonacci',
      name: 'Fibonacci Sequence',
      category: 'dynamic',
      difficulty: 'Easy',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      description: 'Computes Fibonacci numbers using dynamic programming to avoid redundant calculations.',
      implemented: false,
      icon: '🌀'
    },
    {
      id: 'knapsack',
      name: '0/1 Knapsack',
      category: 'dynamic',
      difficulty: 'Hard',
      timeComplexity: 'O(nW)',
      spaceComplexity: 'O(nW)',
      description: 'Finds the optimal way to pack items with given weights and values into a knapsack.',
      implemented: false,
      icon: '🎒'
    }
  ];

  const filteredAlgorithms = selectedCategory === 'all' 
    ? algorithms 
    : algorithms.filter(algo => algo.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#10b981';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const handleAlgorithmClick = (algorithm) => {
    if (algorithm.implemented) {
      navigate(`/${algorithm.id}`);
    }
  };

  return (
    <div className="algorithms-page">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="title-icon">🧠</span>
            Algorithms
          </h1>
          <p className="page-description">
            Explore and visualize various algorithms with interactive demonstrations
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="category-filter">
          <h3 className="filter-title">Categories</h3>
          <div className="category-grid">
            {algorithmCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="algorithms-grid">
          {filteredAlgorithms.map(algorithm => (
            <div
              key={algorithm.id}
              className={`algorithm-card ${algorithm.implemented ? 'implemented' : 'coming-soon'}`}
              onClick={() => handleAlgorithmClick(algorithm)}
            >
              <div className="card-header">
                <span className="algorithm-icon">{algorithm.icon}</span>
                <div className="algorithm-meta">
                  <h3 className="algorithm-name">{algorithm.name}</h3>
                  <span 
                    className="difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(algorithm.difficulty) }}
                  >
                    {algorithm.difficulty}
                  </span>
                </div>
                {algorithm.implemented && (
                  <div className="status-badge implemented-badge">
                    ✓ Available
                  </div>
                )}
                {!algorithm.implemented && (
                  <div className="status-badge coming-soon-badge">
                    🚧 Coming Soon
                  </div>
                )}
              </div>

              <p className="algorithm-description">{algorithm.description}</p>

              <div className="complexity-info">
                <div className="complexity-item">
                  <span className="complexity-label">Time:</span>
                  <span className="complexity-value">{algorithm.timeComplexity}</span>
                </div>
                <div className="complexity-item">
                  <span className="complexity-label">Space:</span>
                  <span className="complexity-value">{algorithm.spaceComplexity}</span>
                </div>
              </div>

              {algorithm.implemented && (
                <div className="card-footer">
                  <button className="try-button">
                    <span className="button-icon">🚀</span>
                    Try It Now
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlgorithmsPage;
