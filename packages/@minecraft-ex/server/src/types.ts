export type { IRawMessage } from "@minecraft/server";
import { Dimension } from "@minecraft/server";

export interface ILoc {
    x: number;
    y: number;
    z: number;
    rx?: number;
    ry?: number;
    dimension?: Dimension;
}
