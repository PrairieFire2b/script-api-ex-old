import * as server from "@minecraft/server"

const ScoreboardObjective = Object.assign(server.ScoreboardObjective, {});

type ScoreboardObjective = server.ScoreboardObjective;

Object.assign(server.ScoreboardObjective.prototype, {
    setScore(participant: server.ScoreboardIdentity, score: number) {
        let entity = participant.getEntity();
        let tag = Math.random().toString();
        entity.addTag(tag);
        entity
            .runCommandAsync(`scoreboard players set @e[tag=${tag}] ${(this as unknown as ScoreboardObjective).id} ${score}`)
            .then(() => entity.removeTag(tag))
            .catch((error) => { throw error; });
    }
});

export { ScoreboardObjective };
