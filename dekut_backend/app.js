const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const authRoutes = require('./routes/authRoutes');

app.use(bodyParser.json());

app.use('/api', authRoutes);

module.exports = app;
