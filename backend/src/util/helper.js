const formidable = require("formidable");
exports.parseFormData = (req) => {
    return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject({ error: "Image could not be uploaded" });
            } else {
                resolve({ fields, files });
            }
        });
    });
}
