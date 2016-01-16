'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var log = require('debug')('logs:component');
var d3 = require('d3');

module.exports = React.createClass({
  displayName : "Shield",


  getDefaultProps : function() {
    return ({
      width : '100%',
      height : 300
    });
  },


  renderShield : function() {
    var mount = ReactDOM.findDOMNode(this);
    var width = mount.getBoundingClientRect().width;
    var height = mount.getBoundingClientRect().height;
    var g = d3.select(mount).select('g.shield-container');
    var bgRect = g.select('rect.bg-rect');
    var bgStripe = g.select('rect.bg-stripe');
    var bgCircle = g.select('circle.bg-circle');
    var scoreCircle = g.select('circle.score-circle');
    //var bgShield = g.select('path.shield-bg');
    //var shield = g.select('path.shield');
    var textAc = g.select('text.text-ac');
    var textInit = g.select('text.text-init');
    var textSpeed = g.select('text.text-speed');
    var textHitdice = g.select('text.text-hitdice');
    var labelAc = g.select('text.label-ac');
    var labelInit = g.select('text.label-init');
    var labelSpeed = g.select('text.label-speed');
    var labelHitdice = g.select('text.label-hitdice');
    var bgcw = (width / 2) - 100;
    var bgch = (height / 2) - 100;
    var centerx = (width / 2);
    var centery = (height / 2);

    var bgColor = '#d9edf7';
    var txtColor = '#31708f';

    bgRect
      .attr('x', bgcw)
      .attr('y', bgch)
      .attr('width', 200)
      .attr('height', 200)
      .attr('transform', 'rotate(45, ' + centerx + ',' + centery + ')')
      .attr('fill', bgColor);

    bgStripe
      .attr('x', centerx - 5)
      .attr('y', centery - 150)
      .attr('width', 10)
      .attr('height', 150)
      .attr('fill', '#fff');

    bgCircle
      .attr('cx', centerx)
      .attr('cy', centery)
      .attr('r', 55)
      .attr('fill', '#fff')

    scoreCircle
      .attr('cx', centerx)
      .attr('cy', centery)
      .attr('r', 50)
      .attr('fill', bgColor);

    // bgShield
    //   .attr('transform', () => {
    //     var scale = "scale(0.75)";
    //     var trans = "translate(";

    //     trans += centerx - (53.5);
    //     trans += ",";
    //     trans += centery - (48.5);
    //     trans += ")";

    //     return (trans + scale);
    //   })
    //   .attr('fill', '#fff')

    // shield
    //   .attr('transform', () => {
    //     var scale = "scale(0.65)";
    //     var trans = "translate(";

    //     trans += centerx - (46.5);
    //     trans += ",";
    //     trans += centery - (41.5);
    //     trans += ")";

    //     return (trans + scale);
    //   });

    textAc
      .attr('x', centerx)
      .attr('y', centery + 15)
      .attr('text-anchor', 'middle')
      .attr('font-size', '24pt')
      .attr('fill', txtColor)
      .text(this.props.data.get('hitDiceCurrent'))

    textHitdice
      .attr('x', centerx)
      .attr('y', centery + 100)
      .attr('text-anchor', 'middle')
      .attr('fill', txtColor)
      .text(this.props.data.get('hitDiceCurrent') + "d8")

    textSpeed
      .attr('x', centerx + 90)
      .attr('y', centery + 10)
      .attr('text-anchor', 'middle')
      .attr('fill', txtColor)
      .text(this.props.data.get('hitDiceCurrent'))

    textInit
      .attr('x', centerx - 90)
      .attr('y', centery + 10)
      .attr('text-anchor', 'middle')
      .attr('fill', txtColor)
      .text(this.props.data.get('hitDiceCurrent'))

    labelAc
      .attr('x', centerx)
      .attr('y', centery)
      .attr('dy', '-1.45em')
      .attr('fill', txtColor)
      .attr('text-anchor', 'middle')
      .text('AC')

    labelHitdice
      .attr('x', centerx)
      .attr('y', centery + 90)
      .attr('dy', '-0.75em')
      .attr('fill', txtColor)
      .attr('text-anchor', 'middle')
      .text('Hit Dice')

    labelSpeed
      .attr('x', centerx + 90)
      .attr('y', centery)
      .attr('dy', '-0.75em')
      .attr('fill', txtColor)
      .attr('text-anchor', 'middle')
      .text('Speed')

    labelInit
      .attr('x', centerx - 90)
      .attr('y', centery)
      .attr('dy', '-0.75em')
      .attr('fill', txtColor)
      .attr('text-anchor', 'middle')
      .text('Init')

  },


  componentDidMount : function() {
    this.renderShield();
  },


  componentDidUpdate : function() {
    log('updating shield');
    this.renderShield();
  },


  shouldComponentUpdate : function(nextProps) {
    return this.props.data !== nextProps.data;
  },


  render : function() {
    var paths = [
      <path className="shield-bg" d="M71.889,0c0,0,0,9.204,35.671,9.204C139.547,9.204,143.779,0,143.779,0s-7.307,55.051-15.219,71.802
  c-9.63,20.388-56.671,71.801-56.671,71.801S24.692,92.212,15.06,71.802C7.157,55.055,0,0,0,0s5.071,9.204,35.06,9.204
  C71.848,9.204,71.889,0,71.889,0z"/>,
      <path className="shield" d="M71.889,0c0,0,0,9.204,35.671,9.204C139.547,9.204,143.779,0,143.779,0s-7.307,55.051-15.219,71.802
  c-9.63,20.388-56.671,71.801-56.671,71.801S24.692,92.212,15.06,71.802C7.157,55.055,0,0,0,0s5.071,9.204,35.06,9.204
  C71.848,9.204,71.889,0,71.889,0z"/>
    ];


    return (
      <svg width={this.props.width} height={this.props.height}>
        <g className="shield-container">
          <rect className="bg-rect"></rect>
          <rect className="bg-stripe"></rect>
          <circle className="bg-circle"></circle>
          <circle className="score-circle"></circle>
          <text className="text-ac"></text>
          <text className="text-init"></text>
          <text className="text-speed"></text>
          <text className="text-hitdice"></text>
          <text className="label-ac"></text>
          <text className="label-init"></text>
          <text className="label-speed"></text>
          <text className="label-hitdice"></text>
        </g>
      </svg>
    )
  }
})