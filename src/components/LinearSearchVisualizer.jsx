import { useState, useEffect } from 'react';
import './BubbleSortVisualizer.css';

const LinearSearchVisualizer = () => {
  const [array, setArray] = useState([]);
  const [searching, setSearching] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [targetValue, setTargetValue] = useState('');
  const [foundIndex, setFoundIndex] = useState(-1);
  const [searchComplete, setSearchComplete] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const initializeArray = () => {
      const newArray = [];
      for (let i = 0; i < 15; i++) {
        newArray.push(Math.floor(Math.random() * 100) + 1);
      }
      setArray(newArray);
      setCurrentIndex(-1);
      setFoundIndex(-1);
      setSearchComplete(false);
      setComparisons(0);
      setSearching(false);
    };
    initializeArray();
  }, []);

  const generateRandomArray = () => {
    const newArray = [];
    for (let i = 0; i < 15; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 1);
    }
    setArray(newArray);
    resetSearch();
  };

  const resetSearch = () => {
    setCurrentIndex(-1);
    setFoundIndex(-1);
    setSearchComplete(false);
    setComparisons(0);
    setSearching(false);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const linearSearch = async () => {
    if (!targetValue || isNaN(targetValue)) {
      alert('Please enter a valid number to search');
      return;
    }

    const target = parseInt(targetValue);
    setSearching(true);
    resetSearch();
    let compCount = 0;

    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i);
      compCount++;
      setComparisons(compCount);
      
      await sleep(speed);

      if (array[i] === target) {
        setFoundIndex(i);
        setSearchComplete(true);
        setSearching(false);
        setCurrentIndex(-1);
        return;
      }
    }

    // Element not found
    setCurrentIndex(-1);
    setSearchComplete(true);
    setSearching(false);
  };

  const getBarClass = (index) => {
    let classes = 'array-bar';
    
    if (index === currentIndex && searching) {
      classes += ' comparing';
    } else if (index === foundIndex) {
      classes += ' found';
    } else if (searchComplete && foundIndex === -1) {
      classes += ' not-found';
    }
    
    return classes;
  };

  return (
    <div className="visualizer-container">
      <div className="visualizer-header">
        <h1>Linear Search Visualizer</h1>
        <p>Linear Search checks each element sequentially until the target is found or the array ends.</p>
      </div>

      <div className="controls">
        <div className="control-group">
          <button 
            onClick={generateRandomArray} 
            disabled={searching}
            className="btn btn-secondary"
          >
            Generate New Array
          </button>
          
          <div className="search-input">
            <input
              type="number"
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
              placeholder="Enter value to search"
              disabled={searching}
              className="input-field"
            />
            <button 
              onClick={linearSearch} 
              disabled={searching || !targetValue}
              className="btn btn-primary"
            >
              {searching ? 'Searching...' : 'Start Search'}
            </button>
          </div>
        </div>

        <div className="speed-control">
          <label htmlFor="speed">Speed: </label>
          <input
            id="speed"
            type="range"
            min="10"
            max="500"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={searching}
          />
          <span>{speed}ms</span>
        </div>
      </div>

      <div className="algorithm-info">
        <div className="info-item">
          <strong>Target:</strong> {targetValue || 'None'}
        </div>
        <div className="info-item">
          <strong>Comparisons:</strong> {comparisons}
        </div>
        <div className="info-item">
          <strong>Status:</strong> 
          {searching ? ' Searching...' : 
           searchComplete ? (foundIndex !== -1 ? ` Found at index ${foundIndex}` : ' Not found') : 
           ' Ready'}
        </div>
        <div className="info-item">
          <strong>Time Complexity:</strong> O(n)
        </div>
        <div className="info-item">
          <strong>Space Complexity:</strong> O(1)
        </div>
      </div>

      <div className="array-container">
        {array.map((value, index) => (
          <div key={index} className="array-item">
            <div className={getBarClass(index)} style={{ height: `${value * 3}px` }}>
              <span className="array-value">{value}</span>
            </div>
            <div className="array-index">{index}</div>
          </div>
        ))}
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-color comparing"></div>
          <span>Currently Checking</span>
        </div>
        <div className="legend-item">
          <div className="legend-color found"></div>
          <span>Found</span>
        </div>
        <div className="legend-item">
          <div className="legend-color not-found"></div>
          <span>Not Found</span>
        </div>
      </div>

      <div className="algorithm-description">
        <h3>How Linear Search Works:</h3>
        <ol>
          <li>Start from the first element of the array</li>
          <li>Compare the current element with the target value</li>
          <li>If they match, return the index (element found)</li>
          <li>If they don't match, move to the next element</li>
          <li>Repeat until element is found or array ends</li>
          <li>If array ends without finding the element, return "not found"</li>
        </ol>
        
        <div className="complexity-info">
          <h4>Complexity Analysis:</h4>
          <ul>
            <li><strong>Best Case:</strong> O(1) - Element is at the first position</li>
            <li><strong>Average Case:</strong> O(n/2) - Element is in the middle</li>
            <li><strong>Worst Case:</strong> O(n) - Element is at the last position or not present</li>
            <li><strong>Space Complexity:</strong> O(1) - Only uses constant extra space</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LinearSearchVisualizer;