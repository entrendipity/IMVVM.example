/**
 * @jsx React.DOM
 */
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

'use strict';

var DetailsView = React.createClass({
	mixins: [IMVVM.mixin.view],
	render: function() {
		if(!this.state.appContext.persons.selectedPerson){
			return <div>Select or add a person</div>;
		}
		return (
			<div>
				<FormView selectedPerson={this.state.appContext.persons.selectedPerson}/>
				<HobbyListView appContext={this.state.appContext}/>
			</div>
		);
	}
});
