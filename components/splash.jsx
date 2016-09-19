import React from 'react';
import Header from './header';
import Auth from './auth';
import NewGame from './newgame';
import Results from './results';
import Footer from './footer';
import PersonalStats from './personalstats';
import Chart from './highcharts';

//Firebase
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
let theGames = [];

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
        that.setState({ currentUser: undefined });
      }
    });

    firebase.database().ref('/games').once('value').then(function(snapshot) {
      const games = snapshot.val();
      _.forOwn(games, (key, value) => {
        let game = key;
        let games = that.state.games;
        theGames = that.state.games;
        games.push(game);
        theGames.push(game);
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
        theGames = that.state.games;
        games.push(game);
        theGames.push(game);
        that.setState({ games: games });
      });
    });
  }

  render () {
    // organize into how many each player has won from each category

    if (this.state.currentUser) {
      return (
        <div className="splash-container">
          <Header />
          <div className="personal-container">
            <Auth />
            <PersonalStats currentUser={this.state.currentUser} />
          </div>
          <NewGame currentUser={this.state.currentUser}
                   forceUpdate={this.forceUpdate.bind((this))}/>
          <Results currentUser={this.state.currentUser}
                   games={this.state.games} />
          <Chart games={this.state.games} container={'chart'}></Chart>
        </div>
      );
    } else {
      return (
        <div className="splash-container">
          <Header />
          <Auth />
          <Results games={this.state.games}/>
        </div>
      );
    }
  }
}
