/*jshint unused: false */
/* global IMVVM */

'use strict';

var HobbyModel = IMVVM.createModel({

  id: {
    kind: 'uid',
    get: function(){
      return this.state.id;
    }
  },

  name: {
    aliasFor: 'hobby',
    get: function(){
      return this.state.name;
    },
    set: function(newValue){
      this.setState({'name': newValue });
    }
  },

});
