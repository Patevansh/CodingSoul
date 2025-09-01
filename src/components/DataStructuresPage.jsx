import React, { useState } from 'react';
import './DataStructuresPage.css';

const DataStructuresPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Structures', icon: '📚' },
    { id: 'linear', name: 'Linear', icon: '📏' },
    { id: 'non-linear', name: 'Non-Linear', icon: '🌳' },
    { id: 'hash', name: 'Hash-based', icon: '#️⃣' },
    { id: 'advanced', name: 'Advanced', icon: '🚀' },
  ];

  const dataStructures = [
    {
      id: 'array',
      name: 'Array',
      category: 'linear',
      difficulty: 'Easy',
      description: 'A collection of elements stored at contiguous memory locations. Provides constant-time access to elements by index.',
      operations: {
        access: 'O(1)',
        search: 'O(n)',
        insertion: 'O(n)',
        deletion: 'O(n)'
      },
      pros: ['Fast random access', 'Memory efficient', 'Cache friendly'],
      cons: ['Fixed size', 'Expensive insertions/deletions'],
      useCases: ['When you need fast access by index', 'Mathematical computations', 'Implementing other data structures'],
      icon: '🔢',
      implemented: false
    },
    {
      id: 'linked-list',
      name: 'Linked List',
      category: 'linear',
      difficulty: 'Easy',
      description: 'A linear collection of data elements where each element points to the next. Allows dynamic memory allocation.',
      operations: {
        access: 'O(n)',
        search: 'O(n)',
        insertion: 'O(1)',
        deletion: 'O(1)'
      },
      pros: ['Dynamic size', 'Efficient insertion/deletion', 'Memory efficient'],
      cons: ['No random access', 'Extra memory for pointers', 'Not cache friendly'],
      useCases: ['When size varies significantly', 'Frequent insertions/deletions', 'Implementing stacks/queues'],
      icon: '🔗',
      implemented: false
    },
    {
      id: 'stack',
      name: 'Stack',
      category: 'linear',
      difficulty: 'Easy',
      description: 'A LIFO (Last In, First Out) data structure where elements are added and removed from the same end.',
      operations: {
        push: 'O(1)',
        pop: 'O(1)',
        peek: 'O(1)',
        search: 'O(n)'
      },
      pros: ['Simple implementation', 'Fast operations', 'Memory efficient'],
      cons: ['Limited access pattern', 'No random access'],
      useCases: ['Function call management', 'Expression evaluation', 'Undo operations', 'Backtracking algorithms'],
      icon: '📚',
      implemented: false
    },
    {
      id: 'queue',
      name: 'Queue',
      category: 'linear',
      difficulty: 'Easy',
      description: 'A FIFO (First In, First Out) data structure where elements are added at one end and removed from the other.',
      operations: {
        enqueue: 'O(1)',
        dequeue: 'O(1)',
        front: 'O(1)',
        search: 'O(n)'
      },
      pros: ['Fair scheduling', 'Simple implementation', 'Fast operations'],
      cons: ['Limited access pattern', 'No random access'],
      useCases: ['Process scheduling', 'Breadth-first search', 'Buffer for data streams'],
      icon: '🚶‍♂️',
      implemented: false
    },
    {
      id: 'binary-tree',
      name: 'Binary Tree',
      category: 'non-linear',
      difficulty: 'Medium',
      description: 'A hierarchical data structure where each node has at most two children, referred to as left and right child.',
      operations: {
        search: 'O(n)',
        insertion: 'O(n)',
        deletion: 'O(n)',
        traversal: 'O(n)'
      },
      pros: ['Hierarchical organization', 'Efficient searching (if balanced)', 'Natural recursion'],
      cons: ['Can become unbalanced', 'Complex implementation'],
      useCases: ['File systems', 'Expression parsing', 'Decision trees'],
      icon: '🌳',
      implemented: false
    },
    {
      id: 'bst',
      name: 'Binary Search Tree',
      category: 'non-linear',
      difficulty: 'Medium',
      description: 'A binary tree where left subtree contains nodes with values less than parent, and right subtree contains greater values.',
      operations: {
        search: 'O(log n)',
        insertion: 'O(log n)',
        deletion: 'O(log n)',
        traversal: 'O(n)'
      },
      pros: ['Efficient searching', 'Sorted traversal', 'Dynamic size'],
      cons: ['Can become unbalanced', 'Worst case O(n) operations'],
      useCases: ['Maintaining sorted data', 'Range queries', 'Database indexing'],
      icon: '🎯',
      implemented: false
    },
    {
      id: 'hash-table',
      name: 'Hash Table',
      category: 'hash',
      difficulty: 'Medium',
      description: 'A data structure that maps keys to values using a hash function for fast access.',
      operations: {
        search: 'O(1) avg',
        insertion: 'O(1) avg',
        deletion: 'O(1) avg',
        'worst case': 'O(n)'
      },
      pros: ['Very fast average operations', 'Flexible keys', 'Constant time complexity'],
      cons: ['Hash collisions', 'Memory overhead', 'No ordering'],
      useCases: ['Caching', 'Database indexing', 'Symbol tables', 'Dictionaries'],
      icon: '#️⃣',
      implemented: false
    },
    {
      id: 'heap',
      name: 'Heap',
      category: 'non-linear',
      difficulty: 'Medium',
      description: 'A complete binary tree where parent nodes are either greater (max-heap) or smaller (min-heap) than their children.',
      operations: {
        'find-max/min': 'O(1)',
        insertion: 'O(log n)',
        deletion: 'O(log n)',
        'build-heap': 'O(n)'
      },
      pros: ['Efficient priority operations', 'Guaranteed worst-case performance', 'In-place sorting'],
      cons: ['No efficient searching', 'Complex implementation'],
      useCases: ['Priority queues', 'Heap sort', 'Graph algorithms (Dijkstra)', 'Job scheduling'],
      icon: '⛰️',
      implemented: false
    },
    {
      id: 'graph',
      name: 'Graph',
      category: 'non-linear',
      difficulty: 'Hard',
      description: 'A collection of vertices (nodes) connected by edges, representing relationships between entities.',
      operations: {
        'add vertex': 'O(1)',
        'add edge': 'O(1)',
        'search (BFS/DFS)': 'O(V + E)',
        'shortest path': 'O(V²) or O(E log V)'
      },
      pros: ['Models complex relationships', 'Flexible structure', 'Many algorithms available'],
      cons: ['Complex implementation', 'Memory intensive', 'Difficult to visualize'],
      useCases: ['Social networks', 'Maps and navigation', 'Network topology', 'Dependency resolution'],
      icon: '🕸️',
      implemented: false
    },
    {
      id: 'trie',
      name: 'Trie (Prefix Tree)',
      category: 'advanced',
      difficulty: 'Hard',
      description: 'A tree-like data structure used to store strings where each path represents a word or prefix.',
      operations: {
        search: 'O(m)',
        insertion: 'O(m)',
        deletion: 'O(m)',
        'prefix search': 'O(p)'
      },
      pros: ['Efficient prefix operations', 'Space efficient for common prefixes', 'Fast word lookup'],
      cons: ['Memory intensive', 'Complex implementation', 'Limited to strings'],
      useCases: ['Autocomplete', 'Spell checkers', 'IP routing', 'Dictionary implementation'],
      icon: '🌿',
      implemented: false
    }
  ];

  const filteredStructures = selectedCategory === 'all' 
    ? dataStructures 
    : dataStructures.filter(ds => ds.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#10b981';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="data-structures-page">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="title-icon">🏗️</span>
            Data Structures
          </h1>
          <p className="page-description">
            Learn about fundamental data structures and their operations, complexities, and use cases
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="category-filter">
          <h3 className="filter-title">Categories</h3>
          <div className="category-grid">
            {categories.map(category => (
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

        <div className="structures-grid">
          {filteredStructures.map(structure => (
            <div key={structure.id} className="structure-card">
              <div className="card-header">
                <span className="structure-icon">{structure.icon}</span>
                <div className="structure-meta">
                  <h3 className="structure-name">{structure.name}</h3>
                  <span 
                    className="difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(structure.difficulty) }}
                  >
                    {structure.difficulty}
                  </span>
                </div>
                <div className="status-badge coming-soon-badge">
                  🚧 Coming Soon
                </div>
              </div>

              <p className="structure-description">{structure.description}</p>

              <div className="operations-section">
                <h4 className="section-title">Time Complexities</h4>
                <div className="operations-grid">
                  {Object.entries(structure.operations).map(([operation, complexity]) => (
                    <div key={operation} className="operation-item">
                      <span className="operation-name">{operation}</span>
                      <span className="operation-complexity">{complexity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pros-cons-section">
                <div className="pros-section">
                  <h4 className="section-title pros-title">✅ Pros</h4>
                  <ul className="pros-list">
                    {structure.pros.map((pro, index) => (
                      <li key={index} className="pro-item">{pro}</li>
                    ))}
                  </ul>
                </div>
                <div className="cons-section">
                  <h4 className="section-title cons-title">❌ Cons</h4>
                  <ul className="cons-list">
                    {structure.cons.map((con, index) => (
                      <li key={index} className="con-item">{con}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="use-cases-section">
                <h4 className="section-title">💡 Common Use Cases</h4>
                <ul className="use-cases-list">
                  {structure.useCases.map((useCase, index) => (
                    <li key={index} className="use-case-item">{useCase}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataStructuresPage;
