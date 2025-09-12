import React, { useState, useEffect, useCallback } from 'react';
import './BubbleSortVisualizer.css';

const MergeSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [arraySize, setArraySize] = useState(12); // Smaller default for better visualization
  const [currentStep, setCurrentStep] = useState(0);
  const [comparingIndices, setComparingIndices] = useState([]);
  const [mergingIndices, setMergingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [dividingIndices, setDividingIndices] = useState([]); // New state for showing divisions
  const [steps, setSteps] = useState([]);
  const [currentStepInfo, setCurrentStepInfo] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [showCode, setShowCode] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(''); // 'divide' or 'merge'

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

  // Code snippets for Merge Sort
  const mergeSortCode = {
    javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
    java: `public static void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        
        merge(arr, left, mid, right);
    }
}

private static void merge(int[] arr, int left, int mid, int right) {
    int[] temp = new int[right - left + 1];
    int i = left, j = mid + 1, k = 0;
    
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }
    
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    
    for (i = left; i <= right; i++) {
        arr[i] = temp[i - left];
    }
}`,
    cpp: `void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        
        merge(arr, left, mid, right);
    }
}

void merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> temp(right - left + 1);
    int i = left, j = mid + 1, k = 0;
    
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }
    
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    
    for (i = left; i <= right; i++) {
        arr[i] = temp[i - left];
    }
}`,
    csharp: `public static void MergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        
        MergeSort(arr, left, mid);
        MergeSort(arr, mid + 1, right);
        
        Merge(arr, left, mid, right);
    }
}

private static void Merge(int[] arr, int left, int mid, int right) {
    int[] temp = new int[right - left + 1];
    int i = left, j = mid + 1, k = 0;
    
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }
    
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    
    for (i = left; i <= right; i++) {
        arr[i] = temp[i - left];
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
    setMergingIndices([]);
    setDividingIndices([]);
    setSortedIndices([]);
    setSteps([]);
    setCurrentPhase('');
    setCurrentStepInfo('Click "Start" to begin Merge Sort - See how arrays are divided and then merged!');
    setIsPlaying(false);
    setIsPaused(false);
  };

  // Generate Merge Sort steps with enhanced divide and conquer visualization
  const generateMergeSortSteps = (arr) => {
    const steps = [];
    const workingArray = arr.map(item => ({ ...item }));

    const record = (type, data) => {
      steps.push({
        type,
        array: workingArray.map(item => ({ ...item })),
        ...data
      });
    };

    const merge = (left, mid, right) => {
      const temp = [];
      let i = left, j = mid + 1;
      const leftSubarray = workingArray.slice(left, mid + 1);
      const rightSubarray = workingArray.slice(mid + 1, right + 1);

      record('merge_start', {
        indices: [left, right],
        mergingRanges: [[left, mid], [mid + 1, right]],
        leftSubarray: leftSubarray.map(item => item.value),
        rightSubarray: rightSubarray.map(item => item.value),
        phase: 'merge',
        info: `🔀 MERGING: Left [${leftSubarray.map(item => item.value).join(',')}] + Right [${rightSubarray.map(item => item.value).join(',')}]`
      });

      // Show the merging process step by step
      let tempIndex = 0;
      while (i <= mid && j <= right) {
        record('compare', {
          indices: [i, j],
          mergingRanges: [[left, mid], [mid + 1, right]],
          phase: 'merge',
          info: `📊 Comparing ${workingArray[i].value} (left) vs ${workingArray[j].value} (right) → ${workingArray[i].value <= workingArray[j].value ? 'Take left' : 'Take right'}`
        });

        if (workingArray[i].value <= workingArray[j].value) {
          temp.push({ ...workingArray[i], tempIndex });
          record('merge_take', {
            indices: [i],
            takenValue: workingArray[i].value,
            tempIndex,
            phase: 'merge',
            info: `✅ Taking ${workingArray[i].value} from left subarray`
          });
          i++;
        } else {
          temp.push({ ...workingArray[j], tempIndex });
          record('merge_take', {
            indices: [j],
            takenValue: workingArray[j].value,
            tempIndex,
            phase: 'merge',
            info: `✅ Taking ${workingArray[j].value} from right subarray`
          });
          j++;
        }
        tempIndex++;
      }

      // Copy remaining elements from left subarray
      while (i <= mid) {
        temp.push({ ...workingArray[i], tempIndex });
        record('merge_take', {
          indices: [i],
          takenValue: workingArray[i].value,
          tempIndex,
          phase: 'merge',
          info: `✅ Taking remaining ${workingArray[i].value} from left subarray`
        });
        i++;
        tempIndex++;
      }

      // Copy remaining elements from right subarray
      while (j <= right) {
        temp.push({ ...workingArray[j], tempIndex });
        record('merge_take', {
          indices: [j],
          takenValue: workingArray[j].value,
          tempIndex,
          phase: 'merge',
          info: `✅ Taking remaining ${workingArray[j].value} from right subarray`
        });
        j++;
        tempIndex++;
      }

      // Copy back to original array
      for (let k = 0; k < temp.length; k++) {
        workingArray[left + k] = { ...temp[k], id: left + k };
      }

      record('merge_complete', {
        indices: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
        mergedArray: temp.map(item => item.value),
        phase: 'merge',
        info: `🎉 MERGED: [${temp.map(item => item.value).join(',')}] → Sorted subarray complete!`
      });
    };

    const mergeSort = (left, right, depth = 0) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        // Record the divide step
        record('divide', {
          indices: [left, mid, right],
          dividingRanges: [[left, mid], [mid + 1, right]],
          leftSubarray: workingArray.slice(left, mid + 1).map(item => item.value),
          rightSubarray: workingArray.slice(mid + 1, right + 1).map(item => item.value),
          depth,
          phase: 'divide',
          info: `🔪 DIVIDE: [${workingArray.slice(left, right + 1).map(item => item.value).join(',')}] → Left: [${workingArray.slice(left, mid + 1).map(item => item.value).join(',')}] | Right: [${workingArray.slice(mid + 1, right + 1).map(item => item.value).join(',')}]`
        });

        // Add to merge tree for future enhancement
        // mergeTreeLevels.push({
        //   level: depth,
        //   ranges: [[left, mid], [mid + 1, right]],
        //   type: 'divide'
        // });

        // Recursively sort left and right halves
        mergeSort(left, mid, depth + 1);
        mergeSort(mid + 1, right, depth + 1);
        
        // Merge the sorted halves
        merge(left, mid, right);
      } else {
        // Base case: single element (already sorted)
        record('base_case', {
          indices: [left],
          phase: 'divide',
          info: `📍 Base case: [${workingArray[left].value}] is already sorted (single element)`
        });
      }
    };

    record('start', { 
      phase: 'divide',
      info: '🚀 Starting Merge Sort: First we DIVIDE the array into smaller pieces...' 
    });
    
    mergeSort(0, workingArray.length - 1);
    
    record('complete', { 
      phase: 'complete',
      info: '🎉 Merge Sort completed! The array has been fully sorted using divide-and-conquer strategy!' 
    });

    return steps;
  };

  // Initialize array on component mount
  useEffect(() => {
    generateArray();
  }, [generateArray]);

  // Animation system with enhanced merge sort visualization
  useEffect(() => {
    if (!isPlaying || isPaused || steps.length === 0) return;

    if (currentStep >= steps.length) {
      setIsPlaying(false);
      return;
    }

    const step = steps[currentStep];
    const baseDelay = 1500; // Slightly longer to appreciate the divide and merge phases
    const actualDelay = Math.max(200, baseDelay / speed);
    
    const timer = setTimeout(() => {
      switch (step.type) {
        case 'start':
          setCurrentStepInfo(step.info);
          setCurrentPhase(step.phase);
          break;
          
        case 'divide':
          setDividingIndices(step.dividingRanges || []);
          setComparingIndices([]);
          setMergingIndices([]);
          setCurrentStepInfo(step.info);
          setCurrentPhase(step.phase);
          break;
          
        case 'base_case':
          setDividingIndices([]);
          setComparingIndices([]);
          setMergingIndices([]);
          setCurrentStepInfo(step.info);
          setCurrentPhase(step.phase);
          break;
          
        case 'merge_start':
          setMergingIndices(step.mergingRanges || []);
          setDividingIndices([]);
          setComparingIndices([]);
          setCurrentStepInfo(step.info);
          setCurrentPhase(step.phase);
          break;
          
        case 'compare':
          setComparingIndices(step.indices);
          setCurrentStepInfo(step.info);
          setCurrentPhase(step.phase);
          break;
          
        case 'merge_take':
          // Highlight the element being taken
          setComparingIndices(step.indices);
          setCurrentStepInfo(step.info);
          setCurrentPhase(step.phase);
          break;
          
        case 'merge_complete':
          setSortedIndices(prev => [...new Set([...prev, ...step.indices])]);
          setArray(step.array);
          setMergingIndices([]);
          setComparingIndices([]);
          setDividingIndices([]);
          setCurrentStepInfo(step.info);
          setCurrentPhase(step.phase);
          break;
          
        case 'complete':
          setComparingIndices([]);
          setMergingIndices([]);
          setDividingIndices([]);
          setSortedIndices(array.map((_, index) => index));
          setCurrentStepInfo(step.info);
          setCurrentPhase(step.phase);
          setIsPlaying(false);
          break;
          
        default:
          setCurrentStepInfo(step.info);
          break;
      }
      
      setCurrentStep(prev => prev + 1);
    }, actualDelay);

    return () => clearTimeout(timer);
  }, [isPlaying, isPaused, currentStep, steps, speed, array]);

  const startSorting = () => {
    if (steps.length === 0) {
      const mergeSortSteps = generateMergeSortSteps(array);
      setSteps(mergeSortSteps);
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
    setMergingIndices([]);
    setSortedIndices([]);
    setSteps([]);
    generateArray();
  };

  const stepForward = () => {
    if (!isPlaying && steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep];
      
      switch (step.type) {
        case 'compare':
          setComparingIndices(step.indices);
          setMergingIndices([]);
          break;
        case 'merge_start':
          setMergingIndices(step.indices);
          setComparingIndices([]);
          break;
        case 'merge_complete':
          setSortedIndices(prev => [...new Set([...prev, ...step.indices])]);
          setArray(step.array);
          setMergingIndices([]);
          setComparingIndices([]);
          break;
        case 'complete':
          setComparingIndices([]);
          setMergingIndices([]);
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
      setMergingIndices([]);
      setSortedIndices([]);
      
      const step = steps[prevStep - 1];
      if (step) {
        setCurrentStepInfo(step.info);
      }
    }
  };

  const getBarClassName = (index) => {
    let className = 'bar';
    
    // Check for divide phase highlighting
    let inDivideRange = false;
    dividingIndices.forEach(range => {
      if (Array.isArray(range) && range.length === 2) {
        if (index >= range[0] && index <= range[1]) {
          inDivideRange = true;
        }
      }
    });
    
    // Check for merge phase highlighting
    let inMergeRange = false;
    mergingIndices.forEach(range => {
      if (Array.isArray(range) && range.length === 2) {
        if (index >= range[0] && index <= range[1]) {
          inMergeRange = true;
        }
      }
    });
    
    if (comparingIndices.includes(index)) {
      className += ' comparing';
    } else if (inMergeRange) {
      className += ' merging';
    } else if (inDivideRange) {
      className += ' dividing';
    } else if (sortedIndices.includes(index)) {
      className += ' sorted';
    }
    
    // Add phase-specific classes for better visual distinction
    if (currentPhase === 'divide') {
      className += ' divide-phase';
    } else if (currentPhase === 'merge') {
      className += ' merge-phase';
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
        <h1>Merge Sort Visualization</h1>
        <p>Watch how Merge Sort uses divide-and-conquer to efficiently sort arrays</p>
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
                <span className="code-title">Merge Sort - {languages.find(l => l.id === selectedLanguage)?.name}</span>
                <button 
                  onClick={() => navigator.clipboard.writeText(mergeSortCode[selectedLanguage])}
                  className="copy-btn"
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
              <pre className="code-block">
                <code className={`language-${selectedLanguage}`}>
                  {mergeSortCode[selectedLanguage]}
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
            <span className="stat-label">Merges:</span>
            <span className="stat-value">
              {steps.filter(step => step.type === 'merge_complete').length}
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
          <span>Comparing Elements</span>
        </div>
        <div className="legend-item">
          <div className="legend-color dividing"></div>
          <span>Dividing Phase</span>
        </div>
        <div className="legend-item">
          <div className="legend-color merging"></div>
          <span>Merging Phase</span>
        </div>
        <div className="legend-item">
          <div className="legend-color sorted"></div>
          <span>Sorted</span>
        </div>
      </div>

      {/* Phase indicator */}
      {currentPhase && (
        <div className="phase-indicator">
          <div className={`phase-badge ${currentPhase}`}>
            {currentPhase === 'divide' && '🔪 DIVIDE PHASE'}
            {currentPhase === 'merge' && '🔀 MERGE PHASE'}
            {currentPhase === 'complete' && '🎉 COMPLETED'}
          </div>
        </div>
      )}

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
              <li>Best Case: O(n log n) - always divides and merges</li>
              <li>Average Case: O(n log n)</li>
              <li>Worst Case: O(n log n) - consistent performance</li>
            </ul>
          </div>
          <div className="complexity-item">
            <strong>Space Complexity:</strong> O(n) - requires additional space for temporary arrays
          </div>
          <div className="complexity-item">
            <strong>Stability:</strong> Stable - maintains relative order of equal elements
          </div>
        </div>
      </div>
    </div>
  );
};

export default MergeSortVisualizer;