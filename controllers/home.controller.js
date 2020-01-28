function getHome (req, res, next){
    res.json({
        message:" Hello, Nobert"
    });
}

module.exports = {
    getHome
};
