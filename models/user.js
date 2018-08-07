module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please enter your name"
        }
      }
    },

    userName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please enter a user name"
        }
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: {
          msg: "Password only allows numbers and letters"
        }
      }
    },

    img: {
      type: DataTypes.STRING,
      allowNull: true
    },

    license: {
      type: DataTypes.STRING,
      allowNull: true
    },

    numberOfJump: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: "Number of Jumps must be an integer"
        }
      }
    },

    homeDropZone: {
      type: DataTypes.STRING,
      allowNull: true
    },

    bio: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Post, {
      onDelete: "cascade"
    });

    User.belongsTo(models.DZ);
  };

  return User;
};
