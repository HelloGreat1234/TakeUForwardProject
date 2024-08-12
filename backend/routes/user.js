const express = require('express');

const router = express.Router();

const { getSubjects,getCards} = require('../controllers/user')

router.route('/subjects').get(getSubjects);
router.route('/cards').get(getCards);

module.exports = router;