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


  renderChildren: function (folder) {
    if (folder.hasOwnProperty('folders')) {
      return folder.folders.map((f) => {
        if (f.hasOwnProperty('folders')) {
          return (
            <ReactTimber title={f.title} isRoot="false">
              {this.renderChildren(f)}
            </ReactTimber>
          );
        }
        return (
          <ReactTimber title={f.title} isRoot="false" />
        );
      });
    }
  },


  renderFolders: function () {
    return folders.map((folder, index) => {
            return (
              <ReactTimber title={folder.title} isRoot={index === 0}>
              {this.renderChildren(folder)}
              </ReactTimber>
            );
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
