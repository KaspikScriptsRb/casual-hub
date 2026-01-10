import React, { useState, useEffect } from 'react';
import { X, ScrollText, AlertCircle, Plus, Minus, Hash, RefreshCw, Clock } from 'lucide-react';

interface ChangelogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const rawChangelog = [
  {
    title: "Bubble Gum Simulator INFINITY Version 1.1",
    items: [
      "Added Events Tab:",
      "[+] Auto Pick-Up Tickets",
      "[+] Auto Buy | Circus Shop",
      "[+] Auto Upgrade",
      "[+] Auto Win Minigames",
      "[+] Auto Open Chest (Key needed)",
      "[+] Executor Info",
      "[+] Rejoin",
      "[+] Server Hop",
      "[+] Anti Lag",
      "[+] Anti Stealer (Blocks Trades,Gamepasses)",
      "[/] Added 3 new eggs in Auto Open Eggs",
      "[/] Fixed Auto Pick-Up Game errors",
      "[/] Increased JumpPower Slider to 1000",
      "[SOON] Auto Buy | Ticket Shop",
      "[SOON] Auto Use Potions",
      "[SOON] Improve Auto Complete Quests",
      "[SOON] More Functions"
    ]
  },
  {
    title: "The Lost Front",
    items: [
      "[-] Fixed script loading error"
    ]
  },
  {
    title: "Counter Blox",
    items: [
      "[/] Improved Bunnyhop",
      "[+] Fast equip",
      "[+] Fast reload time",
      "[+] Rapidfire",
      "[+] Double tap",
      "[+] Triple tap",
      "[+] Stored ammo",
      "[+] Visual Effects (Night mode, Fullbright, Custom atmosphere, Transparent texture, Bullet tracer)",
      "[+] ThirdPerson",
      "[/] Improved Bunny hop",
      "[/] Improved No Spread",
      "[/] Improved No Recoil"
    ]
  },
  {
    title: "NEW Notoriety: A PAYDAY® Experience",
    items: [
      "[+] ESP KeyCard (Do not enable keycard ESP if none exist on map to avoid lag)",
      "[+] AutoPager (Bugs may occur; stand nearby for auto pager to work)",
      "[+] Noclip",
      "[+] Color settings (Citizen, Guard, Police, Camera, KeyCard)",
      "[+] Infinity Jump (Works even without mask)",
      "[/] Fly (Fixed noclip behavior)",
      "[-] Script is in beta testing, bugs may occur"
    ]
  }
];

const ChangelogModal: React.FC<ChangelogModalProps> = ({ isOpen, onClose }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Double requestAnimationFrame ensures the browser paints the initial state (opacity-0)
      // before applying the transition to opacity-100. This is more reliable than setTimeout on mobile.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      // Wait for the animation to finish before unmounting (500ms matches CSS duration)
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  // Helper to style tag prefixes
  const renderItem = (text: string) => {
    let icon = <Hash className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-1" />;
    let content = text;
    let className = "text-zinc-400";
    let containerClass = "border-transparent bg-transparent";

    if (text.startsWith("[+]")) {
      icon = <Plus className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-1" />;
      content = text.replace("[+]", "").trim();
      className = "text-emerald-100/90";
      containerClass = "bg-emerald-500/5 border-emerald-500/10";
    } else if (text.startsWith("[/]")) {
      icon = <RefreshCw className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-1" />;
      content = text.replace("[/]", "").trim();
      className = "text-blue-100/90";
      containerClass = "bg-blue-500/5 border-blue-500/10";
    } else if (text.startsWith("[-]")) {
      icon = <Minus className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-1" />;
      content = text.replace("[-]", "").trim();
      className = "text-amber-100/90";
      containerClass = "bg-amber-500/5 border-amber-500/10";
    } else if (text.startsWith("[SOON]")) {
      icon = <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-1" />;
      content = text.replace("[SOON]", "").trim();
      className = "text-purple-100/90";
      containerClass = "bg-purple-500/5 border-purple-500/10";
    }

    return (
      <div className={`flex items-start gap-3 p-2 rounded-lg border ${containerClass} transition-colors hover:bg-opacity-10`}>
        {icon}
        <span className={`${className} text-sm leading-relaxed`}>{content}</span>
      </div>
    );
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
        className={`relative w-full max-w-3xl max-h-[85vh] flex flex-col bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/50 transform transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${
          isAnimating
            ? 'scale-100 translate-y-0 opacity-100' 
            : 'scale-90 translate-y-12 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800/50 bg-zinc-900/20 rounded-t-2xl shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                <ScrollText className="w-5 h-5 text-zinc-200" />
            </div>
            <div>
                <h2 className="font-semibold text-zinc-100 tracking-wide text-lg">Changelogs</h2>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium mt-0.5">Latest Updates</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-800 text-zinc-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 pb-8 custom-scrollbar space-y-8 rounded-b-2xl">
          {rawChangelog.map((section, idx) => (
            <div key={idx} className="relative">
              {/* Timeline line */}
              {idx !== rawChangelog.length - 1 && (
                <div className="absolute left-[19px] top-10 bottom-[-32px] w-px bg-zinc-800/50" />
              )}
              
              <div className="flex gap-4">
                <div className="shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-lg shadow-black/20 z-10">
                        <AlertCircle className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>
                
                <div className="flex-1">
                    <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                        {section.title}
                    </h3>
                    <div className="space-y-1">
                        {section.items.map((item, itemIdx) => (
                            <React.Fragment key={itemIdx}>
                                {renderItem(item)}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChangelogModal;
