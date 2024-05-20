const express = require('express');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const mongoStore = require('connect-mongo')
// require("./strategies/local")

require("./strategies/discord");
// Routes
require('./database/index')
const groceriesRoute = require('./routes/groceries');
const marketsRoute = require('./routes/markets')
const authRoute = require('./routes/auth');
const MongoStore = require('connect-mongo');

const app = express();
const port = 4000;

// const memoryStore = new session.MemoryStore();
// Middleware that help to what type of data we send
// next argument allow us to next middleware call
app.use(cookieParser())
app.use(session({
    secret: "APEOCIENJEBDJKNFELIHFPPSOENFIHKLPE",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl:"mongodb://localhost:27017/expressjs"
    })
}))
app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    console.log(`${req.method}: ${req.url}`)
    next();
})
// app.use((req, res, next) => {
//     console.log(memoryStore);
//     next();
// })

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/groceries", groceriesRoute)
app.use("/api/v1/markets", marketsRoute)


app.listen(port, () => {
    console.log(`Running express server in ${port}`);
})





