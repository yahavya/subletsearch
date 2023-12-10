import express from 'express';
import { getApartments } from './database.js';

const app = express();

app.get('/apartments', async (req, res) => {
    const apartments = await getApartments();
    res.json(apartments);
        
})

app.use((err, req, res, next) => {
    console.error(err);
});

app.listen(8080, () => {
    console.log("listening on port 8080");
});