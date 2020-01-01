const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const positionRoutes = require('./routes/position');
const categoryRoutes = require('./routes/category');
const mailRoutes = require('./routes/mail');

const app = express();

const keys = require('./config/keys');


mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
    .then(()=> console.log('MongoDB conected'))
    .catch(error => console.log(`При подключении к MongoDB возникла ошибка ${error}`));

// Парсим данные которые получаем
app.use(bodyParser.urlencoded({extended: true}));

// Генерация json с объектов, которые мы получаем
app.use(bodyParser.json());

// Обработка ответов для запросов с разных доменов
app.use(require('cors')());

// Удобное логирование
app.use(require('morgan')('dev'));

app.use('/uploads', express.static('uploads'));

app.use('/api/position', positionRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/mail', mailRoutes);

module.exports = app;
