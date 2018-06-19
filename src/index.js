const express = require('express')
const app = express()

const PORT = 1337

app.get('/', (req, res) => {
    console.log(req.method)
    console.log(req.headers)
    console.log(req.url)
    res.send('Hello World!\n')
})

app.listen(PORT, () => console.log(`Server listening at port: ${PORT}/`))
