import { useState, useEffect } from 'react';
import './BubbleSortVisualizer.css';

const GraphVisualizer = ({ algorithm = null }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [traversalOrder, setTraversalOrder] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [nodeInput, setNodeInput] = useState('');
  const [startNode, setStartNode] = useState('');
  const [endNode, setEndNode] = useState('');

  // Get title and description based on algorithm prop
  const getTitle = () => {
    switch (algorithm) {
      case 'bfs':
        return 'Breadth-First Search (BFS)';
      case 'dfs':
        return 'Depth-First Search (DFS)';
      default:
        return 'Graph Visualizer';
    }
  };

  const getDescription = () => {
    switch (algorithm) {
      case 'bfs':
        return 'Breadth-First Search explores graph level by level, visiting all neighbors before moving deeper.';
      case 'dfs':
        return 'Depth-First Search explores graph by going as deep as possible before backtracking.';
      default:
        return 'Interactive graph with Depth-First Search (DFS) and Breadth-First Search (BFS) algorithms.';
    }
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Initialize with sample data and auto-run algorithm if specified
  useEffect(() => {
    if (algorithm && nodes.length === 0) {
      // Create sample graph for demonstration
      const sampleNodes = [
        { id: 'A', label: 'A', x: 150, y: 100 },
        { id: 'B', label: 'B', x: 300, y: 100 },
        { id: 'C', label: 'C', x: 450, y: 100 },
        { id: 'D', label: 'D', x: 150, y: 250 },
        { id: 'E', label: 'E', x: 300, y: 250 },
        { id: 'F', label: 'F', x: 450, y: 250 },
      ];
      
      const sampleEdges = [
        { id: 'A-B', from: 'A', to: 'B' },
        { id: 'B-C', from: 'B', to: 'C' },
        { id: 'A-D', from: 'A', to: 'D' },
        { id: 'B-E', from: 'B', to: 'E' },
        { id: 'C-F', from: 'C', to: 'F' },
        { id: 'D-E', from: 'D', to: 'E' },
        { id: 'E-F', from: 'E', to: 'F' },
      ];
      
      setNodes(sampleNodes);
      setEdges(sampleEdges);
      setStartNode('A');
    }
  }, [algorithm, nodes.length]);

  // Auto-run algorithm effect
  useEffect(() => {
    if (algorithm && nodes.length > 0 && !isAnimating && startNode) {
      const timer = setTimeout(() => {
        if (algorithm === 'bfs') {
          // Inline BFS logic to avoid dependency issues
          const startLabel = startNode.trim();
          if (!startLabel) return;
          
          const adjacencyList = {};
          nodes.forEach(node => {
            adjacencyList[node.label] = [];
          });
          
          edges.forEach(edge => {
            adjacencyList[edge.from].push(edge.to);
            adjacencyList[edge.to].push(edge.from);
          });
          
          const visited = new Set();
          const queue = [startLabel];
          const result = [];
          
          while (queue.length > 0) {
            const node = queue.shift();
            if (!visited.has(node)) {
              visited.add(node);
              result.push(node);
              
              if (adjacencyList[node]) {
                adjacencyList[node].forEach(neighbor => {
                  if (!visited.has(neighbor)) {
                    queue.push(neighbor);
                  }
                });
              }
            }
          }
          
          // Animate the result
          setIsAnimating(true);
          setVisitedNodes([]);
          setCurrentNode(null);
          setTraversalOrder(result);
          
          result.forEach((nodeLabel, index) => {
            setTimeout(() => {
              setCurrentNode(nodeLabel);
              setVisitedNodes(prev => [...prev, nodeLabel]);
              
              if (index === result.length - 1) {
                setTimeout(() => {
                  setCurrentNode(null);
                  setIsAnimating(false);
                }, 1000);
              }
            }, index * 1000);
          });
        } else if (algorithm === 'dfs') {
          // Inline DFS logic to avoid dependency issues
          const startLabel = startNode.trim();
          if (!startLabel) return;
          
          const adjacencyList = {};
          nodes.forEach(node => {
            adjacencyList[node.label] = [];
          });
          
          edges.forEach(edge => {
            adjacencyList[edge.from].push(edge.to);
            adjacencyList[edge.to].push(edge.from);
          });
          
          const visited = new Set();
          const result = [];
          
          const dfs = (nodeLabel) => {
            visited.add(nodeLabel);
            result.push(nodeLabel);
            
            if (adjacencyList[nodeLabel]) {
              adjacencyList[nodeLabel].forEach(neighbor => {
                if (!visited.has(neighbor)) {
                  dfs(neighbor);
                }
              });
            }
          };
          
          dfs(startLabel);
          
          // Animate the result
          setIsAnimating(true);
          setVisitedNodes([]);
          setCurrentNode(null);
          setTraversalOrder(result);
          
          result.forEach((nodeLabel, index) => {
            setTimeout(() => {
              setCurrentNode(nodeLabel);
              setVisitedNodes(prev => [...prev, nodeLabel]);
              
              if (index === result.length - 1) {
                setTimeout(() => {
                  setCurrentNode(null);
                  setIsAnimating(false);
                }, 1000);
              }
            }, index * 1000);
          });
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [algorithm, nodes, edges, startNode, isAnimating]);

  // Calculate non-overlapping position for new node
  const calculateNodePosition = (existingNodes) => {
    const nodeRadius = 60; // Minimum distance between node centers (increased for better spacing)
    const containerWidth = 700;
    const containerHeight = 500;
    const margin = 80;
    
    if (existingNodes.length === 0) {
      return { x: margin + nodeRadius, y: margin + nodeRadius };
    }
    
    // Try to find a position that doesn't overlap with existing nodes
    let attempts = 0;
    const maxAttempts = 100;
    
    while (attempts < maxAttempts) {
      const x = Math.random() * (containerWidth - 2 * margin) + margin;
      const y = Math.random() * (containerHeight - 2 * margin) + margin;
      
      // Check if this position overlaps with any existing node
      const overlaps = existingNodes.some(node => {
        const distance = Math.sqrt(Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2));
        return distance < nodeRadius;
      });
      
      if (!overlaps) {
        return { x, y };
      }
      
      attempts++;
    }
    
    // If no non-overlapping position found, use grid-based positioning
    const gridSize = Math.ceil(Math.sqrt(existingNodes.length + 1));
    const cellWidth = (containerWidth - 2 * margin) / gridSize;
    const cellHeight = (containerHeight - 2 * margin) / gridSize;
    
    const nodeIndex = existingNodes.length;
    const row = Math.floor(nodeIndex / gridSize);
    const col = nodeIndex % gridSize;
    
    return {
      x: margin + col * cellWidth + cellWidth / 2,
      y: margin + row * cellHeight + cellHeight / 2
    };
  };

  // Add a node to the graph
  const addNode = () => {
    if (!nodeInput.trim() || isAnimating) return;
    
    const nodeLabel = nodeInput.trim().toUpperCase();
    if (nodes.find(node => node.label === nodeLabel)) {
      alert('Node already exists!');
      return;
    }

    const position = calculateNodePosition(nodes);
    const newNode = {
      id: Date.now(),
      label: nodeLabel,
      x: position.x,
      y: position.y,
    };

    setNodes([...nodes, newNode]);
    setNodeInput('');
  };

  // Add an edge between two nodes
  const addEdge = () => {
    if (!startNode.trim() || !endNode.trim() || isAnimating) return;
    
    const start = startNode.trim().toUpperCase();
    const end = endNode.trim().toUpperCase();
    
    const startNodeObj = nodes.find(node => node.label === start);
    const endNodeObj = nodes.find(node => node.label === end);
    
    if (!startNodeObj || !endNodeObj) {
      alert('Both nodes must exist!');
      return;
    }
    
    if (start === end) {
      alert('Cannot add edge to the same node!');
      return;
    }
    
    const edgeExists = edges.find(edge => 
      (edge.from === start && edge.to === end) || 
      (edge.from === end && edge.to === start)
    );
    
    if (edgeExists) {
      alert('Edge already exists!');
      return;
    }

    const newEdge = {
      id: Date.now(),
      from: start,
      to: end,
    };

    setEdges([...edges, newEdge]);
    setStartNode('');
    setEndNode('');
  };

  // Build adjacency list from nodes and edges
  const buildAdjacencyList = () => {
    const adjacencyList = {};
    
    nodes.forEach(node => {
      adjacencyList[node.label] = [];
    });
    
    edges.forEach(edge => {
      adjacencyList[edge.from].push(edge.to);
      adjacencyList[edge.to].push(edge.from); // Undirected graph
    });
    
    return adjacencyList;
  };

  // Depth-First Search
  const performDFS = (startLabel) => {
    const adjacencyList = buildAdjacencyList();
    const visited = new Set();
    const result = [];
    
    const dfs = (nodeLabel) => {
      if (visited.has(nodeLabel)) return;
      
      visited.add(nodeLabel);
      result.push(nodeLabel);
      
      adjacencyList[nodeLabel].forEach(neighbor => {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      });
    };
    
    dfs(startLabel);
    return result;
  };

  // Breadth-First Search
  const performBFS = (startLabel) => {
    const adjacencyList = buildAdjacencyList();
    const visited = new Set();
    const queue = [startLabel];
    const result = [];
    
    visited.add(startLabel);
    
    while (queue.length > 0) {
      const current = queue.shift();
      result.push(current);
      
      adjacencyList[current].forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }
    
    return result;
  };

  // Animate traversal
  const animateTraversal = async (path) => {
    setVisitedNodes([]);
    setCurrentNode(null);
    setTraversalOrder(path);
    
    for (let i = 0; i < path.length; i++) {
      setCurrentNode(path[i]);
      await sleep(800);
      
      setVisitedNodes(prev => [...prev, path[i]]);
      setCurrentNode(null);
      await sleep(200);
    }
  };

  // Handle DFS
  const handleDFS = async () => {
    if (!startNode.trim() || isAnimating) {
      alert('Please enter a start node');
      return;
    }
    
    const startLabel = startNode.trim().toUpperCase();
    const startNodeObj = nodes.find(node => node.label === startLabel);
    
    if (!startNodeObj) {
      alert('Start node does not exist!');
      return;
    }
    
    setIsAnimating(true);
    const result = performDFS(startLabel);
    await animateTraversal(result);
    setIsAnimating(false);
  };

  // Handle BFS
  const handleBFS = async () => {
    if (!startNode.trim() || isAnimating) {
      alert('Please enter a start node');
      return;
    }
    
    const startLabel = startNode.trim().toUpperCase();
    const startNodeObj = nodes.find(node => node.label === startLabel);
    
    if (!startNodeObj) {
      alert('Start node does not exist!');
      return;
    }
    
    setIsAnimating(true);
    const result = performBFS(startLabel);
    await animateTraversal(result);
    setIsAnimating(false);
  };

  // Auto-arrange nodes to prevent overlaps and optimize edge routing
  const autoArrangeNodes = () => {
    if (nodes.length === 0 || isAnimating) return;
    
    const containerWidth = 700;
    const containerHeight = 500;
    const margin = 80;
    const nodeRadius = 60;
    
    // Use force-directed layout algorithm (improved)
    const arrangedNodes = [...nodes];
    const iterations = 100; // Increased iterations for better layout
    
    for (let iter = 0; iter < iterations; iter++) {
      // Calculate repulsion forces between nodes
      arrangedNodes.forEach((node, i) => {
        let fx = 0, fy = 0;
        
        // Repulsion from other nodes
        arrangedNodes.forEach((otherNode, j) => {
          if (i !== j) {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 0 && distance < nodeRadius * 2) {
              const force = (nodeRadius * 2 - distance) / (nodeRadius * 2);
              fx += (dx / distance) * force * 10;
              fy += (dy / distance) * force * 10;
            }
          }
        });
        
        // Attraction to center (to prevent nodes from flying away)
        const centerX = containerWidth / 2;
        const centerY = containerHeight / 2;
        const centerDx = centerX - node.x;
        const centerDy = centerY - node.y;
        const centerDistance = Math.sqrt(centerDx * centerDx + centerDy * centerDy);
        
        if (centerDistance > 0) {
          fx += (centerDx / centerDistance) * 0.5;
          fy += (centerDy / centerDistance) * 0.5;
        }
        
        // Apply forces with damping (reduced for smoother movement)
        node.x += fx * 0.1;
        node.y += fy * 0.1;
        
        // Keep nodes within bounds
        node.x = Math.max(margin, Math.min(containerWidth - margin, node.x));
        node.y = Math.max(margin, Math.min(containerHeight - margin, node.y));
      });
    }
    
    setNodes(arrangedNodes);
  };

  // Clear graph
  const clearGraph = () => {
    if (isAnimating) return;
    setNodes([]);
    setEdges([]);
    setVisitedNodes([]);
    setCurrentNode(null);
    setTraversalOrder([]);
  };

  // Reset traversal
  const resetTraversal = () => {
    if (isAnimating) return;
    setVisitedNodes([]);
    setCurrentNode(null);
    setTraversalOrder([]);
  };

  // Get node class for styling
  const getNodeClass = (nodeLabel) => {
    let classes = 'graph-node';
    
    if (currentNode === nodeLabel) {
      classes += ' current';
    } else if (visitedNodes.includes(nodeLabel)) {
      classes += ' visited';
    }
    
    return classes;
  };

  // Check if a line segment intersects with a node
  const lineIntersectsNode = (x1, y1, x2, y2, nodeX, nodeY, nodeRadius = 25) => {
    // Calculate distance from node center to line segment
    const A = x2 - x1;
    const B = y2 - y1;
    const C = x1 - nodeX;
    const D = y1 - nodeY;
    
    const dot = C * A + D * B;
    const lenSq = A * A + B * B;
    
    if (lenSq === 0) return false; // Line has no length
    
    const param = -dot / lenSq;
    
    let closestX, closestY;
    
    if (param < 0) {
      closestX = x1;
      closestY = y1;
    } else if (param > 1) {
      closestX = x2;
      closestY = y2;
    } else {
      closestX = x1 + param * A;
      closestY = y1 + param * B;
    }
    
    const dx = nodeX - closestX;
    const dy = nodeY - closestY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    return distance < nodeRadius;
  };

  // Calculate edge path avoiding other nodes
  const calculateEdgePath = (edge) => {
    const fromNode = nodes.find(node => node.label === edge.from);
    const toNode = nodes.find(node => node.label === edge.to);
    
    if (!fromNode || !toNode) return null;
    
    const nodeRadius = 25;
    const fromX = fromNode.x + 20; // Center of node
    const fromY = fromNode.y + 20;
    const toX = toNode.x + 20;
    const toY = toNode.y + 20;
    
    // Check if direct path intersects with any other nodes
    const otherNodes = nodes.filter(node => 
      node.label !== edge.from && node.label !== edge.to
    );
    
    let pathIntersects = false;
    for (const node of otherNodes) {
      if (lineIntersectsNode(fromX, fromY, toX, toY, node.x + 20, node.y + 20, nodeRadius + 5)) {
        pathIntersects = true;
        break;
      }
    }
    
    // If no intersection, use direct path
    if (!pathIntersects) {
      return [{
        x1: fromX,
        y1: fromY,
        x2: toX,
        y2: toY,
        type: 'line'
      }];
    }
    
    // If intersection exists, use curved path
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;
    
    // Calculate perpendicular offset for curve
    const dx = toX - fromX;
    const dy = toY - fromY;
    const length = Math.sqrt(dx * dx + dy * dy);
    
    if (length === 0) return null;
    
    // Perpendicular vector
    const perpX = -dy / length;
    const perpY = dx / length;
    
    // Try different curve offsets to find one that doesn't intersect
    const offsets = [40, -40, 60, -60, 80, -80];
    
    for (const offset of offsets) {
      const controlX = midX + perpX * offset;
      const controlY = midY + perpY * offset;
      
      // Check if this curved path intersects with nodes
      let curveIntersects = false;
      
      // Sample points along the curve to check for intersections
      for (let t = 0; t <= 1; t += 0.1) {
        const curveX = (1 - t) * (1 - t) * fromX + 2 * (1 - t) * t * controlX + t * t * toX;
        const curveY = (1 - t) * (1 - t) * fromY + 2 * (1 - t) * t * controlY + t * t * toY;
        
        for (const node of otherNodes) {
          const nodeCenterX = node.x + 20;
          const nodeCenterY = node.y + 20;
          const distance = Math.sqrt((curveX - nodeCenterX) ** 2 + (curveY - nodeCenterY) ** 2);
          
          if (distance < nodeRadius + 5) {
            curveIntersects = true;
            break;
          }
        }
        
        if (curveIntersects) break;
      }
      
      if (!curveIntersects) {
        return [{
          x1: fromX,
          y1: fromY,
          x2: toX,
          y2: toY,
          controlX: controlX,
          controlY: controlY,
          type: 'curve'
        }];
      }
    }
    
    // Fallback to direct line if no good curve found
    return [{
      x1: fromX,
      y1: fromY,
      x2: toX,
      y2: toY,
      type: 'line'
    }];
  };

  return (
    <div className="visualizer-container">
      <div className="visualizer-header">
        <h1>{getTitle()}</h1>
        <p>{getDescription()}</p>
      </div>

      <div className="controls">
        <div className="control-group">
          <div className="node-input-group">
            <input
              type="text"
              value={nodeInput}
              onChange={(e) => setNodeInput(e.target.value)}
              placeholder="Node label (A, B, C...)"
              disabled={isAnimating}
              className="input-field"
              maxLength="1"
            />
            <button 
              onClick={addNode} 
              disabled={!nodeInput.trim() || isAnimating}
              className="btn btn-primary"
            >
              Add Node
            </button>
          </div>
          
          <div className="node-input-group">
            <input
              type="text"
              value={startNode}
              onChange={(e) => setStartNode(e.target.value)}
              placeholder="From node"
              disabled={isAnimating}
              className="input-field"
              maxLength="1"
            />
            <input
              type="text"
              value={endNode}
              onChange={(e) => setEndNode(e.target.value)}
              placeholder="To node"
              disabled={isAnimating}
              className="input-field"
              maxLength="1"
            />
            <button 
              onClick={addEdge} 
              disabled={!startNode.trim() || !endNode.trim() || isAnimating}
              className="btn btn-success"
            >
              Add Edge
            </button>
          </div>
          
          <div className="button-group">
            <button 
              onClick={handleDFS} 
              disabled={nodes.length === 0 || !startNode.trim() || isAnimating}
              className="btn btn-warning"
            >
              DFS Traversal
            </button>
            <button 
              onClick={handleBFS} 
              disabled={nodes.length === 0 || !startNode.trim() || isAnimating}
              className="btn btn-info"
            >
              BFS Traversal
            </button>
            <button 
              onClick={autoArrangeNodes} 
              disabled={nodes.length < 2 || isAnimating}
              className="btn btn-primary"
            >
              Auto Arrange
            </button>
            <button 
              onClick={resetTraversal} 
              disabled={isAnimating}
              className="btn btn-secondary"
            >
              Reset
            </button>
            <button 
              onClick={clearGraph} 
              disabled={isAnimating}
              className="btn btn-danger"
            >
              Clear Graph
            </button>
          </div>
        </div>
      </div>

      <div className="graph-info">
        <div className="graph-stats">
          <h4>Nodes</h4>
          <p>{nodes.length}</p>
        </div>
        <div className="graph-stats">
          <h4>Edges</h4>
          <p>{edges.length}</p>
        </div>
        <div className="graph-stats">
          <h4>Visited</h4>
          <p>{visitedNodes.length}</p>
        </div>
        <div className="graph-stats">
          <h4>Current</h4>
          <p>{currentNode || 'None'}</p>
        </div>
      </div>

      <div className="graph-visualization">
        {/* SVG for rendering edges */}
        <svg 
          className="graph-svg" 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          {edges.map((edge) => {
            const edgePath = calculateEdgePath(edge);
            if (!edgePath || edgePath.length === 0) return null;
            
            const path = edgePath[0];
            
            if (path.type === 'curve') {
              // Render curved edge using quadratic Bezier curve
              const d = `M ${path.x1} ${path.y1} Q ${path.controlX} ${path.controlY} ${path.x2} ${path.y2}`;
              return (
                <path
                  key={edge.id}
                  d={d}
                  stroke="var(--color-text)"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.7"
                  className="graph-edge-path"
                />
              );
            } else {
              // Render straight edge
              return (
                <line
                  key={edge.id}
                  x1={path.x1}
                  y1={path.y1}
                  x2={path.x2}
                  y2={path.y2}
                  stroke="var(--color-text)"
                  strokeWidth="2"
                  opacity="0.7"
                  className="graph-edge-line"
                />
              );
            }
          })}
        </svg>
        
        {/* Render nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            className={getNodeClass(node.label)}
            style={{
              left: `${node.x}px`,
              top: `${node.y}px`,
              zIndex: 10
            }}
          >
            {node.label}
          </div>
        ))}
        
        {nodes.length === 0 && (
          <div className="empty-tree">
            Add some nodes and edges to create a graph!
          </div>
        )}
      </div>

      {traversalOrder.length > 0 && (
        <div className="traversal-result">
          <h4>Traversal Order:</h4>
          <div className="traversal-path">
            {traversalOrder.map((nodeLabel, index) => (
              <span key={index}>
                <span className="traversal-node">{nodeLabel}</span>
                {index < traversalOrder.length - 1 && <span className="traversal-arrow">→</span>}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="legend">
        <div className="legend-item">
          <div className="legend-color current"></div>
          <span>Currently Processing</span>
        </div>
        <div className="legend-item">
          <div className="legend-color visited"></div>
          <span>Visited</span>
        </div>
      </div>

      <div className="algorithm-description">
        <h3>Graph Traversal Algorithms:</h3>
        <div className="operations-grid">
          <div className="operation-item">
            <h4>Depth-First Search (DFS)</h4>
            <p>Explores as far as possible along each branch before backtracking</p>
            <p><strong>Time Complexity:</strong> O(V + E)</p>
            <p><strong>Space Complexity:</strong> O(V)</p>
          </div>
          <div className="operation-item">
            <h4>Breadth-First Search (BFS)</h4>
            <p>Explores all neighbors at the current depth before moving to the next level</p>
            <p><strong>Time Complexity:</strong> O(V + E)</p>
            <p><strong>Space Complexity:</strong> O(V)</p>
          </div>
          <div className="operation-item">
            <h4>Add Node</h4>
            <p>Add a new vertex to the graph with smart positioning to prevent overlaps</p>
            <p><strong>Time Complexity:</strong> O(1)</p>
          </div>
          <div className="operation-item">
            <h4>Add Edge</h4>
            <p>Connect two existing vertices</p>
            <p><strong>Time Complexity:</strong> O(1)</p>
          </div>
          <div className="operation-item">
            <h4>Auto Arrange</h4>
            <p>Automatically repositions nodes to prevent overlaps and optimizes edge routing to avoid node intersections</p>
            <p><strong>Algorithm:</strong> Force-directed graph drawing with edge collision detection</p>
          </div>
        </div>
        
        <div className="complexity-info">
          <h4>Graph Applications:</h4>
          <ul>
            <li>Social networks - finding connections and communities</li>
            <li>Maps and navigation - finding shortest paths</li>
            <li>Web crawling - traversing web pages</li>
            <li>Network analysis - studying network topology</li>
            <li>Dependency resolution - managing dependencies</li>
            <li>Game AI - pathfinding and decision trees</li>
          </ul>
          
          <h4>DFS vs BFS:</h4>
          <ul>
            <li><strong>DFS:</strong> Uses stack (recursion), goes deep first, good for topological sorting</li>
            <li><strong>BFS:</strong> Uses queue, goes wide first, good for shortest path in unweighted graphs</li>
          </ul>
          
          <h4>Visualization Features:</h4>
          <ul>
            <li><strong>Smart Edge Routing:</strong> Edges automatically curve to avoid passing through other nodes</li>
            <li><strong>Collision Detection:</strong> Prevents visual overlap between edges and nodes</li>
            <li><strong>Force-Directed Layout:</strong> Auto-arrange uses physics simulation for optimal positioning</li>
            <li><strong>SVG Rendering:</strong> Smooth curves and crisp lines for professional appearance</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GraphVisualizer;