const path = require('path');
const express = require('express');
const fetch = require('node-fetch');
const interval = require('interval-promise');
const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:duckingit@localhost:5432/duckdb');

const app = express();

const NUM_BTC = 5.0;    // Donald will give each child 5 Bitcoin


// create a new table in the db to store data
db.any("DROP TABLE IF EXISTS exchange_data;")
    .then(() => { db.any("CREATE TABLE exchange_data (exchange varchar(30), symbol varchar(10), rate real, timestamp timestamp DEFAULT NOW());"); })
    .catch((err) => {
        console.log(err);
    });


//cache to keep track of most recent rates for each currency for each exchange
//and the best exchange for each currency
//the client api calls will get results from this cache instead of having to query the db
let exchangeRateCache = { 
    exchanges: {
        kraken: {
            dash: null,
            eth: null,
            ltc: null
        },
        bittrex: {
            dash: null,
            eth: null,
            ltc: null
        },
        binance: {
            dash: null,
            eth: null,
            ltc: null
        },
        coincap: {
            dash: null,
            eth: null,
            ltc: null
        },
        poloniex: {
            dash: null,
            eth: null,
            ltc: null
        }
    },
    best: {
        dash: {
            exchangeName: null,
            rate: null
        },
        eth: {
            exchangeName: null,
            rate: null
        },
        ltc: {
            exchangeName: null,
            rate: null
        }
    },
    updateBestDash: function () {
        let array = Object.entries(this.exchanges);
        let min = array.reduce( function (minObj, testObj) {
                return (testObj[1].dash != null && testObj[1].dash < minObj[1].dash) ? testObj : minObj;
            }, ['inf', { dash: Infinity }]);
        this.best.dash.exchangeName = min[0];
        this.best.dash.rate = min[1].dash;
    },
    updateBestEth: function () {
        let array = Object.entries(this.exchanges);
        let min = array.reduce( function (minObj, testObj) {
                return (testObj[1].eth != null && testObj[1].eth < minObj[1].eth) ? testObj : minObj;
            }, ['inf', { eth: Infinity }]);
        this.best.eth.exchangeName = min[0];
        this.best.eth.rate = min[1].eth;
    },
    updateBestLtc: function () {
        let array = Object.entries(this.exchanges);
        let min = array.reduce( function (minObj, testObj) {
                return (testObj[1].ltc != null && testObj[1].ltc < minObj[1].ltc) ? testObj : minObj;
            }, ['inf', { ltc: Infinity }]);
        this.best.ltc.exchangeName = min[0];
        this.best.ltc.rate = min[1].ltc;
    }
};


async function fetchKrakenRates(db, cache) {
    try {
        const result = await fetch('https://api.kraken.com/0/public/Ticker?pair=ETHXBT,DASHXBT,LTCXBT');
        const myjson = await result.json();

        //convert to floats
        let dashRate = parseFloat(myjson.result.DASHXBT.a[0]);
        let ethRate = parseFloat(myjson.result.XETHXXBT.a[0]);
        let ltcRate = parseFloat(myjson.result.XLTCXXBT.a[0]);

        //cache
        cache.exchanges.kraken.dash = dashRate;
        cache.exchanges.kraken.eth = ethRate;
        cache.exchanges.kraken.ltc = ltcRate;

        //update best cache values
        cache.updateBestDash();
        cache.updateBestEth();
        cache.updateBestLtc();

        //store in db
        await db.tx(t => {
            return t.batch([
                t.none('INSERT INTO exchange_data (exchange, symbol, rate) VALUES($1, $2, $3)',
                    ['kraken', 'dash', dashRate]),
                t.none('INSERT INTO exchange_data (exchange, symbol, rate) VALUES($1, $2, $3)',
                    ['kraken', 'eth', ethRate]),
                t.none('INSERT INTO exchange_data (exchange, symbol, rate) VALUES($1, $2, $3)',
                    ['kraken', 'ltc', ltcRate])
            ]);
        });
    } catch (err) {
        console.log(err);
    }
    return Promise.resolve();
}


