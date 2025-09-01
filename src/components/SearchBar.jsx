import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Enhanced search data with more comprehensive content
  const searchData = [
    // Sorting Algorithms
    { id: 1, title: 'Bubble Sort', category: 'Sorting Algorithm', path: '/bubble-sort', description: 'Simple comparison-based sorting algorithm with O(n²) complexity', tags: ['sorting', 'basic', 'comparison', 'visualization'] },
    { id: 2, title: 'Quick Sort', category: 'Sorting Algorithm', path: '/algorithms', description: 'Efficient divide-and-conquer sorting algorithm with O(n log n) average complexity', tags: ['sorting', 'divide-conquer', 'efficient', 'pivot'] },
    { id: 3, title: 'Merge Sort', category: 'Sorting Algorithm', path: '/algorithms', description: 'Stable divide-and-conquer sorting algorithm with O(n log n) complexity', tags: ['sorting', 'divide-conquer', 'stable', 'merge'] },
    { id: 4, title: 'Heap Sort', category: 'Sorting Algorithm', path: '/algorithms', description: 'Comparison-based sorting using binary heap with O(n log n) complexity', tags: ['sorting', 'heap', 'comparison', 'efficient'] },
    { id: 5, title: 'Insertion Sort', category: 'Sorting Algorithm', path: '/algorithms', description: 'Simple insertion-based sorting algorithm, efficient for small datasets', tags: ['sorting', 'insertion', 'basic', 'small-data'] },
    { id: 6, title: 'Selection Sort', category: 'Sorting Algorithm', path: '/algorithms', description: 'Simple selection-based sorting algorithm with O(n²) complexity', tags: ['sorting', 'selection', 'basic', 'minimum'] },
    
    // Search Algorithms
    { id: 7, title: 'Binary Search', category: 'Search Algorithm', path: '/algorithms', description: 'Efficient search in sorted arrays with O(log n) complexity', tags: ['search', 'binary', 'sorted', 'logarithmic'] },
    { id: 8, title: 'Linear Search', category: 'Search Algorithm', path: '/algorithms', description: 'Sequential search through elements with O(n) complexity', tags: ['search', 'linear', 'sequential', 'basic'] },
    { id: 9, title: 'Depth-First Search (DFS)', category: 'Graph Algorithm', path: '/algorithms', description: 'Graph traversal algorithm that explores as far as possible', tags: ['graph', 'traversal', 'depth', 'recursive'] },
    { id: 10, title: 'Breadth-First Search (BFS)', category: 'Graph Algorithm', path: '/algorithms', description: 'Graph traversal algorithm that explores neighbors first', tags: ['graph', 'traversal', 'breadth', 'queue'] },
    
    // Data Structures
    { id: 11, title: 'Array', category: 'Data Structure', path: '/data-structures', description: 'Linear collection of elements stored in contiguous memory', tags: ['linear', 'indexed', 'contiguous', 'basic'] },
    { id: 12, title: 'Linked List', category: 'Data Structure', path: '/data-structures', description: 'Dynamic linear data structure with nodes containing data and pointers', tags: ['linear', 'dynamic', 'pointer', 'node'] },
    { id: 13, title: 'Stack', category: 'Data Structure', path: '/data-structures', description: 'LIFO (Last In, First Out) data structure', tags: ['linear', 'lifo', 'push', 'pop'] },
    { id: 14, title: 'Queue', category: 'Data Structure', path: '/data-structures', description: 'FIFO (First In, First Out) data structure', tags: ['linear', 'fifo', 'enqueue', 'dequeue'] },
    { id: 15, title: 'Binary Tree', category: 'Data Structure', path: '/data-structures', description: 'Hierarchical tree data structure with at most two children per node', tags: ['tree', 'hierarchical', 'binary', 'nodes'] },
    { id: 16, title: 'Hash Table', category: 'Data Structure', path: '/data-structures', description: 'Key-value pair data structure with O(1) average lookup', tags: ['hash', 'key-value', 'lookup', 'collision'] },
    { id: 17, title: 'Graph', category: 'Data Structure', path: '/data-structures', description: 'Network of connected nodes (vertices) and edges', tags: ['graph', 'vertices', 'edges', 'network'] },
    { id: 18, title: 'Heap', category: 'Data Structure', path: '/data-structures', description: 'Complete binary tree with heap property', tags: ['tree', 'complete', 'priority', 'heap-property'] },
    
    // Pages
    { id: 19, title: 'Algorithms', category: 'Page', path: '/algorithms', description: 'Explore and learn various algorithms with interactive examples', tags: ['algorithms', 'learning', 'interactive'] },
    { id: 20, title: 'Data Structures', category: 'Page', path: '/data-structures', description: 'Discover different data structures and their implementations', tags: ['data-structures', 'implementation', 'theory'] },
    { id: 21, title: 'Complexity Analysis', category: 'Page', path: '/complexity', description: 'Understand time and space complexity of algorithms', tags: ['complexity', 'big-o', 'analysis', 'performance'] },
    { id: 22, title: 'About', category: 'Page', path: '/about', description: 'Learn about DSA Visualizer and its features', tags: ['about', 'info', 'features'] },
    { id: 23, title: 'Settings', category: 'Page', path: '/settings', description: 'Customize your learning experience and preferences', tags: ['settings', 'preferences', 'customization'] },
    { id: 24, title: 'Dashboard', category: 'Page', path: '/', description: 'Main dashboard with overview and quick access', tags: ['dashboard', 'overview', 'home'] },
    
    // Complexity Concepts
    { id: 25, title: 'Big O Notation', category: 'Complexity', path: '/complexity', description: 'Mathematical notation for algorithm complexity analysis', tags: ['big-o', 'notation', 'asymptotic', 'analysis'] },
    { id: 26, title: 'Time Complexity', category: 'Complexity', path: '/complexity', description: 'Measure of computational time required by an algorithm', tags: ['time', 'computational', 'efficiency', 'runtime'] },
    { id: 27, title: 'Space Complexity', category: 'Complexity', path: '/complexity', description: 'Measure of memory space required by an algorithm', tags: ['space', 'memory', 'storage', 'auxiliary'] },
    { id: 28, title: 'O(1) - Constant Time', category: 'Complexity', path: '/complexity', description: 'Algorithm execution time remains constant regardless of input size', tags: ['constant', 'o1', 'optimal', 'fast'] },
    { id: 29, title: 'O(log n) - Logarithmic Time', category: 'Complexity', path: '/complexity', description: 'Algorithm execution time grows logarithmically with input size', tags: ['logarithmic', 'log', 'efficient', 'divide'] },
    { id: 30, title: 'O(n) - Linear Time', category: 'Complexity', path: '/complexity', description: 'Algorithm execution time grows linearly with input size', tags: ['linear', 'proportional', 'single-pass'] },
    { id: 31, title: 'O(n log n) - Linearithmic Time', category: 'Complexity', path: '/complexity', description: 'Common complexity for efficient sorting algorithms', tags: ['linearithmic', 'sorting', 'divide-conquer'] },
    { id: 32, title: 'O(n²) - Quadratic Time', category: 'Complexity', path: '/complexity', description: 'Algorithm execution time grows quadratically with input size', tags: ['quadratic', 'nested-loops', 'slow', 'comparison'] },
  ];

  // Advanced filtering with fuzzy search and ranking
  useEffect(() => {
    if (query.trim() === '') {
      setFilteredResults([]);
      setIsOpen(false);
      return;
    }

    const searchTerm = query.toLowerCase();
    const results = searchData
      .map(item => {
        let score = 0;
        const titleLower = item.title.toLowerCase();
        const descriptionLower = item.description.toLowerCase();
        const categoryLower = item.category.toLowerCase();
        const tagsLower = item.tags.join(' ').toLowerCase();

        // Exact title match gets highest score
        if (titleLower === searchTerm) score += 100;
        else if (titleLower.startsWith(searchTerm)) score += 80;
        else if (titleLower.includes(searchTerm)) score += 60;

        // Category match
        if (categoryLower.includes(searchTerm)) score += 40;

        // Description match
        if (descriptionLower.includes(searchTerm)) score += 30;

        // Tags match
        if (tagsLower.includes(searchTerm)) score += 20;

        // Fuzzy matching for typos
        const words = searchTerm.split(' ');
        words.forEach(word => {
          if (word.length > 2) {
            const regex = new RegExp(word.split('').join('.*'), 'i');
            if (regex.test(titleLower)) score += 10;
            if (regex.test(descriptionLower)) score += 5;
          }
        });

        return { ...item, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);

    setFilteredResults(results);
    setIsOpen(results.length > 0);
    setSelectedIndex(-1);
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleResultClick(filteredResults[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        searchRef.current?.blur();
        break;
    }
  };

  // Handle result click
  const handleResultClick = (result) => {
    navigate(result.path);
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    searchRef.current?.blur();
  };

  // Handle input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle input focus
  const handleFocus = () => {
    if (filteredResults.length > 0) {
      setIsOpen(true);
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Sorting Algorithm':
      case 'Search Algorithm':
      case 'Graph Algorithm':
        return '🔧';
      case 'Data Structure':
        return '📊';
      case 'Page':
        return '📄';
      case 'Complexity':
        return '⚡';
      default:
        return '🔍';
    }
  };

  // Get category color
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Sorting Algorithm':
        return '#10b981';
      case 'Search Algorithm':
        return '#3b82f6';
      case 'Graph Algorithm':
        return '#8b5cf6';
      case 'Data Structure':
        return '#f59e0b';
      case 'Page':
        return '#6b7280';
      case 'Complexity':
        return '#ef4444';
      default:
        return '#6366f1';
    }
  };

  return (
    <div className="search-bar" ref={searchRef}>
      <div className="search-input-container">
        <div className="search-icon">
          <i className="fas fa-search"></i>
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="Search algorithms, data structures..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
        />
        {query && (
          <button 
            className="search-clear"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              setSelectedIndex(-1);
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>

      {isOpen && filteredResults.length > 0 && (
        <div className="search-results">
          <div className="search-results-header">
            <span className="search-results-count">
              {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="search-results-list">
            {filteredResults.map((result, index) => (
              <div
                key={result.id}
                className={`search-result-item ${selectedIndex === index ? 'selected' : ''}`}
                onClick={() => handleResultClick(result)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="search-result-icon">
                  <span 
                    className="category-badge"
                    style={{ backgroundColor: getCategoryColor(result.category) }}
                  >
                    {getCategoryIcon(result.category)}
                  </span>
                </div>
                <div className="search-result-content">
                  <div className="search-result-title">
                    {result.title}
                  </div>
                  <div className="search-result-meta">
                    <span className="search-result-category">
                      {result.category}
                    </span>
                    <span className="search-result-description">
                      {result.description}
                    </span>
                  </div>
                </div>
                <div className="search-result-arrow">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            ))}
          </div>
          <div className="search-results-footer">
            <span className="search-keyboard-hint">
              Use <kbd>↑</kbd> <kbd>↓</kbd> to navigate, <kbd>Enter</kbd> to select, <kbd>Esc</kbd> to close
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;