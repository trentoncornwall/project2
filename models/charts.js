
module.exports = function(sequelize, DataTypes) {
	var Chart = sequelize.define("Chart", {
    UserId: DataTypes.INTEGER,
    amount: DataTypes.FLOAT(),
    UtilId: DataTypes.INTEGER,
    dueDate: {
			type: DataTypes.DATEONLY,
			allowNull: false
		}
    });
	return Chart;
};