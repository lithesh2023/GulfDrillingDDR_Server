const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const path = require('path');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
// const { logger } = require('./middleware/logEvents');
// if (process.env.NODE_ENV === 'local') {
// require('dotenv').config()
// }
const app = express()
const connectDB = require('./database/mongo');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

// Connect to MongoDB
connectDB();
// custom middleware logger
// app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());
app.use('/api/',routes)


// uncaught exception logger
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception", err);
  setTimeout(() => {
      process.exit();
  }, 500);
});

(async () => {
  if (process.env.NODE_ENV !== 'PROD') {
      await require('./swagger')(app, process.env.PORT, process.env.NODE_ENV)
  }
})()


module.exports = app