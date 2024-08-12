const mysql = require('mysql2')

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Savethewater@1234',
    database : 'flashcards_app'
})

connection.connect((err)=>{
    if(!err){
        console.log("connection estabilished")
    }
    else{
        console.log("error occured ",err)
    }
})

module.exports = connection;