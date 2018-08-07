module.exports = function(sequelize, DataTypes) {
  var DZ = sequelize.define("DZ", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    addressTwo: {
      type: DataTypes.STRING,
      allowNull: true
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false
    },

    state: {
      type: DataTypes.STRING,
      allowNull: false
    },

    zip: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    telephone: {
      type: DataTypes.STRING,
      allowNull: false
    },

    website: {
      type: DataTypes.STRING,
      allowNull: false
    },

    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    }
  });

  // DZ.associate = function(models) {
  //   DZ.hasMany(models.Boogie, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return DZ;
};
