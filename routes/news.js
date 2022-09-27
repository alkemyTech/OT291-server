const express = require('express');
const router = express.Router();
const New = require('../controllers/news');

router.delete('/:id', New.deleteNew);

module.exports = router;
