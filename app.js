const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000; // Use the provided PORT or default to 3000

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index', { title: 'Cat Fact App' });
});

app.get('/cats/fact', async (req, res) => {
  try {
    const response = await axios.get('https://catfact.ninja/fact');
    const catFact = response.data.fact;

    res.render('cat/fact', { catFact });
  } catch (error) {
    console.error('Error fetching cat fact:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = app;
