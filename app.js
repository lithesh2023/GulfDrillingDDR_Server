const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const path = require('path');


require('dotenv').config()
const app = express()
const connectDB = require('./database/mongo');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors());
// Connect to MongoDB
connectDB();

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