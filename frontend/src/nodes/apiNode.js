// apiNode.js
// Makes an API call with configurable URL and HTTP method

import { useState } from 'react';
import { BaseNode } from './baseNode';

export const APINode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <BaseNode
      id={id}
      title="API Call"
      icon="🌐"
      color="#3b82f6"
      inputs={[{ id: 'body', label: 'Body' }]}
      outputs={[{ id: 'response', label: 'Response' }]}
    >
      <div className="node-field">
        <label>Method</label>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <div className="node-field">
        <label>URL</label>
        <input
          type="text"
          placeholder="https://api.example.com/data"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};
