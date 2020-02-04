
const jwt = require("jsonwebtoken");
const message = require('../common/message');
const constants = require('../common/constants');
const config=require('../config/config')
module.exports = {
    isAuthenticated(req, res, next) {
        if (typeof req.headers.authorization !== constants.UNDEFINED) {
            let token = req.headers[constants.X_ACCESS_TOKEN] || req.headers[constants.AUTHORIZATION];
            if (token.startsWith(constants.BEARER)) {
                token = token.slice(7, token.length);
            }
            if (token) {
                jwt.verify(token,config.SECRET_KEY, (err, decoded) => {
                    if (err) {
                        return res.json({
                            success: false,
                            message: message.INVALID_TOKEN
                        });
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                });
            } else {
                return res.json({
                    success: false,
                    message: message.TOKEN_IS_NOT_IN_HEADER
                });
            }
        } else {
            return res.status(401).json({
                success:false,
                 message: message.NOT_AUTHORIZED 
                });
        }
    }
}