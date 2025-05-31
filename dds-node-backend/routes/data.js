const express = require('express');
const router = express.Router();
const { getData, getFilters } = require('../controllers/dataController');

router.get('/', getData);
router.get('/filters', getFilters);

module.exports = router;