import React from 'react';
import Result from './gameresult';
import _ from 'lodash';

var Rebase = require('re-base');
var base = Rebase.createClass({
  apiKey: "AIzaSyDxo2dWYnQZhpxaPFfiRUPTIji0Q75AUr4",
  authDomain: "friendzone-a9494.firebaseapp.com",
  databaseURL: "https://friendzone-a9494.firebaseio.com",
  storageBucket: "friendzone-a9494.appspot.com"
});

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

  componentDidMount () {
    base.syncState(`games`, {
      context: this,
      state: 'games',
      asArray: true
    });
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
