const path = require('path');
const express = require('express');
const fetch = require('node-fetch');
const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:duckingit@localhost:5432/duckdb');

db.any("CREATE TABLE IF NOT EXISTS exchange_data (exchange varchar(30), symbol varchar(10), rate real, timestamp timestamp);")
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();

//cache to keep track of most recent rates for each currency for each exchange
//the client api calls will get results from this instead of the db
let exchangeRateCache = { 
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
};

function fetchKrakenRates(db, cache) {
    fetch('https://api.kraken.com/0/public/Ticker?pair=ETHXBT,DASHXBT,LTCXBT')
        .then((res) => {
            return res.json();
        })
        .then((myjson) => {
            //cache
            cache.kraken.dash = myjson.result.DASHXBT.a[0];
            cache.kraken.eth = myjson.result.XETHXXBT.a[0];
            cache.kraken.ltc = myjson.result.XLTCXXBT.a[0];
            //store in db
        })
        .catch(err => console.log(err));
}

function fetchBittrexRates(db, cache) {
    fetch('https://bittrex.com/api/v1.1/public/getticker?market=BTC-ETH')
        .then((res) => {
            return res.json();
        })
        .then((myjson) => {
            //cache
            cache.bittrex.eth = myjson.result.Ask;
            //store in db
        })
        .catch(err => console.log(err));

    fetch('https://bittrex.com/api/v1.1/public/getticker?market=BTC-LTC')
        .then((res) => {
            return res.json();
        })
        .then((myjson) => {
            //cache
            cache.bittrex.ltc = myjson.result.Ask;
            //store in db
        })
        .catch(err => console.log(err));

    fetch('https://bittrex.com/api/v1.1/public/getticker?market=BTC-DASH')
        .then((res) => {
            return res.json();
        })
        .then((myjson) => {
            //cache
            cache.bittrex.dash = myjson.result.Ask;
            //store in db
        })
        .catch(err => console.log(err));
}

function fetchBinanceRates(db, cache) {
    fetch('https://api.binance.com/api/v3/ticker/price')
        .then((res) => {
            return res.json();
        })
        .then((myjson) => {
            for (let i = 0; i < myjson.length; i++) {
                if (myjson[i].symbol === 'ETHBTC') {
                    //cache
                    cache.binance.eth = myjson[i].price;
                    //store in db
                }
                else if (myjson[i].symbol === 'DASHBTC') {
                    //cache
                    cache.binance.dash = myjson[i].price;
                    //store in db
                }
                else if (myjson[i].symbol === 'LTCBTC') {
                    //cache
                    cache.binance.ltc = myjson[i].price;
                    //store in db
                }
            }
        })
        .catch(err => console.log(err));
}

function fetchCoincapRates(db, cache) {
    fetch('https://coincap.io/page/ETH')
        .then((res) => {
            return res.json();
        })
        .then((myjson) => {
            //cache
            cache.coincap.eth = myjson.price_btc;
            //store in db
        })
        .catch(err => console.log(err));

    fetch('https://coincap.io/page/DASH')
        .then((res) => {
            return res.json();
        })
        .then((myjson) => {
            //cache
            cache.coincap.dash = myjson.price_btc;
            //store in db
        })
        .catch(err => console.log(err));

    fetch('https://coincap.io/page/LTC')
        .then((res) => {
            return res.json();
        })
        .then((myjson) => {
            //cache
            cache.coincap.ltc = myjson.price_btc;
            //store in db
        })
        .catch(err => console.log(err));
}

function fetchPoloniexRates(db, cache) {
    fetch('https://poloniex.com/public?command=returnTicker')
        .then((res) => {
            return res.json();
        })
        .then((myjson) => {
            //cache
            cache.poloniex.dash = myjson.BTC_DASH.lowestAsk;
            cache.poloniex.eth = myjson.BTC_ETH.lowestAsk;
            cache.poloniex.ltc = myjson.BTC_LTC.lowestAsk;
            //store in db
        })
        .catch(err => console.log(err));
}

function fetchExchangeRates(db, cache) {
    fetchKrakenRates(db, cache);
    fetchBittrexRates(db, cache);
    fetchBinanceRates(db, cache);
    fetchCoincapRates(db, cache);
    fetchPoloniexRates(db, cache);
}

setInterval(function() { fetchExchangeRates(db, exchangeRateCache); }, 1500);

app.use(express.static('dist'));

function getMinRate(cache, sym) {
    let min = cache.kraken[sym];
    if ( min > cache.bittrex[sym] ) {
        min = cache.bittrex[sym];
    }
    if ( min > cache.binance[sym] ) {
        min = cache.binance[sym];
    }
    if ( min > cache.coincap[sym] ) {
        min = cache.coincap[sym];
    }
    if ( min > cache.poloniex[sym] ) {
        min = cache.poloniex[sym];
    }
    return min;
}

app.get('/huey', (req, res) => {
    //return best exchange rate for ethereum from cache
    //let best_rate = getMinRate(exchangeRateCache,"eth");
    res.send(exchangeRateCache);
});
app.get('/luey', (req, res) => {
    //return best exchange rate for litecoin from cache
    res.send(exchangeRateCache);
});
app.get('/duey', (req, res) => {
    //return best exchange rate for dash from cache
    res.send(exchangeRateCache);
});


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(3232, () => console.log('Donalds Present server listening on port 3232!!'));
