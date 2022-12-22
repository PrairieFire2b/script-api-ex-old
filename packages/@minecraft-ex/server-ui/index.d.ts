// Type definitions for Minecraft Bedrock Edition script APIs
// Project: https://github.com/PrairieFire2b/script-api-ex
// Definitions by: PrairieFire2b <https://github.com/PrairieFire2b>

/* *****************************************************************************
   Copyright (c) 2022 PrairieFire2b.
   ***************************************************************************** */
import * as server from "@minecraft/server"
import * as serverUi from "@minecraft/server-ui"
export class ActionFormData extends serverUi.ActionFormData {
    /**
     * @remarks
     * Creates a callback when one of the buttons
     * was selected. Call with the last component.
     * @param callback
     * The callback.
     * @throws This function can throw errors.
     * @example 
     * ```ts
     * new ActionFormData()
     *     .button("Hello World!")
     *     .then(response => log(response.player.name, "clicked the button", response.selection));
     *     .title("Title")
     *     .show(player);
     * ```
     */
    then(callback: (arg: ActionFormResponse) => void): ActionFormData;
}
export class ActionFormResponse extends serverUi.ActionFormResponse {
    /**
     * Returns the player of the ui interacted with.
     */
    player: server.Player;
}
export class MessageFormData extends serverUi.MessageFormData {
    /**
     * @remarks
     * Creates a callback when one of the buttons
     * was selected. Call with the last component.
     * @param callback
     * The callback.
     * @throws This function can throw errors.
     * @example 
     * ```ts
     * new MessageFormData()
     *     .button1("Choose me 1!")
     *     .then(response => log(response.player.name, "clicked the button1"));
     *     .title("Title")
     *     .button2("Choose me 2!")
     *     .show(player);
     * ```
     */
    then(callback: (arg: MessageFormResponse) => void): MessageFormData;
}
export class MessageFormResponse extends serverUi.MessageFormResponse {
    /**
     * Returns the player of the ui interacted with.
     */
    player: server.Player;
}
export class ModalFormData extends serverUi.ModalFormData {
}
export class ModalFormResponse extends serverUi.ModalFormResponse {
    /**
     * Returns the player of the ui interacted with.
     */
    player: server.Player;
}
export * from "@minecraft/server-ui"
