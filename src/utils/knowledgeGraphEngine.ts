import { GLOBAL_KNOWLEDGE_NODES } from '../data/knowledgeGraphData';
import { KnowledgeGraphNode, PillarId } from '../types/sixPillars';

export function getNodeById(id: string): KnowledgeGraphNode | undefined {
  return GLOBAL_KNOWLEDGE_NODES.find(n => n.id === id);
}

export function getRelatedNodes(id: string): KnowledgeGraphNode[] {
  const current = getNodeById(id);
  if (!current) return [];
  
  return GLOBAL_KNOWLEDGE_NODES.filter(n => 
    current.relatedNodeIds.includes(n.id) || n.relatedNodeIds.includes(current.id)
  );
}

export function getNodesByPillar(pillar: PillarId): KnowledgeGraphNode[] {
  return GLOBAL_KNOWLEDGE_NODES.filter(n => n.pillar === pillar);
}

export function searchKnowledgeGraph(query: string): KnowledgeGraphNode[] {
  if (!query.trim()) return GLOBAL_KNOWLEDGE_NODES;
  const q = query.toLowerCase().trim();
  
  return GLOBAL_KNOWLEDGE_NODES.filter(n => 
    n.title.toLowerCase().includes(q) ||
    (n.sanskritTitle && n.sanskritTitle.includes(q)) ||
    n.summary.toLowerCase().includes(q) ||
    Object.values(n.attributes).some(val => 
      typeof val === 'string' && val.toLowerCase().includes(q)
    )
  );
}
