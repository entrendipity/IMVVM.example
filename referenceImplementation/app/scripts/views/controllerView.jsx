/**
 * @jsx React.DOM
 */
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*
/*  IMVVM.mixin.pushState, IMVVM.mixin.mediaQuery
/*  These should only be mixed-in in the ControllerView
*/

'use strict';
var ControllerView = React.createClass({
  mixins: [IMVVM.mixin.controllerView, IMVVM.mixin.pushState, IMVVM.mixin.mediaQuery],

  render: function(){

    var display;
    
    console.log('------------------------------------------ Current Application State ------------------------------------------')
    console.log(this.state.appContext);

    if(this.state.appContext.pageNotFound){
      display = <PageNotFound />;
    } else {
      display = (<div>
        <NavBarView />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <SideBarView viewKey={"SideBarView"}/>
            </div>
            <div className="col-md-8">
              <DetailsView viewKey={"DetailsView"} />
            </div>
          </div>
        </div>
      </div>);
    }
    return (
      <div>
        {display}
      </div>
    );
  }
});
