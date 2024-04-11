const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { stoneId } = req.body;
        if (!stoneId) {
            cb("stoneId is required param in request.");
        }
        const path = `/tmp/dv360/${stoneId}`
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }
        return cb(null, path);
    }
})

module.exports.upload = multer({ storage: storage });