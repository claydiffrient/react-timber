/** @jsx React.DOM */

var React = require('react/addons');

/**
 * Nodes for ReactTimber
 */
var Node = module.exports = React.createClass({
  displayName: 'Node',

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

  handleToggleClick: function (event) {
    this.setState({
      collapsed: !this.state.collapsed
    });
  },

  renderIcon: function () {
    if (this.props.iconClass) {
      return (<i className={this.props.iconClass}></i>);
    } else {
      return null;
    }
  },

  handleKeyPress (event) {
    this.props.onNodeKeyPress(event);
  },

  render: function () {

    var togglerClasses = React.addons.classSet({
      'ReactTimber__toggler': true,
      'ReactTimber__toggler--expanded': !this.state.collapsed,
      'ReactTimber__toggler--collapsed': this.state.collapsed
    });

    var childrenClasses = React.addons.classSet({
      'ReactTimber__folder-children': true,
      'ReactTimber__folder-children--hidden': this.state.collapsed
    });

    var children = React.Children.map(this.props.children, (child, index) => {
      return React.addons.cloneWithProps(child, {
        key: this.props.refClone + '-' + (index),
        ref: this.props.refClone + '-' +(index),
        refClone: 'node-' + (index), // This lets us use the ref name later.
        onNodeKeyPress: this.handleKeyPress
      });
    });

    return (
      <div className="ReactTimber__folder" role="treeitem" tabIndex={this.props.tabIndex} onKeyUp={this.handleKeyPress}>
        <span className={togglerClasses} onClick={this.handleToggleClick}>▾</span>
        {this.renderIcon()}
        <div href="#" onClick={this.props.onClick} className="ReactTimber__folder-title">{this.props.title}</div>
        <div className={childrenClasses} >
          {children}
        </div>
      </div>
    );
  }
});
