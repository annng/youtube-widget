import type { Component } from 'solid-js';
import { Router, Route } from "@solidjs/router";

import logo from './logo.svg';
import styles from './App.module.css';
import SubscriberPage from './pages/subscriber';
import HomePage from './pages/home';
import NotFound from './pages/404';
import CommentAvatarPage from './pages/comment_avatar';
import CallbackPage from './pages/auth/callback';
import LoginPage from './pages/auth/login';

const App: Component = () => {
  return (
    <Router>
      <Route path="/" component={HomePage}/>
      <Route path="/subscriber" component={SubscriberPage}/>
      <Route path="/comment_avatar" component={CommentAvatarPage}/>
      <Route path="*paramName" component={NotFound} />
      <Route path="/login" component={LoginPage}/>
      <Route path="/callback" component={CallbackPage}/>
    </Router>
  )
};

export default App;
