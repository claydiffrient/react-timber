require('./helper');
var ReactTimber = require('../lib/components/ReactTimber');
var Node = require('../lib/components/Node');
var React = require('react/addons');
var Simulate = React.addons.TestUtils.Simulate;

var timber;

describe('ReactTimber', function() {

  beforeEach(function () {
    timberApp = renderReactTimber();
    timber = timberApp.refs.timber;
  });

  afterEach(function () {
    unmountReactTimber();
  })


  it('should have 3 children', function(){
    ok(timber.props.children.length === 3);
  });

  it('should set the first child to have focus', function () {
    ok(timber.refs['node-0'].getDOMNode() === document.activeElement);
  });

  it('should only have one element in the tab order at a time', function (){
    ok(timber.getDOMNode().querySelectorAll('[tabIndex="0"]').length === 1);
  });

  it('should fire the onClick event when pressing enter', function () {
    Simulate.keyUp(timber.refs['node-0'].getDOMNode(), {key: 'Enter'});
    ok(timberApp.refs.infoPane.getDOMNode().textContent === 'Enter');
  });

  xit('should open a collapsed node when the right arrow is pressed', function () {
    timber.setState({
      focusElement: timber.refs['node-1']
    }, function () {
      Simulate.keyUp(timber.refs['node-1'].getDOMNode(), {key: 'ArrowRight'});
      // This should have worked, but didn't :(
      // ok(!timber.refs['node-1'].state.collapsed);
    });
  });

  it('should move to the first child of an expanded node when the right arrow is pressed')
  it('should do nothing when the right arrow is pressed on an end node.', function () {
    Simulate.keyUp(timber.refs['node-0'].getDOMNode(), {key: 'ArrowRight'});
    ok(timber.refs['node-0'].state.collapsed);
  });

  it('should close an expanded node when the left arrow is pressed');
  it('should move focus to the parent node when left arrow is pressed on a collapsed node');

  it('should remember the last visited node when navigating away then back');
  it('should move focus up when the up arrow is pressed');
  it('should move focus down when the down arrow is pressed');

});
