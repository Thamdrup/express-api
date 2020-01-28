var { sequelize } = require("../config/database");
var { DataTypes, Model } = require("sequelize");
var sqlite = require("../config/sqlite");

class Product extends Model { }

Product.init({
    name: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notNull: true,
            isFloat: true
        }
    },
    desciption: {
        type: DataTypes.TEXT,
        validate: {
            notEmpty: true
        }
    }
}, { sequelize, modelName: "product" });

Product.sync(sqlite[process.env.NODE_ENV]);

module.exports = Product;