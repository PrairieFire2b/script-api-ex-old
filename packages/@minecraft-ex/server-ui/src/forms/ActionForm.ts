import * as server from "@minecraft/server"
import * as serverUi from "@minecraft/server-ui"

const ActionFormData = Object.assign(serverUi.ActionFormData, {});

const button = serverUi.ActionFormData.prototype.button;

const show = serverUi.ActionFormData.prototype.show;

Object.assign(serverUi.ActionFormData.prototype, {
    callbacks: [] as ((arg: ActionFormResponse) => void)[][],
    selection: 0,
    button(text: string, iconPath?: string) {
        return this.selection++, button.bind(this)(text, iconPath);
    },
    async show(player: server.Player) {
        // @ts-ignore
        return show.bind(this)(player).then((response) => {
            // @ts-ignore
            response.player = player;
            this.callbacks.forEach((callbacks, index) => {
                if(response.selection == index) callbacks.forEach(callback => callback(response));
            });
            return response;
        });
    },
    then(callback: (arg: ActionFormResponse) => void) {
        this.callbacks[this.selection] ?? (this.callbacks[this.selection] = []);
        this.callbacks[this.selection].push(callback);
        return this;
    }
});

type ActionFormResponse = serverUi.ActionFormResponse;

const ActionFormResponse = Object.assign(serverUi.ActionFormResponse, {});

Object.assign(serverUi.ActionFormResponse.prototype, { player: undefined });

export { ActionFormData, ActionFormResponse };
