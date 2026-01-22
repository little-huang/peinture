
import React, { useState, useEffect } from 'react';
import { Logo } from './Icons';
import { Tooltip } from './Tooltip';
import { useAppStore } from '../store/appStore';
import { translations } from '../translations';
import {
  Sparkles,
  Settings,
  CircleHelp,
  Github,
  PencilRuler,
  ChevronDown,
  Check,
  Image as ImageIcon,
  Sun,
  Moon
} from 'lucide-react';

export type AppView = 'creation' | 'editor' | 'gallery';

interface HeaderProps {
  onOpenSettings: () => void;
  onOpenFAQ: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSettings,
  onOpenFAQ
}) => {
  const { language, currentView, setCurrentView, theme, setTheme } = useAppStore();
  const t = translations[language];
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Subscribe to system theme changes and theme state changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateIsDark = () => {
      setIsDark(theme === 'dark' || (theme === 'system' && mediaQuery.matches));
    };

    const handleMediaChange = () => {
      if (theme === 'system') {
        updateIsDark();
      }
    };

    updateIsDark();
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <header className="w-full backdrop-blur-md sticky top-0 z-50 bg-gray-100/30 dark:bg-background-dark/30 border-b border-gray-300/20 dark:border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2 py-3 md:px-8 md:py-4 relative">
        
        {/* Logo & Title - Visible on all devices */}
        <div className="flex items-center gap-2 text-gray-900 dark:text-white shrink-0">
          <Logo className="size-8 md:size-10" />
          <h1 className="text-gray-900 dark:text-white text-lg md:text-xl font-bold leading-tight tracking-[-0.015em]">{t.appTitle}</h1>
        </div>

        {/* Mobile: View Switcher Dropdown (Centered) */}
        <div className="md:hidden absolute left-1/2 -translate-x-1/2 z-50 select-none">
            <button
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-200/80 dark:bg-white/10 border border-gray-300/50 dark:border-white/10 backdrop-blur-md text-sm font-medium text-gray-900 dark:text-white shadow-lg active:scale-95 transition-all"
            >
                {currentView === 'creation' ? <>
                  <Sparkles className="w-4 h-4" />
                  {t.nav_creation}
                </> : (currentView === 'editor' ? <>
                  <PencilRuler className="w-4 h-4" />
                  {t.nav_editor}
                </> : <>
                  <ImageIcon className="w-4 h-4" />
                  {t.nav_gallery}
                </>)}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMobileNavOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown Menu */}
            {isMobileNavOpen && (
                <>
                    <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsMobileNavOpen(false)} 
                    />
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white/95 dark:bg-[#1A1625]/95 backdrop-blur-xl border border-gray-300/50 dark:border-white/10 rounded-xl shadow-2xl p-1.5 flex flex-col gap-1 z-50 animate-in fade-in zoom-in-95 duration-200">
                        <button
                            onClick={() => { setCurrentView('creation'); setIsMobileNavOpen(false); }}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${currentView === 'creation' ? 'bg-purple-600/20 text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'}`}
                        >
                            <Sparkles className="w-4 h-4" />
                            {t.nav_creation}
                            {currentView === 'creation' && <Check className="w-3.5 h-3.5 ml-auto" />}
                        </button>
                        <button
                            onClick={() => { setCurrentView('editor'); setIsMobileNavOpen(false); }}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${currentView === 'editor' ? 'bg-purple-600/20 text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'}`}
                        >
                            <PencilRuler className="w-4 h-4" />
                            {t.nav_editor}
                            {currentView === 'editor' && <Check className="w-3.5 h-3.5 ml-auto" />}
                        </button>
                        <button
                            onClick={() => { setCurrentView('gallery'); setIsMobileNavOpen(false); }}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${currentView === 'gallery' ? 'bg-purple-600/20 text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'}`}
                        >
                            <ImageIcon className="w-4 h-4" />
                            {t.nav_gallery}
                            {currentView === 'gallery' && <Check className="w-3.5 h-3.5 ml-auto" />}
                        </button>
                    </div>
                </>
            )}
        </div>

        {/* Desktop: Sliding Pill Navigation (Centered) */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
            <div className="relative flex items-center bg-gray-200/50 dark:bg-black/20 border border-gray-300/50 dark:border-white/10 rounded-full p-1 w-[300px]">
                {/* Background Sliding Pill */}
                <div 
                    className={`absolute top-1 bottom-1 rounded-full bg-purple-600 shadow-lg shadow-purple-900/30 transition-all duration-300 ease-out z-0 w-[calc(33.33%-4px)]
                    ${currentView === 'creation' ? 'left-1' : 
                      (currentView === 'editor' ? 'left-[calc(33.33%+2px)]' : 
                      'left-[calc(66.66%+2px)]')}
                    `}
                />
                
                {/* Creation Button */}
                <button
                    onClick={() => setCurrentView('creation')}
                    className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-1.5 text-sm font-medium transition-colors duration-300 ${currentView === 'creation' ? 'text-on-accent' : 'text-gray-700 dark:text-white/60 hover:text-gray-900 dark:hover:text-white/90'}`}
                >
                    <Sparkles className="w-4 h-4" />
                    {t.nav_creation}
                </button>

                {/* Editor Button */}
                <button
                    onClick={() => setCurrentView('editor')}
                    className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-1.5 text-sm font-medium transition-colors duration-300 ${currentView === 'editor' ? 'text-on-accent' : 'text-gray-700 dark:text-white/60 hover:text-gray-900 dark:hover:text-white/90'}`}
                >
                    <PencilRuler className="w-4 h-4" />
                    {t.nav_editor}
                </button>

                {/* Gallery Button */}
                <button
                    onClick={() => setCurrentView('gallery')}
                    className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-1.5 text-sm font-medium transition-colors duration-300 ${currentView === 'gallery' ? 'text-on-accent' : 'text-gray-700 dark:text-white/60 hover:text-gray-900 dark:hover:text-white/90'}`}
                >
                    <ImageIcon className="w-4 h-4" />
                    {t.nav_gallery}
                </button>
            </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-1 shrink-0">
          <Tooltip content={t.sourceCode} position="bottom">
              <a
                href="https://github.com/Amery2010/peinture"
                className="flex items-center justify-center p-2 rounded-lg text-gray-600 dark:text-white/70 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-200 dark:hover:bg-white/10 transition-all active:scale-95"
                target="_blank"
              >
                <Github className="w-5 h-5" />
              </a>
          </Tooltip>

          <Tooltip content={isDark ? t.theme_light : t.theme_dark} position="bottom">
              <button
                onClick={toggleTheme}
                aria-label={isDark ? t.theme_light : t.theme_dark}
                className="flex items-center justify-center p-2 rounded-lg text-gray-600 dark:text-white/70 hover:text-yellow-500 dark:hover:text-yellow-400 hover:bg-gray-200 dark:hover:bg-white/10 transition-all active:scale-95"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
          </Tooltip>

          <Tooltip content={t.help} position="bottom">
              <button
                onClick={onOpenFAQ}
                className="flex items-center justify-center p-2 rounded-lg text-gray-600 dark:text-white/70 hover:text-green-500 dark:hover:text-green-400 hover:bg-gray-200 dark:hover:bg-white/10 transition-all active:scale-95"
              >
                <CircleHelp className="w-5 h-5" />
              </button>
          </Tooltip>

          <Tooltip content={t.settings} position="bottom">
              <button
                onClick={onOpenSettings}
                className="flex items-center justify-center p-2 rounded-lg text-gray-600 dark:text-white/70 hover:text-purple-500 dark:hover:text-purple-400 hover:bg-gray-200 dark:hover:bg-white/10 transition-all active:scale-95"
              >
                <Settings className="w-5 h-5" />
              </button>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};
