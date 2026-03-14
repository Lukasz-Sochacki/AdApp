const express = require('express');
const router = express.Router();

const AdController = require('../controllers/ads.controller');
const imageUpload = require('../utils/imageUpload');

router.get('/ads', AdController.getAll);
router.get('/ads/:id', AdController.getById);
router.get('/ads/search/:searchPhrase', AdController.search);
router.post('/ads', imageUpload.single('image'), AdController.post);
router.delete('/ads/:id', AdController.delete);
router.put('/ads/:id', AdController.put);

module.exports = router;
