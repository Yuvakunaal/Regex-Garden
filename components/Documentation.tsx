import React from 'react';
import { X, FileText, CheckCircle2, XCircle, Zap, Eye, PlayCircle } from 'lucide-react';

interface DocumentationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Documentation: React.FC<DocumentationProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 font-sans">
      <div 
        className="absolute inset-0 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-400">
               <FileText size={20} />
             </div>
             <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Documentation</h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">User Guide</p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
            
            {/* Intro */}
            <section>
                <p className="text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                    Regex Garden is a specialized debugger designed to help developers <strong>visualize</strong>, <strong>trace</strong>, and <strong>understand</strong> regular expressions. It treats regex patterns as structured logic to be debugged, not just magic strings.
                </p>
            </section>

            {/* Workflow Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <FeatureCard 
                    icon={<Eye size={20} />}
                    title="Visualize"
                    desc="Break down complex patterns into color-coded, logical tokens to understand their hierarchy."
                />
                <FeatureCard 
                    icon={<PlayCircle size={20} />}
                    title="Test"
                    desc="Validate against multiple test cases simultaneously with real-time feedback."
                />
                 <FeatureCard 
                    icon={<Zap size={20} />}
                    title="Debug"
                    desc="Step through matches individually using the timeline debugger to isolate issues."
                />
            </section>

            {/* Do's and Don'ts */}
            <section className="bg-slate-50 dark:bg-slate-950/50 rounded-xl p-6 border border-slate-100 dark:border-slate-800/50">
                <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest mb-4">Best Practices</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                            <CheckCircle2 size={16} />
                            <span>Recommended Use</span>
                        </div>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li className="flex gap-2 items-start"><span className="text-emerald-500 mt-1">•</span> Debugging inherited legacy patterns</li>
                            <li className="flex gap-2 items-start"><span className="text-emerald-500 mt-1">•</span> Optimizing performance by visualizing structure</li>
                            <li className="flex gap-2 items-start"><span className="text-emerald-500 mt-1">•</span> Validating edge cases in test strings</li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-red-500 dark:text-red-400 font-bold text-sm">
                            <XCircle size={16} />
                            <span>Not Intended For</span>
                        </div>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li className="flex gap-2 items-start"><span className="text-red-500 mt-1">•</span> Generating regex from plain English (No AI)</li>
                            <li className="flex gap-2 items-start"><span className="text-red-500 mt-1">•</span> Storing sensitive PII (Client-side, but be safe)</li>
                            <li className="flex gap-2 items-start"><span className="text-red-500 mt-1">•</span> Learning basic programming concepts</li>
                        </ul>
                    </div>
                </div>
            </section>
            
            {/* Example */}
             <section>
                <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest mb-3">Example Workflow</h3>
                <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-xs md:text-sm text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <span className="text-indigo-500 font-bold select-none">1. Input:</span>
                            <span>Paste pattern <code className="bg-white dark:bg-slate-800 px-1 rounded">^(\w+)@([\w.-]+)\.([a-z]{'{'}2,{'}'})$</code></span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-indigo-500 font-bold select-none">2. See:</span>
                            <span>Observe the <strong>Token Breakdown</strong> panel parsing anchors, groups, and sets.</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-indigo-500 font-bold select-none">3. Test:</span>
                            <span>Type <code className="bg-white dark:bg-slate-800 px-1 rounded">hello@world.com</code> in the test area.</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-indigo-500 font-bold select-none">4. Trace:</span>
                            <span>Use the <strong>Timeline</strong> at the bottom to replay the match.</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-center">
            <button 
                onClick={onClose}
                className="px-8 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold rounded-lg hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-indigo-500/10"
            >
                Start Debugging
            </button>
        </div>

      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <div className="p-4 rounded-xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-colors">
        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 mb-3">
            {icon}
        </div>
        <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">{title}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
    </div>
);