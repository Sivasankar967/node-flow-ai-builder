// noteNode.js
// A sticky-note annotation node — no handles, pure commentary

import { useState } from 'react';
import { BaseNode } from './baseNode';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || '');

  return (
    <BaseNode
      id={id}
      title="Note"
      icon="📝"
      color="#eab308"
      inputs={[]}
      outputs={[]}
      style={{ minWidth: 200 }}
    >
      <div className="node-field">
        <label>Note</label>
        <textarea
          placeholder="Add a note or comment to your pipeline..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          style={{ resize: 'vertical' }}
        />
      </div>
    </BaseNode>
  );
};
