// load environment variables we use in react
require('dotenv').config({ path: '.env.local' });
let express = require('express')
let Sequelize = require('sequelize'),
    epilogue = require('epilogue'),
    http = require('http'),
    bodyParser = require('body-parser'),
    cors = require('cors');
// Set up up the HTTP server
const app = express();
const port = process.env.SERVER_PORT || 3001;

// Here is where you set up Sequelize. 
// This is a quick way of creating database models. 
// You can Sequelize with a wide variety of databases, but here 
// you can just use SQLite to get up and running quickly without any other dependencies.
const database = new Sequelize({
    dialect: 'sqlite',
    storage: './test.sqlite',
  });
  
const Post = database.define('posts', {
    title: Sequelize.STRING,
    body: Sequelize.TEXT,
});

// add some settings to allow for Cross-Origin Resource Sharing (CORS) 
app.use(cors());
// will automatically parse JSON.
app.use(bodyParser.json());

// Epilogue works well with Sequelize and Express. 
// It binds the two together like glue, creating a set of CRUD 
// endpoints with just a couple lines of code. First, you initialize Epilogue 
// with the Express app and the Sequelize database model. 
epilogue.initialize({ app, sequelize: database });
// Next, you tell it to create your endpoints for the Post model: 
// one for a list of posts, which will have POST and GET methods; 
// and one for individual posts, which will have GET, PUT, and DELETE methods.
epilogue.resource({
  model: Post,
  endpoints: ['/posts', '/posts/:id'],
});




database.sync().then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});