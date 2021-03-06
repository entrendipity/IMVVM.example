/*jshint unused: false */
/* global Astarisx, DataService, HobbyClass */

'use strict';

var PersonModel = (function(){

  var Hobby = function(){
    return new HobbyClass().apply(this, arguments);
  };

  var calculateAge = function(dob){ // dob is a date
    if(dob === void(0) || dob.length < 10){
      return 'Enter your Birthday';
    }
    var DOB = new Date(dob);
    var ageDate = new Date(Date.now() - DOB.getTime()); // miliseconds from
    var age = Math.abs(ageDate.getFullYear() - 1970);
    return isNaN(age) ? 'Enter your Birthday' : age + ' years old';
  };

  var PersonClass = Astarisx.createModelClass({

    getInitialState: function(){

      var hobbies = [];

      if(this.hobbies === void(0)){       
        hobbies = DataService.getHobbiesData(this.id).map(function(hobby){
          return new Hobby(hobby);
        }.bind(this));
      } else {
        hobbies = this.hobbies;
      }

      return {
        age: calculateAge(this.dob),
        id: this.id || Astarisx.uuid(),
        hobbies: hobbies
      };
    },

    id: {
      kind: 'uid',
      get: function(){
        return this.$state.id;
      }
    },

    firstName: {
      get: function(){ return this.$state.firstName; },
      set: function(newValue){
        var nextState = {};
        nextState.firstName = newValue.length === 0 ? void(0) : newValue;
        this.setState(nextState);
      }
    },

    lastName: {
      get: function(){ return this.$state.lastName; },
      set: function(newValue){
        var nextState = {};
        nextState.lastName = newValue.length === 0 ? void(0) : newValue;
        this.setState(nextState);
      }
    },

    fullName: {
      kind: 'pseudo',
      get: function(){
        if(this.lastName === void(0)){
          return this.firstName;
        }
        return this.firstName + ' ' + this.lastName;
      },
      set: function(newValue){
        var nextState = {};
        var nameArr = newValue.split(' ');
        var isSpace = newValue.slice(-1)[0] === ' ';
        var firstname = nameArr[0];
        var lastname = nameArr.slice(1).join(' ');

        nextState.firstName = firstname.length === 0 ? void(0) : firstname;
        nextState.lastName = lastname.length === 0 && !isSpace ? void(0) : lastname;

        this.setState(nextState);
      }
    },

    occupation: {
      aliasFor: 'job',
      get: function(){
        return this.$state.occupation;
      },
      set: function(newValue){
        this.setState({'occupation': newValue });
      }
    },

    dob: {
      get: function(){
        return this.$state.dob;
      },
      set: function(newValue){
        this.setState({'dob': newValue});
      }
    },

    //Calculated field <- dob
    age: {
      kind: 'pseudo',
      get: function(){
        return calculateAge(this.dob);
      }
    },

    gender: {
      get: function(){ return this.$state.gender; },
      set: function(newValue){
        //This is to test callback context
        this.setState({}, function(){
          console.log('test auto bind: Should show a Model');
          console.log(this);
          this.setState({'gender': newValue});
        });
      }
    },

    hobbies: {
      kind: 'array',
      get: function(){ return this.$state.hobbies; },
    },

    updateHobby: function(obj){
      var arr = this.hobbies.map(function(hobby){
        if(hobby.id === obj.id){
          return obj;
        }
        return hobby;
      });
      
      this.setState({hobbies: arr});
    },

    addHobby: function(value){
      var arr;
      for (var i = this.hobbies.length - 1; i >= 0; i--) {
        if(this.hobbies[i].name === value.name){
          return;
        }
      }
      arr = this.hobbies.slice(0);
      this.setState({
        hobbies: arr.concat(new Hobby({ name:value }))
      });
    },

    deleteHobby: function(id){
      var hobbies = this.hobbies.filter(function(hobby){
        return hobby.id !== id;
      });
      this.setState({hobbies: hobbies},{
        busy: false,
        $path: '/person/' + this.id,
        hobbies: { current: void(0) }
      });
    },

  });
  return PersonClass;
})();
