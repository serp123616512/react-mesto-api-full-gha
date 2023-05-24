const express = require('express');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const helmet = require('helmet');

const router = require('./routes');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handlerError = require('./middlewares/error');

const { PORT = 3001, DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(limiter);
app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(handlerError);

app.listen(PORT);
