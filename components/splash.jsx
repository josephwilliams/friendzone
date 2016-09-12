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
      currentUser: undefined,
      games: []
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

    return firebase.database().ref('/games').once('value').then(function(snapshot) {
      const games = snapshot.val();
      _.forOwn(games, (key, value) => {
        let game = key;
        let games = that.state.games;
        games.push(game);
        that.setState({ games: games });
      });
    });
  }

  forceUpdate () {
    this.setState({ games: [] });
    let that = this;
    return firebase.database().ref('/games').once('value').then(function(snapshot) {
      const games = snapshot.val();
      _.forOwn(games, (key, value) => {
        let game = key;
        let games = that.state.games;
        games.push(game);
        that.setState({ games: games });
      });
    });
  }

  render () {
    if (this.state.currentUser) {
      const username = this.state.currentUser.displayName.split(' ')[0];
      return (
        <div className="splash-container">
          <Header />
          <Auth />
          <NewGame currentUser={username}
                   forceUpdate={this.forceUpdate.bind((this))}/>
          <Results currentUser={this.state.currentUser}
                   games={this.state.games} />
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
