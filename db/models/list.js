'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    title:{
     type: DataTypes.STRING,
      allowNull: false
    },
    items: {
      type: DataTypes.ARRAY(DataTypes.JSON)
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  List.associate = function(models) {
    // associations can be defined here
    List.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    List.hasMany(models.Collaborator, {
      foreignKey: 'listId',
      as: 'collaborators'
    });
  };
  return List;
};