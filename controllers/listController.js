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
    addToList(req, res, next) {
        listQueries.addItem(req.params.listId, req.body, (err, list) => {
            if (err) {
                res.send(err);
            } else {
                res.json(list);
            }
        })
    }

}