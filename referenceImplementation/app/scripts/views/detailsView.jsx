/**
 * @jsx React.DOM
 */
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

'use strict';

var DetailsView = React.createClass({
	mixins: [Astarisx.mixin.view],
	render: function() {
		console.log('Details View rendered');
		var display;
		if(!this.state.appContext.persons.selectedPerson){
			display = <div>Select or add a person</div>;
		} else {
			display = (
				<div>
					<FormView selectedPerson={this.state.appContext.persons.selectedPerson}/>
					<HobbyListView appContext={this.state.appContext}/>
				</div>
			);
		}
		 
		return <div>{display}</div>;
	}
});
