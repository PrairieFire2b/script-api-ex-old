import * as server from "@minecraft/server"

class Scoreboard extends server.Scoreboard {
    // @ts-ignore
    constructor() {
        return server.world.scoreboard;
    }
}

Object.assign(server.Scoreboard.prototype, {
    removeObjectives() {
        let objectives = (this as unknown as server.Scoreboard).getObjectives();
        objectives.forEach((value) => (this as unknown as Scoreboard).removeObjective(value));
    }
});

export { Scoreboard };
