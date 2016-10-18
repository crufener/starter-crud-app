/*
This is a simple sample app in vanilla
javascript and express
*/
let express = require('express');
//include the middleware/plugin that will parse the body of the request
const bodyParser = require('body-parser');
//Include Embedded JavaScript for our templating
let ejs = require('ejs');
//Include mongodb nodejs driver
const MongoClient = require('mongodb').MongoClient;
/*Create the express app by instantiating it*/
const app = express();
//NOTE: set the veiw engine
app.set('view engine', 'ejs');
//NOTE: Make sure to include it for use in the ap before the route makes use of it
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/assets', express.static(__dirname + '/public'));

//Create a simple short way to access the database
var db;

MongoClient.connect('mongodb://crufener:jenniferr1@ds057066.mlab.com:57066/myproducts', (error, database) => {
    //Check to make sure there are to errors with the database
    if (error != null) {
        throw error;
        return;
    }
    //set the database to the short cut
    db = database;
});


/*Create the express server*/
app.listen(3000, () => console.log(`My app server is running on port 3000`));
/*Create a simple route to access the express app*/
app.get('/', function(request, response) {
    //create a cursor to the data inside mongodb.
    //this is so you can grab data within a range for futre queries
    // var cursor = db.collection('quotes').find();

        console.log(`Request recieved at: '${request.url}'`);
        response.render('index.ejs', {
            data: {
                name: 'Craig',
                quote: 'quote'
            }
        });
});

//create a route to handle quote POST request
app.post('/quotes', (req, res) => {
    console.log(req.header);
    console.log(`successfully connected to database`);
    //Check for error while trying to save to the database
    db.collection('quotes').save(req.body, (error, results) => {
        //check for while trying to save to database
        if (error != null) {
            throw error;
            console.log(error);
        }
        //console log a successful database save
        console.log(`Data saved to database!!!`);
        //redirect the user to the home page at route '/'
        res.redirect('/');
    });
});
// {"name": req.body.name, "quote": req.body.quote}
//create a route for PUT request
app.put('/quotes', (req, res) => {
    console.log(req.body.name);
    db.collection('quotes').findOneAndUpdate(
        //find anything with the name
        {
            name: 'Craig Rufener'
        },
        //pass a js literal object to manage out to update document
        {
            $set: {
                name: req.body.name,
                quote: req.body.quote
            }
        },
        //force quote to be inserted if no match found
        {
            sort: {_id: -1},
            upsert: true
        },
        (error, result) => {
        if(error != null) {
            throw error;
        }
        res.send(result);
    });
});
//create delete route
//create a route for PUT request
app.delete('/quotes', (req, res) => {
    console.log(req.body.name);
    db.collection('quotes').findOneAndDelete(
        //find anything with the name
        {
            name: 'Craig Rufener'
        },
        (error, result) => {
        if(error != null) {
            throw error;
        }
        res.send(result);
    });
});
