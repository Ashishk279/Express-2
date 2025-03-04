const bcrypt = require('bcryptjs');

function hashPassword (password){
    cont = salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);

}

function comparePassword(raw, hash){
    return bcrypt.compareSync(raw, hash)
}

module.exports = {
    hashPassword,
    comparePassword
}