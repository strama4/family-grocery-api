const userQueries = require('../db/queries.users');


module.exports = {
    createUser(req, res, next) {
        const newUser = {
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        }

        userQueries.createUser(newUser, (err, user) => {
            if (err) {
                console.log(err)
                res.status(500).send(err.errors);
            } else {
                console.log('worked')
                res.status(200).send('User creation worked');
            }
        })
    }
}