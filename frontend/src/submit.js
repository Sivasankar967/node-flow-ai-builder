// submit.js
// Submit button + result modal for pipeline analysis

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

const ResultModal = ({ result, onClose }) => {
  const { num_nodes, num_edges, is_dag } = result;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-icon">📊</div>
          <div>
            <div className="modal-title">Pipeline Analysis</div>
            <div className="modal-subtitle">Results from pipeline validation</div>
          </div>
        </div>

        <div className="modal-stats">
          <div className="stat-card">
            <div className="stat-label">Nodes</div>
            <div className="stat-value">{num_nodes}</div>
            <div className="stat-description">pipeline nodes</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Edges</div>
            <div className="stat-value">{num_edges}</div>
            <div className="stat-description">connections</div>
          </div>
          <div className="stat-card modal-stat-dag">
            <div className="stat-label">Graph Structure</div>
            <div className={`stat-value ${is_dag ? 'dag-true' : 'dag-false'}`}>
              {is_dag ? '✅ Valid DAG' : '❌ Contains Cycles'}
            </div>
            <div className="stat-description">
              {is_dag
                ? 'This pipeline is a Directed Acyclic Graph — ready to execute.'
                : 'Cycles detected. Remove circular connections before running.'}
            </div>
          </div>
        </div>

        <button className="modal-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export const SubmitButton = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://node-flow-ai-builder.onrender.com/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to connect to the backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="submit-bar">
        <button
          className={`submit-btn ${loading ? 'loading' : ''}`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <span>Analyzing…</span>
            </>
          ) : (
            <>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>Submit Pipeline</span>
            </>
          )}
        </button>

        {error && (
          <div style={{
            marginLeft: 16,
            fontSize: 12,
            color: '#f87171',
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: 8,
            padding: '6px 12px',
          }}>
            {error}
          </div>
        )}
      </div>

      {result && <ResultModal result={result} onClose={() => setResult(null)} />}
    </>
  );
};
