/** 
 * @jsx React.DOM
 */
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

'use strict';

var HobbyListView = React.createClass({
	addHobby: function(value, e){
		this.props.appContext.hobbies.addHobby(value);
	},
  updateName: function(e){
    this.props.appContext.hobbies.current.name = e.target.value;
  },
	shouldComponentUpdate: function(nextProps, nextState){
		if("hobbies" in nextProps.appContext.state.dataContextWillUpdate){
			return true;
		}
		if("persons" in nextProps.appContext.state.dataContextWillUpdate){
			var nextPerson = nextProps.appContext.state.dataContextWillUpdate.persons.selectedPerson;
			var selectedPerson = this.props.appContext.persons.selectedPerson;
			return nextPerson.id != selectedPerson.id || 
				nextPerson.hobbies.length !== selectedPerson.hobbies.length;
		}
		return false;
	},
	render: function() {
		var app = this.props.appContext;
		var collection = this.props.appContext.hobbies.hobbies;
		var current = this.props.appContext.hobbies.current;

		var list = collection.map(function(hobby){
				return <HobbyListItemView key={hobby.id} hobby={hobby}
					selected={current && (current.id === hobby.id)}
					appContext={app} />
		});

		return (
			<div>
				<AddControl placeholder="What do you like doing in your spare time?"
					funcAdd={this.addHobby} />
				{this.props.appContext.hobbies.busyText}
				<input key={current ? current.id:-1} className="form-control" type="text" value={current ? current.name : ''}
						    onChange={this.updateName} placeholder="Select hobby to update"/>
				<div className="list-group">
				  {list}
				</div>
			</div>
		);
	}
});
