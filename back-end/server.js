require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'neutrinodb'
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
});

// Routes
app.use(userRoutes);

app.get('/apple', async (req, res) => {
    try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: 'apple',
                from: '2024-04-02',
                to: '2024-04-02',
                sortBy: 'popularity',
                apiKey: '6925320fc78d4aadbd325679ef64551f'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data from the News API');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
