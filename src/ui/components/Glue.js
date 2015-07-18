'use strict';

var React = require('react/addons');

module.exports = React.createClass({
  displayName : 'Glue',


  renderChildren : function() {
    return React.Children.map(this.props.children, (child) => {
      var { children, ...props } = this.props;
      return React.addons.cloneWithProps(child, ...props);
    })
  },


  render : function() {
    return (
      <div>
        {this.renderChildren()}
      </div>
    )
  }
})
