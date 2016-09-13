import React from 'react';

export default class Stats extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      wins: 0,
      losses: 0,
    };

    this.username = this.props.currentUser.displayName.split(' ')[0];
  }

  componentDidMount () {
    // this.determineCounts();
  }

  determineCounts () {
    const uid = this.props.user.uid;
    let { wins, losses } = 0;
    let that = this;
    firebase.database().ref('/users/' + uid + "/games").once('value').then(function(snapshot) {
      const games = snapshot.val();
      _.forOwn(games, (key, value) => {
        let game = key;
        game.winner === that.username ? wins += 1 : losses += 1
      });
    });

    this.setState({
      wins: wins, losses: losses
    });
  }

  render () {
    return (
      <div className="personal-stats-container">
        <div className="stat-holder">
          <div className="stat-type">wins</div>
          <div className="stat-value">{this.state.wins}</div>
        </div>
        <div className="stat-holder">
          <div className="stat-type">losses</div>
          <div className="stat-value">{this.state.losses}</div>
        </div>
      </div>
    );
  }
}
