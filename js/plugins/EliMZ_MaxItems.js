//============================================================================
// Eli_MaxItems.js
//============================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc ♦5.0.0♦ Set a individual limit for each item through note tags.
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-max-items-for-rpg-maker

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
==============================================================================
Features
==============================================================================

● Limit the maximum amount of each item/weapon/armor the player can have 
through the item note tag using numbers or variable value.
● Surpass the 99 item limit.

==============================================================================
How to use
==============================================================================

To assign a maximum quantity for each item, put in the notes field:
    <MaxAmount: yy> * It is case sensitive
Replace 'yy' with the amount you want.
You can use \v[id] to set a max value from a variable value or can use 
formulas.

============================================================================
Update Log
============================================================================

https://tinyurl.com/maxItemsLog

============================================================================

@param maxDefault
@text Max Default
@type Number
@desc Set here the max numbers that a item can have by default. Default is 99.
@default 99

@param includeEquip
@text Include Equip
@type boolean
@desc If true, equipped items will count to to hit the maximum value too.
@default false

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_MaxItems = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.MaxItems = {

    version: 5.00,
    url: "https://hakuenstudio.itch.io/eli-max-items-for-rpg-maker",
    parameters: {maxDefault: 99, includeEquip: false},
    alias: {},
    extraCount: 0,
    numberTextWidth: '',

    initialize(){
        this.initParameters()
        this.initPluginCommands()
        this.numberTextWidth = this.createMaxNumberWidth()
    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()
    },

    initPluginCommands(){},

    createMaxNumberWidth(){
        let maxNumbers = String(this.param().maxDefault).length
        let text = ''
        while(maxNumbers--){
            text += "0"
        }
        return text
    },

    param(){
        return this.parameters
    },  

}

const Plugin = Eli.MaxItems
const Alias = Eli.MaxItems.alias

Plugin.initialize()

/* ------------------------------- GAME PARTY ------------------------------- */
{

Alias.Game_Party_maxItems = Game_Party.prototype.maxItems
Game_Party.prototype.maxItems = function(item) {
    const alias = Alias.Game_Party_maxItems.call(this, item)
    
    if(item && item.meta.hasOwnProperty("MaxAmount")){
        return this.getCustomMaxItemAmount(item)
    }else{
        return Plugin.param().maxDefault || alias
    }
}

Game_Party.prototype.getCustomMaxItemAmount = function(item){
    const maxItem = Eli.Utils.processEscapeVarOrFormula(item.meta.MaxAmount)
    const equippedItems = this.getEquippedItemAmount(item)
    const result = Number(maxItem) - equippedItems + Plugin.extraCount

    return result
}

Game_Party.prototype.getEquippedItemAmount = function(item){
    let equippedItems = 0

    if(Plugin.param().includeEquip && !DataManager.isItem(item)){

        for(const actor of this.members()){

            for(const equip of actor.equips()){
                equippedItems += equip === item ? 1 : 0
            }

        }
    }

    return equippedItems
}

}

/* ------------------------------- GAME ACTOR ------------------------------- */
{

Alias.Game_Actor_changeEquip = Game_Actor.prototype.changeEquip
Game_Actor.prototype.changeEquip = function(slotId, item) {
    this.setExtraCount(slotId, item)
    Alias.Game_Actor_changeEquip.call(this, slotId, item)
    Plugin.extraCount = 0
}

Game_Actor.prototype.setExtraCount = function(slotId, item){
    if(this.equips()[slotId] && item !== this.equips()[slotId]){
        Plugin.extraCount = 1
    }else{
        Plugin.extraCount = 0
    }
}

}

/* ------------------------------- WINDOW ITEM ------------------------------ */
{

//Overwrite
Window_ItemList.prototype.numberWidth = function() {
    return this.textWidth(Plugin.numberTextWidth);
}

//Overwrite
Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
    if (this.needsNumber()) {
        this.drawText(":", x, y, width - this.numberWidth(), "right");
        this.drawText($gameParty.numItems(item), x, y, width, "right");
    }
}


}

}