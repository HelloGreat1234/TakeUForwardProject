const express = require('express');

const router = express.Router();

const { Addcards,Deletecards,Updatecards,getCards,getSubjects,AddSubject,DeleteSubject } = require('../controllers/admin')

router.route('/flashcards/:subject').get(getCards);

router.route('/subjects').get(getSubjects).post(AddSubject);
router.route('/flashcard').post(Addcards);
router.route('/flashcard/:id').delete(Deletecards).patch(Updatecards)
router.route('/subjects/:id').delete(DeleteSubject)
module.exports = router;