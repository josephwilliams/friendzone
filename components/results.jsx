import React from 'react';
import Result from './gameresult';
import _ from 'lodash';

//Firebase
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class Results extends React.Component {
  constructor () {
    super();
    this.state = {
      games: []
    };
  }

  displayGames () {
    if (this.props.games && this.props.games.length > 0) {
      return this.props.games.map((game, gameId) => {
        return (
          <Result game={game} key={gameId} />
        );
      });
    }
  }

  render () {
    return (
    <div className="results-container">
      {this.displayGames()}
    </div>
    );
  }
}
