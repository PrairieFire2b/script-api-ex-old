const fs = require("fs");
fs.writeFile("../../scripts/@minecraft-ex/server.js", `export * from "./server/index"`, (err) => {
    console.error(err);
    console.error("Make sure `typescript` is installed, or use `npm install -g typescript`");
    console.error("Goto the README.md to find the probable reasons, or report issues on https://github.com/PrairieFire2b/script-api-ex");
});
