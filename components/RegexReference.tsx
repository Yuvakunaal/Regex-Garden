import React from 'react';
import { X, Book } from 'lucide-react';
import { referenceData } from '../utils/referenceData';

interface RegexReferenceProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegexReference: React.FC<RegexReferenceProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-[2px] z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Drawer */}
      <div className={`
        fixed top-0 right-0 h-full w-full md:max-w-[400px] bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 shadow-2xl z-50
        transform transition-transform duration-300 ease-out flex flex-col
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-indigo-50 dark:bg-indigo-500/10 rounded-md border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                <Book size={18} />
            </div>
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight">Regex Reference</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 space-y-6 md:space-y-8 bg-white dark:bg-slate-950">
          {referenceData.map((category) => (
            <div key={category.title}>
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-800 border border-slate-200 dark:border-slate-600"></span>
                {category.title}
              </h3>
              <div className="grid gap-3">
                {category.items.map((item) => (
                  <div key={item.symbol} className="group bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 rounded-lg p-3 hover:border-indigo-400 dark:hover:border-indigo-500/30 hover:bg-white dark:hover:bg-slate-900/80 transition-all hover:shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <code className="text-indigo-600 dark:text-indigo-300 font-mono text-sm bg-indigo-50 dark:bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-100 dark:border-indigo-500/20 min-w-[1.5rem] text-center">
                            {item.symbol}
                        </code>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{item.name}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 leading-relaxed">{item.description}</p>
                    <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 border-t border-slate-200 dark:border-slate-800/50 pt-2 flex gap-1.5">
                        <span className="text-slate-500 dark:text-slate-600">e.g.</span>
                        <span className="text-slate-600 dark:text-slate-300">{item.example}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="pt-8 pb-4 text-center">
             <p className="text-[10px] text-slate-400 dark:text-slate-600 uppercase tracking-widest">End of Reference</p>
          </div>
        </div>
      </div>
    </>
  );
};