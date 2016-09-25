import React from 'react';
import PieChart from './piechart';
import BarChart from './barchart';

export default class Stats extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      // wins: 0,
      // losses: 0,
      // bestStreak: 0,
    };

    this.username = this.props.currentUser.displayName.split(' ')[0];
  }

  componentDidMount () {
    // this.determineCounts();
    // push ;)
  }

  determineCounts () {
    // set this up to grab this info from firebase

    // const uid = this.props.user.uid;
    // let { wins, losses } = 0;
    // let that = this;
    // firebase.database().ref('/users/' + uid + "/games").once('value').then(function(snapshot) {
    //   const games = snapshot.val();
    //   _.forOwn(games, (key, value) => {
    //     let game = key;
    //     game.winner === that.username ? wins += 1 : losses += 1;
    //   });
    // });
    //
    // this.setState({
    //   wins: wins,
    //   losses: losses,
    // });
  }

  render () {
    if (this.props.currentUser) {
      let num1 = (Math.round(this.props.wins * 10.0) / 10);
      let num2 = (Math.round(this.props.losses * 10.0) / 10);
      let winPercentage = (num1 / num2).toString().slice(2,4);
      let percentageProps = (num1 / num2)
      return (
        <div className="personal-stats-wrapper">
          <div className="personal-stats-container">
            <div className="stat-holder">
              <div className="stat-type">wins</div>
              <div className="stat-value">{this.props.wins}</div>
            </div>
            <div className="stat-holder">
              <div className="stat-type">losses</div>
              <div className="stat-value">{this.props.losses}</div>
            </div>
          </div>
          <div className="personal-stats-container">
            <div className="stat-holder" style={{ width: '60px' }}>
              <div className="stat-type">win %</div>
              <div className="stat-value">
                <PieChart percentage={percentageProps} />
              </div>
            </div>
            <div className="stat-holder">
              <div className="stat-type">best streak</div>
              <div className="stat-value">{this.props.bestStreak}</div>
            </div>
          </div>
          <div className="personal-stats-container" style={{ height: "118px", marginTop: "49px" }}>
            <div className="stat-holder" style={{ minWidth: '68px' }}>
              <div className="stat-type">
                current king
              </div>
            </div>
            <div className="king-holder">
              {this.props.currentKing}
            </div>
          </div>
          <div className="personal-stats-container">
            <div className="stat-holder">
              <div className="stat-value" style={{ top: '-3px' }}>
                <BarChart games={this.props.gameHistory} />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="loader">
          hmm..
        </div>
      )
    }
  }
}
