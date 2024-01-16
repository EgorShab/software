const cors = require('cors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();

app.use(logger('dev'));

// Enable cors
app.use(cors());
app.options('*', cors());

app.use(express.static(__dirname + '/dist'));

// To Angular Router
//app.get('/*', (req, res) => 
  //  res.sendFile(path.join(__dirname + '/dist/index.html')
//));
app.get('/*', function(req,res){
    res.sendFile(path.join(__dirname + '/dist/index.html'))
});


// To any other route
app.get('*', function(req, res) {
    res.redirect("/")
});

// Start the server
app.listen(process.env.PORT || 8080, () => console.log(`====> Anular app is running.`));