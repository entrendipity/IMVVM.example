/** 
 * @jsx React.DOM 
 */
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

'use strict';

var SideBarView = React.createClass({
	mixins: [IMVVM.mixin.view],
  addPerson: function(value){
		this.state.appContext.persons.addPerson(value);
	},
	shouldComponentUpdate: function(nextProps, nextState){
		var current = this.state.appContext.state.dataContextWillUpdate;
		var next = nextState.appContext.state.dataContextWillUpdate;
		return "persons" in next || "persons" in current || "hobbies" in next;
	},
	render: function(){
		return (
			<div>
				<AddControl placeholder="Full Name" funcAdd={this.addPerson} />
				<ListView personsCxt={this.state.appContext.persons} />
			</div>
		);		
	}		
});