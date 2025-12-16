import React, { useEffect, useRef } from 'react';
import { MatchResult } from '../types';
import { Play, Pause, FastForward, SkipBack } from 'lucide-react';

interface DebuggerProps {
  matches: MatchResult[];
  selectedMatchIndex: number | null;
  onSelectMatch: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const Debugger: React.FC<DebuggerProps> = ({ 
    matches, 
    selectedMatchIndex, 
    onSelectMatch,
    onNext,
    onPrev,
    isPlaying,
    onTogglePlay
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to selected match
  useEffect(() => {
    if (selectedMatchIndex !== null && scrollContainerRef.current) {
        const card = scrollContainerRef.current.children[0]?.children[selectedMatchIndex] as HTMLElement;
        if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }
  }, [selectedMatchIndex]);

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 p-3 md:p-4 transition-colors duration-300">
      <div className="flex items-center gap-4 mb-3 md:mb-4">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Match Timeline
        </div>
        <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
        {matches.length > 0 && (
             <div className="text-xs font-mono text-slate-400">
                {selectedMatchIndex !== null ? selectedMatchIndex + 1 : 0} / {matches.length}
             </div>
        )}
      </div>

      <div className="flex items-start gap-4 md:gap-6">
        {/* Timeline Controls */}
        <div className="flex items-center gap-0.5 md:gap-1">
            <button 
                onClick={onPrev}
                disabled={matches.length === 0}
                className="p-1.5 md:p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md transition-colors disabled:opacity-50"
            >
                <SkipBack size={16} />
            </button>
             <button 
                onClick={onTogglePlay}
                disabled={matches.length === 0}
                className={`p-1.5 md:p-2 rounded-md transition-colors disabled:opacity-50 ${isPlaying 
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-500/20' 
                    : 'text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
            >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
             <button 
                onClick={onNext}
                disabled={matches.length === 0}
                className="p-1.5 md:p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md transition-colors disabled:opacity-50"
            >
                <FastForward size={16} />
            </button>
        </div>

        {/* Match Stream */}
        <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar" ref={scrollContainerRef}>
            <div className="flex gap-3 md:gap-4">
                {matches.length === 0 ? (
                     <div className="text-sm text-slate-400 dark:text-slate-600 font-mono italic py-1">
                        No matches found. Waiting for signal...
                    </div>
                ) : (
                    matches.map((m, i) => {
                        const isSelected = selectedMatchIndex === i;
                        return (
                            <div 
                                key={i} 
                                className="flex-shrink-0 group relative"
                                onClick={() => onSelectMatch(i)}
                            >
                                <div className={`
                                    border rounded-lg p-2 md:p-3 min-w-[130px] md:min-w-[140px] transition-all cursor-pointer
                                    ${isSelected 
                                        ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 ring-1 ring-emerald-500/50 shadow-md' 
                                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 hover:shadow-sm'}
                                `}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className={`text-[10px] font-bold ${isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>
                                            MATCH #{i + 1}
                                        </span>
                                        <span className="text-[10px] text-slate-400 dark:text-slate-600 font-mono">@{m.index}</span>
                                    </div>
                                    <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm font-bold truncate max-w-[140px]" title={m.fullMatch}>
                                        "{m.fullMatch}"
                                    </div>
                                    {m.groups.length > 0 && (
                                        <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/50 flex flex-col gap-1">
                                            {m.groups.map((g, gi) => (
                                                <div key={gi} className="flex justify-between text-[10px]">
                                                    <span className="text-slate-400 dark:text-slate-500">G{gi + 1}</span>
                                                    <span className="text-slate-500 dark:text-slate-400 font-mono truncate max-w-[80px]">{g}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {/* Connector Line */}
                                {i < matches.length - 1 && (
                                    <div className="absolute top-1/2 -right-3 md:-right-4 w-3 md:w-4 h-px bg-slate-200 dark:bg-slate-800" />
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
      </div>
    </div>
  );
};