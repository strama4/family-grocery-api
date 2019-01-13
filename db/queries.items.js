const sequelize = require('../db/models/index').sequelize;
const List = require('../db/models').List;
const User = require('../db/models').User;
const Collaborator = require('../db/models').Collaborator;
const Item = require('../db/models').Item;

module.exports = {
    addItem(newItem, callback) {
        Item.create(newItem)
        .then(addedCount => {
            if (addedCount) {
                List.findByPk(newItem.listId, { include: [
                    {model: Item, as: 'items'}
                ]
                })
                .then(list => {
                    callback(null, list);
                })
                .catch(err => {
                    callback(err);
                })
            }
        })
        .catch(err => {
            callback(err);
        })
    },

    deleteItem(item, callback) {
        Item.findByPk(parseInt(item.id))
        .then(item => item.destroy())
        .then(deletedCount => {
            if (deletedCount) {
                List.findByPk(item.listId, { include: [
                    {model: Item, as: 'items'}
                ]})
                .then(list => {
                    callback(null, list);
                })
                .catch(err => {
                    callback(err);
                })
            }
        })
        .catch(err => {
            callback(err);
        })
    },

    updateItem(item, callback) {
        Item.findByPk(parseInt(item.item.id))
        .then(itemInDB => itemInDB.update({
            complete: item.item.status,
            description: item.item.description || itemInDB.description
        }))
        .then(() => {
            List.findByPk(item.listId, { include: [
                {model: Item, as: 'items'}
            ]})
            .then(list => {
                callback(null, list);
            })
            .catch(err => {
                callback(err);
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
}