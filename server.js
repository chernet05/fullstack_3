let express = require('express')
let morgan = require('morgan')
let app = express()
let cors = require('cors')
let phones = require('./build/models/phones')
let mongoose = require('mongoose')
app.use(cors())
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))
app.use(express.json())
app.use(morgan('tiny'))

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/build/index.html', (err) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Internal Server Error');
//         }
//     })
// })
app.get('/api/data/', async (req, res) => {
    const data = await phones.find({})
    res.json(data)
})
app.get('/info/', (req, res) => {
    let count = data.length
    res.send(`<h1>Phonebook has info for ${count} people</h1> <br/><h1> ${new Date()} </h1>`)
})

app.get('/api/persons/', (req, res) => {
    let count = data.length
    res.send(`<h1>Phonebook has info for ${count} people</h1> <br/><h1> ${new Date()} </h1>`)
    console.log('test1  ')

})

app.get('/api/persons/:id', (req, res) => {
    let id = Number(req.params.id)
    console.log(id, "id")
    let person = data.find(x => x.id === id)
    person ? res.send(person) : res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
    console.log("test")
    let id = Number(req.params.id)
    data = data.filter(x => x.id !== id)
    res.status(204).end()
})
app.post('/api/persons', (req, res) => {
    let posts = req.body
    console.log(req.body)
    if (posts.name && posts.number) {
        let duplicate = data.find(x => x['name'] === posts.name)
        if (duplicate) {
            res.json({ error: 'name must be unique' })
        } else {
            //data.push(posts)
            let rand = Math.floor(Math.random() * 1000)
            posts.id = rand
            console.log(posts)
            data.push(posts)
            res.json(posts)
            //let ans =  req.body;
        }
    } else {
        res.json({ error: 'you are missing name or number' })
    }
    //res.send(rand)
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
