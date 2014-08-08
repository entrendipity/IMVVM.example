var IMVVM = require('imvvm');

var TodoModel = IMVVM.createModel({

  getInitialState: function(){
    return {
      id: this.id || Date.now().toString(),
      complete: false
    };
  },

  id: {
    get: function(){
      return this.state.id;
    }
  },
  
  text: {
    get: function(){
      return this.state.text;
    },
    set: function(newVal){
      this.setState({text: newVal});
    }
  },

  complete: {
    get: function(){
      return this.state.complete;
    },
    set: function(newVal){
      this.setState({complete: newVal});
    }
  }

});

module.exports = TodoModel;