async function fetchBittrexRates(db, cache) {
    try {
        const result = await fetch('https://bittrex.com/api/v1.1/public/getticker?market=BTC-ETH');
        const myjson = await result.json();

        //convert to float
        let ethRate = parseFloat(myjson.result.Ask);

        //cache
        cache.exchanges.bittrex.eth = ethRate;
        cache.updateBestEth();

        //store in db
        await db.none('INSERT INTO exchange_data (exchange, symbol, rate) VALUES($1, $2, $3)',
                ['bittrex', 'eth', ethRate]);

    } catch (err) {
        console.log(err);
    }

    try {
        const result = await fetch('https://bittrex.com/api/v1.1/public/getticker?market=BTC-LTC');
        const myjson = await result.json();

        //convert to float
        let ltcRate = parseFloat(myjson.result.Ask);

        //cache
        cache.exchanges.bittrex.ltc = ltcRate;
        cache.updateBestLtc();

        //store in db
        await db.none('INSERT INTO exchange_data (exchange, symbol, rate) VALUES($1, $2, $3)',
                ['bittrex', 'ltc', ltcRate]);
    } catch (err) {
        console.log(err);
    }

    try {
        const result = await fetch('https://bittrex.com/api/v1.1/public/getticker?market=BTC-DASH');
        const myjson = await result.json();

        //convert to float
        let dashRate = parseFloat(myjson.result.Ask);

        //cache
        cache.exchanges.bittrex.dash = dashRate;
        cache.updateBestDash();

        //store in db
        await db.none('INSERT INTO exchange_data (exchange, symbol, rate) VALUES($1, $2, $3)',
                ['bittrex', 'dash', dashRate]);
    } catch (err) {
        console.log(err);
    }
    return Promise.resolve();
}


async function fetchBinanceRates(db, cache) {
    try {
        const result = await fetch('https://api.binance.com/api/v3/ticker/price');
        const myjson = await result.json();

        for (let i = 0; i < myjson.length; i++) {
            if (myjson[i].symbol === 'ETHBTC') {

                //convert to float
                let ethRate = parseFloat(myjson[i].price);

                //cache
                cache.exchanges.binance.eth = ethRate;
                cach.updateBestEth();

                //store in db
                await db.none('INSERT INTO exchange_data (exchange, symbol, rate) VALUES($1, $2, $3)',
                    ['binance', 'eth', ethRate]);
            }
            else if (myjson[i].symbol === 'DASHBTC') {

                //convert to float
                let dashRate = parseFloat(myjson[i].price);

                //cache
                cache.exchanges.binance.dash = dashRate;
                cache.updateBestDash();

                //store in db
                await db.none('INSERT INTO exchange_data (exchange, symbol, rate) VALUES($1, $2, $3)',
                    ['binance', 'dash', dashRate]);
            }
            else if (myjson[i].symbol === 'LTCBTC') {

                //convert to float
                let ltcRate = parseFloat(myjson[i].price);

                //cache
                cache.exchanges.binance.ltc = ltcRate;
                cache.updateBestLtc();

                //store in db
                await db.none('INSERT INTO exchange_data (exchange, symbol, rate) VALUES($1, $2, $3)',
                    ['binance', 'ltc', ltcRate]);
            }
        }
    } catch (err) {
        console.log(err);
    }
    return Promise.resolve();
}


async function fetchCoincapRates(db, cache) {
    try {
        const result = await fetch('https://coincap.io/page/ETH');
        const myjson = await result.json();

        //convert to float
        let ethRate = parseFloat(myjson.price_btc);

        //cache
        cache.exchanges.coincap.eth = ethRate;
        cache.updateBestEth();

        //store in db
        await db.none('INSERT INTO exchange_data (exchange, symbol, rate) VALUES($1, $2, $3)',
                ['coincap', 'eth', ethRate]);
    } catch (err) {
        console.log(err);
    }

    try {
        const result = await fetch('https://coincap.io/page/DASH');
        const myjson = await result.json();

        //convert to float
        let dashRate = parseFloat(myjson.price_btc);

        //cache
        cache.exchanges.coincap.dash = dashRate;
        cache.updateBestDash();

        //store in db
        await db.none('INSERT INTO exchange_data (exchange, symbol, rate) VALUES($1, $2, $3)',
                ['coincap', 'dash', dashRate]);
    } catch (err) {
        console.log(err);
    }

    try {
        const result = await fetch('https://coincap.io/page/LTC');
        const myjson = await result.json();

        //convert to float
        let ltcRate = parseFloat(myjson.price_btc);

        //cache
        cache.exchanges.coincap.ltc = ltcRate;
        cache.updateBestLtc();

        //store in db
        await db.none('INSERT INTO exchange_data (exchange, symbol, rate) VALUES($1, $2, $3)',
                ['coincap', 'ltc', ltcRate]);
    } catch (err) {
        console.log(err);
    }
    return Promise.resolve();
}


