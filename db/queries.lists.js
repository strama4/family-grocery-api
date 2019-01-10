const List = require('../db/models').List;
const User = require('../db/models').User;
const Collaborator = require('../db/models').Collaborator;


module.exports = {
    findLists(callback) {
        return List.findAll({
            include: [
                {model: User},
                {model: Collaborator, as: 'collaborators'}
            ]
        })
            .then(lists => {
                callback(null, lists);
            })
            .catch(err => {
                callback(err);
            });
    },

    getUserLists(user, callback) {
        List.findAll({ 
            where: {
                $or: {
                    '$collaborators.userId$': user,
                    userId: user
                }
            },
            include: [{
                model: Collaborator,
                as: 'collaborators'
            }]
        })
        .then(lists => {
                callback(null, lists)
            })
            .catch(err => {
                callback(err);
            })
    },

    addItem(listId, newItem, callback) {
        console.log('GET HEE')
        // error is occuring within List.update
        List.update({
            'items': sequelize.fn('array_append', sequelize.col('items'), newItem)},
            { 'where': {'id': listId}
        })
        .then(list => {
            callback(null, list);
        })
        .catch(err => {
            callback(err);
        })
    }
}