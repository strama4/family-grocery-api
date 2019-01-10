const listQueries = require('../db/queries.lists');

module.exports = {
    index(req, res, next) {
        listQueries.findLists((err, lists) => {
            if (err) {
                res.send(err);
            } else {
                res.json(lists);
            }
        })
    },
    getUserLists(req, res, next) {
        listQueries.getUserLists(req.params.id, (err, lists) => {
            if (err) {
                res.send(err);
            } else {
                res.json(lists);
            }
        })
    },

}