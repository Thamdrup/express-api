function isAuthorized (req, res, next) {
    if  (!req.headers.authorization) {
        res.status(401).end();
        return
    }
    if (req.headers.authorization != "Bearer 1235"){
        res.status(401).end();
        return
    }
    next();
}

module.exports = {
isAuthorized
};