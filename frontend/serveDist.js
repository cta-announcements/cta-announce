const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('./dist/app'));

// redirect all requests to index.html
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'app', 'index.html'))
})

app.listen(8081);