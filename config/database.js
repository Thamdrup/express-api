var { Sequelize } = require("sequelize");
var sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database/api.sqlite"
});

function dbAuth(){
    sequelize
    .authenticate()
    .then (function(){
        console.info("Database connected");
    })
    .catch(function(error){
        console.error("Cold not connect to database", error);
    });
}


module.exports = {
    sequelize,
    dbAuth
}
