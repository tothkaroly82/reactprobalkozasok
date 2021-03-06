import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './components/logo'
import './App.css'
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom'
import Home from './components/home'
import Notfound from './components/notfound'
import Analyzis from './components/csvheader'
import Menu from './components/menu'
import FileSender from './components/fileSender';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <div className="container">
        <Logo />
        <Menu />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/analyzis" component={Analyzis} />
          <Route path="/about" component={Home} />
          <Route component={Notfound} />
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;