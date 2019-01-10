const sequelize = require('../db/models/index').sequelize;
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
        List.update({
            'items': sequelize.fn('array_append', sequelize.col('items'), JSON.stringify(newItem))},
            { 'where': {'id': listId}
        })
        .then(addedCount => {
            if (addedCount) {
                List.findByPk(listId)
                .then(list => {
                    callback(null, list);
                })
            } else {
                
            }
        })
        .catch(err => {
            callback(err);
        })
    }
}