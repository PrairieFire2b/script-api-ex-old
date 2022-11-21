import { world } from "@minecraft/server";

export class Scoreboard {
    add(objectiveId: string, displayName: string) {
        return world.scoreboard.addObjective(objectiveId, displayName);
    }
    get(objectiveId: string) {
        return world.scoreboard.getObjective(objectiveId);
    }
    remove(objectiveId: string) {
        world.scoreboard.removeObjective(objectiveId);
    }
}
