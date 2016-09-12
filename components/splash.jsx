import React from 'react';
import Header from './header';
import Auth from './auth';
import NewGame from './newgame';
import Results from './results';
import Footer from './footer';

//Firebase
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class Splash extends React.Component {
  constructor () {
    super();
    this.state = {
      currentUser: undefined
    };
  }

  componentDidMount () {
    let that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        that.setState({ currentUser: user });
      } else {
        console.log("No user signed in");
      }
    });
  }

  render () {
    if (this.state.currentUser) {
      const username = this.state.currentUser.displayName.split(' ')[0];
      return (
        <div className="splash-container">
          <Header />
          <Auth />
          <NewGame currentUser={username} />
          <Results currentUser={this.state.currentUser} />
        </div>
      );
    } else {
      return (
        <div className="splash-container">
          <Header />
          <Auth />
          <Results />
        </div>
      );
    }
  }
}
