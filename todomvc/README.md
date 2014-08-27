# Astarisx TodoMVC Example

## Directory structure.
Views here are referred to as "components" as they are React components.

<pre>
./
  index.html
  js/
    app.js
    bundle.js
    components/
      Footer.react.js
      Header.react.js
      MainSection.react.js
      TodoApp.react.js
      TodoItem.react.js
      TodoTextInput.react.js
    models/
      TodoModel.js
    viewModels/
      TodoDomainViewModel.js
      TodoViewModel.js
</pre>

## Running

You must have [npm](https://www.npmjs.org/) installed on your computer.
From the root project directory run these commands from the command line:

    npm install

This will install all dependencies.

To build the project, first run this command:

    npm start

This will perform an initial build and start a watcher process that will update build.js with any changes you wish to make.  This watcher is based on [Browserify](http://browserify.org/) and [Watchify](https://github.com/substack/watchify), and it transforms React's JSX syntax into standard JavaScript with [Reactify](https://github.com/andreypopp/reactify).

To run the app, spin up an HTTP server and visit http://localhost.  Or simply open the index.html file in a browser.


## Credit

This TodoMVC application is based on the [work done by](https://github.com/facebook/flux/tree/master/examples/flux-todomvc) [Bill Fisher](https://www.facebook.com/bill.fisher.771). In which he created a [Flux TodoMVC Example](https://github.com/facebook/flux/tree/master/examples/flux-todomvc).


## License
Astarisx is MIT-licensed.
