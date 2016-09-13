import React from 'react';
import Result from './gameresult';
import _ from 'lodash';
import TimeAgo from 'react-timeago';

//Firebase
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class NewGame extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      potentialPlayers: [],
      currentPlayers: [],
      currentPlayerIDs: [],
      winner: undefined
    };

    this.username = this.props.currentUser.displayName.split(' ')[0];
  }

  componentDidMount () {
    let that = this;
    firebase.database().ref('/users').once('value').then(function(snapshot) {
      const users = snapshot.val();
      _.forOwn(users, (key, value) => {
        let name = key.username.split(' ')[0];
        let players = that.state.potentialPlayers;
        players.push(name);
        that.setState({ potentialPlayers: players });
        that.handleCurrentUser(name);
      });
    });
  }

  handleCurrentUser (name) {
    if (this.username === name) {
      let currentPlayers = this.state.currentPlayers;
      currentPlayers.push(name);
      this.setState({ currentPlayers: currentPlayers });
    }
  }

  showPotentialPlayers () {
    return this.state.potentialPlayers.map((player, playerId) => {
      if (this.state.winner === player) {
        return (
          <div className="user-selector-winner"
            data-tag={player}
            onClick={this.handleClick.bind(this)}
            key={playerId}>
            {player}
          </div>
        );
      } else if (_.includes(this.state.currentPlayers, player)) {
        return (
          <div className="user-selector-active"
            data-tag={player}
            onClick={this.handleClick.bind(this)}
            key={playerId}>
            {player}
          </div>
        );
      } else {
        return (
          <div className="user-selector"
            data-tag={player}
            onClick={this.handleClick.bind(this)}
            key={playerId}>
            {player}
          </div>
        );
      }
    });
  }

  handleClick (event) {
    let selection = event.target.dataset.tag;
    if (selection === this.username) {
      if (selection === this.state.winner) {
        let players = this.state.currentPlayers;
        let idx = players.indexOf(selection);
        players.splice(idx, 1);
        this.setState({ currentPlayers: players, winner: undefined });
      } else {
        this.setState({ winner: selection });
      }
    } else if (this.state.winner === selection) {
      let players = this.state.currentPlayers;
      let idx = players.indexOf(selection);
      players.splice(idx, 1);
      this.setState({ currentPlayers: players, winner: undefined });
    } else if (!_.includes(this.state.currentPlayers, selection)) {
      let players = this.state.currentPlayers;
      players.push(selection);
      this.setState({ currentPlayers: players });
    } else {
      this.setState({ winner: selection });
    }

    if (!_.includes(this.state.currentPlayers, this.username)) {
      let players = this.state.currentPlayers;
      players.push(this.username);
      this.setState({ currentPlayers: players });
    };
  }

  renderSubmit () {
    if (this.state.winner !== undefined && this.state.currentPlayers.length > 1) {
      return (
        <div className="submit-button" onClick={() => this.handleSubmit()}>
          submit
        </div>
      )
    }
  }

  handleSubmit () {
    let date = new Date();

    let gameData = {
      players: this.state.currentPlayers,
      winner: this.state.winner,
      playerCount: this.state.currentPlayers.length,
      date: date,
      game: "darts",
    };

    // Get a key for a new Game.
    const newGameKey = firebase.database().ref().child('posts').push().key;
    const uid = this.props.currentUser.uid;

    // Write the new game's data simultaneously in the games list and the users' game list.
    var updates = {};
    updates['/games/' + newGameKey] = gameData;
    updates['/users/' + uid + '/games/' + newGameKey] = gameData;

    firebase.database().ref().update(updates);
    this.setState({ currentPlayers: [], winner: undefined });
    // resets (forces) currentUser into this.state.currentPlayers
    this.handleCurrentUser(this.username);
    this.props.forceUpdate();
  }

  displayBoard () {
    let date = new Date();
    let gameData = {
      players: this.state.currentPlayers,
      winner: this.state.winner,
      date: date,
    };

    if (this.state.winner && this.state.currentPlayers.length > 1){
      return (
        <Result game={gameData} />
      )
    }
  }

  render () {
    let tempStyle = {"cursor":"default", "fontSize":"12px"}
    return (
      <div className="new-game-container">
        <div className="new-game-info">
          <p style={{"marginBottom":"5px"}}>
            who's playing?
          </p>
          <div className="user-selector-active" style={tempStyle}>
            participant
          </div>
          <div className="user-selector-winner" style={tempStyle}>
            winner
          </div>
        </div>
        <div className="user-selector-container">
          {this.showPotentialPlayers()}
        </div>
        {this.displayBoard()}
        {this.renderSubmit()}
        <div className="divider" />
      </div>
    );
  }
}
