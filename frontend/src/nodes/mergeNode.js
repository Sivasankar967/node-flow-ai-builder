// mergeNode.js
// Merges two inputs into a single output using a chosen strategy

import { useState } from 'react';
import { BaseNode } from './baseNode';

export const MergeNode = ({ id, data }) => {
  const [strategy, setStrategy] = useState(data?.strategy || 'concat');

  return (
    <BaseNode
      id={id}
      title="Merge"
      icon="⇌"
      color="#06b6d4"
      inputs={[
        { id: 'input1', label: 'Input A' },
        { id: 'input2', label: 'Input B' },
      ]}
      outputs={[{ id: 'merged', label: 'Merged' }]}
    >
      <div className="node-field">
        <label>Merge Strategy</label>
        <select value={strategy} onChange={(e) => setStrategy(e.target.value)}>
          <option value="concat">Concatenate</option>
          <option value="join">Join with newline</option>
          <option value="array">Array</option>
          <option value="object">Object</option>
        </select>
      </div>
    </BaseNode>
  );
};
