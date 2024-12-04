import React from 'react';
import ReactDOM from 'react-dom/client';
import WorkflowEditor from './renderer/components/WorkFlowEditor';

// Ensure the root element exists
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <WorkflowEditor />
    </React.StrictMode>
  );
} else {
  console.error('Could not find root element');
}