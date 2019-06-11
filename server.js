const next = require("next");

const app = next({ dev: false });
const handle = app.getRequestHandler();

module.exports.handler = (req, res) => {
    return app
        .prepare()
        .then(() => handle(req, res))
        .catch((ex) => {
            console.error(ex.stack);
            process.exit(1);
        });
};
