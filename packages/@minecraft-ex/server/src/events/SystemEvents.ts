import * as server from "@minecraft/server"

class SystemEvents extends server.SystemEvents {
    // @ts-ignore
    constructor() {
        return server.system.events;
    }
}

export { SystemEvents };
