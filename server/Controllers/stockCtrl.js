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

    nonOwnedSymbols: (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.nonOwnedSymbols()
            .then(stocks => {
                res.status(200).send(stocks).catch(err => {
                    res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                    console.log(err);
                })
            })
    },

    purchase: (req, res) => {
        const dbInstance = req.app.get('db');
        const { stock_name, symbol, shares, purchase_price } = req.body;
        dbInstance.purchase([req.session.user.id, stock_name, symbol, shares, purchase_price])
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
            .then(()=> {
                res.sendStatus(200)
            }).catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
            })
    },

    shares: (req, res) => {
        const dbInstance = req.app.get('db');
        const { shares } = req.body;
        dbInstance.partial([id, shares])
            .then(() => {
                res.sendStatus(200)
            }).catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
            })
    },

    remove: (req, res) => {
        const dbInstance = req.app.get('db');
        dbInstance.deleteWatching([req.session.user.id, req.body.id])
            .then(stocks => {
                res.status(200).send(stocks)
            }).catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
            })
    },

    sellAll: (req, res) => {
        const dbInstance = req.app.get('db');
        dbInstance.sellAll([req.body.symbol])
            .then(() => {
                res.sendStatus(200)
            }).catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
            })
    }
}