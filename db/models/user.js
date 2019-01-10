'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { msg: 'Must be a valid email' }
      },
      allowNull: false
    }, 
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Collaborator, {
      foreignKey: 'userId',
      as: 'collaborators'
    });

    User.hasMany(models.List, {
      foreignKey: 'userId',
      as: 'lists'
    })
  };
  return User;
};