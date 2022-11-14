import * as server from "@minecraft/server";
import { BlockLocation, Dimension, Entity, XYRotation } from "@minecraft/server";
import { ILoc } from "./types";

function fromArray(array: any[]) {
    let dimension: Dimension | undefined;
    let any: number[] = [];
    let anyIndex = 0;
    array.forEach(value => {
        if(value instanceof Dimension || typeof value === "string") {
            if(dimension) throw new TypeError("Incorrect number of arguments to function. Expected 1 dimension, received 2");
            dimension = typeof value === "string" ? server.world.getDimension(value) : value;
        } else if(value instanceof XYRotation) {
            any[3] = value.x, any[4] = value.y;
        } else {
            if(any[3] !== undefined && anyIndex == 3)
                throw new TypeError("Incorrect arguments to function. Expected 2 numbers or XYRotation', received more");
            any[anyIndex] = value, anyIndex++;
        }
    });
    return new Location(any[0], any[1], any[2], any[3], any[4], dimension);
}

function fromObject(object: any): Location {
    let { x, y, z, rotation, rx, ry, dimension } = object;
    if(rotation !== undefined && (rx !== undefined || ry !== undefined))
        throw new TypeError("Incorrect arguments to function. Expected 'rx', 'ry' or 'rotation', received more");
    else if(rotation !== undefined) [rx, ry] = [rotation.x, rotation.y];
    let location = new Location(x, y, z, rx, ry, dimension);
    return location;
}

export class Location implements ILoc {
    dimension?: Dimension;
    rx?: number;
    ry?: number;
    x: number;
    y: number;
    z: number;
    [Symbol.toPrimitive](hint: "default" | "number" | "string") {
        if(hint === "string") return this.toString();
        return null;
    }
    above(): Location {
        return new Location(this.x, this.y+1, this.z, this.rx, this.ry, this.dimension);
    }
    constructor(x: number, y: number, z: number, rx?: number, ry?: number, dimension?: Dimension) {
        if(x === undefined || y === undefined || z === undefined)
            throw new TypeError("Native variant type conversation failed");
        if(rx === undefined && ry !== undefined || rx !== undefined && ry === undefined)
            throw new TypeError("Incorrect number of arguments to function. Expected 3, 5 or 6, received 4");
        [this.x, this.y, this.z, this.rx, this.ry, this.dimension] = [x, y, z, rx, ry, dimension];
    }
    equals(other: Entity | ILoc): boolean {
        if(other instanceof Entity) other = fromObject(other);
        return this.x === other.x
            && this.y === other.y
            && this.z === other.z
            && this.rx === other.rx
            && this.ry === other.ry
            && this.dimension?.id === other.dimension?.id;
    }
    isNear(other: Location, epsilon: number) {
        return this.toLocation().isNear(other.toLocation(), epsilon);
    }
    toBlock(dimension?: Dimension) {
        dimension = dimension || this.dimension;
        dimension ? void 0 : (() => {throw new ReferenceError("'dimension' is required")})();
        return dimension.getBlock(new BlockLocation(this.x, this.y, this.z));
    }
    toLocation(): server.Location {
        return new server.Location(this.x, this.y, this.z);
    }
    toString() {
        return `${this.dimension ? this.dimension.id + ":" : ""}${this.x}, ${this.y}, ${this.z}`;
    }
    static from(...any: any) {
        if(any.length > 1) return fromArray(any);
        else if(any[1] instanceof Array) return fromArray(any[1]);
        else if(any[1] instanceof Object) return fromObject(any[1]);
    }
}
