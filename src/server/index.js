const express = require('express');

const app = express();


app.use(express.static('dist'));

app.get('/woof', (req, res) => res.send({ magicword: 'woof' }));

app.listen(3232, () => console.log('Listening on port 3232!!'));
