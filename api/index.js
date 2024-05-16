const express = require('express');
const app = express();
const port = 3033;
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const utils = require('./utils.js')
const dbController = require('./db/dbController.js');
const {todoSchema} = require('./schemas');
const Types = require("./typedefs.js")

//SECTION - Middleware setup
// Middleware to parse JSON bodies
app.use(express.json()); 
// Enable CORS
app.use(cors());
// Set security headers
app.use(helmet());


//SECTION - Rate limiting middleware
// Limit requests from the same IP address
const limiter = rateLimit({
  max: 100, // maximum number of requests
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again later.'
});
// Apply rate limiting middleware to the '/todos' route
app.use('/todos', limiter); 
//=======================================================


/**
 * @api {get} / welcome message to be the front of this api
 */
app.get('/', (req, res) => {
  console.log(req)
  res.send('Hello, welcome to the todo API 🚀')
})

/**
 * @api {get} /todos Get all todo items
 */
app.get('/todos', async (req, res) => {
    let data = await utils.getData();
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.send(data)
})


/**
 * @api {post} /todos Create a new todo item
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing the task data.
 * @param {string} req.body.task - The task description.
 * @param {boolean} req.body.completed - Indicates if the task is completed.
 * @param {boolean} req.body.active - Indicates if the task is active.
 * @param {Date} req.body.modified_at - The date when the task was last modified.
 */
app.post('/todos', async (req, res) => {
  console.log('Got a POST request');
  try {
    const validatedData = await todoSchema.validateAsync(req.body);
    
    /** @type {Types.TaskData} */
    let data = {
      task: validatedData.task,
      completed: validatedData.completed,
      active: validatedData.active,
      modified_at: validatedData.modified_at
    };

    console.log(data);
    await dbController.create(data);
    res.send('Cool, it\'s saved 🤞');
  } catch (error) {
    console.error(error);
    res.status(400).send('Invalid request body');
  }
});

app.put('/todos', async(req, res) => {
    await dbController.create(req.body);

    utils.updateData(req.body);
    res.send('Cool, it\'s updated 🤞')
})
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})