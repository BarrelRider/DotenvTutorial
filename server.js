const express = require("express");
const cors = require("cors");
const path = require("path");
const pagesRoute = require('./routes/pages.routes');

require('dotenv').config({
    path: path.join(__dirname, `.env/.env.${process.env.NODE_ENV}`)
});

const app = express();

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.disable('etag');


app.use('/', pagesRoute);

app.all((req, res) => {
    res.status(404).send("<h1>404 Not Found</h1>")
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening on', process.env.PORT || 3000)
});