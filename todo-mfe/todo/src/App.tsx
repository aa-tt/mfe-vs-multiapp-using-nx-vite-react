// Exposed by the federation plugin as 'todo/App'.
// Consumers render it lazily via `lazyProvider('todo', 'App')`.
export function App() {
  return (
    <section data-testid="todo">
      <h1>Hello from todo</h1>
    </section>
  );
}

export default App;
