import React from 'react';
import _ from 'lodash';

export default class BarChart extends React.Component {
  constructor () {
    super();
  }

  componentDidMount () {
  }

  sortPlayersByScore (players) {
    console.log(players);
  }

  renderGraph  () {
    let games = this.props.games;
    console.log("this.props.games", this.props.games);
    let highScore = 0;
    let topPlayer;
    let gameHistory = [];
    _.forOwn(games, (winCount, player) => {
      if (winCount > highScore) {
        highScore = winCount;
        topPlayer = player;
      }

      gameHistory.push([player, winCount]);
    });

    return gameHistory.map((game, gameIdx) => {
      let player = game[0];
      let barHeight = game[1];
      return (
        <div key={gameIdx}>
          <div className="bar-chart-wins">
            {barHeight}
          </div>
          <div className="bar-chart-bar" style={{ height: barHeight }}>
            <div className="bar-chart-name">
              {player}
            </div>
          </div>
        </div>
      )
    });
  }

  render () {
    return (
      <div className="bar-chart-container">
        {this.renderGraph()}
      </div>
    );
  }
}