async function fetchPoloniexRates(db, cache) {
    try {
        const result = await fetch('https://poloniex.com/public?command=returnTicker');
        const myjson = await result.json();

        //convert to float
        let dashRate = parseFloat(myjson.BTC_DASH.lowestAsk);
        let ethRate = parseFloat(myjson.BTC_ETH.lowestAsk);
        let ltcRate = parseFloat(myjson.BTC_LTC.lowestAsk);

        //cache
        cache.exchanges.poloniex.dash = dashRate;
        cache.exchanges.poloniex.eth = ethRate;
        cache.exchanges.poloniex.ltc = ltcRate;
        
        cache.updateBestDash();
        cache.updateBestEth();
        cache.updateBestLtc();

        //store in db
        await db.tx(t => {
            return t.batch([
                t.none('INSERT INTO exchange_data (exchange, symbol, rate) VALUES($1, $2, $3)',
                    ['poloniex', 'dash', myjson.BTC_DASH.lowestAsk]),
                t.none('INSERT INTO exchange_data (exchange, symbol, rate) VALUES($1, $2, $3)',
                    ['poloniex', 'eth', myjson.BTC_ETH.lowestAsk]),
                t.none('INSERT INTO exchange_data (exchange, symbol, rate) VALUES($1, $2, $3)',
                    ['poloniex', 'ltc', myjson.BTC_LTC.lowestAsk])
            ]);
        });
    } catch (err) {
        console.log(err);
    }
    return Promise.resolve();
}


async function fetchExchangeRates(db, cache) {
    await fetchKrakenRates(db, cache);
    await fetchBittrexRates(db, cache);
    await fetchBinanceRates(db, cache);
    await fetchCoincapRates(db, cache);
    await fetchPoloniexRates(db, cache);
}


interval(async () => { await fetchExchangeRates(db, cache) }, 1500, { stopOnError: false });


function convertRateToCurrency(rate) {
    return NUM_BTC/rate;
}


function Rates(cache, symbol) {
    this.kraken = {
        rate: null,
        converted: null
    };
    this.kraken.rate = cache.exchanges.kraken[symbol];
    this.kraken.converted = convertRateToCurrency(cache.exchanges.kraken[symbol]);

    this.bittrex = {
        rate: null,
        converted: null
    };
    this.bittrex.rate = cache.exchanges.bittrex[symbol];
    this.bittrex.converted = convertRateToCurrency(cache.exchanges.bittrex[symbol]);

    this.binance = {
        rate: null,
        converted: null
    };
    this.binance.rate = cache.exchanges.binance[symbol];
    this.binance.converted = convertRateToCurrency(cache.exchanges.binance[symbol]);

    this.coincap = {
        rate: null,
        converted: null
    };
    this.coincap.rate = cache.exchanges.coincap[symbol];
    this.coincap.converted = convertRateToCurrency(cache.exchanges.coincap[symbol]);

    this.poloniex = {
        rate: null,
        converted: null
    };
    this.poloniex.rate = cache.exchanges.poloniex[symbol];
    this.poloniex.converted = convertRateToCurrency(cache.exchanges.poloniex[symbol]);

    this.best = cache.best[symbol].exchangeName;
}


//Express stuff for handling incoming connections
app.use(express.static('dist'));

app.get('/huey', (req, res) => {
    //return ethereum data from cache
    res.send(new Rates(exchangeRateCache, "eth"));
});

app.get('/luey', (req, res) => {
    //return litecoin data from cache
    res.send(new Rates(exchangeRateCache, "ltc"));
});

app.get('/duey', (req, res) => {
    //return dash data from cache
    res.send(new Rates(exchangeRateCache, "dash"));
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public/index.html'));
});

app.listen(3232, () => console.log('Donalds Present server listening on port 3232!!'));
