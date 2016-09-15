import React from 'react';

export default class PieChart extends React.Component {
  constructor () {
    super();
  }

  componentDidMount () {
    // background circle of percentage
    var can = document.getElementById('piechart1');
    var context = can.getContext('2d');

    var percentage = 100; // full circle
    var degrees = percentage * 360.0;
    var radians = degrees * (Math.PI / 180);

    var x = 30;
    var y = 30;
    var r = 25;
    var s = 0;//1.5 * Math.PI;

    context.strokeStyle = "#ffffff";
    context.beginPath();
    context.lineWidth = 6;
    context.arc(x, y, r, s, radians, false);
    //context.closePath();
    context.stroke();

    // percentage depicting arc
    var can2 = document.getElementById('piechart2');
    var context2 = can.getContext('2d');

    var percentage = this.props.percentage; // percentage
    var degrees = percentage * 330.0;
    var radians = degrees * (Math.PI / 180);

    var x = 30;
    var y = 30;
    var r = 25;
    var s = 0;//1.5 * Math.PI;

    context2.strokeStyle = "#ff7e7e";
    context2.beginPath();
    context2.lineWidth = 6;
    context2.arc(x, y, r, s, radians, false);
    //context2.closePath();
    context2.stroke();
  }

  // renderCircle (percentage, color = null) {
  //   var can = document.getElementById('piechart');
  //   var context = can.getContext('2d');
  //
  //   var percentage = this.props.percentage; // no specific length
  //   var degrees = percentage * 360.0;
  //   var radians = degrees * (Math.PI / 180);
  //
  //   var x = 30;
  //   var y = 30;
  //   var r = 17;
  //   var s = 0;//1.5 * Math.PI;
  //
  //   context.fillStyle = "#ff7e7e";
  //   context.beginPath();
  //   context.lineWidth = 5;
  //   context.arc(x, y, r, s, radians, false);
  //   //context.closePath();
  //   context.stroke();
  //   context.fill();
  // }

  render () {
    let percentage = this.props.percentage.toString().slice(2,4);
    console.log(percentage.length);
    if (percentage.length < 2) {
      percentage = percentage.concat('0');
    }
    return (
      <div className="pie-wrapper">
        <canvas id="piechart" className="pie-chart-container" width="60" height="60" style={{ zIndex: 3 }}>
        </canvas>
        <canvas id="piechart1" className="pie-chart-container" width="60" height="60" style={{ zIndex: 2 }}>
        </canvas>
        <div className="percentage-holder">
          {percentage}
        </div>
      </div>
    )
  }
}
