const connection = require('../config/database');
const {StatusCodes} = require('http-status-codes')

const getSubjects = (req,res) => {
    connection.query('SELECT * FROM subjects', (err, results) => {
        if (err) {
            console.error('Error fetching data : ', err.message);
            return;
        }
        res.status(StatusCodes.OK).json(results);
    })
}


const getCards = (req,res) => {
    res.send("Deleting cards");
}

module.exports = {
    getSubjects,getCards
}