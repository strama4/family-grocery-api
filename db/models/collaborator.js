'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collaborator = sequelize.define('Collaborator', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
    listId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }  
  }, {});
  Collaborator.associate = function(models) {
    Collaborator.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    
    Collaborator.belongsTo(models.List, {
      foreignKey: 'listId',
      onDelete: 'CASCADE'
    });
  };
  return Collaborator;
};