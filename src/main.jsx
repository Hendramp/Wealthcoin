import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App render error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', padding: '24px' }}>
          <div style={{ maxWidth: '480px', textAlign: 'center', border: '1px solid rgba(212, 175, 55, 0.25)', background: 'rgba(22, 22, 22, 0.9)', borderRadius: '20px', padding: '32px' }}>
            <h1 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Something went wrong</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>The DApp hit a runtime error. Please refresh the page to try again.</p>
            <button onClick={() => window.location.reload()} style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)', color: '#0A0A0A', border: 'none', borderRadius: '999px', padding: '10px 16px', fontWeight: 700, cursor: 'pointer' }}>
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const root = createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
