/*:
 * @target MZ
 * @plugindesc A simple mining plugin that allows players to mine resources from specific events.
 * @help This plugin provides functionality for mining nodes that players can interact with to receive items.
 *
 * @param MiningNodes
 * @text Mining Nodes
 * @type struct<MiningNode>[]
 * @desc Define the mining nodes and their respective rewards and respawn times.
 * @default []
 *
 * @command Mine
 * @text Mine
 * @desc Mines the resource from the event if it is a valid mining node.
 */

/*~struct~MiningNode:
 * @param eventId
 * @text Event ID
 * @type number
 * @min 1
 * @desc The event ID of the mining node.
 * 
 * @param itemId
 * @text Item ID
 * @type item
 * @desc The item that will be received from this mining node.
 *
 * @param respawnTime
 * @text Respawn Time
 * @type number
 * @min 1
 * @desc The time in seconds before the mining node can be mined again.
 */

(() => {
    const pluginName = "MiningPlugin";
    const parameters = PluginManager.parameters(pluginName);
    const miningNodes = JSON.parse(parameters.MiningNodes || "[]").map(node => JSON.parse(node));

    const minedNodes = {};

    PluginManager.registerCommand(pluginName, "Mine", args => {
        const eventId = $gameMap._interpreter.eventId();
        const node = miningNodes.find(node => node.eventId == eventId);

        if (node && !minedNodes[eventId]) {
            $gameParty.gainItem($dataItems[node.itemId], 1);
            minedNodes[eventId] = true;
            
            setTimeout(() => {
                minedNodes[eventId] = false;
            }, node.respawnTime * 1000);
        }
    });

    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === "Mine") {
            this.pluginCommandMine();
        }
    };

    Game_Interpreter.prototype.pluginCommandMine = function() {
        PluginManager.callCommand(this, pluginName, "Mine", {});
    };
})();