const jwt = require('jsonwebtoken');

const generateToken = async (payload) => {
    try {
        if (payload) {

            const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2m' })

            return token;
        }
        else {
            console.log('No Payload!')
        }


    } catch (e) {
        console.log(e.message);
    }

}

const verifyUserToken = async (req, res, next) => {

    const token = req.cookies.userToken;

    try {

        if (token) {

            const data = await jwt.verify(token, process.env.JWT_SECRET);
            req.data = data;
            next();

        } else {
            res.redirect('/auth/login')
        }
    } catch (e) {
        console.log('error while verifying token');
        res.redirect('/auth/login');
    }
}

// const verifyAdminToken = async (req, res, next) => {
//     const token = req.cookies.adminToken;

//     try {

//         if (token) {

//             const data = await jwt.verify(token, process.env.JWT_SECRET);

//             if (data.isAdmin) {

//                 req.data = data;
//                 next();

//             } else {
//                 console.log('Not Admin!');
//                 return res.end()
//             }


//         } else {
//             console.log('No Token!!')
//             res.redirect('/auth/admin/login')
//         }

//     } catch (e) {
//         console.log('error while verifying admin token');
//     }
// }

const verifyAdminToken = async (req, res, next) => {

    console.log(req.url)
    const token = req.cookies.adminToken;

    try {

        if (token) {

            const data = await jwt.verify(token, process.env.JWT_SECRET);


            if (data.isAdmin) {

                req.data = data;
                next();

            } else {
                console.log('Not Admin!');
                return res.end()
            }


        } else {
            console.log('No Token!!')
            res.redirect('/auth/admin/login')
        }

    } catch (e) {
        console.log('error while verifying admin token');
    }
}
module.exports = {
    generateToken,
    verifyUserToken,
    verifyAdminToken
}