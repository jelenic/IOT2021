import { Login, Register, Display, DisplaySensors, AddSensor } from './components';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import './styles/index.css';

export default class App extends React.Component {
  constructor(props) {
      super(props);
      const token = localStorage.getItem("JWT");
      console.log("token");
      console.log(token);
      this.state = {
          token: token
      };
  }
  render(){
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
                {this.state.token === null
                  ? <Redirect to="/login" />
                  : <Display />
                }
              </Route>
              <Route path="/displaySensors">
                {this.state.token === null
                  ? <Redirect to="/login" />
                  : <DisplaySensors />
                }
              </Route>
              <Route path="/addSensor">
                {this.state.token === null
                    ? <Redirect to="/login" />
                    : <AddSensor />
                }
              </Route>
          </Switch>
      </BrowserRouter>
    );
  }
}

//export default App;
