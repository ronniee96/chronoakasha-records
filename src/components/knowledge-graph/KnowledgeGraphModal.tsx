'use client';

import React, { useState } from 'react';
import { X, Network, Search, ArrowRight, Share2, Sparkles, Orbit, Compass, Landmark, BookOpen } from 'lucide-react';
import { GLOBAL_KNOWLEDGE_NODES } from '../../data/knowledgeGraphData';
import { getNodeById, getRelatedNodes, searchKnowledgeGraph } from '../../utils/knowledgeGraphEngine';
import { KnowledgeGraphNode, EPISTEMIC_BADGES, PillarId } from '../../types/sixPillars';
import { soundManager } from '../../utils/audio';

interface KnowledgeGraphModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigatePillar: (pillar: PillarId) => void;
  isLightMode?: boolean;
  initialNodeId?: string;
}

export function KnowledgeGraphModal({
  isOpen,
  onClose,
  onNavigatePillar,
  isLightMode,
  initialNodeId = 'saturn-shani'
}: KnowledgeGraphModalProps) {
  const [activeNodeId, setActiveNodeId] = useState<string>(initialNodeId);
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const activeNode: KnowledgeGraphNode = getNodeById(activeNodeId) || GLOBAL_KNOWLEDGE_NODES[0];
  const relatedNodes: KnowledgeGraphNode[] = getRelatedNodes(activeNode.id);
  const filteredNodes: KnowledgeGraphNode[] = searchKnowledgeGraph(searchQuery);

  const getPillarLabel = (pillar: PillarId) => {
    switch (pillar) {
      case 'past': return 'Pillar I • The Past (अतीत)';
      case 'present': return 'Pillar II • The Present (वर्तमान)';
      case 'hinduCosmology': return 'Pillar III • Hindu Cosmology (सनातन)';
      case 'celestialAtlas': return 'Pillar IV • Celestial Atlas (ब्रह्माण्ड)';
      case 'future': return 'Pillar V • The Future (भविष्य)';
      case 'civilizations': return 'Pillar VI • Future Civilizations (सभ्यता)';
      default: return 'Cross-Pillar Domain';
    }
  };

  const epistemic = EPISTEMIC_BADGES[activeNode.epistemicCode];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 select-none">
      <div 
        className={`relative w-full max-w-5xl max-h-[90vh] rounded-2xl flex flex-col border shadow-2xl overflow-hidden transition-all ${
          isLightMode
            ? 'bg-[#f4ebd9] border-[#c59b27]/40 text-[#1d130a]'
            : 'bg-gradient-to-b from-[#18110b] via-[#100b07] to-[#080503] border-[rgba(232,145,58,0.4)] text-[#efe6d6]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#527FAE] to-[#1c2c3d] flex items-center justify-center shadow-lg">
              <Network className="w-5 h-5 text-[#a5f3fc]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-serif font-bold text-[#fde047]">
                  ज्ञान संजाल • GLOBAL KNOWLEDGE GRAPH
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-[#527FAE]/20 text-[#a5f3fc] border border-[#527FAE]/40">
                  INTERCONNECTED METRICS
                </span>
              </div>
              <p className="text-xs text-[#b5a990] font-serif">
                Multi-dimensional knowledge web linking celestial objects, scriptures, archaeology, and future forecasting.
              </p>
            </div>
          </div>

          <button
            onClick={() => { soundManager.playClick(); onClose(); }}
            className="p-1.5 rounded-lg text-[#b5a990] hover:text-[#efe6d6] hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Navigation Bar */}
        <div className="p-3.5 border-b border-white/10 bg-black/20 shrink-0 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#b5a990]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search knowledge graph nodes (e.g., 'Saturn', 'Nasadiya', 'Sanauli', 'Dyson')..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/50 border border-white/15 text-xs text-[#efe6d6] placeholder-[#b5a990]/60 focus:outline-none focus:border-[#e8913a]"
            />
          </div>
          <span className="text-xs font-mono text-[#b5a990]">
            {filteredNodes.length} Nodes Indexed
          </span>
        </div>

        {/* Main Content: Left Column Node Selector, Right Column Deep Graph View */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Left Column: Nodes List */}
          <div className="md:col-span-4 border-r border-white/10 p-3 space-y-2 overflow-y-auto max-h-[580px]">
            {filteredNodes.map(node => {
              const isSelected = node.id === activeNode.id;
              return (
                <div
                  key={node.id}
                  onClick={() => { soundManager.playClick(); setActiveNodeId(node.id); }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#28180e] to-[#140e08] border-[#e8913a] shadow-md'
                      : 'bg-black/30 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="text-[#e8913a]">{node.category}</span>
                    <span className="text-[#b5a990]">Tier {node.epistemicCode}</span>
                  </div>
                  <h4 className="text-xs font-serif font-bold text-[#efe6d6] truncate">
                    {node.title}
                  </h4>
                  {node.sanskritTitle && (
                    <p className="text-[11px] font-serif text-[#b5a990] truncate mt-0.5">
                      {node.sanskritTitle}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Node 360-Degree Dossier & Related Vertices */}
          <div className="md:col-span-8 p-6 overflow-y-auto max-h-[580px] space-y-6">
            {/* Active Node Header */}
            <div className="border-b border-white/10 pb-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-[#e8913a] uppercase">
                  {getPillarLabel(activeNode.pillar)}
                </span>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono border ${epistemic.badgeColor}`}>
                  [{epistemic.code}] {epistemic.labelEn}
                </span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#fde047]">
                {activeNode.title}
              </h3>
              {activeNode.sanskritTitle && (
                <p className="text-sm font-serif text-[#b5a990]">
                  {activeNode.sanskritTitle}
                </p>
              )}
            </div>

            {/* Summary */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10">
              <p className="text-xs md:text-sm font-serif text-[#efe6d6] leading-relaxed">
                {activeNode.summary}
              </p>
            </div>

            {/* Structured Attributes Grid */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#b5a990] block">
                Multi-Dimensional Knowledge Attributes
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-serif">
                {Object.entries(activeNode.attributes).map(([k, v], idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-black/50 border border-white/5 space-y-0.5">
                    <span className="text-[10px] font-mono text-[#e8913a] uppercase block">
                      {k.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <p className="text-[#efe6d6] leading-relaxed">
                      {Array.isArray(v) ? v.join(', ') : String(v)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Connected Knowledge Vertices */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#fde047] flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-[#e8913a]" />
                  Connected Cross-Pillar Vertices ({relatedNodes.length})
                </span>
                <span className="text-[10px] font-mono text-[#b5a990]">
                  Click to Hop Node
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedNodes.map(rn => (
                  <div
                    key={rn.id}
                    onClick={() => { soundManager.playClick(); setActiveNodeId(rn.id); }}
                    className="p-3.5 rounded-xl bg-gradient-to-r from-[#20140c] to-[#120d08] border border-[rgba(232,145,58,0.3)] hover:border-[#e8913a] cursor-pointer transition-all space-y-1 group"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-[#e8913a]">{rn.category}</span>
                      <ArrowRight className="w-3 h-3 text-[#b5a990] group-hover:text-[#fde047] group-hover:translate-x-1 transition-all" />
                    </div>
                    <h5 className="text-xs font-serif font-bold text-[#efe6d6] group-hover:text-[#fde047] transition-colors">
                      {rn.title}
                    </h5>
                    <p className="text-[10.5px] font-serif text-[#b5a990] line-clamp-2">
                      {rn.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Jump to Pillar CTA */}
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                  onNavigatePillar(activeNode.pillar);
                }}
                className="px-5 py-2 rounded-xl bg-[#e8913a] hover:bg-[#f2c47a] text-black font-mono text-xs font-bold transition-all shadow-lg flex items-center gap-2"
              >
                <span>OPEN IN {getPillarLabel(activeNode.pillar).toUpperCase()}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
