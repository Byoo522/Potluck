'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    max_guests: DataTypes.INTEGER,
    location: DataTypes.STRING,
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    description: DataTypes.TEXT
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsTo(models.User, {foreignKey: 'userId'})
    Event.hasMany(models.Comment, {foreignKey: 'eventId'})
    Event.hasMany(models.Foodlist, {foreignKey: 'eventId'})
  };
  return Event;
};
