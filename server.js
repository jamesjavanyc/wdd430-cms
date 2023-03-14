require("express-async-error")

const express = require('express');
const dotenv = require("dotenv")
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require("cors")

dotenv.config()

const index = require('./server/routes/app');
const authRoute = require('./server/routes/auth');
const postRoute = require('./server/routes/post');


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("Mongoose connect success.") })
    .catch(e => console.error("Mongoose fail to connect." ,e))

const app = express();

app.disable('etag');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'dist/cms')));

app.use('/', index);
app.use("/auth", authRoute)
app.use("/posts", postRoute)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/cms/index.html'));
});

app.use((err, req, res, next) => {
    logger.error(err.message, err);
    if (req.xhr) {
        return res.json({
            state: false,
            msg: err.message
        });
    }
    next(err);
});

const port = process.env.PORT || '5000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, function () { console.log("Express server running on localhost: " + port) });