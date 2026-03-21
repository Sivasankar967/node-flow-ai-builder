// filterNode.js
// Filters incoming data by a user-defined condition expression

import { useState } from 'react';
import { BaseNode } from './baseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon="🔍"
      color="#ef4444"
      inputs={[
        { id: 'data', label: 'Data' },
        { id: 'condition', label: 'Condition' },
      ]}
      outputs={[
        { id: 'pass', label: 'Pass' },
        { id: 'fail', label: 'Fail' },
      ]}
    >
      <div className="node-field">
        <label>Condition Expression</label>
        <input
          type="text"
          placeholder="e.g. value > 10"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};
