import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import BubbleSortVisualizer from './components/BubbleSortVisualizer';
import QuickSortVisualizer from './components/QuickSortVisualizer';
import BinarySearchVisualizer from './components/BinarySearchVisualizer';
import LinearSearchVisualizer from './components/LinearSearchVisualizer';
import MergeSortVisualizer from './components/MergeSortVisualizer';
import SelectionSortVisualizer from './components/SelectionSortVisualizer';
import InsertionSortVisualizer from './components/InsertionSortVisualizer';
import StackVisualizer from './components/StackVisualizer';
import QueueVisualizer from './components/QueueVisualizer';
import LinkedListVisualizer from './components/LinkedListVisualizer';
import BinaryTreeVisualizer from './components/BinaryTreeVisualizer';
import GraphVisualizer from './components/GraphVisualizer';
import AlgorithmsPage from './components/AlgorithmsPage';
import DataStructuresPage from './components/DataStructuresPage';
import ComplexityPage from './components/ComplexityPage';
import AboutPage from './components/AboutPage';
import SettingsPage from './components/SettingsPage';
import AnimatedBackground from './components/AnimatedBackground';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <AnimatedBackground />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/algorithms" element={<AlgorithmsPage />} />
              <Route path="/data-structures" element={<DataStructuresPage />} />
              <Route path="/complexity" element={<ComplexityPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/bubble-sort" element={<BubbleSortVisualizer />} />
              <Route path="/quick-sort" element={<QuickSortVisualizer />} />
              <Route path="/merge-sort" element={<MergeSortVisualizer />} />
              <Route path="/selection-sort" element={<SelectionSortVisualizer />} />
              <Route path="/insertion-sort" element={<InsertionSortVisualizer />} />
              <Route path="/binary-search" element={<BinarySearchVisualizer />} />
              <Route path="/linear-search" element={<LinearSearchVisualizer />} />
              <Route path="/stack" element={<StackVisualizer />} />
              <Route path="/queue" element={<QueueVisualizer />} />
              <Route path="/linked-list" element={<LinkedListVisualizer />} />
              <Route path="/binary-tree" element={<BinaryTreeVisualizer />} />
              <Route path="/graph" element={<GraphVisualizer />} />
              <Route path="/bfs" element={<GraphVisualizer algorithm="bfs" />} />
              <Route path="/dfs" element={<GraphVisualizer algorithm="dfs" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
