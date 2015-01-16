/** @jsx React.DOM */

var React = require('react');
var ReactTimber = require('../../lib/index').ReactTimber;
var Node = require('../../lib/index').Node;

var appElement = document.getElementById('example');


var rootFolder = {
  title: "Root Folder",
  folders: [
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
  ]
};


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

  },


  renderFolders: function (folder) {

    var children;

    if (folder.hasOwnProperty('folders')) {
      children = folder.folders.map((f) => {
        return this.renderFolders(f);
      });
    }

    return (
      <Node onClick={this.handleClick} title={folder.title} isRoot={true}>
        {children}
      </Node>
    );

  },

  render: function() {
    return (
      <div className="App">
        <div className="App__TreeArea">
          <ReactTimber>
            {this.renderFolders(rootFolder)}
          </ReactTimber>
        </div>
        <div className="App__DisplayArea">
          {this.state.toDisplay}
          <button className="App__DisplayArea-button" type="button">A worthless button</button>
        </div>
      </div>
    );
  }
});

React.renderComponent(<App/>, appElement);
