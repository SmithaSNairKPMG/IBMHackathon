import React from 'react';
import {  Route, Switch } from 'react-router-dom';
import Registration from './components/Users/Registration';
import Login from './components/Users/Login';
import Home from './components/CheckIns/Home';
import './App.css';
const App = () => {
  return (
    <div>
      <Switch>
                <Route path="/" component={Login} exact />
                <Route path="/register" component={Registration} />
                <Route path="/home" component={Home} />
            </Switch>
    </div>
  );
}

export default App;