// llmNode.js

import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      color="#8b5cf6"
      inputs={[
        { id: 'system', label: 'System' },
        { id: 'prompt', label: 'Prompt' },
      ]}
      outputs={[{ id: 'response', label: 'Response' }]}
    >
      <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8', lineHeight: 1.5 }}>
        A large language model. Connect a system prompt and user prompt to generate a response.
      </p>
    </BaseNode>
  );
};
