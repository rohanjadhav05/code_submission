//require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const problemsRoute = require('../routes/problem');
const app = express();
const port = 4000;
const cors = require('cors');

// Middleware
app.use(bodyParser.json());

app.use(cors());
app.use('/problems', problemsRoute);

// Basic Route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

