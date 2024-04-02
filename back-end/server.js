const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send("Hello, this is server side");
});

app.listen(port, () => {
    console.log("Server is running");
});
