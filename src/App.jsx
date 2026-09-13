import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  runBubbleSort,
  runMergeSort,
  runLinearSearch,
  runBinarySearch,
} from './utils/algorithms.js';

// ============================================================
// HELPER FUNCTION: creates a brand new random array of bars.
// Each bar has a unique "id" (so Framer Motion can track it as
// it moves) and a random "value" (its height/number).
// ============================================================
let nextUniqueId = 0;
function createRandomArray(size) {
  let newArray = [];
  for (let i = 0; i < size; i++) {
    let randomValue = Math.floor(Math.random() * 90) + 10; // values between 10 and 99
    newArray.push({ id: nextUniqueId, value: randomValue });
    nextUniqueId = nextUniqueId + 1;
  }
  return newArray;
}

function App() {
  // ---------- STATE: the array of bars being visualized ----------
  const [array, setArray] = useState(() => createRandomArray(15));

  // ---------- STATE: visual status of bars ----------
  const [comparingIndices, setComparingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [eliminatedIndices, setEliminatedIndices] = useState([]);
  const [foundIndex, setFoundIndex] = useState(null);

  // ---------- STATE: control panel settings ----------
  const [arraySize, setArraySize] = useState(15);
  const [speed, setSpeed] = useState(300);
  const [targetValue, setTargetValue] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Generate an array to get started!');

  // ============================================================
  // Resets all visual highlight states back to empty.
  // ============================================================
  function clearHighlights() {
    setComparingIndices([]);
    setSortedIndices([]);
    setEliminatedIndices([]);
    setFoundIndex(null);
  }

  function handleGenerateNewArray() {
    setArray(createRandomArray(arraySize));
    clearHighlights();
    setStatusMessage('New array generated. Pick an algorithm to run!');
  }

  // ============================================================
  // SORTING HANDLERS
  // ============================================================
  async function handleRunBubbleSort() {
    clearHighlights();
    setIsRunning(true);
    setStatusMessage('Running Bubble Sort...');

    await runBubbleSort(array, setArray, setComparingIndices, setSortedIndices, speed);

    setStatusMessage('Bubble Sort complete! Array is now sorted.');
    setIsRunning(false);
  }

  async function handleRunMergeSort() {
    clearHighlights();
    setIsRunning(true);
    setStatusMessage('Running Merge Sort...');

    await runMergeSort(array, setArray, setComparingIndices, setSortedIndices, speed);

    setStatusMessage('Merge Sort complete! Array is now sorted.');
    setIsRunning(false);
  }

  // ============================================================
  // SEARCHING HANDLERS
  // ============================================================
  async function handleRunLinearSearch() {
    if (targetValue === '') {
      setStatusMessage('Please enter a target number to search for.');
      return;
    }

    clearHighlights();
    setIsRunning(true);
    setStatusMessage('Running Linear Search...');

    const numberToFind = Number(targetValue);
    const wasFound = await runLinearSearch(
      array,
      numberToFind,
      setComparingIndices,
      setFoundIndex,
      setEliminatedIndices,
      speed
    );

    setStatusMessage(
      wasFound ? `Found ${numberToFind}!` : `${numberToFind} was not found in the array.`
    );
    setIsRunning(false);
  }

  async function handleRunBinarySearch() {
    if (targetValue === '') {
      setStatusMessage('Please enter a target number to search for.');
      return;
    }

    clearHighlights();
    setIsRunning(true);
    setStatusMessage('Sorting array first (Binary Search needs a sorted array)...');

    let sortedCopy = [...array].sort((a, b) => a.value - b.value);
    setArray(sortedCopy);

    await new Promise((resolve) => setTimeout(resolve, 500));

    setStatusMessage('Running Binary Search...');
    const numberToFind = Number(targetValue);
    const wasFound = await runBinarySearch(
      sortedCopy,
      numberToFind,
      setComparingIndices,
      setFoundIndex,
      setEliminatedIndices,
      speed
    );

    setStatusMessage(
      wasFound ? `Found ${numberToFind}!` : `${numberToFind} was not found in the array.`
    );
    setIsRunning(false);
  }

  // ============================================================
  // Figures out which CSS class a bar should have, based on
  // its current status.
  // ============================================================
  function getBarClassName(index) {
    if (foundIndex === index) {
      return 'bar bar-found';
    }
    if (comparingIndices.includes(index)) {
      return 'bar bar-comparing';
    }
    if (sortedIndices.includes(index)) {
      return 'bar bar-sorted';
    }
    if (eliminatedIndices.includes(index)) {
      return 'bar bar-eliminated';
    }
    return 'bar bar-default';
  }

  // ============================================================
  // THE VISUAL LAYOUT (JSX)
  // ============================================================
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Algorithm Visualizer</h1>
        <p className="app-subtitle">Watch Linear Search, Binary Search, Bubble Sort & Merge Sort in action</p>
      </header>

      {/* ---------- TOP UTILITY BAR: array size, speed, generate ---------- */}
      <div className="glass-panel utility-bar">
        <div className="control-group">
          <label>Array Size: <span className="control-value">{arraySize}</span></label>
          <input
            type="range"
            min="5"
            max="30"
            value={arraySize}
            disabled={isRunning}
            onChange={(event) => setArraySize(Number(event.target.value))}
          />
        </div>

        <div className="control-group">
          <label>Speed (ms delay): <span className="control-value">{speed}</span></label>
          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={speed}
            disabled={isRunning}
            onChange={(event) => setSpeed(Number(event.target.value))}
          />
        </div>

        <button className="btn btn-neutral" onClick={handleGenerateNewArray} disabled={isRunning}>
          🎲 Generate New Array
        </button>
      </div>

      {/* ---------- TWO-COLUMN DASHBOARD: Searching Zone + Sorting Zone ---------- */}
      <div className="dashboard-grid">
        {/* ----- LEFT COLUMN: SEARCHING ZONE ----- */}
        <div className="glass-panel zone-panel searching-zone">
          <h2 className="zone-heading">
            <span className="zone-icon">🔍</span> Searching Zone
          </h2>

          <div className="control-group full-width">
            <label>Search Target</label>
            <input
              className="target-input"
              type="number"
              placeholder="Enter a number, e.g. 42"
              value={targetValue}
              disabled={isRunning}
              onChange={(event) => setTargetValue(event.target.value)}
            />
          </div>

          <div className="zone-buttons">
            <button className="btn btn-secondary" onClick={handleRunLinearSearch} disabled={isRunning}>
              Linear Search
            </button>
            <button className="btn btn-danger" onClick={handleRunBinarySearch} disabled={isRunning}>
              Binary Search
            </button>
          </div>
        </div>

        {/* ----- RIGHT COLUMN: SORTING ZONE ----- */}
        <div className="glass-panel zone-panel sorting-zone">
          <h2 className="zone-heading">
            <span className="zone-icon">📊</span> Sorting Zone
          </h2>

          <p className="zone-description">Arrange the bars from smallest to largest.</p>

          <div className="zone-buttons">
            <button className="btn btn-primary" onClick={handleRunBubbleSort} disabled={isRunning}>
              Bubble Sort
            </button>
            <button className="btn btn-primary" onClick={handleRunMergeSort} disabled={isRunning}>
              Merge Sort
            </button>
          </div>
        </div>
      </div>

      {/* ---------- THE BARS ---------- */}
      <div className="glass-panel bars-container">
        {array.map((bar, index) => (
          // "layout" tells Framer Motion to smoothly slide this bar to its
          // new position instead of teleporting. "key={bar.id}" (not index!)
          // is what lets Framer Motion track each bar as it moves around.
          <motion.div
            key={bar.id}
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={getBarClassName(index)}
            style={{ height: `${bar.value * 3}px` }}
          >
            {bar.value}
          </motion.div>
        ))}
      </div>

      {/* ---------- STATUS MESSAGE ---------- */}
      <div className="glass-panel status-message">{statusMessage}</div>
    </div>
  );
}

export default App;