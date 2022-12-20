import * as server from "@minecraft/server"

const Entity = Object.assign(server.Entity, {});

type Entity = server.Entity;

Object.assign(server.Entity.prototype, {
    damageEntities(amount: number, ...entities: Entity[]) {
        // TODO
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
