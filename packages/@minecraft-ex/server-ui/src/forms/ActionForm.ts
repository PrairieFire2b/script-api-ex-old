import * as server from "@minecraft/server"
import * as serverUi from "@minecraft/server-ui"

class ActionFormData extends serverUi.ActionFormData {
    #callbacks: ((arg: ActionFormResponse) => void)[] = [];
    // @ts-ignore
    async show(player: server.Player): Promise<ActionFormResponse> {
        let show = serverUi.ActionFormData.prototype.show.bind(this);
        // @ts-ignore
        return show(player)
            // @ts-ignore
            .then(response => response.player = player, this.#callbacks.forEach(callback => callback(response)), response);
    }
    showAt(...players: server.Player[]): Promise<ActionFormResponse>[] {
        let show = serverUi.ActionFormData.prototype.show.bind(this);
        // @ts-ignore
        let promises = players.map(player => show(player));
        for(const i in promises)
            promises[i] = promises[i]
                // @ts-ignore
                .then(response => response.player = player, this.#callbacks.forEach(callback => callback(response), response));
        return promises;
    }
    subscribe(callback: (arg: serverUi.ActionFormResponse) => void): (arg: serverUi.ActionFormResponse) => void {
        return this.#callbacks[this.#callbacks.length] = callback;
    }
    unsubscribe(callback: (arg: serverUi.ActionFormResponse) => void) {
        delete this.#callbacks[this.#callbacks.indexOf(callback)];
    }
}

type ActionFormResponse = serverUi.ActionFormResponse;

const ActionFormResponse = Object.assign(serverUi.ActionFormResponse, {});

Object.assign(serverUi.ActionFormResponse.prototype, { player: undefined });

export { ActionFormData, ActionFormResponse };
