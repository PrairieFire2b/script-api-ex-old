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
     * Creates and shows this modal popup form. Returns
     * asynchronously when the player confirms or cancels the
     * dialog.
     * @param players 
     * Players to show this dialog to.
     * @throws This function can throw errors.
     */
    showAt(...players: server.Player[]): Promise<ActionFormResponse>[];
    /**
     * @remarks
     * Adds a callback that will be called when the dialog
     * was showed to a player.
     * @param callback
     */
    subscribe(callback: (arg: ActionFormResponse) => void): (arg: ActionFormResponse) => void;
    /**
     * @remarks
     * Removes a callback from being called when the dialog
     * was showed to a player.
     * @param callback
     * @throws This function can throw errors.
     */
    unsubscribe(callback: (arg: ActionFormResponse) => void): void;
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
     * Creates and shows this modal popup form. Returns
     * asynchronously when the player confirms or cancels the
     * dialog.
     * @param players 
     * Players to show this dialog to.
     * @throws This function can throw errors.
     */
    // showAt(...players: server.Player[]): Promise<MessageFormResponse>[];
    /**
     * @remarks
     * Adds a callback that will be called when the dialog
     * was showed to a player.
     * @param callback
     */
    subscribe(callback: (arg: MessageFormResponse) => void): (arg: MessageFormResponse) => void;
    /**
     * @remarks
     * Removes a callback from being called when the dialog
     * was showed to a player.
     * @param callback
     * @throws This function can throw errors.
     */
    unsubscribe(callback: (arg: MessageFormResponse) => void): void;
}
export class MessageFormResponse extends serverUi.MessageFormResponse {
    /**
     * Returns the player of the ui interacted with.
     */
    player: server.Player;
}
export class ModalFormData extends serverUi.ModalFormData {
    /**
     * @remarks
     * Creates and shows this modal popup form. Returns
     * asynchronously when the player confirms or cancels the
     * dialog.
     * @param players 
     * Players to show this dialog to.
     * @throws This function can throw errors.
     */
    // showAt(...players: server.Player[]): Promise<ModalFormResponse>[];
    /**
     * @remarks
     * Adds a callback that will be called when the dialog
     * was showed to a player.
     * @param callback
     */
    subscribe(callback: (arg: ModalFormResponse) => void): (arg: ModalFormResponse) => void;
    /**
     * @remarks
     * Removes a callback from being called when the dialog
     * was showed to a player.
     * @param callback
     * @throws This function can throw errors.
     */
    unsubscribe(callback: (arg: ModalFormResponse) => void): void;
}
export class ModalFormResponse extends serverUi.ModalFormResponse {
    /**
     * Returns the player of the ui interacted with.
     */
    player: server.Player;
}
export * from "@minecraft/server-ui"
