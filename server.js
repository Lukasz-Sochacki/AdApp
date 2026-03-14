const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const adsRoutes = require('./routes/ads.routes');

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', adsRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

//Connection with database
mongoose.connect('mongodb://localhost:27017/adsDB');
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to the adsDB database!');
});
db.on('error', (err) => console.log('Error' + err));

app.get('/api/ads', async (req, res) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.get('/', (req, res) => {
  res.send('<h1>WORKS!</h1>');
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
