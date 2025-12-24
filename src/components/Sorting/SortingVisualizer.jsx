import React, { useState, useEffect, useRef } from 'react';
import { bubbleSort, selectionSort, insertionSort, mergeSort, quickSort, shellSort, ALGORITHM_INFO } from '../../algorithms/sorting';
import { Play, RotateCcw } from 'lucide-react';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('Bubble');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [compareIndices, setCompareIndices] = useState([]);
  const [swapIndices, setSwapIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [metrics, setMetrics] = useState({ comparisons: 0, swaps: 0, time: 0 });
  const [inputStr, setInputStr] = useState('');

  const timeouts = useRef([]);

  // Generate random array
  const generateArray = (size = 20) => {
    reset();
    const newArr = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 5);
    setArray(newArr);
    setInputStr(newArr.join(', '));
  };

  const reset = () => {
    setIsPlaying(false);
    setCompareIndices([]);
    setSwapIndices([]);
    setSortedIndices([]);
    setMetrics({ comparisons: 0, swaps: 0, time: 0 });
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  };

  useEffect(() => {
    generateArray();
    return () => reset();
  }, []);

  const handleManualInput = () => {
    const nums = inputStr.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    if (nums.length > 0) {
      reset();
      setArray(nums);
    }
  };


  const runSorting = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setCompareIndices([]);
    setSwapIndices([]);

    let trace = []; //log of events 
    const startTime = performance.now();

    switch (algorithm) {
      case 'Bubble': trace = bubbleSort(array); break;
      case 'Selection': trace = selectionSort(array); break;
      case 'Insertion': trace = insertionSort(array); break;
      case 'Merge': trace = mergeSort(array); break;
      case 'Quick': trace = quickSort(array); break;
      case 'Shell': trace = shellSort(array); break;
      default: break;
    }

    const endTime = performance.now();
    const execTime = (endTime - startTime).toFixed(2);

    let compCount = 0;
    let swapCount = 0;
    // Animate the trace 
    // trace is array of events || step is each event from trace || i is index of event
    trace.forEach((step, i) => {
      const timeout = setTimeout(() => {
        if (step.type === 'compare') {
          setCompareIndices(step.indices);
          setSwapIndices([]);
          compCount++;
        } else if (step.type === 'swap' || step.type === 'overwrite') {
          setArray(step.array);
          setSwapIndices(step.indices);
          setCompareIndices([]);
          swapCount++;
        } else if (step.type === 'sorted') {
          setSortedIndices(prev => [...prev, ...step.indices]);
        }

        setMetrics({
          comparisons: compCount,
          swaps: swapCount,
          time: i === trace.length - 1 ? execTime : 0
        });

        if (i === trace.length - 1) {
          setIsPlaying(false);
          setCompareIndices([]);
          setSwapIndices([]);
          setSortedIndices(Array.from({ length: array.length }, (_, i) => i)); 
        }
      }, i * (101 - speed) * 5);
      timeouts.current.push(timeout);
    });
  };

  const getBarColor = (index) => {
    if (compareIndices.includes(index)) return 'bg-yellow-400';
    if (swapIndices.includes(index)) return 'bg-red-500';
    if (sortedIndices.includes(index)) return 'bg-green-500';
    return 'bg-blue-500';
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Controls Header */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        <div className="flex flex-wrap gap-4 items-center sm:justify-between justify-center">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <select
              className="p-2 border rounded-lg font-medium cursor-pointer outline-none my-font text-slate-700 focus:ring-2 focus:ring-blue-500"
              value={algorithm}
              onChange={(e) => { reset(); setAlgorithm(e.target.value); }}
              disabled={isPlaying}
            >
              {Object.keys(ALGORITHM_INFO).map(algo => <option key={algo} value={algo}>{algo} Sort</option>)}
            </select>

            <button onClick={() => generateArray(20)} disabled={isPlaying} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 my-font rounded-lg text-slate-700 ">Randomize</button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 my-font">Speed</span>
              <input type="range" min="1" max="100" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-24 accent-blue-600" />
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={runSorting} disabled={isPlaying} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white my-font rounded-lg hover:bg-blue-700  disabled:opacity-50">
              <Play size={18} /> Start
            </button>
            <button onClick={reset} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 disabled:opacity-50" disabled={!isPlaying}>
              <RotateCcw size={18} />
            </button>
          </div>
        </div>

        {/* Manual Input */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={inputStr}
            onChange={(e) => setInputStr(e.target.value)}
            className="flex-1 p-2 border rounded-lg text-sm font-mono"
            placeholder="Enter numbers separated by comma (like: 10, 5, 8...)"
            disabled={isPlaying}
          />
          <button onClick={handleManualInput} disabled={isPlaying} className="px-4 py-2 bg-slate-800 text-white text-sm  rounded-lg my-font hover:bg-slate-900">Set Array</button>
        </div>
      </div>

      {/* Main Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Visualizer */}
        <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-lg h-[500px] flex items-end justify-center gap-1 border-b-4 border-slate-200 relative">
          {array.map((value, idx) => (
            <div
              key={idx}
              className={`transition-all duration-100 ${getBarColor(idx)} rounded-t-md`}
              style={{
                height: `${Math.max(value * 3, 20)}px`,
                width: `${Math.max(800 / array.length, 4)}px`
              }}
            >
              {array.length < 25 && <span className="text-[10px] text-center block -mt-4 text-slate-600 font-bold">{value}</span>}
            </div>
          ))}
          {array.length === 0 && <div className="absolute top-1/2 text-slate-400">Array is empty</div>}
        </div>

        {/*Section of results and info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <sliders-horizontal size={20} /> Results
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between p-2 bg-slate-50 rounded">
                <span className="text-slate-500">Comparisons</span>
                <span className="font-mono font-bold">{metrics.comparisons}</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-50 rounded">
                <span className="text-slate-500">Swaps</span>
                <span className="font-mono font-bold">{metrics.swaps}</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-50 rounded">
                <span className="text-slate-500">Exec Time</span>
                <span className="font-mono font-bold text-blue-600">{metrics.time ? `${metrics.time}ms` : '--'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
            <h3 className="text-lg font-bold text-slate-800 mb-2">{algorithm} Sort</h3>
            <p className="text-slate-600 my-font text-sm mb-4">{ALGORITHM_INFO[algorithm].desc}</p>
            <div className="grid grid-cols-2 justify-items-center gap-2 text-xs">
              <div className="p-2 bg-amber-50 rounded w-full">
                <div className="text-slate-500 my-font font-semibold">Time (Best) Complexity </div>
                <div className="font-bold text-blue-800 font-mono">{ALGORITHM_INFO[algorithm].bestCase}</div>
              </div>
              <div className="p-2 bg-red-50 rounded w-full">
                <div className="text-slate-500 my-font font-semibold">Time (Worst) Complexity</div>
                <div className="font-bold text-blue-800 font-mono">{ALGORITHM_INFO[algorithm].worstCase}</div>
              </div>
              <div className="p-2 bg-emerald-50 rounded w-full">
                <div className="text-slate-500 my-font font-semibold">Time (Average) Complexity</div>
                <div className="font-bold text-blue-800 font-mono">{ALGORITHM_INFO[algorithm].averageCase}</div>
              </div>
              <div className="p-2 bg-purple-50 rounded w-full">
                <div className="text-slate-500 my-font font-semibold">Space Complexity</div>
                <div className="font-bold text-purple-800 font-mono">{ALGORITHM_INFO[algorithm].space}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;