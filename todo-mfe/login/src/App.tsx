// Exposed by the federation plugin as 'login/App'.
// Consumers render it lazily via `lazyProvider('login', 'App')`.
export function App() {
  return (
    <section data-testid="login">
      <h1>Hello from login</h1>
    </section>
  );
}

export default App;
