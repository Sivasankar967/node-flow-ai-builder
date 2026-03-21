// transformNode.js
// Transforms input data using a user-defined expression

import { useState } from 'react';
import { BaseNode } from './baseNode';

export const TransformNode = ({ id, data }) => {
  const [expression, setExpression] = useState(data?.expression || '');

  return (
    <BaseNode
      id={id}
      title="Transform"
      icon="⚙"
      color="#f97316"
      inputs={[{ id: 'input', label: 'Input' }]}
      outputs={[{ id: 'output', label: 'Output' }]}
    >
      <div className="node-field">
        <label>Expression</label>
        <input
          type="text"
          placeholder="e.g. input.toUpperCase()"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};
