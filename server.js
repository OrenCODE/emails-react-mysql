const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const emailsRouter = require('./routes/emails');

const server = express();

const notFoundPage = (path) => {
    return(req, res, next) => {
        res.sendFile(path);
    }
};

server.use(cors());
server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));

server.use('/', indexRouter);
server.use('/emails', emailsRouter);

server.use(notFoundPage(path.join(__dirname, 'public', '404.html')));

module.exports = server;
