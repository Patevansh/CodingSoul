import { useState } from 'react';
import './BubbleSortVisualizer.css';

const LinkedListVisualizer = () => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [insertIndex, setInsertIndex] = useState('');
  const [animating, setAnimating] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [operation, setOperation] = useState('');
  const [operationCount, setOperationCount] = useState({ insert: 0, delete: 0 });

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const insertAtHead = async () => {
    if (!inputValue.trim() || animating) return;
    
    setAnimating(true);
    setOperation('Insert at Head');
    
    const newList = [inputValue.trim(), ...list];
    setList(newList);
    setHighlightedIndex(0);
    
    await sleep(500);
    
    setHighlightedIndex(-1);
    setInputValue('');
    setOperationCount(prev => ({ ...prev, insert: prev.insert + 1 }));
    setOperation('');
    setAnimating(false);
  };

  const insertAtTail = async () => {
    if (!inputValue.trim() || animating) return;
    
    setAnimating(true);
    setOperation('Insert at Tail');
    
    const newList = [...list, inputValue.trim()];
    setList(newList);
    setHighlightedIndex(newList.length - 1);
    
    await sleep(500);
    
    setHighlightedIndex(-1);
    setInputValue('');
    setOperationCount(prev => ({ ...prev, insert: prev.insert + 1 }));
    setOperation('');
    setAnimating(false);
  };

  const insertAtIndex = async () => {
    if (!inputValue.trim() || !insertIndex.trim() || animating) return;
    
    const index = parseInt(insertIndex);
    if (isNaN(index) || index < 0 || index > list.length) {
      alert(`Please enter a valid index (0-${list.length})`);
      return;
    }
    
    setAnimating(true);
    setOperation(`Insert at Index ${index}`);
    
    const newList = [...list];
    newList.splice(index, 0, inputValue.trim());
    setList(newList);
    setHighlightedIndex(index);
    
    await sleep(500);
    
    setHighlightedIndex(-1);
    setInputValue('');
    setInsertIndex('');
    setOperationCount(prev => ({ ...prev, insert: prev.insert + 1 }));
    setOperation('');
    setAnimating(false);
  };

  const deleteAtHead = async () => {
    if (list.length === 0 || animating) return;
    
    setAnimating(true);
    setOperation('Delete Head');
    setHighlightedIndex(0);
    
    await sleep(500);
    
    const newList = list.slice(1);
    setList(newList);
    setHighlightedIndex(-1);
    setOperationCount(prev => ({ ...prev, delete: prev.delete + 1 }));
    setOperation('');
    setAnimating(false);
  };

  const deleteAtTail = async () => {
    if (list.length === 0 || animating) return;
    
    setAnimating(true);
    setOperation('Delete Tail');
    setHighlightedIndex(list.length - 1);
    
    await sleep(500);
    
    const newList = list.slice(0, -1);
    setList(newList);
    setHighlightedIndex(-1);
    setOperationCount(prev => ({ ...prev, delete: prev.delete + 1 }));
    setOperation('');
    setAnimating(false);
  };

  const deleteAtIndex = async () => {
    if (!insertIndex.trim() || animating) return;
    
    const index = parseInt(insertIndex);
    if (isNaN(index) || index < 0 || index >= list.length) {
      alert(`Please enter a valid index (0-${list.length - 1})`);
      return;
    }
    
    setAnimating(true);
    setOperation(`Delete at Index ${index}`);
    setHighlightedIndex(index);
    
    await sleep(500);
    
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
    setHighlightedIndex(-1);
    setInsertIndex('');
    setOperationCount(prev => ({ ...prev, delete: prev.delete + 1 }));
    setOperation('');
    setAnimating(false);
  };

  const search = async () => {
    if (!inputValue.trim() || animating) return;
    
    setAnimating(true);
    setOperation('Searching');
    
    for (let i = 0; i < list.length; i++) {
      setHighlightedIndex(i);
      await sleep(300);
      
      if (list[i] === inputValue.trim()) {
        setOperation(`Found at Index ${i}`);
        await sleep(1000);
        setHighlightedIndex(-1);
        setInputValue('');
        setOperation('');
        setAnimating(false);
        return;
      }
    }
    
    setOperation('Not Found');
    await sleep(1000);
    setHighlightedIndex(-1);
    setInputValue('');
    setOperation('');
    setAnimating(false);
  };

  const clear = () => {
    if (animating) return;
    setList([]);
    setOperationCount({ insert: 0, delete: 0 });
    setInputValue('');
    setInsertIndex('');
  };

  const getNodeClass = (index) => {
    let classes = 'linked-list-node';
    
    if (index === highlightedIndex) {
      if (operation.includes('Insert')) classes += ' insert-highlight';
      else if (operation.includes('Delete')) classes += ' delete-highlight';
      else if (operation.includes('Search') || operation.includes('Found')) classes += ' search-highlight';
    }
    
    return classes;
  };

  return (
    <div className="visualizer-container">
      <div className="visualizer-header">
        <h1>Linked List Visualizer</h1>
        <p>A linked list is a linear data structure where elements are stored in nodes, and each node contains data and a pointer to the next node.</p>
      </div>

      <div className="controls">
        <div className="control-group">
          <div className="input-group">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              disabled={animating}
              className="input-field"
            />
            <input
              type="number"
              value={insertIndex}
              onChange={(e) => setInsertIndex(e.target.value)}
              placeholder="Index"
              disabled={animating}
              className="input-field index-input"
            />
          </div>
          
          <div className="button-group">
            <button 
              onClick={insertAtHead} 
              disabled={!inputValue.trim() || animating}
              className="btn btn-primary"
            >
              Insert Head
            </button>
            
            <button 
              onClick={insertAtTail} 
              disabled={!inputValue.trim() || animating}
              className="btn btn-primary"
            >
              Insert Tail
            </button>
            
            <button 
              onClick={insertAtIndex} 
              disabled={!inputValue.trim() || !insertIndex.trim() || animating}
              className="btn btn-primary"
            >
              Insert at Index
            </button>
          </div>
          
          <div className="button-group">
            <button 
              onClick={deleteAtHead} 
              disabled={list.length === 0 || animating}
              className="btn btn-danger"
            >
              Delete Head
            </button>
            
            <button 
              onClick={deleteAtTail} 
              disabled={list.length === 0 || animating}
              className="btn btn-danger"
            >
              Delete Tail
            </button>
            
            <button 
              onClick={deleteAtIndex} 
              disabled={!insertIndex.trim() || animating}
              className="btn btn-danger"
            >
              Delete at Index
            </button>
          </div>
          
          <div className="button-group">
            <button 
              onClick={search} 
              disabled={!inputValue.trim() || list.length === 0 || animating}
              className="btn btn-info"
            >
              Search
            </button>
            
            <button 
              onClick={clear} 
              disabled={animating}
              className="btn btn-secondary"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="algorithm-info">
        <div className="info-item">
          <strong>Size:</strong> {list.length}
        </div>
        <div className="info-item">
          <strong>Head:</strong> {list.length > 0 ? list[0] : 'null'}
        </div>
        <div className="info-item">
          <strong>Tail:</strong> {list.length > 0 ? list[list.length - 1] : 'null'}
        </div>
        <div className="info-item">
          <strong>Insertions:</strong> {operationCount.insert}
        </div>
        <div className="info-item">
          <strong>Deletions:</strong> {operationCount.delete}
        </div>
        <div className="info-item">
          <strong>Current Operation:</strong> {operation || 'None'}
        </div>
      </div>

      <div className="linked-list-visualization">
        <div className="linked-list-container">
          {list.length === 0 ? (
            <div className="empty-list">List is Empty</div>
          ) : (
            list.map((value, index) => (
              <div key={`${value}-${index}`} className="node-container">
                <div className={getNodeClass(index)}>
                  <div className="node-value">{value}</div>
                  <div className="node-index">#{index}</div>
                </div>
                {index < list.length - 1 && (
                  <div className="arrow">→</div>
                )}
                {index === list.length - 1 && (
                  <div className="null-pointer">null</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-color insert-highlight"></div>
          <span>Insert Operation</span>
        </div>
        <div className="legend-item">
          <div className="legend-color delete-highlight"></div>
          <span>Delete Operation</span>
        </div>
        <div className="legend-item">
          <div className="legend-color search-highlight"></div>
          <span>Search Operation</span>
        </div>
      </div>

      <div className="algorithm-description">
        <h3>Linked List Operations:</h3>
        <div className="operations-grid">
          <div className="operation-item">
            <h4>Insert at Head</h4>
            <p>Add a new node at the beginning</p>
            <p><strong>Time Complexity:</strong> O(1)</p>
          </div>
          <div className="operation-item">
            <h4>Insert at Tail</h4>
            <p>Add a new node at the end</p>
            <p><strong>Time Complexity:</strong> O(n)</p>
          </div>
          <div className="operation-item">
            <h4>Insert at Index</h4>
            <p>Add a new node at specific position</p>
            <p><strong>Time Complexity:</strong> O(n)</p>
          </div>
          <div className="operation-item">
            <h4>Delete</h4>
            <p>Remove a node from the list</p>
            <p><strong>Time Complexity:</strong> O(1) for head, O(n) for others</p>
          </div>
          <div className="operation-item">
            <h4>Search</h4>
            <p>Find a value in the list</p>
            <p><strong>Time Complexity:</strong> O(n)</p>
          </div>
          <div className="operation-item">
            <h4>Access</h4>
            <p>Access element at specific index</p>
            <p><strong>Time Complexity:</strong> O(n)</p>
          </div>
        </div>
        
        <div className="complexity-info">
          <h4>Advantages of Linked Lists:</h4>
          <ul>
            <li>Dynamic size - can grow or shrink during runtime</li>
            <li>Efficient insertion/deletion at the beginning - O(1)</li>
            <li>Memory efficient - only allocates memory as needed</li>
            <li>No memory waste - unlike arrays with fixed size</li>
          </ul>
          
          <h4>Disadvantages of Linked Lists:</h4>
          <ul>
            <li>No random access - must traverse from head to reach an element</li>
            <li>Extra memory overhead for storing pointers</li>
            <li>Poor cache locality compared to arrays</li>
            <li>Cannot be indexed like arrays</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LinkedListVisualizer;