import React from 'react';

interface RegexInputProps {
  pattern: string;
  setPattern: (p: string) => void;
  error: string | null;
}

export const RegexInput: React.FC<RegexInputProps> = ({ pattern, setPattern, error }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-baseline">
        <label className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-500 uppercase">
          Pattern Expression
        </label>
        {error && <span className="text-xs text-red-500 dark:text-red-400 font-mono animate-pulse">{error}</span>}
      </div>
      
      <div className={`
        relative group flex items-center
        bg-white dark:bg-slate-900 border-2 rounded-lg transition-all duration-200
        ${error 
            ? 'border-red-200 dark:border-red-900/50 shadow-[0_0_15px_rgba(239,68,68,0.1)] dark:shadow-[0_0_15px_rgba(127,29,29,0.2)]' 
            : 'border-slate-200 dark:border-slate-800 focus-within:border-indigo-500/50 focus-within:shadow-[0_0_20px_rgba(99,102,241,0.1)]'}
      `}>
        <span className="pl-3 md:pl-4 pr-2 text-slate-400 dark:text-slate-600 font-mono text-lg md:text-xl select-none">/</span>
        <input
          type="text"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          className="w-full bg-transparent py-3 md:py-4 text-lg md:text-xl font-mono text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-700 outline-none"
          placeholder="Type your regex..."
          autoComplete="off"
          spellCheck="false"
        />
        <span className="pl-2 pr-3 md:pr-4 text-slate-400 dark:text-slate-600 font-mono text-lg md:text-xl select-none">/g</span>
      </div>
      
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent opacity-50" />
    </div>
  );
};