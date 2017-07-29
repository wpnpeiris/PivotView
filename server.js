var application_root = __dirname,
express = require( 'express' ), 
path = require( 'path' ); 

//Create server
var app = express();
   
app.configure( function() {

	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static( path.join( application_root, 'src')));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));});

	//Start server
	var port = 4001;
	app.listen( port, function() {
        console.log( 'Express server listening on port %d in %s mode',
        port, app.settings.env );
});