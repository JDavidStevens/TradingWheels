require('dotenv').config();
const express = require('express');
const massive = require('massive');
const bodyParser = require('body-parser');
const session = require('express-sessions');
const stockCtrl = require('./Controllers/stockCtrl');
const authCtrl = require('./Controllers/authCtrl');

const app = express();

app.use(bodyParser.json())

let{
    SERVER_PORT,
    CONNECTION_STRING,
    SECRET
} = process.env;

massive(CONNECTION_STRING).then(dbInstance=>{
    app.set('db',dbInstance)
})

//stock endpoints
app.get('/api/mystocks', stockCtrl.myStocks)
app.get('/api/nonowned', stockCtrl.nonowned)
app.get('/api/nonowned/symbols', stockCtrl.nonOwnedSymbols)

app.post('/api/purchase', stockCtrl.purchase)
app.post('/api/add', stockCtrl.addNonowned)

app.put('/api/shares', stockCtrl.shares)

app.delete('/api/remove', stockCtrl.remove)
app.delete('/api/sell', stockCtrl.sell)

//auth endpoints

app.listen(SERVER_PORT, ()=>{
    console.log(`Server is listening on port ${SERVER_PORT}`)
})
