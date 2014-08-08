/**
 * @jsx React.DOM
 */
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

'use strict';

var ListItemView = React.createClass({
  handleSelection: function(e){
    e.preventDefault();
    
    var uid = this.props.person.id;

    if(this.props.appContext.persons.selectedPerson &&
      this.props.appContext.persons.selectedPerson.id != uid){
      this.props.appContext.persons.selectPerson(uid);
    } else {
      this.props.appContext.persons.selectPerson(uid);
    }
  },

  deletePerson: function(e){
    this.props.appContext.persons.deletePerson(this.props.person.id);
  },
  render: function() {
    var selectedHobby = this.props.selected && !!this.props.appContext.persons.selectedHobby ? " is " + this.props.appContext.persons.selectedHobby : "";
    var person = this.props.person;
    return (
      <a
        onClick={this.handleSelection}
        key={person.id}
        href="#"
        className={this.props.selected ? "list-group-item active" : "list-group-item"} >
            {this.props.appContext.persons.imOnline ? "" : "Offline -> "} {person.fullName + selectedHobby}
            <DeleteButton funcDelete={this.deletePerson} />
        </a>
    );
  }
});