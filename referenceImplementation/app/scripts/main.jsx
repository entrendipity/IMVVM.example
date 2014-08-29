/**
 * @jsx React.DOM
 */
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

'use strict';
/* Kick of the App*/

//enableUndo is optional - default is false
//enableRouting is optional - default is false
//if enableRouting === true, enableUndo defaults to true and Undo is handled by pushState
// the viewId = "*" and should not be set
React.renderComponent(<DemoApp
	controllerViewModel={ControllerViewModel} enableRouting={true} />,
	document.getElementById('container'));
