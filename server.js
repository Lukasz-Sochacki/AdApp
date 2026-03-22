require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const adsRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');

const app = express();

const dbUri =
  process.env.NODE_ENV === 'production'
    ? `mongodb+srv://kodilla:${process.env.DB_PASS}@cluster0.5twsm5j.mongodb.net/adsDB?appName=Cluster0`
    : 'mongodb://localhost:27017/adsDB';

mongoose.connect(dbUri);
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to the adsDB database!');
});
db.on('error', (err) => console.log('Error' + err));

//Middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Session configuration
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: dbUri,
    }),
    cookie: {
      secure: process.env.NODE_ENV == 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'lax',
    },
  }),
);

// Add routes
app.use('/api', adsRoutes);
app.use('/auth', authRoutes);
app.use('/api', usersRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/public')));

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port: ${PORT}`);
});
