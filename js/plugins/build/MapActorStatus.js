/*!/*:
@target MZ
@plugindesc MapActorStatus v1.1.0
@author unagi ootoro

@help
This plugin displays actor status on the map.

【How to use】
When the switch, which is specified by the plug-in parameter "Map Actor Status Enable Switch ID", is turned on, the actor's status is displayed on the map.

@param EnableMapActorStatusSwitchId
@text Map Actor Status Enable Switch ID
@type switch
@default 0
@desc
Specifies the switch ID that activates the actor's status display on the map. if 0 is specified, it is always enabled.

@param LeaderOnly
@text Show first character only
@type boolean
@default false
@desc
If ON is set, only the first character will be subject to status display.

@param StatusAreaX
@text Status Area X
@type number
@default 40
@desc
Specifies the display X coordinate of the status area.

@param StatusAreaY
@text Status Area Y
@type number
@default 480
@desc
Specifies the display Y coordinate of the status area.

@param StatusAreaSpace
@text Status Area Display Interval
@type number
@default 260
@desc
Specify the display interval of the status area for each actor.

@param GaugeWidth
@text Gauge width
@type number
@default 128
@desc
Specify the gauge width.

@param GaugeHeight
@text Gauge Height
@type number
@default 24
@desc
Specify the gauge height.
*/
/*!/*:ja
@target MZ
@plugindesc マップアクターステータス v1.1.0
@author うなぎおおとろ

@help
マップ上にアクターのステータスを表示するプラグインです。

【使用方法】
プラグインパラメータ「マップアクターステータス有効化スイッチID」で指定した
スイッチがONになるとアクターのステータスをマップ上に表示します。

@param EnableMapActorStatusSwitchId
@text マップアクターステータス有効化スイッチID
@type switch
@default 0
@desc
マップ上でのアクターのステータス表示を有効化するスイッチIDを指定します。0を指定した場合常に有効になります。

@param LeaderOnly
@text 先頭キャラクターのみ表示
@type boolean
@default false
@desc
ONを設定すると先頭キャラクターのみをステータス表示の対象とします。

@param StatusAreaX
@text ステータスエリアX
@type number
@default 40
@desc
ステータスエリアの表示X座標を指定します。

@param StatusAreaY
@text ステータスエリアY
@type number
@default 480
@desc
ステータスエリアの表示Y座標を指定します。

@param StatusAreaSpace
@text ステータスエリア表示間隔
@type number
@default 260
@desc
アクターごとのステータスエリアの表示間隔を指定します。

@param GaugeWidth
@text ゲージ横幅
@type number
@default 128
@desc
ゲージの横幅を指定します。

@param GaugeHeight
@text ゲージ縦幅
@type number
@default 24
@desc
ゲージの縦幅を指定します。
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

    // ts/MapActorStatus/MapActorStatus.ts
    var MapActorStatusPluginName = document.currentScript ? decodeURIComponent(document.currentScript.src.match(/^.*\/(.+)\.js$/)[1]) : "MapActorStatus";
    var MapActorStatusPluginParams = PluginParamsParser.parse(PluginManager.parameters(MapActorStatusPluginName));
    var ActorContainer = class extends PIXI.Container {
        constructor(x, y) {
            super();
            this.x = x;
            this.y = y;
            this.createHpGauge();
            this.createMpGauge();
            if ($dataSystem.optDisplayTp) {
                this.createTpGauge();
            }
            this.createActorImage();
            this.createNameLabel();
            this._lastStates = [];
            this._stateSprites = [];
        }
        static get GAUGE_START_X() {
            return 64;
        }
        static get GAUGE_SPACE_X() {
            return 16;
        }
        static get GAUGE_START_Y() {
            return 12;
        }
        static get GAUGE_SPACE_Y() {
            return 0;
        }
        update() {
            for (const child of this.children) {
                if (child.update)
                    child.update();
            }
            this.updateStateIcons();
        }
        createHpGauge() {
            this._hpGauge = new Sprite_MapGauge();
            this._hpGauge.x = ActorContainer.GAUGE_START_X;
            this._hpGauge.y = ActorContainer.GAUGE_START_Y;
            this.addChild(this._hpGauge);
        }
        createMpGauge() {
            this._mpGauge = new Sprite_MapGauge();
            this._mpGauge.x = ActorContainer.GAUGE_START_X + ActorContainer.GAUGE_SPACE_X;
            this._mpGauge.y = ActorContainer.GAUGE_START_Y + this._hpGauge.height + ActorContainer.GAUGE_SPACE_Y;
            this.addChild(this._mpGauge);
        }
        createTpGauge() {
            this._tpGauge = new Sprite_MapGauge();
            this._tpGauge.x = this._mpGauge.x + ActorContainer.GAUGE_SPACE_X;
            this._tpGauge.y = this._mpGauge.y + this._mpGauge.height + ActorContainer.GAUGE_SPACE_Y;
            this.addChild(this._tpGauge);
        }
        createActorImage() {
            this._actorImage = new Sprite_ActorImage();
            this._actorImage.x -= 8;
            this._actorImage.y = this._hpGauge.height / 4;
            this.addChild(this._actorImage);
        }
        createNameLabel() {
            this._nameLabel = new Sprite_Label(80, 16, { fontSize: 16, align: "center" });
            this._nameLabel.anchor.x = 0.5;
            this._nameLabel.anchor.y = 0;
            this._nameLabel.x = this._actorImage.x + 144 * 0.5 / 2;
            this._nameLabel.y = this._mpGauge.y + 32;
            this.addChild(this._nameLabel);
        }
        setup(actor) {
            this._actor = actor;
            this._actorImage.setup(actor);
            this._nameLabel.text = actor.name();
            this._hpGauge.setup(actor, "hp");
            this._mpGauge.setup(actor, "mp");
            this._tpGauge?.setup(actor, "tp");
        }
        delete() {
            this._actorImage.bitmap?.destroy();
            this._nameLabel.bitmap?.destroy();
        }
        updateStateIcons() {
            if (!this._actor)
                return;
            const stateIds = this._actor.states().map((state) => state.id);
            if (!this._lastStates.equals(stateIds)) {
                this._lastStates = stateIds;
                for (const sprite of this._stateSprites) {
                    this.removeChild(sprite);
                }
                this._stateSprites = [];
                for (let i = 0; i < stateIds.length; i++) {
                    const sprite = new Sprite_Icon();
                    sprite.x = this._nameLabel.x + i * 32;
                    sprite.y = this._nameLabel.y + this._nameLabel.height;
                    const state = $dataStates[stateIds[i]];
                    sprite.setIconIndex(state.iconIndex);
                    this._stateSprites.push(sprite);
                    this.addChild(sprite);
                }
            }
        }
    };
    var PartyContainer = class extends PIXI.Container {
        constructor(x, y) {
            super();
            this._actorContainers = [];
            this._lastMembers = [];
            this.x = x;
            this.y = y;
        }
        update() {
            for (const child of this.children) {
                if (child.update)
                    child.update();
            }
            this.visible = this.isMapActorStatusEnabled();
            this.updateActorContainers();
        }
        updateActorContainers() {
            let members;
            if (MapActorStatusPluginParams.LeaderOnly) {
                members = [$gameParty.leader()];
            } else {
                members = $gameParty.members();
            }
            if (this._lastMembers.equals(members))
                return;
            if (this._lastMembers.length < members.length) {
                for (let i = this._lastMembers.length; i < members.length; i++) {
                    const actorContainer = new ActorContainer(i * MapActorStatusPluginParams.StatusAreaSpace, 0);
                    this._actorContainers.push(actorContainer);
                    this.addChild(actorContainer);
                }
            } else if (this._lastMembers.length > members.length) {
                for (let i = members.length; i < this._lastMembers.length; i++) {
                    const deleteContainers = this._actorContainers.splice(i, 1);
                    for (const deleteContainer of deleteContainers) {
                        this.removeChild(deleteContainer);
                        deleteContainer.delete();
                    }
                }
            }
            members.forEach((actor, i) => {
                this._actorContainers[i].setup(actor);
            });
            this._lastMembers = members;
        }
        isMapActorStatusEnabled() {
            if (MapActorStatusPluginParams.EnableMapActorStatusSwitchId === 0)
                return true;
            return $gameSwitches.value(MapActorStatusPluginParams.EnableMapActorStatusSwitchId);
        }
    };
    var Sprite_ActorImage = class extends Sprite {
        initialize() {
            super.initialize();
            this._actor = void 0;
        }
        update() {
            super.update();
            this.updateActorImage();
        }
        setup(actor) {
            this._actor = actor;
            this.refresh();
        }
        updateActorImage() {
            if (!this._actor || this._actor === this._lastActor)
                return;
            this.refresh();
            this._lastActor = this._actor;
        }
        refresh() {
            if (!this._actor)
                return;
            if (this.bitmap) {
                this.bitmap.destroy();
            }
            const faceName = this._actor.faceName();
            const faceIndex = this._actor.faceIndex();
            const faceBitmap = ImageManager.loadFace(faceName);
            if (!faceBitmap.isReady())
                return;
            const dstBitmap = new Bitmap(144, 144);
            this.actorImageDrawFace(dstBitmap, faceBitmap, faceIndex);
            this.bitmap = dstBitmap;
            this.scale.x = 0.5;
            this.scale.y = 0.5;
        }
        actorImageDrawFace(dstBitmap, faceBitmap, faceIndex) {
            const tmpBitmap = this.createSingleFaceBitmap(faceBitmap, faceIndex);
            let ctx = dstBitmap.context;
            let x = 0;
            let y = 0;
            let w = dstBitmap.width;
            let h = dstBitmap.height;
            let len = 8;
            ctx.beginPath();
            ctx.moveTo(x + w / 2, y + len);
            ctx.lineTo(x + w - len, y + h / 2);
            ctx.lineTo(x + w / 2, y + h - len);
            ctx.lineTo(x + len, y + h / 2);
            ctx.closePath();
            const cx = dstBitmap.width / 2;
            const cy = dstBitmap.height / 2;
            const grdCx = dstBitmap.width / 3;
            const grdCy = dstBitmap.height / 3;
            const r = dstBitmap.width / 2;
            const grd = ctx.createRadialGradient(grdCx, grdCy, 0, cx, cy, r);
            grd.addColorStop(0, "#aaaaff");
            grd.addColorStop(0.99, "#ffffaa");
            grd.addColorStop(1, "#ffffff");
            ctx.strokeStyle = "#88ffff";
            ctx.lineWidth = len;
            ctx.lineCap = "round";
            ctx.stroke();
            ctx.clip();
            ctx.drawImage(tmpBitmap.canvas, 0, 0);
        }
        createSingleFaceBitmap(faceBitmap, faceIndex) {
            const dstBitmap = new Bitmap(144, 144);
            const pw = ImageManager.faceWidth;
            const ph = ImageManager.faceHeight;
            const sw = Math.min(dstBitmap.width, pw);
            const sh = Math.min(dstBitmap.height, ph);
            const sx = faceIndex % 4 * pw + (pw - sw) / 2;
            const sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
            dstBitmap.blt(faceBitmap, sx, sy, pw, ph, 0, 0);
            return dstBitmap;
        }
    };
    var Sprite_Icon = class extends Sprite {
        setIconIndex(iconIndex) {
            if (iconIndex > 0) {
                if (!this.bitmap) {
                    this.bitmap = ImageManager.loadSystem("IconSet");
                }
                const iconFrame = this.iconFrame(iconIndex);
                this.setFrame(iconFrame.x, iconFrame.y, iconFrame.width, iconFrame.height);
            } else {
                this.bitmap = null;
            }
        }
        iconFrame(iconIndex) {
            let pw, ph;
            if (Utils.RPGMAKER_NAME === "MZ") {
                pw = ImageManager.iconWidth;
                ph = ImageManager.iconHeight;
            } else {
                pw = 32;
                ph = 32;
            }
            const sx = iconIndex % 16 * pw;
            const sy = Math.floor(iconIndex / 16) * ph;
            return new Rectangle(sx, sy, pw, ph);
        }
    };
    var Sprite_Label = class extends Sprite {
        constructor(...args) {
            super(...args);
        }
        initialize(...args) {
            super.initialize();
            let width;
            let height;
            let opt;
            if (args.length === 2) {
                [width, height] = args;
                opt = {};
            } else {
                [width, height, opt] = args;
            }
            this._text = "";
            this._align = opt.align ?? "left";
            this.bitmap = new Bitmap(width, height);
            this.bitmap.fontFace = opt.fontFace ?? $gameSystem.mainFontFace();
            this.bitmap.fontSize = opt.fontSize ?? $gameSystem.mainFontSize();
        }
        get text() {
            return this._text;
        }
        set text(_text) {
            this._text = _text;
            this.redrawText();
        }
        get fontSize() {
            return this.bitmap.fontSize;
        }
        set fontSize(_fontSize) {
            this.bitmap.fontSize = _fontSize;
            this.redrawText();
        }
        get fontFace() {
            return this.bitmap.fontFace;
        }
        set fontFace(_fontFace) {
            this.bitmap.fontFace = _fontFace;
            this.redrawText();
        }
        get align() {
            return this.bitmap.fontFace;
        }
        set align(_align) {
            this._align = _align;
            this.redrawText();
        }
        redrawText() {
            if (this._text === "") {
                this.hide();
            } else {
                this.show();
                this.bitmap.clear();
                this.bitmap.drawText(this._text, 0, 0, this.bitmap.width, this.bitmap.fontSize, this._align);
            }
        }
    };
    var Sprite_MapGauge = class extends Sprite_Gauge {
        createBitmap() {
            const width = this.bitmapWidth() + this.bitmapLen();
            const height = this.bitmapHeight();
            this.bitmap = new Bitmap(width, height);
        }
        gaugeX() {
            return this.labelOutlineWidth() / 2;
        }
        labelY() {
            return 0;
        }
        drawLabel() {
            const label = this.label();
            const x = this.labelOutlineWidth() + 24;
            const y = this.labelY();
            const width = this.bitmapWidth();
            const height = this.bitmapHeight();
            this.setupLabelFont();
            this.bitmap.paintOpacity = this.labelOpacity();
            this.bitmap.drawText(label, x, y, width, height, "left");
            this.bitmap.paintOpacity = 255;
        }
        drawGauge() {
            const gaugeX = this.gaugeX();
            const gaugeY = this.bitmapHeight() - this.gaugeHeight();
            const gaugewidth = this.bitmapWidth() - gaugeX;
            const gaugeHeight = this.gaugeHeight();
            this.drawGaugeRect(gaugeX, gaugeY, gaugewidth, gaugeHeight);
        }
        drawGaugeRect(x, y, width, height) {
            const rate = this.gaugeRate();
            const fillX = x + 1;
            const fillY = y + 1;
            const fillW = Math.floor((width - 2) * rate);
            const fillH = height - 2;
            const color0 = this.gaugeBackColor();
            const color1 = this.gaugeColor1();
            const color2 = this.gaugeColor2();
            let ctx = this.bitmap.context;
            let len = 8;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(x + len, y);
            ctx.lineTo(x + len + width, y);
            ctx.lineTo(x + width, y + height);
            ctx.lineTo(x, y + height);
            ctx.closePath();
            ctx.fillStyle = color0;
            ctx.fill();
            ctx = this.bitmap.context;
            ctx.beginPath();
            ctx.moveTo(fillX + len, fillY);
            ctx.lineTo(fillX + len + fillW, fillY);
            ctx.lineTo(fillX + fillW, fillY + fillH);
            ctx.lineTo(fillX, fillY + fillH);
            ctx.closePath();
            const grad = ctx.createLinearGradient(fillX, y, fillX + fillW, fillY + fillH);
            grad.addColorStop(0, color1);
            grad.addColorStop(1, color2);
            ctx.fillStyle = grad;
            ctx.fill();
        }
        bitmapLen() {
            return 20;
        }
        bitmapWidth() {
            return MapActorStatusPluginParams.GaugeWidth;
        }
        bitmapHeight() {
            return MapActorStatusPluginParams.GaugeHeight;
        }
        gaugeHeight() {
            return this.bitmapHeight() - 12;
        }
    };
    var _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
    Spriteset_Map.prototype.createLowerLayer = function() {
        _Spriteset_Map_createLowerLayer.call(this);
        this.createPartyContainer();
    };
    Spriteset_Map.prototype.createPartyContainer = function() {
        this._partyContainer = new PartyContainer(MapActorStatusPluginParams.StatusAreaX, MapActorStatusPluginParams.StatusAreaY);
        this.addChild(this._partyContainer);
    };
})();

require = __tmp__require;

