import React, { useMemo } from 'react';
import { MatchResult } from '../types';

interface TestAreaProps {
  text: string;
  setText: (t: string) => void;
  matches: MatchResult[];
  selectedMatchIndex: number | null;
}

export const TestArea: React.FC<TestAreaProps> = ({ text, setText, matches, selectedMatchIndex }) => {
  // Create a highlighted version of the text
  const highlightedText = useMemo(() => {
    if (!text) return <span className="text-slate-400 opacity-50">Type text here...</span>;
    
    // Build a map of index -> match status
    const matchMap = new Map<number, { type: 'start' | 'mid' | 'end' | 'single', matchIdx: number }>();
    
    matches.forEach((m, mIdx) => {
        const start = m.index;
        const end = m.index + m.fullMatch.length - 1;
        
        if (m.fullMatch.length === 1) {
             matchMap.set(start, { type: 'single', matchIdx: mIdx });
        } else {
            for (let i = start; i <= end; i++) {
                if (i === start) matchMap.set(i, { type: 'start', matchIdx: mIdx });
                else if (i === end) matchMap.set(i, { type: 'end', matchIdx: mIdx });
                else matchMap.set(i, { type: 'mid', matchIdx: mIdx });
            }
        }
    });

    return text.split('').map((char, idx) => {
      const status = matchMap.get(idx);
      let className = '';
      
      const isSelected = status && status.matchIdx === selectedMatchIndex;
      const baseColor = isSelected ? 'bg-emerald-500 text-transparent' : 'bg-emerald-500/30 text-transparent'; // text-transparent allows textarea text to show through, but background remains
      // Actually for the 'spacer' layer, we want the text to be invisible usually, but since the textarea is on top, 
      // we usually make the highlighter text transparent and the textarea text visible. 
      // However, to support 'text behind' style (highlighting background), we do the reverse:
      // Highlighter provides Background. Textarea provides Text.
      
      // FIX: The highlighter layer in this Grid Stack approach is BEHIND the textarea.
      // So the text in the highlighter needs to be transparent so we don't see double text rendering issues (subpixel AA),
      // BUT the background colors need to be visible.
      const textClass = 'text-transparent'; 
      const borderRadius = 'box-decoration-clone';

      if (status) {
          if (status.type === 'single') className = `${baseColor} ${textClass} rounded-sm ${borderRadius}`;
          else if (status.type === 'start') className = `${baseColor} ${textClass} rounded-l-sm ${borderRadius}`;
          else if (status.type === 'end') className = `${baseColor} ${textClass} rounded-r-sm ${borderRadius}`;
          else if (status.type === 'mid') className = `${baseColor} ${textClass} ${borderRadius}`;
      } else {
          return <span key={idx}>{char}</span>;
      }

      // Add a slight animation if selected
      if (isSelected) {
          className += ' animate-pulse font-bold';
      }

      return (
        <span key={idx} className={className}>{char}</span>
      );
    });
  }, [text, matches, selectedMatchIndex]);

  return (
    <div className="flex flex-col h-full md:h-full bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm relative transition-colors duration-300">
       <div className="flex-none px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex justify-between items-center z-20">
        <h3 className="text-xs font-bold tracking-widest text-slate-500 uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Test Strings
        </h3>
        <span className="text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full border border-slate-300 dark:border-slate-700">
          {matches.length} Matches
        </span>
      </div>

      <div className="flex-1 relative w-full overflow-y-auto custom-scrollbar">
        {/* Grid Stack Container for perfect alignment and auto-growth */}
        <div className="grid grid-cols-1 grid-rows-1 min-h-[80px]">
            
            {/* Layer 1: Highlighter (Provides Height + Backgrounds) */}
            {/* pointer-events-none ensures clicks go through to textarea */}
            <div className="col-start-1 row-start-1 p-4 font-mono text-sm leading-6 whitespace-pre-wrap break-all pointer-events-none text-transparent z-10">
                {highlightedText}
                {/* Add a zero-width space at end to ensure last newline renders height if necessary */}
                <span className="invisible">&#8203;</span>
            </div>

            {/* Layer 2: Textarea (Provides Input + Caret) */}
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="col-start-1 row-start-1 w-full h-full p-4 font-mono text-sm leading-6 whitespace-pre-wrap break-all bg-transparent text-slate-800 dark:text-slate-300 resize-none outline-none z-20"
                placeholder="Type text here..."
                spellCheck="false"
                style={{ overflow: 'hidden' }} // Let container handle scroll if max-height reached
            />
        </div>
      </div>
    </div>
  );
};