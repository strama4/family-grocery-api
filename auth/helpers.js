const bcrypt = require('bcryptjs');

module.exports = {
    hashPassword(password) {
        const salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(password, salt);
    },

    checkPassword(passwordEntered, passwordInDatabase) {
        return bcrypt.compareSync(passwordEntered,passwordInDatabase);
    }
}