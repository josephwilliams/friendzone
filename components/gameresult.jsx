import React from 'react';
import TimeAgo from 'react-timeago';

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

  displayTime () {
    if (this.props.game.date) {
      return (
        <TimeAgo date={this.props.game.date} />
      );
    }
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
        <div className="result-time">
          {this.displayTime()}
        </div>
      </div>
    );
  }
}
