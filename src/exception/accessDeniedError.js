const { ApiResponseCode } = require("../utils/apiResponseCode");

class AccessDeniedError extends Error {
    constructor(message) {
        super(message);
        this.code = ApiResponseCode.UNAUTHORIZED;
        this.name = this.constructor.name;
    }
}

module.exports = AccessDeniedError;
