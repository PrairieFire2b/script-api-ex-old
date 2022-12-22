import * as server from "@minecraft/server"

const setActionBar = server.ScreenDisplay.prototype.setActionBar;

const ScreenDisplay = Object.assign(server.ScreenDisplay, {
    setActionBar(text: server.RawMessage | string): void {
        if(typeof text == "string") setActionBar.bind(this)(text);
        // TODO
    }
});

export { ScreenDisplay };
