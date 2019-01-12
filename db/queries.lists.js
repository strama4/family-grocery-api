const sequelize = require('../db/models/index').sequelize;
const List = require('../db/models').List;
const User = require('../db/models').User;
const Collaborator = require('../db/models').Collaborator;
const Item = require('../db/models').Item;


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

    getList(listId, callback) {
        return List.findByPk(parseInt(listId), {include: [
            {model: Item, as: 'items'}
        ]})
        .then((list) => {
            callback(null, list)
        
        })
        .catch(err => {
            callback(err);
        })
    },

    addList(list, callback) {
        return List.create({
            title: list.title,
            userId: list.userId
        })
        .then(newList => {
            List.findAll({
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
        })
    }

}