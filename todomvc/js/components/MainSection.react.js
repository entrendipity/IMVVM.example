/** @jsx React.DOM */
/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoItem = require('./TodoItem.react');

var MainSection = React.createClass({

  propTypes: {
    allTodos: ReactPropTypes.object.isRequired,
    areAllComplete: ReactPropTypes.bool.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    var dataContext = this.props.todosDataContext;
    // This section should be hidden by default
    // and shown when there are todos.
    if (Object.keys(dataContext.todos).length < 1) {
      return null;
    }
    
    var allTodos = this.props.allTodos;
    var areAllComplete = this.props.areAllComplete;
    var todos = [];

    for (var key in allTodos) {
      todos.push(<TodoItem key={key} todosDataContext={dataContext} todo={allTodos[key]} />);
    }

    return (
      <section id="main">
        <input
          id="toggle-all"
          type="checkbox"
          onChange={this._onToggleCompleteAll}
          checked={areAllComplete ? 'checked' : ''}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="todo-list">{todos}</ul>
      </section>
    );
  },

  /**
   * Event handler to mark all TODOs as complete
   */
  _onToggleCompleteAll: function() {
    this.props.todosDataContext.toggleCompleteAll();
  }

});

module.exports = MainSection;
