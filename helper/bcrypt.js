const bcrypt = require('bcrypt'); //bcrypt module


const hashPassword = async (password) => {

    if (!password) {
        console.log('provide data to hash!');
    }

    try {

        return await bcrypt.hash(password, 10);


    } catch (e) {

        console.log(e.message);
    }
}

const comparePassword = async (password, hash) => {
    try {

        const isMatch = await bcrypt.compare(password, hash);

        console.log(isMatch)

        return isMatch;

    } catch (e) {
        console.log(e.message);
    }
}

module.exports = {
    hashPassword,
    comparePassword
};