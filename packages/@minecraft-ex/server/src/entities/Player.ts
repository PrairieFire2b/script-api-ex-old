import * as server from "@minecraft/server"

const Player = Object.assign(server.Player, {
    from(playerLike: server.Entity | string): server.Player | void {
        return server.world.getPlayers({
            // @ts-ignore
            name: playerLike.at ? playerLike : playerLike.nameTag
        })[Symbol.iterator]().next().value;
    }
});

type Player = server.Player;

const onScreenDisplay = server.Player.prototype.onScreenDisplay

Object.assign(server.Player.prototype, {
    damageEntities(amount: number, ...entities: server.Entity[]) {
        // TODO
    },
    hasFamily(family: string) {
        let that = this as unknown as Player;
        let tag = Math.random().toString()
        that.addTag(tag);
        let value = that.dimension.getEntities({families: [family], tags: [tag]})[Symbol.iterator]().next().value;
        that.removeTag(tag);
        return value == that;
    },
    hasFamilies(...families: string[]) {
        let that = this as unknown as Player;
        let tag = Math.random().toString()
        that.addTag(tag);
        let value = that.dimension.getEntities({families, tags: [tag]})[Symbol.iterator]().next().value;
        that.removeTag(tag);
        return value == that;
    },
    hasTags(...tags: string[]) {
        let that = this as unknown as Player;
        for(let entity of that.dimension.getEntities({tags, type: that.typeId})) if(entity == that) return true;
        return false;
    },
    toLocaleString(): string {
        return `entity.${(this as unknown as Player).typeId}.name`;
    },
    get x() {
        return (this as unknown as Player).location.x;
    },
    get y() {
        return (this as unknown as Player).location.y;
    },
    get z() {
        return (this as unknown as Player).location.z;
    }
});

export { Player };
