const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>WORKS!</h1>');
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
