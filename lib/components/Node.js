/** @jsx React.DOM */

var React = require('react/addons');

/**
 * Nodes for ReactTimber
 */
var Node = module.exports = React.createClass({
  displayName: 'Node',

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

    return (
      <div className="ReactTimber__folder" role="treeitem" tabIndex="0">
        <span className={togglerClasses} onClick={this.handleToggleClick} tabIndex="0">▾</span>
        {this.renderIcon()}
        <a href="#" onClick={this.props.onClick} className="ReactTimber__folder-title" tabIndex="0">{this.props.title}</a>
        <div className={childrenClasses} >
          {this.props.children}
        </div>
      </div>
    );
  }
});