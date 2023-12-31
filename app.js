const express = require('express');
//use axios + install
const axios = require('axios');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//home route
app.get('/', (req, res) => {
  res.render('index');
});

//cat fact route
app.get('/cats/fact', async (req, res) => {
  try {
    //GET
    const response = await axios.get('https://catfact.ninja/fact');
    const catFact = response.data.fact;

  

    //render
    res.render('cat/fact', { catFact });
  } catch (error) {
    console.error('Error fetching cat fact:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

//server
app.listen(port, () => {
  console.log('server is up and running');
});

module.exports = app;