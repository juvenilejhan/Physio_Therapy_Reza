import { Component } from 'react';
import './ErrorBoundary.css';

/**
 * Catches render errors below it so a single broken component doesn't blank the
 * whole app with nothing but a console trace.
 *
 * Must be a class — React has no hook equivalent of componentDidCatch.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Replace with a real reporting sink (Sentry et al) when one exists.
    console.error('Unhandled render error:', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ error: null });
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="error-boundary" role="alert">
        <div className="error-boundary-inner">
          <i className="fas fa-triangle-exclamation" aria-hidden="true"></i>
          <h1>Something went wrong</h1>
          <p>
            This part of the page failed to load. The problem has been logged — trying again
            will often clear it.
          </p>
          <div className="error-boundary-actions">
            <button type="button" className="btn btn-primary" onClick={this.handleReset}>
              Try again
            </button>
            <a className="btn btn-outline" href="/">Back to home</a>
          </div>
        </div>
      </div>
    );
  }
}
