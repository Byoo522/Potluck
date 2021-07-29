'use strict';
module.exports = (sequelize, DataTypes) => {
  const Foodlist = sequelize.define('Foodlist', {
    type: DataTypes.STRING,
    desciption: DataTypes.TEXT
  }, {});
  Foodlist.associate = function (models) {
    // associations can be defined here
    Foodlist.belongsTo(models.Event, { foreignKey: 'eventId' })
  };
  return Foodlist;
};
