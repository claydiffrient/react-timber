/** @jsx React.DOM */

var React = require('react/addons');

var ReactTimber = module.exports = React.createClass({

  propTypes: {
    title: React.PropTypes.string
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

    return (
      <div className="ReactTimber__folder">
        <div className={togglerClasses} onClick={this.handleToggleClick}>▾</div>
        <div className="ReactTimber__folder-title">{this.props.title}</div>
        <div className="ReactTimber__folder-children">
          {this.props.children}
        </div>
      </div>
    );
  }

});
