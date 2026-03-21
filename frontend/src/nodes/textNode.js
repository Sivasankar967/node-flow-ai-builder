// textNode.js
// Auto-resizing text node with dynamic variable handle detection

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/nodes.css';

const VARIABLE_REGEX = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
const MIN_WIDTH = 220;
const MIN_HEIGHT = 90;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [nodeSize, setNodeSize] = useState({ width: MIN_WIDTH, height: MIN_HEIGHT });

  const textareaRef = useRef(null);

  // Extract unique variable names from text
  useEffect(() => {
    const matches = [...currText.matchAll(VARIABLE_REGEX)];
    const unique = [...new Set(matches.map(m => m[1]))];
    setVariables(unique);
  }, [currText]);

  // Auto-resize the node based on textarea scroll dimensions
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to recalculate scrollHeight
      textareaRef.current.style.height = 'auto';
      const scrollH = textareaRef.current.scrollHeight;
      const scrollW = Math.max(
        textareaRef.current.scrollWidth,
        MIN_WIDTH - 28
      );
      const newWidth = Math.max(MIN_WIDTH, scrollW + 28);
      const newHeight = Math.max(MIN_HEIGHT, scrollH + 80); // +80 for header + padding
      setNodeSize({ width: newWidth, height: newHeight });
      textareaRef.current.style.height = `${scrollH}px`;
    }
  }, [currText]);

  const accentColor = '#a855f7';

  return (
    <div
      className="base-node"
      style={{
        '--node-accent': accentColor,
        width: nodeSize.width,
        minHeight: nodeSize.height,
      }}
    >
      {/* Dynamic variable handles on left */}
      {variables.map((varName, index) => (
        <Handle
          key={`${id}-var-${varName}`}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{
            top: variables.length === 1
              ? '60%'
              : `${40 + ((index + 0.5) / variables.length) * 50}%`,
            background: accentColor,
          }}
          className="node-handle"
          title={varName}
        />
      ))}

      {/* Variable labels on left */}
      {variables.map((varName, index) => (
        <div
          key={`label-var-${varName}`}
          className="handle-label handle-label-left"
          style={{
            top: variables.length === 1
              ? '60%'
              : `${40 + ((index + 0.5) / variables.length) * 50}%`,
            fontSize: 9,
          }}
        >
          {varName}
        </div>
      ))}

      {/* Node Header */}
      <div className="node-header" style={{ background: accentColor }}>
        <span className="node-icon">✏</span>
        <span className="node-title">Text</span>
      </div>

      {/* Node Body */}
      <div className="node-body">
        <div className="node-field">
          <label>Content</label>
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
            placeholder="Type text... Use {{variable}} to create handles"
            rows={2}
            style={{ resize: 'none', overflow: 'hidden', minWidth: MIN_WIDTH - 28 }}
          />
        </div>
        {variables.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {variables.map(v => (
              <span
                key={v}
                style={{
                  background: 'rgba(168,85,247,0.15)',
                  border: '1px solid rgba(168,85,247,0.4)',
                  borderRadius: 4,
                  fontSize: 10,
                  padding: '2px 6px',
                  color: '#c084fc',
                  fontFamily: 'monospace',
                }}
              >
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Output Handle on Right */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ top: '50%', background: accentColor }}
        className="node-handle"
        title="Output"
      />
    </div>
  );
};
