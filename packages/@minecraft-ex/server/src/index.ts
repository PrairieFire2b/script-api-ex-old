export * from "./commands/index"
export * from "./events/index"
export * from "./world/index"
import * as server from "@minecraft/server";
import { World } from "./world/index";

const Location: typeof server.Location & { from(vector: server.Vector3): server.Location } = Object.assign(server.Location, {
    from({x, y, z}: server.Vector3) {
        return new server.Location(x, y, z);
    }
});

const world = new World();

export { Location, world };
