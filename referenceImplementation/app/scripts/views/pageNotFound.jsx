/**
 * @jsx React.DOM
 */
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

'use strict';

var PageNotFound = React.createClass({
  mixins: [Astarisx.mixin.view],
  goBack: function(){    
    this.state.appContext.setState({
      forceReplace: true, 
      path:'/people'
    });
  },
  render: function(){
    return (
      <div className="jumbotron">
        <div className="container">
          <h1>404: Page Not Found!</h1>
          <p>something went wrong...</p>
          <p><a className="btn btn-primary btn-lg" role="button"
          onClick={this.goBack}>Go back</a></p>
        </div>
      </div>
    );
  }
});
