import { useState } from 'react';
import './BubbleSortVisualizer.css';

const BinaryTreeVisualizer = () => {
  const [tree, setTree] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [operation, setOperation] = useState('');
  const [animating, setAnimating] = useState(false);
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  const [traversalResult, setTraversalResult] = useState([]);
  const [operationCount, setOperationCount] = useState({ insert: 0, search: 0 });

  // Tree Node class
  class TreeNode {
    constructor(value) {
      this.value = parseInt(value);
      this.left = null;
      this.right = null;
      this.id = Date.now() + Math.random();
    }
  }

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Insert a value into the BST
  const insert = (root, value) => {
    if (root === null) {
      return new TreeNode(value);
    }
    
    if (value < root.value) {
      root.left = insert(root.left, value);
    } else if (value > root.value) {
      root.right = insert(root.right, value);
    }
    
    return root;
  };

  // Search for a value in the BST
  const search = async (root, value, path = []) => {
    if (root === null) {
      return { found: false, path };
    }
    
    path.push(root.id);
    setHighlightedNodes([root.id]);
    await sleep(500);
    
    if (value === root.value) {
      return { found: true, path, node: root };
    }
    
    if (value < root.value) {
      return search(root.left, value, path);
    } else {
      return search(root.right, value, path);
    }
  };

  // Inorder traversal
  const inorderTraversal = async (root, result = []) => {
    if (root === null) return result;
    
    await inorderTraversal(root.left, result);
    
    setHighlightedNodes([root.id]);
    result.push(root.value);
    await sleep(300);
    
    await inorderTraversal(root.right, result);
    
    return result;
  };

  // Preorder traversal  
  const preorderTraversal = async (root, result = []) => {
    if (root === null) return result;
    
    setHighlightedNodes([root.id]);
    result.push(root.value);
    await sleep(300);
    
    await preorderTraversal(root.left, result);
    await preorderTraversal(root.right, result);
    
    return result;
  };

  // Postorder traversal
  const postorderTraversal = async (root, result = []) => {
    if (root === null) return result;
    
    await postorderTraversal(root.left, result);
    await postorderTraversal(root.right, result);
    
    setHighlightedNodes([root.id]);
    result.push(root.value);
    await sleep(300);
    
    return result;
  };

  // Handle insert operation
  const handleInsert = async () => {
    if (!inputValue.trim() || isNaN(inputValue) || animating) return;
    
    setAnimating(true);
    setOperation('Inserting');
    setHighlightedNodes([]);
    
    const value = parseInt(inputValue);
    const newTree = insert(tree, value);
    setTree(newTree);
    
    setOperationCount(prev => ({ ...prev, insert: prev.insert + 1 }));
    setInputValue('');
    setOperation('');
    setAnimating(false);
  };

  // Handle search operation
  const handleSearch = async () => {
    if (!inputValue.trim() || isNaN(inputValue) || animating || !tree) return;
    
    setAnimating(true);
    setOperation('Searching');
    setHighlightedNodes([]);
    
    const value = parseInt(inputValue);
    const result = await search(tree, value);
    
    if (result.found) {
      setOperation(`Found ${value}`);
    } else {
      setOperation(`${value} not found`);
    }
    
    setOperationCount(prev => ({ ...prev, search: prev.search + 1 }));
    
    setTimeout(() => {
      setHighlightedNodes([]);
      setOperation('');
      setAnimating(false);
    }, 1500);
  };

  // Handle traversal operations
  const handleTraversal = async (type) => {
    if (animating || !tree) return;
    
    setAnimating(true);
    setOperation(`${type} Traversal`);
    setHighlightedNodes([]);
    setTraversalResult([]);
    
    let result = [];
    if (type === 'Inorder') {
      result = await inorderTraversal(tree);
    } else if (type === 'Preorder') {
      result = await preorderTraversal(tree);
    } else if (type === 'Postorder') {
      result = await postorderTraversal(tree);
    }
    
    setTraversalResult(result);
    setHighlightedNodes([]);
    setOperation('');
    setAnimating(false);
  };

  // Clear the tree
  const clearTree = () => {
    if (animating) return;
    setTree(null);
    setHighlightedNodes([]);
    setTraversalResult([]);
    setOperationCount({ insert: 0, search: 0 });
  };

  // Calculate node positions for visualization
  const calculateNodePositions = (node, x = 400, y = 50, level = 0) => {
    if (!node) return [];
    
    const positions = [];
    const horizontalSpacing = Math.max(50, 200 / (level + 1));
    
    // Current node position
    positions.push({
      id: node.id,
      value: node.value,
      x: x - 20, // Adjust for node width
      y: y,
      highlighted: highlightedNodes.includes(node.id)
    });
    
    // Left child
    if (node.left) {
      positions.push(...calculateNodePositions(
        node.left, 
        x - horizontalSpacing, 
        y + 80, 
        level + 1
      ));
      
      // Add line to left child
      positions.push({
        type: 'line',
        x1: x,
        y1: y + 20,
        x2: x - horizontalSpacing,
        y2: y + 80,
      });
    }
    
    // Right child
    if (node.right) {
      positions.push(...calculateNodePositions(
        node.right, 
        x + horizontalSpacing, 
        y + 80, 
        level + 1
      ));
      
      // Add line to right child
      positions.push({
        type: 'line',
        x1: x,
        y1: y + 20,
        x2: x + horizontalSpacing,
        y2: y + 80,
      });
    }
    
    return positions;
  };

  const nodePositions = tree ? calculateNodePositions(tree) : [];

  return (
    <div className="visualizer-container">
      <div className="visualizer-header">
        <h1>Binary Search Tree Visualizer</h1>
        <p>A binary search tree where left subtree contains smaller values and right subtree contains larger values.</p>
      </div>

      <div className="controls">
        <div className="control-group">
          <div className="input-group">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              disabled={animating}
              className="input-field"
              onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
            />
            <button 
              onClick={handleInsert} 
              disabled={!inputValue.trim() || animating}
              className="btn btn-primary"
            >
              Insert
            </button>
            <button 
              onClick={handleSearch} 
              disabled={!inputValue.trim() || !tree || animating}
              className="btn btn-info"
            >
              Search
            </button>
          </div>
          
          <div className="button-group">
            <button 
              onClick={() => handleTraversal('Inorder')} 
              disabled={!tree || animating}
              className="btn btn-success"
            >
              Inorder
            </button>
            <button 
              onClick={() => handleTraversal('Preorder')} 
              disabled={!tree || animating}
              className="btn btn-warning"
            >
              Preorder
            </button>
            <button 
              onClick={() => handleTraversal('Postorder')} 
              disabled={!tree || animating}
              className="btn btn-info"
            >
              Postorder
            </button>
            <button 
              onClick={clearTree} 
              disabled={animating}
              className="btn btn-secondary"
            >
              Clear Tree
            </button>
          </div>
        </div>
      </div>

      <div className="algorithm-info">
        <div className="info-item">
          <strong>Nodes:</strong> {tree ? nodePositions.filter(p => !p.type).length : 0}
        </div>
        <div className="info-item">
          <strong>Insertions:</strong> {operationCount.insert}
        </div>
        <div className="info-item">
          <strong>Searches:</strong> {operationCount.search}
        </div>
        <div className="info-item">
          <strong>Current Operation:</strong> {operation || 'None'}
        </div>
        <div className="info-item">
          <strong>Height:</strong> {tree ? Math.floor(Math.log2(nodePositions.filter(p => !p.type).length)) + 1 : 0}
        </div>
      </div>

      <div className="tree-visualization">
        {tree ? (
          <svg width="800" height="400" style={{ position: 'absolute', top: 0, left: 0 }}>
            {/* Render lines first */}
            {nodePositions.filter(p => p.type === 'line').map((line, index) => (
              <line
                key={index}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="var(--text-color)"
                strokeWidth="2"
                opacity="0.7"
              />
            ))}
          </svg>
        ) : null}
        
        {tree ? (
          nodePositions.filter(p => !p.type).map((pos) => (
            <div
              key={pos.id}
              className={`tree-node ${pos.highlighted ? 'highlight' : ''}`}
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
              }}
            >
              {pos.value}
            </div>
          ))
        ) : (
          <div className="empty-tree">
            Tree is empty. Insert some values to get started!
          </div>
        )}
      </div>

      {traversalResult.length > 0 && (
        <div className="traversal-result">
          <h4>Traversal Result:</h4>
          <div className="traversal-path">
            {traversalResult.map((value, index) => (
              <span key={index}>
                <span className="traversal-node">{value}</span>
                {index < traversalResult.length - 1 && <span className="traversal-arrow">→</span>}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="legend">
        <div className="legend-item">
          <div className="legend-color highlight"></div>
          <span>Currently Processing</span>
        </div>
        <div className="legend-item">
          <div className="legend-color found"></div>
          <span>Found/Target</span>
        </div>
      </div>

      <div className="algorithm-description">
        <h3>Binary Search Tree Operations:</h3>
        <div className="operations-grid">
          <div className="operation-item">
            <h4>Insert</h4>
            <p>Add a new value maintaining BST property</p>
            <p><strong>Time Complexity:</strong> O(log n) average, O(n) worst</p>
          </div>
          <div className="operation-item">
            <h4>Search</h4>
            <p>Find a value by comparing with nodes</p>
            <p><strong>Time Complexity:</strong> O(log n) average, O(n) worst</p>
          </div>
          <div className="operation-item">
            <h4>Inorder Traversal</h4>
            <p>Visit nodes in sorted order (Left-Root-Right)</p>
            <p><strong>Time Complexity:</strong> O(n)</p>
          </div>
          <div className="operation-item">
            <h4>Preorder Traversal</h4>
            <p>Visit root first (Root-Left-Right)</p>
            <p><strong>Time Complexity:</strong> O(n)</p>
          </div>
          <div className="operation-item">
            <h4>Postorder Traversal</h4>
            <p>Visit root last (Left-Right-Root)</p>
            <p><strong>Time Complexity:</strong> O(n)</p>
          </div>
        </div>
        
        <div className="complexity-info">
          <h4>BST Properties:</h4>
          <ul>
            <li>All values in left subtree are smaller than root</li>
            <li>All values in right subtree are larger than root</li>
            <li>Both left and right subtrees are also BSTs</li>
            <li>Inorder traversal gives sorted sequence</li>
            <li>No duplicate values allowed</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BinaryTreeVisualizer;