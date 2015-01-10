/** @jsx React.DOM */

var React = require('react');
var ReactTimber = require('../lib/index');

var appElement = document.getElementById('example');

var folders = [
  {
    title: "Folder One"
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

  render: function() {
    return (
      <div>
        <ReactTimber folders={folders} favoriteColor="green" />
      </div>
    );
  }
});

React.renderComponent(<App/>, appElement);
