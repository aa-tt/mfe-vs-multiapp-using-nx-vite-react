// Uncomment this line to use CSS modules
// import styles from './app.module.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NxWelcome from './nx-welcome';
import {OrgHeader, OrgFooter} from '@org/ui';
import TodoApp from '@org/todo/src/app/app';
import LoginApp from '@org/login/src/app/app';

export function App() {
  return (
    <div>
      <BrowserRouter>
        <OrgHeader />
        {/* <NxWelcome title="@org/shell" /> */}
        <Routes>
          <Route path="/login" element={<LoginApp />} />
          <Route path="/todo" element={<TodoApp />} />
        </Routes>
        <OrgFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
