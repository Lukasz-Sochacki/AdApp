const Ad = require('../models/Ad.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Ad.find().populate('author', '-password'));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate('author', '-password');
    if (!ad) return res.status(404).json({ message: 'Not found...' });
    else res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.post = async (req, res) => {
  try {
    const { title, content, price, location, author } = req.body;

    const image = req.file ? req.file.filename : '';

    const newAd = new Ad({ title, content, price, location, author, image });
    await newAd.save();
    res.json({ message: 'OK - post with image' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    deletedAd = await Ad.findById(req.params.id);
    if (deletedAd) {
      await Ad.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK - delete' });
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.put = async (req, res) => {
  try {
    const { title, content, price, location } = req.body;
    const updatedAd = await Ad.findById(req.params.id);
    if (updatedAd) {
      ((updatedAd.title = title),
        (updatedAd.content = content),
        (updatedAd.price = price),
        (updatedAd.location = location),
        await updatedAd.save());
      res.json({ message: 'OK - put' });
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.search = async (req, res) => {
  try {
    const phrase = req.params.searchPhrase;
    const searchAd = await Ad.find({
      title: { $regex: phrase, $options: 'i' },
    });
    res.json(searchAd);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
