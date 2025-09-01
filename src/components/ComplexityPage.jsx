import React, { useState } from 'react';
import './ComplexityPage.css';

const ComplexityPage = () => {
  const [selectedComplexity, setSelectedComplexity] = useState('time');

  const timeComplexities = [
    {
      notation: 'O(1)',
      name: 'Constant',
      description: 'Execution time remains constant regardless of input size',
      examples: ['Array access by index', 'Hash table lookup', 'Stack push/pop'],
      color: '#10b981',
      icon: '🎯',
      graph: 'flat'
    },
    {
      notation: 'O(log n)',
      name: 'Logarithmic',
      description: 'Execution time grows logarithmically with input size',
      examples: ['Binary search', 'Binary tree operations', 'Heap operations'],
      color: '#06b6d4',
      icon: '📈',
      graph: 'log'
    },
    {
      notation: 'O(n)',
      name: 'Linear',
      description: 'Execution time grows linearly with input size',
      examples: ['Array traversal', 'Linear search', 'Finding min/max'],
      color: '#8b5cf6',
      icon: '📏',
      graph: 'linear'
    },
    {
      notation: 'O(n log n)',
      name: 'Linearithmic',
      description: 'Execution time grows as n multiplied by log n',
      examples: ['Merge sort', 'Quick sort (average)', 'Heap sort'],
      color: '#f59e0b',
      icon: '⚡',
      graph: 'nlogn'
    },
    {
      notation: 'O(n²)',
      name: 'Quadratic',
      description: 'Execution time grows quadratically with input size',
      examples: ['Bubble sort', 'Selection sort', 'Nested loops'],
      color: '#ef4444',
      icon: '🔥',
      graph: 'quadratic'
    },
    {
      notation: 'O(2ⁿ)',
      name: 'Exponential',
      description: 'Execution time doubles with each addition to input',
      examples: ['Recursive Fibonacci', 'Tower of Hanoi', 'Subset generation'],
      color: '#dc2626',
      icon: '💥',
      graph: 'exponential'
    }
  ];

  const spaceComplexities = [
    {
      notation: 'O(1)',
      name: 'Constant Space',
      description: 'Memory usage remains constant regardless of input size',
      examples: ['Simple variables', 'In-place sorting', 'Iterative algorithms'],
      color: '#10b981',
      icon: '💾'
    },
    {
      notation: 'O(log n)',
      name: 'Logarithmic Space',
      description: 'Memory usage grows logarithmically with input size',
      examples: ['Recursive binary search', 'Balanced tree height', 'Divide and conquer'],
      color: '#06b6d4',
      icon: '🗂️'
    },
    {
      notation: 'O(n)',
      name: 'Linear Space',
      description: 'Memory usage grows linearly with input size',
      examples: ['Creating a copy of array', 'Hash table', 'Most recursive algorithms'],
      color: '#8b5cf6',
      icon: '📋'
    },
    {
      notation: 'O(n²)',
      name: 'Quadratic Space',
      description: 'Memory usage grows quadratically with input size',
      examples: ['2D arrays', 'Adjacency matrix', 'Dynamic programming tables'],
      color: '#ef4444',
      icon: '🏢'
    }
  ];

  const bestPractices = [
    {
      title: 'Choose the Right Data Structure',
      description: 'Select data structures based on the operations you need to perform most frequently',
      icon: '🎯',
      tips: [
        'Use arrays for frequent random access',
        'Use linked lists for frequent insertions/deletions',
        'Use hash tables for fast lookups',
        'Use trees for sorted data with fast search'
      ]
    },
    {
      title: 'Avoid Premature Optimization',
      description: 'Write clear, correct code first, then optimize the bottlenecks',
      icon: '⚡',
      tips: [
        'Profile your code to find actual bottlenecks',
        'Optimize the parts that matter most',
        'Consider readability vs performance trade-offs',
        'Test before and after optimization'
      ]
    },
    {
      title: 'Understand Trade-offs',
      description: 'Every algorithm and data structure has trade-offs between time and space',
      icon: '⚖️',
      tips: [
        'Time vs Space complexity',
        'Average vs Worst case performance',
        'Implementation complexity vs performance',
        'Memory usage vs speed'
      ]
    },
    {
      title: 'Big O is About Growth Rate',
      description: 'Focus on how performance scales with larger inputs, not absolute speed',
      icon: '📈',
      tips: [
        'Constants are ignored in Big O',
        'Lower order terms are dropped',
        'Consider the worst-case scenario',
        'Think about very large inputs'
      ]
    }
  ];

  const complexityComparison = {
    small: { size: '10', values: { 1: 1, log: 3, n: 10, nlogn: 33, n2: 100, exp: 1024 } },
    medium: { size: '100', values: { 1: 1, log: 7, n: 100, nlogn: 664, n2: 10000, exp: '1.3×10³⁰' } },
    large: { size: '1000', values: { 1: 1, log: 10, n: 1000, nlogn: 9966, n2: 1000000, exp: '∞' } }
  };

  return (
    <div className="complexity-page">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="title-icon">⏱️</span>
            Algorithm Complexity
          </h1>
          <p className="page-description">
            Understand time and space complexity to write efficient algorithms
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="complexity-toggle">
          <button
            onClick={() => setSelectedComplexity('time')}
            className={`toggle-btn ${selectedComplexity === 'time' ? 'active' : ''}`}
          >
            <span className="toggle-icon">⏱️</span>
            Time Complexity
          </button>
          <button
            onClick={() => setSelectedComplexity('space')}
            className={`toggle-btn ${selectedComplexity === 'space' ? 'active' : ''}`}
          >
            <span className="toggle-icon">💾</span>
            Space Complexity
          </button>
        </div>

        {selectedComplexity === 'time' && (
          <div className="complexities-section">
            <h2 className="section-title">Time Complexity Classes</h2>
            <div className="complexity-grid">
              {timeComplexities.map((complexity, index) => (
                <div key={complexity.notation} className="complexity-card" style={{'--accent-color': complexity.color}}>
                  <div className="card-header">
                    <span className="complexity-icon">{complexity.icon}</span>
                    <div className="complexity-info">
                      <h3 className="complexity-notation">{complexity.notation}</h3>
                      <span className="complexity-name">{complexity.name}</span>
                    </div>
                  </div>
                  
                  <p className="complexity-description">{complexity.description}</p>
                  
                  <div className="examples-section">
                    <h4 className="examples-title">Examples:</h4>
                    <ul className="examples-list">
                      {complexity.examples.map((example, idx) => (
                        <li key={idx} className="example-item">{example}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="complexity-graph">
                    <div className={`graph-line ${complexity.graph}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedComplexity === 'space' && (
          <div className="complexities-section">
            <h2 className="section-title">Space Complexity Classes</h2>
            <div className="space-complexity-grid">
              {spaceComplexities.map((complexity) => (
                <div key={complexity.notation} className="complexity-card" style={{'--accent-color': complexity.color}}>
                  <div className="card-header">
                    <span className="complexity-icon">{complexity.icon}</span>
                    <div className="complexity-info">
                      <h3 className="complexity-notation">{complexity.notation}</h3>
                      <span className="complexity-name">{complexity.name}</span>
                    </div>
                  </div>
                  
                  <p className="complexity-description">{complexity.description}</p>
                  
                  <div className="examples-section">
                    <h4 className="examples-title">Examples:</h4>
                    <ul className="examples-list">
                      {complexity.examples.map((example, idx) => (
                        <li key={idx} className="example-item">{example}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="comparison-section">
          <h2 className="section-title">Complexity Comparison</h2>
          <div className="comparison-table">
            <div className="table-header">
              <div className="header-cell">Input Size</div>
              <div className="header-cell">O(1)</div>
              <div className="header-cell">O(log n)</div>
              <div className="header-cell">O(n)</div>
              <div className="header-cell">O(n log n)</div>
              <div className="header-cell">O(n²)</div>
              <div className="header-cell">O(2ⁿ)</div>
            </div>
            
            {Object.entries(complexityComparison).map(([key, data]) => (
              <div key={key} className="table-row">
                <div className="cell input-size">{data.size}</div>
                <div className="cell excellent">{data.values[1]}</div>
                <div className="cell good">{data.values.log}</div>
                <div className="cell fair">{data.values.n}</div>
                <div className="cell poor">{data.values.nlogn}</div>
                <div className="cell bad">{data.values.n2}</div>
                <div className="cell terrible">{data.values.exp}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="best-practices-section">
          <h2 className="section-title">Best Practices</h2>
          <div className="practices-grid">
            {bestPractices.map((practice, index) => (
              <div key={index} className="practice-card">
                <div className="practice-header">
                  <span className="practice-icon">{practice.icon}</span>
                  <h3 className="practice-title">{practice.title}</h3>
                </div>
                
                <p className="practice-description">{practice.description}</p>
                
                <ul className="tips-list">
                  {practice.tips.map((tip, idx) => (
                    <li key={idx} className="tip-item">{tip}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplexityPage;
