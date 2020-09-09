const express = require('express');
const server = express();
server.use(express.json());

// KNEX CONFIG
const knex = require('knex');
const db = knex({
    client: "sqlite3",
    connection: {
        filename: './car-dealer.db3'
    },
    useNullAsDefault: true,
})


server.get('/', (req, res) => {
    res.status(200).json({ server: 'up' })
})

server.get('/cars', (req, res) => {
    db.select('*').from('cars')
        .then(result => res.status(200).json({ data: result }))
        .catch(err => res.status(500).json({ error: "error" }))
})

server.post('/cars', (req, res) => {
    db('cars').insert(req.body)
        .then(result => res.status(201).json({ data: result }))
})












server.listen(4000, () => {
    console.log(`\n== API running on port 4000 ==\n`)
})