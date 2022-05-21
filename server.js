// Setup empty JS object to act as endpoint for all routes
projectData = {};

/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('website'));

const port = 8000;
/* Spin up the server*/
const server = app.listen(port, listening);
function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};

//GET route that returns the projectData object
app.get('/allData', sendData)
function sendData(req, res) {
    res.send(projectData);
}

// POST route
app.post('/addData', addData);

function addData(req, res) {
    let data = req.body;
    console.log('server side data ', data)

    //date
    //temp -> temperature
    // feelings -> user's input

    projectData.date = data.date;
    projectData.temp = data.temp;
    projectData.content = data.content;

    res.send(projectData);
}
