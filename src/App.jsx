import React, { useState } from 'react';
import SortingVisualizer from './components/Sorting/SortingVisualizer';
import SearchingVisualizer from './components/Searching/SearchingVisualizer';
import { BarChart2, Search, Code2 } from 'lucide-react';
import { Toaster } from 'react-hot-toast';


const App = () => {
  const [activeModule, setActiveModule] = useState('sorting');

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Navigation Bar */}
      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-20 shadow-sm px-4 ">
            <div className="flex items-center cursor-pointer animate-pulse active:scale-95 transition">
              <Code2 className="text-blue-400" size={30} />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveModule('sorting')}
                className={`flex items-center gap-2 px-3 my-font py-2 rounded-md font-medium  ${activeModule === 'sorting' ? 'bg-slate-800 text-blue-400' : 'hover:bg-slate-800 text-slate-300'
                  }`}
              >
                <BarChart2 size={18} /> Sorting
              </button>
              <button
                onClick={() => setActiveModule('searching')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md my-font font-medium  ${activeModule === 'searching' ? 'bg-slate-800 text-blue-400' : 'hover:bg-slate-800 text-slate-300'
                  }`}
              >
                <Search size={18} /> Searching
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeModule === 'sorting' ? <SortingVisualizer /> : <SearchingVisualizer />}
      </main>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
};

export default App;