/** @jsx React.DOM */

assert = require('assert');
React = require('react/addons');
var ReactTimber = require('../lib/components/ReactTimber');
var Node = require('../lib/components/Node');

ReactTestUtils = React.addons.TestUtils;
ok = assert.ok;
equal = assert.equal;
strictEqual = assert.strictEqual;
throws = assert.throws;

var _currentDiv = null;

var TimberApp = React.createClass({
  displayName: 'TimberApp',

  getInitialState: function () {
    return {
      infoPane: ''
    }
  },

  handleClick: function (event) {
    this.setState({
      infoPane: event.key
    });
  },

  render: function () {
    return (
      <div>
        <ReactTimber ref="timber">
          <Node title="Documents" onClick={this.handleClick} />
          <Node title="Music">
            <Node title="Rock" />
            <Node title="Pop" />
            <Node title="Classic" />
          </Node>
          <Node title="Videos">
            <Node title="Family" />
            <Node title="Adventure" />
          </Node>
        </ReactTimber>
        <button ref="aButton" className="button" type="button">Button</button>
        <div ref="infoPane">{this.state.infoPane}</div>
      </div>
    );
  }
});

renderReactTimber = function () {
  return React.render((
    <TimberApp />
  ), document.body);
};

unmountReactTimber = function () {
  React.unmountComponentAtNode(document.body);
};