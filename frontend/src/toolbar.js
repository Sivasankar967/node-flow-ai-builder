// toolbar.js

import { DraggableNode } from './draggableNode';

const NODE_CATALOGUE = [
  // Core pipeline nodes
  { type: 'customInput',  label: 'Input',     color: '#10b981', icon: '⤵', section: 'Core' },
  { type: 'customOutput', label: 'Output',    color: '#f59e0b', icon: '⤴', section: 'Core' },
  { type: 'llm',          label: 'LLM',       color: '#8b5cf6', icon: '🤖', section: 'Core' },
  { type: 'text',         label: 'Text',      color: '#a855f7', icon: '✏',  section: 'Core' },
  // Extra nodes
  { type: 'filter',       label: 'Filter',    color: '#ef4444', icon: '🔍', section: 'Utilities' },
  { type: 'merge',        label: 'Merge',     color: '#06b6d4', icon: '⇌',  section: 'Utilities' },
  { type: 'transform',    label: 'Transform', color: '#f97316', icon: '⚙',  section: 'Utilities' },
  { type: 'api',          label: 'API Call',  color: '#3b82f6', icon: '🌐', section: 'Utilities' },
  { type: 'note',         label: 'Note',      color: '#eab308', icon: '📝', section: 'Utilities' },
];

export const PipelineToolbar = () => {
  const sections = [...new Set(NODE_CATALOGUE.map(n => n.section))];

  return (
    <div className="sidebar">
      <div className="sidebar-header">Nodes</div>
      {sections.map(section => (
        <div key={section}>
          <div className="sidebar-section-title">{section}</div>
          <div className="sidebar-nodes">
            {NODE_CATALOGUE
              .filter(n => n.section === section)
              .map(node => (
                <DraggableNode
                  key={node.type}
                  type={node.type}
                  label={node.label}
                  color={node.color}
                  icon={node.icon}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
