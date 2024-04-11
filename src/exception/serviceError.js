/* Global Error Cactcher */
class ServiceError extends Error {
    constructor(error) {
        super(error.message);
        this.code = error.code ? error.code : "";
        this.name = error.name ? error.name : "";
        this.success = error.success ? error.success : false;
    }
}

module.exports = ServiceError;