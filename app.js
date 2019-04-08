const express = require('express');
const bodyParser = require("body-parser");
const request = require('request');

const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

//middlewares
app.set('view engine', 'ejs');
app.use(express.static('statics'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    // API request options
    const options = {  
        url: 'https://api.hel.fi/kore/v1/school/?format=json',
        method: 'GET',
        headers:'Accept: application/json'

    };
    let json = "Please Try again later"; 
    // API request for the all schools
    request(options, function(err, res, body) {  
        json = JSON.parse(body);
    });
    // Rendering the views for the index page with all the schools with 1.5 seconds delay from the get request  
    setTimeout(function() {
        res.render('index', {data:json})
    },1500);
});


//server
app.listen(port, () => console.log(`Schools app listening on port ${port}!`))