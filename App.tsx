import React, { useState } from 'react';
import Snowfall from './components/Snowfall';
import ScriptModal from './components/ScriptModal';
import ChangelogModal from './components/ChangelogModal';
import { FileCode, ScrollText } from 'lucide-react';

const App: React.FC = () => {
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false);
  const [isChangelogOpen, setIsChangelogOpen] = useState(false);

  // The specific script requested by the user
  const scriptContent = `loadstring(game:HttpGet("https://api.junkie-development.de/api/v1/luascripts/public/d9ae31e0dc92da000fbf5bc65c1153ff708ba943a506827f40aec008685f208e/download"))()`;

  const handleOpenScript = () => setIsScriptModalOpen(true);
  const handleCloseScript = () => setIsScriptModalOpen(false);

  const handleOpenChangelog = () => setIsChangelogOpen(true);
  const handleCloseChangelog = () => setIsChangelogOpen(false);

  // Updated function for Discord button with new link
  const handleDiscordClick = () => {
    window.open('https://discord.gg/VWDPFpwD', '_blank');
  };

  const isAnyModalOpen = isScriptModalOpen || isChangelogOpen;

  // Shared button class to ensure 100% consistency
  const buttonClass = "group relative flex items-center justify-center gap-3 px-6 py-4 bg-zinc-900/50 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-600 rounded-xl transition-all duration-300 backdrop-blur-md active:scale-95 w-full md:w-auto min-w-[180px]";

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Animation */}
      <Snowfall />

      {/* Main Content */}
      <div 
        className={`z-10 flex flex-col items-center space-y-8 p-6 transition-all duration-700 ease-in-out ${
          isAnyModalOpen 
            ? 'blur-[4px] scale-[0.98] opacity-60' 
            : 'blur-0 scale-100 opacity-100'
        }`}
      >
        
        {/* Title / Branding */}
        <div className="text-center animate-slide-up relative">
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center justify-center gap-1">
            <span className="relative inline-block mr-1">
              C
            </span>
            <span>ASUAL HUB</span>
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl animate-slide-up items-center justify-center flex-wrap" style={{ animationDelay: '0.1s' }}>
          
          <button
            onClick={handleDiscordClick}
            className={buttonClass}
          >
            {/* Custom Discord Logo SVG matching the design */}
            <svg 
              className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.2 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08 0-.1c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09 0 .1c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.48-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.85 2.12-1.89 2.12z"/>
            </svg>
            <span className="font-medium text-zinc-300 group-hover:text-white tracking-wide">Discord Server</span>
            <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
          </button>

          <button
            onClick={handleOpenScript}
            className={buttonClass}
          >
            <FileCode className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
            <span className="font-medium text-zinc-300 group-hover:text-white tracking-wide">Get Script</span>
            <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
          </button>

          <button
            onClick={handleOpenChangelog}
            className={buttonClass}
          >
            <ScrollText className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
            <span className="font-medium text-zinc-300 group-hover:text-white tracking-wide">Changelogs</span>
            <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
          </button>

        </div>
      </div>

      {/* Footer / Copyright */}
      <div className="absolute bottom-6 text-zinc-700 text-xs tracking-widest uppercase z-10">
        © {new Date().getFullYear()} Junkie Development
      </div>

      {/* Script Modal Overlay */}
      <ScriptModal 
        isOpen={isScriptModalOpen} 
        onClose={handleCloseScript} 
        content={scriptContent} 
      />

      {/* Changelog Modal */}
      <ChangelogModal
        isOpen={isChangelogOpen}
        onClose={handleCloseChangelog}
      />
    </div>
  );
};

export default App;