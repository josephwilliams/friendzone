import React from 'react';
import Header from './header';
import Auth from './auth';
import NewGame from './newgame';
import Results from './results';
import Footer from './footer';
import PersonalStats from './personalstats';

//Firebase
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class Splash extends React.Component {
  constructor () {
    super();
    this.state = {
      currentUser: undefined,
      games: [],
      currentKing: null,
      wins: 0,
      losses: 0,
      bestStreak: 0,
    };
  }

  componentDidMount () {
    let that = this;
    let wins = 0;
    let losses = 0;
    let currentKing = null;
    let currentStreak = 0;
    let bestStreak = 0;

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const username = user.displayName.split(' ')[0];
        firebase.database().ref('/games').once('value').then(function(snapshot) {
          const games = snapshot.val();
          _.forOwn(games, (key, value) => {
            let game = key;
            let games = that.state.games;
            games.push(game);
            currentKing === username ? wins += 1 : losses += 1;

            if (currentKing === username) {
              currentStreak += 1;
              if (currentStreak > bestStreak) {
                 bestStreak = currentStreak;
              }
            } else {
              currentStreak = 0;
            }

            currentKing = game.winner;
            that.setState({
              games: games,
            });
          });
        }).then(() => {
          that.setState({
            currentUser: user,
            currentKing: currentKing,
            wins: wins,
            losses: losses,
            bestStreak: bestStreak,
          });
        });
      } else {
        that.setState({ currentUser: undefined });
      }
    });
  }

  determinePlayerStats () {
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
      return (
        <div className="splash-container">
          <Header />
          <div className="personal-container">
            <Auth />
            <PersonalStats currentUser={this.state.currentUser}
                           currentKing={this.state.currentKing}
                           wins={this.state.wins}
                           losses={this.state.losses}
                           bestStreak={this.state.bestStreak}
            />
          </div>
          <NewGame currentUser={this.state.currentUser}
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
          <Results games={this.state.games}/>
        </div>
      );
    }
  }
}
