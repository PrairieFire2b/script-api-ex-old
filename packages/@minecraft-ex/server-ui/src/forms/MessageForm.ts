import * as server from "@minecraft/server"
import * as serverUi from "@minecraft/server-ui"

const MessageFormData = Object.assign(serverUi.MessageFormData, {});

const button1 = serverUi.MessageFormData.prototype.button1;

const button2 = serverUi.MessageFormData.prototype.button2;

const show = serverUi.MessageFormData.prototype.show;

Object.assign(serverUi.ActionFormData.prototype, {
    callbacks: [] as ((arg: MessageFormResponse) => void)[][],
    selection: 0,
    button1(text: string) {
        return this.selection++, button1.bind(this)(text);
    },
    async show(player: server.Player) {
        // @ts-ignore
        return show.bind(this)(player).then((response) => {
            // @ts-ignore
            response.player = player;
            this.callbacks.forEach((callbacks, index) => {
                if(index == response.selection) callbacks.forEach(callback => callback(response));
            });
            return response;
        });
    },
    then(callback: (arg: MessageFormResponse) => void) {
        this.callbacks[this.selection] ?? (this.callbacks[this.selection] = []);
        this.callbacks[this.selection].push(callback);
        return this;
    }
});

type MessageFormResponse = serverUi.MessageFormResponse;

const MessageFormResponse = Object.assign(serverUi.MessageFormResponse, {});

Object.assign(serverUi.MessageFormResponse.prototype, { player: undefined });

export { MessageFormData, MessageFormResponse };
