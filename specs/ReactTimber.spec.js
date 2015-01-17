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

  it('should move focus up when the up arrow is pressed');
  it('should move focus down when the down arrow is pressed');

});
