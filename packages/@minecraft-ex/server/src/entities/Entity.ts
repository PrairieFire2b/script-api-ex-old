import * as server from "@minecraft/server"

const Entity = Object.assign(server.Entity, {});

type Entity = server.Entity;

Object.assign(server.Entity.prototype, {
    damageEntities(amount: number, ...entities: Entity[]) {
        // TODO
    },
    hasFamily(family: string) {
        let that = this as unknown as Entity;
        for(let entity of that.dimension.getEntities({families: [family], type: that.typeId})) if(entity == that) return true;
        return false;
    },
    hasFamilies(...families: string[]) {
        let that = this as unknown as Entity;
        for(let entity of that.dimension.getEntities({families, type: that.typeId})) if(entity == that) return true;
        return false;
    },
    hasTags(...tags: string[]) {
        let that = this as unknown as Entity;
        for(let entity of that.dimension.getEntities({tags, type: that.typeId})) if(entity == that) return true;
        return false;
    },
    toLocaleString(): string {
        return `entity.${(this as unknown as Entity).typeId}.name`;
    }
});

function hasInstance(o: object) {
    return Object[Symbol.hasInstance].bind(Entity) || o instanceof server.Player;
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
