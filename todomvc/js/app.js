/** @jsx React.DOM */

var React = require('react');
var TodoDomainViewModel = require('./viewModels/TodoDomainViewModel');
var TodoApp = require('./components/TodoApp.react');

React.renderComponent(
  <TodoApp domainModel={TodoDomainViewModel}/>,
  document.getElementById('todoapp')
);
