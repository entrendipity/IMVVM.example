/*jshint unused: false */
/* global Astarisx, DataService, PersonModel */

'use strict';

var PersonsViewModel = (function(){
  var personStateChangeHandler = function(nextState, callback){
    var persons = {};
    persons.collection = this.collection.map(function(person){
      if(person.id === nextState.id){
        persons.selectedPerson = new Person(nextState);
        return persons.selectedPerson;
      }
      return person;
    });
    /*
      to notify controllerView us "*" which is the predefined viewId
    */
    this.setState(persons, callback);
  };

  var Person = function(){
    return new PersonModel(personStateChangeHandler).apply(this, arguments);
  };

  var personRouteHandler = function(params, path, pathId, ctx){
    if(ctx.rollbackRequest){
      ctx.revert();
      return;
    }
      this.selectPerson(params.id);
  };

  var PersonViewModelClass = Astarisx.createViewModelClass({  //short form => createVMClass()

    /* This is where you make ajax calls. You do not put ajax calls in getInitialState */
    dataContextWillInitialize: function(test){
      var nextState = {};

      console.log('test arg');
      console.log(test);
      nextState.collection = DataService.getPersonData().map(function(person, idx){
        return new Person(person, true);
      }.bind(this));

      this.setState(nextState, {notify: "SideBarView"}, false);
    },

    // getDisplays: function(){
    //   return {
    //     "main":{
    //       component: DetailsView,
    //       path: function(){ return '/person/' + this.selectedPerson.id; }
    //     }
    //   }
    // },

    getRoutes: function(){
      return {
        displayPerson: {
          path: '/person/:id',
          handler: personRouteHandler,
        },
        list: {
          path: '/people',
          handler: personRouteHandler,
        }
      };
    },

    getWatchedState: function() {
      return {
        'hobbies': {
          alias: 'hobbiesContext',
        },
        'online': {
          alias: 'imOnline'
        }
      };
    },

    imOnline: {
      kind:'pseudo',
      get: function(){
        return this.state.imOnline;
      }
    },

    selectedHobby: {
      kind: 'pseudo',
      get: function() {
        return this.state.hobbiesContext.current ?
          this.state.hobbiesContext.current.name: void(0);
      }
    },

    selectedPerson: {
      kind: 'instance',
      get: function() { return this.state.selectedPerson; }
    },

    collection: {
      kind: 'array',
      get: function(){ return this.state.collection; },
    },

    selectPerson: function(id, callback){
      var selectedPerson;

      if(!id){
          this.setState({selectedPerson: selectedPerson },
            {path: '/people' }, callback);
            return;
      }
      for (var i = this.collection.length - 1; i >= 0; i--) {
        if(this.collection[i].id === id){
          selectedPerson = new Person(this.collection[i]);
          this.setState({ selectedPerson: selectedPerson },
            {path: '/person/' + selectedPerson.id }, callback);
          break;
        }
      }
      if(!selectedPerson){
        this.setState({selectedPerson: selectedPerson },
          {pageNotFound: true }, callback);
      }
    },

    addPerson: function(value){
      var nextState = {};
      var name;

      if(value && value.length > 0){
        name = value.split(' ');
        nextState.selectedPerson = new Person({
          firstName: name[0],
          lastName: name.slice(1).join(' ')
        }, true);
        nextState.collection = this.collection.slice(0);
        nextState.collection = nextState.collection.concat(nextState.selectedPerson);
        this.setState(nextState,
          {path: '/person/' + nextState.selectedPerson.id });
      }
    },

    deletePerson: function(uid){
      var nextState = {};

      nextState.collection = this.collection.filter(function(person){
        return person.id !== uid;
      }.bind(this));

      if(nextState.collection.length > 0){
        if (!!this.selectedPerson){
          if(this.selectedPerson.id === uid){
            nextState.selectedPerson = void(0);
            this.setState(nextState, { enableUndo: true,
              path: '/people'});
              return;
          }
        }
      } else {
        if(!!this.selectedPerson){
          nextState.selectedPerson = void(0);
        }
        this.setState(nextState, {path: '/people'});
        return;
      }
      this.setState(nextState);
    },

  });

  return PersonViewModelClass;
})();
