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
        type: Datatype.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric: {
            msg: "Password only allows numbers and letters"
          }
        }
      },

      img: {
        type: Datatypr.STRING,
        allowNull: false
      },

      license: {
        type: Datatype.STRING,
        allowNull: true
      },

      numberOfJump: {
        type: Datatype.INTEGER,
        validate: {
          isInt: {
            msg: "Number of Jumps must be an integer"
          }
        }
      },

      homeDropZone: {
        type: Datatype.STRING,
        allowNull: true
      },

      bio: {
        type: Datatype.STRING,
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
