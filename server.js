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
const messageRoutes = require('./server/routes/messages');
const contactRoutes = require('./server/routes/contacts.js');
const documentsRoutes = require('./server/routes/documents');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) {
        console.log('Could not connect to Database');
    } else {
        console.log('Connected to database...')
    }
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'dist/cms')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/cms/index.html'));
});
app.use('/', index);
app.use('/messages', messageRoutes);
app.use('/contacts', contactRoutes);
app.use('/documents', documentsRoutes);

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