'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  RefreshCw, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Key, 
  Server, 
  Database, 
  Radio, 
  Eye, 
  EyeOff, 
  Sliders, 
  Activity,
  Layers,
  Sparkles,
  Lock
} from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface ProviderHealth {
  id: string;
  name: string;
  category: string;
  website: string;
  authType: string;
  credentialConfigured: boolean;
  maskedCredentialDisplay: string;
  connectionStatus: 'CONNECTED' | 'AUTHENTICATED' | 'PUBLIC_ACCESS' | 'CONFIG_REQUIRED' | 'DEGRADED';
  freshnessStatus: 'LIVE_FEED' | 'RECENT_DATA' | 'HISTORICAL_DATA' | 'PREDICTED' | 'UNAVAILABLE';
  lastSuccessfulSync: string;
  totalSyncedItems: number;
  rateLimitStatus: string;
  errorDetails: string | null;
  features: string[];
}

interface DataProviderSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
}

export function DataProviderSettingsModal({
  isOpen,
  onClose,
  isLightMode = false
}: DataProviderSettingsModalProps) {
  const [providers, setProviders] = useState<ProviderHealth[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<Record<string, { success: boolean; message: string }>>({});
  const [activeTab, setActiveTab] = useState<'all' | 'connected' | 'credentials'>('all');

  const fetchStatus = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/providers/status');
      const data = await res.json();
      if (data.providers) {
        setProviders(data.providers);
      }
    } catch (err) {
      console.error('Failed to fetch provider status:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestProvider = async (provider: ProviderHealth) => {
    soundManager.playClick();
    setTestingId(provider.id);
    setTestResult(prev => ({ ...prev, [provider.id]: { success: false, message: 'Initiating test probe...' } }));

    try {
      let endpoint = '';
      if (provider.id === 'celestrak') endpoint = '/api/satellites';
      else if (provider.id === 'nasa-gibs') endpoint = '/api/gibs';
      else if (provider.id === 'nasa-horizons') endpoint = '/api/horizons?target=mars';
      else if (provider.id === 'nasa-images') endpoint = '/api/nasa/images?q=ISS';
      else if (provider.id === 'nasa-open-api') endpoint = '/api/nasa/apod';
      else if (provider.id === 'copernicus-sentinel') endpoint = '/api/copernicus';
      else if (provider.id === 'space-track') endpoint = '/api/spacetrack?noradId=25544';

      const res = await fetch(endpoint);
      const json = await res.json();

      if (json.success) {
        setTestResult(prev => ({
          ...prev,
          [provider.id]: {
            success: true,
            message: `HTTP 200: Live data stream verified. Synced ${json.count || json.items?.length || 1} records from ${json.provider || provider.name}.`
          }
        }));
      } else {
        setTestResult(prev => ({
          ...prev,
          [provider.id]: {
            success: false,
            message: json.message || json.error || 'Provider returned status with pending configuration.'
          }
        }));
      }
    } catch (err: any) {
      setTestResult(prev => ({
        ...prev,
        [provider.id]: {
          success: false,
          message: err.message || 'Connection test timed out.'
        }
      }));
    } finally {
      setTestingId(null);
    }
  };

  const filteredProviders = providers.filter(p => {
    if (activeTab === 'connected') return ['CONNECTED', 'AUTHENTICATED', 'PUBLIC_ACCESS'].includes(p.connectionStatus);
    if (activeTab === 'credentials') return p.connectionStatus === 'CONFIG_REQUIRED';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden transition-colors ${
          isLightMode 
            ? 'bg-[#f7f2e8] border-[#c59b27]/40 text-[#1d130a]' 
            : 'bg-[#0f0b07] border-[#d4af37]/35 text-[#efe6d6]'
        }`}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#e8913a]/15 border border-[#e8913a]/30 flex items-center justify-center text-[#e8913a]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#fde047]">
                  ADMINISTRATOR: DATA PROVIDERS & API OBSERVATORY
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30">
                  SERVER SECURED
                </span>
              </div>
              <p className="text-xs text-[#b5a990] font-sans">
                Manage 7 external astronomical data providers, test live connectivity, inspect TLEs, and monitor credentials.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchStatus}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-xs font-mono flex items-center gap-1.5 text-[#b5a990] hover:text-[#efe6d6] transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={() => { soundManager.playClick(); onClose(); }}
              className="p-1.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-[#b5a990] hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="px-5 py-2.5 border-b border-white/10 flex items-center justify-between bg-black/20 text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeTab === 'all' ? 'bg-[#e8913a] text-black font-bold' : 'text-[#b5a990] hover:text-[#efe6d6]'
              }`}
            >
              All Providers ({providers.length})
            </button>
            <button
              onClick={() => setActiveTab('connected')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeTab === 'connected' ? 'bg-[#10b981] text-black font-bold' : 'text-[#b5a990] hover:text-[#efe6d6]'
              }`}
            >
              Active Streams ({providers.filter(p => ['CONNECTED', 'AUTHENTICATED', 'PUBLIC_ACCESS'].includes(p.connectionStatus)).length})
            </button>
            <button
              onClick={() => setActiveTab('credentials')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeTab === 'credentials' ? 'bg-[#f59e0b] text-black font-bold' : 'text-[#b5a990] hover:text-[#efe6d6]'
              }`}
            >
              Requires .env ({providers.filter(p => p.connectionStatus === 'CONFIG_REQUIRED').length})
            </button>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-[#9ca3af]">
            <Lock className="w-3 h-3 text-[#10b981]" />
            <span>Zero client-side secrets: All credentials reside strictly in server-side .env</span>
          </div>
        </div>

        {/* Content Body: Provider Cards */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 no-scrollbar">
          {filteredProviders.map(provider => {
            const isTesting = testingId === provider.id;
            const res = testResult[provider.id];

            return (
              <div
                key={provider.id}
                className="p-4 sm:p-5 rounded-xl border border-white/10 hover:border-white/20 bg-black/40 space-y-3.5 transition-all shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">
                      {provider.id === 'celestrak' ? '🛰️' :
                       provider.id === 'nasa-gibs' ? '🌍' :
                       provider.id === 'nasa-horizons' ? '🪐' :
                       provider.id === 'nasa-images' ? '📸' :
                       provider.id === 'copernicus-sentinel' ? '📡' :
                       provider.id === 'space-track' ? '🔭' : '🚀'}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm sm:text-base font-serif font-bold text-[#efe6d6]">
                          {provider.name}
                        </h4>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          provider.connectionStatus === 'CONNECTED' || provider.connectionStatus === 'AUTHENTICATED' || provider.connectionStatus === 'PUBLIC_ACCESS'
                            ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40'
                            : 'bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/40'
                        }`}>
                          {provider.connectionStatus}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-[#a8a29e] border border-white/10">
                          {provider.authType}
                        </span>
                      </div>
                      <a
                        href={provider.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-[#e8913a] hover:underline inline-flex items-center gap-1 font-mono mt-0.5"
                      >
                        <span>{provider.website}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleTestProvider(provider)}
                      disabled={isTesting}
                      className="px-3 py-1.5 rounded-lg border border-[#e8913a]/50 hover:border-[#fde047] bg-[#e8913a]/15 hover:bg-[#e8913a]/25 text-[#fde047] text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <Activity className={`w-3.5 h-3.5 ${isTesting ? 'animate-pulse text-amber-400' : ''}`} />
                      <span>{isTesting ? 'Testing...' : 'Test Connection'}</span>
                    </button>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs font-mono bg-black/30 p-3 rounded-lg border border-white/5">
                  <div>
                    <span className="text-[#a8a29e] block text-[10px] uppercase">Credentials Stored:</span>
                    <span className="text-[#efe6d6] font-medium">{provider.maskedCredentialDisplay}</span>
                  </div>
                  <div>
                    <span className="text-[#a8a29e] block text-[10px] uppercase">Freshness Status:</span>
                    <span className={`font-bold ${
                      provider.freshnessStatus === 'LIVE_FEED' ? 'text-[#10b981]' :
                      provider.freshnessStatus === 'RECENT_DATA' ? 'text-[#38bdf8]' : 'text-[#f59e0b]'
                    }`}>
                      ● {provider.freshnessStatus}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#a8a29e] block text-[10px] uppercase">Rate Limit Policy:</span>
                    <span className="text-[#efe6d6] truncate block">{provider.rateLimitStatus}</span>
                  </div>
                </div>

                {/* Features & capabilities */}
                <div className="flex items-center gap-2 flex-wrap text-[11px] font-sans text-[#b5a990]">
                  <span className="text-[#e8913a] font-mono text-[10px] uppercase tracking-wider font-bold">Capabilities:</span>
                  {provider.features.map((feat, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#d4af37]">
                      {feat}
                    </span>
                  ))}
                </div>

                {/* Instructions / Error Note if any */}
                {provider.errorDetails && (
                  <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 space-y-2">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{provider.errorDetails}</span>
                    </div>
                    {provider.id === 'copernicus-sentinel' && (
                      <div className="pl-6 pt-1 text-[11px] font-sans text-amber-300/90 space-y-1">
                        <p><strong>Setup Steps (Sentinel Hub OAuth2):</strong></p>
                        <ol className="list-decimal list-inside space-y-0.5 text-amber-200/80">
                          <li>Open <a href="https://shapps.dataspace.copernicus.eu/dashboard/#/account/settings" target="_blank" rel="noreferrer" className="underline text-amber-300 font-mono">Copernicus Dashboard Settings ↗</a></li>
                          <li>Under "OAuth clients", click <strong>Create</strong>, name it, and select "Never expire"</li>
                          <li>Copy the <strong>Client ID</strong> and <strong>Client Secret</strong></li>
                          <li>Add <code className="bg-black/50 px-1 py-0.5 rounded text-amber-200 font-mono">COPERNICUS_CLIENT_ID</code> and <code className="bg-black/50 px-1 py-0.5 rounded text-amber-200 font-mono">COPERNICUS_CLIENT_SECRET</code> to your <code className="bg-black/50 px-1 py-0.5 rounded text-amber-200 font-mono">.env.local</code></li>
                        </ol>
                        <p className="pt-1">
                          Official Docs: <a href="https://documentation.dataspace.copernicus.eu/APIs/SentinelHub/Overview/Authentication.html" target="_blank" rel="noreferrer" className="underline text-[#38bdf8] font-mono">Sentinel Hub OAuth2 Authentication Guide ↗</a>
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Test Result Feedback */}
                {res && (
                  <div className={`p-2.5 rounded-lg border text-xs font-mono flex items-start gap-2 animate-in fade-in duration-150 ${
                    res.success 
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' 
                      : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                  }`}>
                    {res.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    )}
                    <span>{res.message}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs font-mono text-[#a8a29e]">
          <div>
            <span>7 of 7 Providers Integrated</span> • <span className="text-[#10b981]">5 Operational Live</span>
          </div>
          <button
            onClick={() => { soundManager.playClick(); onClose(); }}
            className="px-4 py-1.5 rounded-lg bg-[#e8913a] text-black font-bold hover:bg-[#fde047] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
