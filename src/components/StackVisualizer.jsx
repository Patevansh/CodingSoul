import React, { useState, useEffect } from 'react';
import './BubbleSortVisualizer.css';

const StackVisualizer = () => {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [operation, setOperation] = useState('');
  const [animating, setAnimating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [showCode, setShowCode] = useState(false);

  // Code snippets for Stack operations
  const stackCode = {
    javascript: `class Stack {
  constructor() {
    this.items = [];
  }
  
  // Add element to top of stack
  push(element) {
    this.items.push(element);
  }
  
  // Remove and return top element
  pop() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.pop();
  }
  
  // Return top element without removing
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.items.length - 1];
  }
  
  // Check if stack is empty
  isEmpty() {
    return this.items.length === 0;
  }
  
  // Get stack size
  size() {
    return this.items.length;
  }
  
  // Clear all elements
  clear() {
    this.items = [];
  }
}`,
    python: `class Stack:
    def __init__(self):
        self.items = []
    
    # Add element to top of stack
    def push(self, element):
        self.items.append(element)
    
    # Remove and return top element
    def pop(self):
        if self.is_empty():
            return None
        return self.items.pop()
    
    # Return top element without removing
    def peek(self):
        if self.is_empty():
            return None
        return self.items[-1]
    
    # Check if stack is empty
    def is_empty(self):
        return len(self.items) == 0
    
    # Get stack size
    def size(self):
        return len(self.items)
    
    # Clear all elements
    def clear(self):
        self.items = []`,
    java: `import java.util.*;

public class Stack<T> {
    private List<T> items;
    
    public Stack() {
        this.items = new ArrayList<>();
    }
    
    // Add element to top of stack
    public void push(T element) {
        items.add(element);
    }
    
    // Remove and return top element
    public T pop() {
        if (isEmpty()) {
            return null;
        }
        return items.remove(items.size() - 1);
    }
    
    // Return top element without removing
    public T peek() {
        if (isEmpty()) {
            return null;
        }
        return items.get(items.size() - 1);
    }
    
    // Check if stack is empty
    public boolean isEmpty() {
        return items.isEmpty();
    }
    
    // Get stack size
    public int size() {
        return items.size();
    }
    
    // Clear all elements
    public void clear() {
        items.clear();
    }
}`,
    cpp: `#include <vector>

template<typename T>
class Stack {
private:
    std::vector<T> items;
    
public:
    // Add element to top of stack
    void push(const T& element) {
        items.push_back(element);
    }
    
    // Remove and return top element
    T pop() {
        if (isEmpty()) {
            throw std::runtime_error("Stack is empty");
        }
        T top = items.back();
        items.pop_back();
        return top;
    }
    
    // Return top element without removing
    T peek() const {
        if (isEmpty()) {
            throw std::runtime_error("Stack is empty");
        }
        return items.back();
    }
    
    // Check if stack is empty
    bool isEmpty() const {
        return items.empty();
    }
    
    // Get stack size
    size_t size() const {
        return items.size();
    }
    
    // Clear all elements
    void clear() {
        items.clear();
    }
};`,
    csharp: `using System;
using System.Collections.Generic;

public class Stack<T> {
    private List<T> items;
    
    public Stack() {
        items = new List<T>();
    }
    
    // Add element to top of stack
    public void Push(T element) {
        items.Add(element);
    }
    
    // Remove and return top element
    public T Pop() {
        if (IsEmpty()) {
            throw new InvalidOperationException("Stack is empty");
        }
        T top = items[items.Count - 1];
        items.RemoveAt(items.Count - 1);
        return top;
    }
    
    // Return top element without removing
    public T Peek() {
        if (IsEmpty()) {
            throw new InvalidOperationException("Stack is empty");
        }
        return items[items.Count - 1];
    }
    
    // Check if stack is empty
    public bool IsEmpty() {
        return items.Count == 0;
    }
    
    // Get stack size
    public int Size() {
        return items.Count;
    }
    
    // Clear all elements
    public void Clear() {
        items.Clear();
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

  const handlePush = () => {
    if (inputValue.trim() === '' || animating) return;
    
    setAnimating(true);
    setOperation(`Pushing ${inputValue} onto stack`);
    
    setTimeout(() => {
      setStack(prev => [...prev, {
        value: inputValue.trim(),
        id: Date.now(),
        isNew: true
      }]);
      setInputValue('');
      setOperation('');
      setAnimating(false);
    }, 500);
  };

  const handlePop = () => {
    if (stack.length === 0 || animating) return;
    
    setAnimating(true);
    const topElement = stack[stack.length - 1];
    setOperation(`Popping ${topElement.value} from stack`);
    
    setTimeout(() => {
      setStack(prev => prev.slice(0, -1));
      setOperation('');
      setAnimating(false);
    }, 500);
  };

  const handlePeek = () => {
    if (stack.length === 0 || animating) return;
    
    setAnimating(true);
    const topElement = stack[stack.length - 1];
    setOperation(`Top element: ${topElement.value}`);
    
    setTimeout(() => {
      setOperation('');
      setAnimating(false);
    }, 1500);
  };

  const handleClear = () => {
    if (stack.length === 0 || animating) return;
    
    setAnimating(true);
    setOperation('Clearing all elements from stack');
    
    setTimeout(() => {
      setStack([]);
      setOperation('');
      setAnimating(false);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !animating) {
      handlePush();
    }
  };

  // Remove isNew flag after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setStack(prev => prev.map(item => ({ ...item, isNew: false })));
    }, 600);
    
    return () => clearTimeout(timer);
  }, [stack]);

  return (
    <div className="bubble-sort-visualizer">
      <div className="visualizer-header">
        <h1>Stack Data Structure</h1>
        <p>Explore the Last In First Out (LIFO) principle with interactive stack operations</p>
      </div>

      <div className="controls-panel">
        <div className="control-row">
          <div className="control-group" style={{ gridColumn: '1 / -1' }}>
            <label>Add Element to Stack</label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter a value (number or text)"
                disabled={animating}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '2px solid rgba(var(--color-border-rgb), 0.3)',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(var(--color-surface-rgb), 0.8)',
                  color: 'var(--color-text)',
                  fontSize: '1rem'
                }}
              />
              <button 
                onClick={handlePush}
                disabled={!inputValue.trim() || animating}
                className="control-btn start-btn"
                style={{ minWidth: '120px' }}
              >
                <span className="btn-icon">⬆️</span>
                <span className="btn-text">Push</span>
              </button>
            </div>
          </div>
        </div>

        <div className="control-buttons">
          <button 
            onClick={handlePop}
            disabled={stack.length === 0 || animating}
            className="control-btn pause-btn"
          >
            <span className="btn-icon">⬇️</span>
            <span className="btn-text">Pop</span>
          </button>
          
          <button 
            onClick={handlePeek}
            disabled={stack.length === 0 || animating}
            className="control-btn step-btn"
          >
            <span className="btn-icon">👁️</span>
            <span className="btn-text">Peek</span>
          </button>
          
          <button 
            onClick={handleClear}
            disabled={stack.length === 0 || animating}
            className="control-btn reset-btn"
          >
            <span className="btn-icon">🗑️</span>
            <span className="btn-text">Clear</span>
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
                <span className="code-title">Stack Implementation - {languages.find(l => l.id === selectedLanguage)?.name}</span>
                <button 
                  onClick={() => navigator.clipboard.writeText(stackCode[selectedLanguage])}
                  className="copy-btn"
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
              <pre className="code-block">
                <code className={`language-${selectedLanguage}`}>
                  {stackCode[selectedLanguage]}
                </code>
              </pre>
            </div>
          )}
        </div>
      </div>

      <div className="info-panel">
        <div className="step-info">
          <strong>Current Operation:</strong> {operation || 'Ready for operations'}
        </div>
        <div className="step-counter">
          <strong>Stack Size:</strong> {stack.length}
          <span style={{ marginLeft: '2rem' }}>
            <strong>Top Element:</strong> {stack.length > 0 ? stack[stack.length - 1].value : 'None'}
          </span>
        </div>
      </div>

      <div className="algorithm-stats">
        <div className="stat-item">
          <span className="stat-label">Elements:</span>
          <span className="stat-value">{stack.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Push Operations:</span>
          <span className="stat-value">O(1)</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Pop Operations:</span>
          <span className="stat-value">O(1)</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Space Complexity:</span>
          <span className="stat-value">O(n)</span>
        </div>
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#10b981', border: '2px solid #10b981' }}></div>
          <span>New Element</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: 'var(--color-primary)', border: '2px solid var(--color-primary)' }}></div>
          <span>Stack Elements</span>
        </div>
      </div>

      <div className="visualization-container">
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '1rem',
          minHeight: '300px',
          justifyContent: 'flex-end'
        }}>
          <div style={{ color: 'var(--color-textSecondary)', fontSize: '0.9rem', fontWeight: '500' }}>
            Top of Stack (LIFO - Last In, First Out)
          </div>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column-reverse', 
            alignItems: 'center', 
            gap: '2px',
            minHeight: '200px',
            justifyContent: 'flex-start'
          }}>
            {stack.length === 0 ? (
              <div style={{
                padding: '2rem',
                border: '2px dashed rgba(var(--color-border-rgb), 0.5)',
                borderRadius: '8px',
                color: 'var(--color-textSecondary)',
                textAlign: 'center',
                minWidth: '200px'
              }}>
                Stack is empty
              </div>
            ) : (
              stack.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    padding: '1rem 2rem',
                    backgroundColor: item.isNew ? '#10b981' : 'var(--color-primary)',
                    color: 'white',
                    borderRadius: '8px',
                    minWidth: '200px',
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    border: `3px solid ${item.isNew ? '#059669' : 'var(--color-primary)'}`,
                    boxShadow: index === stack.length - 1 
                      ? '0 4px 15px rgba(var(--color-primary-rgb), 0.3)' 
                      : '0 2px 8px rgba(0, 0, 0, 0.1)',
                    transform: item.isNew ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                >
                  {item.value}
                  {index === stack.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      right: '-60px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '0.8rem',
                      color: 'var(--color-textSecondary)',
                      whiteSpace: 'nowrap'
                    }}>
                      ← Top
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          
          <div style={{ color: 'var(--color-textSecondary)', fontSize: '0.9rem', fontWeight: '500' }}>
            Bottom of Stack
          </div>
        </div>
      </div>

      <div className="algorithm-info">
        <h3>Stack Data Structure</h3>
        <div className="complexity-info">
          <div className="complexity-item">
            <strong>Time Complexity:</strong>
            <ul>
              <li>Push: O(1) - constant time insertion</li>
              <li>Pop: O(1) - constant time removal</li>
              <li>Peek/Top: O(1) - constant time access</li>
            </ul>
          </div>
          <div className="complexity-item">
            <strong>Space Complexity:</strong> O(n) - where n is the number of elements
          </div>
          <div className="complexity-item">
            <strong>Applications:</strong> Function calls, expression evaluation, undo operations, browser history, backtracking algorithms
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackVisualizer;