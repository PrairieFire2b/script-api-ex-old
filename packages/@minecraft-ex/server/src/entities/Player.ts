import * as server from "@minecraft/server"

const Player = Object.assign(server.Player, {
    from(playerLike: server.Entity | string): server.Player | void {
        // @ts-ignore
        return Array.from(server.world.getPlayers({ name: playerLike.at ? playerLike : playerLike.nameTag }))[0];
    }
});

type Player = server.Player;

Object.assign(server.Player.prototype, {
    damageEntities(amount: number, ...entities: server.Entity[]) {
        // TODO
    },
    toLocaleString(): string {
        return `entity.${(this as unknown as Player).typeId}.name`;
    }
});

export { Player };
