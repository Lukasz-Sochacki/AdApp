const User = require('../models/User.model');

exports.infoUser = async (req, res) => {
  try {
    const userSession = req.session.user;

    if (!userSession) {
      return res.status(401).json({ message: 'Not logged in' });
    }

    const user = await User.findById(userSession.id);

    res.json({
      id: user._id,
      login: user.login,
      avatar: user.avatar,
      phone: user.phone,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
