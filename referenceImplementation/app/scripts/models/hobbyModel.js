/* jshint unused: false */
/* global Astarisx */

'use strict';

var HobbyClass = Astarisx.createModelClass({ // short form => createMClass()

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
