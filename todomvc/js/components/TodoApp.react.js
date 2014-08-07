/** @jsx React.DOM */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the DomainDataContext and passes the new data to its children.
 */
 
var IMVVM = require('imvvm');
var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');

var TodoApp = React.createClass({
  /**
  * Event handler for 'change' events coming from TodoDomainViewModel data context
  */
  mixins: [IMVVM.mixin.main],

  /**
   * @return {object}
   */
  render: function() {

    var todosDataContext = this.state.domainDataContext.Todos;

  	return (
      <div>
        <Header todosDataContext={todosDataContext}/>
        <MainSection
          allTodos={todosDataContext.todos}
          areAllComplete={todosDataContext.areAllComplete}
          todosDataContext={todosDataContext}
        />
        <Footer todosDataContext={todosDataContext} allTodos={todosDataContext.todos} />
      </div>
  	);
  },

});

module.exports = TodoApp;
