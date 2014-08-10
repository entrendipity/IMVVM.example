/**
 * @jsx React.DOM
 */
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

'use strict';

var ControllerView = React.createClass({
  mixins: [IMVVM.mixin.main, IMVVM.mixin.pushState, IMVVM.mixin.mediaQuery],

  render: function(){

    var display;
    var dataContext = this.state.dataContext;
    
    console.log('------------------------------------------ Current Application State ------------------------------------------')
    console.log(dataContext);

    if(dataContext.pageNotFound){
      display = <PageNotFound />;
    } else {
      display = (<div>
        <NavBarView appContext={dataContext} />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <SideBarView appContext={dataContext} />
            </div>
            <div className="col-md-8">
              <DetailsView appContext={dataContext} />
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
