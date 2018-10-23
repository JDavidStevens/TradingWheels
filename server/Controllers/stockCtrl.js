module.exports = {
    myStocks: (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.mystocks()
            .then(stocks => {
                res.status(200).send(stocks)
            }).catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
            })
    },

    nonowned: (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.nonowned()
            .then(stocks => {
                res.status(200).send(stocks)
            }).catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
            })
    },

    pending: (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.pending()
            .then(stocks => {
                res.status(200).send(stocks)
                // console.log("getPending",stocks)
            }).catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
            })
    },

    newPurchase: (req, res) => {
        const dbInstance = req.app.get('db');
        const { name, symbol, qty, basis } = req.body;
        dbInstance.purchase([name, symbol, qty, basis])
            .then(() => {
                res.sendStatus(200)
            }).catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
            })
    },

    addNonowned: (req, res) => {
        const dbInstance = req.app.get('db');
        const { addCompany, addSymbol } = req.body;
        dbInstance.addNonowned([addCompany, addSymbol])
            // console.log("add", req.body.addCompany)
            .then(() => {
                res.sendStatus(200)
            }).catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
            })
    },

    shares: (req, res) => {
        const dbInstance = req.app.get('db');
        const { qty, price } = req.body;
        dbInstance.partial([req.params.id, qty, price])
            // console.log("addShares",id,qty,price)
            .then(() => {
                res.sendStatus(200)
            }).catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
            })
    },

    remove: (req, res) => {
        const dbInstance = req.app.get('db');
        dbInstance.deleteWatching([req.params.id])
            .then((stocks) => {
                res.status(200).send(stocks)
            }).catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
            })
    },

    sellAll: (req, res) => {
        const dbInstance = req.app.get('db');
        dbInstance.sellAll([req.params.id])
            .then(() => {
                res.sendStatus(200)
            }).catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
            })
    },

    addPending: (req, res) => {
        const dbInstance = req.app.get('db');
        const { company, symbol, qty, triggerPrice, type, tradeType } = req.body;
        console.log("req.body", req.body)
        dbInstance.addPending([company, symbol, qty, triggerPrice, type, tradeType])
            .then(() => {
                res.sendStatus(200)
            }).catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
            })
    },

    cancelOrder: (req, res) => {
        const dbInstance = req.app.get('db');
        dbInstance.cancelOrder([req.params.id])
            .then(() => {
                res.sendStatus(200)
            }).catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
            })
    }
}