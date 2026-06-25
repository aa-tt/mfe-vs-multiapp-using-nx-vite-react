import { Component, Suspense, type ReactNode } from 'react';
import { lazyProvider } from './mf';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// ProviderBoundary catches the lazy() rejection that fires when a provider's
// remoteEntry.js can't be fetched (provider not running, network error,
// etc.). Without it any one missing provider unmounts the whole consumer
// tree. React has no built-in functional error boundary so this is a class.
// Wrap each <ProviderBoundary> in your router of choice if you need routing.
class ProviderBoundary extends Component<
  { children: ReactNode; name: string },
  { error: Error | null }
> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div role="alert">
          <p>
            Provider &quot;{this.props.name}&quot; unavailable:{' '}
            {this.state.error.message}
          </p>
        </div>
      );
    }
    return (
      <Suspense fallback={<p>Loading {this.props.name}...</p>}>
        {this.props.children}
      </Suspense>
    );
  }
}

const ProviderLogin = lazyProvider('login', 'App');
const ProviderTodo = lazyProvider('todo', 'App');

export function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={
          <main>
            <h1>shell app!</h1>
            <ProviderBoundary name="login">
              <ProviderLogin />
            </ProviderBoundary>
            <ProviderBoundary name="todo">
              <ProviderTodo />
            </ProviderBoundary>
          </main>
        } />
        <Route path="/login" element={<ProviderBoundary name="login"> <ProviderLogin /> </ProviderBoundary>} />
        <Route path="/todo" element={<ProviderBoundary name="todo"> <ProviderTodo /> </ProviderBoundary>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
