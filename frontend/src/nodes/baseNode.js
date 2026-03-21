// baseNode.js
// Central abstraction for all node types

import { Handle, Position } from 'reactflow';
import '../styles/nodes.css';

export const BaseNode = ({
  id,
  title,
  color = '#7c3aed',
  icon = '⬡',
  inputs = [],
  outputs = [],
  children,
  style = {},
}) => {
  return (
    <div className="base-node" style={{ '--node-accent': color, ...style }}>

      {/* Input Handles (Left) — labels float OUTSIDE the node to the left */}
      {inputs.map((input, index) => {
        const topPct = inputs.length === 1
          ? '50%'
          : `${((index + 1) / (inputs.length + 1)) * 100}%`;
        return (
          <div key={`${id}-in-${input.id}`}>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-${input.id}`}
              style={{ top: topPct, background: color }}
              className="node-handle"
            />
            <div
              className="handle-label handle-label-left"
              style={{ top: topPct }}
            >
              {input.label}
            </div>
          </div>
        );
      })}

      {/* Node Header */}
      <div className="node-header" style={{ background: color }}>
        <span className="node-icon">{icon}</span>
        <span className="node-title">{title}</span>
      </div>

      {/* Node Body */}
      <div className="node-body">
        {children}
      </div>

      {/* Output Handles (Right) — labels float OUTSIDE the node to the right */}
      {outputs.map((output, index) => {
        const topPct = outputs.length === 1
          ? '50%'
          : `${((index + 1) / (outputs.length + 1)) * 100}%`;
        return (
          <div key={`${id}-out-${output.id}`}>
            <Handle
              type="source"
              position={Position.Right}
              id={`${id}-${output.id}`}
              style={{ top: topPct, background: color }}
              className="node-handle"
            />
            <div
              className="handle-label handle-label-right"
              style={{ top: topPct }}
            >
              {output.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
