// This may be confusing but here Sequelize (capital) references the standard library
// var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../config/connection.js");


module.exports = function(sequelize, DataTypes) {
    var Travelinfo = sequelize.define("travelinfo", {
        email: {
          type: DataTypes.STRING,
          // allowNull: false,
        },
        destination: {
          type: DataTypes.TEXT,
        },
        attractions: {
          type: DataTypes.TEXT,
        },
        activities: {
          type: DataTypes.TEXT,
        },
        restaurants: {
          type: DataTypes.TEXT,
        },
        }, {
          timestamps: false
        });  
  
        return Travelinfo;
        Travelinfo.sync();
  };
  
