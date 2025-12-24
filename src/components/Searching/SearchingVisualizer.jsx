import React, { useState } from 'react';
import { BSTNode, BinaryHeap, hashString, searchBST, deleteBST } from '../../algorithms/searching';
import toast from 'react-hot-toast';
const SearchingVisualizer = () => {
  const [activeTab, setActiveTab] = useState('BST');

  //  BST States 
  const [bstRoot, setBstRoot] = useState(null);
  const [bstInput, setBstInput] = useState('');
  const [highlightedNode, setHighlightedNode] = useState(null);

  //  Heap States 
  const [heapInstance] = useState(new BinaryHeap('max')); //represent copy of binary heap as max heap
  const [heapArr, setHeapArr] = useState([]);
  const [heapInput, setHeapInput] = useState('');

  //  Hash Table States 
  const [hashTable, setHashTable] = useState(Array(11).fill(null).map(() => []));
  const [hashInput, setHashInput] = useState('');

  //  BST LOGIC 
  const insertBST = () => {
    const val = parseInt(bstInput);
    if (isNaN(val)) return;

    const newNode = new BSTNode(val);
    if (!bstRoot) {
      setBstRoot(newNode);
    } else {
      const clone = JSON.parse(JSON.stringify(bstRoot));
      const insertNode = (node, newNode) => {
        if (newNode.value < node.value) {
          if (!node.left) node.left = newNode;
          else insertNode(node.left, newNode);
        } else if (newNode.value > node.value) {
          if (!node.right) node.right = newNode;
          else insertNode(node.right, newNode);
        }
      };
      insertNode(clone, newNode);
      setBstRoot(clone);
    }
    setBstInput('');
  };


  const handleDeleteBST = () => {
    const val = parseInt(bstInput);
    if (isNaN(val) || !bstRoot) return;
    const nodeExists = searchBST(bstRoot, val);

    if (!nodeExists) {
      toast.error(`Value ${val} not found in the tree!`);
      setBstInput('');
      return;
    }
    const treeClone = JSON.parse(JSON.stringify(bstRoot));
    const newRoot = deleteBST(treeClone, val);
    setBstRoot(newRoot);
    setBstInput('');
    toast.success(`Value ${val} deleted successfully!`);
  };
  const handleSearchBST = () => {
    const val = parseInt(bstInput);
    if (isNaN(val) || !bstRoot) return;
    const node = searchBST(bstRoot, val);
    if (node) {
      setHighlightedNode(val);
      toast.success(`Value ${val} found in the tree!`);
      setTimeout(() => setHighlightedNode(null), 2000);
    } else {
      toast.error(`Value ${val} not found in the tree!`);
    }
    setBstInput('');
  };


  //  HEAP LOGIC 
  const insertHeap = () => {
    const val = parseInt(heapInput);
    if (isNaN(val)) return;
    const newArr = heapInstance.insert(val);
    setHeapArr(newArr);
    setHeapInput('');
  };


  const deleteHeapNode = () => {
    const val = parseInt(heapInput);

    if (isNaN(val)) {
      toast.error("Please enter a valid number!");
      return;
    }
    const exists = heapArr.includes(val);

    if (!exists) {
      toast.error(`Value ${val} not found in the tree!`);
      setHeapInput('');
      return;
    }

    const newArr = heapInstance.delete(val);
    setHeapArr(newArr);
    setHeapInput('');

    toast.success(`Value ${val} is removed!`, {
      icon: '🗑️',
    });
  };

  const extractHeap = () => {
    if (heapArr.length === 0) {
      toast.error("Heap is already empty!");
      return;
    }
    const maxValue = heapArr[0];
    const newArr = heapInstance.extract();
    setHeapArr(newArr);
    toast.success(`Extracted max value: ${maxValue}`);
  };

  //  HASH TABLE LOGIC 
  const insertHash = () => {
    if (!hashInput) return;
    const idx = hashString(hashInput, 11);
    const newTable = [...hashTable];
    newTable[idx] = [...newTable[idx], hashInput];
    setHashTable(newTable);
    setHashInput('');
  };

  // Render Functions 
  const renderBSTTree = (node) => {
    if (!node) return null;
    const isHighlighted = highlightedNode === node.value;
    return (
      <div className="flex flex-col items-center mx-2">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md z-10 border-2 transition-all duration-300 ${isHighlighted ? 'bg-yellow-400 border-yellow-600 scale-125 text-black' : 'bg-blue-500 border-white text-white'
          }`}>
          {node.value}
        </div>
        <div className="flex mt-4 pt-4 border-t-2 border-slate-200">
          <div className="flex gap-4">
            {node.left && renderBSTTree(node.left)}
            {node.right && renderBSTTree(node.right)}
          </div>
        </div>
      </div>
    );
  };

  const renderHeapTree = (index) => {
    if (index >= heapArr.length) return null;
    return (
      <div className="flex flex-col items-center mx-2">
        <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold shadow-md z-10 border-2 border-white">
          {heapArr[index]}
        </div>
        <div className="flex mt-4 gap-4">
          {renderHeapTree(2 * index + 1)}
          {renderHeapTree(2 * index + 2)}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Tabs Control */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex gap-4">
        {['BST', 'Heap', 'HashTable'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg font-semibold font-mono  ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg min-h-[500px]">

        {/* BST Section */}
        {activeTab === 'BST' && (
          <div>
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start sm:gap-2 mb-8">
              <input type="number" value={bstInput} onChange={e => setBstInput(e.target.value)} className="p-2 border rounded outline-none font-mono w-32" placeholder="Value" />
              <button onClick={insertBST} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 my-font">Insert</button>
              <button onClick={handleDeleteBST} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 my-font">Delete</button>
              <button onClick={handleSearchBST} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 my-font">Search</button>
            </div>
            <div className="flex justify-center overflow-auto p-4">
              {bstRoot ? renderBSTTree(bstRoot) : <p className="text-slate-400 my-font italic">Binary Search Tree is empty</p>}
            </div>
          </div>
        )}

        {/* HEAP Section */}
        {activeTab === 'Heap' && (
          <div>
            <div className="flex flex-wrap sm:justify-start justify-center gap-4 sm:flex-nowrap sm:gap-2 mb-8 items-center">
              <input type="number" value={heapInput} onChange={e => setHeapInput(e.target.value)} className="p-2 border rounded outline-none font-mono w-32" placeholder="Value" />
              <button onClick={insertHeap} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 my-font">Insert</button>
              <button onClick={deleteHeapNode} className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 my-font">Delete</button>
              <button onClick={extractHeap} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-4 my-font">Extract Max</button>
            </div>
            <div className="flex justify-center overflow-auto p-4">
              {heapArr.length > 0 ? renderHeapTree(0) : <p className="text-slate-400 my-font italic">Heap is empty</p>}
            </div>
            <div className="mt-8 pt-4 border-t">
              <div className='flex justify-center items-center border  mb-6 text-white my-font font-semibold rounded-lg bg-emerald-500 shadow-lg p-4'>
                <span>Array Representation </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {heapArr.map((n, i) => <div key={i} className="px-3 py-1 bg-slate-100 border rounded font-mono">{n}</div>)}
              </div>
            </div>
          </div>
        )}

        {/* HashTable Section */}
        {activeTab === 'HashTable' && (
          <div>
            <div className="flex gap-2 mb-8">
              <input type="text" value={hashInput} onChange={e => setHashInput(e.target.value)} className="p-2 border rounded outline-none my-font" placeholder="Enter string" />
              <button onClick={insertHash} className="my-font px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Insert</button>
            </div>
            <div className="grid gap-4">
              {hashTable.map((bucket, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="w-8 h-8 rounded bg-slate-200 flex items-center justify-center font-mono font-bold text-slate-600">{i}</div>
                  <div className="flex-1 flex gap-2 overflow-x-auto">
                    {bucket.length === 0 ? <span className="text-slate-300 italic text-sm">Empty</span> :
                      bucket.map((item, idx) => (
                        <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm my-font font-medium border border-green-200">
                          {item}
                        </span>
                      ))
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchingVisualizer;