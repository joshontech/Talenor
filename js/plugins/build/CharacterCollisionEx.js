/*!/*:
@target MZ
@plugindesc CharacterCollisionEx v1.0.2
@author unagi ootoro
@help
This plug-in extends the collision detection of characters.
This plug-in provides the following functions
・Allow/prohibit character movement
・Map pass-through setting by terrain tag/region
・Event tag setting for event slip-through.

【How to use】
■ Terrain Slip-through Setting
To unconditionally set the terrain slip-through setting, set "Enable" to the "Set the terrain through terrain" plugin command.

■ Terrain slip-through setting by terrain tag/region
To set up terrain slip-through by terrain tag, set "Enable" to the plug-in command "SetThroughTerrainTags".

■ Setting a player to slip through
To set the player to slip through, set the "SetThroughPlayer" to "Enable".

Note: When player slip-through is enabled, followers will also be automatically slipped through.

■ Event slip-through setting
To enable event slip-through, set "Enable" to the "Set through event" plugin command.

■ Setting up a specific event slip-through by event tag
After setting an event tag for an event, you can use the plugin command "SetThroughEventTags" to specify the event tag for the event to slip through.
You can also set multiple event tags.
When setting an event tag, please describe the following in the first annotation of the 0th page of the event.
<et: event tag>

Example: To set the event tags "ET1" and "ET2
<et: ET1>
<et: ET2>


【Use in combination with the dot move system】
When using with the Dot Move System, please install in the following order.
・DotMoveSystem.js
・CharacterCollisionEx.js


【Appendix】
When you specify a character for plugin parameters/plugin commands, you can input a variable value;

■ Chracter type variable value
Player: 1
Follower: 2
Event: 3
Vehicle: 4

■ Follower index variable value
First: 1
Second: 2
Etc.

■ Vehicle variable value
Boat: 1
Ship: 2
Airship: 3


@command SetThroughTerrain
@text Set the terrain through terrain
@desc Set the terrain through terrain setting.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind": "thisEvent", "EventIdOrName": "1", "EventIdByVariable": "0", "FollowerIndex": "1", "VehicleKind": "boat"}
@desc
Specify the target character.

@arg EnableOrDisable
@text enable/disable
@type boolean
@on Enable
@off Disable
@default true
@desc
Select enable or disable.


@command SetThroughTerrainTags
@text SetThroughTerrainTags
@desc Set through terrain tags.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind": "thisEvent", "EventIdOrName": "1", "EventIdByVariable": "0", "FollowerIndex": "1", "VehicleKind": "boat"}
@desc
Specify the target character.

@arg TerrainTags
@text TerrainTags
@type number[]
@default []
@desc
Register terrain tags to be slipped through.


@command SetThroughRegions
@text Set region through regions
@desc Set region through regions.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind": "thisEvent", "EventIdOrName": "1", "EventIdByVariable": "0", "FollowerIndex": "1", "VehicleKind": "boat"}
@desc
Specify the target character.
@arg Regions
@text regions
@type number[]
@default []
@desc
Register a region to be through.


@command SetThroughEvent
@text Set through event
@desc Set up event slip-through.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind": "thisEvent", "EventIdOrName": "1", "EventIdByVariable": "0", "FollowerIndex": "1", "VehicleKind": "boat"}
@desc
Specify the target character.

@arg EnableOrDisable
@text enable/disable
@type boolean
@on Enable
@off Disable
@default true
@desc
Select enable or disable.


@command SetThroughPlayer
@text SetThroughPlayer
@desc Set the player through setting.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind": "thisEvent", "EventIdOrName": "1", "EventIdByVariable": "0", "FollowerIndex": "1", "VehicleKind": "boat"}
@desc
Specify the target character.

@arg EnableOrDisable
@text enable/disable
@type boolean
@on Enable
@off Disable
@default true
@desc
Select enable or disable.


@command SetThroughEventTags
@text SetThroughEventTags
@desc Set through event tags.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind": "thisEvent", "EventIdOrName": "1", "EventIdByVariable": "0", "FollowerIndex": "1", "VehicleKind": "boat"}
@desc
Specify the target character.

@arg EventTags
@text Event Tags
@type string[]
@default []
@desc
Register event tags to be slipped through.
*/
/*!/*~struct~CharacterSpecification:
@param CharacterKind
@text Character Kind
@type select
@option thisEvent
@value thisEvent
@option player
@value player
@option follower
@value follower
@option event
@option event
@option vehicle
@value vehicle
@default thisEvent
@desc
Specify the character type.

@param CharacterKindByVariable
@text Character type (variable specification)
@type variable
@default 0
@desc
Specify character type by variable.

@param EventIdOrName
@text event ID or event name
@type string
@default 1
@desc
Specify the event ID or event name when an event is specified for the character type.

@param EventIdByVariable
@text event ID (variable specification)
@type variable
@default 0
@desc
Specify the event ID as a variable when an event is specified for the character type.

@param FollowerIndex
@text follower index
@type number
@min 1
@default 1
@desc
Specify the order of target followers when follower is specified as the character type.

@param FollowerIndexByVariable
@text follower index (specify variable)
@type variable
@default 0
@desc
Specify the order of target followers by variable when follower is specified for character type.

@param VehicleKind
@text Vehicle type
@type select
@option small boat
@value boat
@option large ship
@value ship
@option airship
@value airship
@default boat
@desc
Specifies the target vehicle when a vehicle is specified for the character type.

@param VehicleKindByVariable
@text Vehicle type (specify variable)
@type variable
@default 0
@desc
Specify the target vehicle by variable when a vehicle is specified for the character type.
*/
/*!/*:ja
@target MZ
@plugindesc キャラクターコリジョン拡張 v1.0.2
@author うなぎおおとろ
@help
キャラクターのコリジョン(衝突判定)を拡張するプラグインです。
このプラグインでは以下の機能を提供します。
・キャラクターの移動許可/禁止設定
・地形タグ/リージョンによるマップのすり抜け設定
・イベントタグによるイベントのすり抜け設定

【使用方法】
■ 地形のすり抜け設定
無条件で地形のすり抜け設定を行う場合、
プラグインコマンド「地形すり抜け設定」に"有効"を設定します。

■ 地形タグ/リージョンによる地形のすり抜け設定
地形タグによる地形のすり抜け設定を行う場合、
プラグインコマンド「地形タグすり抜け設定」によってすり抜け対象の地形タグを設定します。

リージョンによるマップのすり抜け設定を行い場合、
プラグインコマンド「リージョンすり抜け設定」によってすり抜け対象のリージョンを設定します。

■ プレイヤーのすり抜け設定
プレイヤーをすり抜けするように設定を行う場合、
プラグインコマンド「プレイヤーすり抜け設定」に"有効"を設定します。

※注意: プレイヤーすり抜けを設定した場合、自動的にフォロワーもすり抜け対象となります。

■ イベントのすり抜け設定
イベントをすり抜けするように設定を行う場合、
プラグインコマンド「イベントすり抜け設定」に"有効"を設定します。

■ イベントタグによる特定のイベントのすり抜け設定
イベントにイベントタグを設定したうえでプラグインコマンド「イベントタグすり抜け設定」で
すり抜け対象のイベントタグを指定することで、特定のイベントのみすり抜けできるように
設定することが可能です。イベントタグは複数設定することも可能です。
イベントタグを設定する場合、イベントの0ページ目の最初の注釈に以下のように記載してください。
<et: イベントタグ>

例: イベントタグ"ET1"と"ET2"を設定する場合
<et: ET1>
<et: ET2>


【ドット移動システムとの併用】
ドット移動システムと併用する場合、以下の順に導入してください。
・DotMoveSystem.js
・CharacterCollisionEx.js


【補足情報】
各種プラグインパラメータやプラグインコマンドで「キャラクター指定」を
行う場合、変数でキャラクターを指定することが可能です。
その場合、各種変数の値の意味については以下の通りとなります。

■ キャラクター種別の変数の値
プレイヤー: 1
フォロワー: 2
イベント: 3
乗り物: 4

■ フォロワーインデックスの変数の値
一人目: 1
二人目: 2
(以下略)

■ 乗り物の変数の値
小型船: 1
大型船: 2
飛行船: 3


@command SetThroughTerrain
@text 地形すり抜け設定
@desc 地形すり抜けの設定を行います。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg EnableOrDisable
@text 有効/無効
@type boolean
@on 有効
@off 無効
@default true
@desc
有効または無効を選択します。


@command SetThroughTerrainTags
@text 地形タグすり抜け設定
@desc 地形タグすり抜けの設定を行います。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg TerrainTags
@text 地形タグ
@type number[]
@default []
@desc
すり抜け対象の地形タグを登録します。


@command SetThroughRegions
@text リージョンすり抜け設定
@desc リージョンすり抜けの設定を行います。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg Regions
@text リージョン
@type number[]
@default []
@desc
すり抜け対象のリージョンを登録します。


@command SetThroughEvent
@text イベントすり抜け設定
@desc イベントすり抜けの設定を行います。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg EnableOrDisable
@text 有効/無効
@type boolean
@on 有効
@off 無効
@default true
@desc
有効または無効を選択します。


@command SetThroughPlayer
@text プレイヤーすり抜け設定
@desc プレイヤーすり抜けの設定を行います。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg EnableOrDisable
@text 有効/無効
@type boolean
@on 有効
@off 無効
@default true
@desc
有効または無効を選択します。


@command SetThroughEventTags
@text イベントタグすり抜け設定
@desc イベントタグによるイベントすり抜けの設定を行います。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg EventTags
@text イベントタグ
@type string[]
@default []
@desc
すり抜け対象のイベントタグを登録します。
*/
/*!/*~struct~CharacterSpecification:ja
@param CharacterKind
@text キャラクター種別
@type select
@option このイベント
@value thisEvent
@option プレイヤー
@value player
@option フォロワー
@value follower
@option イベント
@value event
@option 乗り物
@value vehicle
@default thisEvent
@desc
キャラクター種別を指定します。

@param CharacterKindByVariable
@text キャラクター種別(変数指定)
@type variable
@default 0
@desc
キャラクター種別を変数で指定します。

@param EventIdOrName
@text イベントID or イベント名
@type string
@default 1
@desc
キャラクター種別にイベントを指定した場合に対象となるイベントIDまたはイベント名を指定します。

@param EventIdByVariable
@text イベントID(変数指定)
@type variable
@default 0
@desc
キャラクター種別にイベントを指定した場合に対象となるイベントIDを変数で指定します。

@param FollowerIndex
@text フォロワーインデックス
@type number
@min 1
@default 1
@desc
キャラクター種別にフォロワーを指定した場合に対象となるフォロワーの順番を指定します。

@param FollowerIndexByVariable
@text フォロワーインデックス(変数指定)
@type variable
@default 0
@desc
キャラクター種別にフォロワーを指定した場合に対象となるフォロワーの順番を変数で指定します。

@param VehicleKind
@text 乗り物種別
@type select
@option 小型船
@value boat
@option 大型船
@value ship
@option 飛行船
@value airship
@default boat
@desc
キャラクター種別に乗り物を指定した場合に対象となる乗り物を指定します。

@param VehicleKindByVariable
@text 乗り物種別(変数指定)
@type variable
@default 0
@desc
キャラクター種別に乗り物を指定した場合に対象となる乗り物を変数で指定します。
*/

