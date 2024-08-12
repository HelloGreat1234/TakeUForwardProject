const connection = require('../config/database');
const {StatusCodes} = require('http-status-codes')

const Addcards = (req, res) => {
    const { question, answer, subject_id } = req.body;
    if (!question || !answer || !subject_id) {
        return res.status(400).json({ error: 'Please provide question, answer, and subject_id' });
    }

    const insertQuery = 'INSERT INTO flashcards (question, answer, subject_id) VALUES (?, ?, ?)';

    connection.query(insertQuery, [question, answer, subject_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Use the inserted ID to get the newly added flashcard
        const newFlashcardId = results.insertId;
        const selectQuery = 'SELECT * FROM flashcards WHERE id = ?';

        connection.query(selectQuery, [newFlashcardId], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // Send the newly added flashcard as response
            res.status(201).json({ message: 'Flashcard created', flashcard: results[0] });
        });
    });
};


const Deletecards = (req, res) => {
    const { id } = req.params;
  
    const query = 'DELETE FROM flashcards WHERE id = ?';
  
    connection.query(query, [id], (err, results) => {
      if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Flashcard not found' });
      }
      res.status(StatusCodes.ACCEPTED).json({ message: 'Flashcard deleted successfully' });
    });
}

const Updatecards = (req, res) => {
    const { question, answer, subject_id } = req.body;
    const { id } = req.params;

    if (!question || !answer || !subject_id || !id) {
        return res.status(400).json({ error: 'Please provide question, answer, subject_id, and id' });
    }

    const updateQuery = 'UPDATE flashcards SET question = ?, answer = ?, subject_id = ? WHERE id = ?';

    connection.query(updateQuery, [question, answer, subject_id, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Check if any row was affected
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Flashcard not found' });
        }

        // Fetch the updated flashcard
        const selectQuery = 'SELECT * FROM flashcards WHERE id = ?';
        connection.query(selectQuery, [id], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // Assuming there is only one row returned
            const updatedFlashcard = rows[0];

            res.status(200).json({ message: 'Flashcard updated', flashcard: updatedFlashcard });
        });
    });
};


const getCards = (req, res) => {
    const subject = req.params.subject;
    console.log(subject)
    connection.query('SELECT * FROM flashcards where subject_id = ?', [subject], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err.message);
            return;
        }
        console.log('Flashcards:', results);
        res.status(StatusCodes.OK).json(results)
    });

}

const getSubjects = (req, res) => {
    // connection.query('')
    connection.query('SELECT * FROM subjects', (err, results) => {
        if (err) {
            console.error('Error fetching data : ', err.message);
            return;
        }
        res.status(StatusCodes.OK).json(results);
    })
}

const AddSubject = (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide subject name and description' });
    }

    const query = 'INSERT INTO subjects (name, description) VALUES (?, ?)';

    connection.query(query, [name, description], (err, results) => {
        if (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
        }

        const newSubjectId = results.insertId;
        const selectQuery = 'SELECT * FROM subjects WHERE id = ?';

        connection.query(selectQuery, [newSubjectId], (err, results) => {
            if (err) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
            }

            res.status(StatusCodes.CREATED).json({ message: 'Subject created', subject: results[0] });
        });
    });
};

const DeleteSubject = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM subjects WHERE id = ?';

    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Subject not found' });
        }
        res.status(202).json({ message: 'Subject deleted successfully' });
    });
};




module.exports = {
    Addcards, Deletecards, Updatecards, getCards, getSubjects, AddSubject,DeleteSubject
}