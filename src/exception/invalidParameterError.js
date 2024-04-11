const { ApiResponseCode } = require("../utils/apiResponseCode");

class InvalidParameterError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code || ApiResponseCode.INVALID_PARAMETER_ERROR;
        this.name = this.constructor.name;
    }
}

module.exports = InvalidParameterError;
