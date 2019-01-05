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
    // associations can be defined here
  };
  return User;
};