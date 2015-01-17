/** @jsx React.DOM */

var React = require('react/addons');
var _ = require('lodash');

var ReactTimber = module.exports = React.createClass({
  displayName: 'ReactTimber',

  getInitialState: function () {
    return {
      focusElement: null
    }
  },

  componentDidMount: function () {
    var element = this.state.focusElement || this.refs['node-0']
    this.setState({
      focusElement: element
    });
    if (element.props.tabIndex) {
      element.getDOMNode().focus();
    } else {
      element.props.tabIndex = 0
      element.getDOMNode().focus();
    }
  },

  handleNodeKeypress: function (event) {
    event.preventDefault();
    var focusedState = this.state.focusElement.state
    switch(event.key) {
      case "ArrowRight": {
        // Do nothing if this is an end node.
        if ((!this.state.focusElement.props.children)) {
          break;
        }
        // If it's collapsed expand it.
        else if (focusedState.collapsed) {
          this.state.focusElement.setState({collapsed: false}, () => {
              // For some reason focus was getting lost, so this puts it back.
              this.state.focusElement.getDOMNode().focus();
            }
          );
        }
        // If it's collapsed, set focus to the first element in the list.
        else if (!focusedState.collapsed) {
          var newFocusName = this.state.focusElement.props.refClone + '-0';
          var newFocus = this.state.focusElement.refs[newFocusName];
          this.setState({
            focusElement: newFocus
          }, () => {
            this.state.focusElement.getDOMNode().focus();
          });
        }
        break;
      }
      case "ArrowLeft": {
        // If it's collapsed move focus to parent
        if (focusedState.collapsed) {
          // HACK: Using _owner to do this... probably not the best.
          if (!this.state.focusElement._owner.props.refClone) {
            // Not a node, so we won't do anything else here.
            break;
          }

          this.setState({
            focusElement: this.state.focusElement._owner
          }, () => {
            this.state.focusElement.getDOMNode().focus();
          });
        }
        // If it's expanded collapse it.
        else if (!focusedState.collapsed) {
          this.state.focusElement.setState({collapsed: true}, () => {
            // For some reason focus was getting lost, so this puts it back.
            this.state.focusElement.getDOMNode().focus();
          });
        }
        break;
      }
    }
  },

  render: function() {
    var children = React.Children.map(this.props.children, (child, index) => {
      return React.addons.cloneWithProps(child, {
        key: 'node-' + (index),
        ref: 'node-' + (index),
        refClone: 'node-' + (index), // This lets us use the ref name later.
        onNodeKeyPress: this.handleNodeKeypress
      });
    });

    if (this.state.focusElement) {
      var focusIndex;
      var focusElement = _.find(children, function (child, index) {
        focusIndex = index;
        return child.ref === this.state.focusElement.ref;
      }, this);
    }


    if (focusIndex) {
      children[focusIndex] = React.addons.cloneWithProps(children[focusIndex], {
        key: children[focusIndex].key,
        ref: children[focusIndex].ref,
        refClone: children[focusIndex].ref,
        tabIndex: 0
      });
    }


    return (
      <div className="ReactTimber__tree" role='tree'>
        {children}
      </div>
    );
  }

});
