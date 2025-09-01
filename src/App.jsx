import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import BubbleSortVisualizer from './components/BubbleSortVisualizer';
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
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
