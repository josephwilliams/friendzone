import React from 'react';

export default class Result extends React.Component {
  constructor () {
    super();
  }

  displayPlayers () {
    return this.props.game.players.map((player, id) => {
      if (player !== this.props.game.winner) {
        return (
          <div className="player-result" key={id}>
            {player}
          </div>
        )}
      }
    )
  }

  render () {
    return (
      <div className="result-container">
        <div className="result-winner">
          {this.props.game.winner}
        </div>
        <div className="result-players">
          {this.displayPlayers()}
        </div>
      </div>
    );
  }
}
