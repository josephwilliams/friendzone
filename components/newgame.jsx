import React from 'react';

export default class NewGame extends React.Component {
  constructor () {
    super();
    this.state = {
      potentialPlayers: [],
      currentPlayers: [],
      winner: undefined
    };
  }

  componentDidMount () {

  }

  render () {
    return (
      <div className="new-game-container">
        new game
      </div>
    );
  }
}