var __tmp__require = require;

var simpleExported;
if (typeof simpleExported === "undefined") {
    simpleExported = {};
}

function simpleImport(path) {
    const pathArray = path.split("/");
    let module = simpleExported;
    for (const key of pathArray) {
        module = module[key];
    }
    return module;
}

function simpleExport(path, obj) {
    const pathArray = path.split("/");
    let module = simpleExported;
    for (const key of pathArray.slice(0, pathArray.length - 1)) {
        if (module[key] == null) {
            module[key] = {};
        }
        module = module[key];
    }
    module[pathArray[pathArray.length - 1]] = obj;
}

var require = (path) => {
    return simpleImport(path);
};

"use strict";
(() => {
    // ts/CharacterCollisionEx/ExportDotMoveSystem.ts
    if (typeof DotMoveSystem !== "undefined") {
        simpleExport("DotMoveSystem", DotMoveSystem);
    }

    // ts/CommonLibrary/PluginParamsParser.ts
    var PluginParamsParser = class {
        static parse(params, typeData = {}, predictEnable = true) {
            return new PluginParamsParser(predictEnable).parse(params, typeData);
        }
        constructor(predictEnable = true) {
            this._predictEnable = predictEnable;
        }
        parse(params, typeData = {}) {
            const result = {};
            for (const name in params) {
                const expandedParam = this.expandParam(params[name]);
                result[name] = this.convertParam(expandedParam, typeData[name]);
            }
            return result;
        }
        expandParam(strParam, loopCount = 0) {
            if (++loopCount > 255)
                throw new Error("endless loop error");
            if (strParam.match(/^\s*\[.*\]\s*$/)) {
                const aryParam = JSON.parse(strParam);
                return aryParam.map((data) => this.expandParam(data), loopCount + 1);
            } else if (strParam.match(/^\s*\{.*\}\s*$/)) {
                const result = {};
                const objParam = JSON.parse(strParam);
                for (const name in objParam) {
                    result[name] = this.expandParam(objParam[name], loopCount + 1);
                }
                return result;
            }
            return strParam;
        }
        convertParam(param, type, loopCount = 0) {
            if (++loopCount > 255)
                throw new Error("endless loop error");
            if (typeof param === "string") {
                return this.cast(param, type);
            } else if (typeof param === "object" && param instanceof Array) {
                if (!(param == null || typeof param === "object" && param instanceof Array)) {
                    throw new Error(`Invalid array type: ${type}`);
                }
                return param.map((data, i) => {
                    const dataType = type == null ? void 0 : type[i];
                    return this.convertParam(data, dataType, loopCount + 1);
                });
            } else if (typeof param === "object") {
                if (!(param == null || typeof param === "object")) {
                    throw new Error(`Invalid object type: ${type}`);
                }
                const result = {};
                for (const name in param) {
                    const dataType = type == null ? void 0 : type[name];
                    result[name] = this.convertParam(param[name], dataType, loopCount + 1);
                }
                return result;
            } else {
                throw new Error(`Invalid param: ${param}`);
            }
        }
        cast(param, type) {
            if (param == null || param === "")
                return void 0;
            if (type == null)
                type = "any";
            switch (type) {
                case "any":
                    if (!this._predictEnable)
                        throw new Error("Predict mode is disable");
                    return this.cast(param, this.predict(param));
                case "string":
                    return param;
                case "number":
                    if (param.match(/^\-?\d+\.\d+$/))
                        return parseFloat(param);
                    return parseInt(param);
                case "boolean":
                    return param === "true";
                default:
                    throw new Error(`Unknow type: ${type}`);
            }
        }
        predict(param) {
            if (param.match(/^\-?\d+$/) || param.match(/^\-?\d+\.\d+$/)) {
                return "number";
            } else if (param === "true" || param === "false") {
                return "boolean";
            } else {
                return "string";
            }
        }
    };

    // ts/CommonLibrary/mixin.ts
    function mixin(dest, src) {
        for (const name of Object.getOwnPropertyNames(src.prototype)) {
            if (name === "constructor")
                continue;
            const value = Object.getOwnPropertyDescriptor(src.prototype, name) || /* @__PURE__ */ Object.create(null);
            Object.defineProperty(dest.prototype, name, value);
        }
    }

    // ts/CharacterCollisionEx/CharacterCollisionEx.ts
    var CharacterCollisionExPluginName = document.currentScript ? decodeURIComponent(document.currentScript.src.match(/^.*\/(.+)\.js$/)[1]) : "CharacterCollisionEx";
    var CharacterCollisionExPluginParams = PluginParamsParser.parse(PluginManager.parameters(CharacterCollisionExPluginName));
    PluginManager.registerCommand(CharacterCollisionExPluginName, "SetThroughTerrain", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        if (!character)
            return;
        character.setThroughTerrain(params.EnableOrDisable);
    });
    PluginManager.registerCommand(CharacterCollisionExPluginName, "SetThroughTerrainTags", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        if (!character)
            return;
        character.setThroughTerrainTags(params.TerrainTags);
    });
    PluginManager.registerCommand(CharacterCollisionExPluginName, "SetThroughRegions", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        if (!character)
            return;
        character.setThroughRegions(params.Regions);
    });
    PluginManager.registerCommand(CharacterCollisionExPluginName, "SetThroughEvent", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        if (!character)
            return;
        character.setThroughEvent(!!params.EnableOrDisable);
    });
    PluginManager.registerCommand(CharacterCollisionExPluginName, "SetThroughEventTags", function(args) {
        const params = PluginParamsParser.parse(args, { EventTags: ["string"] });
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        if (!character)
            return;
        character.setThroughEventTags(params.EventTags);
    });
    PluginManager.registerCommand(CharacterCollisionExPluginName, "SetThroughPlayer", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        if (!character)
            return;
        character.setThroughPlayer(!!params.EnableOrDisable);
    });
    var Game_Interpreter_Mixin = class extends Game_Interpreter {
        findCharacterBySpecification(param) {
            let characterKind = 0;
            if (param.CharacterKindByVariable > 0) {
                characterKind = $gameVariables.value(param.CharacterKindByVariable);
            } else {
                switch (param.CharacterKind) {
                    case "thisEvent":
                        characterKind = 0;
                        break;
                    case "player":
                        characterKind = 1;
                        break;
                    case "follower":
                        characterKind = 2;
                        break;
                    case "event":
                        characterKind = 3;
                        break;
                    case "vehicle":
                        characterKind = 4;
                        break;
                }
            }
            let character;
            switch (characterKind) {
                case 0:
                    character = $gameMap.event(this._eventId);
                    break;
                case 1:
                    character = $gamePlayer;
                    break;
                case 2:
                    let followerIndex = 0;
                    if (param.FollowerIndex > 0) {
                        followerIndex = $gameVariables.value(param.FollowerIndexByVariable);
                    } else {
                        followerIndex = param.FollowerIndex;
                    }
                    character = $gamePlayer.followers().data()[followerIndex - 1];
                    break;
                case 3:
                    let eventId = 0;
                    if (param.EventIdByVariable > 0) {
                        eventId = $gameVariables.value(param.EventIdByVariable);
                    } else {
                        if (typeof param.EventIdOrName === "number") {
                            eventId = param.EventIdOrName;
                        } else {
                            eventId = this.eventNameToId(param.EventIdOrName);
                        }
                    }
                    if (eventId > 0)
                        character = $gameMap.event(eventId);
                    break;
                case 4:
                    let VehicleKind;
                    if (param.FollowerIndex > 0) {
                        VehicleKind = $gameVariables.value(param.FollowerIndexByVariable);
                    } else {
                        if (param.VehicleKind === "boat") {
                            VehicleKind = 1;
                        } else if (param.VehicleKind === "ship") {
                            VehicleKind = 2;
                        } else if (param.VehicleKind === "airship") {
                            VehicleKind = 3;
                        }
                    }
                    if (VehicleKind === 1) {
                        character = $gameMap.boat();
                    } else if (VehicleKind === 2) {
                        character = $gameMap.ship();
                    } else if (VehicleKind === 3) {
                        character = $gameMap.airship();
                    }
                    break;
            }
            if (character == null) {
                throw new Error(`${JSON.stringify(param)} is invalid.`);
            }
            return character;
        }
        eventNameToId(eventName) {
            for (const event of $gameMap.events()) {
                if (event.event().name === eventName) {
                    return event.eventId();
                }
            }
            throw new Error(`Event name(${eventName}) is not found.`);
        }
    };
    mixin(Game_Interpreter, Game_Interpreter_Mixin);
    var Game_CharacterBase_Mixin = class extends Game_CharacterBase {
        isThroughEvent() {
            if (this._throughEvent == null)
                return false;
            return this._throughEvent;
        }
        setThroughEvent(throughEventFlag) {
            this._throughEvent = throughEventFlag;
        }
        isIncludeThroughEventTag(eventTag) {
            if (this._throughEventTags == null)
                return false;
            return this._throughEventTags.includes(eventTag);
        }
        setThroughEventTags(eventTags) {
            this._throughEventTags = eventTags;
        }
        isThroughPlayer() {
            if (this._throughPlayer == null)
                return false;
            return this._throughPlayer;
        }
        setThroughPlayer(throughPlayerFlag) {
            this._throughPlayer = throughPlayerFlag;
        }
        isThroughTerrain() {
            if (this._throughTerrain == null)
                return false;
            return this._throughTerrain;
        }
        setThroughTerrain(throughTerrainFlag) {
            this._throughTerrain = throughTerrainFlag;
        }
        setThroughTerrainTags(throughTerrainTags) {
            this._throughTerrainTags = throughTerrainTags;
        }
        isIncludesThroughRegion(terrainRegion) {
            if (this._throughRegions == null)
                return false;
            return this._throughRegions.includes(terrainRegion);
        }
        setThroughRegions(throughRegions) {
            this._throughRegions = throughRegions;
        }
        isIncludesThroughTerrainTag(terrainTag) {
            if (this._throughTerrainTags == null)
                return false;
            return this._throughTerrainTags.includes(terrainTag);
        }
        // 特定の地形タグ/リージョンはスルーする
        isMapPassable(x, y, d) {
            if (this.isThroughTerrain())
                return true;
            const x2 = $gameMap.roundXWithDirection(x, d);
            const y2 = $gameMap.roundYWithDirection(y, d);
            const d2 = this.reverseDir(d);
            let passCurrentMass = $gameMap.isPassable(x, y, d);
            let passNextMass = $gameMap.isPassable(x2, y2, d2);
            if (!passCurrentMass)
                passCurrentMass = this.isThroughMass(x, y);
            if (!passNextMass)
                passNextMass = this.isThroughMass(x2, y2);
            return passCurrentMass && passNextMass;
        }
        isThroughMass(x, y) {
            if (this.isIncludesThroughRegion($gameMap.regionId(x, y)))
                return true;
            if (this.isIncludesThroughTerrainTag($gameMap.terrainTag(x, y)))
                return true;
            return false;
        }
    };
    mixin(Game_CharacterBase, Game_CharacterBase_Mixin);
    var _Game_Event_Mixin = class extends Game_Event {
        initialize(...args) {
            _Game_Event_Mixin._initialize.call(this, ...args);
            this._eventTags = this.parseEventTags();
        }
        parseEventTags() {
            let eventTags = /* @__PURE__ */ new Set();
            const note = this.getAnnotation(0);
            for (const matchData of note.matchAll(/\<et\s*\:\s*(.+)\>/g)) {
                if (matchData && matchData[1])
                    eventTags.add(matchData[1]);
            }
            return [...eventTags];
        }
        eventTags() {
            return this._eventTags;
        }
        addEventTag(eventTag) {
            if (!this.hasEventTag(eventTag))
                this._eventTags.push(eventTag);
        }
        hasEventTag(eventTag) {
            return this._eventTags.includes(eventTag);
        }
        getAnnotationValues(page) {
            const note = this.getAnnotation(page);
            const data = { note };
            DataManager.extractMetadata(data);
            return data.meta;
        }
        getAnnotation(page) {
            const eventData = this.event();
            if (eventData) {
                const noteLines = [];
                const pageList = eventData.pages[page].list;
                for (let i = 0; i < pageList.length; i++) {
                    if (pageList[i].code === 108 || pageList[i].code === 408) {
                        noteLines.push(pageList[i].parameters[0]);
                    } else {
                        break;
                    }
                }
                return noteLines.join("\n");
            }
            return "";
        }
    };
    var Game_Event_Mixin = _Game_Event_Mixin;
    Game_Event_Mixin._initialize = Game_Event.prototype.initialize;
    mixin(Game_Event, Game_Event_Mixin);
    if (typeof DotMoveSystem !== "undefined") {
        const _CharacterCollisionChecker_Mixin = class extends DotMoveSystem.CharacterCollisionChecker {
            checkPassMass(ix, iy, d) {
                if (this._character.isThroughTerrain())
                    return true;
                return _CharacterCollisionChecker_Mixin._checkPassMass.call(this, ix, iy, d);
            }
        };
        let CharacterCollisionChecker_Mixin = _CharacterCollisionChecker_Mixin;
        CharacterCollisionChecker_Mixin._checkPassMass = DotMoveSystem.CharacterCollisionChecker.prototype.checkPassMass;
        mixin(DotMoveSystem.CharacterCollisionChecker, CharacterCollisionChecker_Mixin);
        if (!Game_Event.prototype.hasOwnProperty("checkCollisionTargetEvent")) {
            Game_Event.prototype.checkCollisionTargetEvent = function(x, y, d, event) {
                return Game_Character.prototype.checkCollisionTargetEvent.call(this, x, y, d, event);
            };
        }
        const _Game_Event_DotMoveMixin = class extends Game_Event {
            checkCollisionTargetPlayer(x, y, d, player) {
                if (this.isThroughPlayer())
                    return false;
                return _Game_Event_DotMoveMixin._checkCollisionTargetPlayer.call(this, x, y, d, player);
            }
            checkCollisionTargetFollower(x, y, d, follower) {
                if (this.isThroughPlayer())
                    return false;
                return _Game_Event_DotMoveMixin._checkCollisionTargetFollower.call(this, x, y, d, follower);
            }
            checkCollisionTargetEvent(x, y, d, event) {
                if (this.isThroughEvent())
                    return false;
                for (const tag of event.eventTags()) {
                    if (this.isIncludeThroughEventTag(tag))
                        return false;
                }
                return _Game_Event_DotMoveMixin._checkCollisionTargetEvent.call(this, x, y, d, event);
            }
        };
        let Game_Event_DotMoveMixin = _Game_Event_DotMoveMixin;
        Game_Event_DotMoveMixin._checkCollisionTargetPlayer = Game_Event.prototype.checkCollisionTargetPlayer;
        Game_Event_DotMoveMixin._checkCollisionTargetFollower = Game_Event.prototype.checkCollisionTargetFollower;
        Game_Event_DotMoveMixin._checkCollisionTargetEvent = Game_Event.prototype.checkCollisionTargetEvent;
        mixin(Game_Event, Game_Event_DotMoveMixin);
    }
    if (typeof DotMoveSystem === "undefined") {
        class Game_CharacterBase_NotDotMoveMixin extends Game_CharacterBase {
            isCollidedWithEvents(x, y) {
                if (this.isThroughEvent())
                    return false;
                for (const event of $gameMap.eventsXyNt(x, y)) {
                    let eventTagThrough = false;
                    for (const tag of event.eventTags()) {
                        if (this.isIncludeThroughEventTag(tag)) {
                            eventTagThrough = true;
                            break;
                        }
                    }
                    if (eventTagThrough)
                        continue;
                    if (event.isNormalPriority())
                        return true;
                }
                return false;
            }
        }
        mixin(Game_CharacterBase, Game_CharacterBase_NotDotMoveMixin);
    }
    if (typeof DotMoveSystem === "undefined") {
        const _Game_Event_NotDotMoveMixin = class extends Game_Event {
            isCollidedWithPlayerCharacters(x, y) {
                if (this.isThroughPlayer())
                    return false;
                return _Game_Event_NotDotMoveMixin._isCollidedWithPlayerCharacters.call(this, x, y);
            }
            isCollidedWithEvents(x, y) {
                if (this.isThroughEvent())
                    return false;
                for (const event of $gameMap.eventsXyNt(x, y)) {
                    let eventTagThrough = false;
                    for (const tag of event.eventTags()) {
                        if (this.isIncludeThroughEventTag(tag)) {
                            eventTagThrough = true;
                            break;
                        }
                    }
                    if (eventTagThrough)
                        continue;
                    return true;
                }
                return false;
            }
        };
        let Game_Event_NotDotMoveMixin = _Game_Event_NotDotMoveMixin;
        Game_Event_NotDotMoveMixin._isCollidedWithPlayerCharacters = Game_Event.prototype.isCollidedWithPlayerCharacters;
        mixin(Game_Event, Game_Event_NotDotMoveMixin);
    }
})();

require = __tmp__require;

