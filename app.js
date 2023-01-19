const express = require('express');

const { verifyUserToken } = require('./middleware/generateAndVerifyToken')

const cookies = require("cookie-parser");

require('./config/db');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(cookies());


app.get('/', (req, res) => {
    res.redirect('/auth/register')
})

app.get('/home', verifyUserToken, (req, res) => {

    console.log(req.data);
    return res.render('home');
})

//Register and Login handler
app.use('/auth', require('./routes/auth'));

// User handler
app.use('/user', require('./routes/user'));

// admin handler
app.use('/auth/admin', require('./routes/admin'))



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})