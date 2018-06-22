const path = require('path');
const express = require('express');
const pgp = require('pg-promise')();

const app = express();

let pullExchangeData = function() {
    fetch('https://api.kraken.com')
}

setInterval(pullExchangeData,1000);

app.use(express.static('dist'));


app.get('/api/ethereum', (req, res) => {
    //querry db to find best exchange rate for ethereum
    res.send();
});
app.get('/api/litecoin', (req, res) => {
    //querry db to find best exchange rate for litecoin
    res.send();
});
app.get('/api/dash', (req, res) => {
    //querry db to find best exchange rate for dash 
    res.send();
});

app.get('/api/kraken', (req, res) => res.send({ exchange: 'kraken' }));
app.get('/api/bittrex', (req, res) => res.send({ exchange: 'bittrex' }));
app.get('/api/binance', (req, res) => res.send({ exchange: 'binance' }));
app.get('/api/poloniex', (req, res) => res.send({ exchange: 'poloniex' }));
app.get('/api/coincap', (req, res) => res.send({ exchange: 'coincap' }));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(3232, () => console.log('Listening on port 3232!!'));
