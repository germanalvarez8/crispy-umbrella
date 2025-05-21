const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/usersRoutes.js');
const productsRoutes = require('./routes/productsRoutes.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/usuarios', usersRoutes);
app.use('/productos', productsRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});