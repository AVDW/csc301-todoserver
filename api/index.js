const express = require('express')
const app = express()
const port = 3033
const utils = require('./utils.js')
const dbController = require('./db/dbController.js')
const cors = require('cors')

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors());


let todos = [{
    id: 1,
    title: 'Learn Node.js',
    completed: false
  },
  {
    id: 2,
    title: 'Learn Solid',
    completed: false
  },
  {
    id: 3,
    title: 'Learn GraphQL',
    completed: false
  }
];



app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  console.log(req)
  console.log('query:',req.query)
  console.log('params:', req.params)
  res.send('Hello World!')
})

app.get('/todos', async (req, res) => {
    let data = await utils.getData();
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.send(data)
})


app.post('/todos', async(req, res) => {
    console.log('Got a POST request')
    let a = await dbController.create(req.body);
    res.send('Cool, it\'s saved 🤞')
})

app.put('/todos', async(req, res) => {
    await dbController.create(req.body);

    utils.updateData(req.body);
    res.send('Cool, it\'s updated 🤞')
})
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})