import React from 'react';
import Highcharts from 'highcharts';

// this receives the options and type of chart to be displayed

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
      }
    }
        // Set container which the chart should render to.

    displayGames(){
      return (
        <div>
          <div id={this.props.container}></div>
        </div>
      )
    }

    //Destroy chart before unmount.
    componentWillUnmount() {
        this.chart.destroy();
    }

    render() {
        return (
          <div className="highcharts">
            {this.displayGames()}
          </div>
        )
    }
}
