import * as server from "@minecraft/server"

class World extends server.World {
    [Symbol.hasInstance](instance: any) {
        return instance instanceof server.World;
    }
    // @ts-ignore
    constructor() {
        // @ts-ignore
        return server.world;
    }
}

const getDimension = server.World.prototype.getDimension;
const say = server.World.prototype.say;

Object.assign(server.World.prototype, {
    getDimension(dimensionId: string | server.Dimension) {
        return typeof dimensionId == "string" ? getDimension.bind(this)(dimensionId) : dimensionId;
    },
    say(message: number | server.RawMessage | string) {
        if(typeof message == "number") message = message.toString();
        say.bind(this)(message);
    }
});

const world = server.world;

export { World, world };
