/*
This is a simple sample app in vanilla
javascript and express
*/
let express = require('express');
//include the middleware/plugin that will parse the body of the request
const bodyParser = require('body-parser');
//Include mongodb nodejs driver
const MongoClient = require('mongodb').MongoClient;
/*Create the express app by instantiating it*/
const app = express();

//Create a simple short way to access the database
var db;

MongoClient.connect('mongodb://crufener:jenniferr1@ds057066.mlab.com:57066/myproducts', (error, database) => {
    //Check to make sure there are to errors with the database
    if(error != null) {
        throw error;
        return;
    }
    //set the database to the short cut
    db = database;
    console.log(`successfully connected to database`);
})

//NOTE: Make sure to include it for use in the ap before the route makes use of it
app.use(bodyParser.urlencoded({extended: true}));
/*Create the express server*/
app.listen(3000,() => console.log(`My app server is running on port 3000`));
/*Create a simple route to access the express app*/
app.get('/', function(request, response) {
    console.log(`

        Request recieved at +++++++++${request.url}+++++++

        `);
        response.sendFile(__dirname + '/index.html');
});

//create a route to handle quote POST request
app.post('/quotes', (req, res) => {
    console.log(req.header);
});

//Check for error while trying to save to the database
db.collection('quotes').save(req.body, (error, results) => {
    //check for while trying to save to database
    if(error != null) {
        throw error;
        console.log(error);
    }
    //redirect the user to the home page at route '/'
    response.redirect('/');
})
