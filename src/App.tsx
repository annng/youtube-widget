import type { Component } from 'solid-js';
import { Router, Route } from "@solidjs/router";

import logo from './logo.svg';
import styles from './App.module.css';
import SubscriberPage from './pages/subscriber';
import HomePage from './pages/home';
import NotFound from './pages/404';

const App: Component = () => {
  return (
    <Router>
      <Route path="/" component={HomePage}/>
      <Route path="/subscriber" component={SubscriberPage}/>

      <Route path="*paramName" component={NotFound} />
    </Router>
  )
};

export default App;
