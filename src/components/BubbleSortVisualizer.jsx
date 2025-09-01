import React, { useState, useEffect, useCallback } from 'react';
import './BubbleSortVisualizer.css';

const BubbleSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1); // Speed multiplier: 0.25x to 2x
  const [arraySize, setArraySize] = useState(20);
  const [currentStep, setCurrentStep] = useState(0);
  const [comparingIndices, setComparingIndices] = useState([]);
  const [swappingIndices, setSwappingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStepInfo, setCurrentStepInfo] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [codeSnippets, setCodeSnippets] = useState({});
  const [showCode, setShowCode] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('idle'); // idle, comparing, swapping, sorted

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

  // Code snippets for different languages
  const bubbleSortCode = {
    javascript: `function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  return arr;
}`,
    python: `def bubble_sort(arr):
    n = len(arr)
    
    for i in range(n - 1):
        for j in range(n - i - 1):
            # Compare adjacent elements
            if arr[j] > arr[j + 1]:
                # Swap elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    
    return arr`,
    java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
    cpp: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,
    csharp: `public static void BubbleSort(int[] arr) {
    int n = arr.Length;
    
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
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
    } catch (error) {
      alert('Invalid input format. Please enter numbers separated by commas.');
    }
  };

  // Reset visualization state
  const resetVisualization = () => {
    setCurrentStep(0);
    setComparingIndices([]);
    setSwappingIndices([]);
    setSortedIndices([]);
    setSteps([]);
    setCurrentStepInfo('Click "Start" to begin sorting');
    setIsPlaying(false);
    setIsPaused(false);
    setAnimationPhase('idle');
  };

  // Optimized bubble sort steps with merged operations
  const generateBubbleSortSteps = (arr) => {
    const steps = [];
    const workingArray = arr.map(item => ({ ...item })); // Deep copy
    const n = workingArray.length;

    for (let i = 0; i < n - 1; i++) {
      let hasSwapped = false;
      
      for (let j = 0; j < n - i - 1; j++) {
        // Compare step
        steps.push({
          type: 'compare',
          indices: [j, j + 1],
          array: workingArray.map(item => ({ ...item })),
          info: `Pass ${i + 1}: Comparing ${workingArray[j].value} and ${workingArray[j + 1].value}`,
          pass: i + 1,
          comparison: j + 1,
        });

        if (workingArray[j].value > workingArray[j + 1].value) {
          // Swap step (includes the actual swap and array update)
          [workingArray[j], workingArray[j + 1]] = [workingArray[j + 1], workingArray[j]];
          hasSwapped = true;
          
          steps.push({
            type: 'swap',
            indices: [j, j + 1],
            array: workingArray.map(item => ({ ...item })),
            info: `Swapped ${workingArray[j].value} and ${workingArray[j + 1].value}`,
            pass: i + 1,
            comparison: j + 1,
          });
        }
      }
      
      // Mark element as sorted
      steps.push({
        type: 'sorted',
        indices: [n - i - 1],
        array: workingArray.map(item => ({ ...item })),
        info: `Position ${n - i - 1}: ${workingArray[n - i - 1].value} is now sorted`,
        pass: i + 1,
        sortedCount: i + 1,
      });

      // Early termination optimization
      if (!hasSwapped) {
        // Mark all remaining elements as sorted
        for (let k = 0; k < n - i - 1; k++) {
          if (!steps.some(step => step.type === 'sorted' && step.indices.includes(k))) {
            steps.push({
              type: 'sorted',
              indices: [k],
              array: workingArray.map(item => ({ ...item })),
              info: `Already sorted: ${workingArray[k].value} is in correct position`,
              pass: i + 1,
              sortedCount: n,
            });
          }
        }
        break;
      }
    }

    // Final completion step
    steps.push({
      type: 'complete',
      indices: [],
      array: workingArray.map(item => ({ ...item })),
      info: '🎉 Sorting completed! All elements are in their correct positions.',
      pass: 'final',
      sortedCount: n,
    });

    return steps;
  };

  // Initialize array on component mount
  useEffect(() => {
    generateArray();
  }, [generateArray]);

  // Fixed animation system with proper speed control
  useEffect(() => {
    if (!isPlaying || isPaused || steps.length === 0) return;

    if (currentStep >= steps.length) {
      setIsPlaying(false);
      setAnimationPhase('completed');
      return;
    }

    const step = steps[currentStep];
    const baseDelay = 1000; // Base delay in milliseconds
    const actualDelay = Math.max(100, baseDelay / speed); // Apply speed multiplier
    
    const timer = setTimeout(() => {
      switch (step.type) {
        case 'compare':
          setAnimationPhase('comparing');
          setComparingIndices(step.indices);
          setSwappingIndices([]);
          setCurrentStepInfo(step.info);
          break;
          
        case 'swap':
          setAnimationPhase('swapping');
          setSwappingIndices(step.indices);
          setComparingIndices([]);
          setArray(step.array); // Update array immediately with swap
          setCurrentStepInfo(step.info);
          break;
          
        case 'sorted':
          setAnimationPhase('sorted');
          setSortedIndices(prev => {
            const newSorted = [...prev, ...step.indices];
            return [...new Set(newSorted)]; // Remove duplicates
          });
          setComparingIndices([]);
          setSwappingIndices([]);
          setCurrentStepInfo(step.info);
          break;
          
        case 'complete':
          setAnimationPhase('completed');
          setComparingIndices([]);
          setSwappingIndices([]);
          setCurrentStepInfo(step.info);
          setIsPlaying(false);
          break;
      }
      
      setCurrentStep(prev => prev + 1);
    }, actualDelay);

    return () => clearTimeout(timer);
  }, [isPlaying, isPaused, currentStep, steps, speed]);

  const startSorting = () => {
    if (steps.length === 0) {
      const bubbleSortSteps = generateBubbleSortSteps(array);
      setSteps(bubbleSortSteps);
    }
    setIsPlaying(true);
    setIsPaused(false);
    setAnimationPhase('idle');
  };

  const pauseSorting = () => {
    setIsPaused(!isPaused);
  };

  const stopSorting = () => {
    setIsPlaying(false);
    setIsPaused(false);
    setAnimationPhase('idle');
  };

  const resetSorting = () => {
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentStep(0);
    setComparingIndices([]);
    setSwappingIndices([]);
    setSortedIndices([]);
    setSteps([]);
    setAnimationPhase('idle');
    generateArray();
  };

  const stepForward = () => {
    if (!isPlaying && steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep];
      
      switch (step.type) {
        case 'compare':
          setComparingIndices(step.indices);
          setSwappingIndices([]);
          setAnimationPhase('comparing');
          break;
        case 'swap':
          setSwappingIndices(step.indices);
          setComparingIndices([]);
          setArray(step.array);
          setAnimationPhase('swapping');
          break;
        case 'sorted':
          setSortedIndices(prev => {
            const newSorted = [...prev, ...step.indices];
            return [...new Set(newSorted)];
          });
          setComparingIndices([]);
          setSwappingIndices([]);
          setAnimationPhase('sorted');
          break;
        case 'complete':
          setComparingIndices([]);
          setSwappingIndices([]);
          setAnimationPhase('completed');
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
        // Reset to initial state
        resetVisualization();
        return;
      }
      
      // Rebuild state from the beginning up to prevStep
      const rebuiltArray = [...array];
      const rebuiltSorted = [];
      
      // Apply all steps up to prevStep to rebuild accurate state
      for (let i = 0; i < prevStep; i++) {
        const step = steps[i];
        if (step.type === 'swap') {
          // Array is already updated in the step
          setArray(step.array);
        }
        if (step.type === 'sorted') {
          rebuiltSorted.push(...step.indices);
        }
      }
      
      setSortedIndices([...new Set(rebuiltSorted)]);
      setComparingIndices([]);
      setSwappingIndices([]);
      setAnimationPhase('idle');
      
      if (steps[prevStep - 1]) {
        setCurrentStepInfo(steps[prevStep - 1].info);
      } else {
        setCurrentStepInfo('Ready to start sorting');
      }
    }
  };

  const getBarClassName = (index) => {
    let className = 'bar';
    if (comparingIndices.includes(index)) className += ' comparing';
    if (swappingIndices.includes(index)) className += ' swapping';
    if (sortedIndices.includes(index)) className += ' sorted';
    return className;
  };

  const getBarHeight = (value) => {
    const maxHeight = 250;
    const minHeight = 20;
    const arrayMax = Math.max(...array.map(item => item.value));
    const arrayMin = Math.min(...array.map(item => item.value));
    const range = arrayMax - arrayMin;
    
    if (range === 0) return maxHeight / 2; // If all values are same
    
    return minHeight + ((value - arrayMin) / range) * (maxHeight - minHeight);
  };

  return (
    <div className="bubble-sort-visualizer">
      <div className="visualizer-header">
        <h1>Bubble Sort Visualization</h1>
        <p>Watch how bubble sort compares adjacent elements and swaps them if they're in the wrong order</p>
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
                <span className="code-title">Bubble Sort - {languages.find(l => l.id === selectedLanguage)?.name}</span>
                <button 
                  onClick={() => navigator.clipboard.writeText(bubbleSortCode[selectedLanguage])}
                  className="copy-btn"
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
              <pre className="code-block">
                <code className={`language-${selectedLanguage}`}>
                  {bubbleSortCode[selectedLanguage]}
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
              {steps.filter(step => step.type === 'swap').length}
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
        </div>      <div className="legend">
        <div className="legend-item">
          <div className="legend-color comparing"></div>
          <span>Comparing</span>
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
              <li>Best Case: O(n) - when array is already sorted</li>
              <li>Average Case: O(n²)</li>
              <li>Worst Case: O(n²) - when array is reverse sorted</li>
            </ul>
          </div>
          <div className="complexity-item">
            <strong>Space Complexity:</strong> O(1) - only uses constant extra space
          </div>
          <div className="complexity-item">
            <strong>Stability:</strong> Stable - maintains relative order of equal elements
          </div>
        </div>
      </div>
    </div>
  );
};

export default BubbleSortVisualizer;
