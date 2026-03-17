const Ad = require('../models/Ad.model');
const fs = require('fs');
const path = require('path');

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
    const { title, content, price, location } = req.body;

    const image = req.file ? req.file.filename : '';

    const author = req.session.user.id;

    const newAd = new Ad({ title, content, price, location, author, image });
    await newAd.save();
    res.json({ message: 'OK - post with image' });
  } catch (err) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedAd = await Ad.findById(req.params.id);
    if (!deletedAd) return res.status(404).json({ message: 'Not found...' });

    if (deletedAd.author.toString() !== req.session.user.id) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to delete this ad!' });
    }

    if (deletedAd) {
      const imagePath = `public/uploads/${deletedAd.image}`;
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }
    await Ad.deleteOne({ _id: req.params.id });
    res.json({ message: 'OK - delete' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.put = async (req, res) => {
  try {
    const { title, content, price, location } = req.body;
    const updatedAd = await Ad.findById(req.params.id);

    if (!updatedAd) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: 'Not found...' });
    }

    if (updatedAd.author.toString() !== req.session.user.id) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res
        .status(403)
        .json({ message: 'You are not authorized to edit this ad!' });
    }

    if (req.file) {
      const oldImage = updatedAd.image;
      updatedAd.image = req.file.filename;
      if (oldImage) {
        const oldImagePath = path.join(
          __dirname,
          '../public/uploads',
          oldImage,
        );
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
    }

    const fieldsToUpdate = ['title', 'content', 'price', 'location'];

    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        updatedAd[field] = req.body[field];
      }
    });

    await updatedAd.save();
    const finalAd = await Ad.findById(req.params.id).populate(
      'author',
      '-password',
    );
    res.json({ message: 'OK - updated!', ad: finalAd });
  } catch (err) {
    if (req.file) fs.unlinkSync(req.file.path);
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
