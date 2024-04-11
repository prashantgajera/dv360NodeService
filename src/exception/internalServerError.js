const { ApiResponseCode } = require("../utils/apiResponseCode");

/* Unknown Error Raiser */
class InternalServerError extends Error {
    constructor(message, success = false, code = ApiResponseCode.INTERNAL_SERVER_ERROR) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
        this.success = success;
    }
}

module.exports = InternalServerError;
