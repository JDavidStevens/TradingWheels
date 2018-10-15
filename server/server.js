require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-sessions');

const app = express();

let{
    SERVER_PORT,
    CONNECTION_STRING,
    SECRET
} = process.env;

app.listen(SERVER_PORT, ()=>{
    console.log(`Server is listening on port ${SERVER_PORT}`)
})
