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
    hasFamily(family: string) {
        let that = this as unknown as Player;
        for(let entity of that.dimension.getEntities({families: [family], type: that.typeId})) if(entity == that) return true;
        return false;
    },
    hasFamilies(...families: string[]) {
        let that = this as unknown as Player;
        for(let entity of that.dimension.getEntities({families, type: that.typeId})) if(entity == that) return true;
        return false;
    },
    hasTags(...tags: string[]) {
        let that = this as unknown as Player;
        for(let entity of that.dimension.getEntities({tags, type: that.typeId})) if(entity == that) return true;
        return false;
    },
    toLocaleString(): string {
        return `entity.${(this as unknown as Player).typeId}.name`;
    }
});

export { Player };
