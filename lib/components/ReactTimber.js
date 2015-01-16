/** @jsx React.DOM */

var React = require('react/addons');

var ReactTimber = module.exports = React.createClass({
  displayName: 'ReactTimber',

  propTypes: {
    title: React.PropTypes.string,    // What the folder should be called.
    isRoot: React.PropTypes.bool,     // Is this the root of the tree?
    onClick: React.PropTypes.func,    // What should happen when the node is clicked.
    iconClass: React.PropTypes.string // If provided an icon will be inserted
  },

  getInitialState: function () {
    return {
      collapsed: true
    }
  },

  componentDidMount: function () {
    var element = this.state.focusElement || this.refs['node-0']
    element.getDOMNode().focus();
  },


  renderIcon: function () {
    if (this.props.iconClass) {
      return (<i className={this.props.iconClass}></i>);
    } else {
      return null;
    }
  },

  render: function() {
    var index = 0;
    var children = React.Children.map(this.props.children, function (child) {
      return React.addons.cloneWithProps(child, {
        ref: 'node-' + (index++)
      });
    });

    return (
      <div className="ReactTimber__tree" role='tree'>
        {children}
      </div>
    );
  }

});
