/** @jsx React.DOM */

var React = require('react/addons');
var _ = require('lodash');

var ReactTimber = module.exports = React.createClass({
  displayName: 'ReactTimber',

  getInitialState: function () {
    return {
      focusElement: null
    }
  },

  componentDidMount: function () {
    var element = this.state.focusElement || this.refs['node-0']
    this.setState({
      focusElement: element
    });
    if (element.props.tabIndex) {
      element.getDOMNode().focus();
    } else {
      element.props.tabIndex = 0
      element.getDOMNode().focus();
    }
  },

  render: function() {
    var index = 0;
    var children = React.Children.map(this.props.children, (child) => {
      return React.addons.cloneWithProps(child, {
        key: 'node-' + (index),
        ref: 'node-' + (index)
      });
      index++;
    });

    if (this.state.focusElement) {
      var focusIndex;
      var focusElement = _.find(children, function (child, index) {
        focusIndex = index;
        return child.ref === this.state.focusElement.ref;
      }, this);
    }


    if (focusIndex) {
      children[focusIndex] = React.addons.cloneWithProps(children[focusIndex], {
        key: children[focusIndex].key,
        ref: children[focusIndex].ref,
        tabIndex: 0
      });
    }


    return (
      <div className="ReactTimber__tree" role='tree'>
        {children}
      </div>
    );
  }

});
