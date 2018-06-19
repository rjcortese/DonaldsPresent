const express = require('express');

const app = express();


app.use(express.static('dist'));

app.get('/', (req, res) => res.send({ username: 'woof' }));

app.listen(3232, () => console.log('Listening on port 3232!'));
