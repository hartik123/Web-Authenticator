const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const port = 8000;

app.use(cors({
  origin: "http://localhost:5173",   // your React port
  credentials: true
}));
app.use(express.json()); // Parse JSON request bodies

// test endpoint for checking server live
app.get('/', (req, res)=>{
    return res.send('Hello World!!!');
})

// Auth Endpoint
app.use('/auth', require('./routes/auth.routes'));

app.use('/user', require('./routes/user.routes'));


app.listen(process.env.PORT || port, ()=>{
    console.log(`Listening on port ${process.env.PORT || port}`);
})