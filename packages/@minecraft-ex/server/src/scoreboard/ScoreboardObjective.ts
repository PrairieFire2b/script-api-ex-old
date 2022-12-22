import * as server from "@minecraft/server"

enum ScoreboardOperator {
    add = "+=",
    divide = "/=",
    equals = "=",
    greater = ">",
    less = "<",
    unequals = "><",
    mod = "%=",
    multiply = "*=",
    subtract = "-="
}

const ScoreboardObjective = Object.assign(server.ScoreboardObjective, {});

type ScoreboardObjective = server.ScoreboardObjective;

Object.assign(server.ScoreboardObjective.prototype, {
    addScore(participant: server.ScoreboardIdentity, count: number): boolean {
        let entity = participant.getEntity();
        let success = true;
        entity
            .runCommandAsync(`scoreboard players add @s ${(this as unknown as ScoreboardObjective).id} ${count}`)
            .then().catch(() => { success = false; });
        return success;
    },
    operateScore(
        participant: server.ScoreboardIdentity,
        operation: ScoreboardOperator,
        other: server.ScoreboardIdentity,
        otherObjective: server.ScoreboardObjective | string) {
        let entity = other.getEntity();
        let that = this as unknown as ScoreboardObjective;
        let tag = Math.random().toString();
        entity.addTag(tag);
        let success = true;
        otherObjective = otherObjective instanceof Object ? otherObjective.id : otherObjective == undefined ? that.id : otherObjective;
        participant.getEntity()
            .runCommandAsync(`scoreboard players operation @s ${that.id} ${operation} @e[tag=${tag}] ${otherObjective} `)
            .then().catch(() => success = false);
        return success;
    },
    resetScore(participant: server.ScoreboardIdentity): boolean {
        let entity = participant.getEntity();
        let success = true;
        entity
            .runCommandAsync(`scoreboard players reset @s ${(this as unknown as ScoreboardObjective).id}`)
            .then().catch(() => { success = false; });
        return success;
    },
    setScore(participant: server.ScoreboardIdentity, count: number): boolean {
        let entity = participant.getEntity();
        let success = true;
        entity
            .runCommandAsync(`scoreboard players set @s ${(this as unknown as ScoreboardObjective).id} ${count}`)
            .then().catch(() => { success = false; });
        return success;
    }
});

export { ScoreboardObjective, ScoreboardOperator };
