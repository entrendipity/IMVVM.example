/**
 * @jsx React.DOM
 */
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*
/*  Astarisx.mixin.pushState, Astarisx.mixin.mediaQuery
/*  These should only be mixed-in in the DemoApp
*/

'use strict';
var DemoApp = React.createClass({
  mixins: [Astarisx.mixin.ui, Astarisx.mixin.pushState, Astarisx.mixin.mediaQuery],

  render: function(){

    var display;
    
    console.log('------------------------------------------ Current Application State ------------------------------------------')
    console.log(this.state.appContext);

    if(this.state.appContext.pageNotFound){
      display = <PageNotFound />;
    } else {
      display = (<div>
        <NavBarView viewKey={"NavBarView"} />
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
