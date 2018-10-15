module.exports = {
    allstocks: (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.allstocks([req.session.user.id])
            .then(stocks => {
                res.status(200).send(stocks)
            }).catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
            })
    },

    myStocks: (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.myStocks([req.session.user.id])
            .then(stocks => {
                res.status(200).send(stocks)
            }).catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
            })
    },

    nonowned: (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.nonowned([req.session.user.id])
            .then(stocks => {
                res.status(200).send(stocks)
            }).catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
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
        const { stock_name, symbol } = req.body;
        dbInstance.purchase([req.session.user.id, stock_name, symbol])
            .then(stocks => {
                res.status(200).send(stocks)
            }).catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
            })
    },

    shares: (req, res) => {
        const dbInstance = req.app.get('db');
        const { id, shares } = req.body;
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

    sell: (req, res) => {
        const dbInstance = req.app.get('db');
        dbInstance.sell([req.body.id])
            .then(() => {
                res.sendStatus(200)
            }).catch(err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong." });
                console.log(err);
            })
    }
}