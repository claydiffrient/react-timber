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
      element.getDOMNode().tabIndex = 0;
      element.getDOMNode().focus();
    }
  },

  componentDidUpdate: function (prevProps, prevState) {
    if (prevState.focusElement) {
      this.state.focusElement.props.tabIndex = -1;
      prevState.focusElement.getDOMNode().tabIndex = -1;
    }
    this.state.focusElement.props.tabIndex = 0;
    this.state.focusElement.getDOMNode().tabIndex = 0;
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
      case "ArrowDown": {
        event.stopPropagation();
        if (focusedState.collapsed) {
          // Get all the keys
          var ownerRefs = this.state.focusElement._owner.refs;
          var ownerRefKeys = Object.keys(ownerRefs);
          // If nothing else is there, do nothing.
          if (ownerRefKeys.length === 1) {
            break;
          }
          // Move to the next sibling or nothing if there are no others
          for (var i = 0; i < ownerRefKeys.length; i++) {
            var key = ownerRefKeys[i];
            if (ownerRefs[key].props.tabIndex == 0) {
              if (i + 1 < ownerRefKeys.length) {
                this.setState({
                  focusElement: ownerRefs[ownerRefKeys[i+1]]
                }, () => {
                  this.state.focusElement.getDOMNode().focus();
                });
                break;
              } else {
                // Need to try and move to the next element outside of this portion
                console.log(this.state.focusElement._owner.props.refClone);
                console.log(this.state.focusElement._owner._owner.refs);
              }
            }
          }
        } else {
          // Move to the first child element if it's there.
          if (this.state.focusElement.refs) {
            var newFocusName = this.state.focusElement.props.refClone + '-0';
            var newFocus = this.state.focusElement.refs[newFocusName];
            this.setState({
              focusElement: newFocus
            }, () => {
              this.state.focusElement.getDOMNode().focus();
            });
          }
        }
        break;
      }
      case "ArrowUp": {
        event.stopPropagation();
        console.log('target', event.target);
        console.log('focusElement', this.state.focusElement);
        console.log('focusElementProps', this.state.focusElement.props);
        console.log('focusElementOwner',this.state.focusElement._owner);
        console.log('focusElementOwnerProps',this.state.focusElement._owner.props);
      }
      case "Enter": {
        event.preventDefault();
        event.stopPropagation();
        this.state.focusElement.props.onClick(event);
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


    return (
      <div className="ReactTimber__tree" role='tree'>
        {children}
      </div>
    );
  }

});
