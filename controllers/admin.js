const { generateToken } = require('../middleware/generateAndVerifyToken');
const Admin = require('../models/admin');

const renderAdminLogin = (req, res) => {


    res.render('login', {
        err: '',
        action: '/auth/admin/login',
        flag: false,
        heading: 'Admin login'
    })
}

const loginAdmin = async (req, res) => {
    console.log(req.url);
    const { username, password } = req.body

    try {

        if (!username || !password) {
            return res.render('login', {
                err: 'invalid credentials',
                action: '/auth/admin/login',
                flag: false,
                heading: 'Admin login'
            })
        }

        const isAdmin = await Admin.findOne({
            $or: [
                { username: username },
                { email: username }
            ]
        })

        if (!isAdmin) {
            return res.render('login', {
                err: 'admin not found',
                action: '/auth/admin/login',
                flag: false,
                heading: 'Admin login'
            })
        }

        console.log(isAdmin)

        let isMatch;

        (isAdmin.password == password) ? isMatch = true : isMatch = false;

        if (isMatch) {

            const payload = { id: isAdmin._id, username: isAdmin.username, email: isAdmin.email, isAdmin: true }

            const token = await generateToken(username);
            res.cookie('adminToken', token, { maxAge: 10000 });
            res.redirect('/auth/admin/dashboard')

        } else {

            return res.render('login', {
                err: 'invalid credentials',
                action: '/auth/admin/login',
                flag: false,
                heading: 'Admin login'
            })
        }

    } catch (err) {
        console.log(err.message)
    }
}

const renderAdminDashboard = (req, res) => {

}

module.exports = {

    renderAdminLogin,
    loginAdmin,
    renderAdminDashboard
}