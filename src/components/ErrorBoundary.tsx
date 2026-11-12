import { Component, type ReactNode } from "react";

// catches render errors below it, so one broken page doesn't turn the whole site white
export default class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <main className="page page-status">
        <p>Something went wrong.</p>
        <button type="button" className="btn" onClick={() => location.reload()}>
          Reload
        </button>
      </main>
    );
  }
}
