
import React, { useState } from 'react';
import { Languages, Router, HardDrive, Trash2, AlertCircle, Sun, Moon, Monitor } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { translations } from '../../translations';
import { ServiceMode, StorageType } from '../../types';
import { Theme } from '../../store/appStore';

interface GeneralTabProps {
    serviceMode: ServiceMode;
    setServiceMode: (mode: ServiceMode) => void;
    storageType: StorageType;
    setStorageType: (type: StorageType) => void;
    onClearData: () => void;
    setActiveTab: (tab: any) => void;
}

export const GeneralTab: React.FC<GeneralTabProps> = ({
    serviceMode, setServiceMode,
    storageType, setStorageType,
    onClearData, setActiveTab
}) => {
    const { language, setLanguage, theme, setTheme } = useAppStore();
    const t = translations[language];
    const [showClearConfirm, setShowClearConfirm] = useState(false);

    return (
        <div className="space-y-6">
            <div>
                <label className="flex items-center gap-2 text-xs font-medium text-slate-800 dark:text-white/80 mb-2">
                    <Languages className="w-3.5 h-3.5 text-purple-400" />
                    {t.language}
                </label>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={() => setLanguage('en')}
                        className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 border ${language === 'en' ? 'bg-purple-600/90 border-purple-500/50 text-on-accent shadow-lg shadow-purple-900/20' : 'bg-slate-900/[0.03] dark:bg-white/[0.03] border-slate-900/10 dark:border-white/10 text-slate-600 dark:text-white/60 hover:bg-slate-900/[0.06] dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white hover:border-slate-900/20 dark:hover:border-white/20'}`}
                    >
                        English
                    </button>
                    <button
                        onClick={() => setLanguage('zh')}
                        className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 border ${language === 'zh' ? 'bg-purple-600/90 border-purple-500/50 text-on-accent shadow-lg shadow-purple-900/20' : 'bg-slate-900/[0.03] dark:bg-white/[0.03] border-slate-900/10 dark:border-white/10 text-slate-600 dark:text-white/60 hover:bg-slate-900/[0.06] dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white hover:border-slate-900/20 dark:hover:border-white/20'}`}
                    >
                        中文
                    </button>
                </div>
            </div>

            <div>
                <label className="flex items-center gap-2 text-xs font-medium text-slate-800 dark:text-white/80 mb-2">
                    {theme === 'light' ? <Sun className="w-3.5 h-3.5 text-yellow-400" /> :
                     theme === 'dark' ? <Moon className="w-3.5 h-3.5 text-indigo-400" /> :
                     <Monitor className="w-3.5 h-3.5 text-cyan-400" />}
                    {t.theme}
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {[
                        { id: 'light' as Theme, label: t.theme_light, icon: Sun },
                        { id: 'dark' as Theme, label: t.theme_dark, icon: Moon },
                        { id: 'system' as Theme, label: t.theme_system, icon: Monitor }
                    ].map(option => {
                        const Icon = option.icon;
                        return (
                            <button
                                key={option.id}
                                onClick={() => setTheme(option.id)}
                                className={`px-2 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 border flex items-center justify-center gap-1.5 ${theme === option.id ? 'bg-purple-600/90 border-purple-500/50 text-on-accent shadow-lg shadow-purple-900/20' : 'bg-slate-900/[0.03] dark:bg-white/[0.03] border-slate-900/10 dark:border-white/10 text-slate-600 dark:text-white/60 hover:bg-slate-900/[0.06] dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white hover:border-slate-900/20 dark:hover:border-white/20'}`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                {option.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div>
                <label className="flex items-center gap-2 text-xs font-medium text-slate-800 dark:text-white/80 mb-2">
                    <Router className="w-3.5 h-3.5 text-blue-400" />
                    {t.service_mode}
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {[
                        { id: 'local', label: t.mode_local },
                        { id: 'server', label: t.mode_server },
                        { id: 'hydration', label: t.mode_hydration }
                    ].map(option => (
                        <button
                            key={option.id}
                            onClick={() => setServiceMode(option.id as ServiceMode)}
                            className={`px-2 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 border truncate ${serviceMode === option.id ? 'bg-blue-600/90 border-blue-500/50 text-on-accent shadow-lg shadow-blue-900/20' : 'bg-slate-900/[0.03] dark:bg-white/[0.03] border-slate-900/10 dark:border-white/10 text-slate-600 dark:text-white/60 hover:bg-slate-900/[0.06] dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white hover:border-slate-900/20 dark:hover:border-white/20'}`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="flex items-center gap-2 text-xs font-medium text-slate-800 dark:text-white/80 mb-2">
                    <HardDrive className="w-3.5 h-3.5 text-green-400" />
                    {t.storage_service}
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {[
                        { id: 'opfs', label: t.storage_opfs },
                        { id: 's3', label: t.storage_s3 },
                        { id: 'webdav', label: t.storage_webdav }
                    ].map(option => (
                        <button
                            key={option.id}
                            onClick={() => {
                                setStorageType(option.id as StorageType)
                                if (option.id === 's3') setActiveTab('s3');
                                if (option.id === 'webdav') setActiveTab('webdav');
                            }}
                            className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 border ${storageType === option.id ? 'bg-green-600/90 border-green-500/50 text-on-accent shadow-lg shadow-green-900/20' : 'bg-slate-900/[0.03] dark:bg-white/[0.03] border-slate-900/10 dark:border-white/10 text-slate-600 dark:text-white/60 hover:bg-slate-900/[0.06] dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white hover:border-slate-900/20 dark:hover:border-white/20'}`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="pt-2 border-t border-slate-900/5 dark:border-white/5">
                <label className="flex items-center gap-2 text-xs font-medium text-red-400 mb-2">
                    <Trash2 className="w-3.5 h-3.5" />
                    {t.clearData}
                </label>
                <p className="text-xs text-slate-500 dark:text-white/40 mb-3">{t.clearDataDesc}</p>
                {!showClearConfirm ? (
                    <button onClick={() => setShowClearConfirm(true)} className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-medium transition-colors">
                        {t.clearData}
                    </button>
                ) : (
                    <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                            <span className="text-xs text-red-200 leading-relaxed">{t.clearDataConfirm}</span>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setShowClearConfirm(false)} className="flex-1 py-2 bg-slate-900/5 dark:bg-white/5 hover:bg-slate-900/10 dark:hover:bg-white/10 text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white rounded-lg text-xs font-medium transition-colors">{t.cancel}</button>
                            <button onClick={onClearData} className="flex-1 py-2 bg-red-600 hover:bg-red-500 text-on-accent rounded-lg text-xs font-bold transition-colors shadow-lg shadow-red-900/20">{t.confirm}</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
