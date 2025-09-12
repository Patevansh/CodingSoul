import React, { useState, useEffect, useCallback } from 'react';
import './BubbleSortVisualizer.css';

const SelectionSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [arraySize, setArraySize] = useState(20);
  const [currentStep, setCurrentStep] = useState(0);
  const [comparingIndices, setComparingIndices] = useState([]);
  const [swappingIndices, setSwappingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [minIndex, setMinIndex] = useState(-1);
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

  // Code snippets for Selection Sort
  const selectionSortCode = {
    javascript: `function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    
    // Find the minimum element in the remaining array
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // Swap the minimum element with the first element
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  
  return arr;
}`,
    python: `def selection_sort(arr):
    n = len(arr)
    
    for i in range(n - 1):
        min_index = i
        
        # Find the minimum element in the remaining array
        for j in range(i + 1, n):
            if arr[j] < arr[min_index]:
                min_index = j
        
        # Swap the minimum element with the first element
        if min_index != i:
            arr[i], arr[min_index] = arr[min_index], arr[i]
    
    return arr`,
    java: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        
        // Find the minimum element in the remaining array
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap the minimum element with the first element
        if (minIndex != i) {
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}`,
    cpp: `void selectionSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        
        // Find the minimum element in the remaining array
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap the minimum element with the first element
        if (minIndex != i) {
            swap(arr[i], arr[minIndex]);
        }
    }
}`,
    csharp: `public static void SelectionSort(int[] arr) {
    int n = arr.Length;
    
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        
        // Find the minimum element in the remaining array
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap the minimum element with the first element
        if (minIndex != i) {
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
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
    setSwappingIndices([]);
    setSortedIndices([]);
    setMinIndex(-1);
    setSteps([]);
    setCurrentStepInfo('Click "Start" to begin Selection Sort');
    setIsPlaying(false);
    setIsPaused(false);
  };

  // Generate Selection Sort steps
  const generateSelectionSortSteps = (arr) => {
    const steps = [];
    const workingArray = arr.map(item => ({ ...item }));
    let comparisons = 0;
    let swaps = 0;

    const record = (type, data) => {
      steps.push({
        type,
        array: workingArray.map(item => ({ ...item })),
        comparisons,
        swaps,
        ...data
      });
    };

    record('start', { info: 'Starting Selection Sort algorithm' });

    for (let i = 0; i < workingArray.length - 1; i++) {
      record('iteration_start', {
        currentIndex: i,
        info: `Starting pass ${i + 1}: Finding minimum in unsorted portion`
      });

      let minIndex = i;
      record('set_min', {
        minIndex: i,
        info: `Setting position ${i} as initial minimum with value ${workingArray[i].value}`
      });

      for (let j = i + 1; j < workingArray.length; j++) {
        comparisons++;
        
        record('compare', {
          indices: [j, minIndex],
          minIndex,
          info: `Comparing ${workingArray[j].value} with current minimum ${workingArray[minIndex].value}`
        });

        if (workingArray[j].value < workingArray[minIndex].value) {
          minIndex = j;
          record('new_min', {
            minIndex: j,
            info: `Found new minimum: ${workingArray[j].value} at position ${j}`
          });
        }
      }

      if (minIndex !== i) {
        swaps++;
        record('swap_prepare', {
          indices: [i, minIndex],
          info: `Swapping ${workingArray[i].value} at position ${i} with minimum ${workingArray[minIndex].value} at position ${minIndex}`
        });

        const temp = workingArray[i];
        workingArray[i] = workingArray[minIndex];
        workingArray[minIndex] = temp;

        record('swap_complete', {
          indices: [i, minIndex],
          sortedIndex: i,
          info: `Swapped! Position ${i} now contains ${workingArray[i].value}`
        });
      } else {
        record('no_swap', {
          sortedIndex: i,
          info: `No swap needed. ${workingArray[i].value} is already in correct position`
        });
      }

      record('position_sorted', {
        sortedIndex: i,
        info: `Position ${i} is now sorted with value ${workingArray[i].value}`
      });
    }

    record('complete', { 
      info: `🎉 Selection Sort completed! Made ${comparisons} comparisons and ${swaps} swaps.` 
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
        case 'set_min':
        case 'new_min':
          setMinIndex(step.minIndex);
          setComparingIndices([]);
          setSwappingIndices([]);
          setCurrentStepInfo(step.info);
          break;
          
        case 'compare':
          setComparingIndices(step.indices);
          setMinIndex(step.minIndex);
          setCurrentStepInfo(step.info);
          break;
          
        case 'swap_prepare':
          setSwappingIndices(step.indices);
          setComparingIndices([]);
          setCurrentStepInfo(step.info);
          break;
          
        case 'swap_complete':
          setArray(step.array);
          setSortedIndices(prev => [...prev, step.sortedIndex]);
          setSwappingIndices([]);
          setMinIndex(-1);
          setCurrentStepInfo(step.info);
          break;
          
        case 'no_swap':
        case 'position_sorted':
          setSortedIndices(prev => [...prev, step.sortedIndex]);
          setComparingIndices([]);
          setMinIndex(-1);
          setCurrentStepInfo(step.info);
          break;
          
        case 'complete':
          setSortedIndices(Array.from({ length: array.length }, (_, i) => i));
          setComparingIndices([]);
          setSwappingIndices([]);
          setMinIndex(-1);
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
  }, [isPlaying, isPaused, currentStep, steps, speed, array.length]);

  const startSorting = () => {
    if (steps.length === 0) {
      const selectionSortSteps = generateSelectionSortSteps(array);
      setSteps(selectionSortSteps);
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
    setSwappingIndices([]);
    setSortedIndices([]);
    setMinIndex(-1);
    setSteps([]);
    generateArray();
  };

  const stepForward = () => {
    if (!isPlaying && steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep];
      
      switch (step.type) {
        case 'set_min':
        case 'new_min':
          setMinIndex(step.minIndex);
          setComparingIndices([]);
          setSwappingIndices([]);
          break;
        case 'compare':
          setComparingIndices(step.indices);
          setMinIndex(step.minIndex);
          break;
        case 'swap_prepare':
          setSwappingIndices(step.indices);
          setComparingIndices([]);
          break;
        case 'swap_complete':
          setArray(step.array);
          setSortedIndices(prev => [...prev, step.sortedIndex]);
          setSwappingIndices([]);
          setMinIndex(-1);
          break;
        case 'no_swap':
        case 'position_sorted':
          setSortedIndices(prev => [...prev, step.sortedIndex]);
          setComparingIndices([]);
          setMinIndex(-1);
          break;
        case 'complete':
          setSortedIndices(Array.from({ length: array.length }, (_, i) => i));
          setComparingIndices([]);
          setSwappingIndices([]);
          setMinIndex(-1);
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
      setSwappingIndices([]);
      setSortedIndices([]);
      setMinIndex(-1);
      
      const step = steps[prevStep - 1];
      if (step) {
        setCurrentStepInfo(step.info);
      }
    }
  };

  const getBarClassName = (index) => {
    let className = 'bar';
    
    if (swappingIndices.includes(index)) {
      className += ' swapping';
    } else if (comparingIndices.includes(index)) {
      className += ' comparing';
    } else if (index === minIndex) {
      className += ' minimum';
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
        <h1>Selection Sort Visualization</h1>
        <p>Watch Selection Sort find the minimum element and place it in its correct position</p>
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
                <span className="code-title">Selection Sort - {languages.find(l => l.id === selectedLanguage)?.name}</span>
                <button 
                  onClick={() => navigator.clipboard.writeText(selectionSortCode[selectedLanguage])}
                  className="copy-btn"
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
              <pre className="code-block">
                <code className={`language-${selectedLanguage}`}>
                  {selectionSortCode[selectedLanguage]}
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
              {steps.filter(step => step.type === 'compare').length}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Swaps:</span>
            <span className="stat-value">
              {steps.filter(step => step.type === 'swap_complete').length}
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
          <div className="legend-color comparing"></div>
          <span>Comparing</span>
        </div>
        <div className="legend-item">
          <div className="legend-color minimum"></div>
          <span>Current Minimum</span>
        </div>
        <div className="legend-item">
          <div className="legend-color swapping"></div>
          <span>Swapping</span>
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
              <li>Best Case: O(n²) - always needs to find minimum</li>
              <li>Average Case: O(n²)</li>
              <li>Worst Case: O(n²) - consistent performance</li>
            </ul>
          </div>
          <div className="complexity-item">
            <strong>Space Complexity:</strong> O(1) - sorts in-place with constant space
          </div>
          <div className="complexity-item">
            <strong>Stability:</strong> Not stable - may change relative order of equal elements
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionSortVisualizer;