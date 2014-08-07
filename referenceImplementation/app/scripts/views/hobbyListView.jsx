/** 
 * @jsx React.DOM
 */
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

'use strict';

var HobbyListView = React.createClass({
	handleSelection: function(uid, e){
		e.preventDefault();
		e.stopPropagation();
		this.props.appContext.hobbies.selectHobby(uid);
	},
	addHobby: function(value, e){
		this.props.appContext.hobbies.addHobby(value);
	},
	deleteHobby: function(uid, e){
		this.props.appContext.hobbies.deleteHobby(uid);
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
			if(current && (current.id === hobby.id)){
				return (
					<a
					onClick={this.handleSelection.bind(this, hobby.id)}
					key={hobby.id}
					href="#"
					className="list-group-item active">
					    {hobby.name}
					    <DeleteButton funcDelete={this.deleteHobby.bind(this, hobby.id)} />
					</a>
				);
			}
			return (
				<a
				onClick={this.handleSelection.bind(this, hobby.id)}
				key={hobby.id}
				href="#"
				className="list-group-item">
				    {hobby.name}
				    <DeleteButton funcDelete={this.deleteHobby.bind(this, hobby.id)} />
				</a>
			);
		}.bind(this));

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
