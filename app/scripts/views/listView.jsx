/**
 * @jsx React.DOM
 */
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

'use strict';

var ListView = React.createClass({
	handleSelection: function(uid, e){
		e.preventDefault();
    if(this.props.appContext.persons.selectedPerson &&
      this.props.appContext.persons.selectedPerson.id != uid){
  		this.props.appContext.persons.selectPerson(uid);
    } else {
      this.props.appContext.persons.selectPerson(uid);
    }
	},
	deletePerson: function(uid, e){
		this.props.appContext.persons.deletePerson(uid);
	},
	render: function() {
		var app = this.props.appContext;
		var collection = this.props.appContext.persons.collection;
		var current = this.props.appContext.persons.selectedPerson;
		var selectedHobby = !!this.props.appContext.persons.selectedHobby ? " is " + this.props.appContext.persons.selectedHobby : "";

		var list = collection.map(function(person){
			if(!!current && current.id === person.id){
				return (
					<a
					onClick={this.handleSelection.bind(this, person.id)}
					key={person.id}
					href="#"
					className="list-group-item active">
					    {this.props.appContext.persons.imOnline ? "" : "Offline -> "} {person.fullName + selectedHobby}
					    <DeleteButton funcDelete={this.deletePerson.bind(this, person.id)} />
					</a>
				);
			}
			return (
				<a onClick={this.handleSelection.bind(this, person.id)}
				key={person.id}
				href="#"
				className="list-group-item">
				    {this.props.appContext.persons.imOnline ? "" : "Offline -> "} {person.fullName}
				    <DeleteButton funcDelete={this.deletePerson.bind(this, person.id)} />
				</a>
			);
		}.bind(this));

		return (
			<div className="list-group">
			  {list}
			</div>
		);
	}
});
