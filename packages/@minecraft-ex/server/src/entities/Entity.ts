import * as server from "@minecraft/server"

class Entity extends server.Entity {
    [Symbol.hasInstance](instance: any) {
        return instance instanceof server.Entity;
    }
    // @ts-ignore
    constructor(identifier: string, dimension: server.Dimension, location: server.Vector3) {
        // @ts-ignore
        return dimension.spawnEntity(identifier, new server.Location(location.x, location.y, location.z));
    }
}

Object.assign(server.Entity.prototype, {
    damageEntities(amount: number, ...entities: Entity[]) {
        // TODO
    },
    hasFamily(family: string) {
        let that = this as unknown as Entity;
        let tag = Math.random().toString()
        that.addTag(tag);
        let value = that.dimension.getEntities({families: [family], tags: [tag]})[Symbol.iterator]().next().value;
        that.removeTag(tag);
        return value == that;
    },
    hasFamilies(...families: string[]) {
        let that = this as unknown as Entity;
        let tag = Math.random().toString()
        that.addTag(tag);
        let value = that.dimension.getEntities({families, tags: [tag]})[Symbol.iterator]().next().value;
        that.removeTag(tag);
        return value == that;
    },
    hasTags(...tags: string[]) {
        let that = this as unknown as Entity;
        for(let entity of that.dimension.getEntities({tags, type: that.typeId})) if(entity == that) return true;
        return false;
    },
    toLocaleString(): string {
        return `entity.${(this as unknown as Entity).typeId}.name`;
    },
    get x() {
        return (this as unknown as Entity).location.x;
    },
    get y() {
        return (this as unknown as Entity).location.y;
    },
    get z() {
        return (this as unknown as Entity).location.z;
    }
});

function hasInstance(o: object) {
    return Object[Symbol.hasInstance].bind(server.Entity) || o instanceof server.Player;
}

Object.defineProperty(
    Object.defineProperty(hasInstance, "name", { value: "[Symbol.hasInstance]" }), "toString", {
        value: function toString() {
            return "function [Symbol.hasInstance]() {\n    [native code]\n}";
        }
    }
);

Object.defineProperty(Entity, Symbol.hasInstance, { value: hasInstance, writable: false});

export { Entity };
