import React from 'react';

export default class PieChart extends React.Component {
  constructor () {
    super();
  }

  componentDidMount () {
    var can = document.getElementById('piechart');
    var context = can.getContext('2d');

    var percentage = this.props.percentage; // no specific length
    var degrees = percentage * 360.0;
    var radians = degrees * (Math.PI / 180);

    var x = 25;
    var y = 25;
    var r = 15;
    var s = 0;//1.5 * Math.PI;

    context.beginPath();
    context.lineWidth = 5;
    context.arc(x, y, r, s, radians, false);
    //context.closePath();
    context.stroke();
    // context.fillStyle = "#ff7e7e";
    // context.fill();
  }

  renderCircle (color = null) {
    var can = document.getElementById('piechart');
    var context = can.getContext('2d');

    var percentage = this.props.percentage; // no specific length
    var degrees = percentage * 360.0;
    var radians = degrees * (Math.PI / 180);

    var x = 25;
    var y = 25;
    var r = 15;
    var s = 0;//1.5 * Math.PI;

    context.beginPath();
    context.lineWidth = 5;
    context.arc(x, y, r, s, radians, false);
    //context.closePath();
    context.stroke();
    // context.fillStyle = "#ff7e7e";
    // context.fill();
  }

  render () {
    const percentage = this.props.percentage.toString().slice(2,4);
    return (
      <div className="pie-wrapper">
        <canvas id="piechart" className="pie-chart-container" width="44" height="44">
        </canvas>
        <div className="percentage-holder">
          {percentage}
        </div>
      </div>
    )
  }
}
