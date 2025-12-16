import React from 'react';
import { RegexToken, TokenType } from '../types';
import { getColorForTokenType } from '../utils/regexEngine';

interface TokenBreakdownProps {
  tokens: RegexToken[];
  hoveredTokenIndex: number | null;
  setHoveredTokenIndex: (index: number | null) => void;
}

export const TokenBreakdown: React.FC<TokenBreakdownProps> = ({ 
  tokens, 
  hoveredTokenIndex, 
  setHoveredTokenIndex 
}) => {
  return (
    <div className="flex flex-col h-full bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm transition-colors duration-300">
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex justify-between items-center">
        <h3 className="text-xs font-bold tracking-widest text-slate-500 uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
          Structure Breakdown
        </h3>
        <span className="text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full border border-slate-300 dark:border-slate-700">
          {tokens.length} Nodes
        </span>
      </div>
      
      <div className="p-4 overflow-y-auto custom-scrollbar flex-1 space-y-2">
        {tokens.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-400 dark:text-slate-600 text-sm italic">
            Enter a pattern to inspect its structure...
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 content-start">
            {tokens.map((token, idx) => (
              <TokenChip 
                key={token.id} 
                token={token} 
                isActive={hoveredTokenIndex === idx}
                onEnter={() => setHoveredTokenIndex(idx)}
                onLeave={() => setHoveredTokenIndex(null)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail Pane for Hovered Token */}
      <div className="h-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 p-4 transition-all">
        {hoveredTokenIndex !== null && tokens[hoveredTokenIndex] ? (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs px-1.5 py-0.5 rounded border ${getColorForTokenType(tokens[hoveredTokenIndex].type)}`}>
                {tokens[hoveredTokenIndex].label}
              </span>
              <span className="text-slate-800 dark:text-slate-200 font-mono text-sm font-bold">
                {tokens[hoveredTokenIndex].value}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {tokens[hoveredTokenIndex].description}
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400 dark:text-slate-700 text-sm">
            Hover over a token to see details
          </div>
        )}
      </div>
    </div>
  );
};

interface TokenChipProps { 
  token: RegexToken; 
  isActive: boolean; 
  onEnter: () => void; 
  onLeave: () => void; 
}

const TokenChip: React.FC<TokenChipProps> = ({ token, isActive, onEnter, onLeave }) => {
  const colorClasses = getColorForTokenType(token.type);
  
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`
        relative px-2 py-1.5 rounded-md border text-sm font-mono cursor-pointer transition-all duration-150
        flex flex-col items-center gap-1 min-w-[32px] select-none
        ${colorClasses}
        ${isActive ? 'scale-110 shadow-lg ring-1 ring-slate-900/10 dark:ring-white/20 z-10' : 'opacity-90 hover:opacity-100'}
      `}
    >
      <span>{token.value}</span>
      {/* Tiny indicator line for visual grounding */}
      <div className={`w-full h-[2px] rounded-full opacity-30 ${isActive ? 'bg-current' : 'bg-transparent'}`} />
    </div>
  );
};