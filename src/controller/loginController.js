const loginService = require("../services/loginService");
const { HttpStatusCode } = require("../utils/httpStatusCode");
const { PrepareResponse } = require("../utils/prepareAPIResponse");


class LoginController {
    constructor() { }

    async login({
        userName,
        password
    }) {
        let preparedResponse = null;
        let response = null;
        const { cUserName: uName, cUserId: userId, clientId } =
            await loginService.login(userName, password);

        if (userName && userId && clientId) {
            response = { userName: uName, userId, clientId }
        }
        preparedResponse =
            PrepareResponse(
                "response",
                null,
                response
            );

        if (!response) {
            preparedResponse.success = false;
            preparedResponse.statusCode = HttpStatusCode.UNAUTHORIZED;
        }
        return preparedResponse;
    }
}

module.exports = new LoginController();