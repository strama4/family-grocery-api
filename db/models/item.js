'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    listId: {
      type: DataTypes.INTEGER,
      allowNull: false
    } 
  }, {});
  Item.associate = function(models) {
    Item.belongsTo(models.List, {
      foreignKey: 'listId',
      onDelete: 'CASCADE'
    })
  };
  return Item;
};