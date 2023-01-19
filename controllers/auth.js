const User = require('../models/user'); //User model
// const Admin = require('../models/admin'); //Admin model
const { generateToken } = require('../middleware/generateAndVerifyToken'); //generateAndVerifyToken middleware
const { hashPassword, comparePassword } = require('../helper/bcrypt');


const renderUserRegister = async (req, res) => {
    res.render('register', {
        err: '',
    })
}

const registerUser = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.render('register', {
                err: 'invalid credentials',
            })

        }

        const isUser = await User.findOne({
            $or: [
                { username }, { email }
            ]
        })

        // console.log(isUser)

        if (isUser) {
            return res.render('register', {
                err: 'user already exists',

            })

        }

        let pwd = await hashPassword(password);

        console.log(pwd)

        const newUser = new User({
            username,
            email,
            password: pwd
        })

        await newUser.save();

        res.redirect('/auth/login')


    } catch (e) {
        res.json({ message: e.message });
    }
}

const renderUserLogin = async (req, res) => {

    res.render('login', {
        err: '',
        action: '/auth/login',
        flag: true,
        heading: 'User login'

    })
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.render('login', {
                err: "invalid credentials",
                action: '/auth/login',
                flag: true,
                heading: 'User login'
            })
        }

        const user = await User.findOne({
            $or: [
                { username }, { email: username }
            ]
        })


        if (!user) {
            return res.render('login', {
                err: 'user not found',
                action: '/auth/login',
                flag: true,
                heading: 'User login'
            })

        }

        console.log(password, user.password)

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.render('login', {
                err: 'invalid credentials',
                action: '/auth/login',
                flag: true,
                heading: 'User login'
            })
        } else {

            const payload = { id: user._id, username: user.username, email: user.email, isAdmin: false }


            const token = await generateToken(payload)
            res.cookie("userToken", token, { maxAge: 10000 });
            return res.redirect('/home')

        }




    } catch (err) {
        res.json({ message: e.message });
    }
}

module.exports = {
    renderUserRegister,
    registerUser,
    renderUserLogin,
    loginUser
}