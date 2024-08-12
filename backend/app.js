

const express = require('express')

const app = express();
const cors = require('cors');
app.use(express.json())
app.use(cors());
const adminRotuer = require('./routes/admin')
const userRotuer = require('./routes/user')

app.use('/api/admin',adminRotuer);
app.use('/api/user',userRotuer);


app.get('/test',(req,res)=>{
  res.send("hello buddy")
})

app.listen(3000,()=>{
  console.log("Server running on port 3000")
})