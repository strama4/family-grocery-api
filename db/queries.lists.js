const List = require('../db/models').List;

module.exports = {
    findLists(callback) {
        List.findAll()
            .then(lists => {
                callback(null, lists);
            })
            .catch(err => {
                callback(err);
            });
    },

    getUserLists(user, callback) {
        List.findAll({ where: {userId: user}})
        .then(lists => {
                callback(null, lists)
            })
            .catch(err => {
                callback(err);
            })
    }
}