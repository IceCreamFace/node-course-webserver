const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
// Set view engine
app.set('view engine', 'hbs');

//Middleware
//seth path for static pages
app.use((req, resp, next) => {
  var now = new Date().toString(); // Human readable timestamp
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log(err);
    }

  });


  next(); // Will not continue untill next() function is called;
});

// app.use((req, resp, next) => {
//   resp.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

/////////////////
// Partials
///////////////
hbs.registerPartials(__dirname + '/views/partials');
// {{> CUNT}}

//////////////////
// Helpers
/////////////////
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
// {{CUNT SizeOfCock}}

/////////////////////////
// Routing
/////////////////////////
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTile: 'Home Page',
    welcomeMessage: 'Hello Fucko'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTile: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send('Unable to finish request');
});

// Listen On Port 3000
app.listen(3000, () => {
  console.log('server is up on port 3000');
});

// Running node
// nodemon server.js -e hbs,js
