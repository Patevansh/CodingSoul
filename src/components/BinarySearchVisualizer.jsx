import React, { useState, useEffect, useCallback } from 'react';
import './BubbleSortVisualizer.css';

const BinarySearchVisualizer = () => {
  const [array, setArray] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [arraySize, setArraySize] = useState(20);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [currentStepInfo, setCurrentStepInfo] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [showCode, setShowCode] = useState(false);
  
  // Binary search specific state
  const [target, setTarget] = useState('');
  const [lowIndex, setLowIndex] = useState(null);
  const [highIndex, setHighIndex] = useState(null);
  const [midIndex, setMidIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [searchResult, setSearchResult] = useState('');

  // Speed options with labels
  const speedOptions = [
    { value: 0.25, label: '0.25x' },
    { value: 0.5, label: '0.5x' },
    { value: 0.75, label: '0.75x' },
    { value: 1, label: '1x' },
    { value: 1.25, label: '1.25x' },
    { value: 1.5, label: '1.5x' },
    { value: 2, label: '2x' }
  ];

  // Code snippets for Binary Search
  const binarySearchCode = {
    javascript: `function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    
    if (arr[mid] === target) {
      return mid; // Found target
    } else if (arr[mid] < target) {
      low = mid + 1; // Search right half
    } else {
      high = mid - 1; // Search left half
    }
  }
  
  return -1; // Target not found
}`,
    python: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        
        if arr[mid] == target:
            return mid  # Found target
        elif arr[mid] < target:
            low = mid + 1  # Search right half
        else:
            high = mid - 1  # Search left half
    
    return -1  # Target not found`,
    java: `public static int binarySearch(int[] arr, int target) {
    int low = 0;
    int high = arr.length - 1;
    
    while (low <= high) {
        int mid = low + (high - low) / 2;
        
        if (arr[mid] == target) {
            return mid; // Found target
        } else if (arr[mid] < target) {
            low = mid + 1; // Search right half
        } else {
            high = mid - 1; // Search left half
        }
    }
    
    return -1; // Target not found
}`,
    cpp: `int binarySearch(vector<int>& arr, int target) {
    int low = 0;
    int high = arr.size() - 1;
    
    while (low <= high) {
        int mid = low + (high - low) / 2;
        
        if (arr[mid] == target) {
            return mid; // Found target
        } else if (arr[mid] < target) {
            low = mid + 1; // Search right half
        } else {
            high = mid - 1; // Search left half
        }
    }
    
    return -1; // Target not found
}`,
    csharp: `public static int BinarySearch(int[] arr, int target) {
    int low = 0;
    int high = arr.Length - 1;
    
    while (low <= high) {
        int mid = low + (high - low) / 2;
        
        if (arr[mid] == target) {
            return mid; // Found target
        } else if (arr[mid] < target) {
            low = mid + 1; // Search right half
        } else {
            high = mid - 1; // Search left half
        }
    }
    
    return -1; // Target not found
}`
  };

  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: '🟨' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'cpp', name: 'C++', icon: '⚡' },
    { id: 'csharp', name: 'C#', icon: '🔷' }
  ];

  // Generate sorted array
  const generateSortedArray = useCallback((size = 20) => {
    const newArray = [];
    let currentValue = Math.floor(Math.random() * 10) + 5;
    
    for (let i = 0; i < size; i++) {
      newArray.push({
        value: currentValue,
        id: i,
      });
      currentValue += Math.floor(Math.random() * 10) + 1;
    }
    
    setArray(newArray);
    resetVisualization();
  }, []);

  // Parse custom input array (will be sorted automatically)
  const parseCustomArray = () => {
    try {
      const values = customInput
        .split(',')
        .map(v => parseInt(v.trim()))
        .filter(v => !isNaN(v) && v >= 0 && v <= 500);
      
      if (values.length === 0) {
        alert('Please enter valid numbers separated by commas (0-500)');
        return;
      }
      
      if (values.length > 50) {
        alert('Maximum 50 elements allowed');
        return;
      }
      
      // Sort the values for binary search
      values.sort((a, b) => a - b);
      
      const newArray = values.map((value, index) => ({
        value,
        id: index
      }));
      
      setArray(newArray);
      setArraySize(values.length);
      setShowCustomInput(false);
      setCustomInput('');
      resetVisualization();
    } catch {
      alert('Invalid input format. Please enter numbers separated by commas.');
    }
  };

  // Reset visualization state
  const resetVisualization = () => {
    setCurrentStep(0);
    setSteps([]);
    setCurrentStepInfo('Enter a target value and click "Start Search"');
    setIsPlaying(false);
    setIsPaused(false);
    setLowIndex(null);
    setHighIndex(null);
    setMidIndex(null);
    setFoundIndex(null);
    setSearchResult('');
  };

  // Generate binary search steps
  const generateBinarySearchSteps = (arr, targetValue) => {
    const steps = [];
    let low = 0;
    let high = arr.length - 1;
    const targetNum = parseInt(targetValue);

    steps.push({
      type: 'start',
      low,
      high,
      mid: null,
      info: `Starting binary search for ${targetNum} in sorted array`
    });

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const midValue = arr[mid].value;

      steps.push({
        type: 'compare',
        low,
        high,
        mid,
        info: `Checking middle element at index ${mid}: ${midValue}`
      });

      if (midValue === targetNum) {
        steps.push({
          type: 'found',
          low,
          high,
          mid,
          foundIndex: mid,
          info: `🎉 Found ${targetNum} at index ${mid}!`
        });
        return steps;
      } else if (midValue < targetNum) {
        low = mid + 1;
        steps.push({
          type: 'search_right',
          low,
          high,
          mid: null,
          info: `${midValue} < ${targetNum}, searching right half (indices ${low} to ${high})`
        });
      } else {
        high = mid - 1;
        steps.push({
          type: 'search_left',
          low,
          high,
          mid: null,
          info: `${midValue} > ${targetNum}, searching left half (indices ${low} to ${high})`
        });
      }
    }

    steps.push({
      type: 'not_found',
      low,
      high,
      mid: null,
      info: `❌ ${targetNum} not found in the array`
    });

    return steps;
  };

  // Initialize array on component mount
  useEffect(() => {
    generateSortedArray(20);
  }, [generateSortedArray]);

  // Animation system
  useEffect(() => {
    if (!isPlaying || isPaused || steps.length === 0) return;

    if (currentStep >= steps.length) {
      setIsPlaying(false);
      return;
    }

    const step = steps[currentStep];
    const baseDelay = 1500;
    const actualDelay = Math.max(200, baseDelay / speed);
    
    const timer = setTimeout(() => {
      setLowIndex(step.low);
      setHighIndex(step.high);
      setMidIndex(step.mid);
      setCurrentStepInfo(step.info);
      
      switch (step.type) {
        case 'found':
          setFoundIndex(step.foundIndex);
          setSearchResult('found');
          setIsPlaying(false);
          break;
        case 'not_found':
          setSearchResult('not_found');
          setIsPlaying(false);
          break;
      }
      
      setCurrentStep(prev => prev + 1);
    }, actualDelay);

    return () => clearTimeout(timer);
  }, [isPlaying, isPaused, currentStep, steps, speed]);

  const startSearch = () => {
    if (!target || target.trim() === '') {
      alert('Please enter a target value to search for');
      return;
    }
    
    const searchSteps = generateBinarySearchSteps(array, target);
    setSteps(searchSteps);
    setCurrentStep(0);
    setFoundIndex(null);
    setSearchResult('');
    setIsPlaying(true);
    setIsPaused(false);
  };

  const pauseSearch = () => {
    setIsPaused(!isPaused);
  };

  const stopSearch = () => {
    setIsPlaying(false);
    setIsPaused(false);
  };

  const resetSearch = () => {
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentStep(0);
    setLowIndex(null);
    setHighIndex(null);
    setMidIndex(null);
    setFoundIndex(null);
    setSearchResult('');
    setSteps([]);
    generateSortedArray(arraySize);
  };

  const stepForward = () => {
    if (!isPlaying && steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep];
      
      setLowIndex(step.low);
      setHighIndex(step.high);
      setMidIndex(step.mid);
      setCurrentStepInfo(step.info);
      
      switch (step.type) {
        case 'found':
          setFoundIndex(step.foundIndex);
          setSearchResult('found');
          break;
        case 'not_found':
          setSearchResult('not_found');
          break;
      }
      
      setCurrentStep(prev => prev + 1);
    }
  };

  const stepBackward = () => {
    if (!isPlaying && currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      
      if (prevStep === 0) {
        resetVisualization();
        return;
      }
      
      const step = steps[prevStep - 1];
      if (step) {
        setLowIndex(step.low);
        setHighIndex(step.high);
        setMidIndex(step.mid);
        setCurrentStepInfo(step.info);
      }
    }
  };

  const getBarClassName = (index) => {
    let className = 'bar';
    
    if (foundIndex === index) {
      className += ' sorted'; // Green for found
    } else if (midIndex === index) {
      className += ' comparing'; // Yellow for current mid
    } else if (lowIndex !== null && highIndex !== null && index >= lowIndex && index <= highIndex) {
      className += ' swapping'; // Red for search range
    }
    
    return className;
  };

  const getBarHeight = (value) => {
    const arrayValues = array.map(item => item.value);
    const arrayMin = Math.min(...arrayValues);
    const arrayMax = Math.max(...arrayValues);
    const minHeight = 60; // Taller bars for better visibility
    const maxHeight = 200;
    
    if (arrayMin === arrayMax) return minHeight;
    
    const range = arrayMax - arrayMin;
    return minHeight + ((value - arrayMin) / range) * (maxHeight - minHeight);
  };

  return (
    <div className="bubble-sort-visualizer">
      <div className="visualizer-header">
        <h1>Binary Search Visualization</h1>
        <p>Watch how Binary Search efficiently finds elements in a sorted array by dividing the search space</p>
      </div>

      <div className="controls-panel">
        <div className="control-row">
          <div className="control-group">
            <label>Array Size: {arraySize}</label>
            <input
              type="range"
              min="5"
              max="50"
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
              disabled={isPlaying}
              className="slider"
            />
          </div>

          <div className="control-group">
            <label>Speed: {speedOptions.find(opt => opt.value === speed)?.label}</label>
            <div className="speed-selector">
              {speedOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setSpeed(option.value)}
                  className={`speed-btn ${speed === option.value ? 'active' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="control-row">
          <div className="control-group">
            <label>Target Value:</label>
            <input
              type="number"
              placeholder="Enter target value"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              disabled={isPlaying}
              className="custom-input"
              style={{ width: '200px', marginTop: '0.5rem' }}
            />
          </div>
        </div>

        <div className="control-row">
          <div className="array-input-section">
            <button 
              onClick={() => setShowCustomInput(!showCustomInput)}
              className={`custom-array-toggle ${showCustomInput ? 'active' : ''}`}
              disabled={isPlaying}
            >
              <span className="button-icon">
                {showCustomInput ? '📝' : '⚙️'}
              </span>
              <span className="button-text">
                {showCustomInput ? 'Hide Custom Input' : 'Custom Array'}
              </span>
              <span className="button-arrow">
                {showCustomInput ? '▲' : '▼'}
              </span>
            </button>
            
            {showCustomInput && (
              <div className="custom-input-container">
                <div className="input-wrapper">
                  <span className="input-icon">📊</span>
                  <input
                    type="text"
                    placeholder="Enter numbers separated by commas (will be sorted automatically)"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    className="custom-input"
                    disabled={isPlaying}
                    onKeyPress={(e) => e.key === 'Enter' && !isPlaying && customInput.trim() && parseCustomArray()}
                  />
                </div>
                <button 
                  onClick={parseCustomArray}
                  className="apply-btn"
                  disabled={isPlaying || !customInput.trim()}
                >
                  <span className="apply-icon">✓</span>
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="control-buttons">
          <button 
            onClick={() => generateSortedArray(arraySize)} 
            disabled={isPlaying}
            className="control-btn generate-btn"
          >
            <span className="btn-icon">🎲</span>
            <span className="btn-text">Generate Array</span>
          </button>
          
          <button 
            onClick={startSearch} 
            disabled={isPlaying && !isPaused}
            className="control-btn start-btn"
          >
            <span className="btn-icon">🔍</span>
            <span className="btn-text">Start Search</span>
          </button>
          
          <button 
            onClick={pauseSearch} 
            disabled={!isPlaying}
            className="control-btn pause-btn"
          >
            <span className="btn-icon">
              {isPaused ? '▶️' : '⏸️'}
            </span>
            <span className="btn-text">
              {isPaused ? 'Resume' : 'Pause'}
            </span>
          </button>

          <button 
            onClick={stopSearch} 
            disabled={!isPlaying}
            className="control-btn stop-btn"
          >
            <span className="btn-icon">⏹️</span>
            <span className="btn-text">Stop</span>
          </button>
          
          <button 
            onClick={resetSearch}
            className="control-btn reset-btn"
          >
            <span className="btn-icon">🔄</span>
            <span className="btn-text">Reset</span>
          </button>

          <button 
            onClick={stepBackward} 
            disabled={isPlaying || currentStep === 0}
            className="control-btn step-btn"
          >
            <span className="btn-icon">⏮️</span>
            <span className="btn-text">Step Back</span>
          </button>
          
          <button 
            onClick={stepForward} 
            disabled={isPlaying || currentStep >= steps.length}
            className="control-btn step-btn"
          >
            <span className="btn-icon">⏭️</span>
            <span className="btn-text">Step Forward</span>
          </button>
        </div>

        <div className="code-section">
          <div className="code-header">
            <button 
              onClick={() => setShowCode(!showCode)}
              className="btn-code"
            >
              {showCode ? '📖 Hide Code' : '💻 Show Code'}
            </button>
            
            {showCode && (
              <div className="language-selector">
                {languages.map(lang => (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLanguage(lang.id)}
                    className={`lang-btn ${selectedLanguage === lang.id ? 'active' : ''}`}
                  >
                    {lang.icon} {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {showCode && (
            <div className="code-container">
              <div className="code-header-info">
                <span className="code-title">Binary Search - {languages.find(l => l.id === selectedLanguage)?.name}</span>
                <button 
                  onClick={() => navigator.clipboard.writeText(binarySearchCode[selectedLanguage])}
                  className="copy-btn"
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
              <pre className="code-block">
                <code className={`language-${selectedLanguage}`}>
                  {binarySearchCode[selectedLanguage]}
                </code>
              </pre>
            </div>
          )}
        </div>
      </div>

        <div className="info-panel">
          <div className="step-info">
            <strong>Current Action:</strong> {currentStepInfo}
          </div>
          <div className="step-counter">
            <strong>Step:</strong> {currentStep} / {steps.length}
            {steps.length > 0 && (
              <span className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                ></div>
              </span>
            )}
          </div>
        </div>

        <div className="algorithm-stats">
          <div className="stat-item">
            <span className="stat-label">Target:</span>
            <span className="stat-value">{target || 'None'}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Low Index:</span>
            <span className="stat-value">{lowIndex !== null ? lowIndex : '-'}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">High Index:</span>
            <span className="stat-value">{highIndex !== null ? highIndex : '-'}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Mid Index:</span>
            <span className="stat-value">{midIndex !== null ? midIndex : '-'}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Array Size:</span>
            <span className="stat-value">{array.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Result:</span>
            <span className="stat-value">
              {searchResult === 'found' ? `Found at ${foundIndex}` : 
               searchResult === 'not_found' ? 'Not Found' : 'Searching...'}
            </span>
          </div>
        </div>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-color comparing"></div>
          <span>Current Mid</span>
        </div>
        <div className="legend-item">
          <div className="legend-color swapping"></div>
          <span>Search Range</span>
        </div>
        <div className="legend-item">
          <div className="legend-color sorted"></div>
          <span>Found Target</span>
        </div>
      </div>

      <div className="visualization-container">
        <div className="bars-container">
          {array.map((item, index) => (
            <div key={item.id} className="bar-wrapper">
              <div
                className={getBarClassName(index)}
                style={{
                  height: `${getBarHeight(item.value)}px`,
                }}
              >
                <span className="bar-value">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="algorithm-info">
        <h3>Algorithm Details</h3>
        <div className="complexity-info">
          <div className="complexity-item">
            <strong>Time Complexity:</strong>
            <ul>
              <li>Best Case: O(1) - target is at middle</li>
              <li>Average Case: O(log n)</li>
              <li>Worst Case: O(log n) - target at end or not present</li>
            </ul>
          </div>
          <div className="complexity-item">
            <strong>Space Complexity:</strong> O(1) - uses constant extra space
          </div>
          <div className="complexity-item">
            <strong>Requirement:</strong> Array must be sorted for binary search to work correctly
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinarySearchVisualizer;
