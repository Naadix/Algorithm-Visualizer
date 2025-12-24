// SWAP Function
const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

// Bubble Sort Implementation with Tracing
export const bubbleSort = (array) => {
  const arr = [...array];
  const trace = []; // array for storing the trace of operations
  let swapped;
  
  for (let i = 0; i < arr.length; i++) {
    swapped = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      trace.push({ type: 'compare', indices: [j, j + 1] }); // Comparing adjacent elements
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        swapped = true;
        trace.push({ type: 'swap', indices: [j, j + 1], array: [...arr] }); // Log swap operation
      }
    }
    trace.push({ type: 'sorted', indices: [arr.length - i - 1] }); // Mark last element as sorted
    if (!swapped) break;
  }
  return trace;
};
// Selection Sort Implementation with Tracing
export const selectionSort = (array) => {
  const arr = [...array];
  const trace = [];
  
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      trace.push({ type: 'compare', indices: [minIdx, j] });
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      swap(arr, i, minIdx);
      trace.push({ type: 'swap', indices: [i, minIdx], array: [...arr] });
    }
    trace.push({ type: 'sorted', indices: [i] });
  }
  return trace;
};

// Insertion Sort Implementation with Tracing
export const insertionSort = (array) => {
  const arr = [...array];
  const trace = [];
  
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    trace.push({ type: 'select', indices: [i] }); // selecting insert element
    
    while (j >= 0 && arr[j] > key) {
      trace.push({ type: 'compare', indices: [j, j + 1] }); // Comparing insert element with sorted part 
      arr[j + 1] = arr[j];
      trace.push({ type: 'overwrite', indices: [j + 1], value: arr[j], array: [...arr] }); // indices meaning the position where overwrite happens || value is the new value at that position
      j = j - 1;
    }
    arr[j + 1] = key;
    trace.push({ type: 'overwrite', indices: [j + 1], value: key, array: [...arr] }); // inserting the key at correct position
  }
  return trace;
};

// Shell Sort Implementation with Tracing
export const shellSort = (array) => {
  const arr = [...array];
  const trace = [];
  let n = arr.length;
  
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i += 1) {
      let temp = arr[i];
      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        trace.push({ type: 'compare', indices: [j, j - gap] });
        arr[j] = arr[j - gap];
        trace.push({ type: 'overwrite', indices: [j], value: arr[j - gap], array: [...arr] }); // shift element
      }
      arr[j] = temp; 
      trace.push({ type: 'overwrite', indices: [j], value: temp, array: [...arr] });
    }
  }
  return trace;
};

// Merge Sort Helper
const merge = (arr, l, m, r, trace) => {
  let i = l, j = m + 1;
  const tempArr = []; // temprary array containing element sorted
    
  while (i <= m && j <= r) {
    trace.push({ type: 'compare', indices: [i, j] });
    if (arr[i] <= arr[j]) {
      tempArr.push(arr[i]);
      i++;
    } else {
      tempArr.push(arr[j]);
      j++;
    }
  }
  // insert remaining elements
  while (i <= m) tempArr.push(arr[i++]);
  while (j <= r) tempArr.push(arr[j++]);
  
  // restore copied elements to original array
  for (let idx = 0; idx < tempArr.length; idx++) {
    arr[l + idx] = tempArr[idx];
    trace.push({ type: 'overwrite', indices: [l + idx], value: tempArr[idx], array: [...arr] });
  }
};

const mergeSortRec = (arr, l, r, trace) => {
  if (l >= r) return;
  const m = l + parseInt((r - l) / 2);
  mergeSortRec(arr, l, m, trace);
  mergeSortRec(arr, m + 1, r, trace);
  merge(arr, l, m, r, trace);
};

export const mergeSort = (array) => {
  const arr = [...array];
  const trace = [];
  mergeSortRec(arr, 0, arr.length - 1, trace);
  return trace;
};

// Quick Sort Helper
const partition = (arr, low, high, trace) => {
  let pivot = arr[high];
  trace.push({ type: 'select', indices: [high] }); // selecting pivot
  let i = (low - 1); // index of smaller element than pivot
  
  for (let j = low; j <= high - 1; j++) {
    trace.push({ type: 'compare', indices: [j, high] });
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);
      trace.push({ type: 'swap', indices: [i, j], array: [...arr] });
    }
  }
  swap(arr, i + 1, high);
  trace.push({ type: 'swap', indices: [i + 1, high], array: [...arr] });
  return (i + 1);
};

const quickSortRec = (arr, low, high, trace) => {
  if (low < high) {
    let pi = partition(arr, low, high, trace); // pivot index 
    quickSortRec(arr, low, pi - 1, trace);
    quickSortRec(arr, pi + 1, high, trace);
  }
};

export const quickSort = (array) => {
  const arr = [...array];
  const trace = [];
  quickSortRec(arr, 0, arr.length - 1, trace);
  return trace;
};

export const ALGORITHM_INFO = {
  Bubble: { bestCase: 'O(n)', worstCase: 'O(n²)' , averageCase : 'O(n²)' , space: 'O(1)', desc: 'Repeatedly swaps adjacent elements if they are in wrong order.' },
  Selection: { bestCase: 'O(n²)',worstCase: 'O(n²)' , averageCase : 'O(n²)' , space: 'O(1)', desc: 'Selects the smallest element and swaps it with the current position.' },
  Insertion: { bestCase: 'O(n)',worstCase: 'O(n²)' , averageCase : 'O(n²)' , space: 'O(1)', desc: 'Builds the sorted array one item at a time by inserting into correct position.' },
  Merge: { bestCase: 'O(n log n)',worstCase: 'O(n log n)' , averageCase : 'O(n log n)' , space: 'O(n)', desc: 'Divides array into halves, sorts them and merges them back.' },
  Quick: { bestCase: 'O(n log n)',worstCase: 'O(n²)' , averageCase : 'O(n log n)' , space: 'O(log n)', desc: 'Partitions array around a pivot, then recursively sorts partitions.' },
  Shell: { bestCase: 'O(n log n)',worstCase: 'O(n²)' , averageCase : 'O(n log n)' , space: 'O(1)', desc: 'Improvement of insertion sort using gaps to move elements far apart.' },
};