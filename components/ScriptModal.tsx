import React, { useState, useEffect } from 'react';
import { Copy, Check, X, Terminal } from 'lucide-react';

interface ScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
}

const ScriptModal: React.FC<ScriptModalProps> = ({ isOpen, onClose, content }) => {
  const [copied, setCopied] = useState(false);
  
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let timeoutId: number;
    
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      timeoutId = window.setTimeout(() => {
        setShouldRender(false);
      }, 500);
    }

    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  if (!shouldRender) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ease-out ${
        isAnimating ? 'backdrop-blur-[2px]' : 'backdrop-blur-none'
      }`}
    >
      <div 
        className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      <div 
        className={`relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/50 transform transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${
          isAnimating
            ? 'scale-100 translate-y-0 opacity-100' 
            : 'scale-90 translate-y-12 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800/50 bg-zinc-900/20 rounded-t-2xl">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                <Terminal className="w-5 h-5 text-zinc-200" />
            </div>
            <div>
              <h2 className="font-semibold text-zinc-100 tracking-wide text-lg">Casual Hub Loader</h2>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium mt-0.5">Lua Script</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-800 text-zinc-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          <div className="relative">
            {/* Clean code block without buggy effects */}
            <pre className="w-full h-32 md:h-28 p-5 rounded-xl bg-black border border-zinc-800 text-zinc-300 font-mono text-xs md:text-sm overflow-x-auto whitespace-pre-wrap break-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
              {content}
            </pre>
          </div>
          <p className="text-zinc-500 text-xs mt-4 text-center">
            Copy the script above and paste it into your executor of choice.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-zinc-900/30 rounded-b-2xl flex justify-end items-center border-t border-zinc-800/30">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300 transform active:scale-95 shadow-[0_0_10px_rgba(255,255,255,0.05)] ${
              copied
                ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                : 'bg-white text-black hover:bg-zinc-200'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Script</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScriptModal;