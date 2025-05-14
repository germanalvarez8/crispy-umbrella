const express = require('express');
const usersRoutes = require('./routes/usersRoutes.js');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/usuarios', usersRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});