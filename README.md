react-timber
============

[![Build Status](https://travis-ci.org/claydiffrient/react-timber.svg)](https://travis-ci.org/claydiffrient/react-timber)

# WIP: This should not be used right now.

react-timber is a tree view for displaying folder structures.  The guiding principles behind it are to make it as accessible as possible.  It is being based on the standards for a TreeView component as defined by the WAI (<http://www.w3.org/TR/wai-aria-practices/#TreeView>)

There are two components that are needed to create the tree: `ReactTimber` and `Node`.

They are used as follows:
```jsx
<ReactTimber>
   <Node title="Folder A" />
   <Node title="Folder B" />
   <Node title="Folder C">
      <Node title="Folder C1" />
      <Node title="Folder C2"/>
      <Node title="Folder C3">
         <Node title="Folder C31"/>
      </Node>
   <Node />
</ReactTimber>
```
In addition to a title, you can provide an `onClick` prop to the Node as well as an `iconClass`.  The `iconClass` will insert a font icon based on the class you provide.

