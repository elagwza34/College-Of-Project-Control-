import { Component, type ReactNode } from 'react';

export default class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return <main id="main-content" className="container-site py-32" tabIndex={-1}>
      <h1 className="font-heading text-3xl font-bold">This page could not load</h1>
      <p className="my-6">Please reload to try again. Any unsent information will need to be entered again.</p>
      <button type="button" className="btn-primary px-5 py-3" onClick={() => window.location.reload()}>Reload page</button>
    </main>;
    return this.props.children;
  }
}
