const App = require("./app");
const AppConfigLoader = require("./appConfigLoader");

module.exports.App = App;
module.exports.AppConfig = new AppConfigLoader();