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
		var personsCxt = this.props.personsCxt;
		var collection = personsCxt.collection;
		var current = personsCxt.selectedPerson;
		var list = collection.map(function(person){
			return (
				<ListItemView key={person.id} personsCxt={personsCxt} 
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
