const express = require('express');
const app = express();
const port = 3000;
const connectionString = require('./db/databaseConnect');
const router = require('./routes/router');

app.use('/', router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});