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
    { id: 'string', name: 'String', icon: '📝' },
    { id: 'backtracking', name: 'Backtracking', icon: '🔄' },
    { id: 'tree', name: 'Tree', icon: '🌳' },
  ];

  const algorithms = [
    // ===== SORTING ALGORITHMS =====
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
      category: 'divide',
      difficulty: 'Medium',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(log n)',
      description: 'An efficient divide-and-conquer algorithm that works by selecting a pivot element and partitioning the array around it.',
      implemented: true,
      icon: '⚡'
    },
    {
      id: 'merge-sort',
      name: 'Merge Sort',
      category: 'divide',
      difficulty: 'Medium',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      description: 'A stable divide-and-conquer algorithm that divides the array into halves and merges them in sorted order.',
      implemented: true,
      icon: '🔀'
    },
    {
      id: 'selection-sort',
      name: 'Selection Sort',
      category: 'sorting',
      difficulty: 'Easy',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      description: 'A simple sorting algorithm that finds the minimum element and places it at the beginning, repeating for the rest.',
      implemented: true,
      icon: '🎯'
    },
    {
      id: 'insertion-sort',
      name: 'Insertion Sort',
      category: 'sorting',
      difficulty: 'Easy',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      description: 'A simple sorting algorithm that builds the final sorted array one element at a time, like sorting playing cards.',
      implemented: true,
      icon: '📋'
    },
    {
      id: 'heap-sort',
      name: 'Heap Sort',
      category: 'sorting',
      difficulty: 'Hard',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      description: 'A comparison-based sorting algorithm that uses a binary heap data structure to sort elements.',
      implemented: false,
      icon: '⛰️'
    },
    {
      id: 'radix-sort',
      name: 'Radix Sort',
      category: 'sorting',
      difficulty: 'Medium',
      timeComplexity: 'O(d × n)',
      spaceComplexity: 'O(n + k)',
      description: 'A non-comparative sorting algorithm that sorts integers by processing digits from least to most significant.',
      implemented: false,
      icon: '🔢'
    },
    {
      id: 'counting-sort',
      name: 'Counting Sort',
      category: 'sorting',
      difficulty: 'Medium',
      timeComplexity: 'O(n + k)',
      spaceComplexity: 'O(k)',
      description: 'A non-comparative sorting algorithm that counts occurrences of each element and uses arithmetic to determine positions.',
      implemented: false,
      icon: '🧮'
    },
    {
      id: 'bucket-sort',
      name: 'Bucket Sort',
      category: 'sorting',
      difficulty: 'Medium',
      timeComplexity: 'O(n + k)',
      spaceComplexity: 'O(n)',
      description: 'A sorting algorithm that distributes elements into buckets and sorts each bucket individually.',
      implemented: false,
      icon: '🪣'
    },
    {
      id: 'shell-sort',
      name: 'Shell Sort',
      category: 'sorting',
      difficulty: 'Medium',
      timeComplexity: 'O(n^1.5)',
      spaceComplexity: 'O(1)',
      description: 'An in-place comparison sort that generalizes insertion sort by allowing exchanges of items that are far apart.',
      implemented: false,
      icon: '🐚'
    },

    // ===== SEARCHING ALGORITHMS =====
    {
      id: 'binary-search',
      name: 'Binary Search',
      category: 'searching',
      difficulty: 'Easy',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      description: 'An efficient algorithm for finding an item from a sorted list by repeatedly dividing the search interval in half.',
      implemented: true,
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
      implemented: true,
      icon: '🔍'
    },
    {
      id: 'jump-search',
      name: 'Jump Search',
      category: 'searching',
      difficulty: 'Medium',
      timeComplexity: 'O(√n)',
      spaceComplexity: 'O(1)',
      description: 'A searching algorithm that jumps ahead by fixed steps and then performs linear search within the block.',
      implemented: false,
      icon: '🦘'
    },
    {
      id: 'interpolation-search',
      name: 'Interpolation Search',
      category: 'searching',
      difficulty: 'Medium',
      timeComplexity: 'O(log log n)',
      spaceComplexity: 'O(1)',
      description: 'An improved binary search for uniformly distributed data that estimates the position of the target.',
      implemented: false,
      icon: '📐'
    },
    {
      id: 'exponential-search',
      name: 'Exponential Search',
      category: 'searching',
      difficulty: 'Medium',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      description: 'A searching algorithm that finds the range containing the target and then performs binary search.',
      implemented: false,
      icon: '📈'
    },
    {
      id: 'ternary-search',
      name: 'Ternary Search',
      category: 'searching',
      difficulty: 'Medium',
      timeComplexity: 'O(log₃ n)',
      spaceComplexity: 'O(1)',
      description: 'A divide-and-conquer search algorithm that divides the array into three parts instead of two.',
      implemented: false,
      icon: '🔱'
    },

    // ===== GRAPH ALGORITHMS =====
    {
      id: 'bfs',
      name: 'Breadth-First Search',
      category: 'graph',
      difficulty: 'Medium',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      description: 'Explores nodes level by level, visiting all neighbors before moving to the next level.',
      implemented: true,
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
      implemented: true,
      icon: '🏔️'
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
      id: 'bellman-ford',
      name: 'Bellman-Ford Algorithm',
      category: 'graph',
      difficulty: 'Hard',
      timeComplexity: 'O(VE)',
      spaceComplexity: 'O(V)',
      description: 'Finds shortest paths from a source vertex to all other vertices, can handle negative weights.',
      implemented: false,
      icon: '🛣️'
    },
    {
      id: 'floyd-warshall',
      name: 'Floyd-Warshall Algorithm',
      category: 'dynamic',
      difficulty: 'Hard',
      timeComplexity: 'O(V³)',
      spaceComplexity: 'O(V²)',
      description: 'Finds shortest paths between all pairs of vertices in a weighted graph.',
      implemented: false,
      icon: '🗺️'
    },
    {
      id: 'kruskal',
      name: "Kruskal's MST",
      category: 'greedy',
      difficulty: 'Hard',
      timeComplexity: 'O(E log E)',
      spaceComplexity: 'O(V)',
      description: 'Finds the minimum spanning tree of a graph using a greedy approach with edge sorting.',
      implemented: false,
      icon: '🌲'
    },
    {
      id: 'prim',
      name: "Prim's MST",
      category: 'greedy',
      difficulty: 'Hard',
      timeComplexity: 'O(E log V)',
      spaceComplexity: 'O(V)',
      description: 'Finds the minimum spanning tree of a graph by growing the tree one vertex at a time.',
      implemented: false,
      icon: '🌿'
    },
    {
      id: 'topological-sort',
      name: 'Topological Sort',
      category: 'graph',
      difficulty: 'Medium',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      description: 'Linear ordering of vertices in a directed acyclic graph where every directed edge goes from earlier to later.',
      implemented: false,
      icon: '📊'
    },

    // ===== DYNAMIC PROGRAMMING =====
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
    },
    {
      id: 'lcs',
      name: 'Longest Common Subsequence',
      category: 'dynamic',
      difficulty: 'Medium',
      timeComplexity: 'O(mn)',
      spaceComplexity: 'O(mn)',
      description: 'Finds the longest subsequence common to two sequences without requiring consecutive elements.',
      implemented: false,
      icon: '🔗'
    },
    {
      id: 'edit-distance',
      name: 'Edit Distance',
      category: 'dynamic',
      difficulty: 'Medium',
      timeComplexity: 'O(mn)',
      spaceComplexity: 'O(mn)',
      description: 'Calculates the minimum number of operations required to transform one string into another.',
      implemented: false,
      icon: '✏️'
    },
    {
      id: 'coin-change',
      name: 'Coin Change',
      category: 'dynamic',
      difficulty: 'Medium',
      timeComplexity: 'O(n × amount)',
      spaceComplexity: 'O(amount)',
      description: 'Finds the minimum number of coins needed to make a given amount using dynamic programming.',
      implemented: false,
      icon: '🪙'
    },
    {
      id: 'house-robber',
      name: 'House Robber',
      category: 'dynamic',
      difficulty: 'Medium',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      description: 'Determines the maximum amount that can be robbed without robbing adjacent houses.',
      implemented: false,
      icon: '🏠'
    },
    {
      id: 'lis',
      name: 'Longest Increasing Subsequence',
      category: 'dynamic',
      difficulty: 'Medium',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      description: 'Finds the length of the longest subsequence where elements are in increasing order.',
      implemented: false,
      icon: '📈'
    },

    // ===== GREEDY ALGORITHMS =====
    {
      id: 'activity-selection',
      name: 'Activity Selection',
      category: 'greedy',
      difficulty: 'Medium',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      description: 'Selects the maximum number of non-overlapping activities from a given set.',
      implemented: false,
      icon: '📅'
    },
    {
      id: 'huffman-coding',
      name: 'Huffman Coding',
      category: 'greedy',
      difficulty: 'Hard',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      description: 'A lossless data compression algorithm that assigns variable-length codes based on frequency.',
      implemented: false,
      icon: '🗜️'
    },
    {
      id: 'fractional-knapsack',
      name: 'Fractional Knapsack',
      category: 'greedy',
      difficulty: 'Medium',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      description: 'Maximizes value in knapsack by taking fractions of items based on value-to-weight ratio.',
      implemented: false,
      icon: '⚖️'
    },
    {
      id: 'job-scheduling',
      name: 'Job Scheduling',
      category: 'greedy',
      difficulty: 'Medium',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      description: 'Schedules jobs to maximize profit while meeting deadlines using greedy approach.',
      implemented: false,
      icon: '⏰'
    },

    // ===== STRING ALGORITHMS =====
    {
      id: 'kmp',
      name: 'KMP Pattern Matching',
      category: 'string',
      difficulty: 'Hard',
      timeComplexity: 'O(n + m)',
      spaceComplexity: 'O(m)',
      description: 'Efficiently searches for a pattern in text using partial match table to avoid redundant comparisons.',
      implemented: false,
      icon: '🔍'
    },
    {
      id: 'rabin-karp',
      name: 'Rabin-Karp Algorithm',
      category: 'string',
      difficulty: 'Medium',
      timeComplexity: 'O(nm)',
      spaceComplexity: 'O(1)',
      description: 'String matching algorithm that uses hashing to find patterns in text.',
      implemented: false,
      icon: '#️⃣'
    },
    {
      id: 'boyer-moore',
      name: 'Boyer-Moore Algorithm',
      category: 'string',
      difficulty: 'Hard',
      timeComplexity: 'O(nm)',
      spaceComplexity: 'O(σ)',
      description: 'Efficient string searching algorithm that skips characters by looking at mismatches.',
      implemented: false,
      icon: '⏩'
    },
    {
      id: 'z-algorithm',
      name: 'Z Algorithm',
      category: 'string',
      difficulty: 'Medium',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      description: 'Linear time algorithm for pattern matching that constructs Z array for efficient searching.',
      implemented: false,
      icon: '🅿️'
    },

    // ===== BACKTRACKING ALGORITHMS =====
    {
      id: 'n-queens',
      name: 'N-Queens Problem',
      category: 'backtracking',
      difficulty: 'Hard',
      timeComplexity: 'O(N!)',
      spaceComplexity: 'O(N)',
      description: 'Places N queens on NxN chessboard so that no two queens attack each other.',
      implemented: false,
      icon: '♛'
    },
    {
      id: 'sudoku-solver',
      name: 'Sudoku Solver',
      category: 'backtracking',
      difficulty: 'Hard',
      timeComplexity: 'O(9^(n²))',
      spaceComplexity: 'O(n²)',
      description: 'Solves Sudoku puzzles using backtracking with constraint satisfaction.',
      implemented: false,
      icon: '🔢'
    },
    {
      id: 'maze-solver',
      name: 'Maze Solver',
      category: 'backtracking',
      difficulty: 'Medium',
      timeComplexity: 'O(4^(mn))',
      spaceComplexity: 'O(mn)',
      description: 'Finds path through maze using backtracking to explore all possible routes.',
      implemented: false,
      icon: '🌽'
    },
    {
      id: 'subset-sum',
      name: 'Subset Sum',
      category: 'backtracking',
      difficulty: 'Medium',
      timeComplexity: 'O(2^n)',
      spaceComplexity: 'O(n)',
      description: 'Finds if there exists a subset with sum equal to given target using backtracking.',
      implemented: false,
      icon: '🎯'
    },

    // ===== TREE ALGORITHMS =====
    {
      id: 'tree-traversal',
      name: 'Tree Traversal',
      category: 'tree',
      difficulty: 'Easy',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      description: 'Various methods to visit all nodes in a tree: inorder, preorder, postorder, level-order.',
      implemented: true,
      icon: '🌳'
    },
    {
      id: 'bst-operations',
      name: 'BST Operations',
      category: 'tree',
      difficulty: 'Medium',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(log n)',
      description: 'Insert, delete, search operations on Binary Search Tree with balancing considerations.',
      implemented: false,
      icon: '🎯'
    },
    {
      id: 'avl-tree',
      name: 'AVL Tree',
      category: 'tree',
      difficulty: 'Hard',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(n)',
      description: 'Self-balancing binary search tree where height difference of subtrees is at most 1.',
      implemented: false,
      icon: '⚖️'
    },
    {
      id: 'red-black-tree',
      name: 'Red-Black Tree',
      category: 'tree',
      difficulty: 'Hard',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(n)',
      description: 'Self-balancing binary search tree with colored nodes to maintain balance properties.',
      implemented: false,
      icon: '🔴'
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
      // Handle special cases for implemented algorithms
      if (algorithm.id === 'bfs') {
        navigate('/bfs');
      } else if (algorithm.id === 'dfs') {
        navigate('/dfs');
      } else if (algorithm.id === 'tree-traversal') {
        navigate('/binary-tree-visualizer');
      } else {
        navigate(`/${algorithm.id}`);
      }
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
              className={`algorithm-card ${algorithm.implemented ? 'implemented' : ''}`}
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
                  <button className="try-button" onClick={() => handleAlgorithmClick(algorithm)}>
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