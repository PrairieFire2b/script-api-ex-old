import type { Entity, EntityQueryOptions, IRawMessage, Player} from "@minecraft/server"

type EntityEquipmentSlot = `slot.${`armor${"" | ".chest" | ".feet" | ".head" | ".legs"}` | "chest" | "enderchest" | "equippable" | "hotbar" | "inventory" | "saddle" | `weapon.${"mainhand" | "offhand"}`}`;

/**
 * @description A final integer type
 */
type int = number;

type json = IRawMessage;

type target = Entity | String & EntityQueryOptions | Player;

type TitleRawSet = "actionbar" | "subtitle" | "title";

export { EntityEquipmentSlot, int, json, target, TitleRawSet };
