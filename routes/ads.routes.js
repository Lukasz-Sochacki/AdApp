const express = require('express');
const router = express.Router();

const AdController = require('../controllers/ads.controller');
const imageUpload = require('../utils/imageUpload');
const authMiddleware = require('../utils/authMiddleware');

//public routes
router.get('/ads', AdController.getAll);
router.get('/ads/:id', AdController.getById);
router.get('/ads/search/:searchPhrase', AdController.search);

//routes for only logged in users

router.post(
  '/ads',
  authMiddleware,
  imageUpload.single('image'),
  AdController.post,
);
router.delete('/ads/:id', authMiddleware, AdController.delete);
router.put('/ads/:id', authMiddleware, AdController.put);

module.exports = router;
