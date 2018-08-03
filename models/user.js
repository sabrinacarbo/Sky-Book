module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please enter a user name"
        }
      },

      password: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric: {
            msg: "Password only allows numbers and letters"
          }
        }
      },

      img: {
        type: Datatypes.STRING,
        allowNull: false
      },

      license: {
        type: Datatypes.STRING,
        allowNull: true
      },

      numberOfJump: {
        type: Datatypes.INTEGER,
        validate: {
          isInt: {
            msg: "Number of Jumps must be an integer"
          }
        }
      },

      homeDropZone: {
        type: Datatypes.STRING,
        allowNull: true
      },

      bio: {
        type: Datatypes.STRING,
        allowNull: true
      }
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return User;
};
