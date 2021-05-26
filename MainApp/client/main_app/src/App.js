import { Login, Register, Display } from './components';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import './styles/index.css';

function App() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/display">
              <Display />
            </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
