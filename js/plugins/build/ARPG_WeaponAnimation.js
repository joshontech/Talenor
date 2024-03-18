/*!/*:
@target MZ
@plugindesc ARPG_WeaponAnimation v1.1.1
@author unagi ootoro
@base ARPG_Core

@help
This plug-in introduces a simple weapon swing animation display function to the ARPG plugin.

【How to use】
The plug-in command "Weapon Animation" can be used to display a weapon swing animation on the character.

For weapon IDs, specify the index shown on the [SV] Attack Motions on System2 of Database.
The ID of the top is 1 and then counts up. For example, the weapon ID of Sword is 2.

【Required Plug-ins】
When installing this plugin, "ARPG_Core.js v1.4.0" or later is required.
Please install this plugin in the following order.
・DotMoveSystem.js
・DotMoveSystem_FunctionEx.js
・SelfVariable.js
・ARPG_Core.js
・ARPG_WeaponAnimation.js

@command WeaponAnimation
@text Weapon Animation
@desc Display weapon animation.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specify the target character.

@arg WeaponImageId
@type number
@text Weapon Image ID
@default 2
@desc Specify the weapon image ID.

@arg Wait
@text wait
@type boolean
@default true
@desc If true is specified, it will wait until animation display is complete.

@arg SE
@text SE
@type struct<SE>
@default {"FileName":"","Volume":"90","Pitch":"100","Pan":"0"}
@desc Specify the SE to be displayed during weapon animation playback.
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
Specify the character type by variable.

@param EventIdOrName
@text event ID or event name
@type string
@default 1
@desc
Specify the event ID or event name when an event is specified for the character type.

@param EventIdByVariable
@text event ID (specify variable)
@type variable
@default 0
@desc
Specify the event ID of the target event when an event is specified for the character type by variable.

@param FollowerIndex
@text FollowerIndex
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
Specify the order of target followers by variable when follower is specified as the character type.

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
@text Vehicle type (variable specification)
@type variable
@default 0
@desc
Specify the target vehicle by variable when a vehicle is specified for the character type.
*/
/*!/*~struct~SE:
@param FileName
@text SE file name
@type file
@dir audio/se
@desc
Specify the SE file name to be played.

@param Volume
@text SE volume
@type number
@default 90
@desc
Specify the volume of SE to be played.

@param Pitch
@text SE pitch
@type number
@default 100
@desc
Specify the pitch of the SE to be played.

@param Pan
@text SE phase
@type number
@default 0
@desc
Specify the pan of SE to be played.
*/
/*!/*:ja
@target MZ
@plugindesc ARPG武器振りアニメーション v1.1.1
@author うなぎおおとろ
@base ARPG_Core

@help
ARPGプラグインに簡易的な武器振りアニメーション表示機能を導入するプラグインです。

【使用方法】
プラグインコマンド「武器アニメーション」を実行することで
キャラクターに武器振りアニメーションを表示することができます。

プラグインコマンドで指定する武器IDについてはデータベースの
「システム2」の[SV]攻撃にあるタイプのうち目的のものについて
1を先頭として順に上から数えた番号を指定してください。
例えば剣の場合、武器ID=2となります。

【必須プラグイン】
本プラグインを使用するには「ARPG_Core.js v1.4.0」以降が必要になります。
本プラグインの導入順については以下のように導入してください。
・DotMoveSystem.js
・DotMoveSystem_FunctionEx.js
・SelfVariable.js
・ARPG_Core.js
・ARPG_WeaponAnimation.js

@command WeaponAnimation
@text 武器アニメーション
@desc 武器アニメーションを表示します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg WeaponImageId
@type number
@text 武器画像ID
@default 2
@desc 武器画像IDを指定します。

@arg Wait
@text ウェイト
@type boolean
@default true
@desc trueを指定すると、アニメーション表示完了までウェイトします。

@arg SE
@text SE
@type struct<SE>
@default {"FileName":"","Volume":"90","Pitch":"100","Pan":"0"}
@desc 武器アニメーション再生時に表示するSEを指定します。
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
/*!/*~struct~SE:ja
@param FileName
@text SEファイル名
@type file
@dir audio/se
@desc
再生するSEのファイル名を指定します。

@param Volume
@text SE音量
@type number
@default 90
@desc
再生するSEのvolumeを指定します。

@param Pitch
@text SEピッチ
@type number
@default 100
@desc
再生するSEのpitchを指定します。

@param Pan
@text SE位相
@type number
@default 0
@desc
再生するSEのpanを指定します。
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

    // ts/ARPG_WeaponAnimation/Sprite_MapWeapon.ts
    var Sprite_MapWeapon = class extends Sprite_Weapon {
        initialize() {
            super.initialize();
            this.inner = new Point();
        }
        initMembers() {
            super.initMembers();
            this.anchor.x = 0.5;
            this.anchor.y = 0.5;
            this.hide();
        }
        update() {
            Sprite.prototype.update.call(this);
        }
    };

    // ts/ARPG_WeaponAnimation/Sprite_Character.ts
    Sprite_Character.prototype.createMapWeaponSprite = function(weaponImageId) {
        this._weaponSprite = new Sprite_MapWeapon();
        this._weaponSprite.z = 0;
        this.changeWeaponSprite(weaponImageId);
        this.addInnerChild(this._weaponSprite);
    };
    Sprite_Character.prototype.changeWeaponSprite = function(weaponImageId) {
        this._weaponSprite.setup(weaponImageId);
    };
    Sprite_Character.prototype.deleteMapWeaponSprite = function() {
        this.removeInnerChild(this._weaponSprite);
    };

    // ts/ARPG_WeaponAnimation/Spriteset_Map.ts
    Spriteset_Base.prototype.createAnimationSprite = function(targets, animation, mirror, delay) {
        let sprite;
        const matchData = animation.name.match(/\<particle\:\s*(.+?)\>/);
        if (matchData) {
            const className = matchData[1];
            sprite = new window[className]();
        } else {
            const mv = this.isMVAnimation(animation);
            sprite = new (mv ? Sprite_AnimationMV : Sprite_Animation)();
        }
        const targetSprites = this.makeTargetSprites(targets);
        const baseDelay = this.animationBaseDelay();
        const previous = delay > baseDelay ? this.lastAnimationSprite() : null;
        if (this.animationShouldMirror(targets[0])) {
            mirror = !mirror;
        }
        sprite.targetObjects = targets;
        sprite.setup(targetSprites, animation, mirror, delay, previous);
        this._effectsContainer.addChild(sprite);
        this._animationSprites.push(sprite);
    };

    // ts/ARPG_WeaponAnimation/SwordAttackProcessor.ts
    var import_Degree = __require("CommonLibrary/Degree");
    var import_Processor = __require("CommonLibrary/Processor");
    var SwordAttackProcessor = class extends import_Processor.Processor {
        constructor(weaponImageId) {
            super();
            this._weaponImageId = weaponImageId;
        }
        start() {
            super.start();
            const sprite = this.user().getSprite();
            sprite.createMapWeaponSprite(this._weaponImageId);
            this._weaponSprite = sprite._weaponSprite;
        }
        *process() {
            this._weaponSprite.show();
            switch (this.user().direction()) {
                case 8:
                    yield* this.upAttack();
                    break;
                case 6:
                    yield* this.rightAttack();
                    break;
                case 2:
                    yield* this.downAttack();
                    break;
                case 4:
                    yield* this.leftAttack();
                    break;
                default:
                    throw new Error(`${this.user().direction()} is not found.`);
            }
        }
        terminate() {
            super.terminate();
            const sprite = this.user().getSprite();
            sprite.deleteMapWeaponSprite();
        }
        *upAttack() {
            const req = { id: -1, offsetX: -20, offsetY: -20, angle: 90 };
            this.showAnimation(req);
            this._weaponSprite.inner.x = 4;
            this._weaponSprite.inner.y = -40;
            for (let angle = 360 + 90; angle >= 270; angle -= 16) {
                this._weaponSprite.rotation = new import_Degree.Degree(angle - 45).toRad();
                yield;
            }
        }
        *rightAttack() {
            const req = { id: -1, mirror: true };
            this.showAnimation(req);
            this._weaponSprite.inner.x = 0;
            this._weaponSprite.inner.y = -10;
            for (let angle = 0; angle <= 180; angle += 16) {
                this._weaponSprite.rotation = new import_Degree.Degree(angle - 45).toRad();
                yield;
            }
        }
        *downAttack() {
            const req = { id: -1, offsetX: 20, offsetY: -20, angle: 270 };
            this.showAnimation(req);
            this._weaponSprite.inner.x = 0;
            this._weaponSprite.inner.y = -10;
            for (let angle = 270; angle >= 90; angle -= 16) {
                this._weaponSprite.rotation = new import_Degree.Degree(angle - 45).toRad();
                yield;
            }
        }
        *leftAttack() {
            const req = { id: -1 };
            this.showAnimation(req);
            this._weaponSprite.inner.x = 0;
            this._weaponSprite.inner.y = -10;
            for (let angle = 360; angle >= 180; angle -= 16) {
                this._weaponSprite.rotation = new import_Degree.Degree(angle - 45).toRad();
                yield;
            }
        }
        showAnimation(request) {
            const mirror = request.mirror;
            const animation = {
                displayType: 0,
                effectName: "SlashPhysical",
                flashTimings: [],
                name: "Slash<particle: Sprite_SwordAnimation>",
                offsetX: 0,
                offsetY: 0,
                rotation: {
                    x: 0,
                    y: 0,
                    z: 90
                },
                scale: 50,
                soundTimings: [],
                speed: 200,
                timings: []
            };
            if (request.x != null) {
                animation.rotation.x = request.x;
            }
            if (request.y != null) {
                animation.rotation.y = request.y;
            }
            if (request.z != null) {
                animation.rotation.z = request.z;
            }
            if (request.scale != null) {
                animation.scale = request.scale;
            }
            if (request.offsetX != null) {
                animation.offsetX = request.offsetX;
            }
            if (request.offsetY != null) {
                animation.offsetY = request.offsetY;
            }
            if (request.angle != null) {
                animation.angle = request.angle;
            }
            SceneManager._scene._spriteset.createAnimationSprite([this.user()], animation, mirror, 0);
        }
    };

    // ts/ARPG_WeaponAnimation/Game_Character.ts
    Game_Character.prototype.showWeaponMotion = function(weaponImageId, se) {
        this._weaponMotionPlaying = true;
        AudioManager.playSe(se);
        if (this._weaponMotionComponent) {
            this._weaponMotionComponent.end(true);
        }
        this._weaponMotionComponent = new SwordAttackProcessor(weaponImageId);
        this.addComponent(this._weaponMotionComponent);
    };
    Game_Character.prototype.isWeaponMotionPlaying = function() {
        return this._weaponMotionPlaying;
    };
    var _Game_Character_update = Game_Character.prototype.update;
    Game_Character.prototype.update = function() {
        _Game_Character_update.call(this);
        if (!this._weaponMotionComponent)
            return;
        if (this._weaponMotionComponent.isTerminated()) {
            this._weaponMotionPlaying = false;
            this._weaponMotionComponent = void 0;
        }
    };

    // ts/ARPG_WeaponAnimation/Game_Interpreter.ts
    var import_mixin = __require("CommonLibrary/mixin");
    var _Game_Interpreter_Mixin = class extends Game_Interpreter {
        initialize() {
            _Game_Interpreter_Mixin._initialize.call(this);
            this._needAttackMotionWait = false;
        }
        updateWait() {
            const result = _Game_Interpreter_Mixin._updateWait.call(this);
            if (result)
                return true;
            return this.updateWait_ARPG_ItemShortcut();
        }
        updateWait_ARPG_ItemShortcut() {
            const character = this.arpgCharacter();
            if (!character)
                return false;
            if (this._needAttackMotionWait) {
                if (character.isWeaponMotionPlaying()) {
                    return true;
                } else {
                    this._needAttackMotionWait = false;
                    return false;
                }
            }
            return false;
        }
    };
    var Game_Interpreter_Mixin = _Game_Interpreter_Mixin;
    Game_Interpreter_Mixin._initialize = Game_Interpreter.prototype.initialize;
    Game_Interpreter_Mixin._updateWait = Game_Interpreter.prototype.updateWait;
    (0, import_mixin.mixin)(Game_Interpreter, Game_Interpreter_Mixin);

    // ts/ARPG_WeaponAnimation/Sprite_ParticleAnimation.ts
    var Sprite_ParticleAnimation = class extends Sprite {
        get container() {
            return this._container;
        }
        initialize() {
            super.initialize();
            this._playing = false;
            this._frameIndex = 0;
            this._maxTimingFrames = 0;
            this._flashColor = [0, 0, 0, 0];
            this._flashDuration = 0;
            this._container = new PIXI.Container();
            this.addChild(this._container);
        }
        setup(targets, animation, mirror, delay, previous) {
            this._targets = targets;
            this._animation = animation;
            this._mirror = mirror;
            this._delay = delay;
            this._previous = previous;
            if (mirror)
                this.scale.x *= -1;
            this._playing = true;
            const timings = animation.soundTimings.concat(animation.flashTimings);
            for (const timing of timings) {
                if (timing.frame > this._maxTimingFrames) {
                    this._maxTimingFrames = timing.frame;
                }
            }
        }
        update() {
            if (this._delay > 0) {
                this._delay--;
            } else {
                if (!this._playing)
                    return;
                if (this._targets.length > 0) {
                    const target = this._targets[0];
                    this.x = target.x;
                    this.y = target.y;
                    if (this._animation.offsetX != null)
                        this.x += this._animation.offsetX;
                    if (this._animation.offsetY != null)
                        this.y += this._animation.offsetY;
                }
                this.updateMain();
                this.updateFlash();
                if (this._animation.angle != null)
                    this.rotation = this._animation.angle * Math.PI / 180;
                for (const child of this._container.children) {
                    if (child.update)
                        child.update();
                }
            }
        }
        addParticle(particle) {
            this._container.addChild(particle);
        }
        removeParticle(particle) {
            this._container.removeChild(particle);
        }
        end() {
            this._playing = false;
        }
        isPlaying() {
            return this._playing;
        }
        updateMain() {
            this.processSoundTimings();
            this.processFlashTimings();
            this._frameIndex++;
        }
        processSoundTimings() {
            for (const timing of this._animation.soundTimings) {
                if (timing.frame === this._frameIndex) {
                    AudioManager.playSe(timing.se);
                }
            }
        }
        processFlashTimings() {
            for (const timing of this._animation.flashTimings) {
                if (timing.frame === this._frameIndex) {
                    this._flashColor = timing.color.clone();
                    this._flashDuration = timing.duration;
                }
            }
        }
        updateFlash() {
            if (this._flashDuration > 0) {
                const d = this._flashDuration--;
                this._flashColor[3] *= (d - 1) / d;
                for (const target of this._targets) {
                    target.setBlendColor(this._flashColor);
                }
            }
        }
        // TODO: 暫定対応
        restoreBackupInfo(backupInfo) {
        }
    };

    // ts/ARPG_WeaponAnimation/Sprite_SwordAnimation.ts
    var Sprite_SwordAnimation = class extends Sprite_ParticleAnimation {
        initialize() {
            super.initialize();
            this._end = false;
            this._time = 0;
            this._count = 0;
            this._maxCount = 48 * 2;
            this._sprites = new Array(this._maxCount);
            for (let i = 0; i < this._maxCount; i++) {
                const rate = i / this._maxCount;
                const x = -Math.sin(rate * Math.PI) * 64;
                const y = i;
                const len = Math.sin(rate * Math.PI) * 32;
                const lifespan = 16;
                const sprite = new SlashSprite(len, lifespan);
                this._sprites[i] = sprite;
                sprite.x = x;
                sprite.y = y - 64;
                sprite.hide();
                this.addParticle(sprite);
            }
        }
        update() {
            super.update();
            if (this._sprites.every((s) => s.isEnd())) {
                this.end();
                return;
            }
            for (let i = 0; i < 10; i++) {
                this.updateAnimation();
            }
            this._time++;
        }
        updateAnimation() {
            if (this._count >= this._maxCount)
                return;
            const sprite = this._sprites[this._count];
            sprite.show();
            this._count++;
        }
    };
    var SlashSprite = class extends Sprite {
        constructor(...args) {
            super(...args);
        }
        initialize(...args) {
            super.initialize();
            const [len, lifespan] = args;
            this._len = len;
            this._lifespan = lifespan;
            this._time = 0;
            const bitmap = new Bitmap(len, 1);
            const ctx = bitmap.context;
            const grd = ctx.createLinearGradient(0, 0, len, 1);
            grd.addColorStop(0, "#8888ff");
            grd.addColorStop(0.05, "#ffffff");
            grd.addColorStop(0.75, "#8888ff");
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, len, 1);
            this.bitmap = bitmap;
        }
        update() {
            super.update();
            this.opacity = Math.floor((1 - this._time / this._lifespan) * 255);
            this._time++;
            if (this.isEnd())
                this.hide();
        }
        isEnd() {
            return this._time >= this._lifespan;
        }
    };

    // ts/ARPG_WeaponAnimation/Main.ts
    var import_PluginParamsParser = __require("CommonLibrary/PluginParamsParser");
    window.Sprite_SwordAnimation = Sprite_SwordAnimation;
    var ARPG_WeaponAnimationPluginName = document.currentScript ? decodeURIComponent(document.currentScript.src.match(/^.*\/(.+)\.js$/)[1]) : "ARPG_WeaponAnimation";
    PluginManager.registerCommand(ARPG_WeaponAnimationPluginName, "WeaponAnimation", function(args) {
        const params = import_PluginParamsParser.PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        const se = {
            name: params.SE.FileName,
            volume: params.SE.Volume,
            pitch: params.SE.Pitch,
            pan: params.SE.Pan,
            pos: params.SE.Pos
        };
        character.showWeaponMotion(params.WeaponImageId, se);
        if (params.Wait) {
            this._needAttackMotionWait = true;
        }
    });
})();

require = __tmp__require;

