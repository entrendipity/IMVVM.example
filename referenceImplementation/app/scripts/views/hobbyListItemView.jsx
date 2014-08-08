/** 
 * @jsx React.DOM
 */
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

'use strict';

var HobbyListItemView = React.createClass({
  handleSelection: function(e){
    e.preventDefault();
    e.stopPropagation();
    this.props.appContext.hobbies.selectHobby(this.props.hobby.id);
  },
  deleteHobby: function(e){
    this.props.appContext.hobbies.deleteHobby(this.props.hobby.id);
  },
  render: function(){
    return (<a
              onClick={this.handleSelection}
              key={this.props.hobby.id}
              href="#"
              className={this.props.selected ? "list-group-item active" : "list-group-item"}>
                  {this.props.hobby.name}
                  <DeleteButton funcDelete={this.deleteHobby} />
              </a>)
  }
});