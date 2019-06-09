import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Chat from "./Chat";
import Login from "./Login";
import Register from './Register';
import Dashboard from './Dashboard';
import Navigation from './Navigation';



class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navigation />
          <Route exact path="/" component={Dashboard} />
          <Route path="/chat" component={Chat} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
