const userQueries = require('../db/queries.users');

module.exports = {
    createUser(req, res, next) {
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }

        userQueries.createUser(newUser, (err, user) => {
            if (err) {
                // send something
                console.log('Didn\'t worked')

                res.status(500).send('User creation did not work');
            } else {
                // send something
                console.log('worked')
                res.status(200).send('User creation worked');
            }
        })
    }
}