const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const Session = require('../models/Session.model');
const getImageFileType = require('../utils/getImageFileType');

exports.register = async (req, res) => {
  try {
    const { login, password, phoneNumber } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
    if (
      login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string' &&
      req.file &&
      ['image/png', 'image/jpeg', 'image/gif', 'image/jpg'].includes(fileType)
    ) {
      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        return res
          .status(409)
          .json({ message: 'User with this login already exists' });
      }
      const user = await User.create({
        login,
        password: await bcrypt.hash(password, 10),
        phoneNumber,
        avatar: req.file.filename,
      });
      res.status(201).send({ message: 'User created: ' + user.login });
    } else {
      res.status(400).send({ message: 'Bad request...' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (
      login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string'
    ) {
      const user = await User.findOne({ login });
      if (!user) {
        res.status(400).send({ message: 'Login or password are incorrect' });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.user = {
            id: user._id,
            login: user.login,
            avatar: user.avatar,
          };
          res.status(200).send({ message: 'Login succesful!' });
        } else {
          res.status(400).send({ message: 'Login or password are incorrect' });
        }
      }
    } else {
      res.status(400).send({ message: 'Bad request...' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      await Session.deleteMany({});
    }

    req.session.destroy((err) => {
      if (err) return res.status(500).send({ message: err.message });

      res.clearCookie('connect.sid');
      res.status(200).send({ message: 'Logged out succesfully!' });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getUser = async (req, res) => {
  res.send("Yeah! I'm logged");
};
