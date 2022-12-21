import * as server from "@minecraft/server"
import * as serverUi from "@minecraft/server-ui"

const MessageFormData = Object.assign(serverUi.MessageFormData, {});

const show = serverUi.MessageFormData.prototype.show;

Object.assign(serverUi.ActionFormData.prototype, {
    callbacks: [] as ((arg: MessageFormResponse) => void)[],
    async show(player: server.Player) {
        // @ts-ignore
        return show.bind(this)(player).then((response) => {
            // @ts-ignore
            return response.player = player, this.callbacks.forEach(callback => callback(response)), response;
        });
    },
    subscribe(callback: (arg: MessageFormResponse) => void) {
        return this.callbacks[this.callbacks.length] = callback;
    },
    unsubscribe(callback: (arg: MessageFormResponse) => void) {
        delete this.callbacks[this.callbacks.indexOf(callback)];
    }
});

type MessageFormResponse = serverUi.MessageFormResponse;

const MessageFormResponse = Object.assign(serverUi.MessageFormResponse, {});

Object.assign(serverUi.MessageFormResponse.prototype, { player: undefined });

export { MessageFormData, MessageFormResponse };
