var { getToken } = require("../controllers/auth.controller");

module.exports = function(router){
    router.post("/auth/get-token", getToken);
};