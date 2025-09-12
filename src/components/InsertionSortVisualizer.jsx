import React, { useState, useEffect, useCallback } from 'react';
import './BubbleSortVisualizer.css';

const InsertionSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [arraySize, setArraySize] = useState(20);
  const [currentStep, setCurrentStep] = useState(0);
  const [comparingIndices, setComparingIndices] = useState([]);
  const [insertingIndex, setInsertingIndex] = useState(-1);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [currentElement, setCurrentElement] = useState(-1);
  const [steps, setSteps] = useState([]);
  const [currentStepInfo, setCurrentStepInfo] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [showCode, setShowCode] = useState(false);

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

  // Code snippets for Insertion Sort
  const insertionSortCode = {
    javascript: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    
    // Move elements greater than key one position ahead
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    // Insert key at its correct position
    arr[j + 1] = key;
  }
  
  return arr;
}`,
    python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        
        # Move elements greater than key one position ahead
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        # Insert key at its correct position
        arr[j + 1] = key
    
    return arr`,
    java: `public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        
        // Move elements greater than key one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // Insert key at its correct position
        arr[j + 1] = key;
    }
}`,
    cpp: `void insertionSort(vector<int>& arr) {
    for (int i = 1; i < arr.size(); i++) {
        int key = arr[i];
        int j = i - 1;
        
        // Move elements greater than key one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // Insert key at its correct position
        arr[j + 1] = key;
    }
}`,
    csharp: `public static void InsertionSort(int[] arr) {
    for (int i = 1; i < arr.Length; i++) {
        int key = arr[i];
        int j = i - 1;
        
        // Move elements greater than key one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // Insert key at its correct position
        arr[j + 1] = key;
    }
}`
  };

  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: '🟨' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'cpp', name: 'C++', icon: '⚡' },
    { id: 'csharp', name: 'C#', icon: '🔷' }
  ];

  // Generate random array
  const generateArray = useCallback(() => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 300) + 10,
        id: i,
      });
    }
    setArray(newArray);
    resetVisualization();
  }, [arraySize]);

  // Parse custom input array
  const parseCustomArray = () => {
    try {
      const values = customInput
        .split(',')
        .map(v => parseInt(v.trim()))
        .filter(v => !isNaN(v) && v > 0 && v <= 500);
      
      if (values.length === 0) {
        alert('Please enter valid numbers separated by commas (1-500)');
        return;
      }
      
      if (values.length > 50) {
        alert('Maximum 50 elements allowed');
        return;
      }
      
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
    setComparingIndices([]);
    setInsertingIndex(-1);
    setSortedIndices([0]); // First element is considered sorted
    setCurrentElement(-1);
    setSteps([]);
    setCurrentStepInfo('Click "Start" to begin Insertion Sort');
    setIsPlaying(false);
    setIsPaused(false);
  };

  // Generate Insertion Sort steps
  const generateInsertionSortSteps = (arr) => {
    const steps = [];
    const workingArray = arr.map(item => ({ ...item }));
    let comparisons = 0;
    let shifts = 0;

    const record = (type, data) => {
      steps.push({
        type,
        array: workingArray.map(item => ({ ...item })),
        comparisons,
        shifts,
        ...data
      });
    };

    record('start', { 
      info: 'Starting Insertion Sort algorithm. First element is already sorted.',
      sortedIndices: [0]
    });

    for (let i = 1; i < workingArray.length; i++) {
      const key = workingArray[i];
      
      record('select_key', {
        currentElement: i,
        info: `Selecting element ${key.value} at position ${i} to insert into sorted portion`
      });

      let j = i - 1;
      
      while (j >= 0 && workingArray[j].value > key.value) {
        comparisons++;
        
        record('compare', {
          indices: [j, i],
          currentElement: i,
          info: `Comparing ${workingArray[j].value} with key ${key.value}: ${workingArray[j].value} > ${key.value}`
        });

        // Shift element to the right
        shifts++;
        workingArray[j + 1] = workingArray[j];
        
        record('shift', {
          shiftIndex: j + 1,
          currentElement: i,
          info: `Shifting ${workingArray[j].value} one position to the right`
        });

        j--;
      }

      if (j >= 0) {
        comparisons++;
        record('compare_stop', {
          indices: [j, i],
          currentElement: i,
          info: `Comparing ${workingArray[j].value} with key ${key.value}: ${workingArray[j].value} ≤ ${key.value}, stopping`
        });
      }

      // Insert the key at its correct position
      workingArray[j + 1] = key;
      
      record('insert', {
        insertPosition: j + 1,
        currentElement: i,
        info: `Inserting ${key.value} at position ${j + 1}`
      });

      record('iteration_complete', {
        sortedIndices: Array.from({ length: i + 1 }, (_, idx) => idx),
        info: `Iteration ${i} complete. First ${i + 1} elements are now sorted`
      });
    }

    record('complete', { 
      info: `🎉 Insertion Sort completed! Made ${comparisons} comparisons and ${shifts} shifts.`,
      sortedIndices: Array.from({ length: workingArray.length }, (_, idx) => idx)
    });

    return steps;
  };

  // Initialize array on component mount
  useEffect(() => {
    generateArray();
  }, [generateArray]);

  // Animation system
  useEffect(() => {
    if (!isPlaying || isPaused || steps.length === 0) return;

    if (currentStep >= steps.length) {
      setIsPlaying(false);
      return;
    }

    const step = steps[currentStep];
    const baseDelay = 1000;
    const actualDelay = Math.max(100, baseDelay / speed);
    
    const timer = setTimeout(() => {
      switch (step.type) {
        case 'start':
          setSortedIndices(step.sortedIndices || [0]);
          setCurrentStepInfo(step.info);
          break;
          
        case 'select_key':
          setCurrentElement(step.currentElement);
          setComparingIndices([]);
          setInsertingIndex(-1);
          setCurrentStepInfo(step.info);
          break;
          
        case 'compare':
        case 'compare_stop':
          setComparingIndices(step.indices);
          setCurrentElement(step.currentElement);
          setCurrentStepInfo(step.info);
          break;
          
        case 'shift':
          setArray(step.array);
          setInsertingIndex(step.shiftIndex);
          setComparingIndices([]);
          setCurrentStepInfo(step.info);
          break;
          
        case 'insert':
          setArray(step.array);
          setInsertingIndex(step.insertPosition);
          setComparingIndices([]);
          setCurrentStepInfo(step.info);
          break;
          
        case 'iteration_complete':
          setSortedIndices(step.sortedIndices);
          setCurrentElement(-1);
          setInsertingIndex(-1);
          setComparingIndices([]);
          setCurrentStepInfo(step.info);
          break;
          
        case 'complete':
          setSortedIndices(step.sortedIndices);
          setComparingIndices([]);
          setInsertingIndex(-1);
          setCurrentElement(-1);
          setCurrentStepInfo(step.info);
          setIsPlaying(false);
          break;
          
        default:
          setCurrentStepInfo(step.info);
          break;
      }
      
      setCurrentStep(prev => prev + 1);
    }, actualDelay);

    return () => clearTimeout(timer);
  }, [isPlaying, isPaused, currentStep, steps, speed]);

  const startSorting = () => {
    if (steps.length === 0) {
      const insertionSortSteps = generateInsertionSortSteps(array);
      setSteps(insertionSortSteps);
    }
    setIsPlaying(true);
    setIsPaused(false);
  };

  const pauseSorting = () => {
    setIsPaused(!isPaused);
  };

  const stopSorting = () => {
    setIsPlaying(false);
    setIsPaused(false);
  };

  const resetSorting = () => {
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentStep(0);
    setComparingIndices([]);
    setInsertingIndex(-1);
    setSortedIndices([]);
    setCurrentElement(-1);
    setSteps([]);
    generateArray();
  };

  const stepForward = () => {
    if (!isPlaying && steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep];
      
      switch (step.type) {
        case 'start':
          setSortedIndices(step.sortedIndices || [0]);
          break;
        case 'select_key':
          setCurrentElement(step.currentElement);
          setComparingIndices([]);
          setInsertingIndex(-1);
          break;
        case 'compare':
        case 'compare_stop':
          setComparingIndices(step.indices);
          setCurrentElement(step.currentElement);
          break;
        case 'shift':
          setArray(step.array);
          setInsertingIndex(step.shiftIndex);
          setComparingIndices([]);
          break;
        case 'insert':
          setArray(step.array);
          setInsertingIndex(step.insertPosition);
          setComparingIndices([]);
          break;
        case 'iteration_complete':
          setSortedIndices(step.sortedIndices);
          setCurrentElement(-1);
          setInsertingIndex(-1);
          setComparingIndices([]);
          break;
        case 'complete':
          setSortedIndices(step.sortedIndices);
          setComparingIndices([]);
          setInsertingIndex(-1);
          setCurrentElement(-1);
          break;
      }
      
      setCurrentStepInfo(step.info);
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
      
      // Rebuild state up to prevStep
      setComparingIndices([]);
      setInsertingIndex(-1);
      setSortedIndices([0]);
      setCurrentElement(-1);
      
      const step = steps[prevStep - 1];
      if (step) {
        setCurrentStepInfo(step.info);
      }
    }
  };

  const getBarClassName = (index) => {
    let className = 'bar';
    
    if (index === currentElement) {
      className += ' current-element';
    } else if (comparingIndices.includes(index)) {
      className += ' comparing';
    } else if (index === insertingIndex) {
      className += ' swapping';
    } else if (sortedIndices.includes(index)) {
      className += ' sorted';
    }
    
    return className;
  };

  const getBarHeight = (value) => {
    const arrayValues = array.map(item => item.value);
    const arrayMin = Math.min(...arrayValues);
    const arrayMax = Math.max(...arrayValues);
    const minHeight = 20;
    const maxHeight = 250;
    
    if (arrayMin === arrayMax) return minHeight;
    
    const range = arrayMax - arrayMin;
    return minHeight + ((value - arrayMin) / range) * (maxHeight - minHeight);
  };

  return (
    <div className="bubble-sort-visualizer">
      <div className="visualizer-header">
        <h1>Insertion Sort Visualization</h1>
        <p>Watch Insertion Sort build a sorted array one element at a time</p>
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
                    placeholder="Enter numbers separated by commas (e.g., 64,34,25,12,22,11,90)"
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
            onClick={generateArray} 
            disabled={isPlaying}
            className="control-btn generate-btn"
          >
            <span className="btn-icon">🎲</span>
            <span className="btn-text">Generate Random</span>
          </button>
          
          <button 
            onClick={startSorting} 
            disabled={isPlaying && !isPaused}
            className="control-btn start-btn"
          >
            <span className="btn-icon">▶️</span>
            <span className="btn-text">Start Sorting</span>
          </button>
          
          <button 
            onClick={pauseSorting} 
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
            onClick={stopSorting} 
            disabled={!isPlaying}
            className="control-btn stop-btn"
          >
            <span className="btn-icon">⏹️</span>
            <span className="btn-text">Stop</span>
          </button>
          
          <button 
            onClick={resetSorting}
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
                <span className="code-title">Insertion Sort - {languages.find(l => l.id === selectedLanguage)?.name}</span>
                <button 
                  onClick={() => navigator.clipboard.writeText(insertionSortCode[selectedLanguage])}
                  className="copy-btn"
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
              <pre className="code-block">
                <code className={`language-${selectedLanguage}`}>
                  {insertionSortCode[selectedLanguage]}
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
            <span className="stat-label">Comparisons:</span>
            <span className="stat-value">
              {steps.filter(step => step.type === 'compare' || step.type === 'compare_stop').length}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Shifts:</span>
            <span className="stat-value">
              {steps.filter(step => step.type === 'shift').length}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Array Size:</span>
            <span className="stat-value">{array.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Current Speed:</span>
            <span className="stat-value">{speedOptions.find(opt => opt.value === speed)?.label}</span>
          </div>
        </div>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-color current-element"></div>
          <span>Current Key</span>
        </div>
        <div className="legend-item">
          <div className="legend-color comparing"></div>
          <span>Comparing</span>
        </div>
        <div className="legend-item">
          <div className="legend-color swapping"></div>
          <span>Inserting</span>
        </div>
        <div className="legend-item">
          <div className="legend-color sorted"></div>
          <span>Sorted</span>
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
              <li>Best Case: O(n) - array is already sorted</li>
              <li>Average Case: O(n²)</li>
              <li>Worst Case: O(n²) - array is reverse sorted</li>
            </ul>
          </div>
          <div className="complexity-item">
            <strong>Space Complexity:</strong> O(1) - sorts in-place with constant space
          </div>
          <div className="complexity-item">
            <strong>Stability:</strong> Stable - maintains relative order of equal elements
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsertionSortVisualizer;