const jwt = require("jsonwebtoken");
const { AppConfig } = require("../../application");
const { logger } = require("../../logging/logger");
const tokenExpiry = 1500; //25 min

class JWTAuth {
    constructor() {
        this.secret = AppConfig.getJwtSecret();
    }

    async verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secret, (err, decoded) => {
                if (err) {
                    reject(err)
                }
                resolve(decoded)
            })
        }).catch((error) => {
            logger.error(`Error while authenticating ${error}`);
        })
    }

    async signToken(payload) {
        return new Promise((resolve, reject) => {
            const token = jwt.sign(payload, this.secret, {
                expiresIn: tokenExpiry
            })
            if (!token) {
                reject(null);
            }
            resolve(token)
        }).catch((err) => {
            logger.error(`error while generating token ${err}`);
        })
    }

}


module.exports = new JWTAuth();