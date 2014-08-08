/**
 * @jsx React.DOM
 */
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

'use strict';

var ListView = React.createClass({
	

	render: function() {
		var app = this.props.appContext;
		var collection = this.props.appContext.persons.collection;
		var current = this.props.appContext.persons.selectedPerson;
		var appContext = this.props.appContext;
		var list = collection.map(function(person){
			return (
				<ListItemView appContext={appContext} 
					person={person} selected={!!current && current.id === person.id} />
			);
		});
		return (
			<div className="list-group">
			  {list}
			</div>
		);
	}
});
