/** @jsx React.DOM */

var React = require('react');
var ReactTimber = require('../../lib/index');

var appElement = document.getElementById('example');

var folders = [
  {
    title: "Folder One",
    folders: [
      {title: "Folder One - A"},
      {title: "Folder One - B"},
      {
        title: "Folder One - C",
        folders: [
          {title: "Folder One - C - 1"},
          {title: "Folder One - C - 2"},
          {title: "Folder One - C - 3"}
        ]
      }
    ]
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

  getInitialState: function () {
    return {
      toDisplay: null
    }
  },

  handleClick: function (event) {
    this.setState({
      toDisplay: 'You are looking at ' + event.currentTarget.text
    });
  },


  renderChildren: function (folder) {
    if (folder.hasOwnProperty('folders')) {
      return folder.folders.map((f) => {
        if (f.hasOwnProperty('folders')) {
          return (
            <ReactTimber onClick={this.handleClick} title={f.title} isRoot="false">
              {this.renderChildren(f)}
            </ReactTimber>
          );
        }
        return (
          <ReactTimber onClick={this.handleClick} title={f.title} isRoot="false" />
        );
      });
    }
  },


  renderFolders: function () {
    return folders.map((folder, index) => {
            return (
              <ReactTimber onClick={this.handleClick} title={folder.title} isRoot={index === 0}>
              {this.renderChildren(folder)}
              </ReactTimber>
            );
          });
  },

  render: function() {
    return (
      <div class="App">
        <div class="App__TreeArea">
          {this.renderFolders()}
        </div>
        <div class="App__DisplayArea">
          {this.state.toDisplay}
        </div>
      </div>
    );
  }
});

React.renderComponent(<App/>, appElement);
