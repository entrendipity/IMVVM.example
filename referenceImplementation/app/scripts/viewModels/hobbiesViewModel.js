/*jshint unused: false */
/* global Astarisx, HobbyModel, DataService */

'use strict';

var HobbiesViewModel = (function(){

  var uuid = function () {
    /*jshint bitwise:false */
    var i, random;
    var uuid = '';

    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
        .toString(16);
    }
    return uuid;
  };

  var hobbyStateChangeHandler = function(nextState/*, callback*/){

    var newState = {};
    var hobbiesArr = this.hobbies.map(function(hobby){
      if (hobby.id === nextState.id){

        newState.current = new Hobby(nextState);
        return newState.current;
      }
      return hobby;
    }.bind(this));

    this.setState(newState, function(){
      //This will invoke setState within the persons Data Context
      this.state.personsContext.selectedPerson.updateHobby(newState.current);

      //maybe test calling this.setState.call(this.state.personsContext, {});
      //probably won't work because the caller has been bound and probably
      //not a good idea anyway because it leads to spegetti
    });

  };

  //Use this if state change is triggered by others action
  var onPersonChangeHandler = function(nextState, prevState, field, context,
      nextPath, prevPath){
    if(this.current !== void(0) && context === 'persons' &&
      (nextState === void(0) || nextState.id !== prevState.id || nextPath !== prevPath)){
      return { hobbies: { current: void(0) }, busy: false };
    }
  };

  var Hobby = function(){
    return new HobbyClass(hobbyStateChangeHandler).apply(this, arguments);
  };

  var hobbyRouteHandler = function(params, path, pathId, ctx){
    if(ctx.rollbackRequest){
      ctx.revert();
      return;
    }
    if(this.state.personsContext.selectedPerson === void(0) && ('id' in params) ||
      this.state.personsContext.selectedPerson.id != params.id){
      this.state.personsContext.selectPerson(params.id, function(){
        this.selectHobby(params.hobbyId);
      }.bind(this));
    } else {
      this.selectHobby(params.hobbyId);
    }

  };

  var HobbiesViewModelClass = Astarisx.createViewModelClass({  //short form => createVMClass()

    dataContextWillInitialize: function(){
      console.log('This should only be called once.');
    },

    getWatchedState: function() {
      return {
        'persons': {
          alias: 'personsContext', //optional - will be added to prototype
          fields: { //optional
            'selectedPerson': onPersonChangeHandler
          }
        },
        'busy': {
          alias: 'busy'
        }
      };
    },

    // getDisplays: function(){
    //   return {
    //     "hob View":{
    //       viewDisplay: "TestDisplay",
    //       component: HobbyListView,
    //       path: "selectHobby"
    //     }
    //   }
    // },

    getRoutes: function(){
      return {
        selectHobby : {
          path: '/person/:id/hobby/:hobbyId',
          handler: hobbyRouteHandler
        }
      }
    },

    hobbies: {
      kind: 'pseudo',
      get: function(){
        return this.state.personsContext.selectedPerson.hobbies;
      }
    },

    busyText: {
      kind: 'pseudo', //kind: 'pseudo' because its value is supplied externally
      get: function(){
        return this.state.busy ? 'Im Busy! Go away...' : 'Not doing too much.';
      }
    },

    current: {
      kind: 'instance',
      get: function(){
        return this.state.current;
      }
    },

    selectHobby: function(id){

      for (var i = this.hobbies.length - 1; i >= 0; i--) {
        if ((this.current === void(0) || this.current.id !== id) && this.hobbies[i].id === id){

          this.setState({
            current: new Hobby(this.hobbies[i])
          },
          {
            busy: true,
            path: '/person/'+ this.state.personsContext.selectedPerson.id +
            '/hobby/'+this.hobbies[i].id
          });

          /*
            //OR use a callback
            this.setState({current: new Hobby(this.hobbies[i])}, function(){
              this.setState({}, {busy: true});
            }.bind(this));
          */

          break;
        }
      }
    },

    // Not necessarily how I would code this
    // It probably should be in the persons data context
    addHobby: function(value){
      if(value !== ''){
        this.state.personsContext.selectedPerson.
        addHobby(new Hobby({ id: uuid(), name:value }, true));
      }
    },

    getHobbies: function(person){
      return DataService.getHobbiesData(person.id).map(function(hobby){
        return new Hobby(hobby, true);
      }.bind(this));
    },

    // Not necessarily how I would code this
    // It probably should be in the persons data context
    deleteHobby: function(value){
      /*

        If we were to simply call

              this.state.personsContext.selectedPerson.deleteHobby(value);

        then Astarisx is notified that the call was made from the 'persons' context
        and not from the 'hobbies' context. Therefore any subscribers to 'hobbies.current'
        are unaware of changes to 'hobbies.current'.

        If the selected hobby is deleted, then call setState from 'hobbies' ViewModel,
        so that the 'persons' context gets updated and busy can be set on the 'domain'

       */

      if(this.current && this.current.id === value){
        this.setState({ current: void(0) }, {
          busy: false,
          path: '/person/' + this.state.personsContext.selectedPerson.id
        },
        function(){
          this.state.personsContext.selectedPerson.deleteHobby(value);
        });
      } else {
        this.state.personsContext.selectedPerson.deleteHobby(value);
      }
    }
  });
  return HobbiesViewModelClass;
})();
