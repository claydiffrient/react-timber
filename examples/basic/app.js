/** @jsx React.DOM */

var React = require('react');
var ReactTimber = require('../../lib/index');

var appElement = document.getElementById('example');

var folders = [
  {
    title: "Folder One",
  },
  {
    title: "Folder Two"
  },
  {
    title: "Folder Three"
  },
  {
    title: "Folder Four"
  },
];



var App = React.createClass({

  renderFolders: function () {
    return folders.map((folder) => {
            return (<ReactTimber title={folder.title} />);
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

React.renderComponent(<App/>, appElement);
