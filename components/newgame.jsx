import React from 'react';
import _ from 'lodash';

//Firebase
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class NewGame extends React.Component {
  constructor () {
    super();
    this.state = {
      potentialPlayers: ["test1"],
      currentPlayers: [],
      winner: undefined
    };
  }

  componentDidMount () {
    let that = this;
    return firebase.database().ref('/users').once('value').then(function(snapshot) {
      const users = snapshot.val();
      _.forOwn(users, (key, value) => {
        let name = key.username.split(' ')[0];
        let players = that.state.potentialPlayers;
        players.push(name);
        that.setState({ potentialPlayers: players });
      });
    });
  }

  showPotentialPlayers () {
    if (this.state.potentialPlayers.length > 0) {
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
  }

  handleClick (event) {
    let player = event.target.dataset.tag;
    if (this.state.winner === player) {
      let players = this.state.currentPlayers;
      let idx = players.indexOf(player);
      players.splice(idx, 1);
      this.setState({ currentPlayers: players, winner: undefined });
    } else if (!_.includes(this.state.currentPlayers, player)) {
      let players = this.state.currentPlayers
      players.push(player);
      this.setState({ currentPlayers: players });
    } else {
      this.setState({ winner: player });
    }
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
        {this.renderSubmit()}
        <div className="user-selector-container">
          {this.showPotentialPlayers()}
        </div>
      </div>
    );
  }
}
