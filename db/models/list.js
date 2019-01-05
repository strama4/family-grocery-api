'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    title:{
     type: DataTypes.STRING,
      allowNull: false
    },
    items: {
      type: DataTypes.ARRAY(DataTypes.JSON)
    }
  }, {});
  List.associate = function(models) {
    // associations can be defined here
  };
  return List;
};