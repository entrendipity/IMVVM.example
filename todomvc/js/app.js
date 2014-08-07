/** @jsx React.DOM */

var React = require('react');
var DomainViewModel = require('./viewModels/TodoDomainViewModel');
var TodoApp = require('./components/TodoApp.react');

React.renderComponent(
  <TodoApp domainModel={DomainViewModel}/>,
  document.getElementById('todoapp')
);
