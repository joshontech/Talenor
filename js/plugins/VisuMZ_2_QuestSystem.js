//=============================================================================
// VisuStella MZ - Quest Journal System
// VisuMZ_2_QuestSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_QuestSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.QuestSystem = VisuMZ.QuestSystem || {};
VisuMZ.QuestSystem.version = 1.17;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.17] [QuestSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Quest_Journal_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * A quest journal is a very important tool provided by game developers for the
 * players. It lists various quests, missions, and objectives that the player
 * can pursue in order to progress further into the game. This can be helpful
 * in reminding the player what needs to be done in the event the player can
 * forget what things there are to do in a vast and large RPG world.
 *
 * This plugin places a quest journal system into your RPG Maker MZ game. You
 * can set up how the quest journal appears, move its windows around and/or
 * reshape them to fit your game.
 *
 * You can adjust the quest's title, display a difficulty level, remind the
 * player who the quest is from, where that quest is from, various dynamic
 * descriptions explaining the quest, a list of objectives to make, a list of
 * rewards that will be given to the player once the quest is complete, and any
 * subtext footnotes and quotes you may wish to insert into each quest.
 *
 * *NOTE*
 *
 * Keep in mind that while this plugin does enable a quest journal system into
 * your game, this plugin will NOT automate it. If you have a quest enabled, it
 * is still up to you to add the quest properly into the journal, set its many
 * objectives, when the other objectives appear, what the rewards are, and then
 * giving out the rewards yourself manually. The purpose of this plugin is to
 * simply serve as a visual record for your player to see what quests have been
 * handed down to him or her.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Unlimited quest categories.
 * * Unlimited quest slots.
 * * Full control over what appears in the quest journal system and how it
 *   appears in-game.
 * * Update quest descriptions, objectives, rewards, subtexts, etc. mid-game
 *   through the use of Plugin Commands.
 * * A dedicated quest menu that's accessible from the Main Menu or by
 *   Plugin Command call.
 * * A quest tracker that appears in the map scene to keep the player updated
 *   on how far they are progressing in their current quest.
 * * Options for the player to show/hide the quest tracker and reposition its
 *   location on the screen.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Explanation - Categories and Quests
 * ============================================================================
 *
 * The following is an explanation on the differences between Categories and
 * Quests for the usage of this plugin.
 *
 * ---
 *
 * Categories
 *
 * Quest Categories separate the quest types in your game. These can be used to
 * help players differentiate which are story-driven quests, which are optional
 * quests, recurring quests, etc. These have limited settings, but serve as
 * containers for quests that fall under its category.
 *
 * ---
 *
 * Plugin Parameters > Categories > Category Name:
 *
 * This is the category's name. It appears however you type it using text
 * codes, allowing you to color-code it if needed.
 *
 * ---
 *
 * Plugin Parameters > Categories > Quests:
 * 
 * These contain the quests that are listed under this category. Enter in as
 * many as needed/desired.
 *
 * ---
 *
 * Quests
 *
 * Each Quest Category will contain a list of quests that can appear in-game.
 * These individual quests make up the meat and bones of the Quest System and
 * will serve to relay information to the player on what he/she needs to do in
 * order to make progress in your game.
 *
 * ---
 *
 * Plugin Parameters > General > Log Window > Quest Log
 *
 * This determines how the template used by the quest logs to parse information
 * regarding the quests themselves. By default, they are formatted like such:
 *
 * ---
 *
 * \{[[Title]]\}
 * \c[4]Level:\c[0] [[Difficulty]]
 * \c[4]From:\c[0] [[From]]
 * \c[4]Location:\c[0] [[Location]]
 * 
 * \c[4]Description:\c[0]
 * [[Description]]
 * 
 * \c[4]Objectives:\c[0]
 * [[Objectives]]
 * 
 * \c[4]Rewards:\c[0]
 * [[Rewards]]
 * 
 * [[Subtext]]
 * 
 * [[Quote]]
 *
 * ---
 * 
 * Each [[Marker]] is to be replaced by the quest date related to them.
 *
 * - [[Title]] - Inserts the title of the quest.
 * 
 * - [[RawTitle]] - Inserts the title of the quest without any text codes
 *   removed. Keep in mind that icons do NOT resize based on the text size.
 *
 * - [[Difficulty]] - Inserts the quest difficulty text.
 *
 * - [[From]] - Inserts the quest origin text.
 *
 * - [[Location]] - Inserts the quest location text.
 *
 * - [[Description]] - Inserts the currently active quest description.
 *   - The quest description can change depending on which Description ID
 *     is currently active for that quest.
 *
 * - [[Objectives]] - Inserts a list of the visible quest objectives.
 *   - The quest objectives visible to the player will be determined by
 *     the quest's Visible Objectives settings and any Plugin Commands
 *     used to alter which objectives are visible and what state they are
 *     currently in (known, completed, failed).
 *
 * - [[Rewards]] - Inserts a list of visible quest rewards.
 *   - The quest rewards visible to the player will be determined by the
 *     quest's Visible Rewards settings and any Plugin Commands used to
 *     alter which rewards are visible and what state they are currently
 *     in (known, claimed, denied).
 *
 * - [[Subtext]] - Inserts the currently active quest subtext.
 *   - The quest subtext can change depending on which Subtext ID is
 *     currently active for that quest.
 *
 * - [[Quote]] - Inserts the currently active quest quote.
 *   - The quest quote can change depending on which Quote ID is
 *     currently active for that quest.
 *
 * ---
 *
 * Each of the following aspects of the quests can be changed through the usage
 * of Plugin Commands:
 *
 * - Description
 * - Objectives
 * - Rewards
 * - Subtext
 * - Quote
 *
 * The following are the Plugin Commands that can change them:
 *
 * - Quest: Description Change
 * - Quest: Objectives Change
 * - Quest: Rewards Change
 * - Quest: Subtext Change
 * - Quest: Quote Change
 *
 * ---
 *
 * More information will be explained in their respective Plugin Parameter
 * sections further down in the help file.
 *
 * ============================================================================
 * Control Variable and Conditional Branch Usage
 * ============================================================================
 * 
 * For those wanting to use Control Variable event commands and/or Conditional
 * Branch event commands with the Quest Journal System plugin, you can insert
 * the following functions into the "Script" input fields of the respective
 * event commands.
 * 
 * These are new JavaScript functions added through this plugin and will not
 * work without it.
 * 
 * ---
 * 
 * === Control Variable Script Functions ===
 * 
 * These are newly added JavaScript functions that return a numeric value.
 * The functions are best used with the Control Variable script input field.
 * 
 * ---
 * 
 * totalQuestsAvailable()
 * 
 * - Returns the total number of quests available for the player.
 * 
 * ---
 * 
 * totalQuestsCompleted()
 * 
 * - Returns the total number of quests completed by the player.
 * 
 * ---
 * 
 * totalQuestsFailed()
 * 
 * - Returns the total number of quests failed by the player.
 * 
 * ---
 * 
 * totalQuestsRevealed()
 * 
 * - Returns the total number of quests visible to the player.
 * 
 * ---
 * 
 * totalQuestsInGame()
 * 
 * - Returns the total number of quests available in-game.
 * 
 * ---
 * 
 * getQuestDescriptionIndex(questKey)
 * 
 * - Returns the select quest's current description index ID.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: getQuestDescriptionIndex('Welcome')
 * 
 * ---
 * 
 * totalVisibleQuestObjectives(questKey)
 * 
 * - Returns the total number of visible quest objectives for selected quest.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: totalVisibleQuestObjectives('Welcome')
 * 
 * ---
 * 
 * totalQuestObjectives(questKey)
 * 
 * - Returns the total number of quest objectives for selected quest.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: totalQuestObjectives('Welcome')
 * 
 * ---
 * 
 * totalVisibleQuestRewards(questKey)
 * 
 * - Returns the total number of visible quest rewards for selected quest.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: totalVisibleQuestRewards('Welcome')
 * 
 * ---
 * 
 * totalQuestRewards(questKey)
 * 
 * - Returns the total number of quest rewards for selected quest.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: totalQuestRewards('Welcome')
 * 
 * ---
 * 
 * getQuestSubtextIndex(questKey)
 * 
 * - Returns the select quest's current subtext index ID.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: getQuestSubtextIndex('Welcome')
 * 
 * ---
 * 
 * getQuestQuoteIndex(questKey)
 * 
 * - Returns the select quest's current subtext index ID.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: getQuestQuoteIndex('Welcome')
 * 
 * ---
 * 
 * === Conditional Branch Script Functions ===
 * 
 * These are newly added JavaScript functions that return a true/false value.
 * The functions are best used with the Conditional Branch script input field.
 * 
 * ---
 * 
 * isQuestObjectiveCompleted(questKey, objectiveID)
 * 
 * - Returns a true/false value depending on the selected quest's objective
 *   and if it is completed.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest objective you want
 *   to check.
 * - Example: isQuestObjectiveCompleted('Welcome', 1)
 * 
 * ---
 * 
 * isQuestObjectiveFailed(questKey, objectiveID)
 * 
 * - Returns a true/false value depending on the selected quest's objective
 *   and if it is failed.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest objective you want
 *   to check.
 * - Example: isQuestObjectiveFailed('Welcome', 1)
 * 
 * ---
 * 
 * isQuestObjectiveUncleared(questKey, objectiveID)
 * 
 * - Returns a true/false value depending on the selected quest's objective
 *   and if it is uncleared.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest objective you want
 *   to check.
 * - Example: isQuestObjectiveUncleared('Welcome', 1)
 * 
 * ---
 * 
 * isQuestRewardClaimed(questKey, rewardID)
 * 
 * - Returns a true/false value depending on the selected quest's reward
 *   and if it is claimed.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest reward you want
 *   to check.
 * - Example: isQuestRewardClaimed('Welcome', 1)
 * 
 * ---
 * 
 * isQuestRewardDenied(questKey, rewardID)
 * 
 * - Returns a true/false value depending on the selected quest's reward
 *   and if it is denied.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest reward you want
 *   to check.
 * - Example: isQuestRewardDenied('Welcome', 1)
 * 
 * ---
 * 
 * isQuestRewardUnclaimed(questKey, rewardID)
 * 
 * - Returns a true/false value depending on the selected quest's reward
 *   and if it is unclaimed.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest reward you want
 *   to check.
 * - Example: isQuestRewardUnclaimed('Welcome', 1)
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Action Tracking-Related Notetags ===
 * 
 * ---
 *
 * <Variable id On Use: +x>
 * <Variable id On Use: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Whenever any actor uses this specific skill or item, increase or decrease
 *   the target variable by a certain amount.
 * - Replace 'id' with the Variable ID you wish to alter.
 * - Replace 'x' with the increase or decrease in value for the variable.
 *
 * ---
 * 
 * === Enemy Tracking-Related Notetags ===
 * 
 * ---
 *
 * <Variable id On Death: +x>
 * <Variable id On Death: -x>
 *
 * - Used for: Enemy Notetags
 * - Whenever this specific enemy dies, increase or decrease the target
 *   variable by a certain amount.
 * - Replace 'id' with the Variable ID you wish to alter.
 * - Replace 'x' with the increase or decrease in value for the variable.
 *
 * ---
 * 
 * === Item Tracking-Related Notetags ===
 * 
 * ---
 *
 * <Variable id On Gain: +x>
 * <Variable id On Gain: -x>
 *
 * - Used Item, Weapon, Armor Notetags
 * - Whenever the party gains the specific item, weapon, or armor, increase or
 *   decrease the target variable by a certai amount.
 * - Replace 'id' with the Variable ID you wish to alter.
 * - Replace 'x' with the increase or decrease in value for the variable.
 * 
 * ---
 *
 * <Variable id On Lose: +x>
 * <Variable id On Lose: -x>
 *
 * - Used Item, Weapon, Armor Notetags
 * - Whenever the party loses the specific item, weapon, or armor, increase or
 *   decrease the target variable by a certai amount.
 * - Replace 'id' with the Variable ID you wish to alter.
 * - Replace 'x' with the increase or decrease in value for the variable.
 *
 * ---
 *
 * <Track With Variable id>
 *
 * - Used Item, Weapon, Armor Notetags
 * - Whenever there is a change made to the specific item, weapon, or armor,
 *   set the value of the target variable to the number of items owned.
 * - Replace 'id' with the Variable ID you wish to alter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Quest Plugin Commands ===
 * 
 * ---
 *
 * Quest: Add/Complete/Fail/Remove
 * - Adds quest(s) to be known/completed/failed.
 * - Or removes them.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Status:
 *   - Change the status to this.
 *     - Add to Known
 *     - Add to Completed
 *     - Add to Failed
 *     - Remove from All
 *
 * ---
 *
 * Quest: Description Change
 * - Changes the description of the quest(s) to a ID.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Description ID:
 *   - Change the description of the quest(s) to a different ID.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Quest: Objectives Change
 * - Changes the objective(s) status of the quest(s).
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Objective ID(s):
 *   - Select the objective ID(s) to change.
 *   - You may use JavaScript code.
 *
 *   Status:
 *   - Change the status of the objective(s) to this.
 *     - Show Objective(s)
 *     - Complete Objective(s)
 *     - Fail Objective(s)
 *     - Remove Objective(s)
 *
 * ---
 *
 * Quest: Quote Change
 * - Changes the quote of the quest(s) to a ID.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Subtext ID:
 *   - Change the quote of the quest(s) to a different ID.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Quest: Rewards Change
 * - Changes the reward(s) status of the quest(s).
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Reward ID(s):
 *   - Select the reward ID(s) to change.
 *   - You may use JavaScript code.
 *
 *   Status:
 *   - Change the status of the reward(s) to this.
 *     - Show Reward(s)
 *     - Claim Reward(s)
 *     - Deny Reward(s)
 *     - Remove Reward(s)
 *
 * ---
 *
 * Quest: Subtext Change
 * - Changes the subtext of the quest(s) to a ID.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Subtext ID:
 *   - Change the subtext of the quest(s) to a different ID.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Label Plugin Commands ===
 * 
 * ---
 * 
 * Label: Add Quest Label
 * - Add Quest Labels to target items, weapons, and armors.
 * 
 *   Item ID(s):
 *   Weapon ID(s):
 *   Armor ID(s):
 *   - Select which Item, Weapon, or Armor ID(s) to add Quest Labels to.
 * 
 * ---
 * 
 * Label: Clear Quest Label
 * - Clear Quest Labels from target items, weapons, and armors.
 * 
 *   Item ID(s):
 *   Weapon ID(s):
 *   Armor ID(s):
 *   - Select which Item, Weapon, or Armor ID(s) to clear Quest Labels from.
 * 
 * ---
 * 
 * === Tracker Plugin Commands ===
 * 
 * ---
 *
 * Tracker: Change Quest
 * - Changes the tracked quest.
 *
 *   Quest Key:
 *   - Insert the quest key here.
 *
 * ---
 *
 * Tracker: Refresh Window
 * - Refreshes the quest tracker window.
 *
 * ---
 *
 * Tracker: Show/Hide Window
 * - Can forcefully hide window.
 * - Showing will depend on the player's Options setting.
 *
 *   Show/Hide?:
 *   - Shows/hides the tracker window on the map.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Call Scene_Quest
 * - Opens Scene_Quest for the player.
 * - Does not work in battle.
 *
 * ---
 *
 * System: Enable Quests in Menu?
 * - Enables/disables quest menu inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables quest menu inside the main menu.
 *
 * ---
 *
 * System: Show Quests in Menu?
 * - Shows/hides quest menu inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides quest menu inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * The general settings determine various aspects of the Quest System plugin
 * from the quests that appear at the start of the game to how it's displayed
 * inside menus.
 *
 * ---
 *
 * Starting Quests
 * 
 *   Known Quests:
 *   - Which quests are known at the start of the game?
 *   - Insert their keys here.
 * 
 *   Completed Quests:
 *   - Which quests are completed at the start of the game?
 *   - Insert their keys here.
 * 
 *   Failed Quests:
 *   - Which quests are failed at the start of the game?
 *   - Insert their keys here.
 * 
 *   Tracked Quest:
 *   - Which quest is tracked at the start of the game?
 *
 * ---
 *
 * Scene_Quest
 *
 * ---
 * 
 * Scene_Quest > Background Settings:
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 * 
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * Scene_Quest > Vocab
 *
 * ---
 * 
 * Scene_Quest > Vocab > Command Window
 * 
 *   Command: Known:
 *   - Text used to display known quests.
 *
 *   Command: Completed:
 *   - Text used to display completed quests.
 * 
 *   Command: Failed:
 *   - Text used to display failed quests.
 *
 * ---
 *
 * Scene_Quest > Vocab > Label Window
 * 
 *   Empty Title:
 *   - Text displayed in the Label Window when no quest is selected.
 *
 * ---
 *
 * Scene_Quest > Vocab > List Window
 * 
 *   Open Categories:
 *   - Text format for an open category.
 *   - %1 - Category Name, %2 - Quest Amount
 * 
 *   Closed Categories:
 *   - Text format for a closed category.
 *   - %1 - Category Name, %2 - Quest Amount
 * 
 *   No Quest Listed:
 *   - Text when no quest is listed.
 * 
 *   Tracked Quest:
 *   - Text format for a tracked quest.
 *   - %1 - Tracked Quest's Name
 *
 * ---
 *
 * Scene_Quest > Vocab > Log Window
 * 
 *   Empty Message:
 *   - Text displayed when no quest is selected.
 *
 *     JS: On Load:
 *     - Runs code upon making the empty message.
 *     - Useful for setting up variables.
 * 
 *   Quest Log:
 *   - Text format for Quest Log Window.
 *   - Instructions:
 *     - Insert the [[Keyword]] marks in the text where you want certain parts
 *       of the quest to appear.
 *
 *       - [[Title]] - Inserts the title of the quest.
 *
 *       - [[Difficulty]] - Inserts the quest difficulty text.
 *
 *       - [[From]] - Inserts the quest origin text.
 *
 *       - [[Location]] - Inserts the quest location text.
 *
 *       - [[Description]] - Inserts the currently active quest description.
 *         - The quest description can change depending on which Description ID
 *           is currently active for that quest.
 *
 *       - [[Objectives]] - Inserts a list of the visible quest objectives.
 *         - The quest objectives visible to the player will be determined by
 *           the quest's Visible Objectives settings and any Plugin Commands
 *           used to alter which objectives are visible and what state they are
 *           currently in (known, completed, failed).
 *
 *       - [[Rewards]] - Inserts a list of visible quest rewards.
 *         - The quest rewards visible to the player will be determined by the
 *           quest's Visible Rewards settings and any Plugin Commands used to
 *           alter which rewards are visible and what state they are currently
 *           in (known, claimed, denied).
 *
 *       - [[Subtext]] - Inserts the currently active quest subtext.
 *         - The quest subtext can change depending on which Subtext ID is
 *           currently active for that quest.
 *
 *       - [[Quote]] - Inserts the currently active quest quote.
 *         - The quest quote can change depending on which Quote ID is
 *           currently active for that quest.
 * 
 *   Objective (Known):
 *   - Text format for known objectives.
 *   - %1 - Objective Text
 * 
 *   Objective (Done):
 *   - Text format for complete objectives.
 *   - %1 - Objective Text
 * 
 *   Objective (Failed):
 *   - Text format for failed objectives.
 *   - %1 - Objective Text
 * 
 *   Reward (Known):
 *   - Text format for normal rewards.
 *   - %1 - Reward Text
 * 
 *   Reward (Claimed):
 *   - Text format for claimed rewards.
 *   - %1 - Reward Text
 * 
 *   Reward (Denied):
 *   - Text format for denied rewards.
 *   - %1 - Reward Text
 *
 * ---
 *
 * Scene_Quest > Vocab > Button Assist Window
 * 
 *   Scroll Up/Down:
 *   - Text for Page Up/Down to scroll log window.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Tracker:
 *   - Text for tracking quests.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Expand:
 *   - Text for expanding categories.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Collapse:
 *   - Text for collapsing categories.
 *   - Requires VisuMZ_0_CoreEngine!
 *
 * ---
 *
 * Scene_Quest > Icons
 * 
 *   Icon: Known:
 *   - Icon used for this command.
 * 
 *   Icon: Completed:
 *   - Icon used for this command.
 * 
 *   Icon: Failed:
 *   - Icon used for this command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quest Category Settings
 * ============================================================================
 *
 * Quest Categories separate the quest types in your game. These can be used to
 * help players differentiate which are story-driven quests, which are optional
 * quests, recurring quests, etc. These have limited settings, but serve as
 * containers for quests that fall under its category.
 *
 * ---
 *
 * Category
 * 
 *   Category Name:
 *   - This category's name.
 *   - You may use text codes.
 * 
 *   Quests:
 *   - A list of quests listed under this category.
 *   - Quests will be listed in the same order as this parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quest Settings
 * ============================================================================
 *
 * Each Quest Category will contain a list of quests that can appear in-game.
 * These individual quests make up the meat and bones of the Quest System and
 * will serve to relay information to the player on what he/she needs to do in
 * order to make progress in your game.
 *
 * ---
 *
 * Quest
 * 
 *   Quest ID Key:
 *   - This quest's identification key. Quests require unique keys for the
 *     plugin to differentiate them.
 *   - It is VERY important that you keep this key unique from other quests in
 *     order for the Quest System to operate properly in your game.
 *
 * ---
 *
 * Header
 * 
 *   Title:
 *   - The title of the quest. This is what appears in-game.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Title]] marker.
 * 
 *   Difficulty:
 *   - Difficulty level for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Difficulty]] marker.
 * 
 *   From:
 *   - Insert the name of the one who issued this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[From]] marker.
 * 
 *   Location:
 *   - Insert location name where this quest was issued.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Location]] marker.
 * 
 *   Description:
 *   - Type out the description(s) used for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Description]] marker.
 *   - The displayed description will depend on the Description ID set through
 *     Plugin Command.
 *   - If no Description ID is set through Plugin Commands, it will default to
 *     a default ID value of 1.
 *
 * ---
 *
 * Lists
 * 
 *   Objectives List:
 *   - The objectives to be completed for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Objectives]] marker.
 *   - Depending on which ID's are set to visible, a list will created at the
 *     marker displaying each of the objectives.
 *    - This can be done thorugh the Visible Objectives parameter or through
 *      Plugin Commands.
 * 
 *   Visible Objectives:
 *   - The objectives that are visible from the start.
 * 
 *   Rewards List:
 *   - The reward list for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Rewards]] marker.
 *   - Depending on which ID's are set to visible, a list will created at the
 *     marker displaying each of the rewards.
 *    - This can be done thorugh the Visible Rewards parameter or through
 *      Plugin Commands.
 * 
 *   Visible Rewards:
 *   - The rewards that are visible from the start.
 *
 * ---
 *
 * Footer
 * 
 *   Subtext:
 *   - Subtext to be displayed with the quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Subtext]] marker.
 *   - The displayed description will depend on the Subtext ID set through
 *     Plugin Command.
 *   - If no Subtext ID is set through Plugin Commands, it will default to
 *     a default ID value of 1.
 * 
 *   Quotes:
 *   - Quotes to be displayed with the quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Quote]] marker.
 *   - The displayed description will depend on the Quote ID set through
 *     Plugin Command.
 *   - If no Quote ID is set through Plugin Commands, it will default to
 *     a default ID value of 1.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Load:
 *   - Runs code upon loading the quest in Scene_Quest.
 *   - Useful for setting up variables.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quest Label Settings
 * ============================================================================
 *
 * Change how Quest Labels apply to your game project. Quest Labels are applied
 * to items, weapons, and armors manually by the you, the game dev, through
 * this plugin's Plugin Commands. They add a "QUEST" text over the icon of the
 * target item(s) and these will be shown to the player inside most windows
 * that show items.
 * 
 * This way, players can instantly recognize which items are quest-related (as
 * long as they are marked by you, the game dev) and make quicker on-the-go
 * decisions such as whether or not to use them or sell them.
 *
 * ---
 *
 * Settings
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the Quest Label.
 * 
 *   Font Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Font Face:
 *   - Font face used for the Quest Label.
 * 
 *   Font Size:
 *   - The font size used for the Quest text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the Quest Label?
 * 
 *   Offset X:
 *   - How much to offset the Quest Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the Quest Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quest Tracker Settings
 * ============================================================================
 *
 * The Quest Tracker Window is a window that appears on the map scene to
 * display the objectives (and other desired information) of the currently
 * tracked quest decided by the player.
 *
 * ---
 *
 * General
 *
 *   Tracker Format:
 *   - Text format for Quest Tracker Window.
 *   - Read help file for instructions.
 * 
 * ---
 * 
 * Fading
 * 
 *   Close Minimum Opacity:
 *   - Minimum opacity when the player is too close to the quest tracker on
 *     the map screen.
 * 
 *   Tracker Fade Speed: 
 *   - Fade speed of the tracker when toggled on/off.
 *   - Lower is slower. Higher is faster.
 *
 * ---
 *
 * Options
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Add Show Tracker?:
 *   - Add the 'Show Tracker' option to the Options menu?
 * 
 *     Option Name:
 *     - Command name of the option.
 * 
 *   Add Position Tracker?:
 *   - Add the 'Position Tracker' option to the Options menu?
 * 
 *     Option Name:
 *     - Command name of the option.
 * 
 *     Option OFF:
 *     - Text displayed when the option is OFF.
 * 
 *     Option ON:
 *     - Text displayed when the option is ON.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Menu Settings
 * ============================================================================
 *
 * Set up the main menu defaults.
 *
 * ---
 *
 * Main Menu Settings
 * 
 *   Command Name:
 *   - Name of the 'Quest' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'Quest' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'Quest' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_Quest.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 * 
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * These settings let you control the various windows that appear in the
 * Scene_Quest menu and the Quest Tracker Window that appears in Scene_Map.
 *
 * ---
 *
 * Command Window
 * 
 *   Show Failed Quests?:
 *   - Show/hide Failed Quests in the command window.
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Quest Label
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Log Window
 * 
 *   PageUp/Down Speed:
 *   - Scroll speed for PageUp/Down.
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 * 
 *   EXPERIMENTAL:
 * 
 *     Automatic Word Wrap?:
 *     - Enables/disables automatic word wrap.
 *     - Requires VisuMZ_1_MessageCore!
 *     - This feature is experimental. Word Wrap does not worth perfectly
 *       with the Log Window, although it performs well enough. This feature
 *       will be updated and completed at a later point in the future. Use it
 *       at your own discretion.
 *
 * ---
 *
 * List Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Tracker Window
 * 
 *   Window Scale:
 *   - How much do you want to scale the Tracker Window's size by?
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * Script Calls
 * ============================================================================
 *
 * The following are Script Calls that can be used with this plugin. These are
 * made for JavaScript proficient users. We are not responsible if you use them
 * incorrectly or for unintended usage.
 *
 * ---
 *
 * $gameSystem.setQuestStatus(key, status)
 * - Changes the quest's completion status.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'status' with one of the following strings (include quotes):
 *   - 'known'
 *   - 'completed'
 *   - 'failed'
 *   - 'removed'
 *
 * Example: $gameSystem.setQuestStatus('exampleName', 'completed')
 *
 * ---
 *
 * $gameSystem.setQuestDescription(key, id)
 * - Changes the quest's description.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'id' with description ID to use.
 *
 * Example: $gameSystem.setQuestDescription('exampleName', 2)
 *
 * ---
 *
 * $gameSystem.setQuestObjectives(key, ids, status)
 * - Changes the quest's objectives.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'ids' with an array of ID's to use.
 * - Replace 'status' with one of the following strings (include quotes):
 *   - 'known'
 *   - 'completed'
 *   - 'failed'
 *   - 'removed'
 *
 * Example: $gameSystem.setQuestDescription('exampleName', [1, 2, 3], 'failed')
 *
 * ---
 *
 * $gameSystem.setQuestRewards(key, ids, status)
 * - Changes the quest's rewards.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'ids' with an array of ID's to use.
 * - Replace 'status' with one of the following strings (include quotes):
 *   - 'known'
 *   - 'claimed'
 *   - 'denied'
 *   - 'removed'
 *
 * Example: $gameSystem.setQuestRewards('exampleName', [1, 3, 5], 'claimed')
 *
 * ---
 *
 * $gameSystem.setQuestSubtext(key, id)
 * - Changes the quest's subtext.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'id' with subtext ID to use.
 *
 * Example: $gameSystem.questSubtext('exampleName', 3)
 *
 * ---
 *
 * $gameSystem.setQuestQuote(key, id)
 * - Changes the quest's quote.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'id' with quote ID to use.
 *
 * Example: $gameSystem.setQuestQuote('exampleName', 4)
 *
 * ---
 *
 * DISCLAIMER:
 *
 * Keep in mind that VisuStella is NOT responsible for your proficiency (or
 * otherwise) of JavaScript.
 *
 * If you get any errors with the custom code, it is up to YOU to fix it.
 * 
 * If you do not understand how any of this section works, do not be afraid.
 * It's not the end of the world.
 * 
 * You can still change the status of the quests and its objectives through the
 * usage of Plugin Commands.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.17: July 13, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Script Call section updated for more clarity.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Label: Add Quest Label
 * **** Add Quest Labels to target items, weapons, and armors.
 * *** Label: Clear Quest Label
 * **** Clear Quest Labels from target items, weapons, and armors.
 * ** New Plugin Parameters added by Irina:
 * *** Quest Label Settings
 * **** Change how Quest Labels apply to your game project. Quest Labels are
 *      applied to items, weapons, and armors manually by the you, the game
 *      dev, through this plugin's Plugin Commands. They add a "QUEST" text
 *      over the icon of the target item(s) and these will be shown to the
 *      player inside most windows that show items.
 * **** This way, players can instantly recognize which items are quest-related
 *      (as long as they are marked by you, the game dev) and make quicker
 *      on-the-go decisions such as whether or not to use them or sell them.
 * 
 * Version 1.16: November 24, 2022
 * * Feature Update!
 * ** Updated Plugin Command "Tracker: Show/Hide Window" cases from "Enable"
 *    and "Disable" to "Show" and "Hide". Update made by Arisu.
 * 
 * Version 1.15: October 6, 2022
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.14: August 18, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia:
 * *** Quest Tracker Settings > Fading > Close Minimum Opacity
 * *** Quest Tracker Settings > Fading > Tracker Fade Speed
 * **** These settings allow you to make the quest tracker become opaque the
 *      moment the player comes near the quest tracker on the screen.
 * 
 * Version 1.13: March 10, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.12: July 9, 2021
 * * Feature Update!
 * ** Improved calculations for determining window size. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Feature!
 * ** Added new [[Marker]] to Quest Log format and Quest Tracker formats.
 * *** [[RawTitle]] - Inserts the title of the quest without any text codes
 *     removed. Keep in mind that icons do NOT resize based on the text size.
 * 
 * Version 1.10: December 11, 2020
 * * Bugs Fixed!
 * ** Quest tracking should now automatically remove itself once a quest is
 *    dubbed complete, failed, or removed. Fix made by Yanfly.
 * 
 * Version 1.09: November 29, 2020
 * * Bug Fixed!
 * ** The Button Assist Window will now properly display the text for expanding
 *    and collapsing quest categories. Fix made by Arisu.
 * 
 * Version 1.08: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 1, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Updates!
 * ** When multiple parallel events are occuring, they will no longer cause lag
 *    by inducing multiple refreshes at a time. Update by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Quest Tracker Settings > Tracker Format
 * **** Text format for Quest Tracker Window. This lets you customize the text
 *      that appears in the Quest Tracker instead of just having the title and
 *      the objectives.
 * 
 * Version 1.06: October 25, 2020
 * * Feature Update!
 * ** If Message Core is not detected, <ColorLock> and </ColorLock> notetags
 *    will be automatically removed. Added by Arisu.
 * 
 * Version 1.05: October 11, 2020
 * * Documentation Update!
 * ** "Control Variable and Conditional Branch Usage" section added for those
 *    who wish to gather data for the script input fields of the mentioned
 *    event commands.
 * 
 * Version 1.04: October 4, 2020
 * * Bug Fixes!
 * ** Quest Tracker window refreshes should no longer cause infinite loops when
 *    used with specific script calls. Fix made by Yanfly.
 * 
 * Version 1.03: September 20, 2020
 * * Documentation Update!
 * ** For all the new features!
 * * New Features!
 * ** New notetags added by Olivia!
 * ** <Variable id On Death: +x> and <Variable id On Death: -x> for enemies.
 * ** <Variable id On Gain: +x> and <Variable id On Gain: -x> for items,
 *    weapons, and armors.
 * ** <Variable id On Lose: +x> and <Variable id On Lose: -x> for items,
 *    weapons, and armors.
 * ** <Track With Variable id> for items, weapons, and armors.
 * ** <Variable id On Use: +x> and <Variable id On Use: -x> for items & skills.
 * 
 * Version 1.02: September 13, 2020
 * * Bugs Fixed!:
 * ** Quest Tracker Window should no longer flicker.
 * 
 * Version 1.01: September 6, 2020
 * * Bug Fixed!
 * ** Disabled track windows no longer appear on the screen for one frame after
 *    leaving a menu of any sort. Fix made by Yanfly.
 * ** Viewing the failed quests no longer crash the game. Fix made by Yanfly.
 * * Feature Update!
 * ** The following Plugin Commands will now automatically update the tracker
 *    if needed. Feature update by Yanfly.
 * *** Quest: Add/Complete/Fail/Remove
 * *** Quest: Description Change
 * *** Quest: Objectives Change
 * *** Quest: Quote Change
 * *** Quest: Rewards Change
 * *** Quest: Subtext Change
 *
 * Version 1.00: August 31, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestSet
 * @text Quest: Add/Complete/Fail/Remove
 * @desc Adds quest(s) to be known/completed/failed.
 * Or removes them.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg Status:str
 * @text Status
 * @type select
 * @option Add to Known
 * @value known
 * @option Add to Completed
 * @value completed
 * @option Add to Failed
 * @value failed
 * @option Remove from All
 * @value remove
 * @desc Change the status to this.
 * @default known
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestDescription
 * @text Quest: Description Change
 * @desc Changes the description of the quest(s) to a ID.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetID:eval
 * @text Description ID
 * @desc Change the description of the quest(s) to a different ID.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestObjectives
 * @text Quest: Objectives Change
 * @desc Changes the objective(s) status of the quest(s).
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetIDs:arrayeval
 * @text Objective ID(s)
 * @type string[]
 * @desc Select the objective ID(s) to change.
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Status:str
 * @text Status
 * @type select
 * @option Show Objective(s)
 * @value show
 * @option Complete Objective(s)
 * @value complete
 * @option Fail Objective(s)
 * @value fail
 * @option Remove Objective(s)
 * @value remove
 * @desc Change the status of the objective(s) to this.
 * @default show
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestQuote
 * @text Quest: Quote Change
 * @desc Changes the quote of the quest(s) to a ID.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetID:eval
 * @text Quote ID
 * @desc Change the quote of the quest(s) to a different ID.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestRewards
 * @text Quest: Rewards Change
 * @desc Changes the reward(s) status of the quest(s).
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetIDs:arrayeval
 * @text Reward ID(s)
 * @type string[]
 * @desc Select the reward ID(s) to change.
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Status:str
 * @text Status
 * @type select
 * @option Show Reward(s)
 * @value show
 * @option Claim Reward(s)
 * @value claim
 * @option Deny Reward(s)
 * @value deny
 * @option Remove Reward(s)
 * @value remove
 * @desc Change the status of the reward(s) to this.
 * @default show
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestSubtext
 * @text Quest: Subtext Change
 * @desc Changes the subtext of the quest(s) to a ID.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetID:eval
 * @text Subtext ID
 * @desc Change the subtext of the quest(s) to a different ID.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Label
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LabelAddQuestLabel
 * @text Label: Add Quest Label
 * @desc Add Quest Labels to target items, weapons, and armors.
 *
 * @arg ItemIDs:arraynum
 * @text Item ID(s)
 * @type item[]
 * @desc Select which Item ID(s) to add Quest Labels to.
 * @default []
 *
 * @arg WeaponIDs:arraynum
 * @text Weapon ID(s)
 * @type weapon[]
 * @desc Select which Weapon ID(s) to add Quest Labels to.
 * @default []
 *
 * @arg ArmorIDs:arraynum
 * @text Armor ID(s)
 * @type armor[]
 * @desc Select which Armor ID(s) to add Quest Labels to.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LabelClearQuestLabel
 * @text Label: Clear Quest Label
 * @desc Clear Quest Labels from target items, weapons, and armors.
 *
 * @arg ItemIDs:arraynum
 * @text Item ID(s)
 * @type item[]
 * @desc Select which Item ID(s) to clear Quest Labels from.
 * @default []
 *
 * @arg WeaponIDs:arraynum
 * @text Weapon ID(s)
 * @type weapon[]
 * @desc Select which Weapon ID(s) to clear Quest Labels from.
 * @default []
 *
 * @arg ArmorIDs:arraynum
 * @text Armor ID(s)
 * @type armor[]
 * @desc Select which Armor ID(s) to clear Quest Labels from.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Tracker
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TrackerChangeQuest
 * @text Tracker: Change Quest
 * @desc Changes the tracked quest.
 *
 * @arg Key:str
 * @text Quest Key
 * @desc Insert the quest key here.
 * @default Example
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TrackerRefreshWindow
 * @text Tracker: Refresh Window
 * @desc Refreshes the quest tracker window.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TrackerShowHide
 * @text Tracker: Show/Hide Window
 * @desc Can forcefully hide window.
 * Showing will depend on the player's Options setting.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides the tracker window on the map.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemCallSceneQuest
 * @text System: Call Scene_Quest
 * @desc Opens Scene_Quest for the player.
 * Does not work in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableQuestMenu
 * @text System: Enable Quests in Menu?
 * @desc Enables/disables quest menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables quest menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowQuestMenu
 * @text System: Show Quests in Menu?
 * @desc Shows/hides quest menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides quest menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QuestSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings for the Quest System.
 * @default {"StartingQuests":"","KnownQuests:arraystr":"[\"Welcome\",\"Example\",\"Plugin_Tutorial_Title\",\"Plugin_Tutorial_Difficulty\",\"Plugin_Tutorial_From\",\"Plugin_Tutorial_Description\",\"Plugin_Tutorial_Objectives\",\"Plugin_Tutorial_Rewards\",\"Plugin_Tutorial_Subtext\",\"Plugin_Tutorial_Quote\",\"Challenge_Plugin_Variables\",\"Challenge_Plugin_Switches\"]","CompletedQuests:arraystr":"[]","FailedQuests:arraystr":"[]","TrackedQuest:str":"Welcome","SceneQuest":"","Vocab":"","VocabCommandWindow":"","CommandWindow_Known_Text:str":"Available","CommandWindow_Completed_Text:str":"Completed","CommandWindow_Failed_Text:str":"Failed","VocabLabelWindow":"","EmptyTitleLabel:str":"\\i[186]Quest Journal","VocabListWindow":"","ListWindowCategoryOpenFmt:str":"- %1(%2)","ListWindowCategoryCloseFmt:str":"+ %1(%2)","NoQuestListed:str":"(No Quests Listed)","ListWindowTrackedQuest:str":"\\c[17]%1\\c[0]","VocabLogWindow":"","LogEmpty:json":"\"\\\\c[5]Main Quests\\\\c[0] are quests that must be\\ncompleted in order to progress further\\ninto the game's story.\\n\\n\\\\c[6]Side Quests\\\\c[0] are optional quests that can\\nbe completed at your discretion. Upon\\ncompleting a side quest, you can receive\\nuseful rewards that may assist you on\\nyour journey.\"","OnLoadQuestJS:func":"\"// Insert JavaScript code here.\"","LogFmt:json":"\"\\\\{[[Title]]\\\\}\\n\\\\c[4]Level:\\\\c[0] [[Difficulty]]\\n\\\\c[4]From:\\\\c[0] [[From]]\\n\\\\c[4]Location:\\\\c[0] [[Location]]\\n\\n\\\\c[4]Description:\\\\c[0]\\n[[Description]]\\n\\n\\\\c[4]Objectives:\\\\c[0]\\n[[Objectives]]\\n\\n\\\\c[4]Rewards:\\\\c[0]\\n[[Rewards]]\\n\\n[[Subtext]]\\n\\n[[Quote]]\"","Objective_Normal_Fmt:str":"◎%1","Objective_Completed_Fmt:str":"\\c[24]<ColorLock>✔%1</ColorLock>\\c[0]","Objective_Failed_Fmt:str":"\\c[25]<ColorLock>✘%1</ColorLock>\\c[0]","Reward_Normal_Fmt:str":"◎%1","Reward_Completed_Fmt:str":"\\c[24]<ColorLock>✔%1</ColorLock>\\c[0]","Reward_Failed_Fmt:str":"\\c[25]<ColorLock>✘%1</ColorLock>\\c[0]","ButtonAssistWindow":"","ButtonAssistPageUpDown:str":"Scroll Up/Down","questButtonAssistActive:str":"Track","ButtonAssistExpand:str":"Expand","ButtonAssistCollapse:str":"Collapse","CommandWindowIcons":"","CommandWindow_Known_Icon:num":"193","CommandWindow_Completed_Icon:num":"192","CommandWindow_Failed_Icon:num":"194"}
 *
 * @param Categories:arraystruct
 * @text Quest Categories
 * @type struct<Category>[]
 * @desc A list of categories and their quests.
 * @default ["{\"CategoryName:str\":\"\\\\C[5]Main Quests\",\"Quests:arraystruct\":\"[\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Welcome\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Welcome Quest\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Thank you for using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nplugin made by \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella MZ\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThis is an example quest to demonstrate\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhow the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] works. It functions\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nprimarily as a log book for the various\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nadventures inside your game.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Take a look at the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] menu.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]tracked quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to something else.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[186]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] for your game!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[84]Helping support \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Example\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Example Quest\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"This is where the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ngoes. Type in whatever text you need\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhere in order to explain to the player\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nabout the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Describe each of the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhere for the player.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can have multiple quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nout at once.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"If you do, make sure you have the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Visible Objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] list the ID's of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe objectives you want visible from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe very beginning.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Here, you can list all the rewards the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ngame will give the player upon the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncompletion of the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can list the rewards however you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nlike, but do keep it concise.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can list multiple rewards, too.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"If you do, make sure you have the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Visible Rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] list the ID's of the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nrewards you want visible from the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nvery beginning.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"This is a \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]. It is used as extra\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ntext that you may want to place on your\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest journal that differs from the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"We learn by example and by direct\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nexperience because there are real limits\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto the adequacy of verbal instruction.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Malcolm Gladwell\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"CategoryName:str\":\"\\\\c[6]Side Quests\",\"Quests:arraystruct\":\"[\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Title\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Titles\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"The quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]title\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is listed in three\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndifferent places in the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest Scene\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n1. The top of the screen.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n2. The top of the quest log entry.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n3. The quest list on the side.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nBe sure to put some thought in deciding\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyour titles as they are there to convey\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nwhat the quest is all about.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change the title through the quest's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Title\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Title\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can use icons in the quest title by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[x]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] text code. Keep in mind\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthat the icon will be removed from the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest log entry.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A good title is the title of a\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsuccessful book.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Raymond Chandler\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Difficulty\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Difficulty\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]difficulty\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] can be used to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nconvey what kinds of expectations they\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nshould have regarding challenge.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThese can range from star ratings like:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[87]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[87]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[88]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[88]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[88]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nLevel ranges like:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]Level 20+\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change the difficulty through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Difficulty\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Difficulty\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A quest's difficulty is often used to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nrelay the expected level of conflict a\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nplayer may face.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A pessimist sees the difficulty in\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nevery opportunity; an optimist sees the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nopportunity in every difficulty.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Winston Churchill\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_From\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]From\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Explaining which \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]NPC\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] the quest is from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncan help remind the player its origin\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nand also help save the player some time\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nin trying to find that \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]NPC\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] again when\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ngoing to claim the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" text through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]From\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]From\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Use the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] as a means to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nstreamline your player's experience.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"More important than the quest for\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncertainty is the quest for clarity.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Francois Gautier\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Description\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Descriptions\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Insert the quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThe displayed \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] will\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndepend on the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Description ID\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] that is\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncurrently active for the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"This is the updated quest description. This\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncan only be seen when it is Description ID #2.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the Description ID by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Description Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Try changing it to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] see what it becomes.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Description Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Descriptions are valuable tools that can\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nbe used to help remind the player the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\npurpose of the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Description begins in the writer's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nimagination but should finish in the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nreader's.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Stephen King\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Objectives\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Objectives\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium-Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] are used to streamline\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe goals the player needs to achieve in\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\norder to make progress.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the status of each\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Known\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]Completed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nor \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[25]Failed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can also \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]remove\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] objectives from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nbeing viewed.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can determine the default \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nobjectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Visible\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nObjectives \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can reveal new \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthrough the use of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Objectives Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]The following are examples:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Known Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Completed Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Failed Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"6\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Objectives Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Treat \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] like a set of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ninstructions or outline for the player\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto follow in order to get the desired\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nresult both of you want.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"People with objectives succeed because\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthey know where they're going.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Earl Nightingale\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst key = 'Plugin_Tutorial_Objectives';\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [5], 'show');\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [6], 'complete');\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [7], 'fail');\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Rewards\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Rewards\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium-Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] are the goodies that are\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\npromised to be given to the player upon\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe completion of the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the status of each\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Known\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]Claimed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nor \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[25]Denied\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can also \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]remove\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] rewardsfrom\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nbeing viewed.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can determine the default \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nrewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Visible\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nRewards \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Rewards Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can reveal new \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthrough the use of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Rewards Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]The following are examples:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Known Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Claimed Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Denied Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"6\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Rewards are incentives for the player to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncomplete them, especially quests of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhigher difficulty levels.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Reward the behavior you want repeated.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Larry Winget\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst key = 'Plugin_Tutorial_Rewards';\\\\\\\\\\\\\\\\n$gameSystem.setQuestRewards(key, [4], 'show');\\\\\\\\\\\\\\\\n$gameSystem.setQuestRewards(key, [5], 'claim');\\\\\\\\\\\\\\\\n$gameSystem.setQuestRewards(key, [6], 'deny');\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Subtext\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Subtexts\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"The \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] section can be used in a\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nnumber of ways, from hints to summaries,\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto warnings.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nAnd like the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], you can\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nchange the text displayed in the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthrough changing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Subtext ID\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the Subtext ID by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Subtext Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Try changing it to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] see what it becomes.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Subtext Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Subtexts\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] can serve as hints, summaries,\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nwarnings, reminders, you name it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"After all, reminding a player to do\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsomething only means you want them to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsucceed at it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A discerning eye needs only a hint, and\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nunderstatement leaves the imagination\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nfree to build its own elaborations.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Russell Page\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Quote\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Quotes\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quotes\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] can be used to reference specific\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nlines of dialogue that could help the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nplayer understand what's needed to be\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndone.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nOr they could just be \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quotes\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] made by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\njust about anyone.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nAnd like quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]descriptions and quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtexts\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], the quest quotes can also be\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nchanged to display something else based\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\non the quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quote ID\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the Quote ID by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Quote Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Try changing it to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] see what it becomes.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Subtext Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"How you want to use them is up to you.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You miss 100% of the shots you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndon't take.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Micahel Scott\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"If at first you don't succeed, then\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nskydiving definitely isn't for you.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Steven Wright\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"CategoryName:str\":\"\\\\c[2]Challenge Quests\",\"Quests:arraystruct\":\"[\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Challenge_Plugin_Variables\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[5]Variables\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyou can run \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] code prior to the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncreation of the text written here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIn this example, game variables are set\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nup to automatically equal the number of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nof the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]first item\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] in the inventory.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThe \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] will automatically set\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nitself to completed if the variable's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nvalue is determined to be over 10.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Obtain \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\v[1]/10x First Database Item!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Knowledge for \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[2]DISCLAIMER:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nKeep in mind that \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is NOT\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nresponsible for your proficiency (or\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\notherwise) of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you get any errors with the custom\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncode, it is up to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to fix it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you do not understand how any of this\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsection works, do not be afraid. It's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nnot the end of the world.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nYou can still change the status of the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quests\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] and its \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusage of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Commands\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst value = $gameParty.numItems($dataItems[1])\\\\\\\\\\\\\\\\nconst status = value >= 10 ? 'completed' : 'known';\\\\\\\\\\\\\\\\nconst key = 'Challenge_Plugin_Variables';\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\n$gameVariables.setValue(1, value);\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [1], status)\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Challenge_Plugin_Switches\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[5]Switches\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyou can run \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] code prior to the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncreation of the text written here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIn this example, game switch 1's ON/OFF\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nstatus will determine which description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthis quest will use.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nGame Switch 1 is now \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[25]OFF\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nDescription ID \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is being used.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyou can run \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] code prior to the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncreation of the text written here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIn this example, game switch 1's ON/OFF\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nstatus will determine which description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthis quest will use.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nGame Switch 1 is now \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]ON\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nDescription ID \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is being used.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change Switch 1's ON/OFF status.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"View this quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Knowledge for \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[2]DISCLAIMER:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nKeep in mind that \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is NOT\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nresponsible for your proficiency (or\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\notherwise) of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you get any errors with the custom\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncode, it is up to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to fix it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you do not understand how any of this\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsection works, do not be afraid. It's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nnot the end of the world.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nYou can still change the status of the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quests\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] and its \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusage of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Commands\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst key = 'Challenge_Plugin_Switches';\\\\\\\\\\\\\\\\nconst id = $gameSwitches.value(1) ? 2 : 1;\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\n$gameSystem.setQuestDescription(key, id)\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}"]
 *
 * @param Label:struct
 * @text Quest Label Settings
 * @type struct<Label>
 * @desc Change how Quest Labels apply to your game project.
 * @default {"Icon:num":"0","Text:str":"QUEST","FontColor:str":"24","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"-12"}
 *
 * @param Tracker:struct
 * @text Quest Tracker Settings
 * @type struct<Tracker>
 * @desc Setup how all the quest tracker works.
 * @default {"General":"","TrackerFmt:json":"\"\\\\{[[Title]]\\\\}\\n[[Objectives]]\"","Options":"","AdjustRect:eval":"true","AddShowOption:eval":"true","ShowName:str":"Show Quest Tracker","AddPositionOption:eval":"true","PositionName:str":"Quest Tracker Position","PositionOff:str":"←","PositionOn:str":"→"}
 *
 * @param MainMenu:struct
 * @text Main Menu Settings
 * @type struct<MainMenu>
 * @desc Set up the main menu defaults.
 * @default {"Name:str":"Quest","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_Quest.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Setup how all the windows appear in-game.
 * @default {"CommandWindow":"","ShowFailed:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CommandWindow_BgType:num":"0","CommandWindow_Rect:func":"\"const ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(Window_QuestCommand.prototype.totalCommands(), true);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","QuestLabel":"","QuestLabel_BgType:num":"0","QuestLabel_Rect:func":"\"const ww = Graphics.boxWidth - this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, false);\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","LogWindow":"","LogWindow_Auto_WordWrap:eval":"false","LogWindow_ScrollSpeed:num":"0.20","LogWindow_BgType:num":"0","LogWindow_Rect:func":"\"const ww = Graphics.boxWidth - this.mainCommandWidth();\\nconst wh = this.mainAreaHeight() - this.questLabelWindowRect().height;\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this.mainAreaTop() + this.questLabelWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","ListWindow":"","ListWindow_BgType:num":"0","ListWindow_Rect:func":"\"const ww = this.mainCommandWidth();\\nconst wh = this.mainAreaHeight() - this.commandWindowRect().height;\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nconst wy = this.mainAreaTop() + this.commandWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","TrackerWindow":"","TrackerWindow_Scale:num":"0.50","TrackerWindow_BgType:num":"0","TrackerWindow_Rect:func":"\"const ww = 560;\\nconst wh = Graphics.height / Window_QuestTracker.scale;\\nconst wx = this.questTrackerOnRight() ? Graphics.width - Math.ceil(ww * Window_QuestTracker.scale) : 0;\\nconst wy = this.buttonAreaHeight() + 8;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param StartingQuests
 * @text Starting Quests
 *
 * @param KnownQuests:arraystr
 * @text Known Quests
 * @parent StartingQuests
 * @type string[]
 * @desc Which quests are known at the start of the game?
 * Insert their keys here.
 * @default ["Welcome","Example","Plugin_Tutorial_Title","Plugin_Tutorial_Difficulty","Plugin_Tutorial_From","Plugin_Tutorial_Description","Plugin_Tutorial_Objectives","Plugin_Tutorial_Rewards","Plugin_Tutorial_Subtext","Plugin_Tutorial_Quote","Challenge_Plugin_Variables","Challenge_Plugin_Switches"]
 *
 * @param CompletedQuests:arraystr
 * @text Completed Quests
 * @parent StartingQuests
 * @type string[]
 * @desc Which quests are completed at the start of the game?
 * Insert their keys here.
 * @default []
 *
 * @param FailedQuests:arraystr
 * @text Failed Quests
 * @parent StartingQuests
 * @type string[]
 * @desc Which quests are failed at the start of the game?
 * Insert their keys here.
 * @default []
 *
 * @param TrackedQuest:str
 * @text Tracked Quest
 * @parent StartingQuests
 * @desc Which quest is tracked at the start of the game?
 * @default Welcome
 *
 * @param SceneQuest
 * @text Scene_Quest
 *
 * @param Vocab
 * @parent SceneQuest
 *
 * @param VocabCommandWindow
 * @text Command Window
 * @parent Vocab
 *
 * @param CommandWindow_Known_Text:str
 * @text Command: Known
 * @parent VocabCommandWindow
 * @desc Text used to display known quests.
 * @default Available
 *
 * @param CommandWindow_Completed_Text:str
 * @text Command: Completed
 * @parent VocabCommandWindow
 * @desc Text used to display completed quests.
 * @default Completed
 *
 * @param CommandWindow_Failed_Text:str
 * @text Command: Failed
 * @parent VocabCommandWindow
 * @desc Text used to display failed quests.
 * @default Failed
 *
 * @param VocabLabelWindow
 * @text Label Window
 * @parent Vocab
 *
 * @param EmptyTitleLabel:str
 * @text Empty Title
 * @parent VocabLabelWindow
 * @desc Text displayed in the Label Window when no quest is selected.
 * @default \i[186]Quest Journal
 *
 * @param VocabListWindow
 * @text List Window
 * @parent Vocab
 *
 * @param ListWindowCategoryOpenFmt:str
 * @text Open Categories
 * @parent VocabListWindow
 * @desc Text format for an open category.
 * %1 - Category Name, %2 - Quest Amount
 * @default - %1(%2)
 *
 * @param ListWindowCategoryCloseFmt:str
 * @text Closed Categories
 * @parent VocabListWindow
 * @desc Text format for a closed category.
 * %1 - Category Name, %2 - Quest Amount
 * @default + %1(%2)
 *
 * @param NoQuestListed:str
 * @text No Quest Listed
 * @parent VocabListWindow
 * @desc Text when no quest is listed.
 * @default (No Quests Listed)
 *
 * @param ListWindowTrackedQuest:str
 * @text Tracked Quest
 * @parent VocabListWindow
 * @desc Text format for a tracked quest.
 * %1 - Tracked Quest's Name
 * @default \c[17]%1\c[0]
 *
 * @param VocabLogWindow
 * @text Log Window
 * @parent Vocab
 *
 * @param LogEmpty:json
 * @text Empty Message
 * @parent VocabLogWindow
 * @type note
 * @desc Text displayed when no quest is selected.
 * @default "\\c[5]Main Quests\\c[0] are quests that must be\ncompleted in order to progress further\ninto the game's story.\n\n\\c[6]Side Quests\\c[0] are optional quests that can\nbe completed at your discretion. Upon\ncompleting a side quest, you can receive\nuseful rewards that may assist you on\nyour journey."
 *
 * @param OnLoadQuestJS:func
 * @text JS: On Load
 * @parent LogEmpty:json
 * @type note
 * @desc Runs code upon making the empty message.
 * Useful for setting up variables.
 * @default "// Insert JavaScript code here."
 *
 * @param LogFmt:json
 * @text Quest Log
 * @parent VocabLogWindow
 * @type note
 * @desc Text format for Quest Log Window.
 * Read help file for instructions.
 * @default "\\{[[Title]]\\}\n\\c[4]Level:\\c[0] [[Difficulty]]\n\\c[4]From:\\c[0] [[From]]\n\\c[4]Location:\\c[0] [[Location]]\n\n\\c[4]Description:\\c[0]\n[[Description]]\n\n\\c[4]Objectives:\\c[0]\n[[Objectives]]\n\n\\c[4]Rewards:\\c[0]\n[[Rewards]]\n\n[[Subtext]]\n\n[[Quote]]"
 *
 * @param Objective_Normal_Fmt:str
 * @text Objective (Known)
 * @parent LogFmt:json
 * @desc Text format for known objectives.
 * %1 - Objective Text
 * @default ◎%1
 *
 * @param Objective_Completed_Fmt:str
 * @text Objective (Done)
 * @parent LogFmt:json
 * @desc Text format for complete objectives.
 * %1 - Objective Text
 * @default \c[24]<ColorLock>✔%1</ColorLock>\c[0]
 *
 * @param Objective_Failed_Fmt:str
 * @text Objective (Failed)
 * @parent LogFmt:json
 * @desc Text format for failed objectives.
 * %1 - Objective Text
 * @default \c[25]<ColorLock>✘%1</ColorLock>\c[0]
 *
 * @param Reward_Normal_Fmt:str
 * @text Reward (Known)
 * @parent LogFmt:json
 * @desc Text format for normal rewards.
 * %1 - Reward Text
 * @default ◎%1
 *
 * @param Reward_Completed_Fmt:str
 * @text Reward (Claimed)
 * @parent LogFmt:json
 * @desc Text format for claimed rewards.
 * %1 - Reward Text
 * @default \c[24]<ColorLock>✔%1</ColorLock>\c[0]
 *
 * @param Reward_Failed_Fmt:str
 * @text Reward (Denied)
 * @parent LogFmt:json
 * @desc Text format for denied rewards.
 * %1 - Reward Text
 * @default \c[25]<ColorLock>✘%1</ColorLock>\c[0]
 *
 * @param ButtonAssistWindow
 * @text Button Assist Window
 * @parent Vocab
 *
 * @param ButtonAssistPageUpDown:str
 * @text Scroll Up/Down
 * @parent ButtonAssistWindow
 * @desc Text for Page Up/Down to scroll log window.
 * Requires VisuMZ_0_CoreEngine!
 * @default Scroll Up/Down
 *
 * @param questButtonAssistActive:str
 * @text Tracker
 * @parent ButtonAssistWindow
 * @desc Text for tracking quests.
 * Requires VisuMZ_0_CoreEngine!
 * @default Track
 *
 * @param ButtonAssistExpand:str
 * @text Expand
 * @parent ButtonAssistWindow
 * @desc Text for expanding categories.
 * Requires VisuMZ_0_CoreEngine!
 * @default Expand
 *
 * @param ButtonAssistCollapse:str
 * @text Collapse
 * @parent ButtonAssistWindow
 * @desc Text for collapsing categories.
 * Requires VisuMZ_0_CoreEngine!
 * @default Collapse
 *
 * @param CommandWindowIcons
 * @text Icons
 * @parent SceneQuest
 *
 * @param CommandWindow_Known_Icon:num
 * @text Icon: Known
 * @parent CommandWindowIcons
 * @desc Icon used for this command.
 * @default 193
 *
 * @param CommandWindow_Completed_Icon:num
 * @text Icon: Completed
 * @parent CommandWindowIcons
 * @desc Icon used for this command.
 * @default 192
 *
 * @param CommandWindow_Failed_Icon:num
 * @text Icon: Failed
 * @parent CommandWindowIcons
 * @desc Icon used for this command.
 * @default 194
 *
 */
/* ----------------------------------------------------------------------------
 * Quest Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param CategoryName:str
 * @text Category Name
 * @desc This category's name.
 * You may use text codes.
 * @default Untitled
 *
 * @param Quests:arraystruct
 * @text Quests
 * @type struct<Quest>[]
 * @desc A list of quests listed under this category.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Individual Quest Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Quest:
 *
 * @param Key:str
 * @text Quest ID Key
 * @desc This quest's identification key. Quests require
 * unique keys for the plugin to differentiate them.
 * @default (Needs Key)
 *
 * @param Header
 *
 * @param Title:str
 * @text Title
 * @parent Header
 * @desc The title of the quest. This is what appears in-game.
 * You may use text codes.
 * @default \i[87]Untitled Quest
 *
 * @param Difficulty:str
 * @text Difficulty
 * @parent Header
 * @desc Difficulty level for this quest.
 * You may use text codes.
 * @default Easy Peasy
 *
 * @param From:str
 * @text From
 * @parent Header
 * @desc Insert the name of the one who issued this quest.
 * You may use text codes.
 * @default NPC Name
 *
 * @param Location:str
 * @text Location
 * @parent Header
 * @desc Insert location name where this quest was issued.
 * You may use text codes.
 * @default Location Name
 *
 * @param Description:arrayjson
 * @text Description
 * @parent Header
 * @type note[]
 * @desc Type out the description(s) used for this quest.
 * You may use text codes.
 * @default ["\"This is the \\\\c[4]default\\\\c[0] quest description.\"","\"This is the \\\\c[4]default\\\\c[0] quest description.\\n\\nYou can insert multiple description entries in case you\\never want to update the quest description midway while the\\nquest is in progress.\""]
 *
 * @param Lists
 *
 * @param Objectives:arrayjson
 * @text Objectives List
 * @parent Lists
 * @type note[]
 * @desc The objectives to be completed for this quest.
 * You may use text codes.
 * @default ["\"\\\\c[4]First\\\\c[0] objective to be cleared.\"","\"\\\\c[4]Second\\\\c[0] objective, but it's hidden.\"","\"To make other objectives appear,\\nenable them through the \\\\c[4]'Visible\\nObjectives'\\\\c[0] plugin parameter or by\\nusing a plugin command to make\\nthem appear\""]
 *
 * @param VisibleObjectives:arraynum
 * @text Visible Objectives
 * @parent Objectives:arrayjson
 * @type number[]
 * @min 1
 * @desc The objectives that are visible from the start.
 * @default ["1"]
 *
 * @param Rewards:arrayjson
 * @text Rewards List
 * @parent Lists
 * @type note[]
 * @desc The reward list for this quest.
 * You may use text codes.
 * @default ["\"\\\\i[176]Potion x5\"","\"\\\\i[178]Ether x3\"","\"To make other rewards appear,\\nenable them through the \\\\c[4]'Visible\\nRewards'\\\\c[0] plugin parameter or by\\nusing a plugin command to make\\nthem appear\""]
 *
 * @param VisibleRewards:arraynum
 * @text Visible Rewards
 * @parent Rewards:arrayjson
 * @type number[]
 * @min 1
 * @desc The rewards that are visible from the start.
 * @default ["1"]
 *
 * @param Footer
 *
 * @param Subtext:arrayjson
 * @text Subtext
 * @parent Footer
 * @type note[]
 * @desc Subtext to be displayed with the quest.
 * You may use text codes.
 * @default ["\"\"","\"This is a \\\\c[4]subtext\\\\c[0]. It is used as extra\\ntext that you may want to place on your\\nquest journal that differs from the\\n\\\\c[4]description\\\\c[0].\""]
 *
 * @param Quotes:arrayjson
 * @text Quotes
 * @parent Footer
 * @type note[]
 * @desc Quotes to be displayed with the quest.
 * You may use text codes.
 * @default ["\"\"","\"Insert the quotes of NPC's here.\""]
 *
 * @param JavaScript
 *
 * @param OnLoadQuestJS:func
 * @text JS: On Load
 * @parent JavaScript
 * @type note
 * @desc Runs code upon loading the quest in Scene_Quest.
 * Useful for setting up variables.
 * @default "// Insert JavaScript code here."
 *
 */
/* ----------------------------------------------------------------------------
 * Quest Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the Quest Label.
 * @default QUEST
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the Quest Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the Quest text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the Quest Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the Quest Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the Quest Label's Y position by.
 * @default -12
 *
 */
/* ----------------------------------------------------------------------------
 * Quest Tracker Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Tracker:
 *
 * @param General
 *
 * @param TrackerFmt:json
 * @text Tracker Format
 * @parent General
 * @type note
 * @desc Text format for Quest Tracker Window.
 * Read help file for instructions.
 * @default "\\{[[Title]]\\}\n[[Objectives]]"
 *
 * @param Fading
 *
 * @param MinTrackerOpacity:num
 * @text Close Minimum Opacity
 * @parent Fading
 * @type number
 * @min 0
 * @desc Minimum opacity when the player is too close to the
 * quest tracker on the map screen.
 * @default 128
 *
 * @param TrackerFadeSpeed:num
 * @text Tracker Fade Speed
 * @parent Fading
 * @type number
 * @min 1
 * @desc Fade speed of the tracker when toggled on/off.
 * Lower is slower. Higher is faster.
 * @default 16
 *
 * @param Options
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param AddShowOption:eval
 * @text Add Show Tracker?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Tracker' option to the Options menu?
 * @default true
 *
 * @param ShowName:str
 * @text Option Name
 * @parent AddShowOption:eval
 * @desc Command name of the option.
 * @default Show Quest Tracker
 *
 * @param AddPositionOption:eval
 * @text Add Position Tracker?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Position Tracker' option to the Options menu?
 * @default true
 *
 * @param PositionName:str
 * @text Option Name
 * @parent AddPositionOption:eval
 * @desc Command name of the option.
 * @default Quest Tracker Position
 *
 * @param PositionOff:str
 * @text Option OFF
 * @parent AddPositionOption:eval
 * @desc Text displayed when the option is OFF.
 * @default ←
 *
 * @param PositionOn:str
 * @text Option ON
 * @parent AddPositionOption:eval
 * @desc Text displayed when the option is ON.
 * @default →
 *
 */
/* ----------------------------------------------------------------------------
 * MainMenu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Quest' option in the Main Menu.
 * @default Quest
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Quest' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Quest' option to the Main Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param ShowFailed:eval
 * @text Show Failed Quests?
 * @parent CommandWindow
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show/hide Failed Quests in the command window.
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent CommandWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent CommandWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CommandWindow_BgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(Window_QuestCommand.prototype.totalCommands(), true);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param QuestLabel
 * @text Quest Label
 *
 * @param QuestLabel_BgType:num
 * @text Background Type
 * @parent QuestLabel
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param QuestLabel_Rect:func
 * @text JS: X, Y, W, H
 * @parent QuestLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this.mainCommandWidth();\nconst wh = this.calcWindowHeight(1, false);\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param LogWindow
 * @text Log Window
 *
 * @param LogWindow_ScrollSpeed:num
 * @text PageUp/Down Speed
 * @parent LogWindow
 * @desc Scroll speed for PageUp/Down.
 * @default 0.20
 *
 * @param LogWindow_BgType:num
 * @text Background Type
 * @parent LogWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param LogWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent LogWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this.mainCommandWidth();\nconst wh = this.mainAreaHeight() - this.questLabelWindowRect().height;\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this.mainAreaTop() + this.questLabelWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param LogWindowExperimental
 * @text EXPERIMENTAL
 * @parent LogWindow
 *
 * @param LogWindow_Auto_WordWrap:eval
 * @text Automatic Word Wrap?
 * @parent LogWindowExperimental
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables automatic word wrap.
 * Requires VisuMZ_1_MessageCore!
 * @default false
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindow_BgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this.mainCommandWidth();\nconst wh = this.mainAreaHeight() - this.commandWindowRect().height;\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nconst wy = this.mainAreaTop() + this.commandWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param TrackerWindow
 * @text Tracker Window
 *
 * @param TrackerWindow_Scale:num
 * @text Window Scale
 * @parent TrackerWindow
 * @desc How much do you want to scale the Tracker Window's size by?
 * @default 0.50
 *
 * @param TrackerWindow_BgType:num
 * @text Background Type
 * @parent TrackerWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param TrackerWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent TrackerWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = 560;\nconst wh = Graphics.height / Window_QuestTracker.scale;\nconst wx = this.questTrackerOnRight() ? Graphics.width - Math.ceil(ww * Window_QuestTracker.scale) : 0;\nconst wy = this.buttonAreaHeight() + 8;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0x229f1a=_0x4dfc;(function(_0x655175,_0x1b6bb9){const _0x3a08f5=_0x4dfc,_0x4bf819=_0x655175();while(!![]){try{const _0x4f7002=parseInt(_0x3a08f5(0x2a2))/0x1+-parseInt(_0x3a08f5(0x1b2))/0x2*(parseInt(_0x3a08f5(0x24a))/0x3)+-parseInt(_0x3a08f5(0x1fe))/0x4+parseInt(_0x3a08f5(0x142))/0x5*(-parseInt(_0x3a08f5(0x27a))/0x6)+parseInt(_0x3a08f5(0x288))/0x7+-parseInt(_0x3a08f5(0x2e6))/0x8+parseInt(_0x3a08f5(0x315))/0x9;if(_0x4f7002===_0x1b6bb9)break;else _0x4bf819['push'](_0x4bf819['shift']());}catch(_0x18e096){_0x4bf819['push'](_0x4bf819['shift']());}}}(_0x57c9,0x947bc));var label=_0x229f1a(0x121),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x504797){const _0x56da0d=_0x229f1a;return _0x504797[_0x56da0d(0x1fb)]&&_0x504797['description'][_0x56da0d(0x18f)]('['+label+']');})[0x0];function _0x4dfc(_0x4684b6,_0x24ea65){const _0x57c903=_0x57c9();return _0x4dfc=function(_0x4dfc2c,_0xef6ceb){_0x4dfc2c=_0x4dfc2c-0xdd;let _0x5994ba=_0x57c903[_0x4dfc2c];return _0x5994ba;},_0x4dfc(_0x4684b6,_0x24ea65);}VisuMZ[label][_0x229f1a(0x26a)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x229f1a(0x2e7)]=function(_0x12c958,_0x209e7e){const _0x3952dd=_0x229f1a;for(const _0x4d57ca in _0x209e7e){if(_0x4d57ca[_0x3952dd(0x2c6)](/(.*):(.*)/i)){const _0x3e7f42=String(RegExp['$1']),_0x1776ff=String(RegExp['$2'])[_0x3952dd(0x1ca)]()[_0x3952dd(0x269)]();let _0x5e139a,_0x4910b1,_0x358715;switch(_0x1776ff){case _0x3952dd(0x2ac):_0x5e139a=_0x209e7e[_0x4d57ca]!==''?Number(_0x209e7e[_0x4d57ca]):0x0;break;case _0x3952dd(0xe9):_0x4910b1=_0x209e7e[_0x4d57ca]!==''?JSON[_0x3952dd(0x31a)](_0x209e7e[_0x4d57ca]):[],_0x5e139a=_0x4910b1[_0x3952dd(0x1f0)](_0x55da5c=>Number(_0x55da5c));break;case _0x3952dd(0x2c0):_0x5e139a=_0x209e7e[_0x4d57ca]!==''?eval(_0x209e7e[_0x4d57ca]):null;break;case _0x3952dd(0x21f):_0x4910b1=_0x209e7e[_0x4d57ca]!==''?JSON[_0x3952dd(0x31a)](_0x209e7e[_0x4d57ca]):[],_0x5e139a=_0x4910b1['map'](_0x2c2ace=>eval(_0x2c2ace));break;case'JSON':_0x5e139a=_0x209e7e[_0x4d57ca]!==''?JSON['parse'](_0x209e7e[_0x4d57ca]):'';break;case _0x3952dd(0x272):_0x4910b1=_0x209e7e[_0x4d57ca]!==''?JSON[_0x3952dd(0x31a)](_0x209e7e[_0x4d57ca]):[],_0x5e139a=_0x4910b1[_0x3952dd(0x1f0)](_0x92047f=>JSON[_0x3952dd(0x31a)](_0x92047f));break;case _0x3952dd(0x281):_0x5e139a=_0x209e7e[_0x4d57ca]!==''?new Function(JSON['parse'](_0x209e7e[_0x4d57ca])):new Function(_0x3952dd(0x197));break;case _0x3952dd(0x26d):_0x4910b1=_0x209e7e[_0x4d57ca]!==''?JSON['parse'](_0x209e7e[_0x4d57ca]):[],_0x5e139a=_0x4910b1[_0x3952dd(0x1f0)](_0x445d04=>new Function(JSON[_0x3952dd(0x31a)](_0x445d04)));break;case _0x3952dd(0x2db):_0x5e139a=_0x209e7e[_0x4d57ca]!==''?String(_0x209e7e[_0x4d57ca]):'';break;case _0x3952dd(0x184):_0x4910b1=_0x209e7e[_0x4d57ca]!==''?JSON[_0x3952dd(0x31a)](_0x209e7e[_0x4d57ca]):[],_0x5e139a=_0x4910b1[_0x3952dd(0x1f0)](_0x2d1be9=>String(_0x2d1be9));break;case _0x3952dd(0x306):_0x358715=_0x209e7e[_0x4d57ca]!==''?JSON[_0x3952dd(0x31a)](_0x209e7e[_0x4d57ca]):{},_0x5e139a=VisuMZ[_0x3952dd(0x2e7)]({},_0x358715);break;case _0x3952dd(0x1d5):_0x4910b1=_0x209e7e[_0x4d57ca]!==''?JSON[_0x3952dd(0x31a)](_0x209e7e[_0x4d57ca]):[],_0x5e139a=_0x4910b1[_0x3952dd(0x1f0)](_0x5dd0b3=>VisuMZ['ConvertParams']({},JSON[_0x3952dd(0x31a)](_0x5dd0b3)));break;default:continue;}_0x12c958[_0x3e7f42]=_0x5e139a;}}return _0x12c958;},(_0x1d8b38=>{const _0x595a5e=_0x229f1a,_0x5c7280=_0x1d8b38[_0x595a5e(0x2a3)];for(const _0x3b7e8b of dependencies){if(!Imported[_0x3b7e8b]){alert(_0x595a5e(0x1dc)[_0x595a5e(0x2d7)](_0x5c7280,_0x3b7e8b)),SceneManager[_0x595a5e(0x17b)]();break;}}const _0x5cc005=_0x1d8b38[_0x595a5e(0x158)];if(_0x5cc005[_0x595a5e(0x2c6)](/\[Version[ ](.*?)\]/i)){const _0x29033c=Number(RegExp['$1']);if(_0x29033c!==VisuMZ[label][_0x595a5e(0x2dd)]){if(_0x595a5e(0x26e)!==_0x595a5e(0x2b4))alert(_0x595a5e(0x2d3)[_0x595a5e(0x2d7)](_0x5c7280,_0x29033c)),SceneManager['exit']();else{_0x44e555['ConvertParams'](_0x2f1888,_0x58edcd);const _0xb9513c=_0x23b307['Key'];_0x2f9252[_0x595a5e(0x326)](_0xb9513c),_0x553087[_0x595a5e(0x279)]()&&_0x31435c[_0x595a5e(0x199)][_0x595a5e(0x213)]();}}}if(_0x5cc005['match'](/\[Tier[ ](\d+)\]/i)){const _0x54522d=Number(RegExp['$1']);_0x54522d<tier?(alert(_0x595a5e(0x106)[_0x595a5e(0x2d7)](_0x5c7280,_0x54522d,tier)),SceneManager[_0x595a5e(0x17b)]()):tier=Math['max'](_0x54522d,tier);}VisuMZ[_0x595a5e(0x2e7)](VisuMZ[label][_0x595a5e(0x26a)],_0x1d8b38[_0x595a5e(0x172)]);})(pluginData),PluginManager[_0x229f1a(0x19f)](pluginData[_0x229f1a(0x2a3)],_0x229f1a(0x1a7),_0x5bd3a0=>{const _0xc34a99=_0x229f1a;VisuMZ[_0xc34a99(0x2e7)](_0x5bd3a0,_0x5bd3a0);const _0x4dd6d3=_0x5bd3a0[_0xc34a99(0x2c1)],_0x31b776=_0x5bd3a0[_0xc34a99(0x143)],_0x57ddda=_0x5bd3a0[_0xc34a99(0xdf)];for(const _0x16b406 of _0x4dd6d3){if(_0xc34a99(0x108)!==_0xc34a99(0x2f5)){const _0x2c7529=$dataItems[_0x16b406];if(_0x2c7529)$gameParty[_0xc34a99(0xe6)](_0x2c7529);}else this[_0xc34a99(0x30c)]=_0x34ae32,this[_0xc34a99(0x2fa)]();}for(const _0x267736 of _0x31b776){if('adFGY'==='adFGY'){const _0x584ab7=$dataWeapons[_0x267736];if(_0x584ab7)$gameParty['setQuestLabelItem'](_0x584ab7);}else _0xa7724[_0xc34a99(0x199)]['refreshQuestTrackerWindow']();}for(const _0x48c46e of _0x57ddda){const _0x19b72b=$dataArmors[_0x48c46e];if(_0x19b72b)$gameParty[_0xc34a99(0xe6)](_0x19b72b);}}),PluginManager[_0x229f1a(0x19f)](pluginData[_0x229f1a(0x2a3)],_0x229f1a(0x285),_0x562519=>{const _0x503844=_0x229f1a;VisuMZ[_0x503844(0x2e7)](_0x562519,_0x562519);const _0x576b9a=_0x562519[_0x503844(0x2c1)],_0x400cbb=_0x562519[_0x503844(0x143)],_0xfb19b4=_0x562519[_0x503844(0xdf)];for(const _0x2c513d of _0x576b9a){if(_0x503844(0x1b9)!==_0x503844(0x1b9)){_0x5045cf[_0x503844(0x2e7)](_0x277846,_0x30bc1c);const _0x110e1a=_0x406c4c[_0x503844(0x2c1)],_0x54c347=_0x2e9078[_0x503844(0x143)],_0x2d2f70=_0x4d02f8[_0x503844(0xdf)];for(const _0x321297 of _0x110e1a){const _0x468d2d=_0x413b01[_0x321297];if(_0x468d2d)_0x2b2d63[_0x503844(0x1a2)](_0x468d2d);}for(const _0x58dab5 of _0x54c347){const _0x1f433f=_0x2c5360[_0x58dab5];if(_0x1f433f)_0x4d590e[_0x503844(0x1a2)](_0x1f433f);}for(const _0x363202 of _0x2d2f70){const _0x49f937=_0x44a987[_0x363202];if(_0x49f937)_0x1a74dd[_0x503844(0x1a2)](_0x49f937);}}else{const _0x20e398=$dataItems[_0x2c513d];if(_0x20e398)$gameParty[_0x503844(0x1a2)](_0x20e398);}}for(const _0x5a019d of _0x400cbb){if(_0x503844(0x208)===_0x503844(0x1c0))return _0x1cc24b[_0x503844(0x121)][_0x503844(0x26a)][_0x503844(0x225)][_0x503844(0x289)];else{const _0x531af2=$dataWeapons[_0x5a019d];if(_0x531af2)$gameParty[_0x503844(0x1a2)](_0x531af2);}}for(const _0xbb8a3e of _0xfb19b4){const _0x2d3c5f=$dataArmors[_0xbb8a3e];if(_0x2d3c5f)$gameParty['clearQuestLabelItem'](_0x2d3c5f);}}),PluginManager[_0x229f1a(0x19f)](pluginData['name'],_0x229f1a(0x300),_0x50647f=>{const _0x393b7a=_0x229f1a;VisuMZ[_0x393b7a(0x2e7)](_0x50647f,_0x50647f);const _0x154c72=_0x50647f['Keys'],_0x3a6156=_0x50647f[_0x393b7a(0x32f)];for(const _0x47dfb6 of _0x154c72){if('NDwXg'!=='uujzY')$gameSystem[_0x393b7a(0x28a)](_0x47dfb6,_0x3a6156);else return _0x3190ec['isquestMenuShown']();}SceneManager['isSceneMap']()&&SceneManager[_0x393b7a(0x199)][_0x393b7a(0x213)]();}),PluginManager[_0x229f1a(0x19f)](pluginData[_0x229f1a(0x2a3)],'QuestDescription',_0x29a38c=>{const _0x489629=_0x229f1a;VisuMZ[_0x489629(0x2e7)](_0x29a38c,_0x29a38c);const _0x5b10d6=_0x29a38c['Keys'],_0x4c2ddf=_0x29a38c[_0x489629(0x30a)];for(const _0x440b5a of _0x5b10d6){if('sTpfB'===_0x489629(0x229))$gameSystem[_0x489629(0x270)](_0x440b5a,_0x4c2ddf);else return this[_0x489629(0x1cb)]()['shown'];}SceneManager[_0x489629(0x279)]()&&SceneManager[_0x489629(0x199)][_0x489629(0x213)]();}),PluginManager[_0x229f1a(0x19f)](pluginData[_0x229f1a(0x2a3)],_0x229f1a(0x14d),_0x139030=>{const _0x491b9c=_0x229f1a;VisuMZ[_0x491b9c(0x2e7)](_0x139030,_0x139030);const _0x1bb595=_0x139030['Keys'],_0x516595=_0x139030[_0x491b9c(0x152)],_0x5c3537=_0x139030['Status'];for(const _0x1e0bd9 of _0x1bb595){$gameSystem[_0x491b9c(0x19d)](_0x1e0bd9,_0x516595,_0x5c3537);}if(SceneManager[_0x491b9c(0x279)]()){if(_0x491b9c(0xfd)!==_0x491b9c(0x112))SceneManager[_0x491b9c(0x199)]['refreshQuestTrackerWindow']();else{_0x223048[_0x491b9c(0x2c6)](/<VARIABLE (\d+) ON DEATH: ([\+\-]\d+)>/i);const _0xe243b9=_0x34d8af(_0x1e7651['$1']),_0x3e8c84=_0x272b69(_0xf97a23['$2']),_0x1395d=_0x76c2da['value'](_0xe243b9);_0x543c47['setValue'](_0xe243b9,_0x1395d+_0x3e8c84);}}}),PluginManager[_0x229f1a(0x19f)](pluginData['name'],_0x229f1a(0x273),_0x33e9dd=>{const _0x4c7d90=_0x229f1a;VisuMZ['ConvertParams'](_0x33e9dd,_0x33e9dd);const _0x419e25=_0x33e9dd['Keys'],_0x5a7e11=_0x33e9dd['TargetID'];for(const _0x2f6505 of _0x419e25){if(_0x4c7d90(0x126)!=='CKhpi'){const _0x5b874a={'BgFilename1':_0x12ff6f['QuestSystem'][_0x4c7d90(0x26a)]['BgSettings'][_0x4c7d90(0x241)],'BgFilename2':_0x22fec9[_0x4c7d90(0x121)][_0x4c7d90(0x26a)][_0x4c7d90(0x154)][_0x4c7d90(0x259)]};_0x5b874a&&(_0x5b874a['BgFilename1']!==''||_0x5b874a['BgFilename2']!=='')&&(this[_0x4c7d90(0x15d)]=new _0x3face3(_0x14df62[_0x4c7d90(0x2aa)](_0x5b874a[_0x4c7d90(0x241)])),this[_0x4c7d90(0x265)]=new _0x3c367c(_0x5127b8['loadTitle2'](_0x5b874a[_0x4c7d90(0x259)])),this[_0x4c7d90(0x21e)](this['_backSprite1']),this[_0x4c7d90(0x21e)](this[_0x4c7d90(0x265)]),this[_0x4c7d90(0x15d)][_0x4c7d90(0x317)][_0x4c7d90(0x1ab)](this[_0x4c7d90(0x234)][_0x4c7d90(0x193)](this,this[_0x4c7d90(0x15d)])),this['_backSprite2'][_0x4c7d90(0x317)][_0x4c7d90(0x1ab)](this[_0x4c7d90(0x234)][_0x4c7d90(0x193)](this,this[_0x4c7d90(0x265)])));}else $gameSystem[_0x4c7d90(0x230)](_0x2f6505,_0x5a7e11);}SceneManager[_0x4c7d90(0x279)]()&&SceneManager[_0x4c7d90(0x199)][_0x4c7d90(0x213)]();}),PluginManager['registerCommand'](pluginData[_0x229f1a(0x2a3)],_0x229f1a(0x23d),_0x5406b6=>{const _0x195d1e=_0x229f1a;VisuMZ[_0x195d1e(0x2e7)](_0x5406b6,_0x5406b6);const _0x634874=_0x5406b6[_0x195d1e(0x171)],_0x403687=_0x5406b6[_0x195d1e(0x152)],_0x2dd521=_0x5406b6['Status'];for(const _0x3f490a of _0x634874){$gameSystem[_0x195d1e(0x102)](_0x3f490a,_0x403687,_0x2dd521);}if(SceneManager[_0x195d1e(0x279)]()){if(_0x195d1e(0x274)!==_0x195d1e(0x274))return _0x2a83cf[_0x195d1e(0x23b)];else SceneManager['_scene'][_0x195d1e(0x213)]();}}),PluginManager[_0x229f1a(0x19f)](pluginData[_0x229f1a(0x2a3)],_0x229f1a(0x22d),_0x888cc6=>{const _0x1d97c1=_0x229f1a;VisuMZ[_0x1d97c1(0x2e7)](_0x888cc6,_0x888cc6);const _0x422ffe=_0x888cc6[_0x1d97c1(0x171)],_0x5d54fb=_0x888cc6[_0x1d97c1(0x30a)];for(const _0x3d86c0 of _0x422ffe){'DfUwW'==='DfUwW'?$gameSystem[_0x1d97c1(0xdd)](_0x3d86c0,_0x5d54fb):(this['initCategories'](),_0x216d8e['prototype'][_0x1d97c1(0x329)][_0x1d97c1(0x1da)](this,_0x10cecc),this[_0x1d97c1(0x1eb)](_0x32b428),this[_0x1d97c1(0x2e3)](),this[_0x1d97c1(0x258)]());}if(SceneManager[_0x1d97c1(0x279)]()){if(_0x1d97c1(0x23c)!=='pyzvA'){const _0x58d92c=this[_0x1d97c1(0x301)](),_0x4d4039=this['_labelWindow'];_0x4d4039[_0x1d97c1(0x1ff)][_0x1d97c1(0x1c2)]();const _0x4ea0d1=_0x58d92c?_0x58d92c[_0x1d97c1(0x2a9)]:_0x27827c[_0x1d97c1(0x1aa)],_0x153af1=_0x4d4039['textSizeEx'](_0x4ea0d1)[_0x1d97c1(0x287)],_0x370e46=_0x4d4039[_0x1d97c1(0xe5)]()+_0x5d5281[_0x1d97c1(0x21d)]((_0x4d4039[_0x1d97c1(0x160)]-_0x153af1)/0x2);_0x4d4039[_0x1d97c1(0x309)](_0x4ea0d1,_0x370e46,0x0,_0x4d4039['innerWidth']);}else SceneManager[_0x1d97c1(0x199)][_0x1d97c1(0x213)]();}}),PluginManager[_0x229f1a(0x19f)](pluginData[_0x229f1a(0x2a3)],_0x229f1a(0x1be),_0x1fd674=>{const _0xed406d=_0x229f1a;VisuMZ[_0xed406d(0x2e7)](_0x1fd674,_0x1fd674);const _0x34c0a1=_0x1fd674[_0xed406d(0x1a4)];$gameSystem[_0xed406d(0x326)](_0x34c0a1),SceneManager['isSceneMap']()&&SceneManager[_0xed406d(0x199)][_0xed406d(0x213)]();}),PluginManager[_0x229f1a(0x19f)](pluginData[_0x229f1a(0x2a3)],'TrackerRefreshWindow',_0x173526=>{const _0x42a88a=_0x229f1a;if(!SceneManager['isSceneMap']())return;SceneManager[_0x42a88a(0x199)][_0x42a88a(0x213)]();}),PluginManager[_0x229f1a(0x19f)](pluginData[_0x229f1a(0x2a3)],_0x229f1a(0x12d),_0x4a446f=>{const _0x38515c=_0x229f1a;VisuMZ[_0x38515c(0x2e7)](_0x4a446f,_0x4a446f),$gameSystem[_0x38515c(0x2d4)](_0x4a446f[_0x38515c(0x170)]),SceneManager[_0x38515c(0x279)]()&&SceneManager[_0x38515c(0x199)][_0x38515c(0x213)]();}),PluginManager[_0x229f1a(0x19f)](pluginData['name'],'SystemCallSceneQuest',_0x25c5f4=>{const _0xd02d17=_0x229f1a;if($gameParty[_0xd02d17(0x1db)]())return;SceneManager[_0xd02d17(0x337)](Scene_Quest);}),PluginManager[_0x229f1a(0x19f)](pluginData['name'],_0x229f1a(0x145),_0x350e2f=>{const _0x512d12=_0x229f1a;VisuMZ['ConvertParams'](_0x350e2f,_0x350e2f),$gameSystem['questData']()['enabled']=_0x350e2f[_0x512d12(0x2f6)];}),PluginManager[_0x229f1a(0x19f)](pluginData[_0x229f1a(0x2a3)],_0x229f1a(0x200),_0x1ef4ef=>{const _0x8159ba=_0x229f1a;VisuMZ[_0x8159ba(0x2e7)](_0x1ef4ef,_0x1ef4ef),$gameSystem[_0x8159ba(0x1cb)]()[_0x8159ba(0x266)]=_0x1ef4ef[_0x8159ba(0x170)];}),VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x179)]=Scene_Boot[_0x229f1a(0x2c9)][_0x229f1a(0x28b)],Scene_Boot[_0x229f1a(0x2c9)][_0x229f1a(0x28b)]=function(){const _0x445330=_0x229f1a;VisuMZ[_0x445330(0x121)][_0x445330(0x179)][_0x445330(0x1da)](this),this[_0x445330(0x314)]();},VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x1f4)]=[],VisuMZ['QuestSystem'][_0x229f1a(0x147)]={},Scene_Boot[_0x229f1a(0x2c9)]['process_VisuMZ_QuestSystem_Data']=function(){const _0x997460=_0x229f1a;for(const _0xb844be of VisuMZ[_0x997460(0x121)][_0x997460(0x26a)]['Categories']){if(!_0xb844be)continue;for(const _0x401ee6 of _0xb844be[_0x997460(0x19b)]){if(_0x997460(0x30e)===_0x997460(0x29a)){const _0x37e22b=this[_0x997460(0x2e1)](),_0x3b72c3=new _0x43d2b0(_0x37e22b);this['addWindow'](_0x3b72c3),this[_0x997460(0x30c)]=_0x3b72c3,_0x3b72c3[_0x997460(0x165)](_0x476125[_0x997460(0x121)][_0x997460(0x26a)][_0x997460(0x225)][_0x997460(0x283)]);}else{if(!_0x401ee6)continue;_0x401ee6['category']=_0xb844be,_0x401ee6[_0x997460(0x122)]['unshift'](''),_0x401ee6[_0x997460(0x331)][_0x997460(0x178)](''),_0x401ee6[_0x997460(0x1a0)][_0x997460(0x178)](''),_0x401ee6['Subtext'][_0x997460(0x178)](''),_0x401ee6['Quotes'][_0x997460(0x178)]('');const _0x363f39=_0x401ee6[_0x997460(0x1a4)][_0x997460(0x1ca)]()[_0x997460(0x269)]();VisuMZ[_0x997460(0x121)][_0x997460(0x1f4)]['push'](_0x363f39),VisuMZ[_0x997460(0x121)]['QuestData'][_0x363f39]=_0x401ee6;}}}},ConfigManager[_0x229f1a(0x116)]=!![],ConfigManager[_0x229f1a(0x2b2)]=!![],VisuMZ['QuestSystem'][_0x229f1a(0x140)]=ConfigManager[_0x229f1a(0x2c3)],ConfigManager['makeData']=function(){const _0x593731=_0x229f1a,_0x113d6a=VisuMZ['QuestSystem'][_0x593731(0x140)][_0x593731(0x1da)](this);return _0x113d6a[_0x593731(0x116)]=this[_0x593731(0x116)],_0x113d6a[_0x593731(0x2b2)]=this[_0x593731(0x2b2)],_0x113d6a;},VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x2d8)]=ConfigManager[_0x229f1a(0x176)],ConfigManager[_0x229f1a(0x176)]=function(_0xc9e766){const _0x39e8d7=_0x229f1a;VisuMZ[_0x39e8d7(0x121)][_0x39e8d7(0x2d8)][_0x39e8d7(0x1da)](this,_0xc9e766);if(_0x39e8d7(0x116)in _0xc9e766){if(_0x39e8d7(0x11c)==='OOAYc'){const _0x68c484=this[_0x39e8d7(0x1cb)]();return this[_0x39e8d7(0x17c)](_0x68c484['tracked']);}else this['questTrackerShow']=_0xc9e766[_0x39e8d7(0x116)];}else _0x39e8d7(0x1c5)!==_0x39e8d7(0x327)?this[_0x39e8d7(0x116)]=!![]:this['drawItemStyleIcon'](_0x5a165f);if(_0x39e8d7(0x2b2)in _0xc9e766){if('HQnyI'!==_0x39e8d7(0xde))this[_0x39e8d7(0x2b2)]=_0xc9e766[_0x39e8d7(0x2b2)];else{if(![]){const _0xd20532=this[_0x39e8d7(0x338)](),_0x4316ca=this['_quest']?this[_0x39e8d7(0x169)]():this[_0x39e8d7(0xeb)](),_0x254041=this['textSizeEx'](_0x4316ca[_0x39e8d7(0x269)]());this[_0x39e8d7(0x2f7)]=_0x254041[_0x39e8d7(0x1c3)],this[_0x39e8d7(0x119)]===_0x3def5b&&(this['_textHeight']+=this[_0x39e8d7(0x12b)](),_0x35051e[_0x39e8d7(0x23a)]&&(this[_0x39e8d7(0x2f7)]+=this[_0x39e8d7(0x12b)]()*0x4));}const _0x412cfd=this[_0x39e8d7(0x2b6)]?this['createQuestText']():this['createEmptyText']();this['_textHeight']=this[_0x39e8d7(0x182)](_0x412cfd['trim']())[_0x39e8d7(0x1c3)];}}else this[_0x39e8d7(0x2b2)]=!![];},ImageManager[_0x229f1a(0x30d)]=VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x26a)][_0x229f1a(0x246)]['CommandWindow_Known_Icon'],ImageManager[_0x229f1a(0x211)]=VisuMZ['QuestSystem']['Settings'][_0x229f1a(0x246)][_0x229f1a(0x150)],ImageManager[_0x229f1a(0x14e)]=VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x26a)][_0x229f1a(0x246)]['CommandWindow_Failed_Icon'],TextManager[_0x229f1a(0x328)]=VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x26a)][_0x229f1a(0x23e)][_0x229f1a(0x1a6)],TextManager[_0x229f1a(0x248)]=VisuMZ[_0x229f1a(0x121)]['Settings'][_0x229f1a(0x246)][_0x229f1a(0x223)],TextManager[_0x229f1a(0x2da)]=VisuMZ[_0x229f1a(0x121)]['Settings'][_0x229f1a(0x246)][_0x229f1a(0x203)],TextManager[_0x229f1a(0x105)]=VisuMZ['QuestSystem'][_0x229f1a(0x26a)][_0x229f1a(0x246)][_0x229f1a(0x118)],TextManager[_0x229f1a(0x339)]=VisuMZ[_0x229f1a(0x121)]['Settings'][_0x229f1a(0x246)][_0x229f1a(0x323)],TextManager[_0x229f1a(0x2a0)]=VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x26a)]['General']['ListWindowCategoryCloseFmt'],TextManager[_0x229f1a(0x1aa)]=VisuMZ['QuestSystem'][_0x229f1a(0x26a)][_0x229f1a(0x246)][_0x229f1a(0x2cc)],TextManager[_0x229f1a(0x14f)]=VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x26a)][_0x229f1a(0x246)][_0x229f1a(0x1b3)],TextManager[_0x229f1a(0x311)]=VisuMZ['QuestSystem'][_0x229f1a(0x26a)][_0x229f1a(0x246)][_0x229f1a(0x1e9)],TextManager[_0x229f1a(0x320)]=VisuMZ[_0x229f1a(0x121)]['Settings'][_0x229f1a(0x246)]['LogEmpty'],TextManager[_0x229f1a(0x212)]=VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x26a)][_0x229f1a(0x246)][_0x229f1a(0x2ec)],TextManager[_0x229f1a(0x20a)]=VisuMZ[_0x229f1a(0x121)]['Settings'][_0x229f1a(0x246)][_0x229f1a(0x25a)],TextManager[_0x229f1a(0x2e0)]=VisuMZ[_0x229f1a(0x121)]['Settings']['General'][_0x229f1a(0x115)],TextManager[_0x229f1a(0x262)]=VisuMZ[_0x229f1a(0x121)]['Settings'][_0x229f1a(0x246)][_0x229f1a(0x1df)],TextManager[_0x229f1a(0x20d)]=VisuMZ[_0x229f1a(0x121)]['Settings'][_0x229f1a(0x246)][_0x229f1a(0x1ee)],TextManager[_0x229f1a(0x1f5)]=VisuMZ[_0x229f1a(0x121)]['Settings']['General'][_0x229f1a(0x15c)],TextManager[_0x229f1a(0x23b)]=VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x26a)][_0x229f1a(0x246)][_0x229f1a(0x251)],TextManager[_0x229f1a(0x1ce)]=VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x26a)][_0x229f1a(0x246)][_0x229f1a(0x1ce)],TextManager[_0x229f1a(0x173)]=VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x26a)][_0x229f1a(0x246)][_0x229f1a(0x214)],TextManager['questButtonAssistCollapse']=VisuMZ[_0x229f1a(0x121)]['Settings'][_0x229f1a(0x246)]['ButtonAssistCollapse'],TextManager['defaultQuestTrackerFmt']=_0x229f1a(0x196),TextManager[_0x229f1a(0x302)]=VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x26a)]['Tracker'][_0x229f1a(0x167)]||TextManager['defaultQuestTrackerFmt'],TextManager[_0x229f1a(0x22f)]=VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x26a)][_0x229f1a(0x246)]['ListWindowTrackedQuest'],TextManager[_0x229f1a(0x116)]=VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x26a)][_0x229f1a(0x334)][_0x229f1a(0x278)],TextManager[_0x229f1a(0x2b2)]=VisuMZ['QuestSystem'][_0x229f1a(0x26a)][_0x229f1a(0x334)][_0x229f1a(0x195)],TextManager['questTrackerPosOff']=VisuMZ['QuestSystem'][_0x229f1a(0x26a)][_0x229f1a(0x334)][_0x229f1a(0x20b)],TextManager['questTrackerPosOn']=VisuMZ[_0x229f1a(0x121)]['Settings'][_0x229f1a(0x334)][_0x229f1a(0x15a)],SceneManager[_0x229f1a(0x279)]=function(){const _0x22f9aa=_0x229f1a;return this['_scene']&&this[_0x22f9aa(0x199)][_0x22f9aa(0x119)]===Scene_Map;},VisuMZ[_0x229f1a(0x121)]['Game_System_initialize']=Game_System[_0x229f1a(0x2c9)]['initialize'],Game_System[_0x229f1a(0x2c9)][_0x229f1a(0x329)]=function(){const _0x2b746d=_0x229f1a;VisuMZ[_0x2b746d(0x121)][_0x2b746d(0x333)][_0x2b746d(0x1da)](this),this[_0x2b746d(0x1af)]();},Game_System[_0x229f1a(0x2c9)][_0x229f1a(0x1af)]=function(){const _0xe7e0d1=_0x229f1a,_0x28cf20=VisuMZ['QuestSystem']['Settings'][_0xe7e0d1(0x246)],_0x113c32=VisuMZ[_0xe7e0d1(0x121)][_0xe7e0d1(0x26a)]['MainMenu'];this[_0xe7e0d1(0x1bf)]={'shown':_0x113c32[_0xe7e0d1(0x318)],'enabled':_0x113c32[_0xe7e0d1(0x2e2)],'known':[],'completed':[],'failed':[],'description':{},'objectives':{},'objectivesCompleted':{},'objectivesFailed':{},'rewards':{},'rewardsClaimed':{},'rewardsDenied':{},'subtext':{},'quotes':{},'tracked':_0x28cf20['TrackedQuest'][_0xe7e0d1(0x1ca)]()['trim'](),'showTracker':!![]};for(const _0x54097d of _0x28cf20[_0xe7e0d1(0x296)]){this[_0xe7e0d1(0x28a)](_0x54097d,_0xe7e0d1(0x284));}for(const _0x139ef1 of _0x28cf20[_0xe7e0d1(0xf4)]){if('iCBdp'!==_0xe7e0d1(0x12c))this[_0xe7e0d1(0x28a)](_0x139ef1,_0xe7e0d1(0x144));else return _0x1c3453[_0xe7e0d1(0x320)];}for(const _0x343af6 of _0x28cf20['FailedQuests']){_0xe7e0d1(0x141)!==_0xe7e0d1(0x141)?_0x838e1c=_0xe7e0d1(0x290)[_0xe7e0d1(0x2d7)](_0x39e82e['id']):this[_0xe7e0d1(0x28a)](_0x343af6,_0xe7e0d1(0x1b5));}},Game_System[_0x229f1a(0x2c9)]['quest']=function(_0x59ff50){const _0x2114e6=_0x229f1a;return _0x59ff50=_0x59ff50['toUpperCase']()[_0x2114e6(0x269)](),VisuMZ[_0x2114e6(0x121)][_0x2114e6(0x147)][_0x59ff50];},Game_System[_0x229f1a(0x2c9)]['questData']=function(){const _0x380019=_0x229f1a;if(this[_0x380019(0x1bf)]===undefined)this[_0x380019(0x1af)]();return this[_0x380019(0x1bf)];},Game_System['prototype'][_0x229f1a(0x27c)]=function(){const _0x4987d6=_0x229f1a;return this['questData']()[_0x4987d6(0x266)];},Game_System[_0x229f1a(0x2c9)][_0x229f1a(0x10c)]=function(){const _0x3f2c85=_0x229f1a;return this[_0x3f2c85(0x1cb)]()['enabled'];},Game_System[_0x229f1a(0x2c9)][_0x229f1a(0x28a)]=function(_0x466d1a,_0x2208f1){const _0x35d835=_0x229f1a;_0x466d1a=_0x466d1a['toUpperCase']()[_0x35d835(0x269)]();if(!VisuMZ['QuestSystem'][_0x35d835(0x147)][_0x466d1a])return;const _0x1b9648=this[_0x35d835(0x1cb)]();_0x1b9648[_0x35d835(0x284)]=_0x1b9648['known']||[],_0x1b9648[_0x35d835(0x144)]=_0x1b9648['completed']||[],_0x1b9648[_0x35d835(0x1b5)]=_0x1b9648[_0x35d835(0x1b5)]||[],_0x1b9648['known'][_0x35d835(0x22e)](_0x466d1a),_0x1b9648[_0x35d835(0x144)][_0x35d835(0x22e)](_0x466d1a),_0x1b9648[_0x35d835(0x1b5)][_0x35d835(0x22e)](_0x466d1a);if(_0x2208f1!=='remove')_0x1b9648[_0x2208f1][_0x35d835(0x337)](_0x466d1a);if(_0x466d1a===_0x1b9648[_0x35d835(0x2a4)][_0x35d835(0x1ca)]()[_0x35d835(0x269)]()){if(_0x2208f1!==_0x35d835(0x284)){if(_0x35d835(0x316)!==_0x35d835(0x1f8))this['setTrackedQuest']('');else return![];}}},Game_System[_0x229f1a(0x2c9)][_0x229f1a(0x25f)]=function(){const _0x211942=_0x229f1a,_0x52ecfd=this['questData']();return _0x52ecfd[_0x211942(0x284)]=_0x52ecfd[_0x211942(0x284)]||[],_0x52ecfd[_0x211942(0x284)]['map'](_0x209597=>this[_0x211942(0x17c)](_0x209597))[_0x211942(0x22e)](null);},Game_System[_0x229f1a(0x2c9)][_0x229f1a(0x292)]=function(_0x4499f5){const _0x3c3a6a=_0x229f1a,_0x517ff8=this[_0x3c3a6a(0x1cb)]();return _0x517ff8[_0x3c3a6a(0x284)]=_0x517ff8['known']||[],_0x4499f5=_0x4499f5[_0x3c3a6a(0x1ca)]()[_0x3c3a6a(0x269)](),_0x517ff8[_0x3c3a6a(0x284)][_0x3c3a6a(0x18f)](_0x4499f5);},Game_System['prototype'][_0x229f1a(0x2ce)]=function(){const _0xe49b07=_0x229f1a,_0x588184=this[_0xe49b07(0x1cb)]();return _0x588184[_0xe49b07(0x144)]=_0x588184[_0xe49b07(0x144)]||[],_0x588184[_0xe49b07(0x144)][_0xe49b07(0x1f0)](_0x5d55fe=>this[_0xe49b07(0x17c)](_0x5d55fe))['remove'](null);},Game_System[_0x229f1a(0x2c9)][_0x229f1a(0x17e)]=function(_0x169cd3){const _0x2b60e2=_0x229f1a,_0x2fba3d=this['questData']();return _0x2fba3d[_0x2b60e2(0x144)]=_0x2fba3d['completed']||[],_0x169cd3=_0x169cd3['toUpperCase']()['trim'](),_0x2fba3d[_0x2b60e2(0x144)][_0x2b60e2(0x18f)](_0x169cd3);},Game_System[_0x229f1a(0x2c9)]['questsFailed']=function(){const _0x57af4b=_0x229f1a,_0x315641=this[_0x57af4b(0x1cb)]();return _0x315641[_0x57af4b(0x1b5)]=_0x315641[_0x57af4b(0x1b5)]||[],_0x315641[_0x57af4b(0x1b5)][_0x57af4b(0x1f0)](_0x16af16=>this[_0x57af4b(0x17c)](_0x16af16))['remove'](null);},Game_System[_0x229f1a(0x2c9)][_0x229f1a(0x1fc)]=function(_0x570554){const _0x134b1b=_0x229f1a,_0x5d7b43=this[_0x134b1b(0x1cb)]();return _0x5d7b43['failed']=_0x5d7b43[_0x134b1b(0x1b5)]||[],_0x570554=_0x570554['toUpperCase']()['trim'](),_0x5d7b43[_0x134b1b(0x1b5)][_0x134b1b(0x18f)](_0x570554);},Game_System['prototype'][_0x229f1a(0x2f1)]=function(_0x51c091){const _0x3d35f1=_0x229f1a;_0x51c091=_0x51c091['toUpperCase']()['trim']();const _0x27cf62=this[_0x3d35f1(0x17c)](_0x51c091);if(!_0x27cf62)return'';const _0x1716ba=this[_0x3d35f1(0x1cb)]()[_0x3d35f1(0x158)];_0x1716ba[_0x51c091]=_0x1716ba[_0x51c091]||0x1;const _0x43a706=_0x1716ba[_0x51c091];return _0x27cf62[_0x3d35f1(0x122)][_0x43a706]||'';},Game_System[_0x229f1a(0x2c9)][_0x229f1a(0x270)]=function(_0x3cbe3c,_0xcd0802){const _0x101856=_0x229f1a;_0x3cbe3c=_0x3cbe3c[_0x101856(0x1ca)]()[_0x101856(0x269)]();const _0x181581=this['quest'](_0x3cbe3c);if(!_0x181581)return'';const _0x14e83f=this['questData']()[_0x101856(0x158)];_0x14e83f[_0x3cbe3c]=_0xcd0802;},Game_System['prototype'][_0x229f1a(0x247)]=function(_0x5ca5f2){const _0x9fad45=_0x229f1a;_0x5ca5f2=_0x5ca5f2['toUpperCase']()[_0x9fad45(0x269)]();const _0x2f666d=this[_0x9fad45(0x17c)](_0x5ca5f2);if(!_0x2f666d)return'';const _0x3bb187=this[_0x9fad45(0x1cb)]();return _0x3bb187[_0x9fad45(0x159)]=_0x3bb187['objectives']||{},!_0x3bb187[_0x9fad45(0x159)][_0x5ca5f2]&&(_0x9fad45(0x10d)===_0x9fad45(0x10d)?_0x3bb187['objectives'][_0x5ca5f2]=JsonEx[_0x9fad45(0x155)](_0x2f666d[_0x9fad45(0x235)]):(_0x361edc[_0x9fad45(0x2c9)][_0x9fad45(0x1b4)][_0x9fad45(0x1da)](this),this[_0x9fad45(0x25d)](),this[_0x9fad45(0x27d)]())),_0x3bb187['objectives'][_0x5ca5f2][_0x9fad45(0x107)]((_0x4bb592,_0x2861bd)=>_0x4bb592-_0x2861bd);},Game_System['prototype']['setQuestObjectives']=function(_0x382b04,_0x54b3ad,_0x3181f2){const _0x2ebd08=_0x229f1a;_0x382b04=_0x382b04[_0x2ebd08(0x1ca)]()[_0x2ebd08(0x269)]();const _0x131681=this[_0x2ebd08(0x17c)](_0x382b04);if(!_0x131681)return'';const _0x3fbd8e=this['questData']();_0x3fbd8e[_0x2ebd08(0x159)]=_0x3fbd8e[_0x2ebd08(0x159)]||{};!_0x3fbd8e[_0x2ebd08(0x159)][_0x382b04]&&(_0x3fbd8e[_0x2ebd08(0x159)][_0x382b04]=JsonEx[_0x2ebd08(0x155)](_0x131681['VisibleObjectives']));_0x3fbd8e['objectives'][_0x382b04]=_0x3fbd8e[_0x2ebd08(0x159)][_0x382b04]||[],_0x3fbd8e['objectivesCompleted'][_0x382b04]=_0x3fbd8e[_0x2ebd08(0x1a3)][_0x382b04]||[],_0x3fbd8e['objectivesFailed'][_0x382b04]=_0x3fbd8e['objectivesFailed'][_0x382b04]||[];for(const _0x1a6ff7 of _0x54b3ad){if('wlwbR'===_0x2ebd08(0x24b)){_0x5b8542['match'](/<VARIABLE (\d+) ON GAIN: ([\+\-]\d+)>/i);const _0x56bd08=_0x1e7209(_0x197a59['$1']),_0x4654ca=_0x35a49a(_0x82da35['$2'])*_0x950ab8,_0x218e1d=_0x5c2799[_0x2ebd08(0x15b)](_0x56bd08);_0x55567f[_0x2ebd08(0x19a)](_0x56bd08,_0x218e1d+_0x4654ca);}else{_0x3fbd8e[_0x2ebd08(0x159)][_0x382b04][_0x2ebd08(0x22e)](_0x1a6ff7),_0x3fbd8e[_0x2ebd08(0x1a3)][_0x382b04][_0x2ebd08(0x22e)](_0x1a6ff7),_0x3fbd8e[_0x2ebd08(0x146)][_0x382b04]['remove'](_0x1a6ff7);switch(_0x3181f2){case _0x2ebd08(0xee):case'known':_0x3fbd8e['objectives'][_0x382b04][_0x2ebd08(0x337)](_0x1a6ff7);break;case'complete':case _0x2ebd08(0x144):_0x3fbd8e['objectivesCompleted'][_0x382b04]['push'](_0x1a6ff7);break;case'fail':case'failed':_0x3fbd8e[_0x2ebd08(0x146)][_0x382b04][_0x2ebd08(0x337)](_0x1a6ff7);break;case _0x2ebd08(0x22e):case _0x2ebd08(0x219):break;}}}},Game_System['prototype'][_0x229f1a(0x2f2)]=function(_0x362016){const _0xdaf845=_0x229f1a;_0x362016=_0x362016[_0xdaf845(0x1ca)]()[_0xdaf845(0x269)]();const _0x56566a=this[_0xdaf845(0x17c)](_0x362016);if(!_0x56566a)return'';const _0x3e269a=this['questData']();return _0x3e269a[_0xdaf845(0x1a3)]=_0x3e269a['objectivesCompleted']||{},_0x3e269a[_0xdaf845(0x1a3)][_0x362016]=_0x3e269a[_0xdaf845(0x1a3)][_0x362016]||[],_0x3e269a[_0xdaf845(0x1a3)][_0x362016][_0xdaf845(0x107)]((_0x2968a4,_0x1609d8)=>_0x2968a4-_0x1609d8);},Game_System[_0x229f1a(0x2c9)][_0x229f1a(0x194)]=function(_0x313bef){const _0x21caa2=_0x229f1a;_0x313bef=_0x313bef['toUpperCase']()[_0x21caa2(0x269)]();const _0x272f7b=this[_0x21caa2(0x17c)](_0x313bef);if(!_0x272f7b)return'';const _0x50307a=this[_0x21caa2(0x1cb)]();return _0x50307a['objectivesFailed']=_0x50307a[_0x21caa2(0x146)]||{},_0x50307a[_0x21caa2(0x146)][_0x313bef]=_0x50307a[_0x21caa2(0x146)][_0x313bef]||[],_0x50307a[_0x21caa2(0x146)][_0x313bef]['sort']((_0x5dacb3,_0x52f9ea)=>_0x5dacb3-_0x52f9ea);},Game_System['prototype']['questRewards']=function(_0x4cf907){const _0x4b303d=_0x229f1a;_0x4cf907=_0x4cf907['toUpperCase']()[_0x4b303d(0x269)]();const _0x3e22e9=this['quest'](_0x4cf907);if(!_0x3e22e9)return'';const _0x4913af=this[_0x4b303d(0x1cb)]();return _0x4913af[_0x4b303d(0x11b)]=_0x4913af[_0x4b303d(0x11b)]||{},!_0x4913af[_0x4b303d(0x11b)][_0x4cf907]&&(_0x4913af[_0x4b303d(0x11b)][_0x4cf907]=JsonEx[_0x4b303d(0x155)](_0x3e22e9[_0x4b303d(0x218)])),_0x4913af['rewards'][_0x4cf907][_0x4b303d(0x107)]((_0x2d406a,_0x3e569c)=>_0x2d406a-_0x3e569c);},Game_System['prototype'][_0x229f1a(0x102)]=function(_0x2b5542,_0x18232e,_0x18eaa8){const _0x3864c9=_0x229f1a;_0x2b5542=_0x2b5542[_0x3864c9(0x1ca)]()[_0x3864c9(0x269)]();const _0x6035b0=this[_0x3864c9(0x17c)](_0x2b5542);if(!_0x6035b0)return'';const _0x13720c=this[_0x3864c9(0x1cb)]();_0x13720c[_0x3864c9(0x11b)]=_0x13720c['rewards']||{};if(!_0x13720c[_0x3864c9(0x11b)][_0x2b5542]){if(_0x3864c9(0x257)===_0x3864c9(0x257))_0x13720c[_0x3864c9(0x11b)][_0x2b5542]=JsonEx[_0x3864c9(0x155)](_0x6035b0[_0x3864c9(0x218)]);else{_0x4cd19b[_0x3864c9(0x2e7)](_0x107824,_0x4d2524);const _0x5a4952=_0x25c024[_0x3864c9(0x171)],_0x416fa7=_0x133303[_0x3864c9(0x30a)];for(const _0x53f215 of _0x5a4952){_0x3d85c2[_0x3864c9(0xdd)](_0x53f215,_0x416fa7);}_0x5f0dd8[_0x3864c9(0x279)]()&&_0x29ada1['_scene']['refreshQuestTrackerWindow']();}}_0x13720c[_0x3864c9(0x11b)][_0x2b5542]=_0x13720c['rewards'][_0x2b5542]||[],_0x13720c[_0x3864c9(0x2b5)][_0x2b5542]=_0x13720c[_0x3864c9(0x2b5)][_0x2b5542]||[],_0x13720c[_0x3864c9(0x264)][_0x2b5542]=_0x13720c[_0x3864c9(0x264)][_0x2b5542]||[];for(const _0x2aa13d of _0x18232e){_0x13720c[_0x3864c9(0x11b)][_0x2b5542][_0x3864c9(0x22e)](_0x2aa13d),_0x13720c[_0x3864c9(0x2b5)][_0x2b5542][_0x3864c9(0x22e)](_0x2aa13d),_0x13720c[_0x3864c9(0x264)][_0x2b5542][_0x3864c9(0x22e)](_0x2aa13d);switch(_0x18eaa8){case _0x3864c9(0xee):case'known':_0x13720c[_0x3864c9(0x11b)][_0x2b5542]['push'](_0x2aa13d);break;case _0x3864c9(0x16e):case _0x3864c9(0x1ac):_0x13720c[_0x3864c9(0x2b5)][_0x2b5542][_0x3864c9(0x337)](_0x2aa13d);break;case _0x3864c9(0x27e):case _0x3864c9(0x2ea):_0x13720c[_0x3864c9(0x264)][_0x2b5542][_0x3864c9(0x337)](_0x2aa13d);break;case _0x3864c9(0x22e):case _0x3864c9(0x219):break;}}},Game_System[_0x229f1a(0x2c9)][_0x229f1a(0x322)]=function(_0x4ec4fb){const _0x2d168f=_0x229f1a;_0x4ec4fb=_0x4ec4fb['toUpperCase']()[_0x2d168f(0x269)]();const _0x5d66bb=this['quest'](_0x4ec4fb);if(!_0x5d66bb)return'';const _0x5638d2=this[_0x2d168f(0x1cb)]();return _0x5638d2[_0x2d168f(0x2b5)]=_0x5638d2[_0x2d168f(0x2b5)]||{},_0x5638d2['rewardsClaimed'][_0x4ec4fb]=_0x5638d2[_0x2d168f(0x2b5)][_0x4ec4fb]||[],_0x5638d2[_0x2d168f(0x2b5)][_0x4ec4fb][_0x2d168f(0x107)]((_0x2dd3e7,_0x4f6580)=>_0x2dd3e7-_0x4f6580);},Game_System[_0x229f1a(0x2c9)][_0x229f1a(0x1ec)]=function(_0xbf7cfd){const _0x4bb330=_0x229f1a;_0xbf7cfd=_0xbf7cfd[_0x4bb330(0x1ca)]()['trim']();const _0x91643=this[_0x4bb330(0x17c)](_0xbf7cfd);if(!_0x91643)return'';const _0x122aeb=this[_0x4bb330(0x1cb)]();return _0x122aeb[_0x4bb330(0x264)]=_0x122aeb[_0x4bb330(0x264)]||{},_0x122aeb[_0x4bb330(0x264)][_0xbf7cfd]=_0x122aeb[_0x4bb330(0x264)][_0xbf7cfd]||[],_0x122aeb[_0x4bb330(0x264)][_0xbf7cfd]['sort']((_0x32464e,_0x26c4ae)=>_0x32464e-_0x26c4ae);},Game_System[_0x229f1a(0x2c9)][_0x229f1a(0x1d0)]=function(_0x2e273d){const _0x1524cd=_0x229f1a;_0x2e273d=_0x2e273d[_0x1524cd(0x1ca)]()[_0x1524cd(0x269)]();const _0x2a2f79=this[_0x1524cd(0x17c)](_0x2e273d);if(!_0x2a2f79)return'';const _0x1b28d2=this[_0x1524cd(0x1cb)]()[_0x1524cd(0x2b3)];_0x1b28d2[_0x2e273d]=_0x1b28d2[_0x2e273d]||0x1;const _0x4159e4=_0x1b28d2[_0x2e273d];return _0x2a2f79[_0x1524cd(0x1d3)][_0x4159e4]||'';},Game_System[_0x229f1a(0x2c9)][_0x229f1a(0xdd)]=function(_0x3e99eb,_0x145c59){const _0x528b56=_0x229f1a;_0x3e99eb=_0x3e99eb[_0x528b56(0x1ca)]()[_0x528b56(0x269)]();const _0x45aa15=this['quest'](_0x3e99eb);if(!_0x45aa15)return'';const _0x436e13=this[_0x528b56(0x1cb)]()[_0x528b56(0x2b3)];_0x436e13[_0x3e99eb]=_0x145c59;},Game_System[_0x229f1a(0x2c9)][_0x229f1a(0xf9)]=function(_0x47599a){const _0x38338b=_0x229f1a;_0x47599a=_0x47599a[_0x38338b(0x1ca)]()['trim']();const _0x3c0063=this[_0x38338b(0x17c)](_0x47599a);if(!_0x3c0063)return'';const _0x205720=this[_0x38338b(0x1cb)]()[_0x38338b(0x175)];_0x205720[_0x47599a]=_0x205720[_0x47599a]||0x1;const _0x4008aa=_0x205720[_0x47599a];return _0x3c0063[_0x38338b(0x17a)][_0x4008aa]||'';},Game_System['prototype'][_0x229f1a(0x230)]=function(_0xeddc58,_0x156a63){const _0x1b912f=_0x229f1a;_0xeddc58=_0xeddc58[_0x1b912f(0x1ca)]()['trim']();const _0xa4612c=this[_0x1b912f(0x17c)](_0xeddc58);if(!_0xa4612c)return'';const _0x4ea00e=this[_0x1b912f(0x1cb)]()['quotes'];_0x4ea00e[_0xeddc58]=_0x156a63;},Game_System['prototype']['trackedQuest']=function(){const _0x37a27c=_0x229f1a,_0x1149ce=this['questData']();return this['quest'](_0x1149ce[_0x37a27c(0x2a4)]);},Game_System[_0x229f1a(0x2c9)]['setTrackedQuest']=function(_0x15b757,_0x261f8e){const _0x14ed31=_0x229f1a,_0x4f6aaf=this[_0x14ed31(0x1cb)]();if(_0x261f8e&&_0x4f6aaf[_0x14ed31(0x2a4)]===_0x15b757)_0x15b757='';_0x4f6aaf[_0x14ed31(0x2a4)]=_0x15b757,SceneManager[_0x14ed31(0x279)]()&&SceneManager[_0x14ed31(0x199)]['setQuestForQuestTrackerWindow'](_0x15b757);},Game_System[_0x229f1a(0x2c9)]['isQuestTrackerVisible']=function(){const _0x312cfd=_0x229f1a,_0x32fe90=this[_0x312cfd(0x1cb)]();return _0x32fe90[_0x312cfd(0x2c4)];},Game_System[_0x229f1a(0x2c9)][_0x229f1a(0x2d4)]=function(_0x51739c){const _0x4bbfb2=_0x229f1a,_0x3a581d=this[_0x4bbfb2(0x1cb)]();_0x3a581d[_0x4bbfb2(0x2c4)]=_0x51739c;},VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x226)]=Game_BattlerBase[_0x229f1a(0x2c9)]['addNewState'],Game_BattlerBase[_0x229f1a(0x2c9)][_0x229f1a(0x204)]=function(_0x4bfd8a){const _0x598a1f=_0x229f1a,_0x1ed148=this[_0x598a1f(0x18b)]();VisuMZ[_0x598a1f(0x121)][_0x598a1f(0x226)][_0x598a1f(0x1da)](this,_0x4bfd8a),this[_0x598a1f(0xed)](_0x4bfd8a,_0x1ed148);},Game_BattlerBase[_0x229f1a(0x2c9)][_0x229f1a(0xed)]=function(_0x226c8,_0x7fa0c3){const _0x2a6e88=_0x229f1a;if(_0x226c8!==this[_0x2a6e88(0x198)]())return;if(!this[_0x2a6e88(0x12a)]())return;if(!_0x7fa0c3)return;if(!this['isDead']())return;if(this[_0x2a6e88(0x21c)])return;this[_0x2a6e88(0x21c)]=!![];const _0x3ff463=this[_0x2a6e88(0x2fb)]()[_0x2a6e88(0x174)],_0x5e4169=_0x3ff463['match'](/<VARIABLE (\d+) ON DEATH: ([\+\-]\d+)>/gi);if(_0x5e4169)for(const _0x51eb42 of _0x5e4169){if(_0x2a6e88(0x13d)===_0x2a6e88(0x210)){const _0x3980a3=this['itemLineRect'](this[_0x2a6e88(0xea)]());let _0x2e38d7=this['commandName'](this[_0x2a6e88(0xea)]());_0x2e38d7=_0x2e38d7[_0x2a6e88(0xe8)](/\\I\[(\d+)\]/gi,''),_0x19dfd9[_0x2a6e88(0x1f7)](),this[_0x2a6e88(0x1f6)](_0x2e38d7,_0x3980a3),this[_0x2a6e88(0x1e0)](_0x2e38d7,_0x3980a3),this[_0x2a6e88(0x164)](_0x2e38d7,_0x3980a3);}else{_0x51eb42[_0x2a6e88(0x2c6)](/<VARIABLE (\d+) ON DEATH: ([\+\-]\d+)>/i);const _0x4d5761=Number(RegExp['$1']),_0x5439a3=Number(RegExp['$2']),_0x54ce6d=$gameVariables[_0x2a6e88(0x15b)](_0x4d5761);$gameVariables['setValue'](_0x4d5761,_0x54ce6d+_0x5439a3);}}},VisuMZ[_0x229f1a(0x121)][_0x229f1a(0xff)]=Game_Battler[_0x229f1a(0x2c9)][_0x229f1a(0x149)],Game_Battler[_0x229f1a(0x2c9)]['useItem']=function(_0x58419b){const _0x696775=_0x229f1a;VisuMZ[_0x696775(0x121)][_0x696775(0xff)][_0x696775(0x1da)](this,_0x58419b),this[_0x696775(0x31e)](_0x58419b);},Game_Battler[_0x229f1a(0x2c9)][_0x229f1a(0x31e)]=function(_0x3d5ec0){const _0x465ac2=_0x229f1a;if(!_0x3d5ec0)return;if(!this[_0x465ac2(0x26b)]())return;const _0x4f408d=_0x3d5ec0[_0x465ac2(0x174)],_0x651424=_0x4f408d['match'](/<VARIABLE (\d+) ON USE: ([\+\-]\d+)>/gi);if(_0x651424)for(const _0x2c619e of _0x651424){_0x2c619e[_0x465ac2(0x2c6)](/<VARIABLE (\d+) ON USE: ([\+\-]\d+)>/i);const _0x110455=Number(RegExp['$1']),_0x5e2925=Number(RegExp['$2']),_0x601694=$gameVariables[_0x465ac2(0x15b)](_0x110455);$gameVariables[_0x465ac2(0x19a)](_0x110455,_0x601694+_0x5e2925);}},VisuMZ[_0x229f1a(0x121)]['Game_Actor_tradeItemWithParty']=Game_Actor[_0x229f1a(0x2c9)][_0x229f1a(0x2b7)],Game_Actor[_0x229f1a(0x2c9)]['tradeItemWithParty']=function(_0x414270,_0x3b9803){const _0x36ea9f=_0x229f1a;$gameTemp[_0x36ea9f(0x238)]=!![];const _0x3ed023=VisuMZ[_0x36ea9f(0x121)][_0x36ea9f(0x231)][_0x36ea9f(0x1da)](this,_0x414270,_0x3b9803);return $gameTemp[_0x36ea9f(0x238)]=undefined,_0x3ed023;},VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x2d0)]=Game_Party[_0x229f1a(0x2c9)][_0x229f1a(0x28e)],Game_Party[_0x229f1a(0x2c9)][_0x229f1a(0x28e)]=function(_0x3b882f,_0x59e12f,_0x1a34cf){const _0x558ac0=_0x229f1a;VisuMZ[_0x558ac0(0x121)][_0x558ac0(0x2d0)][_0x558ac0(0x1da)](this,_0x3b882f,_0x59e12f,_0x1a34cf),this[_0x558ac0(0x1b7)](_0x3b882f,_0x59e12f);},Game_Party[_0x229f1a(0x2c9)][_0x229f1a(0x1b7)]=function(_0x111435,_0x3d6bb2){const _0x19c45c=_0x229f1a;if(!_0x111435)return;if($gameTemp[_0x19c45c(0x238)])return;const _0x7682b2=_0x111435['note'];if(_0x3d6bb2>0x0){const _0x413a7f=_0x7682b2['match'](/<VARIABLE (\d+) ON GAIN: ([\+\-]\d+)>/gi);if(_0x413a7f)for(const _0x1a89c6 of _0x413a7f){if('iuhaK'===_0x19c45c(0x293)){_0x4a3268=_0x1628f0['toUpperCase']()[_0x19c45c(0x269)]();const _0x1a64a5=this[_0x19c45c(0x17c)](_0x35485f);if(!_0x1a64a5)return'';const _0x545765=this[_0x19c45c(0x1cb)]();return _0x545765[_0x19c45c(0x146)]=_0x545765[_0x19c45c(0x146)]||{},_0x545765['objectivesFailed'][_0x4d0b1f]=_0x545765[_0x19c45c(0x146)][_0x3db909]||[],_0x545765[_0x19c45c(0x146)][_0x3089b0][_0x19c45c(0x107)]((_0x58bb0d,_0x37e664)=>_0x58bb0d-_0x37e664);}else{_0x1a89c6[_0x19c45c(0x2c6)](/<VARIABLE (\d+) ON GAIN: ([\+\-]\d+)>/i);const _0x10cf44=Number(RegExp['$1']),_0x344160=Number(RegExp['$2'])*_0x3d6bb2,_0x1cdeb7=$gameVariables[_0x19c45c(0x15b)](_0x10cf44);$gameVariables[_0x19c45c(0x19a)](_0x10cf44,_0x1cdeb7+_0x344160);}}}else{if(_0x3d6bb2<0x0){const _0x5507c6=_0x7682b2[_0x19c45c(0x2c6)](/<VARIABLE (\d+) ON LOSE: ([\+\-]\d+)>/gi);if(_0x5507c6){if('soPYi'==='ODqcw')_0x3db8ab=_0x19c45c(0x2f8)[_0x19c45c(0x2d7)](_0x266c1f['id']);else for(const _0x3aaf81 of _0x5507c6){_0x3aaf81[_0x19c45c(0x2c6)](/<VARIABLE (\d+) ON LOSE: ([\+\-]\d+)>/i);const _0x1aa255=Number(RegExp['$1']),_0x3302a4=Number(RegExp['$2'])*_0x3d6bb2,_0x30193d=$gameVariables[_0x19c45c(0x15b)](_0x1aa255);$gameVariables[_0x19c45c(0x19a)](_0x1aa255,_0x30193d+_0x3302a4);}}}}const _0x155c3f=_0x7682b2[_0x19c45c(0x2c6)](/<TRACK WITH VARIABLE (\d+)>/gi);if(_0x155c3f){if(_0x19c45c(0x18e)!==_0x19c45c(0x2e5))for(const _0x319371 of _0x155c3f){if('zNsfS'!==_0x19c45c(0x24c))return _0x490962[_0x19c45c(0x1fd)];else{_0x319371[_0x19c45c(0x2c6)](/<TRACK WITH VARIABLE (\d+)>/i);const _0x2e361c=Number(RegExp['$1']),_0x2497a5=$gameParty[_0x19c45c(0x2fc)](_0x111435);$gameVariables[_0x19c45c(0x19a)](_0x2e361c,_0x2497a5);}}else{_0x4b3e83[_0x19c45c(0x2c6)](/<VARIABLE (\d+) ON LOSE: ([\+\-]\d+)>/i);const _0x52c31d=_0x2c7915(_0x3543f5['$1']),_0x474f2b=_0x16f5a1(_0x3839f8['$2'])*_0xf1655d,_0x13dc2d=_0x24e893[_0x19c45c(0x15b)](_0x52c31d);_0x24e35b[_0x19c45c(0x19a)](_0x52c31d,_0x13dc2d+_0x474f2b);}}},VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x2a8)]=Game_Party[_0x229f1a(0x2c9)]['initialize'],Game_Party[_0x229f1a(0x2c9)][_0x229f1a(0x329)]=function(){const _0x2149e8=_0x229f1a;VisuMZ['QuestSystem']['Game_Party_initialize']['call'](this),this[_0x2149e8(0xf0)]();},Game_Party[_0x229f1a(0x2c9)][_0x229f1a(0xf0)]=function(){this['_questLabelItemsList']=[];},Game_Party[_0x229f1a(0x2c9)][_0x229f1a(0x2ad)]=function(_0x541c3c){const _0x2026c2=_0x229f1a;if(this['_questLabelItemsList']===undefined)this[_0x2026c2(0xf0)]();let _0xf5b55e='';if(DataManager[_0x2026c2(0x263)](_0x541c3c))_0xf5b55e=_0x2026c2(0x32c)[_0x2026c2(0x2d7)](_0x541c3c['id']);else{if(DataManager[_0x2026c2(0x18a)](_0x541c3c))_0xf5b55e=_0x2026c2(0x2f8)['format'](_0x541c3c['id']);else{if(DataManager[_0x2026c2(0x29e)](_0x541c3c))_0xf5b55e='armor-%1'['format'](_0x541c3c['id']);else{if(_0x2026c2(0x2c2)!==_0x2026c2(0x2c2))this[_0x2026c2(0xe1)](_0x12d4e7);else return;}}}return this['_questLabelItemsList'][_0x2026c2(0x18f)](_0xf5b55e);},Game_Party['prototype'][_0x229f1a(0xe6)]=function(_0x2f1743){const _0x5858e7=_0x229f1a;if(this[_0x5858e7(0x1cd)]===undefined)this[_0x5858e7(0xf0)]();let _0x2b3a27='';if(DataManager[_0x5858e7(0x263)](_0x2f1743))_0x2b3a27=_0x5858e7(0x32c)[_0x5858e7(0x2d7)](_0x2f1743['id']);else{if(DataManager['isWeapon'](_0x2f1743)){if(_0x5858e7(0x180)!==_0x5858e7(0x180)){const _0x38d9b3=this['commandWindowRect'](),_0x22cbc2=new _0x3b0239(_0x38d9b3);_0x22cbc2['setHandler'](_0x5858e7(0x284),this['onCommandOk'][_0x5858e7(0x193)](this)),_0x22cbc2['setHandler'](_0x5858e7(0x144),this['onCommandOk'][_0x5858e7(0x193)](this)),_0x22cbc2[_0x5858e7(0x2de)](_0x5858e7(0x1b5),this['onCommandOk'][_0x5858e7(0x193)](this)),_0x22cbc2['setHandler'](_0x5858e7(0x319),this['popScene'][_0x5858e7(0x193)](this)),this[_0x5858e7(0x1b8)](_0x22cbc2),this[_0x5858e7(0x295)]=_0x22cbc2,_0x22cbc2[_0x5858e7(0x165)](_0x2b1cec[_0x5858e7(0x121)]['Settings']['Window'][_0x5858e7(0x2be)]);}else _0x2b3a27=_0x5858e7(0x2f8)[_0x5858e7(0x2d7)](_0x2f1743['id']);}else{if(DataManager[_0x5858e7(0x29e)](_0x2f1743)){if('XxRDs'===_0x5858e7(0x31c)){_0x93730c=_0x3562d2[_0x5858e7(0x1ca)]()[_0x5858e7(0x269)]();const _0x54c572=this[_0x5858e7(0x17c)](_0x355e9f);if(!_0x54c572)return'';const _0x359a7a=this['questData']()[_0x5858e7(0x175)];_0x359a7a[_0x1780d7]=_0x359a7a[_0x184787]||0x1;const _0x19d5b1=_0x359a7a[_0x292c57];return _0x54c572[_0x5858e7(0x17a)][_0x19d5b1]||'';}else _0x2b3a27=_0x5858e7(0x290)[_0x5858e7(0x2d7)](_0x2f1743['id']);}else return;}}if(!this[_0x5858e7(0x1cd)][_0x5858e7(0x18f)](_0x2b3a27))this[_0x5858e7(0x1cd)][_0x5858e7(0x337)](_0x2b3a27);},Game_Party[_0x229f1a(0x2c9)][_0x229f1a(0x1a2)]=function(_0x56ce83){const _0x186767=_0x229f1a;if(!$gameTemp['newLabelEnabled']())return;if(this['_questLabelItemsList']===undefined)this[_0x186767(0xf0)]();let _0x2bf97f='';if(DataManager['isItem'](_0x56ce83))_0x186767(0x244)!=='zQwfd'?_0x10fdfc='item-%1'['format'](_0x76bb9d['id']):_0x2bf97f=_0x186767(0x32c)[_0x186767(0x2d7)](_0x56ce83['id']);else{if(DataManager['isWeapon'](_0x56ce83))_0x2bf97f=_0x186767(0x2f8)['format'](_0x56ce83['id']);else{if(DataManager['isArmor'](_0x56ce83))_0x2bf97f=_0x186767(0x290)[_0x186767(0x2d7)](_0x56ce83['id']);else return;}}this['_questLabelItemsList'][_0x186767(0x18f)](_0x2bf97f)&&this[_0x186767(0x1cd)][_0x186767(0x2ff)](this[_0x186767(0x1cd)][_0x186767(0x101)](_0x2bf97f),0x1);},VisuMZ[_0x229f1a(0x121)]['Game_Map_requestRefresh']=Game_Map[_0x229f1a(0x2c9)]['requestRefresh'],Game_Map['prototype'][_0x229f1a(0x135)]=function(){const _0x447b84=_0x229f1a;VisuMZ[_0x447b84(0x121)][_0x447b84(0x336)][_0x447b84(0x1da)](this),SceneManager['isSceneMap']()&&!this[_0x447b84(0x304)]&&('IffiV'!==_0x447b84(0x1c9)?this[_0x447b84(0x304)]=!![]:(this['updateQuestLabelOpacity'](),_0x5cd585[_0x447b84(0x121)]['Window_Selectable_update'][_0x447b84(0x1da)](this)));},VisuMZ[_0x229f1a(0x121)][_0x229f1a(0xe0)]=Game_Map['prototype'][_0x229f1a(0x20f)],Game_Map[_0x229f1a(0x2c9)][_0x229f1a(0x20f)]=function(){const _0x5161ba=_0x229f1a;VisuMZ['QuestSystem'][_0x5161ba(0xe0)][_0x5161ba(0x1da)](this),SceneManager[_0x5161ba(0x279)]()&&this[_0x5161ba(0x304)]&&(SceneManager['_scene']['refreshQuestTrackerWindow'](),this[_0x5161ba(0x304)]=![]);},VisuMZ[_0x229f1a(0x121)][_0x229f1a(0xe2)]=Scene_Map[_0x229f1a(0x2c9)][_0x229f1a(0x110)],Scene_Map[_0x229f1a(0x2c9)][_0x229f1a(0x110)]=function(){const _0x7dad60=_0x229f1a;VisuMZ['QuestSystem'][_0x7dad60(0xe2)][_0x7dad60(0x1da)](this),this[_0x7dad60(0x1a1)]();},Scene_Map['prototype'][_0x229f1a(0x1a1)]=function(){const _0x153811=_0x229f1a;if(!SceneManager['isSceneMap']())return;const _0x11e3bc=this[_0x153811(0x28f)](),_0x47916e=new Window_QuestTracker(_0x11e3bc);this[_0x153811(0x21e)](_0x47916e),this[_0x153811(0x249)]=_0x47916e;},Scene_Map['prototype'][_0x229f1a(0x125)]=function(){const _0xb9f8cb=_0x229f1a;return ConfigManager[_0xb9f8cb(0x2b2)];},Scene_Map[_0x229f1a(0x2c9)]['questTrackerWindow']=function(){const _0x4767f2=_0x229f1a;return VisuMZ['QuestSystem'][_0x4767f2(0x26a)]['Window'][_0x4767f2(0xfe)][_0x4767f2(0x1da)](this);},Scene_Map[_0x229f1a(0x2c9)][_0x229f1a(0x213)]=function(){const _0x5eb477=_0x229f1a;if(!this[_0x5eb477(0x249)])return;this[_0x5eb477(0x249)]['refresh']();},Scene_Map[_0x229f1a(0x2c9)][_0x229f1a(0x297)]=function(_0x29ae18){const _0x3c2ec4=_0x229f1a;if(!this[_0x3c2ec4(0x249)])return;_0x29ae18=_0x29ae18['toUpperCase']()[_0x3c2ec4(0x269)]();const _0x585724=$gameSystem['quest'](_0x29ae18);this[_0x3c2ec4(0x249)][_0x3c2ec4(0x221)](_0x585724);},VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x181)]=Scene_Menu[_0x229f1a(0x2c9)][_0x229f1a(0x1e8)],Scene_Menu['prototype']['createCommandWindow']=function(){const _0xaae266=_0x229f1a;VisuMZ['QuestSystem'][_0xaae266(0x181)]['call'](this),this[_0xaae266(0x295)][_0xaae266(0x2de)]('quest',this['commandQuest'][_0xaae266(0x193)](this));},Scene_Menu[_0x229f1a(0x2c9)][_0x229f1a(0x12e)]=function(){const _0x67bd3b=_0x229f1a;SceneManager[_0x67bd3b(0x337)](Scene_Quest);},VisuMZ['QuestSystem'][_0x229f1a(0x187)]=Scene_Options[_0x229f1a(0x2c9)][_0x229f1a(0x1fa)],Scene_Options[_0x229f1a(0x2c9)][_0x229f1a(0x1fa)]=function(){const _0x512bc8=_0x229f1a;let _0x1578ae=VisuMZ['QuestSystem']['Scene_Options_maxCommands'][_0x512bc8(0x1da)](this);if(VisuMZ['QuestSystem'][_0x512bc8(0x26a)]['Tracker'][_0x512bc8(0x1bb)]){if(VisuMZ[_0x512bc8(0x121)][_0x512bc8(0x26a)][_0x512bc8(0x334)]['AddShowOption'])_0x1578ae++;if(VisuMZ[_0x512bc8(0x121)]['Settings']['Tracker']['AddPositionOption'])_0x1578ae++;}return _0x1578ae;};function Scene_Quest(){const _0x1f145c=_0x229f1a;this[_0x1f145c(0x329)](...arguments);}Scene_Quest[_0x229f1a(0x2c9)]=Object[_0x229f1a(0x2c8)](Scene_MenuBase[_0x229f1a(0x2c9)]),Scene_Quest[_0x229f1a(0x2c9)][_0x229f1a(0x119)]=Scene_Quest,Scene_Quest[_0x229f1a(0x2c9)]['initialize']=function(){const _0x21536e=_0x229f1a;Scene_MenuBase[_0x21536e(0x2c9)][_0x21536e(0x329)][_0x21536e(0x1da)](this);},Scene_Quest[_0x229f1a(0x2c9)][_0x229f1a(0x14a)]=function(){return 0x0;},Scene_Quest[_0x229f1a(0x2c9)][_0x229f1a(0x205)]=function(){const _0x353d96=_0x229f1a;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x353d96(0x222)]!==undefined){if('aGeoq'!==_0x353d96(0x239))return ConfigManager[_0x353d96(0x222)];else{_0x1b222a=_0x4d64bd[_0x353d96(0x1ca)]()[_0x353d96(0x269)]();const _0x732531=_0x18c3fa['quest'](_0x2ccac1);if(!_0x732531)return-0x1;_0x503e80[_0x353d96(0x313)](_0x489f5b);const _0x10c16a=_0x2bce85['questData']()[_0x353d96(0x11b)]||{};if(!_0x10c16a[_0x30df5b])return 0x0;return _0x10c16a[_0x588e1e][_0x353d96(0x16f)];}}else{if(ConfigManager[_0x353d96(0x1f3)]===![]){if(_0x353d96(0x188)!=='HkEUr')_0x6e8d65[_0x353d96(0x199)][_0x353d96(0x213)]();else return![];}else return Scene_MenuBase['prototype']['isRightInputMode']['call'](this);}},Scene_Quest['prototype'][_0x229f1a(0x1e3)]=function(){const _0x28a447=_0x229f1a;return(Graphics[_0x28a447(0x1d6)]-0x230)['clamp'](0xf0,Math[_0x28a447(0x2fe)](Graphics['boxWidth']/0x2));},Scene_Quest[_0x229f1a(0x2c9)][_0x229f1a(0x2c8)]=function(){const _0x3bb8b8=_0x229f1a;Scene_MenuBase[_0x3bb8b8(0x2c9)][_0x3bb8b8(0x2c8)][_0x3bb8b8(0x1da)](this),this[_0x3bb8b8(0x1e8)](),this['createQuestLabelWindow'](),this[_0x3bb8b8(0x32a)](),this['createQuestListWindow']();},Scene_Quest[_0x229f1a(0x2c9)]['createCommandWindow']=function(){const _0x339a86=_0x229f1a,_0x5a7378=this[_0x339a86(0x2b9)](),_0x78ee2d=new Window_QuestCommand(_0x5a7378);_0x78ee2d['setHandler'](_0x339a86(0x284),this[_0x339a86(0x201)]['bind'](this)),_0x78ee2d[_0x339a86(0x2de)](_0x339a86(0x144),this[_0x339a86(0x201)][_0x339a86(0x193)](this)),_0x78ee2d[_0x339a86(0x2de)](_0x339a86(0x1b5),this[_0x339a86(0x201)][_0x339a86(0x193)](this)),_0x78ee2d[_0x339a86(0x2de)]('cancel',this[_0x339a86(0x151)][_0x339a86(0x193)](this)),this[_0x339a86(0x1b8)](_0x78ee2d),this[_0x339a86(0x295)]=_0x78ee2d,_0x78ee2d[_0x339a86(0x165)](VisuMZ[_0x339a86(0x121)][_0x339a86(0x26a)]['Window'][_0x339a86(0x2be)]);},Scene_Quest[_0x229f1a(0x2c9)][_0x229f1a(0x2b9)]=function(){const _0x50c654=_0x229f1a;return VisuMZ['QuestSystem'][_0x50c654(0x26a)][_0x50c654(0x225)][_0x50c654(0x104)][_0x50c654(0x1da)](this);},Scene_Quest[_0x229f1a(0x2c9)][_0x229f1a(0x11d)]=function(){const _0x21ff20=_0x229f1a,_0x459d05=this['questLabelWindowRect'](),_0x397ed0=new Window_Base(_0x459d05);this[_0x21ff20(0x1b8)](_0x397ed0),this['_labelWindow']=_0x397ed0,_0x397ed0[_0x21ff20(0x165)](VisuMZ[_0x21ff20(0x121)][_0x21ff20(0x26a)][_0x21ff20(0x225)][_0x21ff20(0x283)]);},Scene_Quest[_0x229f1a(0x2c9)]['questLabelWindowRect']=function(){const _0x22f4b6=_0x229f1a;return VisuMZ[_0x22f4b6(0x121)][_0x22f4b6(0x26a)][_0x22f4b6(0x225)][_0x22f4b6(0x233)][_0x22f4b6(0x1da)](this);},Scene_Quest[_0x229f1a(0x2c9)][_0x229f1a(0x32a)]=function(){const _0x57320f=_0x229f1a,_0x39b594=this[_0x57320f(0x1d7)](),_0x301f1a=new Window_QuestLog(_0x39b594);this[_0x57320f(0x1b8)](_0x301f1a),this[_0x57320f(0x2c5)]=_0x301f1a,_0x301f1a['setBackgroundType'](VisuMZ[_0x57320f(0x121)][_0x57320f(0x26a)][_0x57320f(0x225)][_0x57320f(0x1ba)]);},Scene_Quest[_0x229f1a(0x2c9)][_0x229f1a(0x1d7)]=function(){const _0x34d0c9=_0x229f1a;return VisuMZ['QuestSystem'][_0x34d0c9(0x26a)][_0x34d0c9(0x225)][_0x34d0c9(0x131)][_0x34d0c9(0x1da)](this);},Scene_Quest[_0x229f1a(0x2c9)][_0x229f1a(0x227)]=function(){const _0x591ea9=_0x229f1a,_0x1c6d4b=this[_0x591ea9(0x2cb)](),_0x177700=new Window_QuestList(_0x1c6d4b);_0x177700['setHandler'](_0x591ea9(0x206),this[_0x591ea9(0x1e2)][_0x591ea9(0x193)](this)),_0x177700['setHandler'](_0x591ea9(0x17c),this[_0x591ea9(0x325)][_0x591ea9(0x193)](this)),_0x177700[_0x591ea9(0x2de)](_0x591ea9(0x319),this['onListCancel'][_0x591ea9(0x193)](this)),this[_0x591ea9(0x1b8)](_0x177700),this[_0x591ea9(0x134)]=_0x177700,_0x177700[_0x591ea9(0x165)](VisuMZ[_0x591ea9(0x121)]['Settings']['Window'][_0x591ea9(0x252)]),this[_0x591ea9(0x295)][_0x591ea9(0xfa)](this[_0x591ea9(0x134)]),this['_listWindow'][_0x591ea9(0x13c)](this['_labelWindow']),this[_0x591ea9(0x134)][_0x591ea9(0x268)](this[_0x591ea9(0x2c5)]);},Scene_Quest[_0x229f1a(0x2c9)]['questListWindowRect']=function(){const _0x3f48f7=_0x229f1a;return VisuMZ[_0x3f48f7(0x121)][_0x3f48f7(0x26a)][_0x3f48f7(0x225)][_0x3f48f7(0x260)]['call'](this);},Scene_Quest[_0x229f1a(0x2c9)][_0x229f1a(0x201)]=function(){const _0x396bd5=_0x229f1a;this[_0x396bd5(0x134)][_0x396bd5(0x1a5)](),this[_0x396bd5(0x134)][_0x396bd5(0x192)](0x0);},Scene_Quest[_0x229f1a(0x2c9)][_0x229f1a(0x1e2)]=function(){const _0x3c28ca=_0x229f1a;this[_0x3c28ca(0x134)][_0x3c28ca(0x2ca)](),this[_0x3c28ca(0x134)][_0x3c28ca(0x1a5)]();},Scene_Quest['prototype'][_0x229f1a(0x325)]=function(){const _0x1e1390=_0x229f1a,_0x4f2fc5=this[_0x1e1390(0x134)][_0x1e1390(0x301)](),_0x2ea42d=_0x4f2fc5[_0x1e1390(0x1a4)]['toUpperCase']()[_0x1e1390(0x269)]();$gameSystem[_0x1e1390(0x326)](_0x2ea42d,!![]),this[_0x1e1390(0x134)][_0x1e1390(0x20f)](),this['_listWindow'][_0x1e1390(0x1a5)]();},Scene_Quest['prototype'][_0x229f1a(0x127)]=function(){const _0x54a025=_0x229f1a;this['_listWindow'][_0x54a025(0x258)](),this[_0x54a025(0x295)][_0x54a025(0x1a5)]();},Scene_Quest[_0x229f1a(0x2c9)][_0x229f1a(0x240)]=function(){return TextManager['questButtonAssistPageUpDn'];},Scene_Quest[_0x229f1a(0x2c9)][_0x229f1a(0x202)]=function(){const _0xe8c7e4=_0x229f1a;if(this['_listWindow']&&this[_0xe8c7e4(0x134)]['active']){if(_0xe8c7e4(0x10b)!==_0xe8c7e4(0x216)){if(this[_0xe8c7e4(0x134)][_0xe8c7e4(0x301)]())return this[_0xe8c7e4(0x134)]['isOkEnabled']()?TextManager[_0xe8c7e4(0x1ce)]:'';else return this[_0xe8c7e4(0x134)][_0xe8c7e4(0x1e4)]()?TextManager[_0xe8c7e4(0x1fd)]:TextManager[_0xe8c7e4(0x173)];}else _0x3612f5='item-%1'[_0xe8c7e4(0x2d7)](_0x38dd3e['id']);}return Scene_MenuBase['prototype'][_0xe8c7e4(0x202)][_0xe8c7e4(0x1da)](this);},Scene_Quest[_0x229f1a(0x2c9)]['createBackground']=function(){const _0xcc8a39=_0x229f1a;Scene_MenuBase[_0xcc8a39(0x2c9)][_0xcc8a39(0x132)][_0xcc8a39(0x1da)](this),this[_0xcc8a39(0x25c)](this[_0xcc8a39(0x28d)]()),this[_0xcc8a39(0x161)]();},Scene_Quest['prototype'][_0x229f1a(0x28d)]=function(){const _0xa9cd44=_0x229f1a;return VisuMZ['QuestSystem'][_0xa9cd44(0x26a)][_0xa9cd44(0x154)][_0xa9cd44(0x10a)];},Scene_Quest[_0x229f1a(0x2c9)][_0x229f1a(0x161)]=function(){const _0x161915=_0x229f1a,_0x1e37e2={'BgFilename1':VisuMZ['QuestSystem']['Settings']['BgSettings'][_0x161915(0x241)],'BgFilename2':VisuMZ[_0x161915(0x121)][_0x161915(0x26a)][_0x161915(0x154)]['BgFilename2']};if(_0x1e37e2&&(_0x1e37e2[_0x161915(0x241)]!==''||_0x1e37e2[_0x161915(0x259)]!=='')){if('uNFMg'!==_0x161915(0x232))this['_backSprite1']=new Sprite(ImageManager[_0x161915(0x2aa)](_0x1e37e2['BgFilename1'])),this[_0x161915(0x265)]=new Sprite(ImageManager[_0x161915(0x120)](_0x1e37e2[_0x161915(0x259)])),this['addChild'](this[_0x161915(0x15d)]),this[_0x161915(0x21e)](this[_0x161915(0x265)]),this[_0x161915(0x15d)][_0x161915(0x317)][_0x161915(0x1ab)](this[_0x161915(0x234)][_0x161915(0x193)](this,this['_backSprite1'])),this[_0x161915(0x265)][_0x161915(0x317)][_0x161915(0x1ab)](this[_0x161915(0x234)][_0x161915(0x193)](this,this[_0x161915(0x265)]));else{const _0x43fd5e=_0x37f4dc[_0x565954];if(_0x43fd5e)_0x1ba0f0[_0x161915(0x1a2)](_0x43fd5e);}}},Scene_Quest[_0x229f1a(0x2c9)]['adjustSprite']=function(_0x1cf541){const _0x24b268=_0x229f1a;this['scaleSprite'](_0x1cf541),this[_0x24b268(0x163)](_0x1cf541);};function Sprite_QuestLabel(){const _0x4535=_0x229f1a;this[_0x4535(0x329)](...arguments);}Sprite_QuestLabel['prototype']=Object[_0x229f1a(0x2c8)](Sprite[_0x229f1a(0x2c9)]),Sprite_QuestLabel[_0x229f1a(0x2c9)][_0x229f1a(0x119)]=Sprite_QuestLabel,Sprite_QuestLabel[_0x229f1a(0x2c9)][_0x229f1a(0x329)]=function(){const _0x54a932=_0x229f1a;Sprite[_0x54a932(0x2c9)][_0x54a932(0x329)]['call'](this),this[_0x54a932(0x11e)]();},Sprite_QuestLabel[_0x229f1a(0x2c9)][_0x229f1a(0x11e)]=function(){const _0x1438bc=_0x229f1a,_0x5c57b7=ImageManager[_0x1438bc(0x2b1)],_0x30b27a=ImageManager[_0x1438bc(0x267)];this[_0x1438bc(0x317)]=new Bitmap(_0x5c57b7,_0x30b27a),this[_0x1438bc(0x20c)](),this['drawNewLabelText']();},Sprite_QuestLabel[_0x229f1a(0x2c9)][_0x229f1a(0x20c)]=function(){const _0x2f5b7b=_0x229f1a,_0x22a226=VisuMZ[_0x2f5b7b(0x121)][_0x2f5b7b(0x26a)]['Label'][_0x2f5b7b(0x303)];if(_0x22a226<=0x0)return;const _0x17bbea=ImageManager[_0x2f5b7b(0x183)](_0x2f5b7b(0x2ae)),_0x18a371=ImageManager[_0x2f5b7b(0x2b1)],_0x571527=ImageManager['iconHeight'],_0xf96aa9=_0x22a226%0x10*_0x18a371,_0x161cb8=Math[_0x2f5b7b(0x2fe)](_0x22a226/0x10)*_0x571527;this[_0x2f5b7b(0x317)][_0x2f5b7b(0x330)](_0x17bbea,_0xf96aa9,_0x161cb8,_0x18a371,_0x571527,0x0,0x0);},Sprite_QuestLabel[_0x229f1a(0x2c9)]['drawNewLabelText']=function(){const _0x5a2042=_0x229f1a,_0x42abe9=VisuMZ[_0x5a2042(0x121)][_0x5a2042(0x26a)][_0x5a2042(0x16a)],_0x575ebe=_0x42abe9[_0x5a2042(0x153)];if(_0x575ebe==='')return;const _0x2eaa5a=ImageManager[_0x5a2042(0x2b1)],_0x2c9ce7=ImageManager[_0x5a2042(0x267)];this[_0x5a2042(0x317)][_0x5a2042(0x1c7)]=_0x42abe9[_0x5a2042(0xe3)]||$gameSystem[_0x5a2042(0x113)](),this[_0x5a2042(0x317)]['textColor']=this[_0x5a2042(0x128)](),this[_0x5a2042(0x317)][_0x5a2042(0xf2)]=_0x42abe9[_0x5a2042(0x217)],this[_0x5a2042(0x317)]['drawText'](_0x575ebe,0x0,_0x2c9ce7/0x2,_0x2eaa5a,_0x2c9ce7/0x2,_0x5a2042(0x1f9));},Sprite_QuestLabel[_0x229f1a(0x2c9)][_0x229f1a(0x128)]=function(){const _0x2930cb=_0x229f1a,_0x17d135=VisuMZ[_0x2930cb(0x121)][_0x2930cb(0x26a)][_0x2930cb(0x16a)]['FontColor'];return _0x17d135['match'](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager['textColor'](_0x17d135);},VisuMZ[_0x229f1a(0x121)]['Window_Selectable_initialize']=Window_Selectable['prototype'][_0x229f1a(0x329)],Window_Selectable[_0x229f1a(0x2c9)][_0x229f1a(0x329)]=function(_0x182257){const _0x2ade68=_0x229f1a;this[_0x2ade68(0x14c)](),VisuMZ[_0x2ade68(0x121)][_0x2ade68(0x2f4)]['call'](this,_0x182257);},Window_Selectable[_0x229f1a(0x2c9)][_0x229f1a(0x14c)]=function(){const _0x43db01=_0x229f1a;this[_0x43db01(0x21a)]={},this[_0x43db01(0x2f9)]=0xff,this[_0x43db01(0x10f)]=VisuMZ[_0x43db01(0x121)][_0x43db01(0x26a)][_0x43db01(0x16a)][_0x43db01(0x2f0)],this[_0x43db01(0x243)]=VisuMZ[_0x43db01(0x121)][_0x43db01(0x26a)][_0x43db01(0x16a)][_0x43db01(0x16c)];},Window_Selectable['prototype'][_0x229f1a(0x1bd)]=function(){return!![];},VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x228)]=Window_Selectable['prototype']['refresh'],Window_Selectable['prototype']['refresh']=function(){const _0x473832=_0x229f1a;this[_0x473832(0x1ea)](),VisuMZ[_0x473832(0x121)][_0x473832(0x228)][_0x473832(0x1da)](this);},Window_Selectable[_0x229f1a(0x2c9)][_0x229f1a(0x1ea)]=function(){const _0x524049=_0x229f1a;for(const _0x5a9a85 of Object[_0x524049(0x2d2)](this['_questLabelSprites'])){_0x5a9a85['hide']();}},VisuMZ['QuestSystem'][_0x229f1a(0x1ad)]=Window_Selectable[_0x229f1a(0x2c9)][_0x229f1a(0x1b4)],Window_Selectable[_0x229f1a(0x2c9)]['update']=function(){const _0x4d2ef1=_0x229f1a;this[_0x4d2ef1(0x109)](),VisuMZ[_0x4d2ef1(0x121)][_0x4d2ef1(0x1ad)][_0x4d2ef1(0x1da)](this);},Window_Selectable['prototype'][_0x229f1a(0x109)]=function(){const _0x4871ef=_0x229f1a;if(!this[_0x4871ef(0x1bd)]())return;const _0x4f72aa=this['_questLabelOpacityUpperLimit'];this[_0x4871ef(0x2f9)]+=this['_questLabelOpacityChange'];(this['_questLabelOpacity']>=_0x4f72aa||this[_0x4871ef(0x2f9)]<=0x0)&&(this[_0x4871ef(0x10f)]*=-0x1);this['_questLabelOpacity']=this[_0x4871ef(0x2f9)]['clamp'](0x0,_0x4f72aa);for(const _0x2e31b3 of Object['values'](this[_0x4871ef(0x21a)])){_0x4871ef(0x136)===_0x4871ef(0x136)?_0x2e31b3[_0x4871ef(0x157)]=this['_questLabelOpacity']:(_0xcef088[_0x4871ef(0x121)][_0x4871ef(0x181)][_0x4871ef(0x1da)](this),this[_0x4871ef(0x295)]['setHandler'](_0x4871ef(0x17c),this[_0x4871ef(0x12e)][_0x4871ef(0x193)](this)));}},Window_Selectable[_0x229f1a(0x2c9)][_0x229f1a(0x186)]=function(_0x1c1636){const _0x5cfa42=_0x229f1a,_0x29d4ec=this['_questLabelSprites'];if(_0x29d4ec[_0x1c1636])return _0x29d4ec[_0x1c1636];else{const _0x402c42=new Sprite_QuestLabel();return _0x29d4ec[_0x1c1636]=_0x402c42,this[_0x5cfa42(0x32b)](_0x402c42),_0x402c42;}},Window_Selectable[_0x229f1a(0x2c9)][_0x229f1a(0x31d)]=function(_0x362d53,_0x537062,_0x24c7fc){const _0x34c8ce=_0x229f1a;let _0x13f096='';if(DataManager[_0x34c8ce(0x263)](_0x362d53)){if(_0x34c8ce(0x1c6)===_0x34c8ce(0x1c6))_0x13f096=_0x34c8ce(0x32c)['format'](_0x362d53['id']);else{_0x4a0647=_0x559a19[_0x34c8ce(0x1ca)]()[_0x34c8ce(0x269)]();const _0x69ecb0=_0x473176[_0x34c8ce(0x17c)](_0x37a52d);if(!_0x69ecb0)return-0x1;_0x49456f[_0x34c8ce(0x247)](_0x358f76);const _0x4dfdb1=_0x4b0b6f[_0x34c8ce(0x1cb)]()['objectives']||{};if(!_0x4dfdb1[_0x56e377])return 0x0;return _0x4dfdb1[_0x3c3cc0]['length'];}}else{if(DataManager[_0x34c8ce(0x18a)](_0x362d53)){if('AEgMp'!==_0x34c8ce(0x280))return this[_0x34c8ce(0x2e4)]()===_0x34c8ce(0x17c)?this[_0x34c8ce(0x1de)]():null;else _0x13f096=_0x34c8ce(0x2f8)[_0x34c8ce(0x2d7)](_0x362d53['id']);}else{if(DataManager[_0x34c8ce(0x29e)](_0x362d53))_0x13f096=_0x34c8ce(0x290)['format'](_0x362d53['id']);else return;}}const _0x3434a6=this[_0x34c8ce(0x186)](_0x13f096);_0x3434a6[_0x34c8ce(0x1d9)](_0x537062,_0x24c7fc),_0x3434a6[_0x34c8ce(0xee)](),_0x3434a6[_0x34c8ce(0x157)]=this['_questLabelOpacity'];},VisuMZ['QuestSystem'][_0x229f1a(0x15e)]=Window_ItemList['prototype'][_0x229f1a(0x123)],Window_ItemList['prototype'][_0x229f1a(0x123)]=function(_0x75b803){const _0x11d38d=_0x229f1a;VisuMZ[_0x11d38d(0x121)][_0x11d38d(0x15e)][_0x11d38d(0x1da)](this,_0x75b803),this[_0x11d38d(0x282)](_0x75b803);},Window_ItemList['prototype'][_0x229f1a(0x282)]=function(_0x35965b){const _0x438025=_0x229f1a,_0x1f5df2=this[_0x438025(0x1b6)](_0x35965b);if(!_0x1f5df2||!this[_0x438025(0x1bd)]())return;if(!$gameParty['isQuestItem'](_0x1f5df2))return;const _0x12e1d0=this[_0x438025(0x209)](_0x35965b),_0x3ac3aa=_0x12e1d0['x'],_0x58d296=_0x12e1d0['y']+(this[_0x438025(0x12b)]()-ImageManager[_0x438025(0x267)])/0x2,_0xdafb3c=VisuMZ[_0x438025(0x121)][_0x438025(0x26a)][_0x438025(0x16a)][_0x438025(0x148)],_0x7da674=VisuMZ[_0x438025(0x121)][_0x438025(0x26a)][_0x438025(0x16a)][_0x438025(0x130)];this['placeQuestLabel'](_0x1f5df2,_0x3ac3aa+_0xdafb3c,_0x58d296+_0x7da674);},VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x271)]=Window_MenuCommand[_0x229f1a(0x2c9)]['addOriginalCommands'],Window_MenuCommand[_0x229f1a(0x2c9)][_0x229f1a(0x277)]=function(){const _0x340225=_0x229f1a;VisuMZ[_0x340225(0x121)][_0x340225(0x271)][_0x340225(0x1da)](this),this[_0x340225(0x30b)]();},Window_MenuCommand[_0x229f1a(0x2c9)][_0x229f1a(0x30b)]=function(){const _0x8d9b80=_0x229f1a;if(!this['addQuestCommandAutomatically']())return;if(!this['isQuestCommandVisible']())return;const _0x41d529=TextManager[_0x8d9b80(0x328)],_0x33eef1=this[_0x8d9b80(0x305)]();this[_0x8d9b80(0x1e6)](_0x41d529,_0x8d9b80(0x17c),_0x33eef1);},Window_MenuCommand[_0x229f1a(0x2c9)][_0x229f1a(0x1a8)]=function(){const _0x3a61d9=_0x229f1a;return Imported[_0x3a61d9(0x1cf)]?![]:!![];},Window_MenuCommand[_0x229f1a(0x2c9)][_0x229f1a(0xe7)]=function(){const _0x28d783=_0x229f1a;return $gameSystem[_0x28d783(0x27c)]();},Window_MenuCommand['prototype']['isQuestCommandEnabled']=function(){const _0x386b98=_0x229f1a;return $gameSystem[_0x386b98(0x10c)]();},VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x185)]=Window_Options[_0x229f1a(0x2c9)][_0x229f1a(0x2b0)],Window_Options[_0x229f1a(0x2c9)][_0x229f1a(0x2b0)]=function(){const _0x10aaa1=_0x229f1a;VisuMZ[_0x10aaa1(0x121)][_0x10aaa1(0x185)][_0x10aaa1(0x1da)](this),this[_0x10aaa1(0x2d1)]();},Window_Options[_0x229f1a(0x2c9)][_0x229f1a(0x2d1)]=function(){const _0x1f3c16=_0x229f1a;VisuMZ[_0x1f3c16(0x121)][_0x1f3c16(0x26a)][_0x1f3c16(0x334)][_0x1f3c16(0x100)]&&this['addQuestSystemquestTrackerShowCommand'](),VisuMZ[_0x1f3c16(0x121)][_0x1f3c16(0x26a)]['Tracker'][_0x1f3c16(0x16d)]&&this[_0x1f3c16(0x321)]();},Window_Options[_0x229f1a(0x2c9)]['addQuestSystemquestTrackerShowCommand']=function(){const _0x2e3497=_0x229f1a,_0x583ac5=TextManager['questTrackerShow'],_0x2d4c41='questTrackerShow';this[_0x2e3497(0x1e6)](_0x583ac5,_0x2d4c41);},Window_Options[_0x229f1a(0x2c9)][_0x229f1a(0x321)]=function(){const _0x33018a=_0x229f1a,_0xf60721=TextManager[_0x33018a(0x2b2)],_0x560bb3=_0x33018a(0x2b2);this[_0x33018a(0x1e6)](_0xf60721,_0x560bb3);},VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x2f3)]=Window_Options['prototype'][_0x229f1a(0xec)],Window_Options[_0x229f1a(0x2c9)]['statusText']=function(_0x5c1743){const _0x18adbc=_0x229f1a,_0x315187=this[_0x18adbc(0x18c)](_0x5c1743);if(_0x315187==='questTrackerPosition'){const _0xc00166=this['getConfigValue'](_0x315187);return _0xc00166?TextManager[_0x18adbc(0x129)]:TextManager[_0x18adbc(0x1f1)];}return VisuMZ[_0x18adbc(0x121)]['Window_Options_statusText'][_0x18adbc(0x1da)](this,_0x5c1743);};function Window_QuestCommand(){const _0x50d299=_0x229f1a;this[_0x50d299(0x329)](...arguments);}Window_QuestCommand['prototype']=Object['create'](Window_Command[_0x229f1a(0x2c9)]),Window_QuestCommand[_0x229f1a(0x2c9)]['constructor']=Window_QuestCommand,Window_QuestCommand[_0x229f1a(0x2c9)]['initialize']=function(_0x1b736b){const _0x1991d4=_0x229f1a;Window_Command[_0x1991d4(0x2c9)][_0x1991d4(0x329)][_0x1991d4(0x1da)](this,_0x1b736b),this[_0x1991d4(0x1eb)](_0x1b736b);},Window_QuestCommand[_0x229f1a(0x2c9)][_0x229f1a(0x1eb)]=function(_0x2aadc9){const _0x4d7cbe=_0x229f1a,_0x432e0d=new Rectangle(0x0,0x0,_0x2aadc9[_0x4d7cbe(0x287)],_0x2aadc9[_0x4d7cbe(0x1c3)]);this[_0x4d7cbe(0x261)]=new Window_Base(_0x432e0d),this[_0x4d7cbe(0x261)][_0x4d7cbe(0x157)]=0x0,this[_0x4d7cbe(0x21e)](this[_0x4d7cbe(0x261)]),this[_0x4d7cbe(0x14b)]();},Window_QuestCommand['prototype'][_0x229f1a(0x2fa)]=function(){const _0x5a8fa0=_0x229f1a;Window_Command[_0x5a8fa0(0x2c9)][_0x5a8fa0(0x2fa)][_0x5a8fa0(0x1da)](this);if(this[_0x5a8fa0(0x261)])this[_0x5a8fa0(0x14b)]();if(this['_listWindow'])this[_0x5a8fa0(0x134)][_0x5a8fa0(0x2d6)](this[_0x5a8fa0(0x2e4)]());},Window_QuestCommand[_0x229f1a(0x2c9)][_0x229f1a(0x14b)]=function(){const _0x137947=_0x229f1a,_0x2190ed=this[_0x137947(0x261)];_0x2190ed[_0x137947(0x1ff)]['clear']();const _0x21e497=this[_0x137947(0x2eb)](this[_0x137947(0xea)]());if(_0x21e497==='icon'){const _0x137ea0=this['itemLineRect'](this[_0x137947(0xea)]());let _0x34d864=this[_0x137947(0x215)](this['index']());_0x34d864=_0x34d864[_0x137947(0xe8)](/\\I\[(\d+)\]/gi,''),_0x2190ed[_0x137947(0x1f7)](),this['commandNameWindowDrawBackground'](_0x34d864,_0x137ea0),this[_0x137947(0x1e0)](_0x34d864,_0x137ea0),this[_0x137947(0x164)](_0x34d864,_0x137ea0);}},Window_QuestCommand['prototype']['commandNameWindowDrawBackground']=function(_0x5e2292,_0x56f32b){},Window_QuestCommand[_0x229f1a(0x2c9)][_0x229f1a(0x1e0)]=function(_0x171a9b,_0x3017f6){const _0x9fd902=_0x229f1a,_0x4d49a5=this[_0x9fd902(0x261)];_0x4d49a5[_0x9fd902(0x242)](_0x171a9b,0x0,_0x3017f6['y'],_0x4d49a5[_0x9fd902(0x160)],_0x9fd902(0x1f9));},Window_QuestCommand[_0x229f1a(0x2c9)][_0x229f1a(0x164)]=function(_0x4d70ed,_0x1e5175){const _0x5570de=_0x229f1a,_0x1b6e15=this['_commandNameWindow'],_0x4a81b4=$gameSystem[_0x5570de(0x1cc)](),_0x4dcbf0=_0x1e5175['x']+Math[_0x5570de(0x2fe)](_0x1e5175['width']/0x2)+_0x4a81b4;_0x1b6e15['x']=_0x1b6e15[_0x5570de(0x287)]/-0x2+_0x4dcbf0,_0x1b6e15['y']=Math['floor'](_0x1e5175[_0x5570de(0x1c3)]/0x2);},Window_QuestCommand[_0x229f1a(0x2c9)]['makeCommandList']=function(){const _0x490610=_0x229f1a;this[_0x490610(0xf1)](),this[_0x490610(0x299)](),this[_0x490610(0x20e)]();},Window_QuestCommand[_0x229f1a(0x2c9)][_0x229f1a(0xf1)]=function(){const _0x1c2eba=_0x229f1a,_0x133254='known',_0x564afb=ImageManager[_0x1c2eba(0x30d)];let _0x4d32aa=TextManager[_0x1c2eba(0x248)];_0x564afb>0x0&&this['commandStyle']()!=='text'&&(_0x4d32aa=_0x1c2eba(0x19c)[_0x1c2eba(0x2d7)](_0x564afb,_0x4d32aa));const _0x296ebd=this[_0x1c2eba(0x189)]();this[_0x1c2eba(0x1e6)](_0x4d32aa,_0x133254,_0x296ebd);},Window_QuestCommand[_0x229f1a(0x2c9)][_0x229f1a(0x189)]=function(){const _0x5bd739=_0x229f1a;return $gameSystem[_0x5bd739(0x25f)]()[_0x5bd739(0x16f)]>0x0;},Window_QuestCommand[_0x229f1a(0x2c9)][_0x229f1a(0x299)]=function(){const _0x52e4b5=_0x229f1a,_0x8891c1=_0x52e4b5(0x144),_0x200b36=ImageManager[_0x52e4b5(0x211)];let _0x38a6d9=TextManager['questCompletedCmd'];if(_0x200b36>0x0&&this[_0x52e4b5(0x2bb)]()!==_0x52e4b5(0x2ef)){if(_0x52e4b5(0x133)!==_0x52e4b5(0xf5))_0x38a6d9='\x5cI[%1]%2'[_0x52e4b5(0x2d7)](_0x200b36,_0x38a6d9);else{_0x41c70e[_0x52e4b5(0x2e7)](_0x20d7f5,_0x197bb9);const _0x49b927=_0x21c768[_0x52e4b5(0x171)],_0x137cd2=_0x2e0149[_0x52e4b5(0x32f)];for(const _0x233fa5 of _0x49b927){_0x447d33[_0x52e4b5(0x28a)](_0x233fa5,_0x137cd2);}_0x27a54d[_0x52e4b5(0x279)]()&&_0xf85eda[_0x52e4b5(0x199)][_0x52e4b5(0x213)]();}}const _0xe06607=this[_0x52e4b5(0x13e)]();this[_0x52e4b5(0x1e6)](_0x38a6d9,_0x8891c1,_0xe06607);},Window_QuestCommand['prototype'][_0x229f1a(0x13e)]=function(){const _0x99768d=_0x229f1a;return $gameSystem[_0x99768d(0x2ce)]()[_0x99768d(0x16f)]>0x0;},Window_QuestCommand['prototype'][_0x229f1a(0x20e)]=function(){const _0x4df81b=_0x229f1a;if(!this[_0x4df81b(0x245)]())return;const _0x5c69bf=_0x4df81b(0x1b5),_0x4c7882=ImageManager[_0x4df81b(0x14e)];let _0x3746e3=TextManager[_0x4df81b(0x105)];_0x4c7882>0x0&&this[_0x4df81b(0x2bb)]()!==_0x4df81b(0x2ef)&&(_0x3746e3=_0x4df81b(0x19c)['format'](_0x4c7882,_0x3746e3));const _0x504f5b=this['isFailedQuestsEnabled']();this[_0x4df81b(0x1e6)](_0x3746e3,_0x5c69bf,_0x504f5b);},Window_QuestCommand[_0x229f1a(0x2c9)]['isFailedQuestsVisible']=function(){const _0xabde08=_0x229f1a;return VisuMZ[_0xabde08(0x121)][_0xabde08(0x26a)]['Window'][_0xabde08(0x294)];},Window_QuestCommand[_0x229f1a(0x2c9)]['isFailedQuestsEnabled']=function(){const _0x208900=_0x229f1a;return $gameSystem[_0x208900(0xf8)]()[_0x208900(0x16f)]>0x0;},Window_QuestCommand[_0x229f1a(0x2c9)][_0x229f1a(0x15f)]=function(){const _0x222fc5=_0x229f1a;return this[_0x222fc5(0x245)]()?0x3:0x2;},Window_QuestCommand[_0x229f1a(0x2c9)][_0x229f1a(0x1c4)]=function(){const _0x5bdb8e=_0x229f1a;return VisuMZ[_0x5bdb8e(0x121)][_0x5bdb8e(0x26a)][_0x5bdb8e(0x225)][_0x5bdb8e(0x289)];},Window_QuestCommand[_0x229f1a(0x2c9)]['drawItem']=function(_0x31e982){const _0x88f8fd=_0x229f1a,_0x4d8018=this[_0x88f8fd(0x2eb)](_0x31e982);if(_0x4d8018===_0x88f8fd(0x2df))_0x88f8fd(0x1a9)===_0x88f8fd(0x2a6)?(_0x5dfd95[_0x88f8fd(0x2c9)][_0x88f8fd(0x329)][_0x88f8fd(0x1da)](this),this['createBitmap']()):this[_0x88f8fd(0xe1)](_0x31e982);else _0x4d8018===_0x88f8fd(0xf6)?this[_0x88f8fd(0x27b)](_0x31e982):Window_HorzCommand['prototype'][_0x88f8fd(0x123)][_0x88f8fd(0x1da)](this,_0x31e982);},Window_QuestCommand[_0x229f1a(0x2c9)][_0x229f1a(0x2bb)]=function(){const _0x39d035=_0x229f1a;return VisuMZ[_0x39d035(0x121)][_0x39d035(0x26a)][_0x39d035(0x225)][_0x39d035(0x32e)];},Window_QuestCommand[_0x229f1a(0x2c9)][_0x229f1a(0x2eb)]=function(_0x215dbb){const _0x358027=_0x229f1a;if(_0x215dbb<0x0)return _0x358027(0x2ef);const _0x283a62=this[_0x358027(0x2bb)]();if(_0x283a62!==_0x358027(0x13b))return _0x283a62;else{if(this['maxItems']()>0x0){const _0x6a39ab=this[_0x358027(0x215)](_0x215dbb);if(_0x6a39ab[_0x358027(0x2c6)](/\\I\[(\d+)\]/i)){const _0x3e7ce5=this['itemLineRect'](_0x215dbb),_0x14c800=this['textSizeEx'](_0x6a39ab)[_0x358027(0x287)];if(_0x14c800<=_0x3e7ce5[_0x358027(0x287)]){if(_0x358027(0x31b)!=='XJICi')_0x26fdbe[_0x358027(0x121)][_0x358027(0x2d0)][_0x358027(0x1da)](this,_0x49799e,_0xc19ed4,_0x58782a),this['questJournalSystemGainItem'](_0x297511,_0x45ca19);else return _0x358027(0x2df);}else return _0x358027(0xf6);}}}return _0x358027(0x2ef);},Window_QuestCommand[_0x229f1a(0x2c9)][_0x229f1a(0xe1)]=function(_0x54d6d0){const _0x5109e6=_0x229f1a,_0xfe1101=this[_0x5109e6(0x209)](_0x54d6d0),_0x3085cb=this['commandName'](_0x54d6d0),_0xa9fd80=this[_0x5109e6(0x182)](_0x3085cb)[_0x5109e6(0x287)];this[_0x5109e6(0x17d)](this[_0x5109e6(0x2cf)](_0x54d6d0));const _0x717cae=this[_0x5109e6(0x1c4)]();if(_0x717cae===_0x5109e6(0x276)){if(_0x5109e6(0x11f)===_0x5109e6(0xf7))return _0x53ef3a[_0x5109e6(0xe8)](/<(?:BR|LINEBREAK)>/gi,'');else this['drawTextEx'](_0x3085cb,_0xfe1101['x']+_0xfe1101[_0x5109e6(0x287)]-_0xa9fd80,_0xfe1101['y'],_0xa9fd80);}else{if(_0x717cae===_0x5109e6(0x1f9)){if(_0x5109e6(0x1e5)==='AhxBL'){const _0x889249=_0xfe1101['x']+Math[_0x5109e6(0x2fe)]((_0xfe1101[_0x5109e6(0x287)]-_0xa9fd80)/0x2);this['drawTextEx'](_0x3085cb,_0x889249,_0xfe1101['y'],_0xa9fd80);}else _0x49b76a+=_0x521b3b;}else this['drawTextEx'](_0x3085cb,_0xfe1101['x'],_0xfe1101['y'],_0xa9fd80);}},Window_QuestCommand[_0x229f1a(0x2c9)]['drawItemStyleIcon']=function(_0x6a9cd1){const _0x3e4966=_0x229f1a;this[_0x3e4966(0x215)](_0x6a9cd1)['match'](/\\I\[(\d+)\]/i);const _0x461a0b=Number(RegExp['$1'])||0x0,_0x2317c4=this[_0x3e4966(0x209)](_0x6a9cd1),_0x314294=_0x2317c4['x']+Math['floor']((_0x2317c4['width']-ImageManager[_0x3e4966(0x2b1)])/0x2),_0x2b199b=_0x2317c4['y']+(_0x2317c4['height']-ImageManager[_0x3e4966(0x267)])/0x2;this[_0x3e4966(0x25e)](_0x461a0b,_0x314294,_0x2b199b);},Window_QuestCommand['prototype']['setListWindow']=function(_0x345ca4){const _0x2631a5=_0x229f1a;this[_0x2631a5(0x134)]=_0x345ca4,this['callUpdateHelp']();};function Window_QuestList(){const _0x7c61de=_0x229f1a;this[_0x7c61de(0x329)](...arguments);}Window_QuestList['categoryList']=VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x26a)][_0x229f1a(0x2bd)],Window_QuestList[_0x229f1a(0x2c9)]=Object['create'](Window_Command['prototype']),Window_QuestList[_0x229f1a(0x2c9)]['constructor']=Window_QuestList,Window_QuestList[_0x229f1a(0x2c9)][_0x229f1a(0x329)]=function(_0x4f14bf){const _0x5267a2=_0x229f1a;this['initCategories'](),Window_Command[_0x5267a2(0x2c9)][_0x5267a2(0x329)]['call'](this,_0x4f14bf),this['createCommandNameWindow'](_0x4f14bf),this[_0x5267a2(0x2e3)](),this[_0x5267a2(0x258)]();},Window_QuestList[_0x229f1a(0x2c9)]['initCategories']=function(){const _0x10a95f=_0x229f1a;this['_categoryStatus']={};for(const _0x54a4b1 of VisuMZ[_0x10a95f(0x121)]['Settings'][_0x10a95f(0x2bd)]){_0x10a95f(0x2a5)===_0x10a95f(0x236)?(_0x5a64a9[_0x10a95f(0x2c9)][_0x10a95f(0x29c)][_0x10a95f(0x1da)](this),this['updatePageUpDownScroll']()):this[_0x10a95f(0x332)][_0x54a4b1[_0x10a95f(0x166)]]=!![];}this[_0x10a95f(0x298)]=_0x10a95f(0x284);},Window_QuestList[_0x229f1a(0x2c9)][_0x229f1a(0x2d6)]=function(_0x2b49d5){const _0x34be1e=_0x229f1a;if(this['_categoryFilter']===_0x2b49d5)return;this[_0x34be1e(0x298)]=_0x2b49d5,this[_0x34be1e(0x20f)]();},Window_QuestList[_0x229f1a(0x2c9)][_0x229f1a(0x2ca)]=function(){const _0x30823a=_0x229f1a,_0x11859d=this[_0x30823a(0x162)]();this[_0x30823a(0x332)][_0x11859d[_0x30823a(0x166)]]=!this[_0x30823a(0x332)][_0x11859d['CategoryName']],this['refresh'](),this[_0x30823a(0x2fa)]();},Window_QuestList[_0x229f1a(0x2c9)][_0x229f1a(0x1e4)]=function(){const _0x13a88c=_0x229f1a,_0x3e68ec=this[_0x13a88c(0x162)]();return _0x3e68ec&&this[_0x13a88c(0x332)][_0x3e68ec[_0x13a88c(0x166)]];},Window_QuestList[_0x229f1a(0x2c9)][_0x229f1a(0x1eb)]=function(_0x1938ca){const _0x33d769=_0x229f1a,_0x5d24c0=new Rectangle(0x0,0x0,_0x1938ca['width'],_0x1938ca[_0x33d769(0x1c3)]);this[_0x33d769(0x261)]=new Window_Base(_0x5d24c0),this['_commandNameWindow'][_0x33d769(0x157)]=0x0,this[_0x33d769(0x21e)](this[_0x33d769(0x261)]),this[_0x33d769(0x14b)]();},Window_QuestList[_0x229f1a(0x2c9)][_0x229f1a(0x2fa)]=function(){const _0x43ec85=_0x229f1a;Window_Command['prototype'][_0x43ec85(0x2fa)]['call'](this);if(this[_0x43ec85(0x261)])this['updateCommandNameWindow']();if(this[_0x43ec85(0x30c)])this[_0x43ec85(0x30f)]();if(this[_0x43ec85(0x2c5)])this['updateLogWindow']();},Window_QuestList[_0x229f1a(0x2c9)]['updateCommandNameWindow']=function(){const _0x2460ca=_0x229f1a,_0x1b7be3=this[_0x2460ca(0x261)];_0x1b7be3[_0x2460ca(0x1ff)][_0x2460ca(0x1c2)]();const _0xec53fd=this[_0x2460ca(0x2eb)](this[_0x2460ca(0xea)]());if(_0xec53fd===_0x2460ca(0xf6)){if('hBxZd'!==_0x2460ca(0x1ae))_0x4c5abe[_0x2460ca(0x121)]['Window_ItemList_drawItem']['call'](this,_0x5300c5),this[_0x2460ca(0x282)](_0x2b0c57);else{const _0x3dcba4=this[_0x2460ca(0x209)](this[_0x2460ca(0xea)]());let _0x47a1c8=this[_0x2460ca(0x215)](this[_0x2460ca(0xea)]());_0x47a1c8=_0x47a1c8[_0x2460ca(0xe8)](/\\I\[(\d+)\]/gi,''),_0x1b7be3[_0x2460ca(0x1f7)](),this[_0x2460ca(0x1f6)](_0x47a1c8,_0x3dcba4),this[_0x2460ca(0x1e0)](_0x47a1c8,_0x3dcba4),this[_0x2460ca(0x164)](_0x47a1c8,_0x3dcba4);}}},Window_QuestList[_0x229f1a(0x2c9)][_0x229f1a(0x1f6)]=function(_0xa7f000,_0x1ccfb4){},Window_QuestList[_0x229f1a(0x2c9)][_0x229f1a(0x1e0)]=function(_0x211647,_0x1b145a){const _0x50f4a1=_0x229f1a,_0x4632be=this['_commandNameWindow'];_0x4632be['drawText'](_0x211647,0x0,_0x1b145a['y'],_0x4632be[_0x50f4a1(0x160)],_0x50f4a1(0x1f9));},Window_QuestList[_0x229f1a(0x2c9)][_0x229f1a(0x164)]=function(_0x1300e9,_0x4c4ead){const _0x3bed83=_0x229f1a,_0x10ba0a=this[_0x3bed83(0x261)],_0x27cc8c=$gameSystem['windowPadding'](),_0x35bb04=_0x4c4ead['x']+Math[_0x3bed83(0x2fe)](_0x4c4ead[_0x3bed83(0x287)]/0x2)+_0x27cc8c;_0x10ba0a['x']=_0x10ba0a[_0x3bed83(0x287)]/-0x2+_0x35bb04,_0x10ba0a['y']=Math[_0x3bed83(0x2fe)](_0x4c4ead[_0x3bed83(0x1c3)]/0x2);},Window_QuestList[_0x229f1a(0x2c9)]['makeCommandList']=function(){const _0x11a574=_0x229f1a;for(const _0x25e438 of Window_QuestList['categoryList']){if(!_0x25e438)continue;if(!this['doesCategoryHaveQuestsAvailable'](_0x25e438))continue;this[_0x11a574(0x1d2)](_0x25e438),this[_0x11a574(0x13f)](_0x25e438);}if(this[_0x11a574(0xf3)]['length']<=0x0){if(_0x11a574(0x2cd)===_0x11a574(0x2cd))this['addNoQuestsListedCommand']();else{const _0x581ce6=this[_0x11a574(0x1cb)]();return _0x581ce6[_0x11a574(0x2c4)];}}},Window_QuestList[_0x229f1a(0x2c9)][_0x229f1a(0x117)]=function(){const _0xa97332=_0x229f1a;this[_0xa97332(0x1e6)](TextManager[_0xa97332(0x14f)],_0xa97332(0x319),![]);},Window_QuestList[_0x229f1a(0x2c9)][_0x229f1a(0x312)]=function(_0x333f24){const _0xd8836=_0x229f1a;for(const _0x5b95ad of _0x333f24[_0xd8836(0x19b)]){if(!_0x5b95ad)continue;switch(this[_0xd8836(0x298)]){case'known':if($gameSystem['isQuestKnown'](_0x5b95ad[_0xd8836(0x1a4)]))return!![];break;case'completed':if($gameSystem[_0xd8836(0x17e)](_0x5b95ad['Key']))return!![];break;case'failed':if($gameSystem['isQuestFailed'](_0x5b95ad['Key']))return!![];break;}}return![];},Window_QuestList[_0x229f1a(0x2c9)]['addCategoryCommand']=function(_0x3346b6){const _0x483b20=_0x229f1a,_0x290f2f=this[_0x483b20(0xfc)](_0x3346b6)?TextManager['questCategoryOpenedFmt']:TextManager[_0x483b20(0x2a0)],_0x3668b0=this[_0x483b20(0x137)](_0x3346b6)[_0x483b20(0x16f)],_0x4a2e51=_0x290f2f['format'](_0x3346b6['CategoryName'],_0x3668b0);this[_0x483b20(0x1e6)](_0x4a2e51,_0x483b20(0x206),!![],_0x3346b6);},Window_QuestList[_0x229f1a(0x2c9)][_0x229f1a(0x137)]=function(_0x36fd79){const _0x1453f5=_0x229f1a;switch(this[_0x1453f5(0x298)]){case _0x1453f5(0x284):return $gameSystem[_0x1453f5(0x25f)]()['filter'](_0x553b60=>_0x553b60[_0x1453f5(0x206)]===_0x36fd79);break;case _0x1453f5(0x144):return $gameSystem['questsCompleted']()['filter'](_0x126cbb=>_0x126cbb[_0x1453f5(0x206)]===_0x36fd79);break;case _0x1453f5(0x1b5):return $gameSystem['questsFailed']()[_0x1453f5(0x18d)](_0x4da6ef=>_0x4da6ef[_0x1453f5(0x206)]===_0x36fd79);break;}return[];},Window_QuestList[_0x229f1a(0x2c9)][_0x229f1a(0x13f)]=function(_0x48a105){const _0x172bd0=_0x229f1a;if(!this[_0x172bd0(0xfc)](_0x48a105))return;for(const _0x1f5207 of _0x48a105[_0x172bd0(0x19b)]){if(_0x172bd0(0x21b)==='WGlCU'){if(!_0x491442[_0x172bd0(0x116)])return 0x0;if(_0x5b8e75[_0x172bd0(0x2dc)])return 0x0;const _0x29b621=_0x5e5bce[_0x172bd0(0x199)];if(_0x29b621&&_0x29b621[_0x172bd0(0x26c)]){if(_0x29b621[_0x172bd0(0x26c)][_0x172bd0(0x12f)]>0x0)return 0x0;}if(!this[_0x172bd0(0x2b6)])return 0x0;if(_0x33804d[_0x172bd0(0x2b8)]())return 0x0;if(_0x25e34b[_0x172bd0(0x1db)]())return 0x0;if(_0x4a85d3[_0x172bd0(0x237)]())return 0x0;return _0x2573f5[_0x172bd0(0x24e)]()?0xff:0x0;}else{if(!_0x1f5207)continue;switch(this[_0x172bd0(0x298)]){case _0x172bd0(0x284):if($gameSystem[_0x172bd0(0x292)](_0x1f5207[_0x172bd0(0x1a4)]))this[_0x172bd0(0x30b)](_0x1f5207);break;case _0x172bd0(0x144):if($gameSystem[_0x172bd0(0x17e)](_0x1f5207[_0x172bd0(0x1a4)]))this['addQuestCommand'](_0x1f5207);break;case _0x172bd0(0x1b5):if($gameSystem[_0x172bd0(0x1fc)](_0x1f5207['Key']))this[_0x172bd0(0x30b)](_0x1f5207);break;}}}},Window_QuestList['prototype']['isCategoryOpen']=function(_0xc278f2){return this['_categoryStatus'][_0xc278f2['CategoryName']];},Window_QuestList['prototype']['addQuestCommand']=function(_0xdedfab){const _0x17417f=_0x229f1a;let _0x3fd704=_0xdedfab[_0x17417f(0x2a9)];_0xdedfab===$gameSystem[_0x17417f(0x25b)]()&&(_0x3fd704=TextManager['questTrackedQuestFmt']['format'](_0x3fd704)),this[_0x17417f(0x1e6)](_0x3fd704,_0x17417f(0x17c),!![],_0xdedfab);},Window_QuestList[_0x229f1a(0x2c9)]['itemTextAlign']=function(){const _0x313327=_0x229f1a;return _0x313327(0x1d8);},Window_QuestList['prototype'][_0x229f1a(0x123)]=function(_0x190730){const _0x506a1d=_0x229f1a,_0x30096b=this[_0x506a1d(0x2eb)](_0x190730);if(_0x30096b==='iconText')this[_0x506a1d(0xe1)](_0x190730);else _0x30096b===_0x506a1d(0xf6)?this[_0x506a1d(0x27b)](_0x190730):Window_HorzCommand[_0x506a1d(0x2c9)][_0x506a1d(0x123)][_0x506a1d(0x1da)](this,_0x190730);},Window_QuestList['prototype'][_0x229f1a(0x2bb)]=function(){const _0x5a0aa0=_0x229f1a;return _0x5a0aa0(0x2df);},Window_QuestList[_0x229f1a(0x2c9)][_0x229f1a(0x2eb)]=function(_0x3387d9){const _0x580b17=_0x229f1a;if(_0x3387d9<0x0)return _0x580b17(0x2ef);const _0x1defc5=this[_0x580b17(0x2bb)]();if(_0x1defc5!=='auto'){if(_0x580b17(0x1e7)===_0x580b17(0x2e9))_0x350f3a[_0x580b17(0x121)][_0x580b17(0x2a8)][_0x580b17(0x1da)](this),this[_0x580b17(0xf0)]();else return _0x1defc5;}else{if(this[_0x580b17(0x1dd)]()>0x0){const _0x843ae9=this[_0x580b17(0x215)](_0x3387d9);if(_0x843ae9[_0x580b17(0x2c6)](/\\I\[(\d+)\]/i)){const _0x40ec41=this[_0x580b17(0x209)](_0x3387d9),_0x5efe67=this[_0x580b17(0x182)](_0x843ae9)[_0x580b17(0x287)];return _0x5efe67<=_0x40ec41[_0x580b17(0x287)]?_0x580b17(0x2df):_0x580b17(0xf6);}}}return'text';},Window_QuestList[_0x229f1a(0x2c9)]['drawItemStyleIconText']=function(_0x5bacdd){const _0x1dd73f=_0x229f1a,_0x2f7481=this[_0x1dd73f(0x209)](_0x5bacdd),_0xea1a21=this[_0x1dd73f(0x215)](_0x5bacdd),_0x3db496=this['textSizeEx'](_0xea1a21)[_0x1dd73f(0x287)];this['changePaintOpacity'](this['isCommandEnabled'](_0x5bacdd));const _0x2edaa3=this['itemTextAlign']();if(_0x2edaa3===_0x1dd73f(0x276))this[_0x1dd73f(0x309)](_0xea1a21,_0x2f7481['x']+_0x2f7481['width']-_0x3db496,_0x2f7481['y'],_0x3db496);else{if(_0x2edaa3===_0x1dd73f(0x1f9)){if(_0x1dd73f(0x11a)!==_0x1dd73f(0x11a))for(const _0x1aaf96 of _0x3a8a55[_0x1dd73f(0x2d2)](this[_0x1dd73f(0x21a)])){_0x1aaf96[_0x1dd73f(0x17f)]();}else{const _0x1a5d3a=_0x2f7481['x']+Math[_0x1dd73f(0x2fe)]((_0x2f7481[_0x1dd73f(0x287)]-_0x3db496)/0x2);this[_0x1dd73f(0x309)](_0xea1a21,_0x1a5d3a,_0x2f7481['y'],_0x3db496);}}else{if(_0x1dd73f(0x29f)===_0x1dd73f(0x2ed)){const _0x5f34ff=this[_0x1dd73f(0x215)](_0x53fa6c);if(_0x5f34ff['match'](/\\I\[(\d+)\]/i)){const _0x461aa1=this[_0x1dd73f(0x209)](_0x9f957),_0x32ff11=this[_0x1dd73f(0x182)](_0x5f34ff)[_0x1dd73f(0x287)];return _0x32ff11<=_0x461aa1['width']?_0x1dd73f(0x2df):_0x1dd73f(0xf6);}}else this[_0x1dd73f(0x309)](_0xea1a21,_0x2f7481['x'],_0x2f7481['y'],_0x3db496);}}},Window_QuestList[_0x229f1a(0x2c9)][_0x229f1a(0x27b)]=function(_0x190807){const _0x5385c0=_0x229f1a;this[_0x5385c0(0x215)](_0x190807)['match'](/\\I\[(\d+)\]/i);const _0x2a5e44=Number(RegExp['$1'])||0x0,_0x127d2d=this[_0x5385c0(0x209)](_0x190807),_0x1539a2=_0x127d2d['x']+Math[_0x5385c0(0x2fe)]((_0x127d2d[_0x5385c0(0x287)]-ImageManager['iconWidth'])/0x2),_0x557dc2=_0x127d2d['y']+(_0x127d2d[_0x5385c0(0x1c3)]-ImageManager[_0x5385c0(0x267)])/0x2;this[_0x5385c0(0x25e)](_0x2a5e44,_0x1539a2,_0x557dc2);},Window_QuestList[_0x229f1a(0x2c9)][_0x229f1a(0x162)]=function(){const _0x1c032b=_0x229f1a;return this['currentSymbol']()===_0x1c032b(0x206)?this[_0x1c032b(0x1de)]():null;},Window_QuestList[_0x229f1a(0x2c9)][_0x229f1a(0x301)]=function(){const _0x1ea8c9=_0x229f1a;return this[_0x1ea8c9(0x2e4)]()==='quest'?this[_0x1ea8c9(0x1de)]():null;},Window_QuestList[_0x229f1a(0x2c9)][_0x229f1a(0x13c)]=function(_0x65ba9){const _0x52d3f9=_0x229f1a;this[_0x52d3f9(0x30c)]=_0x65ba9,this['callUpdateHelp']();},Window_QuestList['prototype']['updateLabelWindow']=function(){const _0x27a6ac=_0x229f1a,_0x4a55bc=this[_0x27a6ac(0x301)](),_0x268dbe=this[_0x27a6ac(0x30c)];_0x268dbe['contents'][_0x27a6ac(0x1c2)]();const _0x2af0c7=_0x4a55bc?_0x4a55bc[_0x27a6ac(0x2a9)]:TextManager['noQuestsLabel'],_0x5879e6=_0x268dbe['textSizeEx'](_0x2af0c7)[_0x27a6ac(0x287)],_0x5823bf=_0x268dbe[_0x27a6ac(0xe5)]()+Math[_0x27a6ac(0x21d)]((_0x268dbe[_0x27a6ac(0x160)]-_0x5879e6)/0x2);_0x268dbe[_0x27a6ac(0x309)](_0x2af0c7,_0x5823bf,0x0,_0x268dbe[_0x27a6ac(0x160)]);},Window_QuestList[_0x229f1a(0x2c9)][_0x229f1a(0x268)]=function(_0x3ade17){const _0x569f4f=_0x229f1a;this[_0x569f4f(0x2c5)]=_0x3ade17,this['callUpdateHelp']();},Window_QuestList[_0x229f1a(0x2c9)][_0x229f1a(0x156)]=function(){const _0x35611f=_0x229f1a,_0x5896d5=this[_0x35611f(0x301)](),_0x41c894=this[_0x35611f(0x2c5)];_0x41c894[_0x35611f(0x221)](_0x5896d5);},Window_QuestList['prototype'][_0x229f1a(0xef)]=function(){},Window_QuestList[_0x229f1a(0x2c9)][_0x229f1a(0x2d5)]=function(){},Window_QuestList['prototype']['isOkEnabled']=function(){const _0xc66342=_0x229f1a;if(this['currentQuest']()){if(_0xc66342(0x19e)!=='zmLtc')return this[_0xc66342(0x298)]===_0xc66342(0x284);else{const _0x52f5c0=this['currentCategory']();this[_0xc66342(0x332)][_0x52f5c0[_0xc66342(0x166)]]=!this['_categoryStatus'][_0x52f5c0['CategoryName']],this[_0xc66342(0x20f)](),this[_0xc66342(0x2fa)]();}}else{if(_0xc66342(0x32d)==='vJdzw')return Window_Command[_0xc66342(0x2c9)]['isOkEnabled'][_0xc66342(0x1da)](this);else{_0x38ca3b=_0x508139[_0xc66342(0x1ca)]()[_0xc66342(0x269)]();const _0x4ce4eb=_0x334078[_0xc66342(0x17c)](_0x41b420);return _0x4ce4eb?_0x4ce4eb[_0xc66342(0x331)][_0xc66342(0x16f)]-0x1:0x0;}}};function Window_QuestLog(){this['initialize'](...arguments);}function _0x57c9(){const _0x31ba0e=['_questTrackerWindow','3039753JRRkWc','WKMAq','zNsfS','updateOrigin','isQuestTrackerVisible','createQuestQuote','scrollSpeed','ButtonAssistPageUpDown','ListWindow_BgType','applyWordWrap','wRqUI','LogWindow_ScrollSpeed','backOpacity','oidqa','deselect','BgFilename2','Objective_Completed_Fmt','trackedQuest','setBackgroundOpacity','updateOpacity','drawIcon','questsKnown','ListWindow_Rect','_commandNameWindow','questRewardsNormalFmt','isItem','rewardsDenied','_backSprite2','shown','iconHeight','setLogWindow','trim','Settings','isActor','_messageWindow','ARRAYFUNC','qfTWa','qdEcl','setQuestDescription','Window_MenuCommand_addOriginalCommands','ARRAYJSON','QuestQuote','kIAdO','scrollBlockWidth','right','addOriginalCommands','ShowName','isSceneMap','12UXYxtd','drawItemStyleIcon','isquestMenuShown','updateVisibility','deny','finalizeWordWrapSupport','AEgMp','FUNC','placeItemQuestLabel','QuestLabel_BgType','known','LabelClearQuestLabel','scale','width','815206JYsUYX','CmdTextAlign','setQuestStatus','onDatabaseLoaded','drawAllText','getBackgroundOpacity','gainItem','questTrackerWindow','armor-%1','LogWindow_Auto_WordWrap','isQuestKnown','Ncpxt','ShowFailed','_commandWindow','KnownQuests','setQuestForQuestTrackerWindow','_categoryFilter','addCompletedQuestsCommand','uRlmv','convertLineBreaksForWordWrap','processWheelScroll','_scrollBaseX','isArmor','TazNL','questCategoryClosedFmt','\x1bWrapBreak[0]','399908fUniyQ','name','tracked','UJLKS','ZWDJA','_scrollBaseY','Game_Party_initialize','Title','loadTitle1','screenY','NUM','isQuestItem','IconSet','_questTrackerRefresh','addGeneralOptions','iconWidth','questTrackerPosition','subtext','BwQrS','rewardsClaimed','_quest','tradeItemWithParty','isTransferring','commandWindowRect','<WORDWRAP>%1','commandStyle','_scrollY','Categories','CommandWindow_BgType','CLOSE_MINIMUM_OPACITY','EVAL','ItemIDs','Hyxjo','makeData','showTracker','_logWindow','match','isCloseToQuestTrackerScreenPosition','create','prototype','openCloseCurrentCategory','questListWindowRect','EmptyTitleLabel','qpuBT','questsCompleted','isCommandEnabled','Game_Party_gainItem','addQuestSystemCommands','values','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','setQuestTrackerVisible','cursorPageup','setCategoryFilter','format','ConfigManager_applyData','concat','questCompletedCmd','STR','_doodadEditorMode','version','setHandler','iconText','questObjectiveFailedFmt','questLabelWindowRect','EnableMainMenu','deactivate','currentSymbol','Yvshl','4143976nZDRUa','ConvertParams','max','osONY','denied','commandStyleCheck','Objective_Normal_Fmt','XKzEg','contains','text','FadeSpeed','questDescription','questObjectivesCompleted','Window_Options_statusText','Window_Selectable_initialize','zBDJW','Enable','_textHeight','weapon-%1','_questLabelOpacity','callUpdateHelp','enemy','numItems','overallHeight','floor','splice','QuestSet','currentQuest','questTrackerFmt','Icon','_isRefreshingQuestTrackerWindow','isQuestCommandEnabled','STRUCT','visibilityLevel','<BR>','drawTextEx','TargetID','addQuestCommand','_labelWindow','questKnownIcon','gnecx','updateLabelWindow','WordWrap','questLogFmt','doesCategoryHaveQuestsAvailable','questRewards','process_VisuMZ_QuestSystem_Data','32141583LkYRbY','ZQNpe','bitmap','ShowMainMenu','cancel','parse','XJICi','PbtCZ','placeQuestLabel','questJournalSystemUseItem','isPressed','questEmptyText','addQuestSystemquestTrackerPositionCommand','questRewardsClaimed','ListWindowCategoryOpenFmt','updateDelayRefresh','onListQuest','setTrackedQuest','IaLOv','questCommandName','initialize','createQuestLogWindow','addInnerChild','item-%1','vJdzw','CmdStyle','Status','blt','Objectives','_categoryStatus','Game_System_initialize','Tracker','getQuestLogFmt','Game_Map_requestRefresh','push','baseTextRect','questCategoryOpenedFmt','setQuestSubtext','tisKC','ArmorIDs','Game_Map_refresh','drawItemStyleIconText','Scene_Map_createSpriteset','FontFace','worldTransform','itemPadding','setQuestLabelItem','isQuestCommandVisible','replace','ARRAYNUM','index','createEmptyText','statusText','questJournalSystemAddDeath','show','cursorPagedown','initQuestLabelItemsList','addKnownQuestsCommand','fontSize','_list','CompletedQuests','liQfk','icon','CoCPn','questsFailed','questQuote','setListWindow','origin','isCategoryOpen','fhQOK','TrackerWindow_Rect','Game_Battler_useItem','AddShowOption','indexOf','setQuestRewards','activeBgType','CommandWindow_Rect','questFailedCmd','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','sort','MaClW','updateQuestLabelOpacity','SnapshotOpacity','tuzwb','isquestMenuEnabled','QkCHO','From','_questLabelOpacityChange','createSpriteset','contentsOpacity','rCuwD','mainFontFace','smoothScrollDown','Objective_Failed_Fmt','questTrackerShow','addNoQuestsListedCommand','CommandWindow_Failed_Text','constructor','IpHNg','rewards','lYMIZ','createQuestLabelWindow','createBitmap','utdnh','loadTitle2','QuestSystem','Description','drawItem','updatePageUpDownScroll','questTrackerOnRight','CKhpi','onListCancel','getTextColor','questTrackerPosOn','isEnemy','lineHeight','FHYlU','TrackerShowHide','commandQuest','openness','OffsetY','LogWindow_Rect','createBackground','TtLYQ','_listWindow','requestRefresh','SqpFi','getTotalCategoryQuests','CLOSE_FADE_SPEED','iJqcC','getEmptyLogFmt','auto','setLabelWindow','MqZYG','isCompletedQuestsEnabled','makeQuestList','ConfigManager_makeData','Esuyk','2794815FtcRSS','WeaponIDs','completed','SystemEnableQuestMenu','objectivesFailed','QuestData','OffsetX','useItem','helpAreaHeight','updateCommandNameWindow','initiQuestLabelSprites','QuestObjectives','questFailedIcon','noQuestsListed','CommandWindow_Completed_Icon','popScene','TargetIDs','Text','BgSettings','makeDeepCopy','updateLogWindow','opacity','description','objectives','PositionOn','value','Reward_Failed_Fmt','_backSprite1','Window_ItemList_drawItem','totalCommands','innerWidth','createCustomBackgroundImages','currentCategory','centerSprite','commandNameWindowCenter','setBackgroundType','CategoryName','TrackerFmt','zoomScale','createQuestText','Label','ZZSEs','FadeLimit','AddPositionOption','claim','length','Show','Keys','parameters','questButtonAssistExpand','note','quotes','applyData','OnLoadQuestJS','unshift','Scene_Boot_onDatabaseLoaded','Quotes','exit','quest','changePaintOpacity','isQuestCompleted','hide','TBjdj','Scene_Menu_createCommandWindow','textSizeEx','loadSystem','ARRAYSTR','Window_Options_addGeneralOptions','createQuestLabelSprite','Scene_Options_maxCommands','HkEUr','isKnownQuestsEnabled','isWeapon','isAlive','commandSymbol','filter','bUKFK','includes','Location','joinQuestEntries','smoothSelect','bind','questObjectivesFailed','PositionName','\x0a\x5c{[[Title]]\x5c}\x0a[[Objectives]]\x0a','return\x200','deathStateId','_scene','setValue','Quests','\x5cI[%1]%2','setQuestObjectives','YilYp','registerCommand','Rewards','createQuestTrackerWindow','clearQuestLabelItem','objectivesCompleted','Key','activate','Name','LabelAddQuestLabel','addQuestCommandAutomatically','vzeCJ','noQuestsLabel','addLoadListener','claimed','Window_Selectable_update','hBxZd','initQuestSystem','smoothScrollUp','paint','2YISgGm','NoQuestListed','update','failed','itemAt','questJournalSystemGainItem','addWindow','OvYvN','LogWindow_BgType','AdjustRect','feeOs','isShowQuest','TrackerChangeQuest','_quests','frcIw','pageup','clear','height','itemTextAlign','AfYsG','vjDIl','fontFace','VisuMZ_1_MessageCore','kzNcl','toUpperCase','questData','windowPadding','_questLabelItemsList','questButtonAssistActive','VisuMZ_1_MainMenuCore','questSubtext','calculateTextHeight','addCategoryCommand','Subtext','createQuestDescription','ARRAYSTRUCT','boxWidth','questLogWindowRect','left','move','call','inBattle','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','maxItems','currentExt','Reward_Normal_Fmt','commandNameWindowDrawText','Difficulty','onListCategory','mainCommandWidth','isCurrentCategoryOpen','AhxBL','addCommand','pmbic','createCommandWindow','LogFmt','hideQuestLabelSprites','createCommandNameWindow','questRewardsDenied','_delayDraw','Reward_Completed_Fmt','pagedown','map','questTrackerPosOff','createContents','uiMenuStyle','QuestOrder','questRewardsDeniedFmt','commandNameWindowDrawBackground','resetFontSettings','AyLSM','center','maxCommands','status','isQuestFailed','questButtonAssistCollapse','3321164ZbPPtp','contents','SystemShowQuestMenu','onCommandOk','buttonAssistText4','CommandWindow_Completed_Text','addNewState','isRightInputMode','category','join','Nhpks','itemLineRect','questObjectiveClearedFmt','PositionOff','drawNewLabelIcon','questRewardsClaimedFmt','addFailedQuestsCommand','refresh','eStlZ','questCompletedIcon','questObjectiveNormalFmt','refreshQuestTrackerWindow','ButtonAssistExpand','commandName','nBzHD','FontSize','VisibleRewards','removed','_questLabelSprites','cOXZg','_hasDiedBefore','round','addChild','ARRAYEVAL','contentsHeight','setQuest','uiInputPosition','CommandWindow_Known_Text','createQuestObjectives','Window','Game_BattlerBase_addNewState','createQuestListWindow','Window_Selectable_refresh','sTpfB','innerRect','applyWordWrapEntry','scrollBlockHeight','QuestSubtext','remove','questTrackedQuestFmt','setQuestQuote','Game_Actor_tradeItemWithParty','zmVKF','QuestLabel_Rect','adjustSprite','VisibleObjectives','CIxuz','isSceneChanging','_tradeItemWithParty','xdNqv','wordWrapSupport','questButtonAssistPageUpDn','pyzvA','QuestRewards','MainMenu','MinTrackerOpacity','buttonAssistText1','BgFilename1','drawText','_questLabelOpacityUpperLimit','zQwfd','isFailedQuestsVisible','General','questObjectives','questKnownCmd'];_0x57c9=function(){return _0x31ba0e;};return _0x57c9();}Window_QuestLog[_0x229f1a(0x23a)]=VisuMZ['QuestSystem'][_0x229f1a(0x26a)][_0x229f1a(0x225)][_0x229f1a(0x291)],Window_QuestLog['scrollSpeed']=VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x26a)][_0x229f1a(0x225)][_0x229f1a(0x255)],Window_QuestLog[_0x229f1a(0x2c9)]=Object['create'](Window_Scrollable[_0x229f1a(0x2c9)]),Window_QuestLog[_0x229f1a(0x2c9)][_0x229f1a(0x119)]=Window_QuestLog,Window_QuestLog[_0x229f1a(0x1ed)]=0x19,Window_QuestLog[_0x229f1a(0x2c9)][_0x229f1a(0x329)]=function(_0x4df07f){const _0xae0276=_0x229f1a;this['_textHeight']=0x0,this[_0xae0276(0x1ed)]=0x0,Window_Scrollable['prototype']['initialize']['call'](this,_0x4df07f),this[_0xae0276(0x2b6)]=null,this[_0xae0276(0x20f)]();},Window_QuestLog[_0x229f1a(0x2c9)][_0x229f1a(0x220)]=function(){const _0x3c5f95=_0x229f1a;return Math[_0x3c5f95(0x2e8)](this[_0x3c5f95(0x2f7)],0x1);},Window_QuestLog[_0x229f1a(0x2c9)][_0x229f1a(0x2fd)]=function(){const _0x174907=_0x229f1a;return this[_0x174907(0x220)]();},Window_QuestLog[_0x229f1a(0x2c9)][_0x229f1a(0x1b4)]=function(){const _0x49d8a3=_0x229f1a;Window_Scrollable['prototype'][_0x49d8a3(0x1b4)][_0x49d8a3(0x1da)](this),this['updateDelayRefresh']();},Window_QuestLog[_0x229f1a(0x2c9)][_0x229f1a(0x324)]=function(){const _0x45283f=_0x229f1a;if(this[_0x45283f(0x1ed)]--===0x0)this['refresh']();},Window_QuestLog[_0x229f1a(0x2c9)][_0x229f1a(0x24d)]=function(){const _0x2f86b4=_0x229f1a,_0x17ab98=this[_0x2f86b4(0x275)]()||0x1,_0x5c9117=this[_0x2f86b4(0x22c)]()||0x1,_0x3f9a7c=this['_scrollX']-this['_scrollX']%_0x17ab98,_0x3bd579=this[_0x2f86b4(0x2bc)]-this[_0x2f86b4(0x2bc)]%_0x5c9117;(_0x3f9a7c!==this[_0x2f86b4(0x29d)]||_0x3bd579!==this[_0x2f86b4(0x2a7)])&&(this['updateScrollBase'](_0x3f9a7c,_0x3bd579),this[_0x2f86b4(0x1b1)]()),this[_0x2f86b4(0xfb)]['x']=this['_scrollX'],this[_0x2f86b4(0xfb)]['y']=this['_scrollY'];},Window_QuestLog[_0x229f1a(0x2c9)][_0x229f1a(0x29c)]=function(){const _0x4966cf=_0x229f1a;Window_Scrollable['prototype'][_0x4966cf(0x29c)][_0x4966cf(0x1da)](this),this[_0x4966cf(0x124)]();},Window_QuestLog[_0x229f1a(0x2c9)][_0x229f1a(0x124)]=function(){const _0xff2d5d=_0x229f1a;Input[_0xff2d5d(0x31f)](_0xff2d5d(0x1ef))&&this[_0xff2d5d(0x114)](Window_QuestLog['scrollSpeed']),Input[_0xff2d5d(0x31f)](_0xff2d5d(0x1c1))&&this[_0xff2d5d(0x1b0)](Window_QuestLog[_0xff2d5d(0x250)]);},Window_QuestLog[_0x229f1a(0x2c9)][_0x229f1a(0x221)]=function(_0x547747){const _0xb90172=_0x229f1a;if(this[_0xb90172(0x2b6)]===_0x547747)return;this[_0xb90172(0x2b6)]=_0x547747,this[_0xb90172(0x1ed)]=Window_QuestLog['_delayDraw'];},Window_QuestLog[_0x229f1a(0x2c9)]['refresh']=function(){const _0x32e8f9=_0x229f1a;this[_0x32e8f9(0x1ff)][_0x32e8f9(0x1c2)](),this['calculateTextHeight'](),this[_0x32e8f9(0x1f2)](),this[_0x32e8f9(0x28c)]();},Window_QuestLog[_0x229f1a(0x2c9)][_0x229f1a(0x1d1)]=function(){const _0x1e85d4=_0x229f1a;if(![]){const _0x22db7d=this[_0x1e85d4(0x338)](),_0x187faf=this[_0x1e85d4(0x2b6)]?this[_0x1e85d4(0x169)]():this[_0x1e85d4(0xeb)](),_0x4565dd=this['textSizeEx'](_0x187faf['trim']());this[_0x1e85d4(0x2f7)]=_0x4565dd[_0x1e85d4(0x1c3)],this[_0x1e85d4(0x119)]===Window_QuestLog&&(this['_textHeight']+=this[_0x1e85d4(0x12b)](),Window_QuestLog[_0x1e85d4(0x23a)]&&(this[_0x1e85d4(0x2f7)]+=this[_0x1e85d4(0x12b)]()*0x4));}const _0x5ef64c=this[_0x1e85d4(0x2b6)]?this[_0x1e85d4(0x169)]():this[_0x1e85d4(0xeb)]();this[_0x1e85d4(0x2f7)]=this['textSizeEx'](_0x5ef64c[_0x1e85d4(0x269)]())[_0x1e85d4(0x1c3)];},Window_QuestLog[_0x229f1a(0x2c9)][_0x229f1a(0x28c)]=function(){const _0x3e48ff=_0x229f1a,_0x3b588b=this[_0x3e48ff(0x2b6)]?this[_0x3e48ff(0x169)]():this[_0x3e48ff(0xeb)]();this[_0x3e48ff(0x309)](_0x3b588b,0x0,0x0,this['innerWidth']),this[_0x3e48ff(0x2bc)]=0x0,this[_0x3e48ff(0xfb)]['y']=0x0;},Window_QuestLog['prototype'][_0x229f1a(0xeb)]=function(){const _0x1a4411=_0x229f1a;VisuMZ['QuestSystem'][_0x1a4411(0x26a)][_0x1a4411(0x246)]['OnLoadQuestJS']();let _0x248859=this[_0x1a4411(0x13a)]();return _0x248859=VisuMZ[_0x1a4411(0x121)][_0x1a4411(0x253)](_0x248859),_0x248859=VisuMZ[_0x1a4411(0x121)][_0x1a4411(0x27f)](_0x248859),_0x248859;},Window_QuestLog[_0x229f1a(0x2c9)][_0x229f1a(0x13a)]=function(){const _0x581b78=_0x229f1a;return TextManager[_0x581b78(0x320)];},Window_QuestLog[_0x229f1a(0x2c9)][_0x229f1a(0x169)]=function(){const _0xabbc49=_0x229f1a,_0x586f8e=this[_0xabbc49(0x2b6)],_0x3e1b39=_0x586f8e[_0xabbc49(0x1a4)][_0xabbc49(0x1ca)]()['trim']();if(_0x586f8e[_0xabbc49(0x177)])_0x586f8e[_0xabbc49(0x177)]['call'](this);let _0x49bd41=this[_0xabbc49(0x335)]();return _0x49bd41=VisuMZ['QuestSystem']['convertLineBreaksForWordWrap'](_0x49bd41),_0x49bd41=_0x49bd41[_0xabbc49(0xe8)](/\[\[RAWTITLE\]\]/gi,_0x586f8e[_0xabbc49(0x2a9)]),_0x49bd41=_0x49bd41[_0xabbc49(0xe8)](/\[\[TITLE\]\]/gi,_0x586f8e[_0xabbc49(0x2a9)][_0xabbc49(0xe8)](/\\I\[(\d+)\]/gi,'')[_0xabbc49(0x269)]()),_0x49bd41=_0x49bd41[_0xabbc49(0xe8)](/\[\[DIFFICULTY\]\]/gi,_0x586f8e[_0xabbc49(0x1e1)][_0xabbc49(0x269)]()),_0x49bd41=_0x49bd41[_0xabbc49(0xe8)](/\[\[FROM\]\]/gi,_0x586f8e[_0xabbc49(0x10e)]['trim']()),_0x49bd41=_0x49bd41[_0xabbc49(0xe8)](/\[\[LOCATION\]\]/gi,_0x586f8e[_0xabbc49(0x190)][_0xabbc49(0x269)]()),_0x49bd41=_0x49bd41['replace'](/\[\[DESCRIPTION\]\]/gi,this[_0xabbc49(0x1d4)](_0x3e1b39)),_0x49bd41=_0x49bd41[_0xabbc49(0xe8)](/\[\[OBJECTIVES\]\]/gi,this[_0xabbc49(0x224)](_0x586f8e,_0x3e1b39)),_0x49bd41=_0x49bd41[_0xabbc49(0xe8)](/\[\[REWARDS\]\]/gi,this['createQuestRewards'](_0x586f8e,_0x3e1b39)),_0x49bd41=_0x49bd41[_0xabbc49(0xe8)](/\[\[SUBTEXT\]\]/gi,this['createQuestSubtext'](_0x3e1b39)),_0x49bd41=_0x49bd41[_0xabbc49(0xe8)](/\[\[QUOTE\]\]/gi,this[_0xabbc49(0x24f)](_0x3e1b39)),_0x49bd41=VisuMZ[_0xabbc49(0x121)][_0xabbc49(0x27f)](_0x49bd41),_0x49bd41=VisuMZ[_0xabbc49(0x121)]['noMessageCoreRemoveEscapeCodes'](_0x49bd41),_0x49bd41['trim']();},Window_QuestLog['prototype'][_0x229f1a(0x335)]=function(){const _0x22d9bb=_0x229f1a;return TextManager[_0x22d9bb(0x311)];},Window_QuestLog[_0x229f1a(0x2c9)][_0x229f1a(0x1d4)]=function(_0x523898){const _0x43f64a=_0x229f1a;let _0x2d78c4=$gameSystem[_0x43f64a(0x2f1)](_0x523898);return _0x2d78c4=VisuMZ[_0x43f64a(0x121)][_0x43f64a(0x27f)](_0x2d78c4),_0x2d78c4[_0x43f64a(0x269)]();},Window_QuestLog['prototype'][_0x229f1a(0x224)]=function(_0x4f9ebe,_0x21f445){const _0x2ee84a=_0x229f1a,_0x33a68d=[],_0x3fdf96=$gameSystem[_0x2ee84a(0x247)](_0x21f445),_0x516fad=$gameSystem[_0x2ee84a(0x2f2)](_0x21f445),_0x5b7b9c=$gameSystem[_0x2ee84a(0x194)](_0x21f445),_0x504fe0=_0x3fdf96[_0x2ee84a(0x2d9)](_0x516fad)[_0x2ee84a(0x2d9)](_0x5b7b9c)['sort']((_0x3badd1,_0x1bd486)=>_0x3badd1-_0x1bd486);for(const _0x17e4a9 of _0x504fe0){if(!_0x4f9ebe['Objectives'][_0x17e4a9])continue;const _0x2ba389=_0x4f9ebe['Objectives'][_0x17e4a9];let _0x2d5206=TextManager[_0x2ee84a(0x212)];if(_0x516fad['includes'](_0x17e4a9))_0x2d5206=TextManager[_0x2ee84a(0x20a)];if(_0x5b7b9c[_0x2ee84a(0x18f)](_0x17e4a9))_0x2d5206=TextManager['questObjectiveFailedFmt'];_0x33a68d[_0x2ee84a(0x337)](VisuMZ[_0x2ee84a(0x121)][_0x2ee84a(0x22b)](_0x2d5206['format'](_0x2ba389)[_0x2ee84a(0x269)]()));}let _0x3f7fdc=VisuMZ[_0x2ee84a(0x121)][_0x2ee84a(0x191)](_0x33a68d);return _0x3f7fdc;},Window_QuestLog['prototype']['createQuestRewards']=function(_0x570d68,_0x4df834){const _0x36d30b=_0x229f1a,_0x4ad361=[],_0x3d7e2f=$gameSystem[_0x36d30b(0x313)](_0x4df834),_0xfc3784=$gameSystem[_0x36d30b(0x322)](_0x4df834),_0x5e86cf=$gameSystem['questRewardsDenied'](_0x4df834),_0x1eb78b=_0x3d7e2f[_0x36d30b(0x2d9)](_0xfc3784)['concat'](_0x5e86cf)[_0x36d30b(0x107)]((_0x2f8108,_0x3ff635)=>_0x2f8108-_0x3ff635);for(const _0x5f47cc of _0x1eb78b){if(!_0x570d68['Rewards'][_0x5f47cc])continue;const _0x1a502d=_0x570d68[_0x36d30b(0x1a0)][_0x5f47cc];let _0xf7b08c=TextManager[_0x36d30b(0x262)];if(_0xfc3784[_0x36d30b(0x18f)](_0x5f47cc))_0xf7b08c=TextManager[_0x36d30b(0x20d)];if(_0x5e86cf[_0x36d30b(0x18f)](_0x5f47cc))_0xf7b08c=TextManager[_0x36d30b(0x1f5)];_0x4ad361['push'](VisuMZ['QuestSystem'][_0x36d30b(0x22b)](_0xf7b08c[_0x36d30b(0x2d7)](_0x1a502d)['trim']()));}let _0x5ac480=VisuMZ[_0x36d30b(0x121)][_0x36d30b(0x191)](_0x4ad361);return _0x5ac480;},Window_QuestLog[_0x229f1a(0x2c9)]['createQuestSubtext']=function(_0x2398a7){const _0x13e318=_0x229f1a;let _0x3f79ec=$gameSystem[_0x13e318(0x1d0)](_0x2398a7);return _0x3f79ec=VisuMZ[_0x13e318(0x121)]['finalizeWordWrapSupport'](_0x3f79ec),_0x3f79ec[_0x13e318(0x269)]();},Window_QuestLog[_0x229f1a(0x2c9)][_0x229f1a(0x24f)]=function(_0x264e28){const _0x93940c=_0x229f1a;let _0x55e72a=$gameSystem[_0x93940c(0xf9)](_0x264e28);return _0x55e72a=VisuMZ['QuestSystem'][_0x93940c(0x27f)](_0x55e72a),_0x55e72a['trim']();};function Window_QuestTracker(){const _0x28e85f=_0x229f1a;this[_0x28e85f(0x329)](...arguments);}Window_QuestTracker[_0x229f1a(0x2c9)]=Object[_0x229f1a(0x2c8)](Window_QuestLog[_0x229f1a(0x2c9)]),Window_QuestTracker[_0x229f1a(0x2c9)][_0x229f1a(0x119)]=Window_QuestTracker,Window_QuestTracker[_0x229f1a(0x286)]=VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x26a)][_0x229f1a(0x225)]['TrackerWindow_Scale'],Window_QuestTracker[_0x229f1a(0x103)]=VisuMZ['QuestSystem'][_0x229f1a(0x26a)][_0x229f1a(0x225)]['TrackerWindow_BgType'],Window_QuestTracker[_0x229f1a(0x2bf)]=VisuMZ['QuestSystem']['Settings']['Tracker'][_0x229f1a(0x23f)]??0x80,Window_QuestTracker[_0x229f1a(0x138)]=VisuMZ['QuestSystem'][_0x229f1a(0x26a)][_0x229f1a(0x334)]['CompassFadeSpeed']??0x10,Window_QuestTracker[_0x229f1a(0x2c9)][_0x229f1a(0x329)]=function(_0x5c9fd7){const _0x4bb45c=_0x229f1a;Window_QuestLog[_0x4bb45c(0x2c9)][_0x4bb45c(0x329)][_0x4bb45c(0x1da)](this,_0x5c9fd7),this['setQuest']($gameSystem['trackedQuest']()),this[_0x4bb45c(0x286)]['x']=this['scale']['y']=Window_QuestTracker[_0x4bb45c(0x286)],this[_0x4bb45c(0x27d)]();},Window_QuestTracker[_0x229f1a(0x2c9)]['contentsHeight']=function(){const _0x358d05=_0x229f1a;return Math[_0x358d05(0x2e8)](this[_0x358d05(0x2f7)],0x1);},Window_QuestTracker['prototype'][_0x229f1a(0x13a)]=function(){return'';},Window_QuestTracker[_0x229f1a(0x2c9)]['getQuestLogFmt']=function(){const _0x250b47=_0x229f1a;return TextManager[_0x250b47(0x302)];},Window_QuestTracker['prototype'][_0x229f1a(0x1f2)]=function(){const _0x54ffcc=_0x229f1a;this[_0x54ffcc(0x1c3)]=this[_0x54ffcc(0x220)]()+$gameSystem[_0x54ffcc(0x1cc)]()*0x2,Window_QuestLog[_0x54ffcc(0x2c9)][_0x54ffcc(0x1f2)][_0x54ffcc(0x1da)](this);},Window_QuestTracker[_0x229f1a(0x2c9)][_0x229f1a(0x221)]=function(_0x3d1ed2){const _0x37690d=_0x229f1a;if(this[_0x37690d(0x2b6)]===_0x3d1ed2)return;this[_0x37690d(0x2b6)]=_0x3d1ed2,this[_0x37690d(0x20f)]();},Window_QuestTracker[_0x229f1a(0x2c9)]['refresh']=function(){const _0x5ac7c4=_0x229f1a;if($gameTemp['_questTrackerRefresh'])return;$gameTemp[_0x5ac7c4(0x2af)]=!![],Window_QuestLog[_0x5ac7c4(0x2c9)][_0x5ac7c4(0x20f)]['call'](this),this[_0x5ac7c4(0x165)](this[_0x5ac7c4(0x2b6)]?Window_QuestTracker[_0x5ac7c4(0x103)]:0x2),$gameTemp[_0x5ac7c4(0x2af)]=![];},Window_QuestTracker['prototype'][_0x229f1a(0x1b4)]=function(){const _0x3754e6=_0x229f1a;Window_QuestLog[_0x3754e6(0x2c9)][_0x3754e6(0x1b4)][_0x3754e6(0x1da)](this),this['updateOpacity'](),this[_0x3754e6(0x27d)]();},Window_QuestTracker[_0x229f1a(0x2c9)][_0x229f1a(0x25d)]=function(){const _0x54b45f=_0x229f1a;let _0x3fbc5b=this[_0x54b45f(0x111)];const _0x3a4c47=Window_QuestTracker[_0x54b45f(0x138)];if(this[_0x54b45f(0x2c7)]()){const _0xc854b9=Window_QuestTracker[_0x54b45f(0x2bf)];_0x3fbc5b=(_0x3fbc5b-_0x3a4c47)['clamp'](_0xc854b9,0xff);}else _0x3fbc5b+=_0x3a4c47;this[_0x54b45f(0x111)]=_0x3fbc5b,this[_0x54b45f(0x256)]=_0x3fbc5b;},Window_QuestTracker[_0x229f1a(0x2c9)]['isCloseToQuestTrackerScreenPosition']=function(){const _0x27e5e3=_0x229f1a;if(!SceneManager[_0x27e5e3(0x279)]())return![];const _0x36ebd2=$gameMap['tileHeight'](),_0x2eb034=$gameScreen[_0x27e5e3(0x168)](),_0x1398c5=$gamePlayer['screenX']()*_0x2eb034,_0x4475df=($gamePlayer[_0x27e5e3(0x2ab)]()-Math[_0x27e5e3(0x2fe)](_0x36ebd2/0x2*_0x2eb034))*_0x2eb034,_0x5b802c=new Point(_0x1398c5,_0x4475df),_0x3e54eb=this[_0x27e5e3(0xe4)]['applyInverse'](_0x5b802c);return this[_0x27e5e3(0x22a)][_0x27e5e3(0x2ee)](_0x3e54eb['x'],_0x3e54eb['y']);},Window_QuestTracker[_0x229f1a(0x2c9)][_0x229f1a(0x27d)]=function(){const _0x170a8=_0x229f1a,_0x4e8b2d=this[_0x170a8(0x307)]();this[_0x170a8(0x12f)]=_0x4e8b2d;},Window_QuestTracker[_0x229f1a(0x2c9)][_0x229f1a(0x307)]=function(){const _0x299852=_0x229f1a;if(!ConfigManager['questTrackerShow'])return 0x0;if($gameTemp[_0x299852(0x2dc)])return 0x0;const _0x1026bb=SceneManager[_0x299852(0x199)];if(_0x1026bb&&_0x1026bb['_messageWindow']){if('wRqUI'!==_0x299852(0x254)){if(_0xe960ae[_0x299852(0x1f3)]&&_0x3d83f5[_0x299852(0x222)]!==_0x3952bc)return _0x21a4c6[_0x299852(0x222)];else return _0x475a47[_0x299852(0x1f3)]===![]?![]:_0x105f7['prototype'][_0x299852(0x205)]['call'](this);}else{if(_0x1026bb['_messageWindow'][_0x299852(0x12f)]>0x0)return 0x0;}}if(!this['_quest'])return 0x0;if($gamePlayer[_0x299852(0x2b8)]())return 0x0;if($gameParty[_0x299852(0x1db)]())return 0x0;if(SceneManager[_0x299852(0x237)]())return 0x0;return $gameSystem['isQuestTrackerVisible']()?0xff:0x0;},VisuMZ[_0x229f1a(0x121)]['finalizeWordWrapSupport']=function(_0x31173c){const _0x4af106=_0x229f1a;if(!Window_QuestLog[_0x4af106(0x23a)])return _0x31173c;if(!Imported[_0x4af106(0x1c8)])return _0x31173c;return _0x31173c=_0x4af106(0x2ba)['format'](_0x31173c),_0x31173c;},VisuMZ[_0x229f1a(0x121)]['noMessageCoreRemoveEscapeCodes']=function(_0x35b9a8){const _0x29f144=_0x229f1a;if(Imported[_0x29f144(0x1c8)])return _0x35b9a8;return _0x35b9a8=_0x35b9a8[_0x29f144(0xe8)](/<COLORLOCK>/gi,''),_0x35b9a8=_0x35b9a8[_0x29f144(0xe8)](/<\/COLORLOCK>/gi,''),_0x35b9a8;},VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x253)]=function(_0x4404d1){const _0x1a411a=_0x229f1a;if(!Window_QuestLog[_0x1a411a(0x23a)]){if(_0x1a411a(0x139)===_0x1a411a(0x1bc)){_0x3d5001=_0x53b2bd['toUpperCase']()['trim']();const _0x1f4e52=this[_0x1a411a(0x17c)](_0x3f3464);if(!_0x1f4e52)return'';const _0x1672fe=this[_0x1a411a(0x1cb)]();return _0x1672fe['objectivesCompleted']=_0x1672fe[_0x1a411a(0x1a3)]||{},_0x1672fe[_0x1a411a(0x1a3)][_0x2efe08]=_0x1672fe[_0x1a411a(0x1a3)][_0x5637cd]||[],_0x1672fe[_0x1a411a(0x1a3)][_0x45a133][_0x1a411a(0x107)]((_0x4ec82f,_0x20723a)=>_0x4ec82f-_0x20723a);}else return _0x4404d1[_0x1a411a(0xe8)](/<(?:BR|LINEBREAK)>/gi,'');}if(!Imported[_0x1a411a(0x1c8)]){if(_0x1a411a(0x16b)===_0x1a411a(0x16b))return _0x4404d1['replace'](/<(?:BR|LINEBREAK)>/gi,'');else _0x5280ab(_0x1a411a(0x106)[_0x1a411a(0x2d7)](_0x125e6b,_0x32975a,_0x2e7cab)),_0x1f5458[_0x1a411a(0x17b)]();}return VisuMZ['MessageCore']['Settings'][_0x1a411a(0x310)]['LineBreakSpace']?_0x1a411a(0x26f)!==_0x1a411a(0x26f)?this[_0x1a411a(0x1cd)]['splice'](this[_0x1a411a(0x1cd)][_0x1a411a(0x101)](_0x505127),0x1):_0x4404d1=_0x4404d1[_0x1a411a(0xe8)](/[\n\r]+/g,_0x1a411a(0x2a1)):_0x4404d1=_0x4404d1[_0x1a411a(0xe8)](/[\n\r]+/g,''),_0x4404d1;},VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x29b)]=function(_0x4d6ec6){const _0x1d047c=_0x229f1a;if(!Window_QuestLog[_0x1d047c(0x23a)])return _0x4d6ec6;if(!Imported[_0x1d047c(0x1c8)])return _0x4d6ec6;return _0x4d6ec6[_0x1d047c(0x269)]()[_0x1d047c(0xe8)](/[\n\r]/g,_0x1d047c(0x308));},VisuMZ[_0x229f1a(0x121)][_0x229f1a(0x22b)]=function(_0x3d5309){const _0x2c04ca=_0x229f1a;if(!Window_QuestLog[_0x2c04ca(0x23a)])return _0x3d5309;if(!Imported[_0x2c04ca(0x1c8)])return _0x3d5309;return VisuMZ[_0x2c04ca(0x121)][_0x2c04ca(0x253)](_0x3d5309[_0x2c04ca(0x269)]());},VisuMZ['QuestSystem'][_0x229f1a(0x191)]=function(_0x209f8c){const _0x59db0e=_0x229f1a;if(!Window_QuestLog[_0x59db0e(0x23a)])return _0x209f8c['join']('\x0a')[_0x59db0e(0x269)]();if(!Imported[_0x59db0e(0x1c8)])return _0x209f8c[_0x59db0e(0x207)]('\x0a')[_0x59db0e(0x269)]();return _0x209f8c[_0x59db0e(0x207)](_0x59db0e(0x308))[_0x59db0e(0x269)]();},totalQuestsAvailable=function(){const _0x1de486=_0x229f1a;return $gameSystem[_0x1de486(0x1cb)]()[_0x1de486(0x284)][_0x1de486(0x16f)];},totalQuestsCompleted=function(){const _0x3bc2b1=_0x229f1a;return $gameSystem['questData']()[_0x3bc2b1(0x144)][_0x3bc2b1(0x16f)];},totalQuestsFailed=function(){const _0x254e28=_0x229f1a;return $gameSystem[_0x254e28(0x1cb)]()['failed']['length'];},totalQuestsRevealed=function(){return totalQuestsAvailable()+totalQuestsCompleted()+totalQuestsFailed();},totalQuestsInGame=function(){const _0x58e097=_0x229f1a;return VisuMZ[_0x58e097(0x121)][_0x58e097(0x1f4)][_0x58e097(0x16f)];},getQuestDescriptionIndex=function(_0x36f464){const _0x4693ee=_0x229f1a;_0x36f464=_0x36f464[_0x4693ee(0x1ca)]()['trim']();const _0x11aa3b=$gameSystem[_0x4693ee(0x17c)](_0x36f464);if(!_0x11aa3b)return-0x1;$gameSystem[_0x4693ee(0x2f1)](_0x36f464);const _0x57f8e0=$gameSystem[_0x4693ee(0x1cb)]()[_0x4693ee(0x158)];return _0x57f8e0[_0x36f464]||0x0;},totalVisibleQuestObjectives=function(_0x439e4a){const _0x50bce6=_0x229f1a;_0x439e4a=_0x439e4a[_0x50bce6(0x1ca)]()['trim']();const _0x57ed91=$gameSystem[_0x50bce6(0x17c)](_0x439e4a);if(!_0x57ed91)return-0x1;$gameSystem[_0x50bce6(0x247)](_0x439e4a);const _0x6332c=$gameSystem[_0x50bce6(0x1cb)]()['objectives']||{};if(!_0x6332c[_0x439e4a])return 0x0;return _0x6332c[_0x439e4a]['length'];},totalQuestObjectives=function(_0x323925){const _0x4d2378=_0x229f1a;_0x323925=_0x323925['toUpperCase']()['trim']();const _0x48c053=$gameSystem['quest'](_0x323925);return _0x48c053?_0x48c053[_0x4d2378(0x331)][_0x4d2378(0x16f)]-0x1:0x0;},totalVisibleQuestRewards=function(_0x422ca5){const _0x58c839=_0x229f1a;_0x422ca5=_0x422ca5[_0x58c839(0x1ca)]()['trim']();const _0x5a138d=$gameSystem[_0x58c839(0x17c)](_0x422ca5);if(!_0x5a138d)return-0x1;$gameSystem['questRewards'](_0x422ca5);const _0x2046f6=$gameSystem[_0x58c839(0x1cb)]()[_0x58c839(0x11b)]||{};if(!_0x2046f6[_0x422ca5])return 0x0;return _0x2046f6[_0x422ca5][_0x58c839(0x16f)];},totalQuestRewards=function(_0x198b5d){const _0x3929ae=_0x229f1a;_0x198b5d=_0x198b5d[_0x3929ae(0x1ca)]()[_0x3929ae(0x269)]();const _0x98974f=$gameSystem[_0x3929ae(0x17c)](_0x198b5d);return _0x98974f?_0x98974f['Rewards']['length']-0x1:0x0;},getQuestSubtextIndex=function(_0x47235b){const _0x3cb842=_0x229f1a;_0x47235b=_0x47235b['toUpperCase']()['trim']();const _0xdf9856=$gameSystem[_0x3cb842(0x17c)](_0x47235b);if(!_0xdf9856)return-0x1;$gameSystem['questSubtext'](_0x47235b);const _0x4ba74d=$gameSystem[_0x3cb842(0x1cb)]()[_0x3cb842(0x2b3)];return _0x4ba74d[_0x47235b]||0x0;},getQuestQuoteIndex=function(_0x3e6cbc){const _0x480bea=_0x229f1a;_0x3e6cbc=_0x3e6cbc[_0x480bea(0x1ca)]()['trim']();const _0x13f11a=$gameSystem['quest'](_0x3e6cbc);if(!_0x13f11a)return-0x1;$gameSystem[_0x480bea(0xf9)](_0x3e6cbc);const _0x574cdd=$gameSystem[_0x480bea(0x1cb)]()[_0x480bea(0x175)];return _0x574cdd[_0x3e6cbc]||0x0;},isQuestObjectiveCompleted=function(_0x13eab2,_0x43e637){const _0xb76eb=_0x229f1a;_0x13eab2=_0x13eab2['toUpperCase']()[_0xb76eb(0x269)]();const _0x378cb8=$gameSystem['quest'](_0x13eab2);if(!_0x378cb8)return![];$gameSystem[_0xb76eb(0x247)](_0x13eab2);const _0x354388=$gameSystem['questData']()[_0xb76eb(0x1a3)];if(!_0x354388[_0x13eab2])return![];return _0x354388[_0x13eab2][_0xb76eb(0x18f)](_0x43e637);},isQuestObjectiveFailed=function(_0x28780f,_0x18b59e){const _0x209cb9=_0x229f1a;_0x28780f=_0x28780f['toUpperCase']()[_0x209cb9(0x269)]();const _0x3a9814=$gameSystem[_0x209cb9(0x17c)](_0x28780f);if(!_0x3a9814)return![];$gameSystem[_0x209cb9(0x247)](_0x28780f);const _0xa79bc4=$gameSystem[_0x209cb9(0x1cb)]()[_0x209cb9(0x146)];if(!_0xa79bc4[_0x28780f])return![];return _0xa79bc4[_0x28780f][_0x209cb9(0x18f)](_0x18b59e);},isQuestObjectiveUncleared=function(_0x1f98da,_0x29f257){const _0xb263af=_0x229f1a;_0x1f98da=_0x1f98da[_0xb263af(0x1ca)]()['trim']();const _0xf734d7=$gameSystem[_0xb263af(0x17c)](_0x1f98da);if(!_0xf734d7)return![];$gameSystem[_0xb263af(0x247)](_0x1f98da);const _0x2959f8=$gameSystem['questData']()[_0xb263af(0x159)];if(!_0x2959f8[_0x1f98da])return![];return _0x2959f8[_0x1f98da][_0xb263af(0x18f)](_0x29f257);},isQuestRewardClaimed=function(_0x5c4c8b,_0x462998){const _0x55fe40=_0x229f1a;_0x5c4c8b=_0x5c4c8b[_0x55fe40(0x1ca)]()['trim']();const _0x797c9c=$gameSystem[_0x55fe40(0x17c)](_0x5c4c8b);if(!_0x797c9c)return![];$gameSystem[_0x55fe40(0x313)](_0x5c4c8b);const _0x1a78a4=$gameSystem[_0x55fe40(0x1cb)]()[_0x55fe40(0x2b5)];if(!_0x1a78a4[_0x5c4c8b])return![];return _0x1a78a4[_0x5c4c8b]['includes'](_0x462998);},isQuestRewardDenied=function(_0x39a377,_0x28764b){const _0x342b3c=_0x229f1a;_0x39a377=_0x39a377[_0x342b3c(0x1ca)]()[_0x342b3c(0x269)]();const _0x6748ed=$gameSystem[_0x342b3c(0x17c)](_0x39a377);if(!_0x6748ed)return![];$gameSystem[_0x342b3c(0x313)](_0x39a377);const _0x6c9521=$gameSystem['questData']()[_0x342b3c(0x264)];if(!_0x6c9521[_0x39a377])return![];return _0x6c9521[_0x39a377][_0x342b3c(0x18f)](_0x28764b);},isQuestRewardUnclaimed=function(_0x2c1da0,_0x8d6d91){const _0xf7bdd3=_0x229f1a;_0x2c1da0=_0x2c1da0[_0xf7bdd3(0x1ca)]()[_0xf7bdd3(0x269)]();const _0x1d9d04=$gameSystem[_0xf7bdd3(0x17c)](_0x2c1da0);if(!_0x1d9d04)return![];$gameSystem[_0xf7bdd3(0x313)](_0x2c1da0);const _0x21c40f=$gameSystem[_0xf7bdd3(0x1cb)]()[_0xf7bdd3(0x11b)];if(!_0x21c40f[_0x2c1da0])return![];return _0x21c40f[_0x2c1da0][_0xf7bdd3(0x18f)](_0x8d6d91);};