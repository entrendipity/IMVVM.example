var IMVVM = require('imvvm');
var TodoModel = require('../models/TodoModel');


var todoStateChangeHandler = function(state){
  var nextState = {todos:{}};
  nextState.selectedTodo = void(0);
  nextState.todos[state.id] = new Todo(this.todos[state.id], state);
  nextState.todos = IMVVM.extend(this.todos, nextState.todos);
  this.setState(nextState);
};

var Todo = function(){
  return new TodoModel(todoStateChangeHandler).apply(this, arguments);
};


var TodoViewModel = IMVVM.createViewModel({
  
  getInitialState: function(){
    return { todos: {} };
  },

  todos: {
    get: function(){
      return this.state.todos;
    }
  },

  areAllComplete: {
    get: function(){    
      var _todos = this.todos;
      for (id in _todos) {
        if (!_todos[id].complete) {
          return false;
          break;
        }
      }
      return true;
    }
  },

  /* Used when editing */
  selectedTodo: {
    kind: 'instance',
    get: function(){
      return this.state.selectedTodo;
    }
  },

  /**
   * @param  {string} text
   */
  create: function(text) {
    
    var todo = new Todo({
      text: text
    }, true);

    var nextTodos = IMVVM.extend(this.todos);
    nextTodos[todo.id] = todo;    
    this.setState({todos: IMVVM.extend(this.todos, nextTodos)});
  },

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
  //  */
  // updateText: function(id, text) {
  //   AppDispatcher.handleViewAction({
  //     actionType: TodoConstants.TODO_UPDATE_TEXT,
  //     id: id,
  //     text: text
  //   });
  // },

  selectToEdit: function(id) {
    var nextState = {};
    nextState.selectedTodo = new Todo(this.todos[id]);
    nextState.todos = IMVVM.extend(this.todos);
    nextState.todos[id] = nextState.selectedTodo;
    this.setState(nextState);
  },

  /**
   * Toggle whether a single ToDo is complete
   * @param  {object} todo
   */
  toggleComplete: function(todo) {
    var nextTodos = {};
    nextTodos[todo.id] = new Todo(todo, {complete: !todo.complete});
    nextTodos = IMVVM.extend(this.todos, nextTodos);
    this.setState({todos: nextTodos});
  },

  /**
   * Mark all ToDos as complete
   */
  toggleCompleteAll: function() {
    var nextTodos = {};
    var allComplete = this.areAllComplete;
    for(var key in this.todos){
      if(this.todos.hasOwnProperty(key)){
        if(allComplete){
          nextTodos[key] = new Todo(this.todos[key], {complete: false});
        } else  if(!this.todos[key].complete){
          nextTodos[key] = new Todo(this.todos[key], {complete: true});
        }
      } 
    }
    nextTodos = IMVVM.extend(this.todos, nextTodos);
    this.setState({todos: nextTodos});
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    var nextTodos = {};
    for(var key in this.todos){
      if(this.todos.hasOwnProperty(key) && key !== id){
        nextTodos[key] = this.todos[key];
      }
    }
    this.setState({todos: nextTodos});
  },

  /**
   * Delete all the completed ToDos
   */
  destroyCompleted: function() {
    var nextTodos = {};
    for(var key in this.todos){
      if(this.todos.hasOwnProperty(key) && !this.todos[key].complete){
        nextTodos[key] = new Todo(this.todos[key]);
      } 
    }
    this.setState({todos: nextTodos});
  }

});

module.exports = TodoViewModel;