'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title:{
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    imageUrl:{
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {});
  Album.associate = function(models) {
    // associations can be defined here
    Album.hasMany(models.Song, {foreignKey: 'albumId'});
    Album.belongsTo(models.User, {foreignKey: 'userId'});
  };
  return Album;
};
