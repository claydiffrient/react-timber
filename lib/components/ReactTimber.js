/** @jsx React.DOM */

var React = require('react/addons');

var ReactTimber = module.exports = React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    isRoot: React.PropTypes.bool
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

  render: function() {

    var togglerClasses = React.addons.classSet({
      'ReactTimber__toggler': true,
      'ReactTimber__toggler--expanded': !this.state.collapsed,
      'ReactTimber__toggler--collapsed': this.state.collapsed
    });

    var childrenClasses = React.addons.classSet({
      'ReactTimber__folder-children': true,
      'ReactTimber__folder-children--hidden': this.state.collapsed
    });

    var role = (this.props.isRoot) ? 'tree' : 'treeitem';

    return (
      <div className="ReactTimber__folder" role={role}>
        <div className={togglerClasses} onClick={this.handleToggleClick} tabIndex="0">▾</div>
        <div className="ReactTimber__folder-title" tabIndex="0">{this.props.title}</div>
        <div className={childrenClasses} >
          {this.props.children}
        </div>
      </div>
    );
  }

});
