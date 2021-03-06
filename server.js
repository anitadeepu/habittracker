const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');
const cookieParser =require('cookie-parser');

dotenv.config();
const app = express();
app.disable('x-powered-by');
const port = 3001;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use(cookieParser());
app.use(passport.initialize());

const configureJwtStrategy = require("./passport-config");
configureJwtStrategy(passport);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Database connected! đ"))
  .catch((error) => {
    console.log("Database is not connected! âšī¸");
    console.log(error);
  });


  const userRoutes = require('./routes/userRoutes');
  const habitRoutes = require('./routes/habitRoutes');

  const path = require('path');

  app.use('/api/users', userRoutes);
  app.use('/api/habit', habitRoutes);
  
  


app.listen(port, () => {
  console.log(`The server đ is listening on port ${port}`);
});
