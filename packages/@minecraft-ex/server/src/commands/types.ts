import type { Entity, EntityQueryOptions, IRawMessage, Player} from "@minecraft/server"

type command = string;

type CommandName = string;

type EntityEquipmentSlot = `slot.${`armor${"" | ".chest" | ".feet" | ".head" | ".legs"}` | "chest" | "enderchest" | "equippable" | "hotbar" | "inventory" | "saddle" | `weapon.${"mainhand" | "offhand"}`}`;

type json = IRawMessage;

type target = Entity | String & EntityQueryOptions | Player;

type TitleRawSet = "actionbar" | "subtitle" | "title";

export { command, EntityEquipmentSlot, json, target, TitleRawSet };
