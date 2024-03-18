/*!/*:
@target MZ
@plugindesc ARPG_ItemShortcut v1.4.0
@author unagi ootoro
@base ARPG_Core

@help
This plugin introduces an item shortcut function to the ARPG plugin.

【How to use】
■ Plugin Features
When an item or skill is selected from the list, it can be registered as a shortcut.
The shortcut will be reflected in the shortcut on the map.

The registered item/skill can be used by pressing the C key.
Shortcuts can be toggled by pressing the L or R button.

Registered shortcuts can be deleted by pressing the SHIFT key
on the shortcut registration screen.

■ Specifications for parties with multiple people
・Shortcut state is maintained per actor.
・Skill shortcut registration is possible only for the first actor.

■ How to install plug-ins
This plugin can be used simply by installing it.

【Required Plug-in】
When installing this plugin, "ARPG_Core.js v1.4.0" or later is required.
Please install this plugin in the following order.
・DotMoveSystem.js
・DotMoveSystem_FunctionEx.js
・SelfVariable.js
・ARPG_Core.js
・ARPG_ItemShortcut.js

@command ChangeShortcutEnableOrDisable
@text Switch visibility of short cut
@desc Switches the visibility of the short cut on a map.

@arg EnableOrDisable
@text Enable/Disable
@type boolean
@on Enable
@off Disable
@default true
@desc
Select enable or disable.

@command ClearShortcut
@text Clear shortcut
@desc Clear the shortcut for the specified actor.

@arg ActorId
@text Actor ID
@type actor
@default 1
@desc Specify the actor to clear shortcut.


@command UseShortcutItem
@text Use shortcut item
@desc Use the shortcut item currently selected on the map.


@param NumShortcutSlots
@text number of shortcut slots
@type number
@min 1
@default 6
@desc
Specify the number of shortcut slots.

@param Text
@text Text
@type struct<Text>
@default {"UseItem":"Use","RegisterShortcut":"Register shortcut"}
@desc
Register various texts to be used in the game.

@param KeySetting
@text key setting
@type struct<KeySetting>
@default {"UseShortcutItem":"{\"KeyName\":\"other\",\"KeySymbol\":\"C\",\"KeyCodes\":\"[\\\"67\\\"]\",\"ButtonIndexes\":\"[\\\"7\\\"]\",\"KeyCode\":\"-1\",\"ButtonIndex\":\"-1\"}"}
@desc
Configure various settings for key input.
*/
/*!/*~struct~KeySetting:
@param UseShortcutItem
@text shortcut key
@type struct<Key>
@default {"KeyName":"other","KeySymbol":"C","KeyCodes":"[\"67\"]","ButtonIndexes":"[\"7\"]","KeyCode":"-1","ButtonIndex":"-1"}
@desc
Set the key to use for the shortcut.
*/
/*!/*~struct~Key:
@param KeyName
@text KeyName
@type select
@option decision
@value ok
@option cancel
@value escape
@option menu
@value menu
@option shift
@value shift
@option down
@value down
@option left
@value left
@option right
@value right
@option up
@value up
@option page up
@value pageup
@option page down
@value pagedown
@option other
@value other
@option unassigned
@value unassigned
@default ok
@desc
Specify the key.

@param KeySymbol
@text key symbol
@type string
@desc
Specify the key symbol when the key is selected as other. Leave blank if not used.

@param KeyCodes
@text Key code list
@type number[]
@default []
@desc
Specify all the key codes to be assigned when the key is selected as Other.

@param ButtonIndexes
@text Button index list
@type number[]
@default []
@desc
Specify all the indexes of the buttons to be assigned when the key is selected as Other.

@param KeyCode(Scheduled to be discontinued)
@text key code
@type number
@min -1
@default -1
@desc
Specify the key code when the key is selected as other. Specify -1 if keyboard is not used.

@param ButtonIndex(Scheduled to be discontinued)
@text ButtonIndex
@type number
@min -1
@default -1
@desc
Specify the index of the button when the key is selected as other. Specify -1 if gamepad is not used.
*/
/*!/*~struct~Text:
@param UseItem
@text Use item
@type string
@default Use
@desc
Specify the text when the item is used.

@param RegisterShortcut
@text Register shortcut
@type string
@default Register shortcut
@desc
Specify the text when registering a shortcut.
*/
/*!/*:ja
@target MZ
@plugindesc ARPGショートカット v1.4.0
@author うなぎおおとろ
@base ARPG_Core

@help
ARPGプラグインにアイテムショートカット機能を導入するプラグインです。

【使用方法】
■ プラグインの機能
アイテムまたはスキル一覧から項目を選択するとショートカットに登録することが可能です。
ショートカットに登録するとマップ上のショートカットに反映されます。

登録したアイテム/スキルはCキーで使用することができます。
ショートカットの切り替えはLボタンまたはRボタンで行うことが可能です。

登録したショートカットについては、ショートカット登録画面でSHIFTキーを
押すことによって削除することができます。

■ パーティが複数人数の場合の仕様
・ショートカットの状態はアクターごとに保持されます。
・スキルのショートカット登録は先頭のアクターのみ可能です。

■ プラグインの導入方法
このプラグインは導入するだけで使用可能です。

【必須プラグイン】
本プラグインを使用するには「ARPG_Core.js v1.4.0」以降が必要になります。
本プラグインの導入順については以下のように導入してください。
・DotMoveSystem.js
・DotMoveSystem_FunctionEx.js
・SelfVariable.js
・ARPG_Core.js
・ARPG_ItemShortcut.js

@command ChangeShortcutEnableOrDisable
@text ショートカット有効/無効切り替え
@desc マップ上でのショートカット表示の有効/無効を切り替えます。

@arg EnableOrDisable
@text 有効/無効
@type boolean
@on 有効
@off 無効
@default true
@desc
有効または無効を選択します。


@command ClearShortcut
@text ショートカットクリア
@desc 指定したアクターのショートカットをクリアします。

@arg ActorId
@text アクターID
@type actor
@default 1
@desc ショートカットクリア対象のアクターを指定します。


@command UseShortcutItem
@text ショートカットアイテム使用
@desc マップ上で現在選択されているショートカットアイテムを使用します。


@param NumShortcutSlots
@text ショートカットスロット数
@type number
@min 1
@default 6
@desc
ショートカットのスロット数を指定します。

@param Text
@text テキスト
@type struct<Text>
@default {"UseItem":"使用する","RegisterShortcut":"ショートカットへ登録する"}
@desc
ゲーム中で使用する各種テキストを登録します。

@param KeySetting
@text キー入力設定
@type struct<KeySetting>
@default {"UseShortcutItem":"{\"KeyName\":\"other\",\"KeySymbol\":\"C\",\"KeyCodes\":\"[\\\"67\\\"]\",\"ButtonIndexes\":\"[\\\"7\\\"]\",\"KeyCode\":\"-1\",\"ButtonIndex\":\"-1\"}"}
@desc
キー入力の各種設定を行います。
*/
/*!/*~struct~KeySetting:ja
@param UseShortcutItem
@text ショートカット使用キー
@type struct<Key>
@default {"KeyName":"other","KeySymbol":"C","KeyCodes":"[\"67\"]","ButtonIndexes":"[\"7\"]","KeyCode":"-1","ButtonIndex":"-1"}
@desc
ショートカット使用キーを設定します。
*/
/*!/*~struct~Key:ja
@param KeyName
@text キー名
@type select
@option 決定
@value ok
@option キャンセル
@value escape
@option メニュー
@value menu
@option シフト
@value shift
@option 下
@value down
@option 左
@value left
@option 右
@value right
@option 上
@value up
@option ページアップ
@value pageup
@option ページダウン
@value pagedown
@option その他
@value other
@option 未割り当て
@value unassigned
@default ok
@desc
キーを指定します。

@param KeySymbol
@text キーシンボル
@type string
@desc
キーをその他に選択した場合のキーシンボルを指定します。使用しない場合は空欄にしてください。

@param KeyCodes
@text キーコード一覧
@type number[]
@default []
@desc
キーをその他に選択した場合に割り当てるキーコードを全て指定します。

@param ButtonIndexes
@text ボタンインデックス一覧
@type number[]
@default []
@desc
キーをその他に選択した場合に割り当てるボタンのインデックスを全て指定します。

@param KeyCode
@text キーコード(廃止予定)
@type number
@min -1
@default -1
@desc
キーをその他に選択した場合のキーコードを指定します。キーボードを使用しない場合は-1を指定してください。

@param ButtonIndex
@text ボタンインデックス(廃止予定)
@type number
@min -1
@default -1
@desc
キーをその他に選択した場合のボタンのインデックスを指定します。ゲームパッドを使用しない場合は-1を指定してください。
*/
/*!/*~struct~Text:ja
@param UseItem
@text アイテム使用
@type string
@default 使用する
@desc
アイテム使用時のテキストを指定します。

@param RegisterShortcut
@text ショートカット登録
@type string
@default ショートカットへ登録する
@desc
ショートカット登録時のテキストを指定します。
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
    var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
        get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
    }) : x)(function(x) {
        if (typeof require !== "undefined")
            return require.apply(this, arguments);
        throw new Error('Dynamic require of "' + x + '" is not supported');
    });

    // ts/ARPG_ItemShortcut/Window_Shortcut.ts
    var Window_Shortcut = class extends Window_Selectable {
        initialize(rect) {
            super.initialize(rect);
            this.contents.fontSize = 20;
        }
        maxCols() {
            return $shortcutStatus.numSlots();
        }
        maxItems() {
            return $shortcutStatus.numSlots();
        }
        isCurrentItemEnabled() {
            return true;
        }
        drawItem(index) {
            const actorId = $gameParty.leader().actorId();
            const rect = this.itemRect(index);
            const item = $shortcutStatus.shortcut(actorId, index);
            if (item) {
                const itemData = item.object();
                this.drawIcon(itemData.iconIndex, rect.x + 4, rect.y + 4);
                if (DataManager.isSkill(itemData)) {
                    this.changeTextColor(ColorManager.mpCostColor());
                    this.drawText(itemData.mpCost, rect.x + 12, rect.y + 12, 24, "right");
                    this.changeTextColor(ColorManager.normalColor());
                } else {
                    this.drawText($gameParty.numItems(item.object()), rect.x + 12, rect.y + 12, 24, "right");
                }
            }
        }
        removeShortcut() {
            const actorId = $gameParty.leader().actorId();
            const removed = $shortcutStatus.remove(actorId, this.index());
            if (removed) {
                SoundManager.playCancel();
            }
        }
        processHandling() {
            super.processHandling.call(this);
            if (this.isOpenAndActive()) {
                if (this.isHandled("shift") && Input.isTriggered("shift")) {
                    return this.processShift();
                }
            }
        }
        processShift() {
            this.callShiftHandler();
        }
        callShiftHandler() {
            this.callHandler("shift");
        }
    };

    // ts/ARPG_ItemShortcut/Window_MapShortcut.ts
    var Window_MapShortcut = class extends Window_Shortcut {
        initialize(rect) {
            super.initialize(rect);
        }
        processCursorMove() {
            if (this.isCursorMovable()) {
                const lastIndex = this.index();
                if (!this.isHandled("pagedown") && Input.isTriggered("pagedown")) {
                    this.cursorRight(Input.isTriggered("pagedown"));
                }
                if (!this.isHandled("pageup") && Input.isTriggered("pageup")) {
                    this.cursorLeft(Input.isTriggered("pageup"));
                }
                if (this.index() !== lastIndex) {
                    this.playCursorSound();
                }
            }
        }
        cursorRight(wrap) {
            const index = this.index();
            const maxItems = this.maxItems();
            const maxCols = this.maxCols();
            if (maxCols >= 2) {
                this.smoothSelect((index + 1) % maxItems);
            }
        }
        cursorLeft(wrap) {
            const index = Math.max(0, this.index());
            const maxItems = this.maxItems();
            const maxCols = this.maxCols();
            if (maxCols >= 2) {
                this.smoothSelect((index - 1 + maxItems) % maxItems);
            }
        }
    };

    // ts/ARPG_ItemShortcut/Scene_Map.ts
    var import_Sprite_Label = __require("ARPG_Core/Sprite_Label");
    var _Scene_Map_initialize = Scene_Map.prototype.initialize;
    Scene_Map.prototype.initialize = function() {
        _Scene_Map_initialize.call(this);
        this._shortcutWindowLastIndex = -1;
    };
    var _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        this.updateShortcut();
    };
    var _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        this.updateShortcut();
    };
    Scene_Map.prototype.updateShortcut = function() {
        if ($shortcutStatus.isEnabledItemShortcut()) {
            if (this._shortcutWindow.index() < 0) {
                this._shortcutWindow.select($shortcutTempData.mapSelectIndex);
            } else {
                $shortcutTempData.mapSelectIndex = this._shortcutWindow.index();
            }
            this._shortcutWindow.activate();
            this._shortcutWindow.show();
        } else {
            this._shortcutWindow.deactivate();
            this._shortcutWindow.hide();
        }
        if ($shortcutTempData.checkRefreshShortcutWindowRequest()) {
            $shortcutStatus.refresh();
            this._shortcutWindow.refresh();
            this.refreshShortcutLabel();
        } else {
            this.updateShortcutLabel();
        }
    };
    Scene_Map.prototype.updateShortcutLabel = function() {
        if (this._shortcutWindow.index() !== this._shortcutWindowLastIndex) {
            this.refreshShortcutLabel();
            this._shortcutWindowLastIndex = this._shortcutWindow.index();
        }
    };
    Scene_Map.prototype.refreshShortcutLabel = function() {
        if ($shortcutStatus.isEnabledItemShortcut()) {
            const actorId = $gameParty.leader().actorId();
            this._shortcutWindowLastIndex = this._shortcutWindow.index();
            const item = $shortcutStatus.shortcut(actorId, this._shortcutWindow.index());
            if (item) {
                this._shortcutLabel.text = item.object().name;
            } else {
                this._shortcutLabel.text = "";
            }
        } else {
            this._shortcutLabel.text = "";
        }
    };
    var _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        this.createShortcutWindow();
        _Scene_Map_createAllWindows.call(this);
    };
    Scene_Map.prototype.createShortcutWindow = function() {
        this._shortcutWindow = new Window_MapShortcut(this.shortcutWindowRect());
        this._shortcutWindow.hide();
        this._shortcutWindow.refresh();
        this._shortcutWindow.activate();
        this.addWindow(this._shortcutWindow);
    };
    Scene_Map.prototype.shortcutWindowRect = function() {
        const width = 50 * $shortcutStatus.numSlots();
        const height = 70;
        const x = Graphics.boxWidth - width;
        const y = Graphics.boxHeight - height;
        return new Rectangle(x, y, width, height);
    };
    var _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function() {
        _Scene_Map_createDisplayObjects.call(this);
        this.createShortcutLabel();
    };
    Scene_Map.prototype.createShortcutLabel = function() {
        const rect = this.shortcutWindowRect();
        this._shortcutLabel = new import_Sprite_Label.Sprite_Label(rect.width, 48);
        this._shortcutLabel.x = rect.x;
        this._shortcutLabel.y = rect.y - this._shortcutLabel.height + 8;
        this._shortcutLabel.hide();
        this._spriteset.addShortcutLabel(this._shortcutLabel);
    };

    // ts/ARPG_ItemShortcut/ShortcutRegisterSceneModule.ts
    var import_ARPG_Utils = __require("ARPG_Core/ARPG_Utils");

    // ts/ARPG_ItemShortcut/Window_RegistShortcutOrUse.ts
    var Window_RegistShortcutOrUse = class extends Window_Command {
        initialize(rect) {
            super.initialize(rect);
            this._useItemEnabled = false;
            this._useRegisterShortcutEnabled = false;
        }
        makeCommandList() {
            this.addCommand(ARPG_ItemShortcutPluginParams.Text.UseItem, "use", this._useItemEnabled);
            this.addCommand(ARPG_ItemShortcutPluginParams.Text.RegisterShortcut, "registShortcut", this._useRegisterShortcutEnabled);
        }
        setUseItemEnabled(isEnabled) {
            this._useItemEnabled = isEnabled;
        }
        setUseRegisterShortcutEnabled(isEnabled) {
            this._useRegisterShortcutEnabled = isEnabled;
        }
    };

    // ts/ARPG_ItemShortcut/ShortcutRegisterSceneModule.ts
    var DialogWindowWidth = 400;
    var ShortcutRegisterSceneModule = class extends Scene_ItemBase {
        createItemShortcutWindows() {
            this.createRegistShortcutOrUseWindow();
            this.createShortcutWindow();
        }
        createRegistShortcutOrUseWindow() {
            this._registShortcutOrUseWindow = new Window_RegistShortcutOrUse(this.registShortcutOrUseWindowRect());
            this._registShortcutOrUseWindow.setHandler("ok", this.onRegistShortcutOrUseOk.bind(this));
            this._registShortcutOrUseWindow.setHandler("cancel", this.onRegistShortcutOrUseCancel.bind(this));
            this._registShortcutOrUseWindow.hide();
            this._registShortcutOrUseWindow.deactivate();
            this.addWindow(this._registShortcutOrUseWindow);
        }
        createShortcutWindow() {
            this._shortcutWindow = new Window_Shortcut(this.shortcutWindowRect());
            this._shortcutWindow.setHandler("ok", this.onShortcutOk.bind(this));
            this._shortcutWindow.setHandler("cancel", this.onShortcutCancel.bind(this));
            this._shortcutWindow.setHandler("shift", this.onShortcutRemove.bind(this));
            this._shortcutWindow.hide();
            this._shortcutWindow.deactivate();
            this.addWindow(this._shortcutWindow);
        }
        onRegistShortcutOrUseOk() {
            if (this._registShortcutOrUseWindow.currentSymbol() === "registShortcut") {
                this._registShortcutOrUseWindow.deactivate();
                this._shortcutWindow.refresh();
                this._shortcutWindow.show();
                this._shortcutWindow.activate();
            } else if (this._registShortcutOrUseWindow.currentSymbol() === "use") {
                this.onUseItem();
                this._registShortcutOrUseWindow.deactivate();
                this._registShortcutOrUseWindow.hide();
            } else {
                throw new Error(`${this._registShortcutOrUseWindow.currentSymbol()} is not found.`);
            }
        }
        onRegistShortcutOrUseCancel() {
            this._registShortcutOrUseWindow.deactivate();
            this._registShortcutOrUseWindow.hide();
            this._itemWindow.activate();
        }
        onShortcutOk() {
            this._registShortcutOrUseWindow.activate();
            this._registShortcutOrUseWindow.show();
            this._shortcutWindow.deactivate();
            this._shortcutWindow.hide();
            const actorId = this.actor().actorId();
            $shortcutStatus.setShortcut(actorId, this._shortcutWindow.index(), new Game_Item(this.item()));
            $shortcutTempData.mapSelectIndex = this._shortcutWindow.index();
        }
        onShortcutCancel() {
            this._registShortcutOrUseWindow.activate();
            this._registShortcutOrUseWindow.show();
            this._shortcutWindow.deactivate();
            this._shortcutWindow.hide();
        }
        onShortcutRemove() {
            this._shortcutWindow.removeShortcut();
            this._shortcutWindow.refresh();
        }
        onActorCancel() {
            this.hideActorWindow();
            this._registShortcutOrUseWindow.show();
            this._registShortcutOrUseWindow.activate();
        }
        onItemOk() {
            const item = this._itemWindow.item();
            this._itemWindow.deactivate();
            this._registShortcutOrUseWindow.setUseItemEnabled(this._itemWindow.isCurrentItemEnabled());
            let useRegisterShortcutEnabled = false;
            if (import_ARPG_Utils.ARPG_Utils.hasActionItem(item) && this._actor === $gameParty.leader()) {
                useRegisterShortcutEnabled = true;
            }
            this._registShortcutOrUseWindow.setUseRegisterShortcutEnabled(useRegisterShortcutEnabled);
            this._registShortcutOrUseWindow.refresh();
            this._registShortcutOrUseWindow.show();
            this._registShortcutOrUseWindow.activate();
        }
        registShortcutOrUseWindowRect() {
            const w = DialogWindowWidth;
            const h = 120;
            const x = (Graphics.boxWidth - w) / 2;
            const y = (Graphics.boxHeight - h) / 2;
            return new Rectangle(x, y, w, h);
        }
        shortcutWindowRect() {
            const registShortcutOrUseWindowRect = this.registShortcutOrUseWindowRect();
            const w = 50 * $shortcutStatus.numSlots();
            const h = 70;
            const x = (Graphics.boxWidth - w) / 2;
            const y = registShortcutOrUseWindowRect.y + registShortcutOrUseWindowRect.height;
            return new Rectangle(x, y, w, h);
        }
    };

    // ts/ARPG_ItemShortcut/Scene_Item.ts
    var import_mixin = __require("CommonLibrary/mixin");
    var _Scene_Item_create = Scene_Item.prototype.create;
    Scene_Item.prototype.create = function() {
        _Scene_Item_create.call(this);
        this.createItemShortcutWindows();
    };
    var _Scene_Item_update = Scene_Item.prototype.update;
    Scene_Item.prototype.update = function() {
        _Scene_Item_update.call(this);
        if (this._shortcutWindow.index() < 0) {
            this._shortcutWindow.select($shortcutTempData.itemMenuSelectIndex);
        } else {
            $shortcutTempData.itemMenuSelectIndex = this._shortcutWindow.index();
        }
    };
    Scene_Item.prototype.onUseItem = function() {
        $gameParty.setLastItem(this.item());
        this.determineItem();
    };
    (0, import_mixin.mixin)(Scene_Item, ShortcutRegisterSceneModule);

    // ts/ARPG_ItemShortcut/Scene_Skill.ts
    var import_mixin2 = __require("CommonLibrary/mixin");
    var _Scene_Skill_create = Scene_Skill.prototype.create;
    Scene_Skill.prototype.create = function() {
        _Scene_Skill_create.call(this);
        this.createItemShortcutWindows();
    };
    var _Scene_Skill_update = Scene_Skill.prototype.update;
    Scene_Skill.prototype.update = function() {
        _Scene_Skill_update.call(this);
        if (this._shortcutWindow.index() < 0) {
            this._shortcutWindow.select($shortcutTempData.skillMenuSelectIndex);
        } else {
            $shortcutTempData.skillMenuSelectIndex = this._shortcutWindow.index();
        }
    };
    Scene_Skill.prototype.onUseItem = function() {
        this.actor().setLastMenuSkill(this.item());
        this.determineItem();
    };
    (0, import_mixin2.mixin)(Scene_Skill, ShortcutRegisterSceneModule);

    // ts/ARPG_ItemShortcut/Game_Map.ts
    var import_mixin3 = __require("CommonLibrary/mixin");
    var _Game_Map_Mixin = class extends Game_Map {
        // NOTE: アイテム入手時にショートカットをリフレッシュする。
        refresh() {
            _Game_Map_Mixin._refresh.call(this);
            $shortcutTempData.requestRefreshShortcutWindow();
        }
    };
    var Game_Map_Mixin = _Game_Map_Mixin;
    Game_Map_Mixin._refresh = Game_Map.prototype.refresh;
    (0, import_mixin3.mixin)(Game_Map, Game_Map_Mixin);

    // ts/ARPG_ItemShortcut/Spriteset_Map.ts
    Spriteset_Map.prototype.addShortcutLabel = function(shortcutLabel) {
        this._baseSprite.addChild(shortcutLabel);
    };

    // ts/ARPG_ItemShortcut/Window_SkillList.ts
    var import_mixin4 = __require("CommonLibrary/mixin");
    var import_ARPG_Utils2 = __require("ARPG_Core/ARPG_Utils");
    var Window_SkillList_Mixin = class extends Window_SkillList {
        processOk() {
            const hasAction = import_ARPG_Utils2.ARPG_Utils.hasActionItem(this.item());
            if (this.isCurrentItemEnabled() || hasAction) {
                this.playOkSound();
                this.updateInputData();
                this.deactivate();
                this.callOkHandler();
            } else {
                this.playBuzzerSound();
            }
        }
        drawItem(index) {
            const skill = this.itemAt(index);
            if (skill) {
                const costWidth = this.costWidth();
                const rect = this.itemLineRect(index);
                const enabled = this.isEnabled(skill) || import_ARPG_Utils2.ARPG_Utils.hasActionItem(skill);
                this.changePaintOpacity(enabled);
                this.drawItemName(skill, rect.x, rect.y, rect.width - costWidth);
                this.drawSkillCost(skill, rect.x, rect.y, rect.width);
                this.changePaintOpacity(1);
            }
        }
    };
    (0, import_mixin4.mixin)(Window_SkillList, Window_SkillList_Mixin);

    // ts/ARPG_ItemShortcut/Window_ItemList.ts
    var import_ARPG_Utils3 = __require("ARPG_Core/ARPG_Utils");
    var import_mixin5 = __require("CommonLibrary/mixin");
    var Window_ItemList_Mixin = class extends Window_ItemList {
        processOk() {
            const hasAction = import_ARPG_Utils3.ARPG_Utils.hasActionItem(this.item());
            if (this.isCurrentItemEnabled() || hasAction) {
                this.playOkSound();
                this.updateInputData();
                this.deactivate();
                this.callOkHandler();
            } else {
                this.playBuzzerSound();
            }
        }
        drawItem(index) {
            const item = this.itemAt(index);
            if (item) {
                const numberWidth = this.numberWidth();
                const rect = this.itemLineRect(index);
                const enabled = this.isEnabled(item) || import_ARPG_Utils3.ARPG_Utils.hasActionItem(item);
                this.changePaintOpacity(enabled);
                this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
                this.drawItemNumber(item, rect.x, rect.y, rect.width);
                this.changePaintOpacity(1);
            }
        }
    };
    (0, import_mixin5.mixin)(Window_ItemList, Window_ItemList_Mixin);

    // ts/ARPG_ItemShortcut/PlayerBehavior.ts
    var import_ARPG_Utils4 = __require("ARPG_Core/ARPG_Utils");
    var import_PlayerBehavior = __require("ARPG_Core/PlayerBehavior");
    var import_Component = __require("CommonLibrary/Component");
    var import_mixin6 = __require("CommonLibrary/mixin");
    var _PlayerBehavior_Mixin = class extends import_PlayerBehavior.PlayerBehavior {
        setup() {
            _PlayerBehavior_Mixin._onInit.call(this);
            this.addComponent(new UseShortcutItemProcess());
        }
    };
    var PlayerBehavior_Mixin = _PlayerBehavior_Mixin;
    PlayerBehavior_Mixin._onInit = import_PlayerBehavior.PlayerBehavior.prototype.setup;
    (0, import_mixin6.mixin)(import_PlayerBehavior.PlayerBehavior, PlayerBehavior_Mixin);
    var UseShortcutItemProcess = class extends import_Component.Component {
        update() {
            super.update();
            let requested = $shortcutTempData.checkUseShortcutItemRequested();
            const keysym = import_ARPG_Utils4.ARPG_Utils.getKeySymbol("UseShortcutItem");
            if (keysym && Input.isTriggered(keysym)) {
                requested = true;
            }
            if (requested) {
                this.useShortcutItem();
            }
        }
        useShortcutItem() {
            const actorId = $gameParty.leader().actorId();
            const index = SceneManager._scene._shortcutWindow.index();
            const item = $shortcutStatus.shortcut(actorId, index);
            if (item) {
                let skillOrItem;
                if (item.isSkill()) {
                    skillOrItem = "skill";
                } else {
                    skillOrItem = "item";
                }
                this.user().battler().useSkill(skillOrItem, item.object().id);
            } else {
                SoundManager.playBuzzer();
            }
        }
    };

    // ts/ARPG_ItemShortcut/ShortcutTempData.ts
    var ShortcutTempData = class {
        constructor() {
            this._itemMenuSelectIndex = 0;
            this._skillMenuSelectIndex = 0;
            this._mapSelectIndex = 0;
            this._refreshShortcutWindowRequest = false;
            this._useShortcutItemRequest = false;
        }
        get itemMenuSelectIndex() {
            return this._itemMenuSelectIndex;
        }
        set itemMenuSelectIndex(value) {
            this._itemMenuSelectIndex = value;
        }
        get skillMenuSelectIndex() {
            return this._skillMenuSelectIndex;
        }
        set skillMenuSelectIndex(value) {
            this._skillMenuSelectIndex = value;
        }
        get mapSelectIndex() {
            return this._mapSelectIndex;
        }
        set mapSelectIndex(value) {
            this._mapSelectIndex = value;
        }
        checkRefreshShortcutWindowRequest() {
            let result = this._refreshShortcutWindowRequest;
            this._refreshShortcutWindowRequest = false;
            return result;
        }
        requestRefreshShortcutWindow() {
            this._refreshShortcutWindowRequest = true;
        }
        requestUseShortcutItem() {
            this._useShortcutItemRequest = true;
        }
        checkUseShortcutItemRequested() {
            if (this._useShortcutItemRequest) {
                this._useShortcutItemRequest = false;
                return true;
            }
            return false;
        }
    };

    // ts/ARPG_ItemShortcut/ShortcutStatus.ts
    var ShortcutStatus = class {
        constructor() {
            this._shortcutInfos = [];
            this._mapItemShortcutEnabled = true;
        }
        setShortcut(actorId, index, item) {
            if (this._shortcutInfos[actorId] == null) {
                this._shortcutInfos[actorId] = [];
            }
            this._shortcutInfos[actorId][index] = item;
        }
        shortcut(actorId, index) {
            if (this._shortcutInfos[actorId] == null) {
                return void 0;
            }
            return this._shortcutInfos[actorId][index];
        }
        numSlots() {
            return ARPG_ItemShortcutPluginParams.NumShortcutSlots;
        }
        refresh() {
            for (const keyActorId in this._shortcutInfos) {
                for (let i = 0; i < this._shortcutInfos[keyActorId].length; i++) {
                    const item = this._shortcutInfos[keyActorId][i];
                    if (item && item.isSkill()) {
                        const actor = $gameActors.actor(parseInt(keyActorId));
                        if (actor && !actor.isLearnedSkill(item.itemId())) {
                            this._shortcutInfos[keyActorId][i] = void 0;
                        }
                    }
                }
            }
        }
        isEnabledItemShortcut() {
            if (!$gameMap.isEnabledARPGMode())
                return false;
            if (!this._mapItemShortcutEnabled)
                return false;
            return true;
        }
        enableItemShortcut() {
            this._mapItemShortcutEnabled = true;
        }
        disableItemShortcut() {
            this._mapItemShortcutEnabled = false;
        }
        clear(actorId) {
            if (actorId == null) {
                for (const keyActorId in this._shortcutInfos) {
                    this._shortcutInfos[keyActorId] = [];
                }
            } else {
                this._shortcutInfos[actorId] = [];
            }
        }
        remove(actorId, slotIndex) {
            if (this._shortcutInfos[actorId][slotIndex] != null) {
                this._shortcutInfos[actorId][slotIndex] = void 0;
                return true;
            }
            return false;
        }
        makeSaveData() {
            const saveData = {
                shortcutInfos: {},
                mapItemShortcutEnabled: this._mapItemShortcutEnabled
            };
            for (const keyActorId in this._shortcutInfos) {
                const infos = this._shortcutInfos[keyActorId];
                saveData.shortcutInfos[keyActorId] = [];
                for (let i = 0; i < this.numSlots(); i++) {
                    const info = infos[i];
                    if (info) {
                        let infoData = {};
                        if (info.isSkill()) {
                            infoData.dataClass = "skill";
                        } else {
                            infoData.dataClass = "item";
                        }
                        infoData.itemId = info.itemId();
                        saveData.shortcutInfos[keyActorId].push(infoData);
                    } else {
                        saveData.shortcutInfos[keyActorId].push(null);
                    }
                }
            }
            return saveData;
        }
        loadSaveData(saveData) {
            if (typeof saveData.shortcutInfos !== "undefined") {
                this.loadSaveData_V1_3_1(saveData);
            } else {
                this.loadSaveData_V1_3_0(saveData);
            }
        }
        loadSaveData_V1_3_0(saveData) {
            for (const keyActorId in saveData) {
                const actorId = parseInt(keyActorId);
                const infoDatas = saveData[keyActorId];
                this._shortcutInfos[actorId] = [];
                infoDatas.forEach((infoData, i) => {
                    if (infoData) {
                        let item = new Game_Item();
                        if (infoData.dataClass === "skill") {
                            item.setObject($dataSkills[infoData.itemId]);
                        } else {
                            item.setObject($dataItems[infoData.itemId]);
                        }
                        this._shortcutInfos[actorId][i] = item;
                    }
                });
            }
        }
        loadSaveData_V1_3_1(saveData) {
            for (const keyActorId in saveData.shortcutInfos) {
                const actorId = parseInt(keyActorId);
                const infoDatas = saveData.shortcutInfos[keyActorId];
                this._shortcutInfos[actorId] = [];
                infoDatas.forEach((infoData, i) => {
                    if (infoData) {
                        let item = new Game_Item();
                        if (infoData.dataClass === "skill") {
                            item.setObject($dataSkills[infoData.itemId]);
                        } else {
                            item.setObject($dataItems[infoData.itemId]);
                        }
                        this._shortcutInfos[actorId][i] = item;
                    }
                });
            }
            this._mapItemShortcutEnabled = saveData.mapItemShortcutEnabled;
        }
    };

    // ts/ARPG_ItemShortcut/DataManager.ts
    var _DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function() {
        _DataManager_createGameObjects.call(this);
        $shortcutStatus = new ShortcutStatus();
        $shortcutTempData = new ShortcutTempData();
    };
    var _DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        const result = _DataManager_makeSaveContents.call(this);
        result.shortcutStatus = $shortcutStatus.makeSaveData();
        return result;
    };
    var _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        _DataManager_extractSaveContents.call(this, contents);
        $shortcutStatus = new ShortcutStatus();
        $shortcutStatus.loadSaveData(contents.shortcutStatus);
    };

    // ts/ARPG_ItemShortcut/Main.ts
    var import_ARPG_Battler = __require("ARPG_Core/ARPG_Battler");
    var import_PluginParamsParser = __require("CommonLibrary/PluginParamsParser");
    var import_ARPG_Utils5 = __require("ARPG_Core/ARPG_Utils");
    var ARPG_ItemShortcutPluginName = document.currentScript ? decodeURIComponent(document.currentScript.src.match(/^.*\/(.+)\.js$/)[1]) : "ARPG_ItemShortcut";
    var ARPG_ItemShortcutPluginParams = import_PluginParamsParser.PluginParamsParser.parse(PluginManager.parameters(ARPG_ItemShortcutPluginName));
    if (ARPG_ItemShortcutPluginParams.KeySetting.UseShortcutItem != null) {
        import_ARPG_Utils5.ARPG_Utils.registerKey("UseShortcutItem", ARPG_ItemShortcutPluginParams.KeySetting.UseShortcutItem);
    }
    window.useItemShortcut = true;
    PluginManager.registerCommand(ARPG_ItemShortcutPluginName, "ClearShortcut", function(args) {
        const params = import_PluginParamsParser.PluginParamsParser.parse(args);
        $shortcutStatus.clear(params.ActorId);
    });
    PluginManager.registerCommand(ARPG_ItemShortcutPluginName, "ChangeShortcutEnableOrDisable", function(args) {
        const params = import_PluginParamsParser.PluginParamsParser.parse(args);
        if (params.EnableOrDisable) {
            $shortcutStatus.enableItemShortcut();
        } else {
            $shortcutStatus.disableItemShortcut();
        }
    });
    PluginManager.registerCommand(ARPG_ItemShortcutPluginName, "UseShortcutItem", function(args) {
        $shortcutTempData.requestUseShortcutItem();
    });
    import_ARPG_Battler.ARPG_Battler.prototype.requestRefreshShortcutWindowHook = function() {
        $shortcutTempData.requestRefreshShortcutWindow();
    };
})();

require = __tmp__require;

