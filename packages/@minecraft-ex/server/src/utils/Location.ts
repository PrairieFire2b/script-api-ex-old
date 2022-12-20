import * as server from "@minecraft/server"

const Location = Object.assign(server.Location, {
    from({x, y, z}: server.Vector3) {
        return new server.Location(x, y, z);
    }
});

export { Location };
