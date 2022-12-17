import * as server from "@minecraft/server"

type TupleToUnion<T extends any[]> = T extends [infer F, ...infer rest] ? F | TupleToUnion<rest> : [never];

interface CommandType<T1 extends string, T2 extends 0 | 1 | 2 | 3 | 4, T3 extends any[][]> {
    readonly id: T1;
    readonly permissionLevel: T2;
    run(executor: target, ...data: TupleToUnion<T3>): Promise<server.CommandResult>;
}

type EntityEquipmentSlot = `slot.${`armor${"" | ".chest" | ".feet" | ".head" | ".legs"}` | "chest" | "enderchest" | "equippable" | "hotbar" | "inventory" | "saddle" | `weapon.${"mainhand" | "offhand"}`}`;

/**
 * @alias number
 * @description A final integer type
 */
type int = number;

type target = server.Entity | String | server.Player;

type TitleRawSet = "actionbar" | "subtitle" | "title";

export { CommandType, EntityEquipmentSlot, int, target, TitleRawSet };
