/** @jsx React.DOM */

var React = require('react');

var ReactTimber = module.exports = React.createClass({

  propTypes: {
    folders: React.PropTypes.object
  },

  renderFolders: function () {
    this.props.folders.map(function (folder) {
      return (<div>{folder.name}</div>);
    });
  },

  render: function() {
    return (
      <div>
        {this.renderFolders()}
      </div>
    );
  }

});
