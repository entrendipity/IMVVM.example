var IMVVM = require('imvvm');
var TodoViewModel = require('./TodoViewModel');

var TodoDomainViewModel = IMVVM.createDomainViewModel({

  /**
  * Expose the TodoViewModel to the "Controller-View" as `Todos` Data Context.
  * This will be attached to this.state.domainDataContext
  */
  Todos: {
    viewModel: TodoViewModel,
    get: function(){
      return this.state.Todos;
    }
  }

});

module.exports = TodoDomainViewModel;
