module.exports = function(sequelize, DataTypes) {
  var Util = sequelize.define("Util", {
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    logo: DataTypes.STRING
  });
  return Util;
};
