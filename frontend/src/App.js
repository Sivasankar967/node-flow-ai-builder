// App.js

import './index.css';
import './styles/app.css';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app-shell">
      {/* Top Header */}
      <header className="app-header">
        <div className="app-logo">
          <div className="app-logo-icon">⚡</div>
          <div className="app-logo-text">Vector<span>Shift</span></div>
        </div>
        <div className="app-header-right">
          <span className="header-badge">Pipeline Builder</span>
        </div>
      </header>

      {/* Main area: sidebar + canvas */}
      <div className="app-main">
        <PipelineToolbar />
        <div className="canvas-area">
          <PipelineUI />
        </div>
      </div>

      {/* Bottom submit bar */}
      <SubmitButton />
    </div>
  );
}

export default App;
