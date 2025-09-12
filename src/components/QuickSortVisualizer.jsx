import React, { useState, useEffect, useCallback } from 'react';
import './BubbleSortVisualizer.css';

const QuickSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [arraySize, setArraySize] = useState(20);
  const [currentStep, setCurrentStep] = useState(0);
  const [comparingIndices, setComparingIndices] = useState([]);
  const [swappingIndices, setSwappingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [pivotIndex, setPivotIndex] = useState(null);
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

  // Code snippets for Quick Sort
  const quickSortCode = {
    javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
    python: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        pivot_index = partition(arr, low, high)
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)
    
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
    java: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    
    return i + 1;
}`,
    cpp: `void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    
    swap(arr[i + 1], arr[high]);
    return i + 1;
}`,
    csharp: `public static void QuickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pivotIndex = Partition(arr, low, high);
        QuickSort(arr, low, pivotIndex - 1);
        QuickSort(arr, pivotIndex + 1, high);
    }
}

private static int Partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    
    int temp2 = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp2;
    
    return i + 1;
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
    setPivotIndex(null);
    setSteps([]);
    setCurrentStepInfo('Click "Start" to begin Quick Sort');
    setIsPlaying(false);
    setIsPaused(false);
  };

  // Generate Quick Sort steps
  const generateQuickSortSteps = (arr) => {
    const steps = [];
    const workingArray = arr.map(item => ({ ...item }));

    const record = (type, data) => {
      steps.push({
        type,
        array: workingArray.map(item => ({ ...item })),
        ...data
      });
    };

    const swap = (i, j) => {
      if (i !== j) {
        [workingArray[i], workingArray[j]] = [workingArray[j], workingArray[i]];
        record('swap', {
          indices: [i, j],
          info: `Swapped ${workingArray[i].value} and ${workingArray[j].value}`
        });
      }
    };

    const partition = (low, high) => {
      const pivotIndex = high;
      const pivotValue = workingArray[pivotIndex].value;
      
      record('pivot', {
        pivotIndex,
        info: `Selected pivot: ${pivotValue} at position ${pivotIndex}`
      });

      let i = low - 1;

      for (let j = low; j < high; j++) {
        record('compare', {
          indices: [j, pivotIndex],
          info: `Comparing ${workingArray[j].value} with pivot ${pivotValue}`
        });

        if (workingArray[j].value <= pivotValue) {
          i++;
          swap(i, j);
        }
      }

      swap(i + 1, high);
      
      record('partitioned', {
        partitionIndex: i + 1,
        info: `Pivot ${pivotValue} is now in its correct position at index ${i + 1}`
      });

      return i + 1;
    };

    const quickSort = (low, high) => {
      if (low < high) {
        const partitionIndex = partition(low, high);
        quickSort(low, partitionIndex - 1);
        quickSort(partitionIndex + 1, high);
      }
    };

    record('start', { info: 'Starting Quick Sort algorithm' });
    quickSort(0, workingArray.length - 1);
    record('complete', { info: '🎉 Quick Sort completed! All elements are sorted.' });

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
        case 'compare':
          setComparingIndices(step.indices);
          setSwappingIndices([]);
          setPivotIndex(null);
          setCurrentStepInfo(step.info);
          break;
          
        case 'swap':
          setSwappingIndices(step.indices);
          setComparingIndices([]);
          setArray(step.array);
          setCurrentStepInfo(step.info);
          break;
          
        case 'pivot':
          setPivotIndex(step.pivotIndex);
          setComparingIndices([]);
          setSwappingIndices([]);
          setCurrentStepInfo(step.info);
          break;
          
        case 'partitioned':
          setSortedIndices(prev => [...prev, step.partitionIndex]);
          setPivotIndex(null);
          setComparingIndices([]);
          setSwappingIndices([]);
          setCurrentStepInfo(step.info);
          break;
          
        case 'complete':
          setComparingIndices([]);
          setSwappingIndices([]);
          setPivotIndex(null);
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
      const quickSortSteps = generateQuickSortSteps(array);
      setSteps(quickSortSteps);
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
    setPivotIndex(null);
    setSteps([]);
    generateArray();
  };

  const stepForward = () => {
    if (!isPlaying && steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep];
      
      switch (step.type) {
        case 'compare':
          setComparingIndices(step.indices);
          setSwappingIndices([]);
          setPivotIndex(null);
          break;
        case 'swap':
          setSwappingIndices(step.indices);
          setComparingIndices([]);
          setArray(step.array);
          break;
        case 'pivot':
          setPivotIndex(step.pivotIndex);
          setComparingIndices([]);
          setSwappingIndices([]);
          break;
        case 'partitioned':
          setSortedIndices(prev => [...prev, step.partitionIndex]);
          setPivotIndex(null);
          setComparingIndices([]);
          setSwappingIndices([]);
          break;
        case 'complete':
          setComparingIndices([]);
          setSwappingIndices([]);
          setPivotIndex(null);
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
      setPivotIndex(null);
      
      const step = steps[prevStep - 1];
      if (step) {
        setCurrentStepInfo(step.info);
      }
    }
  };

  const getBarClassName = (index) => {
    let className = 'bar';
    
    if (comparingIndices.includes(index)) {
      className += ' comparing';
    } else if (swappingIndices.includes(index)) {
      className += ' swapping';
    } else if (pivotIndex === index) {
      className += ' comparing'; // Use comparing style for pivot
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
        <h1>Quick Sort Visualization</h1>
        <p>Watch how Quick Sort partitions the array around pivot elements for efficient sorting</p>
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
                <span className="code-title">Quick Sort - {languages.find(l => l.id === selectedLanguage)?.name}</span>
                <button 
                  onClick={() => navigator.clipboard.writeText(quickSortCode[selectedLanguage])}
                  className="copy-btn"
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
              <pre className="code-block">
                <code className={`language-${selectedLanguage}`}>
                  {quickSortCode[selectedLanguage]}
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
        </div>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-color comparing"></div>
          <span>Comparing/Pivot</span>
        </div>
        <div className="legend-item">
          <div className="legend-color swapping"></div>
          <span>Swapping</span>
        </div>
        <div className="legend-item">
          <div className="legend-color sorted"></div>
          <span>Partitioned</span>
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
              <li>Best Case: O(n log n) - when pivot divides array evenly</li>
              <li>Average Case: O(n log n)</li>
              <li>Worst Case: O(n²) - when pivot is always smallest/largest</li>
            </ul>
          </div>
          <div className="complexity-item">
            <strong>Space Complexity:</strong> O(log n) - recursion stack space
          </div>
          <div className="complexity-item">
            <strong>Stability:</strong> Unstable - may change relative order of equal elements
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickSortVisualizer;
