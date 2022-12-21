import * as server from "@minecraft/server"

class SystemEvents extends server.SystemEvents {
    [Symbol.hasInstance](instance: any) {
        return instance instanceof server.SystemEvents;
    }
    // @ts-ignore
    constructor() {
        // @ts-ignore
        return server.system.events;
    }
}

export { SystemEvents };
