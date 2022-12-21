import * as server from "@minecraft/server"
import * as serverUi from "@minecraft/server-ui"

const ModalFormData = Object.assign(serverUi.MessageFormData, {});

const show = serverUi.ModalFormData.prototype.show;

Object.assign(serverUi.MessageFormData.prototype, {
    callbacks: [] as ((arg: ModalFormResponse) => void)[],
    async show(player: server.Player) {
        // @ts-ignore
        return show.bind(this)(player).then((response) => {
            // @ts-ignore
            return response.player = player, this.callbacks.forEach(callback => callback(response)), response;
        });
    },
    subscribe(callback: (arg: ModalFormResponse) => void) {
        return this.callbacks[this.callbacks.length] = callback;
    },
    unsubscribe(callback: (arg: ModalFormResponse) => void) {
        delete this.callbacks[this.callbacks.indexOf(callback)];
    }
});

type ModalFormResponse = serverUi.ModalFormResponse;

const ModalFormResponse = Object.assign(serverUi.ActionFormResponse, {});

Object.assign(serverUi.MessageFormResponse.prototype, { player: undefined });

export { ModalFormData, ModalFormResponse };
