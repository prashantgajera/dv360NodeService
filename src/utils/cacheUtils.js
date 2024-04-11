const NodeCache = require("node-cache");

class CacheUtils {
    constructor() {
        this.registeredCaches = {};
    }

    registerCache(name, stdTtlSeconds) {
        let cache = this.registeredCaches[name];
        if (!cache) {
            cache = new NodeCache({
                stdTTL: stdTtlSeconds,
                checkperiod: stdTtlSeconds * 2,
                maxKeys: -1
            });
            this.registeredCaches[name] = cache;
        }
        return cache;
    }
}

module.exports = new CacheUtils();
