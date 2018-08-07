module.exports = function(sequelize, DataTypes) {
  var Boogie = sequelize.define("Boogie", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    DZ: {
      type: DataTypes.STRING,
      allowNull: false
    },
    beginDate: {
      type: DataTypes.DATE,
      allowNull: false
    },

    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },

    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    }
  });

  // Boogie.associate = function(models) {
  //   Boogies.belongsTo(models.DZ, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return Boogie;
};
