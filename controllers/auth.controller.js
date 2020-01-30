var bcrypt = require("bcryptjs");
var User = require("../models/user.model");
var jwt = require("jsonwebtoken");
var cache = require("memory-cache");
var uuid = require("uuid/v1");

async function getToken(req, res, next) {
    try {
        let token = await authenticateUser(req.fields.email, req.fields.password);
        let refreshToken = uuid();
        cache.put(refreshToken, req.fields.email);
        res.json({ token, refreshToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error
        });
    }
}

async function authenticateUser(email, password) {
    try {
        let user = await User.findOne(
            {
                where: {
                    email: email
                }
            });
        if (!user) {
            return Promise.reject("User not found");
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return Promise.reject("Email or password incorrect");
        }
        let userObject = { user: user.email };
        let token = generateToken(userObject);
        return token;
    } catch (error) {
        console.error(error);
        return Promise.reject("The server made a booboo");
    }
}

async function refreshToken(req, res, next) {
    if (!req.fields.refreshToken) {
        res.status(400).end();
        return;
    }
    let email = cache.get(req.fields.refreshToken);
    cache.del(req.fields.refreshToken)
    if (!email) {
        res.status(404).end();
        return;
    }
    let user = await User.findOne({
        where: {
            email
        }
    });
    if (!user) {
        res.status(404).end();
        return;
    }
    let userObject = { user: user.email };
    let refreshToken = uuid();
    cache.put(refreshToken, user.email);
    let token = generateToken(userObject);
    res.json({
        token,
        refreshToken
    });
}

function generateToken(userObject, exp = "300s"){
    let token = jwt.sign({
        data: userObject,
    },process.env.JWT_SECRET, { expiresIn: exp});
    return token;
}

module.exports = {
    getToken,
    refreshToken
}