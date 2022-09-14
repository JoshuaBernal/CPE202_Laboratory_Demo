const express = require('express');

const app = express();

const tempRoutes = require('./routes/api/temperature.js')
// init Middleware
app.get('/', (req, res) => res.send('API Running'));
app.use(express.json({ extended: false }));
app.use('/temperature',tempRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));