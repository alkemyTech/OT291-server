const express = require('express');
const router = express.Router();
const New = require('../controllers/news');
const verifyRole = require('../middlewares/verify-role');

router.delete('/:id', verifyRole.isAdminRole, New.deleteNew);

module.exports = router;
