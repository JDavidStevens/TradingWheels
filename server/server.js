require('dotenv').config();
const express = require('express');
const massive = require('massive');
const bodyParser = require('body-parser');
const session = require('express-sessions');
const authCtrl = require('./Controllers/authCtrl');
const stockCtrl = require('./Controllers/stockCtrl');


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

//auth endpoints

//stock endpoints
app.get('/api/mystocks', stockCtrl.myStocks)
app.get('/api/nonowned', stockCtrl.nonowned)
app.get('/api/pending', stockCtrl.pending)

app.post('/api/newpurchase', stockCtrl.newPurchase)
app.post('/api/add', stockCtrl.addNonowned)
app.post('/api/orders',stockCtrl.addPending)

app.put('/api/shares/:id', stockCtrl.shares)

app.delete('/api/remove/:id', stockCtrl.remove)
app.delete('/api/sellall/:id', stockCtrl.sellAll)
app.delete('/api/cancel/:id',stockCtrl.cancelOrder)

//Stripe endpoint
app.post('/api/payment', function(req, res, next) {
    res.redirect('/#/list')
    // convert amount to pennies
    const amountArray = req.body.amount.toString().split('');
    const pennies = [];
    for (var i = 0; i < amountArray.length; i++) {
      if (amountArray[i] === '.') {
        if (typeof amountArray[i + 1] === 'string') {
          pennies.push(amountArray[i + 1]);
        } else {
          pennies.push('0');
        }
        if (typeof amountArray[i + 2] === 'string') {
          pennies.push(amountArray[i + 2]);
        } else {
          pennies.push('0');
        }
        break;
      } else {
        pennies.push(amountArray[i]);
      }
    }
    const convertedAmt = parseInt(pennies.join(''));
  
    const charge = stripe.charges.create(
      {
        amount: convertedAmt,
        // amount in cents, again
        currency: 'usd',
        source: req.body.token.id,
        description: 'Test charge from react app'
      },
      function(err, charge) {
        if (err) return res.sendStatus(500);
        return res.sendStatus(200);
        // if (err && err.type === 'StripeCardError') {
        // The card has been declined
        // }
      }
    );
    
  });


app.listen(SERVER_PORT, ()=>{
    console.log(`Server is listening on port ${SERVER_PORT}`)
})
