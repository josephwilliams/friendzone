import React from 'react';
import Header from './header';
import Auth from './auth';
import NewGame from './newgame';
import Results from './results';
import Footer from './footer';
import PersonalStats from './personalstats';
import Chart from './highcharts';
import Piechart from './piechart';

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
      games: [],
      currentKing: null,
      wins: 0,
      losses: 0,
      bestStreak: 0,
      gameHistory: {},
      navigateToStats: false
    };
  }

  componentDidMount () {
    // did it?
    // hmm
    this.determinePlayerStats();
  }

  determinePlayerStats () {
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

            // setting up this.state.gameHistory of { player: wins }
            let gameHistory = that.state.gameHistory;
            if (gameHistory[game.winner]) {
              gameHistory[game.winner] += 1;
            } else {
              gameHistory[game.winner] = 1;
            }

            if (currentKing === username) {
              wins += 1;
              losses -= 1;
              currentStreak += 1;
              if (currentStreak > bestStreak) {
                 bestStreak = currentStreak;
              }
            } else {
              losses += 1;
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

  toggleStatsPageNav(){
    let temp = this.state.navigateToStats;
    this.setState({navigateToStats: !temp});
  }

  render () {
    // organize into how many each player has won from each category

    if(this.state.navigateToStats){
      return (
        <div className="splash-container">
          <Header />
          <div className="personal-container">
            <PersonalStats wins={this.state.wins}
                           losses={this.state.losses}
                           winsLosses={true}
                           currentUser={this.state.currentUser}
            />
            <Auth />
            <div className="right-of-auth">
              <div className="stat-holder" style={{ width: '60px' }}>
                <div className="stat-type">win %</div>
                <div className="stat-value">
                  <Piechart percentage={this.state.wins/this.state.losses} />
                </div>
              </div>
              <div className="view-stats-button" onClick={this.toggleStatsPageNav.bind(this)}>Close Stats</div>
            </div>
          </div>
          <div className="stats-page-container">
              <PersonalStats currentUser={this.state.currentUser}
                             currentKing={this.state.currentKing}
                             wins={this.state.wins}
                             losses={this.state.losses}
                             bestStreak={this.state.bestStreak}
                             gameHistory={this.state.gameHistory}
                             winsLosses={false}
              />
            <Chart games={this.state.games} container={'chart'}></Chart>
          </div>
          <NewGame currentUser={this.state.currentUser}
                   forceUpdate={this.forceUpdate.bind((this))}/>
          <Results currentUser={this.state.currentUser}
                   games={this.state.games} />
        </div>
      );
    } else if (this.state.currentUser) {
      return (
        <div className="splash-container">
          <Header />
          <div className="personal-container">
            <PersonalStats wins={this.state.wins}
                           losses={this.state.losses}
                           winsLosses={true}
                           currentUser={this.state.currentUser}
            />
            <Auth />
            <div className="right-of-auth">
              <div className="stat-holder" style={{ width: '60px' }}>
                <div className="stat-type">win %</div>
                <div className="stat-value">
                  <Piechart percentage={this.state.wins/this.state.losses} />
                </div>
              </div>
              <div className="view-stats-button" onClick={this.toggleStatsPageNav.bind(this)}>View Stats</div>
            </div>
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
