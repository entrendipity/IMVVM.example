/**
 * @jsx React.DOM
 */
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

'use strict';

var ApplicationView = React.createClass({
  mixins: [IMVVM.mixin.main, IMVVM.mixin.pushState],

  render: function(){

    console.log('------------------------------------------ Current Application State ------------------------------------------')
    console.log(this.state.domainDataContext);

    var display;
    if(this.state.domainDataContext.pageNotFound){
      display = <PageNotFound />;
    } else {
      display = (<div>
        <NavBarView appContext={this.state.domainDataContext} />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <SideBarView appContext={this.state.domainDataContext} />
            </div>
            <div className="col-md-8">
              <DetailsView appContext={this.state.domainDataContext} />
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
