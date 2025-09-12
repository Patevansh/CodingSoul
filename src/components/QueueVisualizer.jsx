import { useState } from 'react';
import './BubbleSortVisualizer.css';

const QueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [animating, setAnimating] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [operation, setOperation] = useState('');
  const [operationCount, setOperationCount] = useState({ enqueue: 0, dequeue: 0 });

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const enqueue = async () => {
    if (!inputValue.trim() || animating) return;
    
    setAnimating(true);
    setOperation('Enqueue');
    
    const newQueue = [...queue, inputValue.trim()];
    setQueue(newQueue);
    setHighlightedIndex(newQueue.length - 1);
    
    await sleep(300);
    
    setHighlightedIndex(-1);
    setInputValue('');
    setOperationCount(prev => ({ ...prev, enqueue: prev.enqueue + 1 }));
    setOperation('');
    setAnimating(false);
  };

  const dequeue = async () => {
    if (queue.length === 0 || animating) return;
    
    setAnimating(true);
    setOperation('Dequeue');
    setHighlightedIndex(0);
    
    await sleep(300);
    
    const newQueue = queue.slice(1);
    setQueue(newQueue);
    setHighlightedIndex(-1);
    setOperationCount(prev => ({ ...prev, dequeue: prev.dequeue + 1 }));
    setOperation('');
    setAnimating(false);
  };

  const peek = async () => {
    if (queue.length === 0 || animating) return;
    
    setAnimating(true);
    setOperation('Peek');
    setHighlightedIndex(0);
    
    await sleep(500);
    
    setHighlightedIndex(-1);
    setOperation('');
    setAnimating(false);
  };

  const clear = () => {
    if (animating) return;
    setQueue([]);
    setOperationCount({ enqueue: 0, dequeue: 0 });
    setInputValue('');
  };

  const getItemClass = (index) => {
    let classes = 'queue-item';
    
    if (index === highlightedIndex) {
      if (operation === 'Enqueue') classes += ' enqueue-highlight';
      else if (operation === 'Dequeue') classes += ' dequeue-highlight';
      else if (operation === 'Peek') classes += ' peek-highlight';
    }
    
    return classes;
  };

  return (
    <div className="visualizer-container">
      <div className="visualizer-header">
        <h1>Queue Visualizer</h1>
        <p>Queue follows FIFO (First In, First Out) principle. Elements are added at the rear and removed from the front.</p>
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
              onKeyPress={(e) => e.key === 'Enter' && enqueue()}
            />
            <button 
              onClick={enqueue} 
              disabled={!inputValue.trim() || animating}
              className="btn btn-primary"
            >
              Enqueue
            </button>
          </div>
          
          <button 
            onClick={dequeue} 
            disabled={queue.length === 0 || animating}
            className="btn btn-warning"
          >
            Dequeue
          </button>
          
          <button 
            onClick={peek} 
            disabled={queue.length === 0 || animating}
            className="btn btn-info"
          >
            Peek
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

      <div className="algorithm-info">
        <div className="info-item">
          <strong>Size:</strong> {queue.length}
        </div>
        <div className="info-item">
          <strong>Front:</strong> {queue.length > 0 ? queue[0] : 'Empty'}
        </div>
        <div className="info-item">
          <strong>Rear:</strong> {queue.length > 0 ? queue[queue.length - 1] : 'Empty'}
        </div>
        <div className="info-item">
          <strong>Enqueues:</strong> {operationCount.enqueue}
        </div>
        <div className="info-item">
          <strong>Dequeues:</strong> {operationCount.dequeue}
        </div>
        <div className="info-item">
          <strong>Current Operation:</strong> {operation || 'None'}
        </div>
      </div>

      <div className="queue-visualization">
        <div className="queue-container">
          <div className="queue-label front-label">FRONT</div>
          <div className="queue-items">
            {queue.length === 0 ? (
              <div className="empty-queue">Queue is Empty</div>
            ) : (
              queue.map((value, index) => (
                <div key={`${value}-${index}`} className={getItemClass(index)}>
                  <div className="queue-value">{value}</div>
                  <div className="queue-index">{index}</div>
                </div>
              ))
            )}
          </div>
          <div className="queue-label rear-label">REAR</div>
        </div>
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-color enqueue-highlight"></div>
          <span>Enqueue (Add to rear)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color dequeue-highlight"></div>
          <span>Dequeue (Remove from front)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color peek-highlight"></div>
          <span>Peek (View front)</span>
        </div>
      </div>

      <div className="algorithm-description">
        <h3>Queue Operations:</h3>
        <div className="operations-grid">
          <div className="operation-item">
            <h4>Enqueue</h4>
            <p>Add an element to the rear of the queue</p>
            <p><strong>Time Complexity:</strong> O(1)</p>
          </div>
          <div className="operation-item">
            <h4>Dequeue</h4>
            <p>Remove and return the front element</p>
            <p><strong>Time Complexity:</strong> O(1)</p>
          </div>
          <div className="operation-item">
            <h4>Peek/Front</h4>
            <p>View the front element without removing it</p>
            <p><strong>Time Complexity:</strong> O(1)</p>
          </div>
          <div className="operation-item">
            <h4>IsEmpty</h4>
            <p>Check if the queue is empty</p>
            <p><strong>Time Complexity:</strong> O(1)</p>
          </div>
        </div>
        
        <div className="complexity-info">
          <h4>Applications of Queue:</h4>
          <ul>
            <li>CPU scheduling and disk scheduling</li>
            <li>Breadth-First Search (BFS) algorithm</li>
            <li>Print queue management</li>
            <li>Buffer for data streams</li>
            <li>Call center phone systems</li>
            <li>Web server request handling</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QueueVisualizer;