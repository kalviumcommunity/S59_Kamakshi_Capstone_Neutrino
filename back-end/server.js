const express = require('express');
const axios = require('axios'); 
const app = express();
const port = 8080;

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
    console.log("Server is running");
});
