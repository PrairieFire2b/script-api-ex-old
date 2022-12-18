import * as server from "@minecraft/server"

const Location: typeof server.Location & { from(vector: server.Vector3): server.Location } = Object.assign(server.Location, {
    from({x, y, z}: server.Vector3) {
        return new server.Location(x, y, z);
    }
});

export { Location };
