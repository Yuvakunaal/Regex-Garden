import React, { useState, useEffect, useCallback } from 'react';
import { RegexInput } from './components/RegexInput';
import { TokenBreakdown } from './components/TokenBreakdown';
import { TestArea } from './components/TestArea';
import { Debugger } from './components/Debugger';
import { RegexReference } from './components/RegexReference';
import { Documentation } from './components/Documentation';
import { tokenizeRegex } from './utils/regexEngine';
import { MatchResult, RegexToken } from './types';
import { Flower, Book, Sun, Moon, FileText } from 'lucide-react';

const App = () => {
  const [pattern, setPattern] = useState<string>('^(\\w+)@([\\w.-]+)\\.([a-z]{2,})$');
  const [text, setText] = useState<string>('contact@regex.garden\nsupport@google.com\ninvalid-email@place');
  const [regexError, setRegexError] = useState<string | null>(null);
  const [isReferenceOpen, setIsReferenceOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  
  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Logic State
  const [tokens, setTokens] = useState<RegexToken[]>([]);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [hoveredTokenIndex, setHoveredTokenIndex] = useState<number | null>(null);
  const [selectedMatchIndex, setSelectedMatchIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Toggle Theme Class on Body
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // 1. Parse tokens whenever pattern changes
  useEffect(() => {
    setTokens(tokenizeRegex(pattern));
  }, [pattern]);

  // 2. Execute Regex against text
  useEffect(() => {
    try {
      if (!pattern) {
        setMatches([]);
        setRegexError(null);
        setSelectedMatchIndex(null);
        return;
      }
      
      const regex = new RegExp(pattern, 'gm'); // Force global multiline
      const newMatches: MatchResult[] = [];
      let match;
      
      let loops = 0;
      
      while ((match = regex.exec(text)) !== null) {
        loops++;
        if (loops > 2000) break; // Safety
        
        newMatches.push({
          fullMatch: match[0],
          index: match.index,
          groups: match.slice(1)
        });

        if (match.index === regex.lastIndex) {
            regex.lastIndex++;
        }
      }
      
      setMatches(newMatches);
      setRegexError(null);
      // Reset selection when matches change
      setSelectedMatchIndex(null); 
      setIsPlaying(false);
    } catch (e: any) {
      // User requested simpler error messages
      setRegexError("Invalid Syntax"); 
      setMatches([]);
    }
  }, [pattern, text]);

  // Navigation Logic
  const handleNextMatch = useCallback(() => {
    if (matches.length === 0) return;
    setSelectedMatchIndex(prev => {
        if (prev === null) return 0;
        return (prev + 1) % matches.length;
    });
  }, [matches]);

  const handlePrevMatch = useCallback(() => {
    if (matches.length === 0) return;
    setSelectedMatchIndex(prev => {
        if (prev === null) return matches.length - 1;
        return (prev - 1 + matches.length) % matches.length;
    });
  }, [matches]);

  // Autoplay Logic
  useEffect(() => {
    let interval: any;
    if (isPlaying && matches.length > 0) {
        interval = setInterval(() => {
            handleNextMatch();
        }, 1200); // 1.2s per match step
    } else {
        clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, matches, handleNextMatch]);

  return (
    // Use h-[100dvh] for mobile browsers to handle address bar resizing correctly
    <div className="flex flex-col h-[100dvh] bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 overflow-hidden selection:bg-indigo-500/30 transition-colors duration-300">
      {/* Header */}
      <header className="px-4 md:px-6 py-3 md:py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-950 relative z-20 transition-colors duration-300 flex-none">
        <div className="flex items-center gap-2 md:gap-3">
            <div className="p-1.5 md:p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                <Flower size={18} className="md:w-5 md:h-5" strokeWidth={2.5} />
            </div>
            <div>
                <h1 className="font-bold text-base md:text-lg tracking-tight text-slate-900 dark:text-slate-100 leading-none">Regex Garden</h1>
                <p className="text-[9px] md:text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-0.5 md:mt-1 flex items-center">
                  <span className="hidden sm:flex items-center">
                    Understand. Trace. Test. <span className="opacity-50 mx-1">/</span> 
                  </span>
                  <span className="group relative cursor-help hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                    By kunaal
                    <span className="absolute left-0 top-full mt-2 w-max px-2.5 py-1.5 bg-slate-800 dark:bg-slate-700 text-slate-100 text-[10px] font-sans font-medium rounded-md shadow-xl opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-200 pointer-events-none z-50 tracking-normal normal-case border border-slate-700 dark:border-slate-600 transform -translate-y-1 group-hover:translate-y-0">
                      Made for my friends
                      <span className="absolute -top-1 left-4 w-2 h-2 bg-slate-800 dark:bg-slate-700 border-t border-l border-slate-700 dark:border-slate-600 transform rotate-45"></span>
                    </span>
                  </span>
                </p>
            </div>
        </div>
        
        <div className="flex items-center">
            <button 
                onClick={toggleTheme}
                className="p-2 text-slate-500 hover:text-orange-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors mr-1 md:mr-2"
                title="Toggle Theme"
            >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button 
                onClick={() => setIsDocsOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-all mr-1 md:mr-2"
            >
                <FileText size={16} />
                <span className="hidden sm:inline">Docs</span>
            </button>

            <button 
                onClick={() => setIsReferenceOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500/30 hover:bg-white dark:hover:bg-slate-800 transition-all group"
            >
                <Book size={14} className="group-hover:scale-110 transition-transform"/>
                <span className="hidden sm:inline">Reference</span>
            </button>
        </div>
      </header>

      {/* Main Content Grid 
          Mobile & Tablet (< xl): Vertical scroll, stacked items.
          Desktop (xl+): Hidden scroll (inner panels scroll), side-by-side.
      */}
      <div className="flex-1 flex flex-col p-4 md:p-6 gap-4 md:gap-6 overflow-y-auto xl:overflow-hidden relative z-10">
        {/* Top: Regex Input */}
        <section className="flex-none">
            <RegexInput pattern={pattern} setPattern={setPattern} error={regexError} />
        </section>

        {/* Middle: Split Pane 
            Mobile & Tablet (< xl): Flex Column. Order-1 is TestArea (Top), Order-2 is Breakdown (Bottom).
            Desktop (xl+): Flex Row. Order-1 is Breakdown (Left), Order-2 is TestArea (Right).
        */}
        <section className="flex-1 flex flex-col xl:flex-row gap-4 md:gap-6 min-h-0">
             
            {/* Token Breakdown - Fixed height on mobile/tablet so page doesn't get infinitely long if many tokens */}
            <div className="w-full xl:w-1/2 h-[350px] xl:h-full flex-none xl:flex-1 order-2 xl:order-1">
                <TokenBreakdown 
                    tokens={tokens} 
                    hoveredTokenIndex={hoveredTokenIndex}
                    setHoveredTokenIndex={setHoveredTokenIndex}
                />
            </div>

            {/* Test Area - Auto height on mobile/tablet (grows with text), Full height on desktop */}
            <div className="w-full xl:w-1/2 h-auto xl:h-full flex-none xl:flex-1 order-1 xl:order-2">
                <TestArea 
                    text={text} 
                    setText={setText} 
                    matches={matches} 
                    selectedMatchIndex={selectedMatchIndex}
                />
            </div>
        </section>
      </div>

      {/* Bottom: Debugger/Timeline */}
      <section className="flex-none z-10">
          <Debugger 
            matches={matches} 
            selectedMatchIndex={selectedMatchIndex}
            onSelectMatch={(idx) => {
                setSelectedMatchIndex(idx);
                setIsPlaying(false);
            }}
            onNext={() => {
                handleNextMatch();
                setIsPlaying(false);
            }}
            onPrev={() => {
                handlePrevMatch();
                setIsPlaying(false);
            }}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
          />
      </section>

      {/* Reference Panel */}
      <RegexReference isOpen={isReferenceOpen} onClose={() => setIsReferenceOpen(false)} />
      
      {/* Documentation Modal */}
      <Documentation isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />
    </div>
  );
};

export default App;