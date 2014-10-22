/*jshint unused: vars */
/*jshint unused: false */
/* global Astarisx, HobbiesViewModel, PersonsViewModel */
'use strict';
var mixinViewModels = {
  persons: {
    viewModel: PersonsViewModel,
    get: function(){
      return this._state.persons;
    }
  },

  hobbies: {
    viewModel: HobbiesViewModel,
    get: function(){
      return this._state.hobbies;
    }
  },
};

var ControllerViewModel = Astarisx.createControllerViewModelClass({ // short form => createCVMClass()

  //imvvm-animate.js mixin
  // mixins: [AstarisxAnimate],
  mixins: [mixinViewModels],
  getInitialState: function(){ //optional
    return {
      online: true,
      busy: false,
      basePath: Astarisx.page.base('/basePath'),
      path: '/people'
    };
  },

  basePath: {
    kind: "pseudo",
    get: function(){
      return Astarisx.page.base();
    }
  },

  dataContextWillInitialize: function(){
    // this.initializeDataContext(['persons', 'hobbies']);
    // OR intialize ALL dataContexts
    this.initializeDataContext('*', 'testArgs');
  },

  /* Required if mediaQuery Astarisx.mixin.mediaQuery is used */
  mediaChangeHandler: function(id, mql, initializing){
    if(mql.matches){
      if(this.canRevert){
        this.setState({mql:mql, media: id, notify:'NavBarView'});
      } else {
        this.setState({mql:mql, media: id, notify:'NavBarView'}, false);
      }
    }
  },

  // getDisplays: function(){
  //   return {
  //     "myView":{
  //       component: DetailsView,
  //       path: '/persons'
  //     },
  //     "myView2":{
  //       component: HobbyListView,
  //       path: function(){ return '/person/'+ this.persons.selectedPerson.id }
  //     },
  //     "myView3":{
  //       viewDisplay: "Home",
  //       component: HobbyListView,
  //       path: '/home'
  //     }
  //   }
  // },

  // dataContext keys define the dataContext names that will appear in
  // the View and associates a ViewModel.
  // persons: {
  //   viewModel: PersonsViewModel,
  //   get: function(){
  //     return this._state.persons;
  //   }
  // },

  // hobbies: {
  //   viewModel: HobbiesViewModel,
  //   get: function(){
  //     return this._state.hobbies;
  //   }
  // },

  personCount: {
    kind:'pseudo',
    get: function(){
      return this.persons ? this.persons.collection.length : 0;
    }
  },

  mql: {
    kind: "static",
    get: function(){
      return this._state.mql;
    }
  },

  media: {
    kind: "static",
    get: function(){
      return this._state.media;
    }
  },

  /*
    If the initial path needs to be '/person/:id' then it could be set in
    the path getter and therefore wouldn't need to be set in getInitialState

    path: Framework reserved property name
  */
  // path: {
  //   get: function(){
  //     if(this._state.path){
  //       return this._state.path;
  //     }
  //     return '/person/' + this._state.persons.selectedPerson.id;
  //   }
  // },

  /* Four ways to set busy
    1. set directly with a setter. This exposes the busy field to the View
    2. set directly within a callback in a ViewModel. Need setter to be present
    3. 2nd arg in setState from ViewModel. Pass in {busy: true}
    4. From a trigger. Return _state object i.e. {busy: true}, to domain model to process
  */
  busy: {
    get: function(){
      return this._state.busy;
    },
  },

  online: {
    kind: "static",
    get: function(){
      return this._state.online;
    },
    set: function(newValue){
      //Testing 'this' context
      this.setState({'online': newValue }, function(){
        this.setState({'online': newValue });
        console.log('testing this');
      });
    }
  },

});
