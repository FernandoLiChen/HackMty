const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const routes = require('./routes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//test
app.get('/test', (req, res) => {
    try {
        res.status(200).json({ message: 'API Test working' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.use('/api', routes);

//start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});