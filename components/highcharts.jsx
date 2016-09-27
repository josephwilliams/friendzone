'use strict'

import React from 'react';
import Highcharts from 'highcharts';
import Loading from 'react-loading';

let brianWins = {
  twoPlayer: 0,
  threePlayer: 0,
  fourPlayer: 0
};

let daveWins = {
  twoPlayer: 0,
  threePlayer: 0,
  fourPlayer: 0
};

let joeWins = {
  twoPlayer: 0,
  threePlayer: 0,
  fourPlayer: 0
};

let karlWins = {
  twoPlayer: 0,
  threePlayer: 0,
  fourPlayer: 0
};

let chartOptions;

// module.exports = React.createClass({
export default class Charts extends React.Component {
    constructor(){
      super();
    }

    // When the DOM is ready, create the chart.
    componentDidMount() {
        // Extend Highcharts with modules
        if (this.props.modules) {
            this.props.modules.forEach(function (module) {
                module(Highcharts);
            });

        this.destroyLogo();
      }



        let theThing = this.props.games.slice(0);

        let scoreCountPromise = new Promise((resolve, reject) => {
          theThing.forEach(game => {
            if(game.winner === "Joseph"){
              if(game.playerCount === 2){
                joeWins.twoPlayer++;
              } else if (game.playerCount === 3){
                joeWins.threePlayer++;
              } else if (game.playerCount === 4){
                joeWins.fourPlayer++;
              }
            } else if (game.winner === "Karl"){
              if(game.playerCount === 2){
                karlWins.twoPlayer++;
              } else if (game.playerCount === 3){
                karlWins.threePlayer++;
              } else if (game.playerCount === 4){
                karlWins.fourPlayer++;
              }
            } else if (game.winner === "Brian"){
              if(game.playerCount === 2){
                brianWins.twoPlayer++;
              } else if (game.playerCount === 3){
                brianWins.threePlayer++;
              } else if (game.playerCount === 4){
                brianWins.fourPlayer++;
              }
            } else if (game.winner === "David"){
              if(game.playerCount === 2){
                daveWins.twoPlayer++;
              } else if (game.playerCount === 3){
                daveWins.threePlayer++;
              } else if (game.playerCount === 4){
                daveWins.fourPlayer++;
              }
            }
          });

          let chartOptions = {
            chart: {
                  renderTo: 'container',
                  type: 'bar'
              },
            title: {
                text: 'Victories'
            },
            xAxis: {
                categories: ['2 Player', '3 Player', '4 Player']
            },
            yAxis: {
                title: {
                    text: 'Games won'
                }
            },
            series: [{
                name: 'Brian',
                data: [brianWins.twoPlayer, brianWins.threePlayer, brianWins.fourPlayer]
            }, {
                name: 'David',
                data: [daveWins.twoPlayer, daveWins.threePlayer, daveWins.fourPlayer]
            }, {
                name: 'Karl',
                data: [karlWins.twoPlayer, karlWins.threePlayer, karlWins.fourPlayer]
            }, {
                name: 'Joe',
                data: [joeWins.twoPlayer, joeWins.threePlayer, joeWins.fourPlayer]
            }]
          };
          resolve(chartOptions);
        });

        scoreCountPromise.then(options => {
          this.chart = new Highcharts[this.props.type || "Chart"](
              this.props.container,
              options
          );
        }).catch(console.log)

    }

    displayChart(){
      if(this.props.games && this.props.games.length > 0){
        return (
            <div>
              <div id={'chart'}></div>
            </div>
        )
      } else {
        return (
          <div className='loading-container'>
            <Loading type='bars' color='black' className='loading'></Loading>
            <div id={'chart'}></div>
          </div>
        )
      }
    }

    //Destroy chart before unmount.
    componentWillUnmount() {
        this.chart.destroy();
    }

    destroyLogo() {
      const textElements = document.getElementsByTagName('text');
      const textElementsArr = Array.from(docTexts);
      let textElement = null;
      textElementsArr.forEach(text => {
        if (text.innerHTML === 'Highcharts.com') {
          textElement = text;
        }
      });

      console.log('wtf', textElement);
    }

    render() {
        return (
          <div className="highcharts">
            {this.displayChart()}
            <div className="divider" style={{"margin":"20px"}}/>
          </div>
        )
    }
}
