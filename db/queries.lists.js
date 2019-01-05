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
    }
}