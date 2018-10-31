require('dotenv').config();
const express = require('express');
const massive = require('massive');
const bodyParser = require('body-parser');
const session = require('express-session');
const authCtrl = require('./Controllers/authCtrl');
const stockCtrl = require('./Controllers/stockCtrl');


const app = express();

app.use(bodyParser.json())

let {
    SERVER_PORT,
    CONNECTION_STRING,
    SECRET
} = process.env;

massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance)
})

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))

/////////stock endpoints//////////
app.get('/api/mystocks', stockCtrl.myStocks)
app.get('/api/nonowned', stockCtrl.nonowned)
app.get('/api/pending', stockCtrl.pending)

app.post('/api/newpurchase', stockCtrl.newPurchase)
app.post('/api/add', stockCtrl.addNonowned)
app.post('/api/orders', stockCtrl.addPending)

app.put('/api/shares/:id', stockCtrl.shares)

app.delete('/api/remove/:id', stockCtrl.remove)
app.delete('/api/sellall/:id', stockCtrl.sellAll)
app.delete('/api/cancel/:id', stockCtrl.cancelOrder)

//////////auth endpoints//////////
app.get('/auth/callback', authCtrl.authCallBack)
app.post('/api/auth/logout', authCtrl.logout)

//////////session endpoint///////
app.get('/api/user-data', (req,res)=>{
    if(req.session.user){
        res.status(200).send(req.session.user)
    }else{
        res.status(401).send("Please log in. Thank you!")
    }
})

//Stripe endpoint
app.post('/api/payment', function (req, res, next) {
    res.redirect('/#/list')
});


app.listen(SERVER_PORT, () => {
    console.log(`Server is listening on port ${SERVER_PORT}`)
})

// https://appdividend.com/2017/08/11/send-email-in-node-js/ 