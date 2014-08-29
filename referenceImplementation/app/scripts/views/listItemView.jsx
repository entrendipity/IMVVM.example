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

    if(this.props.personsCxt.selectedPerson &&
      this.props.personsCxt.selectedPerson.id != uid){
      this.props.personsCxt.selectPerson(uid);
    } else {
      this.props.personsCxt.selectPerson(uid);
    }
  },

  deletePerson: function(e){
    this.props.personsCxt.deletePerson(this.props.person.id);
  },
  render: function() {
    var selectedHobby = this.props.selected && !!this.props.personsCxt.selectedHobby ? " is " + this.props.personsCxt.selectedHobby : "";
    var person = this.props.person;
    return (
      <a
        onClick={this.handleSelection}
        key={person.id}
        href="#"
        className={this.props.selected ? "list-group-item active" : "list-group-item"} >
            {this.props.personsCxt.imOnline ? "" : "Offline -> "} {person.fullName + selectedHobby}
            <DeleteButton funcDelete={this.deletePerson} />
        </a>
    );
  }
});