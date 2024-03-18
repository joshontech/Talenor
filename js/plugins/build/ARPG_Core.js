/*!/*:
@target MZ
@plugindesc ARPG_Core v1.6.1
@author unagi ootoro

@help
【Summary】
This plug-in provides the ability to convert an RPG Maker MZ system into an ARPG.

■ Features
This plug-in provides the functions necessary for action RPGs, such as player and enemy status management, hit detection settings, and attack processing settings.

All damaging objects (sword slashes, bullets, etc.) are realized by dynamically setting events.
This makes the plug-in highly customizable.

Common events can also be used to create processing when a character takes damage.
For example, in the sample game, when a character takes damage, the character is knocked back in the direction of the damage.
This is achieved by executing a plug-in command for blowing up the character from the common event.
This functionality can be used to implement a combo-like system where, for example, a character is only blown away if he is hit by a series of attacks.

In addition, since this plug-in is built on top of the dot movement plug-in, any character movement can be controlled in dot units, making it possible to create very action-oriented games.
For example, by calculating the angle between the enemy character and the player and sending bullets in that direction, it is possible to create an attack that pursues the player.

■ Required Plug-ins
The following plug-ins are required to install this plug-in.

Dot Move System (DotMoveSystem.js)
DotMoveSystem.js is used to control characters in dot units.

Dot Movement System Function Extension (DotMoveSystem_FunctionEx.js)
This plug-in adds various extended functions to the main body of the dot movement system.

Self Variable (SelfVariable.js)
This plug-in provides self-variables, extended self-switches, and common event variables/switches.
The ARPG core may automatically set various in-game flags as self-variables to events (e.g., ID of the user who used a skill), so this is used for this purpose.

Please install this plug-in, including these dependent plug-ins, in the following order.
・DotMoveSystem.js
・DotMoveSystem_FunctionEx.js
・SelfVariable.js
・ARPG_Core.js


【 Details of Functions】
[General]
■ Starting and stopping ARPG mode
If set to ON in the "ARPG mode switching" plug-in command, ARPG mode is started.
When set to OFF, ARPG mode is terminated.
Once in ARPG mode, you can fight with enemies in the field.
Whether the current ARPG mode is ON or not can be checked by the switch set in the plug-in parameter "ARPG Mode Switch".
The current ARPG mode can be checked by the switch set in the plugin parameter "ARPG Mode Switch".

Note 1: If the player moves to another map, ARPG mode will automatically switch to OFF.
Note 2: Changing the ARPG mode switch has no effect.
ARPG mode must be switched by this command.
Note 3: Saving is not possible during ARPG combat. 

[Copy Events/Dynamic Events]
■ Copying Events
The following description in the Note field of an event will copy the specified event from the list of dynamic event copy source maps specified in the plugin parameters.
The specified event is copied from the list of dynamic event copy source maps.
<cp: Copy source event name or event ID>.

It is also possible to limit the copy source map by describing as follows
<cp: copy source map ID, copy source event name or event ID>.

Note: All the IDs of the source map are plugin parameters.
       The ID of the map to be copied must be set in the "Copy Event Common Settings/List of Dynamic Event Generator Map IDs. 

■ Dynamic Event Generation
Events can be generated dynamically by executing the "Dynamic Event Generation" plug-in command.
The event from which the dynamic event is copied must be placed on the map registered in the plugin parameter "List of map IDs from which dynamic events are generated".

■ Deleting Dynamic Events
Generated dynamic events can be completely deleted by executing the event command "Temporarily delete event".


[Actor related]
■ About the Guard
While pressing the A key during ARPG combat, the player guards.
f a player is attacked from the opposite direction of the player's direction while on guard,
the damage is halved if the player is on guard.
Also, if the attacker guards just before guarding, it is a just guard and completely neutralizes the damage.

See "Angle of Attack for Skill Objects" for the direction of attack used to determine guard success.

If you do not use the guard function, set the plug-in parameter
"Key Common Settings/Actor Guard Key"to Set the key name to "Unassigned".

Also, if you use the Guard function but do not use Just Guard,
set 0 to the number of frames for Just Guard.

■ Guard setting by plugin command
In addition to pressing the A key, it is also possible to guard by executing a plugin command.
If you set the guard mode to ON with the plugin command "Player guard mode setting",
it will be in a guarded state during that time. When set to OFF, the guard is released.
This function is mainly intended for guarding in environments without a keyboard or gamepad.

■ Actor switching
You can switch the player's actor by pressing the "S" key.
This function can be used regardless of ON/OFF of ARPG mode.

You can also switch actors by executing the plugin command "Change control actor".

When the switch set in the plugin parameter "Control actor change permission switch ID" turns OFF,
actor switching by key input is disabled.

※Note: Actors cannot be switched while they are attacking or taking damage.
        Also, the menu screen reordering function cannot be used while the actor cannot be switched.


[Enemy-related]
■ About Enemy Character Settings
In the event of an enemy character, by executing the "Setup Enemy" plug-in command through parallel processing or automatic execution, the event in which it is executed will be called "Setup Enemy".
By executing the plugin command "Setup Enemy" in an event of an enemy character, the event in which it is executed is treated as an enemy character.
The "Enemy setting" is used as an enemy character.
Please be sure to execute "Setup Enemy" when the ARPG mode is ON. 

"Collision Attack Skill ID", "Enemy Kill Common Event ID", and "Enemy Damage Common Event ID"
can be set as arguments when setting enemy characters, but if 0 is specified for these values,
the plug-in parameter "Enemy The value of the parameter with the same name in "Common Settings" is applied.

■ Displaying HP of Enemy Characters
The HP gauge can be set in the "Setup Enemy" plug-in command to display the HP of the enemy character.
When "Normal" is selected, the HP gauge is displayed directly on the enemy character.
When "Boss" is selected, a large HP gauge is displayed at the top of the screen.


[Skill Related]
■ Creating Skills
If you put <action: common event name or ID> in the memo field of a skill, the corresponding common event will be invoked when you execute that skill.
This common event is called an "action common event.
Within an Action Common Event, by executing the "Activate Skill" plug-in command, the skill is activated and MP or TP is consumed.

In this state, skill objects are generated by executing the "Create Skill Object" command.
Skill objects are objects that, when hit by a battler, cause damage, recover HP, etc.
It is an event that can give the battler the effect of a skill.
Consider a skill object as a bullet fired by a player or an enemy character in a shooting game.
The skill object collides with the battler.
When a skill object collides with a battler, the effect set by the skill is applied to the colliding battler.
The default hit detection of a skill object is the size of the event that made it a skill object.
However, you can customize the hit judgment freely by following the procedure in " ■ Setting the Hit Judgment below.

If "Activate Skill" is not executed, MP/TP will not be consumed. Use this to your advantage.
If a skill activation condition is not met (for example, if there is an enemy character nearby) when the common event of a skill action is executed, the skill will not be executed.
If the common event of the skill action is executed and the skill activation condition is not met (e.g., an enemy character is nearby), the skill is not executed.

Note: It is not possible to create a skill object without activating a skill. If you do, an error message will be displayed. 

■ Common Event Variables Available in Action Common Events
The common event variable for storing the user event ID will automatically contain the event ID of the character who is the user who executed the action common event.
The event ID is automatically stored in the common event variable when the character is an event.

By combining these two variables, it is possible to specify the character who used the skill in the character specification argument of various plug-in commands.

These variables must be common event variables.

■ Pass common event variable/switch value to action common event
By writing the following in the memo field of the skill, it is possible to set the value
in advancewhen executing the specified action common event.
・When setting common event variables
<set-var Variable ID, Value>
(e.g.) Set the value 100 to the variable with ID=10
<set-var 10, 100>

・When setting a common event switch
<set-sw Switch ID, Value>
(e.g.) Set the switch with ID=10 to ON
<set-sw 10>

※ Make sure these variables/switches are common event variables or common event switches.
※ This function was added from ARPG_Core v1.4.0.

■ Self variables available in events generated as skill objects
In events generated by the "Create Skill Object" plug-in command
The self-variables "skill object user type stored self-variable" and "skill object user event ID stored self-variable" can be used.
The self-variable that stores the skill object user type stores the type of the character that is the user who executed the skill object generation.

These variables must be self-event variables.

■ Cancel using skill when receive damage
If the plugin command "Damage Skill Cancel Enable/Disable Toggle" is set to Enable,
the skill will be canceled when damage is taken, forcing the skill common event to end.

Also, if you specify a chanting common event ID in the "Activate Skill" plugin command
The common event will be executed until the skill is activated,
during which time skill cancellation by damage will be enabled.
The same can be achieved with the "Damage Skill Cancel Enable/Disable Toggle" command.
However, it is simpler to use this method when skill chanting is the objective.

※ The maximum HP damage ratio for skill cancellation can be changed by setting the
"Skill Cancel Damage Rate" in the "Battler ARPG Parameter Settings" plugin command.
The maximum HP damage ratio for skill cancellation can be changed by setting the
"Skill Cancel Damage Rate" in the "Battler ARPG Parameter Settings" plugin command.
If not set, the skill will be canceled if it takes even one damage.

■ Revert movement speed when skill is completed or canceled
When the skill is activated, data such as movement speed is retained.
Retained data will be restored upon skill completion or cancellation.
By using this function, you don't have to be conscious of restoring the movement
speed etc. when canceling an attack motion, for example.

The data retained when the skill is activated is as follows.
・Moving Speed
・Character images and indexes
・Orientation fixed

※ This function was added from ARPG_Core v1.4.0.

■ Attack Angle of Skill Objects
By executing the "Specify Attack Angle" plug-in command for a skill object
The attack angle can be set for a skill object by executing the "Specify Attack Angle" plug-in command for the skill object.
The angle of attack set here is used to determine whether the skill object is facing the user when guarding.

The value set here can be obtained by reading the common event variable "Common variable for storing damage angle" in the common event that is executed when damage is received.
This can be combined with the "Blow away character" plugin command to blow away the character in the direction of the damage.

■ Synchronize the position of the skill object and the movement of the user
By executing the plugin command "Skill object user position synchronization" for the skill object,
the position of the skill object and the movement of the user can be synchronization.
When using this function, it is possible to attack while dashing, for example.

■ Applying Skill Effects
After activating a skill, execute the plug-in command "Apply Skill Effects".
The effect of the relevant skill can be applied to the user.
Only the damage of the skill will be applied.

In addition, when the plugin command "Test apply skill effect" is executed, the user will not be able to see the effect of the skill before it can be applied.
This function allows you to check in advance whether the skill effect can be applied.
By using this function, it is possible, for example, to disable recovery items when HP is full.
For example, if the HP is full, the recovery item cannot be used.

■ Displaying Skill Names When Skills are Activated
A popup window will appear when a skill is activated by entering the following information in the notes field of the skill.
In this case, the text set in the "Message" field of the skill will be displayed.
<showSkillNam>e

■ Setting invincibility time when taking damage
The invincibility time when damaged by a skill can be set by populating the following in the Note field of the skill.
<noDamageFrame: invincibility time>

Example: To set the invincibility time to 60 frames
<noDamageFrame: 60>

If this setting is omitted, the invincibility time is 30 frames.

■ Setting a time limit after using a skill
You can set a time limit after using a skill by populating the following information in the Note field of the skill.
The following is a list of the time to prohibit attacks after a skill is used.
<noAttackFrame: Attack delay>

Example: To set the no-attack time to 120 frames
<noAttackFrame: 120>

If this setting is omitted, the no-attack time is set to 60 frames.

■ Specify inertial movement cancellation when skill is activated
Inertial movement can be canceled when the skill is activated
by writing the following in the memo field of the skill.
<cancelAcceleration: true>

If you set it as follows, inertial movement will continue even after the skill is activated.
<cancelAcceleration: false>

※ If this setting is omitted, inertial movement cancellation is enabled.

■ Specify movement prohibition when skill is activated
You can prohibit movement when the skill is activated
by writing the following in the memo field of the skill.
<disableMove: true>

If you set it as follows, inertial movement will continue even after the skill is activated.
<disableMove: false>

※ If you omit this setting, no movement is enabled.
※ Only player movement and autonomous movement by key or touch are prohibited.
   Movement from event commands is not prohibited.

■ Overwrite skill for damage determination when character collides
By writing the following in the memo field of the skill, you can overwrite it with a skill
that damages the enemy if it collides with the enemy while using the skill.
<overwriteCollideAttack>

If you overwrite it, it will automatically return to the original setting when the skill ends.


[Field Objects]
■ Field Objects
Field object is an object that is neither a player nor an enemy, but can be set to be hit by a player or an enemy. It can be grass that can be destroyed by a sword, a switch that turns ON when hit by an arrow, etc.
The hit detection of field objects can be set to "Custom".

You can set "damage judgment" or "custom judgment" for the hit judgment of the field object.
For details on the collision judgment, please refer to "■ collision detection settings".

■ Field object damage handling
If you set "Damage Judgment" to the field object, the common event set in
"Field Object Damage Common Event ID" will be called when the attack judgment touches.

Field objects do not have HP, so all you do in damage processing is calling a common event.
This processing is mainly intended for use such as destroying grass when a sword attack hits it.

[related to collision detection]
■ collision detection settings
The "collision detection settings" plug-in command can be used to configure the hit detection settings.
The following types of collision detection are available
Attack detection: If this detection comes in contact with a "damage detection", damage will be inflicted to the user who set the damage detection.
Damage detection: If this detection contacts the "attack detection," the attacker is damaged.
Custom detection: This is a user-definable collision detection. The collision detection set here can be checked with the "collision detection check" plugin command.

Collision detection can be set for the following characters
If collision detection is set for other characters, an error will occur.
Player (all collision detection can be set)
Enemy (all collision detection can be set)
Field object (only damage judgment/custom judgment can be set)
Skill object (only attack detection/custom detection can be set)

Player collision detection can be set using the "Player collision detection setting" plug-in parameter. 

■ Collision detection check by plug-in commands
Damage processing according to the attack detection and damage detection is automatically performed by the plug-in.
However, the "collision detection check" plug-in command allows you to check for collision detection at any time.
The "collision detection check" plug-in command allows collision detection to be checked at any desired timing.

■ Collision detection visibility
If the switch which you specified for the plugin parameter "HitBoxSetting/switch ID for hit box visibility" is ON, the hit box will be visible.

Also, pressing the key (F6 by default) set in the plugin parameter "Hitbox visualization switching key"
can automatically switch the visualization state of the hitbox.
This function is only valid during test play.
※ If the hitbox is visualized in the switch settings, it can be visualized even if it is not a test play.


[Combo attack function]
By setting the plug-in parameter "action combo setting", it is possible to easily create a combo attack.
With this setting, if the skill specified by the "derived source skill ID" is executed within the
"minimum combo possible time" to "maximum combo possible time", the skill will be changed to the
skill specified by the "derived skill ID". It is possible to execute after overwriting.
Also, if there is a combo destination setting, the attack prohibition time set by noAttackFrame
will be ignored and the minimum combo possible time will be used to determine whether an attack is possible or not.

※ This function was added from ARPG_Core v1.4.0.


[Other]
Setting up states to be resolved over time
In ARPGs, there may be many situations where you want to resolve states over time.
We have prepared a function for this purpose.
By populating the following in the state Note field, the state can be resolved at the specified number of frames elapsed.
The state can be resolved when the specified number of frames have elapsed.
<duration: number of frames>

For example, to resolve the state after 10 seconds, set as follows (1 second = 60 frames)
<duration: 60>

This setting alone will not update the number of frames remaining when states are stacked.
If you want to update the number of remaining frames by stacking states, you need to include the following information in the Note field.
<overWriteDuration: number of frames>

■ Skill settings for each weapon
It is possible to switch skills during a normal attack depending on the type of weapon.
The specified skill is executed by making the following entry in the Note field of the weapon.
<skill: skill name>

*Note
When dual wielding is set, only the setting of the first equipped weapon will be reflected.

■ Firing a transparent object
You can fire a transparent object to check whether the enemy is in front of you or not.
For example, it can be used to check if there is an enemy in front of you.
The collision target of the transparent object is the same as an event whose priority is set to Same as characters.

*Note
If there is already a character at the position where the transparent object is created, the transparent object will pass through the character and collide with the character.
the transparent object will pass through the character.

■ Target Selection Function
The "Target Selection" plug-in command allows the player or enemy to be selected by the cursor in the game.
This makes it possible, for example, to fire bullets at a selected enemy character.

If the weight is turned on, time can be stopped while the selection is being made, and if it is turned off, the selection can be made in real time.

When "Cancelable" is turned on, the target selection can be canceled when the cancel button is pressed during the target selection.
In this case, the result stored in the selection result storage switch is turned OFF.

■ CheckInTheScreen event
By executing the "CheckInTheScreen" plug-in parameter
The plugin parameter "CheckInTheScreen" can be used to determine if the specified character is on the screen.

■ Attribute judgment when receiving damage
By executing the plug-in command "Damage attribute check" in the common event that is executed when you
receive damage, you can determine which attribute you received damage from.
*Note: Normal attacks cannot be judged as attributes.

■ Increase attribute when attacking
Normally, only one attribute can be given to a skill, but it is possible to increase the attribute by writing
the following in the memo field. This setting can be used multiple times in one memo field.
<damageElement: Element name>

Example: When adding attributes of fire and ice
<damageElement: fire>
<damageElement: ice>

■ Character weight
By executing the "Character Action Weight" plug-in command, you can stop a character's
events for a certain period of time. can be stopped for a certain period of time.
The difference between this command and the "wait" event command is that the wait, when executed from a parallel move,
stops the character's autonomous movement, but the character action wait stops the autonomous movement as well.
However, the difference is that the character action weight stops the autonomous movement as well.
Therefore, this command can be used when weights are needed for rigidity in the event of damage.

■ How to check if the character has moved
Character movement can be checked by using the plug-in command
The character's movement can be checked by using the plugin command "Check if character is moved".
When this command is executed, if the character has moved at least once before being updated in the next frame,
the specified switch will be turned on, The specified switch will be turned ON.
The flag indicating whether or not the character has moved within the frame will be cleared when the
target character is updated in the next frame. The flag indicating whether the character has moved
within the frame is cleared when the target character is updated in the next frame.

[Appendix]
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


@command ChangeARPGMode
@text Toggle ARPG mode
@desc Enables/disables ARPG mode.

@arg ARPGMode
@text ARPG Mode
@type boolean
@default true
@desc Specify the ARPG mode to switch to.


@command MakeDynamicEvent
@text Create a dynamic object
@desc Generate a dynamic object.

@arg SrcMapId
@type number
@text Source map ID
@default 1
@desc Specify source map ID.

@arg SrcEventIdOrName
@type string
@text Source event ID or event name
@default 0
@desc Source event ID or event name

@arg X
@type number
@text X coordinate
@default 0
@desc Specify X coordinate to generate event.

@arg XByVariable
@type variable
@text X-coordinate (variable specification)
@default 0
@desc Specify the X coordinate to generate event by variable. If you set the X value directly, specify 0 for this parameter.

@arg Y
@type number
@text Y coordinate
@default 0
@desc Specify the Y coordinate to generate event.

@arg YByVariable
@type variable
@text Y-coordinate (specify variable)
@default 0
@desc Specify the Y coordinate to generate event by variable. If you set Y value directly, specify 0 for this parameter.

@arg MadeDynamicEventId
@text Variable for storing made dynamic event ID
@type variable
@default 0
@desc Specify the variable ID to store the generated dynamic event ID.


@command GetCharacterFloatPosition
@text Get character float position
@desc Get character float position.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specifies the target character.

@arg LeftUpOrCenter
@text Upper Left or Center
@type select
@option Upper Left
@value leftup
@option Center
@value center
@default leftup
@desc Specify which to get, the character's upper left or center of the coordinate.

@arg StoreFloatXVariableId
@text Variable ID for storing decimal X coordinate
@type variable
@default 0
@desc Specify the variable ID to store the acquired decimal X coordinate.

@arg StoreFloatYVariableId
@text Variable ID to store decimal Y coordinate
@type variable
@default 0
@desc Specify variable ID to store acquired decimal Y coordinate.


@command CalcDeg
@text Obtain angle between characters
@desc Obtains the angle of the target character as seen from the main character.

@arg SubjectCharacterSpecification
@text Subject character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specify the main character.

@arg TargetCharacterSpecification
@text Target character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specify the target character.

@arg StoreDegreeVariableId
@text Angle storage variable ID
@type variable
@default 0
@desc Specify the variable ID to store the acquired angle.


@command CalcFar
@text Get distance between characters
@desc Obtains the distance between the main character and the target character.

@arg SubjectCharacterSpecification
@text Subject character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specifies the main character.

@arg TargetCharacterSpecification
@text Target character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specify the target character.

@arg StoreFarVariableId
@text Distance store variable ID
@type variable
@default 0
@desc Specify the variable ID to store the acquired distance.


@command CheckInTheScreen
@text Check if the character is in the screen
@desc Checks if the character is in the screen.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specify the target character.

@arg XMargin
@text X-axis margin
@type number
@decimals 2
@default 2
@desc Specifies the off-screen margin width for the X-axis. The unit is the number of squares.

@arg YMargin
@text Y-axis margin
@type number
@decimals 2
@default 2
@desc Specifies the off-screen margin width for the X-axis. The unit is the number of squares.

@arg StoreResultSwitchId
@text Result store switch ID
@type switch
@default 1
@desc Specify the switch ID to set ON if the character is in the screen and OFF otherwise.


@command CheckMoved
@text Check if character is moved
@desc Checks if the character has moved within the frame.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specify the target character.

@arg StoreResultSwitchId
@text Result store switch ID
@type switch
@default 1
@desc Specify the switch ID to set ON if moved, OFF otherwise.


@command TransparentObjectCast
@text Fires transparent object
@desc Fire a transparent object and check if it hits the object.

@arg TransparentObjectPosition
@type struct<TransparentObjectPosition>
@text Position specification
@desc Specify the position at which the transparent object is created.

@arg Degree
@text angle
@type number
@decimals 2
@default 0
@desc Specifies the launch angle of the transparent object.

@arg DegreeByVariable
@text angle (specify variable)
@type variable
@default 0
@desc Specify the launch angle of transparent object by variable.

@arg Far
@text distance
@type number
@decimals 2
@default 0
@desc Specifies the distance of the transparent object to be fired. 0 means infinite.

@arg FarByVariable
@text distance (variable specification)
@type variable
@default 0
@desc Specify the launch distance of the transparent object by variable.

@arg Width
@text width
@type number
@decimals 2
@default 1
@desc Specifies the width of the transparent object.

@arg Height
@text Height
@type number
@decimals 2
@default 1
@desc Specifies the height of the transparent object.

@arg CollisionResultSwitchId
@text Switch ID for storing collision results
@type switch
@default 1
@desc Specify the switch ID to set ON in case of collision and OFF otherwise.

@arg CollidedXVariableId
@text Collided X coordinate storage variable ID
@type variable
@default 0
@desc Specify the variable ID that stores the X coordinate of the point where the collision occurred.

@arg CollidedYVariableId
@text Variable ID for storing collided X-coordinates
@type variable
@default 0
@desc Specify the variable ID that stores the X coordinate of the point where the collision occurred.


@command SetupEnemy
@text Setup Enemy
@desc Setup the enemy for event.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specify the target character.

@arg EnemyId
@text Enemy ID
@type enemy
@default 1
@desc Specify the enemy ID.

@arg CollideAttackSkillId
@text Collision Attack Skill ID
@type skill
@default 0
@desc
Specify the skill ID for damage calculation when the enemy collides with the actor.

@arg DamageCommonEventId
@text Enemy damage common event ID
@type common_event
@default 0
@desc
Specifies the common event to be executed when the enemy is damaged.

@arg DefeatEnemyCommonEventId
@text Defeat Enemy Common Event ID
@type common_event
@default 0
@desc
Specify the common event ID to be executed when an enemy is defeated.

@arg HpGauge
@text HP gauge
@type select
@option none
@value none
@option normal
@value normal
@option boss
@value boss
@default normal
@desc Sets the display of the HP gauge.


@command ChangeHpGaugeVisible
@text toggles the enemy HP gauge visibility
@desc Toggles the display/non-display of the HP gauge of the enemy.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specify the target character.

@arg ShowOrHide
@text show/hide
@type boolean
@on Show
@off hide
@default true
@desc Select to show or hide.


@command SetupFieldObject
@text Setup FieldObject
@desc Setup field object for event.

@arg DamageCommonEventId
@text Field Object Damage Common Event ID
@type common_event
@default 0
@desc
Specifies a common event to execute when a field object takes damage.


@command UseSkill
@text Use Skill
@desc Use Skill

@arg SkillId
@type skill
@text Skill ID
@default 1
@desc Specify the ID of the skill to be used. If a name or variable is specified, it takes precedence.

@arg SkillByName
@type string
@text Skill (specify name)
@desc Specify the name of the skill to be used. If you do not use naming, leave it blank.

@arg SkillIdByVariable
@type variable
@text Skill ID (variable specification)
@default 0
@desc Specify the ID of the skill to be used by variable. If you do not use variable specification, set it to 0.


@command UseItem
@text UseItem
@desc Use item.

@arg ItemId
@type item
@text Item ID
@default 1
@desc Specify the ID of the item to be used. If a name or variable is specified, it takes precedence.

@arg ItemByName
@type string
@text Item (specify name)
@desc Specify the name of the item to be used. If you do not use the name specification, leave it blank.

@arg ItemIdByVariable
@type variable
@text Item ID (specify variable)
@default 0
@desc Specify the ID of the item to be used by variable. If you do not use variable specification, set it to 0.


@command SkillActivation
@text Skill Activation
@desc Activate a skill. This command must be invoked in the action common event of the skill.

@arg ChantCommonEventId
@type common_event
@text Chant Common Event ID
@default 0
@desc Specify the ID of the common event to perform the chanting process.


@command ChangeSkillCancelWhenDamageEnableOrDisable
@text Damage Skill Cancel Enable/Disable change
@desc Enables/disables skill cancellation due to damage. This command must be invoked within the skill's action common event.

@arg EnableOrDisable
@text Enable/Disable
@type boolean
@on Enable
@off Disable
@default true
@desc
Select enable or disable.


@command TestApplySkillEffect
@text Test apply skill effect
@desc Tests if a skill effect can be applied to the user and sets the result to a switch.

@arg IsSkillSpecification
@text IsSkillSpecification
@type boolean
@default false
@desc If ON is specified, the target skill is specified. If not specified, the activated skill is applied.

@arg SkillSpecification
@text SkillSpecification
@type struct<SkillSpecification>
@default {"SkillOrItem":"skill","SkillId":"1","SkillByName":"","SkillIdByVariable":"0","ItemId":"1","ItemByName":"","ItemIdByVariable":"0"}
@desc Specify the skill to be used when "On" is selected.

@arg StoreResultSwitchId
@text Result store switch ID
@type switch
@default 1
@desc Specify the switch ID to set ON if available, otherwise OFF.


@command ApplySkillEffect
@text apply skill effect
@desc Apply the skill effect to the user. This command must always be invoked after "Activate Skill" in the skill's action common event.

@arg IsSkillSpecification
@text IsSkillSpecification
@type boolean
@default false
@desc If ON is specified, the target skill is specified. If not specified, the activated skill is applied.

@arg SkillSpecification
@text Skill specification
@type struct<SkillSpecification>
@default {"SkillOrItem":"skill","SkillId":"1","SkillByName":"","SkillIdByVariable":"0","ItemId":"1","ItemByName":"","ItemIdByVariable":"0"}
@desc Specify the skills to be covered when "On" is set to "SkillIdByVariable" or "On" is set to "SkillIdByVariable".


@command MakeSkillObject
@text Create Skill Object
@desc Generate a skill object.

@arg SrcMapId
@type number
@text Source map ID
@default 1
@desc Specify the source map ID.

@arg SrcEventIdOrName
@text Source event ID or event name
@type string
@default 0
@desc Specify the source event ID or event name.

@arg SkillObjectPosition
@type struct<SkillObjectPosition>
@text Position specification
@desc Specify the position at which the skill object is generated.

@arg IsSkillSpecification
@text IsSkillSpecification
@type boolean
@default false
@desc If ON is specified, the target skill is specified. If not specified, the activated skill is applied.

@arg SkillSpecification
@text Skill specification
@type struct<SkillSpecification>
@default {"SkillOrItem":"skill","SkillId":"1","SkillByName":"","SkillIdByVariable":"0","ItemId":"1","ItemByName":"","ItemIdByVariable":"0"}
@desc Specify the skills to be covered when "On" is set to "SkillIdByVariable" or "On" is set to "SkillIdByVariable".

@arg MadeDynamicEventId
@text Variable for storing made dynamic event ID
@type variable
@default 0
@desc Specify the variable ID to store the generated dynamic event ID.


@command SetAttackDegree
@text Specify attack angle
@desc Specify the attack angle of the skill object.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specifies the target character.

@arg AttackDegree
@type number
@text Attack angle
@default 0
@desc Set the attack angle.

@arg AttackDegreeByVariable
@type variable
@text Attack angle (specified by variable)
@default 0
@desc Set the attack angle by variable.


@command SetUserPositionSynchronize
@text Set skill object user position synchronization
@desc Specifies whether or not to synchronize the user position of the skill object.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specify the target character.

@arg Synchronize
@type boolean
@text Synchronize
@on Enable
@off Disable
@default true
@desc Specifies whether synchronization is enabled or disabled.


@command CheckDamageElement
@text Damage attribute check
@desc Checks damaged attributes. Be sure to call this command from the received damage processing.

@arg ElementName
@text Element name
@type string
@desc Specifies the attribute name to be checked.

@arg StoreResultSwitchId
@text Result store switch ID
@type switch
@default 1
@desc Specifies the switch ID that sets ON if the attribute is specified, and OFF otherwise.


@command SetHitBox
@text SetHitBox
@desc Set the hitbox setting. If the hitbox is set again for the same type, the existing setting is overwritten.
@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specify the target character.

@arg HitBoxType
@text HitBoxType
@type select
@option attack
@value attack
@option damage
@value damage
@option custom
@value custom
@default attack
@desc Set the hitbox type.

@arg CustomHitBoxTag
@text custom hit box tag
@type string
@desc Specify tag for custom hitbox type.

@arg HitBoxList
@type struct<Box>[]
@text HitBoxList
@default []
@desc Set the hit box.


@command ChangeHitBoxEnableOrDisable
@text Change hitbox enable/disable
@desc Enables or disables the hitbox.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specify the target character.

@arg HitBoxType
@text HitBoxType
@type select
@option attack
@value attack
@option damage
@value damage
@option custom
@value custom
@default attack
@desc Set the hitbox type.

@arg CustomHitBoxTag
@text custom hit box tag
@type string
@desc Specifies the tag for a custom hitbox type.

@arg Enabled
@text Enabled
@type boolean
@desc If set to true, enable the hitbox.


@command HitCheck
@text Hit check
@desc Perform hit check by hitbox.

@arg SubjectCharacterSpecification
@text Subject character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specifies the main character.

@arg SubjectHitBoxType
@text subject hit box type
@type select
@option attack
@value attack
@option damage
@value damage
@option custom
@value custom
@default attack
@desc Set the hitbox type.

@arg SubjectCustomHitBoxTag
@text subject custom hit box tag
@type string
@desc Sets the custom hitbox tag.

@arg IsTargetSpecification
@text IsTargetSpecification
@type boolean
@default false
@desc Specify the event to be targeted if ON is specified.

@arg TargetCharacterSpecification
@text Target character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specifies the target character when "Target" is ON.

@arg TargetHitBoxType
@text Target hit box type
@type select
@option attack
@value attack
@option damage
@value damage
@option custom
@value custom
@default attack
@desc Set the hitbox type.

@arg TargetCustomHitBoxTag
@text Target custom hit box tag
@type string
@desc Set custom hitbox tag.

@arg StoreResultSwitchId
@text Result store switch ID
@type switch
@default 1
@desc Specify the switch ID to set ON if there was a hit and OFF otherwise.


@command GetBattlerStatus
@text GetBattlerStatus
@desc Get the status of the specified battler.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specifies the target character.

@arg StatusType
@type select
@option mhp
@option mmp
@option hp
@option mp
@option tp
@option atk
@option mat
@option mdf
@option agi
@option luk
@option hit
@option eva
@option cri
@option cev
@option mev
@option mrf
@option cnt
@option hrg
@option mrg
@option trg
@option tgr
@option grd
@option rec
@option pha
@option mcr
@option tcr
@option pdr
@option mdr
@option fdr
@option exr
@text status type
@default mhp
@desc Specifies the status type.

@arg DestVariableId
@type variable
@text Destination Variable
@default 1
@desc Specify the destination variable for the acquired status value.


@command SetBattlerStatus
@text SetBattlerStatus
@desc Set the status of the specified battler.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specify the target character.

@arg StatusType
@type select
@option hp
@option mp
@option tp
@text StatusType
@default mhp
@desc Specifies the status type.

@arg Value
@type number
@text Value
@default 0
@desc Specifies the status value to be set.

@arg ValueByVariable
@type variable
@text value (specify variable)
@default 0
@desc Specify the variable ID in which the status value to be set is stored.


@command GetBattlerARPGParameter
@text GetBattlerARPGParameter
@desc Get the ARPG-specific parameters for the specified battler.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specifies the target character.

@arg ARPGParameterType
@type select
@option skill cancel damage rate
@value skillCancelDamageRate
@option Just guard frame
@value justGuardFrame
@text ARPGParameterType
@default skillCancelDamageRate
@desc Specify ARPG parameter type.

@arg DestVariableId
@type variable
@text Destination Variable
@default 1
@desc Specify destination variable for acquired status value.


@command SetBattlerARPGParameter
@text SetBattlerARPGParameter
@desc Set the ARPG only parameter of the specified battler.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specify the target character.

@arg ARPGParameterType
@type select
@option skill cancel damage rate
@value skillCancelDamageRate
@option Just guard frame
@value justGuardFrame
@text ARPGParameterType
@default skillCancelDamageRate
@desc Specify ARPG parameter type.

@arg Value
@type number
@text Value
@default 0
@decimals 2
@desc Specifies the status value to be set.

@arg ValueByVariable
@type variable
@text value (specify variable)
@default 0
@desc Specify the variable ID where the status value to be set is stored.


@command GetBattlerARPGFlag
@text Get battler ARPG flag
@desc Get the ARPG only flag of the specified battler.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specify the target character.

@arg ARPGFlagType
@type select
@option No damage flag
@value noDamageFlag
@option No attack flag
@value noAttackFlag
@text ARPG flag type
@default noDamageFlag
@desc Specify the ARPG flag type.

@arg DestSwitchId
@type switch
@text Destination switch
@default 1
@desc Specifies the switch to which the retrieved flag values are to be stored.


@command SetBattlerARPGFlag
@text Set battler ARPG flag
@desc Sets the ARPG-only flag for the specified battler.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specify the target character.

@arg ARPGFlagType
@type select
@option No damage flag
@value noDamageFlag
@option No attack flag
@value noAttackFlag
@text ARPG flag type
@default noDamageFlag
@desc Specify the ARPG flag type.

@arg Value
@type boolean
@text Value
@default true
@desc Specify the flag value to be set.

@arg ValueBySwitch
@type switch
@text Value(by switch)
@default 0
@desc Specifies the switch ID where the flag value to be set is stored.


@command SetCheckMapValid
@text Toggle map valid range check valid/invalid
@desc Toggle enable/disable of map valid range check.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
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


@command CharacterBlowAway
@text Character Blow Away
@desc Blow away a character in the specified direction.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specify the target character.

@arg Degree
@text angle
@type number
@default 0
@desc Specifies the angle at which the character will be blown away.

@arg DegreeByVariable
@text angle (specify variable)
@type variable
@default 0
@desc Specify the angle to blow off by variable.

@arg InitialVelocity
@text InitialVelocity
@type number
@decimals 2
@default 0.5
@desc Specify the initial velocity to blow off.

@arg InitialVelocityByVariable
@text Initial velocity (specify variable)
@type variable
@default 0
@desc Specify initial velocity to blow off by variable.

@arg Duration
@text Duration
@type number
@decimals 2
@default 10
@desc Specifies the interval between blasts.

@arg DurationByVariable
@text interval (variable specification)
@type variable
@default 0
@desc Specify the interval between blasts by variable.

@arg Wait
@text Wait
@type boolean
@default true
@desc If true is specified, it will wait until blowing away is completed.


@command CharacterActionWait
@text Character action weight
@desc Makes the character's actions wait for a certain amount of time.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specify the target character.

@arg Duration
@text Duration
@type number
@decimals 2
@default 10
@desc Specifies the interval between blasts.

@arg DurationByVariable
@text interval (variable specification)
@type variable
@default 0
@desc Specify the interval between blasts by variable.


@command TargetSelect
@text TargetSelect
@desc Target selection.

@arg SelectResultSwitchId
@text Switch ID to store selection result
@type switch
@default 0
@desc
Specify the switch ID that is set to ON if the target is successfully selected.

@arg SelectedTargetCharacterKindVariableId
@text Variable ID for selected target character type
@type variable
@default 0
@desc
Specify a variable ID which stores the character type of the selected target.

@arg SelectedTargetEventIdVariableId
@text Variable ID for selected target event ID
@type variable
@default 0
@desc
Specify a variable ID which stores the event ID of the target.

@arg Wait
@text wait
@type boolean
@default true
@desc
If set to ON, scene will be stopped while target is selected.

@arg Cancelable
@text Cancelable
@type boolean
@default true
@desc
If set to ON, enables cancellation of target selection.


@command SearchNearBattler
@text Search for nearby battlers
@desc Search for the nearest battler from the target.

@arg Target
@text Target
@type select
@option all battlers
@value all
@option enemy character
@value opponent
@option friend
@value friend
@default all
@desc Specify the target.

@arg SubjectCharacterSpecification
@text Subject character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specifies the main character.

@arg StoreResultSwitchId
@text StoreResultSwitchId
@type switch
@default 1
@desc Specify the switch ID to set ON if an enemy character is found and OFF otherwise.

@arg StoreCharacterKindVariableId
@text Variable ID for storing character type
@type variable
@default 0
@desc Specify the variable ID to store the character type of the found battler.

@arg StoreEventIdVariableId
@text Variable ID to store event ID
@type variable
@default 0
@desc Specify the variable ID to store the event ID if the found battler is an event.


@command SetPlayerGuardMode
@text Player guard mode setting
@desc Sets the player's guard mode.

@arg GuardMode
@text Guard nide
@type boolean
@default true
@desc
Specifies guard mode ON or OFF.


@command ChangeControlActor
@text Change control actor
@desc Change the manipulation actor. This command has the same behavior as changing the actor by key input.


@command ShowMessagePopup
@text Show message popup
@desc Show message popup

@arg Text
@text text
@type string
@desc
Specify the text to display in the popup.

@arg WindowWidth
@text Width
@type number
@default 640
@desc
Specifies the width of the popup window.

@arg Time
@text time
@type number
@default 60
@desc
Specify the display time of the popup.


@param CopyEventSetting
@text Copy event common setting
@type struct<CopyEventSetting>
@default {"CopyEventTag":"cp","DynamicEventSrcMapIds":"[]"}
@desc
Copy event common setting.

@param BattlerSetting
@text Battler common setting
@type struct<BattlerSetting>
@default {"DamageDegCommonVariableId":"0","UserKindCommonVariableId":"0","UserEventIdCommonVariableId":"0","DamageKindCommonVariableId":"0","DamageTypeCommonVariableId":"0","DamageValueCommonVariableId":"0"}
@desc
Common setting for battler.

@param ActorSetting
@text Actor common setting
@type struct<ActorSetting>
@default {"NormalAttackSkillId":"0","DamageCommonEventId":"0","NormalGuardCommonEventId":"0","JustGuardCommonEventId":"0","StartGuardCommonEventId":"0","EndGuardCommonEventId":"0","JustGuardFrame":"10","ActorHitBox":"{\"AttackHitBoxList\":\"[]\",\"DamageHitBoxList\":\"[]\"}","GameOverCommonEventId":"0","LevelUpCommonEventId":"0"}
@desc
Common setting of Actor.

@param EnemySetting
@text Enemy common setting
@type struct<EnemySetting>
@default {"CollideAttackSkillId":"0","DamageCommonEventId":"0","DefeatEnemyCommonEventId":"0"}
@desc
Enemy common setting.

@param SkillObjectSetting
@text Skill object common setting
@type struct<SkillObjectSetting>
@default {"SkillObjectUserKindSelfVariableId":"0","SkillObjectUserEventIdSelfVariableId":"0","CollisionDetectExSelfSwitchId":"0"}
@desc
Configure common settings for skill objects.

@param HitBoxSetting
@text Hit box common setting
@type struct<HitBoxSetting>
@default {"VisibleHitAreaSwitchId":"0","AttackHitBoxColor":"#ff0000aa","DamageHitBoxColor":"#0000ffaa","CustomHitBoxDefaultColor":"#00ff00aa","CustomHitBoxColorList":"[]"}
@desc
Perform common setting of hitbox.

@param ActionComboSetting
@text Action combo setting
@type struct<ActionComboData>[]
@desc
Set the action combo.

@param EnemyHpGaugeSetting
@text Enemy HP Gauge Setting
@type struct<EnemyHpGaugeSetting>
@default {"NormalEnemyHpGaugePosition":"up","NormalEnemyHpGaugeYOffset":"-8","NormalEnemyHpGaugeHeight":"6","NormalEnemyHpGaugeColor1":"#00aa00","NormalEnemyHpGaugeColor2":"#22ff22","BossEnemyHpGaugeLabel":"BOSS","BossEnemyHpGaugeYOffset":"16","BossEnemyHpGaugeWidth":"500","BossEnemyHpGaugeHeight":"12","BossEnemyHpGaugeColor1":"#00aa00","BossEnemyHpGaugeColor2":"#22ff22"}
@desc
Enemy HP gauge setting.

@param KeySetting
@text Key setting
@type struct<KeySetting>
@default {"Menu":"{\"KeyName\":\"escape\",\"KeySymbol\":\"\",\"KeyCode\":\"0\",\"ButtonIndex\":\"-1\"}","ActorNormalAttack":"{\"KeyName\":\"ok\",\"KeySymbol\":\"\",\"KeyCode\":\"0\",\"ButtonIndex\":\"-1\"}","ActorGuard":"{\"KeyName\":\"other\",\"KeySymbol\":\"A\",\"KeyCode\":\"65\",\"ButtonIndex\":\"6\"}","VisibleHitBox":"{\"KeyName\":\"other\",\"KeySymbol\":\"F6\",\"KeyCode\":\"117\",\"ButtonIndex\":\"-1\"}","ChangeControlActor":"{\"KeyName\":\"other\",\"KeySymbol\":\"S\",\"KeyCode\":\"83\",\"ButtonIndex\":\"11\"}"}
@desc
Configure various settings for key input.

@param SESetting
@text SE Setting
@type struct<SESetting>
@default {"ActorChange":"{\"FileName\":\"Decision5\",\"Volume\":\"90\",\"Pitch\":\"100\",\"Pan\":\"0\"}"}
@desc
Configure various settings for the SE.

@param EnableARPGSwitchId
@text ARPG enable switch ID
@type switch
@default 0
@desc
Specify the switch ID to enable ARPG.

@param UseDamagePopup
@text Use damage popup
@type boolean
@default true
@desc
If true is set, the damage value will be displayed when the damage caused by the attack occurs.

@param UseImageDamage
@text Use Damage Image
@type boolean
@default false
@desc
If set to true, the image in system/Damage.png will be used for damage display.

@param UseImageTargetSelectCursor
@text Use target select cursor image
@type boolean
@default false
@desc
If set to true, use image as target select cursor.

@param TargetSelectCursorImageFileName
@text Target select cursor image file name
@type file
@dir img
@desc
Specify the target selection cursor image file name.

@param EnableChangeControlActorSwitchId
@text Control actor change permission switch ID
@type switch
@default 0
@desc
Specifies the switch ID that allows modification of the control actor. If set to 0, it is always enabled.

@param ErrorMessageLanguage
@text Error message language
@type select
@option english
@value en
@option Japanese
@value ja
@default en
@desc
Specifies the display language of error messages.
*/
/*!/*~struct~CopyEventSetting:
@param CopyEventTag
@text CopyEventTag
@type string
@default cp
@desc
Specify the tag name to determine the event to be copied.

@param DynamicEventSrcMapIds
@text List of map IDs from which dynamic events are generated
@type number[]
@default []
@desc
Set the list of map IDs from which dynamic events are generated.
*/
/*!/*~struct~BattlerSetting:
@param DamageDegCommonVariableId
@text Common variable for storing damage angle
@type variable
@default 0
@desc
Specify a common variable to store the angle of damage.

@param UserKindCommonVariableId
@text Common event variable to store user type
@type variable
@default 0
@desc
Specify a variable to store the user type (1: player, 3: event) when an action common event is executed by the battler.

@param UserEventIdCommonVariableId
@text Common event variable to store user event ID
@type variable
@default 0
@desc
Specify a variable to store the event ID when an action common event is executed in battler.

@param DamageKindCommonVariableId
@text Damage Kind Common Variable ID
@type variable
@default 0
@desc
Specify the common variable to which the damage type is set when damage is received.

@param DamageTypeCommonVariableId
@text Damage type common variable ID
@type variable
@default 0
@desc
Specify the common variable to which the damage type is set when damage is taken.

@param DamageValueCommonVariableId
@text DamageValueCommonVariableID
@type variable
@default 0
@desc
Specifies the common variable to which the damage value is set when damage is received.
*/
/*!/*~struct~ActorSetting:
@param NormalAttackSkillId
@text Normal attack skill ID
@type skill
@default 0
@desc
Specify the skill ID for normal attacks.

@param DamageCommonEventId
@text Actor damage common event ID
@type common_event
@default 0
@desc
Specifies the common event to be executed when an actor is damaged.

@param DeadCommonEventId
@text Actor dead Common Event ID
@type common_event
@default 0
@desc
Specifies a common event to execute when an actor becomes dead.

@param NormalGuardCommonEventId
@text actor normal guard common event ID
@type common_event
@default 0
@desc
Specify the common event to be executed when the actor is normally guarded.

@param JustGuardCommonEventId
@text Actor JustGuard Common Event ID
@type common_event
@default 0
@desc
Specify the common event to be executed when the actor just guards.

@param StartGuardCommonEventId
@text Actor guard start common event ID
@type common_event
@default 0
@desc
Specifies the common event to be executed when the actor starts guarding.

@param EndGuardCommonEventId
@text Actor Guard End Common Event ID
@type common_event
@default 0
@desc
Specify the common event to be executed when the actor finishes guarding.

@param JustGuardFrame
@text JustGuardFrame
@type number
@default 10
@desc
Specify the number of just-guarded frames allowed.

@param ActorHitBox
@text Actor Hit Box
@type struct<ActorHitBox>
@default {"DamageHitBoxList":"[]"}
@desc Specify the actor hit box setting.

@param GameOverCommonEventId
@text GameOver Common Event ID
@type common_event
@default 0
@desc
Specify the common event ID to be executed when the game is over. 0 specifies that the game is moved to the game over scene.

@param LevelUpCommonEventId
@text LevelUpCommonEventID
@type common_event
@default 0
@desc
Specify the common event to be executed when the level is raised.
*/
/*!/*~struct~EnemySetting:
@param CollideAttackSkillId
@text Collision Attack Skill ID
@type skill
@default 0
@desc
Specify the skill ID for damage calculation when the enemy collides with the actor.

@param DamageCommonEventId
@text Enemy Damage Common Event ID
@type common_event
@default 0
@desc
Specify the common event to be executed when the enemy is damaged.

@param DefeatEnemyCommonEventId
@text Enemy Defeat Common Event ID
@type common_event
@default 0
@desc
Specify the common event ID to be executed when an enemy is defeated.
*/
/*!/*~struct~SkillObjectSetting:
@param SkillObjectUserKindSelfVariableId
@text SkillObjectUserKindSelfVariable
@type variable
@default 0
@desc
Specify the self-variable to store the type of the user who created the skill object.

@param SkillObjectUserEventIdSelfVariableId
@text Self variable to store skill object user event ID
@type variable
@default 0
@desc
Specify the self variable to store the event ID when the type of the user who generated the skill object is an event.

@param CollisionDetectExSelfSwitchId
@text Ex-self switch ID for collision detect
@type switch
@default 0
@desc
Specify an ex-self switch ID which will turn ON when the skill object collides the target.
*/
/*!/*~struct~HitBoxSetting:
@param VisibleHitAreaSwitchId
@text switch ID for hit box visibility
@type switch
@default 0
@desc
Specify the switch ID to switch whether the hit box is visible or not.

@param AttackHitBoxColor
@text Attack Hit Box Color
@type string
@default #ff0000aa
@desc
Specify the color of the attack judgment when the hit box is made visible.

@param DamageHitBoxColor
@text Damage Hit Box Color
@type string
@default #0000ffaa
@desc
Specify the color of the damage judgment when the hit box is made visible.

@param CustomHitBoxDefaultColor
@text Custom Hit Box Default Color
@type string
@default #00ff00aa
@desc
Specifies the default color of the custom hitbox when the hitbox is made visible.

@param CustomHitBoxColorList
@text custom hit box color list
@type string<CustomHitBoxColor>
@default []
@desc
Specify the custom hit box color list for hit box visualization.
*/
/*!/*~struct~ActionComboData:
@param SkillId
@text Skill ID
@type skill
@default 0
@desc
Specify the skill ID for combo derivation.

@param ActionComboDerivations
@text Action combo derivation list
@type struct<ActionComboDerivation>[]
@desc
Specifies a derived list of action combos.
*/
/*!/*~struct~ActionComboDerivation:
@param FromSkillId
@text Origin skill ID
@type skill
@default 0
@desc
Specify the skill ID from which the combo is derived.

@param DerivationSkillId
@text Destination Skill ID
@type skill
@default 0
@desc
Specify the skill ID of the combo destination. Specify 0 for the first skill in the combo.

@param MinComboFrame
@text Minimum combo frame
@type number
@min 0
@default 30
@desc
Specifies the time in frames until a combo attack becomes possible.

@param MaxComboFrame
@text Maximum combo frame
@type number
@min 0
@default 60
@desc
Specifies the maximum time, in frames, allowed for combo attacks.
*/
/*!/*~struct~EnemyHpGaugeSetting:
@param NormalEnemyHpGaugePosition
@text Normal enemy hp gauge position
@type select
@option Up
@value up
@option Down
@value down
@default up
@desc Sets the display position of the normal enemy HP gauge.

@param NormalEnemyHpGaugeYOffset
@text Normal enemy hp gauge Y Offset
@type number
@min -9999
@default -8
@desc Sets the normal enemy HP gauge display Y coordinate offset.

@param NormalEnemyHpGaugeHeight
@text Normal enemy hp gauge height
@type number
@min 1
@default 6
@desc Sets the height of the normal enemy HP gauge.

@param NormalEnemyHpGaugeColor1
@text Normal Enemy HP Gauge Color 1
@type string
@default #00aa00
@desc Set Normal Enemy HP gauge color 1.

@param NormalEnemyHpGaugeColor2
@text Normal Enemy HP gauge color 2
@type string
@default #22ff22
@desc Set Normal Enemy HP gauge color 1.

@param BossEnemyHpGaugeLabel
@text Boss Enemy HP Gauge Label
@type string
@default BOSS
@desc Sets the text to be displayed next to the Boss Enemy HP gauge.

@param BossEnemyHpGaugeYOffset
@text Boss enemy hp gauge Y offset
@type number
@min 1
@default 16
@desc Sets the display Y coordinate offset of the boss enemy HP gauge.

@param BossEnemyHpGaugeWidth
@text Boss enemy hp gauge width
@type number
@min 1
@default 500
@desc Sets the width of the boss enemy HP gauge.

@param BossEnemyHpGaugeHeight
@text Boss enemy hp gauge height
@type number
@min 1
@default 12
@desc Sets the height of the boss enemy HP gauge.

@param BossEnemyHpGaugeColor1
@text Boss Enemy HP Gauge Color1
@type string
@default #00aa00
@desc Set the color of boss enemy HP gauge 1.

@param BossEnemyHpGaugeColor2
@text Boss Enemy HP Gauge Color 2
@type string
@default #22ff22
@desc Set Boss Enemy HP gauge color 1.
*/
/*!/*~struct~KeySetting:
@param Cancel
@text Cancel key
@type struct<Key>
@default {"KeyName":"escape","KeySymbol":"","KeyCodes":"[]","ButtonIndexes":"[]","KeyCode":"0","ButtonIndex":"-1"}
@desc
Specifies the key used for cancellation.

@param Menu
@text Menu key
@type struct<Key>
@default {"KeyName":"menu","KeySymbol":"","KeyCodes":"[]","ButtonIndexes":"[\"3\"]","KeyCode":"-1","ButtonIndex":"-1"}
@desc
Specifies the key to open the menu screen.

@param ActorNormalAttack
@text Actor normal attack key
@type struct<Key>
@default {"KeyName":"ok","KeySymbol":"","KeyCodes":"[]","ButtonIndexes":"[]","KeyCode":"-1","ButtonIndex":"-1"}
@desc
Specify the key for the actor's normal attack.

@param ActorGuard
@text Actor guard key
@type struct<Key>
@default {"KeyName":"other","KeySymbol":"A","KeyCodes":"[\"65\"]","ButtonIndexes":"[\"6\"]","KeyCode":"-1","ButtonIndex":"-1"}
@desc
Specify the key for the actor to guard.

@param VisibleHitBox
@text Hitbox visualization toggle key
@type struct<Key>
@default {"KeyName":"other","KeySymbol":"F6","KeyCodes":"[\"117\"]","ButtonIndexes":"[]","KeyCode":"-1","ButtonIndex":"-1"}
@desc
Specifies the key that toggles the hitbox visualization on/off.

@param ChangeControlActor
@text Change control actor
@type struct<Key>
@default {"KeyName":"other","KeySymbol":"S","KeyCodes":"[\"83\"]","ButtonIndexes":"[\"11\"]","KeyCode":"-1","ButtonIndex":"-1"}
@desc
Specifies the key that modifies the manipulation actor.
*/
/*!/*~struct~SESetting:
@param ActorChange
@text Actor change
@type struct<SE>
@default {"FileName":"","Volume":"90","Pitch":"100","Pan":"0"}
@desc
Specifies the SE to play when changing actors.
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
/*!/*~struct~Box:
@param X
@text X coordinate
@type number
@min -9999
@decimals 2
@default 0
@desc
Specify X coordinate.

@param Y
@text Y coordinate
@type number
@min -9999
@decimals 2
@default 0
@desc
Specify Y coordinate.

@param Width
@text width
@type number
@min 0
@decimals 2
@default 1
@desc
Specify the width.

@param Height
@text height
@type number
@min 0
@decimals 2
@default 1
@desc
Specify the height.
*/
/*!/*~struct~CustomHitBoxColor:
@param CustomHitBoxTag
@text custom hit box tag
@type string
@desc Specify the tag for the custom hit box.

@param Color
@text Color
@type string
@default #00ff00aa
@desc
Specifies the color of the custom hitbox when the hitbox is made visible.
*/
/*!/*~struct~SkillObjectPosition:
@param Specification
@text Position specification
@type select
@option current coordinate
@value current
@option forward coordinate
@value forward
@option character coordinates
@value character
@option custom coordinates
@value custom
@default current
@desc
Select the position specification method.

@param CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specifies the target character when the character coordinates are selected by position specification.

@param CustomPosition
@text custom coordinates
@type struct<Position>
@desc
Specify the generated coordinates when custom coordinates are selected for position specification.
*/
/*!/*~struct~TransparentObjectPosition:
@param Specification
@text Position specification
@type select
@option character coordinate
@value character
@option custom coordinates
@value custom
@default current
@desc
Select the position specification method.

@param CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc Specifies the target character when the character coordinates are selected by position specification.

@param CustomPosition
@text custom coordinates
@type struct<Position>
@desc
Specify the generated coordinates when custom coordinates are selected by position specification.
*/
/*!/*~struct~Position:
@param X
@type number
@text X coordinate
@default 0
@desc Specify X coordinate to generate event.

@param XByVariable
@type variable
@text X-coordinate (specify variable)
@default 0
@desc Specify the X coordinate to generate event by variable. If you set the value directly, specify 0 for this parameter.

@param Y
@type number
@text Y coordinate
@default 0
@desc Specify Y coordinate to generate event.

@param YByVariable
@type variable
@text Y-coordinate (specify variable)
@default 0
@desc Specify the Y coordinate to generate event by variable. If a direct value is set, specify 0 for this parameter.
*/
/*!/*~struct~ActorHitBox:
@param DamageHitBoxList
@type struct<Box>[]
@text Damage judgment hit box list
@default []
@desc Set the damage judgment hit box.
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
/*!/*~struct~SkillSpecification:
@param SkillOrItem
@text skill or item
@type select
@option skill
@value skill
@option item
@value item
@default skill
@desc Select whether to specify a skill or an item.

@param SkillId
@type skill
@text Skill ID
@default 1
@desc Specify the ID of the skill to be used. If a name or variable is specified, it takes precedence.

@param SkillByName
@type string
@text Skill (specify name)
@desc Specify the name of the skill to be used. If you do not use the name specification, leave it blank.

@param SkillIdByVariable
@type variable
@text Skill ID (specify variable)
@default 0
@desc Specify the ID of the skill to be used by variable. If you do not use variable specification, set it to 0.

@param ItemId
@type item
@text Item ID
@default 1
@desc Specifies the ID of the item to be used. If a name or variable is specified, it takes precedence.

@param ItemByName
@type string
@text Item (specify name)
@desc Specify the name of the item to be used. Leave blank if you do not use naming.

@param ItemIdByVariable
@type variable
@text Item ID (variable specification)
@default 0
@desc Specify the ID of the item to be used by variable. If you do not use variable specification, set it to 0.
*/
/*!/*:ja
@target MZ
@plugindesc ARPGコア v1.6.1
@author うなぎおおとろ

@help
【概要】
本プラグインはツクールMZのシステムをARPGに変換する機能を提供します。

■ 特徴
本プラグインはアクションRPGに必要なプレイヤーやエネミーのステータス管理、
当たり判定の設定、攻撃処理の設定といった機能を提供します。

ダメージを与えるオブジェクト(剣による斬撃や弾の発射など)は全てイベントを動的に設定することで
実現します。このため、非常にカスタマイズ性の高いプラグインになっています。

また、ダメージを受けた場合の処理などもコモンイベントによって作成することが可能です。
例えば、サンプルゲームではダメージを受けた場合、キャラクターがダメージを受けた方向にノックバックしますが、
これはコモンイベントからキャラクター吹き飛ばし用のプラグインコマンドを実行することで実現しています。
この機能を活用すれば、例えば連続して攻撃を当てた場合のみ吹き飛ばすといったコンボ的なシステムを導入することも可能です。

また、本プラグインではドット移動プラグインの上に構築していますので、あらゆるキャラクターの移動を
ドット単位で制御でき、非常にアクション性の高いゲームを作ることが可能です。
例えば敵キャラとプレイヤーの角度を計算し、その方向に向けて弾を飛ばすことで、
プレイヤーを追撃する攻撃なども実現できます。

■ 依存プラグイン
本プラグインの導入に当たっては以下のプラグインを必須とします。

・ドット移動システム(DotMoveSystem.js)
キャラクターをドット単位で制御するために使用します。

・ドット移動機能拡張プラグイン(DotMoveSystem_FunctionEx.js)
ドット移動システム本体に様々な拡張機能を追加するプラグインです。

・セルフ変数プラグイン(SelfVariable.js)
セルフ変数や拡張セルフスイッチ、コモンイベント変数/スイッチを提供するプラグインです。
ARPGコアでは様々なゲーム中でのフラグを自動的にセルフ変数として
イベントに設定することがありますので(スキルを使用したユーザーのIDなど)、
そのために使用します。

これらの依存プラグインを含めた本プラグインの導入順については以下のように導入してください。
・DotMoveSystem.js
・DotMoveSystem_FunctionEx.js
・SelfVariable.js
・ARPG_Core.js

【機能詳細】
[全般]
■ ARPGモードの開始と終了
プラグインコマンドの「ARPGモード切り替え」でONを設定するとARPGモードを開始します。
OFFにした場合はARPGモードを終了します。
ARPGモードになるとフィールドでの敵との戦闘が可能になります。
現在のARPGモードがONであるかはプラグインパラメータ「ARPGモードスイッチ」で
設定したスイッチによって確認することができます。

※注意1: マップを移動した場合、ARPGモードは自動的にOFFに切り替わります。
※注意2: ARPGモードスイッチを変更しても効果はありません。ARPGモードの切り替えは
必ずこのコマンドによって行う必要があります。
※注意3: ARPG戦闘中はセーブを行うことができません。


[コピーイベント/動的イベント関連]
■ イベントのコピー
イベントのメモ欄に以下のように記述すると、プラグインパラメータで指定した
動的イベントコピー元マップの一覧から指定したイベントをコピーします。
<cp: コピー元イベント名前またはイベントID>

また、以下のように記述することでコピー元のマップを限定することも可能です。
<cp: コピー元マップID,コピー元イベント名前またはイベントID>

※注意: コピー元となるマップのIDについては全てプラグインパラメータ
       「コピーイベント共通設定/動的イベント生成元マップID一覧」に設定する必要があります。

■ 動的イベントの生成
プラグインコマンド「動的イベント生成」を実行することで動的にイベントを生成することができます。
動的イベントのコピー元となるイベントはプラグインパラメータ「動的イベント生成元マップID一覧」に
登録されたマップに配置する必要があります。

■ 動的イベントの削除
生成した動的イベントはイベントコマンド「イベントの一時消去」を
実行することで完全に消去されます。


[アクター関連]
■ ガードについて
ARPG戦闘中にAキーを押している間、プレイヤーはガードを行います。
ガード中にプレイヤーの向きと反対方向から攻撃を受けた場合、ガード中であればダメージを半減します。
また、攻撃をガードする直前でガードした場合はジャストガードとなり、ダメージを完全に無力化します。

ガード成功判定に使用する攻撃の方向については「スキルオブジェクトの攻撃角度」を参照してください。

ガード機能を使用しない場合、プラグインパラメータ「キー共通設定/アクターガードキー」の
キー名を「未割り当て」に設定してください。

また、ガード機能は使用するがジャストガードを使用しない場合、
ジャストガードのフレーム数に0を設定してください。

■ プラグインコマンドによるガード設定
ガードはAキーを押す以外にもプラグインコマンドを実行してガードさせることも可能です。
プラグインコマンド「プレイヤーガードモード設定」でガードモードをONに設定すると、
その間はガードした状態になります。OFFに設定するとガードを解除します。
この機能は主にキーボードやゲームパッドがない環境でガードを行うことを想定しています。

■ アクター切り替え
Sキーを押すと、プレイヤーのアクターを切り替えることができます。
この機能はARPGモードのON/OFFにかかわらず使用可能です。

また、プラグインコマンド「操作アクター変更」を実行することでも
アクターの切り替えが可能です。

プラグインパラメータ「操作アクター変更許可スイッチID」で設定した
スイッチがOFFになるとキー入力によるアクター切り替えが無効になります。
プラグインコマンドによる操作アクターの変更はスイッチのON/OFFにかかわらず
使用することが可能です。

※注意: アクターが攻撃中またはダメージを受けている途中の場合は
アクターを切り替えることはできません。また、アクターの切り替えができない間は
メニュー画面の並び替え機能も使用できません。


[エネミー関連]
■ 敵キャラの設定について
敵キャラのイベント内において、並列処理、または自動実行によって
プラグインコマンド「エネミー設定」を実行することで、それを実行したイベントは
敵キャラとして扱われます。
なお、「エネミー設定」は必ずARPGモードがONの場合に実行してください。

敵キャラ設定時に引数で「衝突攻撃スキルID」「敵撃破コモンイベントID」
「エネミーダメージコモンイベントID」を設定することができますが、
これらの値に0を指定した場合、プラグインパラメータ「エネミー共通設定」
にある同一名のパラメータの値が適用されます。

■ 敵キャラのHP表示
プラグインコマンド「エネミー設定」で「HPゲージ」を設定することで、敵キャラのHPを表示することが可能です。
"ノーマル"を設定した場合、敵キャラに直接HPゲージを表示します。
"ボス"を設定した場合、画面上部に大きなHPゲージを表示します。


[スキル関連]
■ スキルの作成
スキルのメモ欄に<action: コモンイベント名またはID>と記載すると、
そのスキルを実行したときに該当のコモンイベントが呼び出されます。
このコモンイベントのことを「アクションコモンイベント」といいます。
アクションコモンイベント内では、プラグインコマンド「スキル発動」を実行することで、
スキルを発動し、MPあるいはTPの消費が行われます。

この状態で、「スキルオブジェクト生成」を行うことで、スキルオブジェクトが生成されます。
スキルオブジェクトとは、バトラーに当たるとダメージを与えたりHPを回復させたりなど
スキルの効果をバトラーに与えることができるイベントのことです。
シューティングゲームでプレイヤーや敵キャラが発射した弾がスキルオブジェクトと考えると
イメージがつきやすいかと思います。
スキルオブジェクトがバトラーに衝突した場合、スキルで設定した効果が衝突したバトラーに適用されます。
なお、スキルオブジェクトの当たり判定についてはデフォルトではスキルオブジェクトとした
イベントのサイズがそのまま当たり判定となりますが、以下の「■ 当たり判定の設定」
の手順によって自由に当たり判定をカスタマイズすることが可能です。

「スキル発動」を実行しなかった場合、MP/TPの消費は行われません。これを利用して
スキルアクションのコモンイベント実行時にスキル発動条件が成立(例えば近くに敵キャラがいるか等)しなかった場合は
スキルを実行しないといったようなことも実現可能です。

※注意: スキル発動を行わずにスキルオブジェクト生成を行うことはできません。行った場合はエラーが表示されます。

■ アクションコモンイベント内で使用可能なコモンイベント変数
スキル使用時に実行されるコモンイベントでは「ユーザー種別格納コモンイベント変数」と
「ユーザーイベントID格納コモンイベント変数」を使用することができます。

ユーザー種別格納コモンイベント変数にはアクションコモンイベントを実行したユーザーとなる
キャラクターの種別が自動的に格納されます。

ユーザーイベントID格納コモンイベント変数にはアクションコモンイベントを実行したユーザーとなる
キャラクターがイベントだった場合にイベントIDが自動的に格納されます。

この2つを組み合わせることで各種プラグインコマンドのキャラクター指定引数にて
スキルを使用したキャラクターを指定することができるようになります。

※ これらの変数は必ずコモンイベント変数としてください。

■ アクションコモンイベントにコモンイベント変数/スイッチの値を渡す
スキルのメモ欄に以下のように記述することで、指定したアクションコモンイベント実行時に
予め値を設定しておくことが可能です。
・コモンイベント変数を設定する場合
<set-var 変数ID, 値>
(例) ID=10の変数に値100を設定する
<set-var 10, 100>

・コモンイベントスイッチを設定する場合
<set-sw スイッチID, 値>
(例) ID=10のスイッチをONに設定する
<set-sw 10>

※ これらの変数/スイッチは必ずコモンイベント変数またはコモンイベントスイッチとしてください。
※ 本機能はARPG_Core v1.4.0より追加されました。

■ スキルオブジェクトとして生成したイベント内で使用可能なセルフ変数
プラグインコマンド「スキルオブジェクト生成」によって生成されたイベントでは
セルフ変数「スキルオブジェクトユーザー種別格納セルフ変数」と
「スキルオブジェクトユーザーイベントID格納セルフ変数」を使用することができます。

スキルオブジェクトユーザー種別格納セルフ変数にはスキルオブジェクト生成を実行した
ユーザーとなるキャラクターの種別が格納されます。

スキルオブジェクトユーザーイベントID格納セルフ変数にはスキルオブジェクト生成を実行した
ユーザーとなるキャラクターがイベントだった場合にイベントIDが格納されます。

※ これらの変数は必ずセルフイベント変数としてください。

■ ダメージを受けた時に使用中のスキルをキャンセルする
プラグインコマンド「ダメージスキルキャンセル有効/無効切り替え」を有効に設定すると、
ダメージを受けた時にスキルがキャンセルされ、スキルコモンイベントを強制終了します。

また、プラグインコマンド「スキル発動」で詠唱コモンイベントIDを指定すると、
スキル発動までそのコモンイベントを実行し、その間はダメージによるスキルキャンセルが有効になります。
「ダメージスキルキャンセル有効/無効切り替え」でも同様のことは実現できますが、
スキル詠唱が目的の場合はこちらを利用した方がシンプルです。

※スキルキャンセルとする最大HPダメージ比率はプラグインコマンド「バトラーARPGパラメータ設定」で
「スキルキャンセルダメージレート」を設定することによって変更可能です。
設定しなかった場合は1ダメージでも受けるとスキルキャンセルとなります。

■ スキル完了、またはキャンセル時の移動速度の差し戻し
スキルを発動したとき、移動速度などのデータが保持されます。
保持されたデータはスキル完了、またはキャンセル時に復元されます。
この機能を使用することで例えば攻撃モーションのキャンセル時などに
移動速度などを元に戻すことを意識する必要がなくなります。

スキル発動時に保持されるデータは以下の通りとなります。
・移動速度
・キャラクターの画像およびインデックス
・向き固定有無

※ 本機能はARPG_Core v1.4.0より追加されました。

■ スキルオブジェクトの攻撃角度
スキルオブジェクトに対してプラグインコマンド「攻撃角度指定」を実行することで
スキルオブジェクトに攻撃角度を設定することが可能です。
ここで設定した攻撃角度はガード時にスキルオブジェクトの方を向いているかの
判定を行う用途に使用されます。

また、ここで設定された値はダメージを受けた時に実行されたコモンイベント内で
コモンイベント変数「ダメージ角度格納コモン変数」を読みだすことで取得することが可能です。
これをプラグインコマンド「キャラクター吹き飛ばし」と組み合わせることで
ダメージを受けた方向にキャラクターを吹き飛ばすといったことが実現可能です。

■ スキルオブジェクトの位置と使用者の移動を連動させる
スキルオブジェクトに対してプラグインコマンド「スキルオブジェクト使用者位置同期」を実行することで
スキルオブジェクトの位置と使用者の移動を連動させることができます。
この機能を使用することで例えばダッシュしながら攻撃するといったことも可能になります。

■ スキル効果の適用
スキル発動後、プラグインコマンド「スキル効果適用」を実行すると、
該当のスキルの効果を使用者に適用することができます。
※ スキルのダメージのみが適用されます。使用効果は適用されません。

また、プラグインコマンド「スキル効果適用テスト」を実行した場合、
スキル効果の適用が可能であるかを事前にチェックすることができます。
この機能を使うことで例えばHP満タンの場合は回復アイテムは
使用できないといったことが実現可能です。

■ スキル発動時のスキル名表示
スキルのメモ欄に以下のように記載することでスキル発動時に
ポップアップウィンドウを表示することができます。
この場合、スキルの"メッセージ"で設定したテキストが表示されます。
<showSkillName>

■ ダメージを受けた時の無敵時間の設定
スキルのメモ欄に以下のように記載することでスキルによる
ダメージを受けた時の無敵時間を設定することができます。
<noDamageFrame: 無敵時間>

例: 無敵時間を60フレームに設定する場合
<noDamageFrame: 60>

※ この設定を省略した場合、無敵時間は30フレームになります。

■ スキル使用後の攻撃禁止時間の設定
スキルのメモ欄に以下のように記載することでスキル使用後の
攻撃禁止時間を設定することができます。
<noAttackFrame: 攻撃禁止時間>

例: 攻撃禁止時間を120フレームに設定する場合
<noAttackFrame: 120>

※ この設定を省略した場合、攻撃禁止時間は60フレームになります。

■ スキル発動時の慣性移動キャンセルの指定
スキルのメモ欄に以下のように記載することでスキル発動時に
慣性移動をキャンセルすることができます。
<cancelAcceleration: true>

以下のように設定した場合はスキル発動後もそのまま慣性移動を行います。
<cancelAcceleration: false>

※ この設定を省略した場合、慣性移動キャンセルは有効になります。

■ スキル発動時の移動禁止の指定
スキルのメモ欄に以下のように記載することでスキル発動時に
移動を禁止することができます。
<disableMove: true>

以下のように設定した場合はスキル発動後もそのまま慣性移動を行います。
<disableMove: false>

※ この設定を省略した場合、移動禁止は有効になります。
※ 禁止するのはキーまたはタッチによるプレイヤー移動および自律移動のみとなります。
   イベントコマンドからの移動は禁止されません。

■ キャラクター衝突時のダメージ判定用スキルの上書き
スキルのメモ欄に以下のように記載することでスキル使用中に
敵と衝突した場合に敵にダメージを与えるスキルを使用したもので上書きすることができます。
<overwriteCollideAttack>

なお、上書きした場合はスキル終了時に自動的に元の設定に戻ります。


[フィールドオブジェクト関連]
■ フィールドオブジェクト
フィールドオブジェクトとはプレイヤーでもエネミーでもないが当たり判定が設定可能な
オブジェクトのことを指します。剣で破壊可能な草や、矢が当たるとONになるスイッチなどを
想定しています。
フィールドオブジェクトの当たり判定は「ダメージ判定」または「カスタム判定」を設定することができます。
当たり判定判定の詳細については「■ 当たり判定の設定」を参照してください。

■ フィールドオブジェクトのダメージ処理
フィールドオブジェクトに「ダメージ判定」を設定すると、攻撃判定が接触したときに
「フィールドオブジェクトダメージコモンイベントID」で設定したコモンイベントが呼び出されます。

※ フィールドオブジェクトはHPを持たないため、ダメージ処理で行うのはコモンイベントの呼び出しのみです。
   この処理は主に剣攻撃が草に当たった時に草を破壊する、といった用途を想定しています。


[当たり判定関連]
■ 当たり判定の設定
プラグインコマンド「当たり判定設定」で当たり判定の設定を行うことができます。
当たり判定は以下の種類があります。
攻撃判定: この判定が「ダメージ判定」と接触した場合、ダメージ判定の設定者にダメージを与えます。
ダメージ判定: この判定が「攻撃判定」と接触した場合、攻撃判定の設定者からダメージを受けます。
カスタム判定: ユーザーが独自に定義可能な当たり判定です。ここで設定した当たり判定は
             プラグインコマンド「当たり判定チェック」でチェックすることができます。

当たり判定は以下のキャラクターに対して設定することが可能です。
それ以外のキャラクターに対して当たり判定を設定するとエラーになります。
・プレイヤー(全ての当たり判定が設定可能)
・エネミー(全ての当たり判定が設定可能)
・フィールドオブジェクト(ダメージ判定/カスタム判定のみ設定可能)
・スキルオブジェクト(攻撃判定/カスタム判定のみ設定可能)

※ プレイヤーの当たり判定はプラグインパラメータ「プレイヤー当たり判定設定」で行えます。

■ プラグインコマンドによる当たり判定チェック
攻撃判定とダメージ判定に応じたダメージ処理はプラグイン側で自動的に行われますが、
プラグインコマンド「当たり判定チェック」によって
好きなタイミングで当たり判定のチェックを行うことが可能です。

■ 当たり判定の可視化
プラグインパラメータ「ヒットボックス共通設定/ヒットボックス可視化切り替え」で指定した
スイッチをONにすると、ヒットボックスが可視化されます。

また、プラグインパラメータ「ヒットボックス可視化切り替えキー」で
設定したキー(デフォルトではF6)を押すと、自動的にヒットボックスの可視化状態を切り替えることが可能です。
なお、この機能はテストプレイ中のみ有効です。
※ スイッチの設定でヒットボックスを可視化した場合はテストプレイでなくても可視化可能です。


[コンボ攻撃機能]
プラグインパラメータ「アクションコンボ設定」を設定することで、コンボ攻撃を簡単に作成することが可能です。
これを設定すると「最小コンボ可能時間」～「最大コンボ可能時間」以内に「派生元スキルID」で
指定されたスキルが実行された場合、そのスキルを「派生先スキルID」で指定したものに
上書きしたうえで実行することが可能です。
また、コンボ先の設定が存在していた場合、noAttackFrameで設定した攻撃禁止時間は無視されて
最小コンボ可能時間によって攻撃可能有無の判定が行われます。
※ 本機能はARPG_Core v1.4.0より追加されました。


[その他]
■ 時間経過で解消されるステートの設定
ARPGでは時間経過でステートを解消したい場面も多くあるかと思いますので、
そのための機能を用意しています。
ステートのメモ欄で以下の記載をすることで指定したフレーム数が経過したタイミングで
ステートを解消することができるようになります。
<duration: フレーム数>

例えば10秒後にステートを解消する場合は以下のように設定します。(1秒=60フレーム)
<duration: 60>

この設定だけではステートの重ね掛けを行った場合でも残りフレーム数は更新されません。
ステートの重ね掛けで残りフレーム数を更新する場合、以下の内容をメモ欄に記載する必要があります。
<overWriteDuration>

■ 武器ごとのスキル設定
武器の種類に応じて通常攻撃時のスキルを切り替えることが可能です。
武器のメモ欄に以下の記載をすることで指定したスキルを実行します。
<skill: スキル名>

※ 二刀流を設定した場合、最初に装備している武器の設定のみが反映されます。

■ 透明オブジェクト発射
透明なオブジェクトを発射し、当たり判定チェックを行うことができます。
例えば前方に敵がいるかをチェックするなどの用途で使用することが可能です。
透明オブジェクトの衝突対象については「プライオリティが通常キャラと同じに設定されたイベント」
と同じになります。

※注意
透明オブジェクトを生成した位置にすでにキャラクターがいた場合、
透明オブジェクトはそのキャラクターをすり抜け対象にします。

■ ターゲット選択機能
プラグインコマンド「ターゲット選択」を実行することで
ゲーム上でカーソルによるプレイヤーまたはエネミーの選択が可能です。
これによって例えば選択した敵キャラに向けて弾を発射するといったことが
可能になります。

また、ウェイトをONにした場合は選択中は時間を停止することができ、
OFFにした場合はリアルタイムで選択することができます。

キャンセル可能をONにするとターゲット選択中にキャンセルボタンを押した場合、
ターゲット選択をキャンセルすることが可能です。
この場合、選択結果格納スイッチに格納される結果はOFFになります。

■ イベントの画面内判定
プラグインパラメータ「キャラクター画面内判定」を実行することで
指定したキャラクターが画面内にいるかを判定することができます。

■ ダメージを受けた時の属性の判定
ダメージを受けた時に実行されるコモンイベント内でプラグインコマンド「ダメージ属性チェック」を
実行することで、どの属性によってダメージを受けたかを判定することができます。
※注意: 通常攻撃は属性として判定することはできません。

■ 攻撃時の属性を増やす
通常、スキルに付与可能な属性は1つのみですが、メモ欄に以下のように記載することで
属性を増やすことが可能です。この設定は1つのメモ欄内で複数使用することが可能です。
<damageElement: 属性名>

例: 炎と氷の属性を追加する場合
<damageElement: 炎>
<damageElement: 氷>

■ キャラクターのウェイト
プラグインコマンド「キャラクターアクションウェイト」を実行することで、キャラクターのイベントを一定時間
停止することができます。イベントコマンドのウェイトとの違いは、ウェイトは並列移動から実行した場合、自律移動を
行いますが、キャラクターアクションウェイトでは自律移動も停止させるという違いがあります。
そのため、ダメージを受けた場合の硬直などでウェイトが必要な場合には本コマンドを使用することで対応できます。

■ キャラクターが移動したかをチェックする方法について
キャラクターの移動チェックについては、プラグインコマンド
「キャラクターフレーム内移動有無チェック」によってチェック可能です。
このコマンドを実行するとキャラクターが次のフレームで更新されるまでの間に1度でも移動していた場合、
指定したスイッチがONになります。また、そのフレーム内で移動したかのフラグについては次のフレームで対象の
キャラクターが更新されるタイミングでクリアされます。

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


@command ChangeARPGMode
@text ARPGモード切り替え
@desc ARPGモードの有効/無効を切り替えます。

@arg ARPGMode
@text ARPGモード
@type boolean
@default true
@desc 切り替え先のARPGモードを指定します。


@command MakeDynamicEvent
@text 動的オブジェクト生成
@desc 動的オブジェクトを生成します。

@arg SrcMapId
@type number
@text 生成元マップID
@default 1
@desc 生成元マップIDを指定します。

@arg SrcEventIdOrName
@type string
@text 生成元イベントID or イベント名
@default 0
@desc 生成元イベントIDまたはイベント名を指定します。

@arg X
@type number
@text X座標
@default 0
@desc イベントを生成するX座標を指定します。

@arg XByVariable
@type variable
@text X座標(変数指定)
@default 0
@desc イベントを生成するX座標を変数で指定します。直接X値を設定した場合は本パラメータは0を指定してください。

@arg Y
@type number
@text Y座標
@default 0
@desc イベントを生成するY座標を指定します。

@arg YByVariable
@type variable
@text Y座標(変数指定)
@default 0
@desc イベントを生成するY座標を変数で指定します。直接Y値を設定した場合は本パラメータは0を指定してください。

@arg MadeDynamicEventId
@text 生成動的イベントID格納変数
@type variable
@default 0
@desc
生成した動的イベントのIDを格納する変数IDを指定します。


@command GetCharacterFloatPosition
@text キャラクター小数座標取得
@desc キャラクターの小数座標を取得します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg LeftUpOrCenter
@text 左上 or 中心
@type select
@option 左上
@value leftup
@option 中心
@value center
@default leftup
@desc キャラクターの左上座標または中心座標のどちらを取得するかを選択します。

@arg StoreFloatXVariableId
@text 小数X座標格納変数ID
@type variable
@default 0
@desc 取得した小数X座標を格納する変数IDを指定します。

@arg StoreFloatYVariableId
@text 小数Y座標格納変数ID
@type variable
@default 0
@desc 取得した小数Y座標を格納する変数IDを指定します。


@command CalcDeg
@text キャラクター間角度取得
@desc 主体キャラクターから見た対象キャラクターの角度を取得します。

@arg SubjectCharacterSpecification
@text 主体キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 主体となるキャラクターを指定します。

@arg TargetCharacterSpecification
@text 対象キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg StoreDegreeVariableId
@text 角度格納変数ID
@type variable
@default 0
@desc 取得した角度を格納する変数IDを指定します。


@command CalcFar
@text キャラクター間距離取得
@desc 主体キャラクターと対象キャラクターとの距離を取得します。

@arg SubjectCharacterSpecification
@text 主体キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 主体となるキャラクターを指定します。

@arg TargetCharacterSpecification
@text 対象キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg StoreFarVariableId
@text 距離格納変数ID
@type variable
@default 0
@desc 取得した距離を格納する変数IDを指定します。


@command CheckInTheScreen
@text キャラクター画面内判定
@desc キャラクターが画面内にいるかを判定します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg XMargin
@text X軸マージン
@type number
@decimals 2
@default 2
@desc X軸の画面外マージン幅を指定します。単位はマス数です。

@arg YMargin
@text Y軸マージン
@type number
@decimals 2
@default 2
@desc Y軸の画面外マージン幅を指定します。単位はマス数です。

@arg StoreResultSwitchId
@text 結果格納スイッチID
@type switch
@default 1
@desc 画面内にいる場合にONを、そうでない場合にOFFを設定するスイッチIDを指定します。


@command CheckMoved
@text キャラクター移動有無チェック
@desc キャラクターがそのフレーム内に移動したかをチェックします。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg StoreResultSwitchId
@text 結果格納スイッチID
@type switch
@default 1
@desc 移動した場合にONを、そうでない場合にOFFを設定するスイッチIDを指定します。


@command TransparentObjectCast
@text 透明オブジェクト発射
@desc 透明オブジェクトを発射し、オブジェクトに衝突するかをチェックします。

@arg TransparentObjectPosition
@type struct<TransparentObjectPosition>
@text 位置指定
@desc 透明オブジェクトの生成位置を指定します。

@arg Degree
@text 角度
@type number
@decimals 2
@default 0
@desc 透明オブジェクトの発射角度を指定します。

@arg DegreeByVariable
@text 角度(変数指定)
@type variable
@default 0
@desc 透明オブジェクトの発射角度を変数で指定します。

@arg Far
@text 距離
@type number
@decimals 2
@default 0
@desc 透明オブジェクトの発射距離を指定します。0を指定すると無限になります。

@arg FarByVariable
@text 距離(変数指定)
@type variable
@default 0
@desc 透明オブジェクトの発射距離を変数で指定します。

@arg Width
@text 横幅
@type number
@decimals 2
@default 1
@desc 透明オブジェクトの横幅を指定します。

@arg Height
@text 縦幅
@type number
@decimals 2
@default 1
@desc 透明オブジェクトの縦幅を指定します。

@arg CollisionResultSwitchId
@text 衝突結果格納スイッチID
@type switch
@default 1
@desc 衝突した場合にONを、そうでない場合にOFFを設定するスイッチIDを指定します。

@arg CollidedXVariableId
@text 衝突X座標格納変数ID
@type variable
@default 0
@desc 衝突が発生した地点のX座標を格納する変数IDを指定します。

@arg CollidedYVariableId
@text 衝突X座標格納変数ID
@type variable
@default 0
@desc 衝突が発生した地点のX座標を格納する変数IDを指定します。


@command SetupEnemy
@text エネミー設定
@desc イベントのエネミー設定を行います。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg EnemyId
@text エネミーID
@type enemy
@default 1
@desc エネミーIDを指定します。

@arg CollideAttackSkillId
@text 衝突攻撃スキルID
@type skill
@default 0
@desc
エネミーがアクターに衝突したときにダメージ計算を行うスキルIDを指定します。

@arg DamageCommonEventId
@text エネミーダメージコモンイベントID
@type common_event
@default 0
@desc
エネミーがダメージを受けたときに実行するコモンイベントを指定します。

@arg DefeatEnemyCommonEventId
@text 敵撃破コモンイベントID
@type common_event
@default 0
@desc
敵撃破時に実行するコモンイベントIDを指定します。

@arg HpGauge
@text HPゲージ
@type select
@option なし
@value none
@option ノーマル
@value normal
@option ボス
@value boss
@default normal
@desc HPゲージの表示を設定します。



@command ChangeHpGaugeVisible
@text エネミーHPゲージ表示切り替え
@desc エネミーのHPゲージ表示/非表示を切り替えます。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg ShowOrHide
@text 表示/非表示
@type boolean
@on 表示
@off 非表示
@default true
@desc 表示または非表示を選択します。


@command SetupFieldObject
@text フィールドオブジェクト設定
@desc イベントのフィールドオブジェクト設定を行います。

@arg DamageCommonEventId
@text フィールドオブジェクトダメージコモンイベントID
@type common_event
@default 0
@desc
フィールドオブジェクトがダメージを受けたときに実行するコモンイベントを指定します。


@command UseSkill
@text スキル使用
@desc スキルを使用します。

@arg SkillId
@type skill
@text スキルID
@default 1
@desc 使用するスキルのIDを指定します。名前指定または変数指定を行った場合、そちらが優先されます。

@arg SkillByName
@type string
@text スキル(名前指定)
@desc 使用するスキルの名前を指定します。名前指定を使用しない場合は空欄にしてください。

@arg SkillIdByVariable
@type variable
@text スキルID(変数指定)
@default 0
@desc 使用するスキルのIDを変数で指定します。変数指定を使用しない場合は0にしてください。


@command UseItem
@text アイテム使用
@desc アイテムを使用します。

@arg ItemId
@type item
@text アイテムID
@default 1
@desc 使用するアイテムのIDを指定します。名前指定または変数指定を行った場合、そちらが優先されます。

@arg ItemByName
@type string
@text アイテム(名前指定)
@desc 使用するアイテムの名前を指定します。名前指定を使用しない場合は空欄にしてください。

@arg ItemIdByVariable
@type variable
@text アイテムID(変数指定)
@default 0
@desc 使用するアイテムのIDを変数で指定します。変数指定を使用しない場合は0にしてください。


@command SkillActivation
@text スキル発動
@desc スキルを発動します。本コマンドは必ずスキルのアクションコモンイベント内で呼び出してください。

@arg ChantCommonEventId
@type common_event
@text 詠唱コモンイベントID
@default 0
@desc 詠唱処理を実行するコモンイベントのIDを指定します。


@command ChangeSkillCancelWhenDamageEnableOrDisable
@text ダメージスキルキャンセル有効/無効切り替え
@desc ダメージによるスキルキャンセル有効/無効を切り替えます。本コマンドは必ずスキルのアクションコモンイベント内で呼び出してください。

@arg EnableOrDisable
@text 有効/無効
@type boolean
@on 有効
@off 無効
@default true
@desc
有効または無効を選択します。


@command TestApplySkillEffect
@text スキル効果適用テスト
@desc 使用者にスキル効果が適用可能であるかをテストし、結果をスイッチに設定します。

@arg IsSkillSpecification
@text スキル指定有無
@type boolean
@default false
@desc ONを指定すると対象となるスキルを指定します。指定しなかった場合、発動したスキルが適用されます。

@arg SkillSpecification
@text スキル指定
@type struct<SkillSpecification>
@default {"SkillOrItem":"skill","SkillId":"1","SkillByName":"","SkillIdByVariable":"0","ItemId":"1","ItemByName":"","ItemIdByVariable":"0"}
@desc スキル指定有無をOnにした場合に対象となるスキルを指定します。

@arg StoreResultSwitchId
@text 結果格納スイッチID
@type switch
@default 1
@desc 使用可能な場合にONを、そうでない場合にOFFを設定するスイッチIDを指定します。


@command ApplySkillEffect
@text スキル効果適用
@desc 使用者にスキル効果を適用します。本コマンドは必ずスキルのアクションコモンイベント内で「スキル発動」の後に呼び出してください。

@arg IsSkillSpecification
@text スキル指定有無
@type boolean
@default false
@desc ONを指定すると対象となるスキルを指定します。指定しなかった場合、発動したスキルが適用されます。

@arg SkillSpecification
@text スキル指定
@type struct<SkillSpecification>
@default {"SkillOrItem":"skill","SkillId":"1","SkillByName":"","SkillIdByVariable":"0","ItemId":"1","ItemByName":"","ItemIdByVariable":"0"}
@desc スキル指定有無をOnにした場合に対象となるスキルを指定します。


@command MakeSkillObject
@text スキルオブジェクト生成
@desc スキルオブジェクトを生成します。

@arg SrcMapId
@type number
@text 生成元マップID
@default 1
@desc 生成元マップIDを指定します。

@arg SrcEventIdOrName
@text 生成元イベントID or イベント名
@type string
@default 0
@desc 生成元イベントIDまたはイベント名を指定します。

@arg SkillObjectPosition
@type struct<SkillObjectPosition>
@text 位置指定
@desc スキルオブジェクトの生成位置を指定します。

@arg IsSkillSpecification
@text スキル指定有無
@type boolean
@default false
@desc ONを指定すると対象となるスキルを指定します。指定しなかった場合、発動したスキルが適用されます。

@arg SkillSpecification
@text スキル指定
@type struct<SkillSpecification>
@default {"SkillOrItem":"skill","SkillId":"1","SkillByName":"","SkillIdByVariable":"0","ItemId":"1","ItemByName":"","ItemIdByVariable":"0"}
@desc スキル指定有無をOnにした場合に対象となるスキルを指定します。

@arg MadeDynamicEventId
@text 生成動的イベントID格納変数
@type variable
@default 0
@desc
生成した動的イベントのIDを格納する変数IDを指定します。


@command SetAttackDegree
@text 攻撃角度指定
@desc スキルオブジェクトの攻撃角度を指定します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg AttackDegree
@type number
@text 攻撃角度
@default 0
@desc 攻撃角度を設定します。

@arg AttackDegreeByVariable
@type variable
@text 攻撃角度(変数指定)
@default 0
@desc 攻撃角度を変数で設定します。


@command SetUserPositionSynchronize
@text スキルオブジェクト使用者位置同期
@desc スキルオブジェクトの使用者位置同期の有無を指定します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg Synchronize
@type boolean
@text 同期
@on 有効
@off 無効
@default true
@desc 同期の有効/無効を指定します。


@command CheckDamageElement
@text ダメージ属性チェック
@desc ダメージを受けた属性をチェックします。本コマンドは必ず受ダメージ処理から呼び出してください。

@arg ElementName
@text 属性名
@type string
@desc チェック対象の属性名を指定します。

@arg StoreResultSwitchId
@text 結果格納スイッチID
@type switch
@default 1
@desc 指定の属性だった場合にONを、そうでない場合にOFFを設定するスイッチIDを指定します。


@command SetHitBox
@text ヒットボックス設定
@desc ヒットボックスの設定を行います。同じタイプに対して再度ヒットボックス設定を行った場合、既存の設定を上書きします。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg HitBoxType
@text ヒットボックスタイプ
@type select
@option 攻撃
@value attack
@option ダメージ
@value damage
@option カスタム
@value custom
@default attack
@desc ヒットボックスタイプを設定します。

@arg CustomHitBoxTag
@text カスタムヒットボックスタグ
@type string
@desc ヒットボックスタイプをカスタムにした場合のタグを指定します。

@arg HitBoxList
@type struct<Box>[]
@text ヒットボックスリスト
@default []
@desc ヒットボックスを設定します。


@command ChangeHitBoxEnableOrDisable
@text ヒットボックス有効/無効切り替え
@desc ヒットボックスの有効/無効切り替えを行います。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg HitBoxType
@text ヒットボックスタイプ
@type select
@option 攻撃
@value attack
@option ダメージ
@value damage
@option カスタム
@value custom
@default attack
@desc ヒットボックスタイプを設定します。

@arg CustomHitBoxTag
@text カスタムヒットボックスタグ
@type string
@desc ヒットボックスタイプをカスタムにした場合のタグを指定します。

@arg Enabled
@text 有効化
@type boolean
@desc trueを設定するとヒットボックスを有効化します。


@command HitCheck
@text 当たり判定チェック
@desc ヒットボックスによる当たり判定チェックを行います。

@arg SubjectCharacterSpecification
@text 主体キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 主体となるキャラクターを指定します。

@arg SubjectHitBoxType
@text 主体ヒットボックスタイプ
@type select
@option 攻撃
@value attack
@option ダメージ
@value damage
@option カスタム
@value custom
@default attack
@desc ヒットボックスタイプを設定します。

@arg SubjectCustomHitBoxTag
@text 主体カスタムヒットボックタグ
@type string
@desc カスタムヒットボックタグを設定します。

@arg IsTargetSpecification
@text 対象指定有無
@type boolean
@default false
@desc ONを指定すると対象となるイベントを指定します。

@arg TargetCharacterSpecification
@text 対象キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象指定有無がONの場合に対象となるキャラクターを指定します。

@arg TargetHitBoxType
@text 対象ヒットボックスタイプ
@type select
@option 攻撃
@value attack
@option ダメージ
@value damage
@option カスタム
@value custom
@default attack
@desc ヒットボックスタイプを設定します。

@arg TargetCustomHitBoxTag
@text 対象カスタムヒットボックタグ
@type string
@desc カスタムヒットボックタグを設定します。

@arg StoreResultSwitchId
@text 結果格納スイッチID
@type switch
@default 1
@desc ヒットしていた場合にONを、そうでない場合にOFFを設定するスイッチIDを指定します。


@command GetBattlerStatus
@text バトラーステータス取得
@desc 指定したバトラーのステータスを取得します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg StatusType
@type select
@option mhp
@option mmp
@option hp
@option mp
@option tp
@option atk
@option mat
@option mdf
@option agi
@option luk
@option hit
@option eva
@option cri
@option cev
@option mev
@option mrf
@option cnt
@option hrg
@option mrg
@option trg
@option tgr
@option grd
@option rec
@option pha
@option mcr
@option tcr
@option pdr
@option mdr
@option fdr
@option exr
@text ステータスタイプ
@default mhp
@desc ステータスタイプを指定します。

@arg DestVariableId
@type variable
@text 格納先変数
@default 1
@desc 取得したステータス値の格納先変数を指定します。


@command SetBattlerStatus
@text バトラーステータス設定
@desc 指定したバトラーのステータスを設定します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg StatusType
@type select
@option hp
@option mp
@option tp
@text ステータスタイプ
@default mhp
@desc ステータスタイプを指定します。

@arg Value
@type number
@text 値
@default 0
@desc 設定するステータス値を指定します。

@arg ValueByVariable
@type variable
@text 値(変数指定)
@default 0
@desc 設定するステータス値が格納された変数IDを指定します。


@command GetBattlerARPGParameter
@text バトラーARPGパラメータ取得
@desc 指定したバトラーのARPG専用パラメータを取得します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg ARPGParameterType
@type select
@option スキルキャンセルダメージレート
@value skillCancelDamageRate
@option ジャストガードフレーム
@value justGuardFrame
@text ARPGパラメータタイプ
@default skillCancelDamageRate
@desc ARPGパラメータタイプを指定します。

@arg DestVariableId
@type variable
@text 格納先変数
@default 1
@desc 取得したステータス値の格納先変数を指定します。


@command SetBattlerARPGParameter
@text バトラーARPGパラメータ設定
@desc 指定したバトラーのARPG専用パラメータを設定します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg ARPGParameterType
@type select
@option スキルキャンセルダメージレート
@value skillCancelDamageRate
@option ジャストガードフレーム
@value justGuardFrame
@text ARPGパラメータタイプ
@default skillCancelDamageRate
@desc ARPGパラメータタイプを指定します。
@arg Value
@type number
@text 値
@default 0
@decimals 2
@desc 設定するステータス値を指定します。

@arg ValueByVariable
@type variable
@text 値(変数指定)
@default 0
@desc 設定するステータス値が格納された変数IDを指定します。


@command GetBattlerARPGFlag
@text バトラーARPGフラグ取得
@desc 指定したバトラーのARPG専用フラグを取得します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg ARPGFlagType
@type select
@option ノーダメージフラグ
@value noDamageFlag
@option 攻撃禁止フラグ
@value noAttackFlag
@text ARPGフラグタイプ
@default noDamageFlag
@desc ARPGフラグタイプを指定します。

@arg DestSwitchId
@type switch
@text 格納先スイッチ
@default 1
@desc 取得したフラグ値の格納先スイッチを指定します。


@command SetBattlerARPGFlag
@text バトラーARPGフラグ設定
@desc 指定したバトラーのARPG専用フラグを設定します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg ARPGFlagType
@type select
@option ノーダメージフラグ
@value noDamageFlag
@option 攻撃禁止フラグ
@value noAttackFlag
@text ARPGフラグタイプ
@default noDamageFlag
@desc ARPGフラグタイプを指定します。

@arg Value
@type boolean
@text 値
@default true
@desc 設定するフラグ値を指定します。

@arg ValueBySwitch
@type switch
@text 値(スイッチ指定)
@default 0
@desc 設定するフラグ値が格納されたスイッチIDを指定します。


@command SetCheckMapValid
@text マップ有効範囲チェック有効/無効切り替え
@desc マップの有効範囲チェックの有効/無効の切り替えを行います。

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


@command CharacterBlowAway
@text キャラクター吹き飛ばし
@desc キャラクターを指定方向に吹き飛ばします。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg Degree
@text 角度
@type number
@default 0
@desc 吹き飛ばす角度を指定します。

@arg DegreeByVariable
@text 角度(変数指定)
@type variable
@default 0
@desc 吹き飛ばす角度を変数で指定します。

@arg InitialVelocity
@text 初速度
@type number
@decimals 2
@default 0.5
@desc 吹き飛ばす初速度を指定します。

@arg InitialVelocityByVariable
@text 初速度(変数指定)
@type variable
@default 0
@desc 吹き飛ばす初速度を変数で指定します。

@arg Duration
@text 間隔
@type number
@decimals 2
@default 10
@desc 吹き飛ばす間隔を指定します。

@arg DurationByVariable
@text 間隔(変数指定)
@type variable
@default 0
@desc 吹き飛ばす間隔を変数で指定します。

@arg Wait
@text ウェイト
@type boolean
@default true
@desc trueを指定すると、吹き飛ばし完了までウェイトします。


@command CharacterActionWait
@text キャラクターアクションウェイト
@desc キャラクターのアクションを一定時間ウェイトさせます。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 対象となるキャラクターを指定します。

@arg Duration
@text 間隔
@type number
@decimals 2
@default 10
@desc アクションウェイト間隔を指定します。

@arg DurationByVariable
@text 間隔(変数指定)
@type variable
@default 0
@desc アクションウェイト間隔を変数で指定します。


@command TargetSelect
@text ターゲット選択
@desc ターゲット選択を行います。

@arg SelectResultSwitchId
@text 選択結果格納スイッチID
@type switch
@default 0
@desc
ターゲットの選択に成功した場合ONが設定されるスイッチIDを指定します。

@arg SelectedTargetCharacterKindVariableId
@text 選択ターゲットキャラクター種別格納変数ID
@type variable
@default 0
@desc
選択したターゲットのキャラクター種別を格納する変数IDを指定します。

@arg SelectedTargetEventIdVariableId
@text 選択ターゲットイベントID格納変数ID
@type variable
@default 0
@desc
選択したターゲットのイベントIDを格納する変数IDを指定します。

@arg Wait
@text ウェイト
@type boolean
@default true
@desc
ONを設定した場合、ターゲット選択中はシーンを停止します。

@arg Cancelable
@text キャンセル可能
@type boolean
@default true
@desc
ONを設定した場合、ターゲット選択のキャンセルを有効にします。


@command SearchNearBattler
@text 近隣バトラー検索
@desc 対象者から最も近いバトラーを検索します。

@arg Target
@text ターゲット
@type select
@option 全バトラー
@value all
@option 敵キャラ
@value opponent
@option 味方キャラ
@value friend
@default all
@desc ターゲットを指定します。

@arg SubjectCharacterSpecification
@text 主体キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 主体となるキャラクターを指定します。

@arg StoreResultSwitchId
@text 結果格納スイッチID
@type switch
@default 1
@desc 敵キャラが見つかった場合にONを、そうでない場合にOFFを設定するスイッチIDを指定します。

@arg StoreCharacterKindVariableId
@text キャラクター種別格納変数ID
@type variable
@default 0
@desc 見つかったバトラーのキャラクター種別を格納する変数IDを指定します。

@arg StoreEventIdVariableId
@text イベントID格納変数ID
@type variable
@default 0
@desc 見つかったバトラーがイベントの場合にイベントIDを格納する変数IDを指定します。


@command SetPlayerGuardMode
@text プレイヤーガードモード設定
@desc プレイヤーのガードモードを設定します。

@arg GuardMode
@text ガードモード
@type boolean
@default true
@desc
ガードモードONまたはOFFを指定します。


@command ChangeControlActor
@text 操作アクター変更
@desc 操作アクターを変更します。本コマンドはキー入力によるアクター変更と同じ挙動となります。


@command ShowMessagePopup
@text メッセージポップアップ表示
@desc メッセージポップアップを表示します。

@arg Text
@text テキスト
@type string
@desc
ポップアップ表示を行うテキストを指定します。

@arg WindowWidth
@text 横幅
@type number
@default 640
@desc
ポップアップウィンドウの横幅を指定します。

@arg Time
@text 時間
@type number
@default 60
@desc
ポップアップの表示時間を指定します。


@param CopyEventSetting
@text コピーイベント共通設定
@type struct<CopyEventSetting>
@default {"CopyEventTag":"cp","DynamicEventSrcMapIds":"[]"}
@desc
コピーイベントの共通設定を行います。

@param BattlerSetting
@text バトラー共通設定
@type struct<BattlerSetting>
@default {"DamageDegCommonVariableId":"0","UserKindCommonVariableId":"0","UserEventIdCommonVariableId":"0","DamageKindCommonVariableId":"0","DamageTypeCommonVariableId":"0","DamageValueCommonVariableId":"0"}
@desc
バトラーの共通設定を行います。

@param ActorSetting
@text アクター共通設定
@type struct<ActorSetting>
@default {"NormalAttackSkillId":"0","DamageCommonEventId":"0","NormalGuardCommonEventId":"0","JustGuardCommonEventId":"0","StartGuardCommonEventId":"0","EndGuardCommonEventId":"0","JustGuardFrame":"10","ActorHitBox":"{\"AttackHitBoxList\":\"[]\",\"DamageHitBoxList\":\"[]\"}","GameOverCommonEventId":"0","LevelUpCommonEventId":"0"}
@desc
アクターの共通設定を行います。

@param EnemySetting
@text エネミー共通設定
@type struct<EnemySetting>
@default {"CollideAttackSkillId":"0","DamageCommonEventId":"0","DefeatEnemyCommonEventId":"0"}
@desc
エネミーの共通設定を行います。

@param SkillObjectSetting
@text スキルオブジェクト共通設定
@type struct<SkillObjectSetting>
@default {"SkillObjectUserKindSelfVariableId":"0","SkillObjectUserEventIdSelfVariableId":"0","CollisionDetectExSelfSwitchId":"0"}
@desc
スキルオブジェクトの共通設定を行います。

@param HitBoxSetting
@text ヒットボックス共通設定
@type struct<HitBoxSetting>
@default {"VisibleHitAreaSwitchId":"0","AttackHitBoxColor":"#ff0000aa","DamageHitBoxColor":"#0000ffaa","CustomHitBoxDefaultColor":"#00ff00aa","CustomHitBoxColorList":"[]"}
@desc
ヒットボックスの共通設定を行います。

@param ActionComboSetting
@text アクションコンボ設定
@type struct<ActionComboData>[]
@desc
アクションコンボの設定を行います。

@param EnemyHpGaugeSetting
@text エネミーHPゲージ設定
@type struct<EnemyHpGaugeSetting>
@default {"NormalEnemyHpGaugePosition":"up","NormalEnemyHpGaugeYOffset":"-8","NormalEnemyHpGaugeHeight":"6","NormalEnemyHpGaugeColor1":"#00aa00","NormalEnemyHpGaugeColor2":"#22ff22","BossEnemyHpGaugeLabel":"BOSS","BossEnemyHpGaugeYOffset":"16","BossEnemyHpGaugeWidth":"500","BossEnemyHpGaugeHeight":"12","BossEnemyHpGaugeColor1":"#00aa00","BossEnemyHpGaugeColor2":"#22ff22"}
@desc
エネミーのHPゲージ設定を行います。

@param KeySetting
@text キー入力設定
@type struct<KeySetting>
@default {"Cancel":"{\"KeyName\":\"escape\",\"KeySymbol\":\"\",\"KeyCode\":\"0\",\"ButtonIndex\":\"-1\"}","Menu":"{\"KeyName\":\"menu\",\"KeySymbol\":\"\",\"KeyCodes\":\"[]\",\"ButtonIndexes\":\"[\\\"3\\\"]\",\"KeyCode\":\"-1\",\"ButtonIndex\":\"-1\"}","ActorNormalAttack":"{\"KeyName\":\"ok\",\"KeySymbol\":\"\",\"KeyCodes\":\"[]\",\"ButtonIndexes\":\"[]\",\"KeyCode\":\"-1\",\"ButtonIndex\":\"-1\"}","ActorGuard":"{\"KeyName\":\"other\",\"KeySymbol\":\"A\",\"KeyCodes\":\"[\\\"65\\\"]\",\"ButtonIndexes\":\"[\\\"6\\\"]\",\"KeyCode\":\"-1\",\"ButtonIndex\":\"-1\"}","VisibleHitBox":"{\"KeyName\":\"other\",\"KeySymbol\":\"F6\",\"KeyCodes\":\"[\\\"117\\\"]\",\"ButtonIndexes\":\"[]\",\"KeyCode\":\"-1\",\"ButtonIndex\":\"-1\"}","ChangeControlActor":"{\"KeyName\":\"other\",\"KeySymbol\":\"S\",\"KeyCodes\":\"[\\\"83\\\"]\",\"ButtonIndexes\":\"[\\\"11\\\"]\",\"KeyCode\":\"-1\",\"ButtonIndex\":\"-1\"}"}
@desc
キー入力の各種設定を行います。

@param SESetting
@text SE設定
@type struct<SESetting>
@default {"ActorChange":"{\"FileName\":\"Decision5\",\"Volume\":\"90\",\"Pitch\":\"100\",\"Pan\":\"0\"}"}
@desc
SEの各種設定を行います。

@param EnableARPGSwitchId
@text ARPG有効化スイッチID
@type switch
@default 0
@desc
ARPGを有効化するスイッチIDを指定します。

@param UseDamagePopup
@text ダメージポップアップ使用
@type boolean
@default true
@desc
trueを設定すると攻撃によるダメージ発生時にダメージ値を表示します。

@param UseImageDamage
@text ダメージ画像使用
@type boolean
@default false
@desc
trueを設定するとsystem/Damage.pngの画像をダメージ表示に使用します。

@param UseImageTargetSelectCursor
@text ターゲット選択カーソル画像使用
@type boolean
@default false
@desc
trueを設定すると画像をターゲット選択カーソルに使用します。

@param TargetSelectCursorImageFileName
@text ターゲット選択カーソル画像ファイル名
@type file
@dir img
@desc
ターゲット選択カーソルの画像ファイル名を指定します。

@param EnableChangeControlActorSwitchId
@text 操作アクター変更許可スイッチID
@type switch
@default 0
@desc
操作アクターの変更を許可するスイッチIDを指定します。0を設定した場合は常に有効になります。

@param ErrorMessageLanguage
@text エラーメッセージ言語
@type select
@option 英語
@value en
@option 日本語
@value ja
@default ja
@desc
エラーメッセージの表示言語を指定します。
*/
/*!/*~struct~CopyEventSetting:ja
@param CopyEventTag
@text コピーイベントタグ
@type string
@default cp
@desc
コピーするイベントを判定するためのタグ名を指定します。

@param DynamicEventSrcMapIds
@text 動的イベント生成元マップID一覧
@type number[]
@default []
@desc
動的イベント生成元のマップIDの一覧を設定します。
*/
/*!/*~struct~BattlerSetting:ja
@param DamageDegCommonVariableId
@text ダメージ角度格納コモン変数
@type variable
@default 0
@desc
ダメージを受けた時の角度を格納するコモン変数を指定します。

@param UserKindCommonVariableId
@text ユーザー種別格納コモンイベント変数
@type variable
@default 0
@desc
バトラーでアクションコモンイベントを実行したときにユーザー種別(1: プレイヤー, 3: イベント)を格納する変数を指定します。

@param UserEventIdCommonVariableId
@text ユーザーイベントID格納コモンイベント変数
@type variable
@default 0
@desc
バトラーでアクションコモンイベントを実行したときにイベントIDを格納する変数を指定します。

@param DamageKindCommonVariableId
@text ダメージ種別コモン変数ID
@type variable
@default 0
@desc
ダメージを受けた時にダメージ種別が設定されるコモン変数を指定します。

@param DamageTypeCommonVariableId
@text ダメージタイプコモン変数ID
@type variable
@default 0
@desc
ダメージを受けた時にダメージタイプが設定されるコモン変数を指定します。

@param DamageValueCommonVariableId
@text ダメージ値コモン変数ID
@type variable
@default 0
@desc
ダメージを受けた時にダメージ値が設定されるコモン変数を指定します。
*/
/*!/*~struct~ActorSetting:ja
@param NormalAttackSkillId
@text 通常攻撃スキルID
@type skill
@default 0
@desc
通常攻撃時のスキルIDを指定します。

@param DamageCommonEventId
@text アクターダメージコモンイベントID
@type common_event
@default 0
@desc
アクターがダメージを受けたときに実行するコモンイベントを指定します。

@param DeadCommonEventId
@text アクター戦闘不能コモンイベントID
@type common_event
@default 0
@desc
アクターが戦闘不能になったときに実行するコモンイベントを指定します。

@param NormalGuardCommonEventId
@text アクター通常ガードコモンイベントID
@type common_event
@default 0
@desc
アクターが通常ガードしたときに実行するコモンイベントを指定します。

@param JustGuardCommonEventId
@text アクタージャストガードコモンイベントID
@type common_event
@default 0
@desc
アクターがジャストガードしたときに実行するコモンイベントを指定します。

@param StartGuardCommonEventId
@text アクターガード開始コモンイベントID
@type common_event
@default 0
@desc
アクターがガードを開始したときに実行するコモンイベントを指定します。

@param EndGuardCommonEventId
@text アクターガード終了コモンイベントID
@type common_event
@default 0
@desc
アクターがガードを終了したときに実行するコモンイベントを指定します。

@param JustGuardFrame
@text ジャストガードフレーム
@type number
@min 0
@default 10
@desc
ジャストガードの許容フレーム数を指定します。ジャストガードを使用しない場合は0を指定してください。

@param ActorHitBox
@text アクターヒットボックス
@type struct<ActorHitBox>
@default {"DamageHitBoxList":"[]"}
@desc アクターのヒットボックス設定を行います。

@param GameOverCommonEventId
@text ゲームオーバーコモンイベントID
@type common_event
@default 0
@desc
ゲームオーバー時に実行するコモンイベントIDを指定します。0を指定した場合はゲームオーバーシーンに移動します。

@param LevelUpCommonEventId
@text レベルアップコモンイベントID
@type common_event
@default 0
@desc
レベルアップしたときに実行するコモンイベントを指定します。
*/
/*!/*~struct~EnemySetting:ja
@param CollideAttackSkillId
@text 衝突攻撃スキルID
@type skill
@default 0
@desc
エネミーがアクターに衝突したときにダメージ計算を行うスキルIDを指定します。

@param DamageCommonEventId
@text エネミーダメージコモンイベントID
@type common_event
@default 0
@desc
エネミーがダメージを受けたときに実行するコモンイベントを指定します。

@param DefeatEnemyCommonEventId
@text 敵撃破コモンイベントID
@type common_event
@default 0
@desc
敵撃破時に実行するコモンイベントIDを指定します。
*/
/*!/*~struct~SkillObjectSetting:ja
@param SkillObjectUserKindSelfVariableId
@text スキルオブジェクトユーザー種別格納セルフ変数
@type variable
@default 0
@desc
スキルオブジェクトを生成したユーザーの種別を格納するセルフ変数を指定します。

@param SkillObjectUserEventIdSelfVariableId
@text スキルオブジェクトユーザーイベントID格納セルフ変数
@type variable
@default 0
@desc
スキルオブジェクトを生成したユーザーの種別がイベントの場合にイベントIDを格納するセルフ変数を指定します。

@param CollisionDetectExSelfSwitchId
@text 衝突検出フラグ格納拡張セルフスイッチ
@type switch
@default 0
@desc
スキルオブジェクトがターゲットに衝突したときにONを格納する拡張セルフスイッチを指定します。
*/
/*!/*~struct~HitBoxSetting:ja
@param VisibleHitAreaSwitchId
@text ヒットボックス可視化切り替えスイッチID
@type switch
@default 0
@desc
ヒットボックス可視化の有無を切り替えるスイッチIDを指定します。

@param AttackHitBoxColor
@text 攻撃判定ヒットボックスカラー
@type string
@default #ff0000aa
@desc
ヒットボックス可視化時の攻撃判定のカラーを指定します。

@param DamageHitBoxColor
@text ダメージ判定ヒットボックスカラー
@type string
@default #0000ffaa
@desc
ヒットボックス可視化時のダメージ判定のカラーを指定します。

@param CustomHitBoxDefaultColor
@text カスタムヒットボックスデフォルトカラー
@type string
@default #00ff00aa
@desc
ヒットボックス可視化時のカスタムヒットボックスのデフォルトカラーを指定します。

@param CustomHitBoxColorList
@text カスタムヒットボックスカラー一覧
@type string<CustomHitBoxColor>
@default []
@desc
ヒットボックス可視化時のカスタムヒットボックスのカラー一覧を指定します。
*/
/*!/*~struct~ActionComboData:ja
@param SkillId
@text スキルID
@type skill
@default 0
@desc
コンボ派生対象のスキルIDを指定します。

@param ActionComboDerivations
@text アクションコンボ派生一覧
@type struct<ActionComboDerivation>[]
@desc
アクションコンボの派生一覧を指定します。
*/
/*!/*~struct~ActionComboDerivation:ja
@param FromSkillId
@text 派生元スキルID
@type skill
@default 0
@desc
コンボ派生元のスキルIDを指定します。

@param DerivationSkillId
@text 派生先スキルID
@type skill
@default 0
@desc
コンボ派生先のスキルIDを指定します。コンボの最初のスキルに対しては0を指定してください。

@param MinComboFrame
@text 最小コンボ可能時間
@type number
@min 0
@default 30
@desc
コンボ攻撃が可能になるまでの時間をフレーム単位で指定します。

@param MaxComboFrame
@text 最大コンボ可能時間
@type number
@min 0
@default 60
@desc
コンボ攻撃の最大許容時間をフレーム単位で指定します。
*/
/*!/*~struct~EnemyHpGaugeSetting:ja
@param NormalEnemyHpGaugePosition
@text ノーマルエネミーHPゲージ位置
@type select
@option 上
@value up
@option 下
@value down
@default up
@desc ノーマルエネミーのHPゲージの表示位置を設定します。

@param NormalEnemyHpGaugeYOffset
@text ノーマルエネミーHPゲージY座標オフセット
@type number
@min -9999
@default -8
@desc ノーマルエネミーのHPゲージの表示Y座標オフセットを設定します。

@param NormalEnemyHpGaugeHeight
@text ノーマルエネミーHPゲージ縦幅
@type number
@min 1
@default 6
@desc ノーマルエネミーのHPゲージの縦幅を設定します。

@param NormalEnemyHpGaugeColor1
@text ノーマルエネミーHPゲージ色1
@type string
@default #00aa00
@desc ノーマルエネミーのHPゲージの色1を設定します。

@param NormalEnemyHpGaugeColor2
@text ノーマルエネミーHPゲージ色2
@type string
@default #22ff22
@desc ノーマルエネミーのHPゲージの色1を設定します。

@param BossEnemyHpGaugeLabel
@text ボスエネミーHPゲージラベル
@type string
@default BOSS
@desc ボスエネミーのHPゲージの横に表示するテキストを設定します。

@param BossEnemyHpGaugeYOffset
@text ボスエネミーHPゲージY座標オフセット
@type number
@min 1
@default 16
@desc ボスエネミーのHPゲージの表示Y座標オフセットを設定します。

@param BossEnemyHpGaugeWidth
@text ボスエネミーHPゲージ横幅
@type number
@min 1
@default 500
@desc ボスエネミーのHPゲージの横幅を設定します。

@param BossEnemyHpGaugeHeight
@text ボスエネミーHPゲージ縦幅
@type number
@min 1
@default 12
@desc ボスエネミーのHPゲージの縦幅を設定します。

@param BossEnemyHpGaugeColor1
@text ボスエネミーHPゲージ色1
@type string
@default #00aa00
@desc ボスエネミーのHPゲージの色1を設定します。

@param BossEnemyHpGaugeColor2
@text ボスエネミーHPゲージ色2
@type string
@default #22ff22
@desc ボスエネミーのHPゲージの色1を設定します。
*/
/*!/*~struct~KeySetting:ja
@param Cancel
@text キャンセルキー
@type struct<Key>
@default {"KeyName":"escape","KeySymbol":"","KeyCodes":"[]","ButtonIndexes":"[]","KeyCode":"0","ButtonIndex":"-1"}
@desc
キャンセルに使用するキーを指定します。

@param Menu
@text メニューキー
@type struct<Key>
@default {"KeyName":"menu","KeySymbol":"","KeyCodes":"[]","ButtonIndexes":"[\"3\"]","KeyCode":"-1","ButtonIndex":"-1"}
@desc
メニュー画面を開くキーを指定します。

@param ActorNormalAttack
@text アクター通常攻撃キー
@type struct<Key>
@default {"KeyName":"ok","KeySymbol":"","KeyCodes":"[]","ButtonIndexes":"[]","KeyCode":"-1","ButtonIndex":"-1"}
@desc
アクターが通常攻撃を行う時のキーを指定します。

@param ActorGuard
@text アクターガードキー
@type struct<Key>
@default {"KeyName":"other","KeySymbol":"A","KeyCodes":"[\"65\"]","ButtonIndexes":"[\"6\"]","KeyCode":"-1","ButtonIndex":"-1"}
@desc
アクターがガードを行う時のキーを指定します。

@param VisibleHitBox
@text ヒットボックス可視化切り替えキー
@type struct<Key>
@default {"KeyName":"other","KeySymbol":"F6","KeyCodes":"[\"117\"]","ButtonIndexes":"[]","KeyCode":"-1","ButtonIndex":"-1"}
@desc
ヒットボックス可視化有無の切り替えを行うキーを指定します。

@param ChangeControlActor
@text 操作アクター変更
@type struct<Key>
@default {"KeyName":"other","KeySymbol":"S","KeyCodes":"[\"83\"]","ButtonIndexes":"[\"11\"]","KeyCode":"-1","ButtonIndex":"-1"}
@desc
操作アクターの変更を行うキーを指定します。
*/
/*!/*~struct~SESetting:ja
@param ActorChange
@text アクターチェンジ
@type struct<SE>
@default {"FileName":"","Volume":"90","Pitch":"100","Pan":"0"}
@desc
アクターチェンジ時に再生するSEを指定します。
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
/*!/*~struct~Box:ja
@param X
@text X座標
@type number
@min -9999
@decimals 2
@default 0
@desc
X座標を指定します。

@param Y
@text Y座標
@type number
@min -9999
@decimals 2
@default 0
@desc
Y座標を指定します。

@param Width
@text 横幅
@type number
@min 0
@decimals 2
@default 1
@desc
横幅を指定します。

@param Height
@text 縦幅
@type number
@min 0
@decimals 2
@default 1
@desc
縦幅を指定します。
*/
/*!/*~struct~CustomHitBoxColor:ja
@param CustomHitBoxTag
@text カスタムヒットボックスタグ
@type string
@desc カスタムヒットボックスのタグを指定します。

@param Color
@text カラー
@type string
@default #00ff00aa
@desc
ヒットボックス可視化時のカスタムヒットボックスのカラーを指定します。
*/
/*!/*~struct~SkillObjectPosition:ja
@param Specification
@text 位置指定
@type select
@option 現在座標
@value current
@option 前方座標
@value forward
@option キャラクター座標
@value character
@option カスタム座標
@value custom
@default current
@desc
位置指定方法を選択します。

@param CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 位置指定でキャラクター座標を選択した場合の対象となるキャラクターを指定します。

@param CustomPosition
@text カスタム座標
@type struct<Position>
@desc
位置指定でカスタム座標を選択した場合の生成座標を指定します。
*/
/*!/*~struct~TransparentObjectPosition:ja
@param Specification
@text 位置指定
@type select
@option キャラクター座標
@value character
@option カスタム座標
@value custom
@default current
@desc
位置指定方法を選択します。

@param CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc 位置指定でキャラクター座標を選択した場合の対象となるキャラクターを指定します。

@param CustomPosition
@text カスタム座標
@type struct<Position>
@desc
位置指定でカスタム座標を選択した場合の生成座標を指定します。
*/
/*!/*~struct~Position:ja
@param X
@type number
@text X座標
@default 0
@desc イベントを生成するX座標を指定します。

@param XByVariable
@type variable
@text X座標(変数指定)
@default 0
@desc イベントを生成するX座標を変数で指定します。直接値を設定した場合は本パラメータは0を指定してください。

@param Y
@type number
@text Y座標
@default 0
@desc イベントを生成するY座標を指定します。

@param YByVariable
@type variable
@text Y座標(変数指定)
@default 0
@desc イベントを生成するY座標を変数で指定します。直接値を設定した場合は本パラメータは0を指定してください。
*/
/*!/*~struct~ActorHitBox:ja
@param DamageHitBoxList
@type struct<Box>[]
@text ダメージ判定ヒットボックスリスト
@default []
@desc ダメージ判定ヒットボックスを設定します。
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
/*!/*~struct~SkillSpecification:ja
@param SkillOrItem
@text スキル or アイテム
@type select
@option スキル
@value skill
@option アイテム
@value item
@default skill
@desc スキルまたはアイテムのどちらを指定するかを選択します。

@param SkillId
@type skill
@text スキルID
@default 1
@desc 使用するスキルのIDを指定します。名前指定または変数指定を行った場合、そちらが優先されます。

@param SkillByName
@type string
@text スキル(名前指定)
@desc 使用するスキルの名前を指定します。名前指定を使用しない場合は空欄にしてください。

@param SkillIdByVariable
@type variable
@text スキルID(変数指定)
@default 0
@desc 使用するスキルのIDを変数で指定します。変数指定を使用しない場合は0にしてください。

@param ItemId
@type item
@text アイテムID
@default 1
@desc 使用するアイテムのIDを指定します。名前指定または変数指定を行った場合、そちらが優先されます。

@param ItemByName
@type string
@text アイテム(名前指定)
@desc 使用するアイテムの名前を指定します。名前指定を使用しない場合は空欄にしてください。

@param ItemIdByVariable
@type variable
@text アイテムID(変数指定)
@default 0
@desc 使用するアイテムのIDを変数で指定します。変数指定を使用しない場合は0にしてください。
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

    // ts/ARPG_Core/ExportDotMoveSystem.ts
    simpleExport("DotMoveSystem", DotMoveSystem);

    // ts/ARPG_Core/ARPG_Config.ts
    var import_DotMoveSystem = __require("DotMoveSystem");

    // ts/CommonLibrary/Degree.ts
    var _Degree = class {
        get value() {
            return this._value;
        }
        static fromDirection(direction) {
            switch (direction) {
                case 8:
                    return _Degree.UP;
                case 9:
                    return _Degree.UP_RIGHT;
                case 6:
                    return _Degree.RIGHT;
                case 3:
                    return _Degree.RIGHT_DOWN;
                case 2:
                    return _Degree.DOWN;
                case 1:
                    return _Degree.DOWN_LEFT;
                case 4:
                    return _Degree.LEFT;
                case 7:
                    return _Degree.LEFT_UP;
                default:
                    throw new Error(`${direction} is not found`);
            }
        }
        static fromRad(rad) {
            return new _Degree(rad * 180 / Math.PI + 90);
        }
        constructor(...args) {
            this.initialize(...args);
        }
        initialize(value) {
            value %= 360;
            if (value < 0)
                value = 360 + value;
            this._value = value;
        }
        toRad() {
            return (this._value - 90) * Math.PI / 180;
        }
        toDirection8() {
            const t = Math.round(this._value / 45);
            if (t === 0 || t === 8) {
                return 8;
            } else if (t === 1) {
                return 9;
            } else if (t === 2) {
                return 6;
            } else if (t === 3) {
                return 3;
            } else if (t === 4) {
                return 2;
            } else if (t === 5) {
                return 1;
            } else if (t === 6) {
                return 4;
            } else if (t === 7) {
                return 7;
            } else {
                throw new Error(`${this._value} is not found`);
            }
        }
        toDirection4(lastDirection) {
            const t = Math.round(this._value / 45);
            if (t === 0 || t === 8) {
                return 8;
            } else if (t === 1) {
                if (lastDirection === 8)
                    return 8;
                return 6;
            } else if (t === 2) {
                return 6;
            } else if (t === 3) {
                if (lastDirection === 6)
                    return 6;
                return 2;
            } else if (t === 4) {
                return 2;
            } else if (t === 5) {
                if (lastDirection === 2)
                    return 2;
                return 4;
            } else if (t === 6) {
                return 4;
            } else if (t === 7) {
                if (lastDirection === 4)
                    return 4;
                return 8;
            } else {
                throw new Error(`${this._value} is not found`);
            }
        }
        isInRange(min, max) {
            const minVal = typeof min === "number" ? min : min.value;
            const maxVal = typeof max === "number" ? max : max.value;
            if (minVal <= maxVal) {
                return minVal <= this.value && this.value <= maxVal;
            } else {
                if (minVal <= this.value && this.value < 360)
                    return true;
                if (this.value <= maxVal)
                    return true;
                return false;
            }
        }
        add(degree) {
            if (typeof degree === "number") {
                return new _Degree(this.value + degree);
            } else {
                return new _Degree(this.value + degree.value);
            }
        }
        sub(degree) {
            if (typeof degree === "number") {
                return new _Degree(this.value - degree);
            } else {
                return new _Degree(this.value - degree.value);
            }
        }
    };
    var Degree = _Degree;
    Degree.UP = new _Degree(0);
    Degree.UP_RIGHT = new _Degree(45);
    Degree.RIGHT = new _Degree(90);
    Degree.RIGHT_DOWN = new _Degree(135);
    Degree.DOWN = new _Degree(180);
    Degree.DOWN_LEFT = new _Degree(225);
    Degree.LEFT = new _Degree(270);
    Degree.LEFT_UP = new _Degree(315);

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

    // ts/ARPG_Core/ARPG_Utils.ts
    var ARPG_Utils = class {
        static searchNearBattler(subjectCharacter, target) {
            if (!subjectCharacter.isBattler())
                throw new Error(`Subject character is not battler.`);
            const actorCharacters = this.allAliveActorCharacters();
            const enemyCharacters = this.allAliveEnemyCharacters();
            if (target === "opponent") {
                if (subjectCharacter.battler().isActor()) {
                    return this.searchNearCharacter(subjectCharacter, enemyCharacters);
                } else {
                    return this.searchNearCharacter(subjectCharacter, actorCharacters);
                }
            } else if (target === "friend") {
                if (subjectCharacter.battler().isActor()) {
                    return this.searchNearCharacter(subjectCharacter, actorCharacters);
                } else {
                    return this.searchNearCharacter(subjectCharacter, enemyCharacters);
                }
            } else {
                return this.searchNearCharacter(subjectCharacter, actorCharacters.concat(enemyCharacters));
            }
        }
        static searchNearCharacter(subjectCharacter, targetCharacters) {
            let minFar;
            let minFarCharacter;
            for (const targetCharacter of targetCharacters) {
                if (targetCharacter == subjectCharacter)
                    continue;
                const far = subjectCharacter.calcFar(targetCharacter);
                if (minFar == null || far <= minFar) {
                    minFar = far;
                    minFarCharacter = targetCharacter;
                }
            }
            if (minFar == null)
                minFar = 0;
            return { character: minFarCharacter, far: minFar };
        }
        static countEnemies() {
            const enemyCharacters = $gameMap.events().filter((event) => {
                return event.battler().isEnemy() && event.battler().isAlive();
            });
            return enemyCharacters.length;
        }
        static isFront(subject, target, range) {
            const deg = subject.centerPositionPoint().calcDeg(target.centerPositionPoint());
            const dirDeg = Degree.fromDirection(subject.direction());
            const minDeg = dirDeg.value - range / 2;
            const maxDeg = dirDeg.value + range / 2;
            return new Degree(deg.value).isInRange(minDeg, maxDeg);
        }
        static hasActionItem(item) {
            if (item == null)
                return false;
            return !!item.meta.action;
        }
        static allBattlerCharacters() {
            const allCharacters = [...$gameMap.allCharacters()];
            return allCharacters.filter((character) => {
                if (!(character instanceof Game_Character))
                    return false;
                if (!character.isBattler())
                    return false;
                return true;
            });
        }
        static allAliveBattlerCharacters() {
            return this.allBattlerCharacters().filter((character) => {
                if (character.battler().isDead())
                    return false;
                return true;
            });
        }
        static allActorCharacters() {
            return this.allBattlerCharacters().filter((character) => {
                if (!character.battler().isActor())
                    return false;
                return true;
            });
        }
        static allAliveActorCharacters() {
            return this.allAliveBattlerCharacters().filter((character) => {
                if (!character.battler().isActor())
                    return false;
                return true;
            });
        }
        static allEnemyCharacters() {
            return this.allBattlerCharacters().filter((character) => {
                if (!character.battler().isEnemy())
                    return false;
                return true;
            });
        }
        static allAliveEnemyCharacters() {
            return this.allAliveBattlerCharacters().filter((character) => {
                if (!character.battler().isEnemy())
                    return false;
                return true;
            });
        }
        static searchSkillId(skillName) {
            const foundSkill = $dataSkills.find((skill) => {
                if (!skill)
                    return false;
                return skill.name === skillName;
            });
            if (foundSkill)
                return foundSkill.id;
            return void 0;
        }
        static characterKindValue(character) {
            if (character instanceof Game_Player) {
                return 1;
            } else if (character instanceof Game_Follower) {
                return 2;
            } else if (character instanceof Game_Event) {
                return 3;
            } else if (character instanceof Game_Vehicle) {
                return 4;
            }
            throw new Error(`Character has not kind value.`);
        }
        static registerKey(name, key) {
            switch (key.KeyName) {
                case "ok":
                case "escape":
                case "menu":
                case "shift":
                case "down":
                case "left":
                case "right":
                case "up":
                case "pageup":
                case "pagedown":
                    this._keyTable[name] = key.KeyName;
                    break;
                case "other":
                    if (key.KeySymbol != null && key.KeySymbol !== "") {
                        this._keyTable[name] = key.KeySymbol;
                        if (key.KeyCodes) {
                            for (const keyCode of key.KeyCodes) {
                                Input.keyMapper[keyCode] = key.KeySymbol;
                            }
                        }
                        if (key.ButtonIndexes) {
                            for (const buttonIndex of key.ButtonIndexes) {
                                Input.gamepadMapper[buttonIndex] = key.KeySymbol;
                            }
                        }
                        if (key.KeyCode >= 0) {
                            Input.keyMapper[key.KeyCode] = key.KeySymbol;
                        }
                        if (key.ButtonIndex >= 0) {
                            Input.gamepadMapper[key.ButtonIndex] = key.KeySymbol;
                        }
                    }
                    break;
            }
        }
        static getKeySymbol(name) {
            return this._keyTable[name];
        }
        // NOTE: シーンの状態を問わずアクターの変更が可能かを判定する。
        //       そのためシーン固有の状態によるアクター変更可否はシーンの方で判定が必要。
        static isChangeActorEnabled() {
            if ($gamePlayer.isBattler()) {
                if ($gamePlayer.battler().isDamageReceiving())
                    return false;
                if ($gamePlayer.battler().isSkillUsing())
                    return false;
            }
            return true;
        }
        static itemAttackElementIds(item) {
            const allElements = $dataSystem.elements;
            let elementIds = /* @__PURE__ */ new Set();
            if (item.damage.elementId >= 0)
                elementIds.add(item.damage.elementId);
            for (const matchData of item.note.matchAll(/\<damageElement\s*\:\s*(.+)\s*\>/g)) {
                if (matchData && matchData[1]) {
                    const elementName = matchData[1];
                    for (let i = 0; i < allElements.length; i++) {
                        if (allElements[i] === elementName) {
                            elementIds.add(i);
                            break;
                        }
                    }
                }
            }
            return [...elementIds];
        }
    };
    ARPG_Utils._keyTable = {};

    // ts/ARPG_Core/ErrorManager.ts
    var ErrorManager = class {
        static skillActivationUnusedSkillError() {
            let message;
            if (ARPG_CorePluginParams.ErrorMessageLanguage === "ja") {
                message = `\u30B9\u30AD\u30EB\u672A\u4F7F\u7528\u306E\u72B6\u614B\u3067\u30B9\u30AD\u30EB\u767A\u52D5\u3092\u884C\u3046\u3053\u3068\u306F\u3067\u304D\u307E\u305B\u3093\u3002`;
            } else {
                message = `You cannot activate the skill while the skill is unused.`;
            }
            return new Error(message);
        }
        static applySkillEffectUnusedSkillError() {
            let message;
            if (ARPG_CorePluginParams.ErrorMessageLanguage === "ja") {
                message = `\u30B9\u30AD\u30EB\u672A\u4F7F\u7528\u306E\u72B6\u614B\u3067\u30B9\u30AD\u30EB\u52B9\u679C\u9069\u7528\u3092\u884C\u3046\u3053\u3068\u306F\u3067\u304D\u307E\u305B\u3093\u3002`;
            } else {
                message = `The skill effect cannot be applied while the skill is not used.`;
            }
            return new Error(message);
        }
        static applySkillEffectUnActivate() {
            let message;
            if (ARPG_CorePluginParams.ErrorMessageLanguage === "ja") {
                message = `\u30B9\u30AD\u30EB\u3092\u767A\u52D5\u3057\u3066\u3044\u306A\u3044\u72B6\u614B\u3067\u30B9\u30AD\u30EB\u52B9\u679C\u9069\u7528\u3092\u884C\u3046\u3053\u3068\u306F\u3067\u304D\u307E\u305B\u3093\u3002`;
            } else {
                message = `Skill effects cannot be applied while the skill is not activated.`;
            }
            return new Error(message);
        }
        static testApplySkillEffectUnusedSkillError() {
            let message;
            if (ARPG_CorePluginParams.ErrorMessageLanguage === "ja") {
                message = `\u30B9\u30AD\u30EB\u672A\u4F7F\u7528\u306E\u72B6\u614B\u3067\u30B9\u30AD\u30EB\u52B9\u679C\u9069\u7528\u30C6\u30B9\u30C8\u3092\u884C\u3046\u3053\u3068\u306F\u3067\u304D\u307E\u305B\u3093\u3002`;
            } else {
                message = `Skill effect application test cannot be performed while skill is not used.`;
            }
            return new Error(message);
        }
        static makeSkillObjectUnActivate() {
            let message;
            if (ARPG_CorePluginParams.ErrorMessageLanguage === "ja") {
                message = `\u30B9\u30AD\u30EB\u306E\u767A\u52D5\u3092\u884C\u308F\u305A\u306B\u30B9\u30AD\u30EB\u30AA\u30D6\u30B8\u30A7\u30AF\u30C8\u3092\u751F\u6210\u3059\u308B\u3053\u3068\u306F\u3067\u304D\u307E\u305B\u3093\u3002`;
            } else {
                message = `A skill object cannot be created without activating the skill.`;
            }
            return new Error(message);
        }
        static makeSkillObjectNotBattlerOrSkillObject() {
            let message;
            if (ARPG_CorePluginParams.ErrorMessageLanguage === "ja") {
                message = `\u30D0\u30C8\u30E9\u30FC\u307E\u305F\u306F\u30B9\u30AD\u30EB\u30AA\u30D6\u30B8\u30A7\u30AF\u30C8\u3067\u306A\u3044\u30A4\u30D9\u30F3\u30C8\u306F\u30B9\u30AD\u30EB\u30AA\u30D6\u30B8\u30A7\u30AF\u30C8\u3092\u751F\u6210\u3059\u308B\u3053\u3068\u306F\u3067\u304D\u307E\u305B\u3093\u3002`;
            } else {
                message = `Events that are not battlers or skill objects cannot generate skill objects.`;
            }
            return new Error(message);
        }
    };

    // ts/ARPG_Core/HitBox.ts
    var HitBox = class extends Game_Character {
        constructor(...args) {
            super(...args);
        }
        get owner() {
            return this._owner;
        }
        get hitArea() {
            return this._hitArea;
        }
        set hitArea(_hitArea) {
            this._hitArea = _hitArea;
        }
        get hitBoxColor() {
            return this._hitBoxColor;
        }
        get type() {
            return this._type;
        }
        get customTag() {
            return this._customTag;
        }
        initialize(...args) {
            super.initialize();
            const [type, owner, hitArea, hitBoxColor, customTag] = args;
            this._owner = owner;
            this._hitArea = hitArea;
            this._hitBoxColor = hitBoxColor;
            this._type = type;
            this._customTag = customTag;
            this.updatePosition();
        }
        update() {
            super.update();
            this.updatePosition();
        }
        setHitChecker(hitChecker) {
            this._hitChecker = hitChecker;
        }
        updatePosition() {
            const ownerPos = this._owner.positionPoint();
            this.setPositionPoint(new DotMoveSystem.DotMovePoint(ownerPos.x + this._hitArea.x, ownerPos.y + this._hitArea.y));
        }
        width() {
            return this._hitArea.width;
        }
        height() {
            return this._hitArea.height;
        }
        checkHitCharactersByHitBox(type, customTag = "") {
            const hitCharacters = /* @__PURE__ */ new Set();
            const results = this.checkHitCharacters(HitBox);
            for (const result of results) {
                const targetHitBox = result.targetObject;
                if (this.owner === targetHitBox.owner)
                    continue;
                if (!targetHitBox.isEnabled())
                    continue;
                if (targetHitBox.type !== type)
                    continue;
                if (targetHitBox.type === "custom" && targetHitBox.customTag !== customTag)
                    continue;
                hitCharacters.add(targetHitBox.owner);
            }
            return hitCharacters;
        }
        getHitBoxSprite() {
            if (!(SceneManager._scene instanceof Scene_Map))
                return void 0;
            const spriteset = SceneManager._scene._spriteset;
            return spriteset.findTargetHitBoxSprite(this);
        }
        screenX() {
            const tw = $gameMap.tileWidth();
            return Math.floor(this.scrolledX() * tw);
        }
        screenY() {
            const th = $gameMap.tileHeight();
            return Math.floor(this.scrolledY() * th);
        }
        screenZ() {
            return 255;
        }
        isEnabled() {
            if (this._hitChecker == null)
                return false;
            return this._hitChecker.isEnabled();
        }
    };

    // ts/CommonLibrary/ComponentRunner.ts
    var ComponentRunner = class {
        constructor(user) {
            this._components = /* @__PURE__ */ new Set();
            this._end = false;
            this._user = user;
        }
        prepareUpdate() {
            for (const component of this._components) {
                component.prepareUpdateComponent();
            }
        }
        update() {
            if (this._end)
                return;
            const components = [...this._components];
            for (const component of components) {
                component.updateComponent();
                if (component.isTerminated()) {
                    this.removeComponent(component);
                }
            }
        }
        addComponent(component) {
            this._components.add(component);
            component.setUser(this._user);
        }
        removeComponent(component) {
            this._components.delete(component);
        }
        hasComponent(component) {
            if (component == null)
                return false;
            return this._components.has(component);
        }
        hasComponentByClass(componentClass) {
            return !![...this._components].find((c) => c instanceof componentClass);
        }
        end() {
            for (const component of this._components) {
                component.end(true);
            }
        }
        isEnd() {
            return this._end;
        }
    };

    // ts/CommonLibrary/Component.ts
    var Component = class {
        constructor() {
            this._end = false;
            this._terminated = false;
            this._started = false;
            this._stopped = false;
            this._calledSuperMethodNames = [];
        }
        user() {
            return this._user;
        }
        setUser(user) {
            this._user = user;
            this._componentRunner = new ComponentRunner(user);
            this.setup();
        }
        isStarted() {
            return this._started;
        }
        isStopped() {
            if (this._end)
                return true;
            return this._stopped;
        }
        isBusy() {
            return !this.isStopped();
        }
        stop() {
            this._stopped = true;
        }
        resume() {
            this._stopped = false;
        }
        isEnd() {
            return this._end;
        }
        isTerminated() {
            return this._terminated;
        }
        end(fastTerminate = false) {
            this._end = true;
            if (fastTerminate) {
                this.updateComponent();
            }
        }
        prepareUpdateComponent() {
            if (this._end)
                return;
            if (this._stopped)
                return;
            if (this._started) {
                this._componentRunner.prepareUpdate();
                this._calledSuperMethodNames = [];
                this.prepareUpdate();
                this.checkSuperMethodCalled("prepareUpdate");
            }
        }
        updateComponent() {
            if (!this._end && !this._stopped) {
                this._componentRunner.update();
                if (this._started) {
                    this._calledSuperMethodNames = [];
                    this.update();
                    this.checkSuperMethodCalled("update");
                } else {
                    this._started = true;
                    this._calledSuperMethodNames = [];
                    this.start();
                    this.checkSuperMethodCalled("start");
                }
            }
            if (this._end && !this._terminated) {
                this._terminated = true;
                this._calledSuperMethodNames = [];
                this.terminate();
                this.checkSuperMethodCalled("terminate");
                this._componentRunner.end();
            }
        }
        addComponent(component) {
            this._componentRunner.addComponent(component);
        }
        removeComponent(component) {
            this._componentRunner.removeComponent(component);
        }
        hasComponent(component) {
            return this._componentRunner.hasComponent(component);
        }
        hasComponentByClass(componentClass) {
            return this._componentRunner.hasComponentByClass(componentClass);
        }
        setup() {
            this._calledSuperMethodNames.push("setup");
        }
        start() {
            this._calledSuperMethodNames.push("start");
        }
        prepareUpdate() {
            this._calledSuperMethodNames.push("prepareUpdate");
        }
        update() {
            this._calledSuperMethodNames.push("update");
        }
        terminate() {
            this._calledSuperMethodNames.push("terminate");
        }
        checkSuperMethodCalled(methodName) {
            if (!this._calledSuperMethodNames.includes(methodName)) {
                throw new Error(`${this.constructor.name}: super.${methodName}() is not called.`);
            }
        }
    };

    // ts/ARPG_Core/HitChecker.ts
    var HitChecker = class extends Component {
        constructor(type, customTag) {
            super();
            this._hitBoxs = [];
            this._disableReasons = /* @__PURE__ */ new Set();
            this._type = type;
            this._customTag = customTag;
        }
        get hitBoxs() {
            return this._hitBoxs;
        }
        get type() {
            return this._type;
        }
        get customTag() {
            return this._customTag;
        }
        update() {
            super.update();
            for (const hitBox of this._hitBoxs) {
                hitBox.update();
            }
        }
        addHitBox(hitBox) {
            if (this.type !== hitBox.type) {
                throw new Error(`mismatch: hitChecker.type=${this.type}, hitBox.type=${hitBox.type}`);
            }
            if (this.type === "custom" && this.customTag !== hitBox.customTag) {
                throw new Error(`mismatch: hitChecker.customTag=${this.customTag}, hitBox.customTag=${hitBox.customTag}`);
            }
            this._hitBoxs.push(hitBox);
            hitBox.setHitChecker(this);
        }
        clearHitBoxs() {
            this._hitBoxs = [];
        }
        checkHit(hitBoxType, customTag = "") {
            const hitCharacters = /* @__PURE__ */ new Set();
            if (!this.isEnabled())
                return hitCharacters;
            for (const hitBox of this._hitBoxs) {
                for (const character of hitBox.checkHitCharactersByHitBox(hitBoxType, customTag)) {
                    hitCharacters.add(character);
                }
            }
            return hitCharacters;
        }
        checkHitByOtherHitChecker(otherHitChecker) {
            if (!this.isEnabled())
                return false;
            if (!otherHitChecker.isEnabled())
                return false;
            for (const subjectHitBox of this._hitBoxs) {
                for (const result of subjectHitBox.checkHitCharacters(HitBox)) {
                    for (const targetHitBox of otherHitChecker.hitBoxs) {
                        if (result.targetObject === targetHitBox)
                            return true;
                    }
                }
            }
            return false;
        }
        addDisableReason(reason) {
            this._disableReasons.add(reason);
        }
        removeDisableReason(reason) {
            this._disableReasons.delete(reason);
        }
        isEnabled() {
            return this._disableReasons.size === 0;
        }
    };

    // ts/ARPG_Core/ARPG_Config.ts
    var ARPG_CorePluginName = document.currentScript ? decodeURIComponent(document.currentScript.src.match(/^.*\/(.+)\.js$/)[1]) : "ARPG_Core";
    var ARPG_CorePluginParams = PluginParamsParser.parse(PluginManager.parameters(ARPG_CorePluginName));
    if (ARPG_CorePluginParams.KeySetting.Cancel != null) {
        ARPG_Utils.registerKey("Cancel", ARPG_CorePluginParams.KeySetting.Cancel);
    }
    if (ARPG_CorePluginParams.KeySetting.Menu != null) {
        ARPG_Utils.registerKey("Menu", ARPG_CorePluginParams.KeySetting.Menu);
    }
    if (ARPG_CorePluginParams.KeySetting.ActorNormalAttack != null) {
        ARPG_Utils.registerKey("ActorNormalAttack", ARPG_CorePluginParams.KeySetting.ActorNormalAttack);
    }
    if (ARPG_CorePluginParams.KeySetting.ActorGuard != null) {
        ARPG_Utils.registerKey("ActorGuard", ARPG_CorePluginParams.KeySetting.ActorGuard);
    }
    if (ARPG_CorePluginParams.KeySetting.VisibleHitBox != null) {
        ARPG_Utils.registerKey("VisibleHitBox", ARPG_CorePluginParams.KeySetting.VisibleHitBox);
    }
    if (ARPG_CorePluginParams.KeySetting.ChangeControlActor != null) {
        ARPG_Utils.registerKey("ChangeControlActor", ARPG_CorePluginParams.KeySetting.ChangeControlActor);
    }
    PluginManager.registerCommand(ARPG_CorePluginName, "ChangeARPGMode", function(args) {
        const params = PluginParamsParser.parse(args);
        const arpgMode = !!params.ARPGMode;
        if (arpgMode) {
            $gameMap.startARPGMode();
        } else {
            $gameMap.endARPGMode();
        }
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "MakeDynamicEvent", function(args) {
        const typeDefine = {
            SrcMapId: "number",
            SrcEventIdOrName: "string",
            X: "number",
            XByVariable: "number",
            Y: "number",
            YByVariable: "number",
            MadeDynamicEventId: "number"
        };
        const params = PluginParamsParser.parse(args, typeDefine);
        const x = params.XByVariable > 0 ? $gameVariables.value(params.XByVariable) : params.X;
        const y = params.YByVariable > 0 ? $gameVariables.value(params.YByVariable) : params.Y;
        const event = $gameMap.makeDynamicEvent(params.SrcMapId, params.SrcEventIdOrName, x, y);
        if (params.MadeDynamicEventId > 0) {
            $gameVariables.setValue(params.MadeDynamicEventId, event.eventId());
        }
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "GetCharacterFloatPosition", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        let pos;
        if (params.LeftUpOrCenter === "center") {
            pos = character.centerPositionPoint();
        } else {
            pos = character.positionPoint();
        }
        $gameVariables.setValue(params.StoreFloatXVariableId, pos.x);
        $gameVariables.setValue(params.StoreFloatYVariableId, pos.y);
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "CalcDeg", function(args) {
        const params = PluginParamsParser.parse(args);
        const subject = this.findCharacterBySpecification(params.SubjectCharacterSpecification);
        const target = this.findCharacterBySpecification(params.TargetCharacterSpecification);
        $gameVariables.setValue(params.StoreDegreeVariableId, subject.calcDeg(target));
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "CalcFar", function(args) {
        const params = PluginParamsParser.parse(args);
        const subject = this.findCharacterBySpecification(params.SubjectCharacterSpecification);
        const target = this.findCharacterBySpecification(params.TargetCharacterSpecification);
        $gameVariables.setValue(params.StoreFarVariableId, subject.calcFar(target));
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "CheckInTheScreen", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        const xMargin = params.XMargin ?? 2;
        const yMargin = params.YMargin ?? 2;
        $gameSwitches.setValue(params.StoreResultSwitchId, character.isInTheScreen(xMargin, yMargin));
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "CheckMoved", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        $gameSwitches.setValue(params.StoreResultSwitchId, character.isMoved());
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "SetupEnemy", function(args) {
        const params = PluginParamsParser.parse(args);
        const event = this.event();
        if (!event)
            return;
        let collideAttackSkillId;
        if (params.CollideAttackSkillId != null && params.CollideAttackSkillId > 0) {
            collideAttackSkillId = params.CollideAttackSkillId;
        } else if (ARPG_CorePluginParams.EnemySetting.CollideAttackSkillId != null && ARPG_CorePluginParams.EnemySetting.CollideAttackSkillId > 0) {
            collideAttackSkillId = ARPG_CorePluginParams.EnemySetting.CollideAttackSkillId;
        }
        event.setupEnemy(
            params.EnemyId,
            {
                collideAttackSkillId,
                damageCommonEventId: params.DamageCommonEventId,
                defeatEnemyCommonEventId: params.DefeatEnemyCommonEventId
            }
        );
        if (params.HpGauge === "normal") {
            event.battler().setupNormalHpGauge({
                hpGaugeColor1: ARPG_CorePluginParams.EnemyHpGaugeSetting.NormalEnemyHpGaugeColor1,
                hpGaugeColor2: ARPG_CorePluginParams.EnemyHpGaugeSetting.NormalEnemyHpGaugeColor2,
                hpGaugePosition: ARPG_CorePluginParams.EnemyHpGaugeSetting.NormalEnemyHpGaugePosition === "down" ? "down" : "up",
                hpGaugeYOffset: ARPG_CorePluginParams.EnemyHpGaugeSetting.NormalEnemyHpGaugeYOffset,
                hpGaugeHeight: ARPG_CorePluginParams.EnemyHpGaugeSetting.NormalEnemyHpGaugeHeight
            });
        } else if (params.HpGauge === "boss") {
            $gameTemp.arpgGlobalTempData().bossHpGaugeTargetEnemy = event.battler();
        }
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "ChangeHpGaugeVisible", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        if (!(character && character instanceof Game_Event))
            return;
        character.battler().setHpGaugeVisible(!!params.ShowOrHide);
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "SetupFieldObject", function(args) {
        const params = PluginParamsParser.parse(args);
        const event = this.event();
        if (!event)
            return;
        event.setupFieldObject({ damageCommonEventId: params.DamageCommonEventId });
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "UseSkill", function(args) {
        const params = PluginParamsParser.parse(args);
        const user = this.arpgCharacter();
        let idOrName;
        if (params.SkillIdByVariable > 0) {
            idOrName = $gameVariables.value(params.SkillIdByVariable);
        } else if (params.SkillByName && params.SkillByName !== "") {
            idOrName = params.SkillByName;
        } else {
            idOrName = params.SkillId;
        }
        user.battler().useSkill("skill", idOrName);
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "UseItem", function(args) {
        const params = PluginParamsParser.parse(args);
        const user = this.arpgCharacter();
        let idOrName;
        if (params.ItemIdByVariable > 0) {
            idOrName = $gameVariables.value(params.ItemIdByVariable);
        } else if (params.ItemByName && params.ItemByName !== "") {
            idOrName = params.ItemByName;
        } else {
            idOrName = params.ItemId;
        }
        user.battler().useSkill("item", idOrName);
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "SkillActivation", function(args) {
        const params = PluginParamsParser.parse(args, { ChantCommonEventId: "number" });
        this.arpgCharacter().battler().skillActivation(params.ChantCommonEventId);
        this._needChantWait = true;
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "ChangeSkillCancelWhenDamageEnableOrDisable", function(args) {
        const params = PluginParamsParser.parse(args);
        this.arpgCharacter().battler().setSkillCancelWhenDamageEnable(!!params.EnableOrDisable);
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "ApplySkillEffect", function(args) {
        const params = PluginParamsParser.parse(args);
        let skill;
        if (params.IsSkillSpecification) {
            skill = this.findArpgSkillBySpecification(params.SkillSpecification);
        }
        this.arpgCharacter().battler().applySkillEffect(skill);
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "TestApplySkillEffect", function(args) {
        const params = PluginParamsParser.parse(args);
        let skill;
        if (params.IsSkillSpecification) {
            skill = this.findArpgSkillBySpecification(params.SkillSpecification);
        }
        const result = this.arpgCharacter().battler().testApplySkillEffect(skill);
        $gameSwitches.setValue(params.StoreResultSwitchId, result);
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "MakeSkillObject", function(args) {
        const params = PluginParamsParser.parse(args);
        const user = this.arpgCharacter();
        if (!(user.isBattler() || user.isSkillObject())) {
            throw ErrorManager.makeSkillObjectNotBattlerOrSkillObject();
        }
        let event;
        let skill;
        if (params.IsSkillSpecification) {
            skill = this.findArpgSkillBySpecification(params.SkillSpecification);
        }
        if (user.isBattler()) {
            event = user.battler().makeSkillObject(params.SrcMapId, params.SrcEventIdOrName, skill);
        } else {
            event = user.skillObject().makeSkillObject(params.SrcMapId, params.SrcEventIdOrName, skill);
        }
        let x = 0;
        let y = 0;
        const userPos = user.centerPositionPoint();
        switch (params.SkillObjectPosition.Specification) {
            case "current":
                x = userPos.x - event.width() / 2;
                y = userPos.y - event.height() / 2;
                break;
            case "forward":
                const userForwardPos = import_DotMoveSystem.DotMoveUtils.nextPointWithDirection(userPos, user.direction());
                x = userForwardPos.x - event.width() / 2;
                y = userForwardPos.y - event.height() / 2;
                break;
            case "character":
                const target = this.findCharacterBySpecification(params.SkillObjectPosition.CharacterSpecification);
                const targetPos = target.centerPositionPoint();
                x = targetPos.x - event.width() / 2;
                y = targetPos.y - event.height() / 2;
                break;
            case "custom":
                const xByVariable = params.SkillObjectPosition.CustomPosition.XByVariable;
                const yByVariable = params.SkillObjectPosition.CustomPosition.YByVariable;
                x = xByVariable > 0 ? $gameVariables.value(xByVariable) : params.SkillObjectPosition.CustomPosition.X;
                y = yByVariable > 0 ? $gameVariables.value(yByVariable) : params.SkillObjectPosition.CustomPosition.Y;
                break;
        }
        event.setPosition(x, y);
        if (params.MadeDynamicEventId > 0) {
            $gameVariables.setValue(params.MadeDynamicEventId, event.eventId());
        }
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "SetAttackDegree", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        const skillObject = character.skillObject();
        const attackDeg = params.AttackDegreeByVariable > 0 ? $gameVariables.value(params.AttackDegreeByVariable) : params.AttackDegree;
        skillObject.setAttackDeg(new Degree(attackDeg));
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "SetUserPositionSynchronize", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        const skillObject = character.skillObject();
        skillObject.setUserPositionSynchronize(!!params.Synchronize);
    });
    function findHitChecker(character, hitBoxType, customHitBoxTag) {
        let hitChecker;
        if (hitBoxType === "attack") {
            if (character.isBattler()) {
                const battler = character.battler();
                hitChecker = battler.attackHitChecker;
            } else if (character.isSkillObject()) {
                const skillObject = character.skillObject();
                hitChecker = skillObject.attackHitChecker;
            }
            if (!hitChecker) {
                throw new Error(`Event is not ARPG_Battler or ARPG_SkillObject`);
            }
        } else if (hitBoxType === "damage") {
            if (character.isBattler()) {
                const battler = character.battler();
                hitChecker = battler.damageHitChecker;
            } else if (character.isFieldObject()) {
                const fieldObject = character.fieldObject();
                hitChecker = fieldObject.damageHitChecker;
            }
            if (!hitChecker) {
                throw new Error(`Event is not ARPG_Battler or ARPG_FieldObject`);
            }
        } else if (hitBoxType === "custom") {
            let customHitChecker;
            if (character.isBattler()) {
                customHitChecker = character.battler().customHitCheckers.get(customHitBoxTag);
                if (!customHitChecker) {
                    customHitChecker = new HitChecker("custom", customHitBoxTag);
                    character.battler().customHitCheckers.set(customHitBoxTag, customHitChecker);
                    character.battler().addComponent(customHitChecker);
                }
            } else if (character.isSkillObject()) {
                customHitChecker = character.skillObject().customHitCheckers.get(customHitBoxTag);
                if (!customHitChecker) {
                    customHitChecker = new HitChecker("custom", customHitBoxTag);
                    character.skillObject().customHitCheckers.set(customHitBoxTag, customHitChecker);
                    character.skillObject().addComponent(customHitChecker);
                }
            } else if (character.isFieldObject()) {
                customHitChecker = character.fieldObject().customHitCheckers.get(customHitBoxTag);
                if (!customHitChecker) {
                    customHitChecker = new HitChecker("custom", customHitBoxTag);
                    character.fieldObject().customHitCheckers.set(customHitBoxTag, customHitChecker);
                    character.fieldObject().addComponent(customHitChecker);
                }
            }
            if (!customHitChecker) {
                throw new Error(`Event is not ARPG_Battler or ARPG_SkillObject or ARPG_FieldObject`);
            }
            hitChecker = customHitChecker;
        }
        return hitChecker;
    }
    PluginManager.registerCommand(ARPG_CorePluginName, "CheckDamageElement", function(args) {
        const params = PluginParamsParser.parse(args);
        let result = false;
        const character = this.arpgCharacter();
        if (character) {
            if (character.isBattler()) {
                result = character.battler().checkDamageElement(params.ElementName);
            } else if (character.isFieldObject()) {
                result = character.fieldObject().checkDamageElement(params.ElementName);
            }
        }
        $gameSwitches.setValue(params.StoreResultSwitchId, result);
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "SetHitBox", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        if (!character)
            return;
        const hitChecker = findHitChecker(character, params.HitBoxType, params.CustomHitBoxTag);
        hitChecker.clearHitBoxs();
        for (const hitBoxParam of params.HitBoxList) {
            const rect = new Rectangle(hitBoxParam.X, hitBoxParam.Y, hitBoxParam.Width, hitBoxParam.Height);
            if (params.HitBoxType === "attack") {
                const hitBox = new HitBox("attack", character, rect, ARPG_CorePluginParams.HitBoxSetting.AttackHitBoxColor);
                hitChecker.addHitBox(hitBox);
            } else if (params.HitBoxType === "damage") {
                const hitBox = new HitBox("damage", character, rect, ARPG_CorePluginParams.HitBoxSetting.DamageHitBoxColor);
                hitChecker.addHitBox(hitBox);
            } else if (params.HitBoxType === "custom") {
                let color;
                const info = ARPG_CorePluginParams.HitBoxSetting.CustomHitBoxColorList.find((info2) => info2.CustomHitBoxTag === params.CustomHitBoxTag);
                if (info) {
                    color = info.Color;
                } else {
                    color = ARPG_CorePluginParams.HitBoxSetting.CustomHitBoxDefaultColor;
                }
                const hitBox = new HitBox("custom", character, rect, color, params.CustomHitBoxTag);
                hitChecker.addHitBox(hitBox);
            }
        }
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "ChangeHitBoxEnableOrDisable", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        if (!character)
            return;
        const hitChecker = findHitChecker(character, params.HitBoxType, params.CustomHitBoxTag);
        if (!!params.Enabled) {
            hitChecker.removeDisableReason("ChangeHitBoxEnableOrDisable");
        } else {
            hitChecker.addDisableReason("ChangeHitBoxEnableOrDisable");
        }
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "HitCheck", function(args) {
        const params = PluginParamsParser.parse(args);
        const subjectCharacter = this.findCharacterBySpecification(params.SubjectCharacterSpecification);
        if (!subjectCharacter)
            return;
        const subjectHitChecker = findHitChecker(subjectCharacter, params.SubjectHitBoxType, params.SubjectCustomHitBoxTag);
        if (params.IsTargetSpecification) {
            const targetCharacter = this.findCharacterBySpecification(params.TargetCharacterSpecification);
            const targetHitChecker = findHitChecker(targetCharacter, params.TargetHitBoxType, params.TargetCustomHitBoxTag);
            const result = subjectHitChecker.checkHitByOtherHitChecker(targetHitChecker);
            $gameSwitches.setValue(params.StoreResultSwitchId, result);
        } else {
            const results = subjectHitChecker.checkHit(params.TargetHitBoxType, params.TargetCustomHitBoxTag);
            $gameSwitches.setValue(params.StoreResultSwitchId, results.size > 0);
        }
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "GetBattlerStatus", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        if (!character.isBattler())
            throw new Error(`battler is not found. (EventId=${params.CharacterSpecification})`);
        const battler = character.battler();
        const value = battler[params.StatusType];
        if (value == null) {
            throw new Error(`StatusType is invalid. (StatusType=${params.StatusType})`);
        }
        $gameVariables.setValue(params.DestVariableId, value);
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "SetBattlerStatus", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        if (!character.isBattler())
            throw new Error(`battler is not found. (EventId=${params.CharacterSpecification})`);
        const battler = character.battler();
        const value = params.ValueByVariable > 0 ? $gameVariables.value(params.ValueByVariable) : params.Value;
        switch (params.StatusType) {
            case "hp":
                battler.hp = value;
                break;
            case "mp":
                battler.mp = value;
                break;
            case "tp":
                battler.tp = value;
                break;
            default:
                throw new Error(`StatusType is invalid. (StatusType=${params.StatusType})`);
        }
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "GetBattlerARPGParameter", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        if (!character.isBattler())
            throw new Error(`battler is not found. (EventId=${params.CharacterSpecification})`);
        const battler = character.battler();
        let value;
        switch (params.ARPGParameterType) {
            case "skillCancelDamageRate":
                value = battler.arpgParameters().skillCancelDamageRate;
                break;
            case "justGuardFrame":
                const justGuardFrame = battler.arpgParameters().justGuardFrame;
                value = justGuardFrame == null ? 0 : justGuardFrame;
                break;
            default:
                throw new Error(`ARPGParameterType is invalid. (ARPGParameterType=${params.ARPGParameterType})`);
        }
        $gameVariables.setValue(params.DestVariableId, value);
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "SetBattlerARPGParameter", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        if (!character.isBattler())
            throw new Error(`battler is not found. (EventId=${params.CharacterSpecification})`);
        const battler = character.battler();
        const value = params.ValueByVariable > 0 ? $gameVariables.value(params.ValueByVariable) : params.Value;
        switch (params.ARPGParameterType) {
            case "skillCancelDamageRate":
                battler.arpgParameters().skillCancelDamageRate = value;
                break;
            case "justGuardFrame":
                battler.arpgParameters().justGuardFrame = value;
                break;
            default:
                throw new Error(`ARPGParameterType is invalid. (ARPGParameterType=${params.ARPGParameterType})`);
        }
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "GetBattlerARPGFlag", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        if (!character.isBattler())
            throw new Error(`battler is not found. (EventId=${params.CharacterSpecification})`);
        const battler = character.battler();
        let value;
        switch (params.ARPGFlagType) {
            case "noDamageFlag":
                value = battler.arpgParameters().noDamageFlag;
                break;
            case "noAttackFlag":
                value = battler.arpgParameters().noAttackFlag;
                break;
            default:
                throw new Error(`ARPGFlagType is invalid. (ARPGFlagType=${params.ARPGFlagType})`);
        }
        $gameSwitches.setValue(params.DestSwitchId, value);
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "SetBattlerARPGFlag", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        if (!character.isBattler())
            throw new Error(`battler is not found. (EventId=${params.CharacterSpecification})`);
        const battler = character.battler();
        const value = params.ValueBySwitch > 0 ? $gameSwitches.value(params.ValueBySwitch) : params.Value;
        switch (params.ARPGFlagType) {
            case "noDamageFlag":
                battler.arpgParameters().noDamageFlag = value;
                break;
            case "noAttackFlag":
                battler.arpgParameters().noAttackFlag = value;
                break;
            default:
                throw new Error(`ARPGFlagType is invalid. (ARPGFlagType=${params.ARPGFlagType})`);
        }
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "CharacterBlowAway", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        const deg = new Degree(params.DegreeByVariable > 0 ? $gameVariables.value(params.DegreeByVariable) : params.Degree);
        const initialVelocity = params.InitialVelocityByVariable > 0 ? $gameVariables.value(params.InitialVelocityByVariable) : params.InitialVelocity;
        const duration = params.DurationByVariable > 0 ? $gameVariables.value(params.DurationByVariable) : params.Duration;
        character.startBlowAway(deg, initialVelocity, duration);
        if (!!params.Wait) {
            this._blowAwayWaitCharacter = character;
        }
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "CharacterActionWait", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        const duration = params.DurationByVariable > 0 ? $gameVariables.value(params.DurationByVariable) : params.Duration;
        character.startActionWait(duration);
        this._actionWaitCharacter = character;
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "TargetSelect", function(args) {
        const typeDefine = {
            SelectResultSwitchId: "number",
            SelectedTargetCharacterKindVariableId: "number",
            SelectedTargetEventIdVariableId: "number",
            Wait: "boolean",
            Cancelable: "boolean"
        };
        const params = PluginParamsParser.parse(args, typeDefine);
        if ($gameTemp.arpgGlobalTempData().selectResultSwitchId > 0) {
            $gameSwitches.setValue(params.SelectResultSwitchId, false);
        }
        $gameTemp.arpgGlobalTempData().selectResultSwitchId = params.SelectResultSwitchId;
        $gameTemp.arpgGlobalTempData().selectedTargetCharacterKindVariableId = params.SelectedTargetCharacterKindVariableId;
        $gameTemp.arpgGlobalTempData().selectedTargetEventIdVariableId = params.SelectedTargetEventIdVariableId;
        $gameMap.startTargetSelect({ wait: params.Wait, cancelable: params.Cancelable });
        this._needTargetSelectWait = true;
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "SearchNearBattler", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.SubjectCharacterSpecification);
        let found = false;
        if (character.isBattler()) {
            const { character: foundCharacter } = ARPG_Utils.searchNearBattler(character, params.Target);
            if (foundCharacter) {
                found = true;
                $gameVariables.setValue(params.StoreCharacterKindVariableId, ARPG_Utils.characterKindValue(foundCharacter));
                if (foundCharacter instanceof Game_Event) {
                    $gameVariables.setValue(params.StoreEventIdVariableId, foundCharacter.eventId());
                }
            }
        }
        $gameSwitches.setValue(params.StoreResultSwitchId, found);
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "SetPlayerGuardMode", function(args) {
        const params = PluginParamsParser.parse(args);
        if ($gamePlayer.isBattler()) {
            if (params.GuardMode) {
                $gamePlayer.battler().startGuard("SetPlayerGuardMode");
            } else {
                $gamePlayer.battler().endGuard("SetPlayerGuardMode");
            }
        }
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "ChangeControlActor", function(args) {
        $gameTemp.requestChangeNextActor();
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "ShowMessagePopup", function(args) {
        const params = PluginParamsParser.parse(args);
        const w = params.WindowWidth == null ? 640 : params.WindowWidth;
        const h = 64;
        const x = Graphics.boxWidth / 2 - w / 2;
        const y = 0;
        const rect = new Rectangle(x, y, w, h);
        $gameMap.showCommonMessageWindow(params.Text, rect, { time: params.Time });
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "TransparentObjectCast", function(args) {
        const params = PluginParamsParser.parse(args);
        const width = params.Width;
        const height = params.Height;
        let x = 0;
        let y = 0;
        switch (params.TransparentObjectPosition.Specification) {
            case "character":
                const target = this.findCharacterBySpecification(params.TransparentObjectPosition.CharacterSpecification);
                const targetPos = target.centerPositionPoint();
                x = targetPos.x - width / 2;
                y = targetPos.y - height / 2;
                break;
            case "custom":
                const xByVariable = params.TransparentObjectPosition.CustomPosition.XByVariable;
                const yByVariable = params.TransparentObjectPosition.CustomPosition.YByVariable;
                x = xByVariable > 0 ? $gameVariables.value(xByVariable) : params.TransparentObjectPosition.CustomPosition.X;
                y = yByVariable > 0 ? $gameVariables.value(yByVariable) : params.TransparentObjectPosition.CustomPosition.Y;
                break;
        }
        const deg = new Degree(params.DegreeByVariable > 0 ? $gameVariables.value(params.DegreeByVariable) : params.Degree);
        const far = params.FarByVariable > 0 ? $gameVariables.value(params.FarByVariable) : params.Far;
        const collidedPos = $gameMap.transparentObjectCastTo(new import_DotMoveSystem.DotMovePoint(x, y), deg, far, { width, height });
        $gameSwitches.setValue(params.CollisionResultSwitchId, !!collidedPos);
        if (collidedPos) {
            if (params.CollidedXVariableId > 0)
                $gameVariables.setValue(params.CollidedXVariableId, collidedPos.x);
            if (params.CollidedYVariableId > 0)
                $gameVariables.setValue(params.CollidedYVariableId, collidedPos.y);
        }
    });
    PluginManager.registerCommand(ARPG_CorePluginName, "SetCheckMapValid", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        if (!character)
            return;
        if (params.EnableOrDisable == true) {
            character.setNoCheckMapValid(false);
        } else {
            character.setNoCheckMapValid(true);
        }
    });

    // ts/CommonLibrary/mixin.ts
    function mixin(dest, src) {
        for (const name of Object.getOwnPropertyNames(src.prototype)) {
            if (name === "constructor")
                continue;
            const value = Object.getOwnPropertyDescriptor(src.prototype, name) || /* @__PURE__ */ Object.create(null);
            Object.defineProperty(dest.prototype, name, value);
        }
    }

    // ts/ARPG_Core/ARPG_DynamicEvent/Game_Event.ts
    var _Game_Event_Mixin = class extends Game_Event {
        initMembers() {
            _Game_Event_Mixin._initMembers.call(this);
            this._isDynamicEvent = false;
            this._srcMapId = 0;
            this._srcEventId = 0;
            this._copied = false;
        }
        // @ts-ignore // TODO: 暫定
        initialize(mapId, eventId, opt = {}) {
            Game_Character.prototype.initialize.call(this);
            this._mapId = mapId;
            this._eventId = eventId;
            if (opt.isDynamicEvent) {
                if (opt.srcMapId == null)
                    throw new Error(`opt.srcMapId is not defined.`);
                if (opt.srcEventId == null)
                    throw new Error(`opt.srcEventId is not defined.`);
                this._isDynamicEvent = true;
                this.setupCopyEvent(opt.srcMapId, opt.srcEventId);
            }
            this.locate(this.event().x, this.event().y);
            this.refresh();
            this.initCopyEventProcess();
            if (this.event().meta.PushableEvent) {
                this._pushableEvent = true;
            } else {
                const values = this.getAnnotationValues(0);
                if (values.PushableEvent) {
                    this._pushableEvent = true;
                }
            }
        }
        isDynamicEvent() {
            return this._isDynamicEvent;
        }
        isErased() {
            return this._erased;
        }
        setupCopyEvent(srcMapId, srcEventId) {
            if (!this._copied) {
                globalActiveEvent = this;
                this._copied = true;
                this._srcMapId = srcMapId;
                this._srcEventId = srcEventId;
                const newPageIndex = this._erased ? -1 : this.findProperPageIndex();
                this._pageIndex = newPageIndex;
                this.setupPage();
                globalActiveEvent = void 0;
            }
        }
        event() {
            if (this._copied) {
                const mapData = $gameTemp.mapDataCache(this._srcMapId);
                return mapData.events[this._srcEventId];
            } else {
                return _Game_Event_Mixin._event.call(this);
            }
        }
        initCopyEventProcess() {
            const tag = this.event().meta[ARPG_CorePluginParams.CopyEventSetting.CopyEventTag];
            if (!tag)
                return;
            let md;
            let mapIds;
            let srcEventIdOrName;
            if (md = tag.match(/\s*(.+)\,(.+)/)) {
                mapIds = [parseInt(md[1])];
                srcEventIdOrName = md[2];
            } else if (md = tag.match(/\s*(.+)/)) {
                mapIds = ARPG_CorePluginParams.CopyEventSetting.DynamicEventSrcMapIds;
                srcEventIdOrName = md[1];
            } else {
                return;
            }
            for (const mapId of mapIds) {
                const mapData = $gameTemp.mapDataCache(mapId);
                for (const eventData of mapData.events) {
                    if (!eventData)
                        continue;
                    let eventMatched = false;
                    if (srcEventIdOrName.match(/^\d+$/)) {
                        if (eventData.id === parseInt(srcEventIdOrName))
                            eventMatched = true;
                    } else {
                        if (eventData.name === srcEventIdOrName)
                            eventMatched = true;
                    }
                    if (eventMatched) {
                        this.setupCopyEvent(mapId, eventData.id);
                        return;
                    }
                }
            }
        }
    };
    var Game_Event_Mixin = _Game_Event_Mixin;
    Game_Event_Mixin._initialize = Game_Event.prototype.initialize;
    Game_Event_Mixin._initMembers = Game_Event.prototype.initMembers;
    Game_Event_Mixin._event = Game_Event.prototype.event;
    Game_Event_Mixin._refresh = Game_Event.prototype.refresh;
    mixin(Game_Event, Game_Event_Mixin);

    // ts/ARPG_Core/ARPG_DynamicEvent/Game_Map.ts
    var _Game_Map_Mixin = class extends Game_Map {
        initialize() {
            _Game_Map_Mixin._initialize.call(this);
            this._makeEventId = 0;
        }
        setup(mapId) {
            _Game_Map_Mixin._setup.call(this, mapId);
            this._makeEventId = 0;
        }
        update(sceneActive) {
            _Game_Map_Mixin._update.call(this, sceneActive);
            for (const event of this.events()) {
                if (event.isDynamicEvent() && event.isErased()) {
                    this.eraseDynamicEvent(event.eventId());
                }
            }
        }
        makeDynamicEvent(srcMapId, srcEventIdOrName, x = 0, y = 0) {
            let srcEventId;
            if (typeof srcEventIdOrName === "number") {
                srcEventId = srcEventIdOrName;
            } else if (srcEventIdOrName.match(/^\d+$/)) {
                srcEventId = parseInt(srcEventIdOrName);
            } else {
                srcEventId = this.nameToId(srcMapId, srcEventIdOrName);
            }
            if (this._makeEventId === 0) {
                this._makeEventId = this.maxEventId();
            }
            this._makeEventId++;
            const opt = { isDynamicEvent: true, srcMapId, srcEventId };
            const event = new Game_Event($gameMap.mapId(), this._makeEventId, opt);
            this._events[event.eventId()] = event;
            event.setPosition(x, y);
            return event;
        }
        eraseEvent(eventId) {
            _Game_Map_Mixin._eraseEvent.call(this, eventId);
            const event = $gameMap.event(eventId);
            if (event.isDynamicEvent()) {
                this.eraseDynamicEvent(eventId);
            }
        }
        eraseDynamicEvent(eventId) {
            this._events[eventId] = void 0;
            delete this._events[eventId];
            $gameSelfSwitches.clearSelfSwitches(this._mapId, eventId);
            $gameVariables.clearSelfVariables(this._mapId, eventId);
            $gameSwitches.clearExSelfSwitches(this._mapId, eventId);
        }
        maxEventId() {
            let maxEventId = 0;
            for (const event of $gameMap.events()) {
                if (event.eventId() > maxEventId) {
                    maxEventId = event.eventId();
                }
            }
            return maxEventId;
        }
        nameToId(srcMapId, srcEventName) {
            const mapData = $gameTemp.mapDataCache(srcMapId);
            for (const eventData of mapData.events) {
                if (!eventData)
                    continue;
                if (eventData.name === srcEventName) {
                    return eventData.id;
                }
            }
            throw new Error(`Event name(${srcEventName}) is not found.`);
        }
    };
    var Game_Map_Mixin = _Game_Map_Mixin;
    Game_Map_Mixin._initialize = Game_Map.prototype.initialize;
    Game_Map_Mixin._setup = Game_Map.prototype.setup;
    Game_Map_Mixin._update = Game_Map.prototype.update;
    Game_Map_Mixin._eraseEvent = Game_Map.prototype.eraseEvent;
    mixin(Game_Map, Game_Map_Mixin);

    // ts/ARPG_Core/ARPG_DynamicEvent/Game_Temp.ts
    var _Game_Temp_Mixin = class extends Game_Temp {
        initialize() {
            _Game_Temp_Mixin._initialize.call(this);
            this._mapDataCaches = /* @__PURE__ */ new Map();
        }
        // mapIdが0の場合は初回に設定されたマップデータキャッシュを返す。
        mapDataCache(mapId) {
            if (mapId === 0) {
                if (this._firstMapDataCacheMapId == null) {
                    throw new Error(`_firstMapDataCacheMapId is undefined.`);
                }
                return this._mapDataCaches.get(this._firstMapDataCacheMapId);
            }
            return this._mapDataCaches.get(mapId);
        }
        setMapDataCache(mapId, mapData) {
            if (this._firstMapDataCacheMapId == null) {
                this._firstMapDataCacheMapId = mapId;
            }
            this._mapDataCaches.set(mapId, mapData);
        }
    };
    var Game_Temp_Mixin = _Game_Temp_Mixin;
    Game_Temp_Mixin._initialize = Game_Temp.prototype.initialize;
    mixin(Game_Temp, Game_Temp_Mixin);

    // ts/CommonLibrary/HttpResponse.ts
    var HttpResponse = class {
        constructor(result, xhr) {
            this._result = result;
            this._xhr = xhr;
        }
        result() {
            return this._result;
        }
        status() {
            return this._xhr.status;
        }
        response() {
            return this._xhr.response;
        }
    };

    // ts/CommonLibrary/HttpRequest.ts
    var HttpRequest = class {
        static get(path, opt = {}) {
            const req = new HttpRequest(path, "GET", opt);
            return req.send();
        }
        static post(path, params, opt = {}) {
            const req = new HttpRequest(path, "POST", opt);
            return req.send(params);
        }
        constructor(path, method, opt = {}) {
            this._path = path;
            this._method = method;
            this._mimeType = opt.mimeType == null ? void 0 : opt.mimeType;
        }
        send(params = null) {
            const xhr = new XMLHttpRequest();
            xhr.open(this._method, this._path);
            if (this._mimeType)
                xhr.overrideMimeType(this._mimeType);
            let json;
            if (params)
                json = JSON.stringify(params);
            const promise = new Promise((resolve, reject) => {
                xhr.addEventListener("load", (e) => {
                    resolve(new HttpResponse("load", xhr));
                });
                xhr.addEventListener("error", (e) => {
                    reject(new HttpResponse("error", xhr));
                });
            });
            xhr.send(json);
            return promise;
        }
    };

    // ts/CommonLibrary/MapLoader.ts
    var MapLoader = class {
        constructor(mapId) {
            this._mapId = mapId;
            this.loadMap();
        }
        mapId() {
            return this._mapId;
        }
        isLoaded() {
            return !!this._mapData;
        }
        mapData() {
            return this._mapData;
        }
        loadMap() {
            const fileName = "Map%1.json".format(this._mapId.padZero(3));
            this.loadData(fileName);
        }
        async loadData(fileName) {
            const res = await HttpRequest.get(`data/${fileName}`, { mimeType: "application/json" });
            if (res.result() === "error") {
                throw new Error(`Unknow file: ${fileName}`);
            } else if (res.status() === 200) {
                this._mapData = JSON.parse(res.response());
            } else {
                throw new Error(`Load failed: ${fileName}`);
            }
        }
    };

    // ts/ARPG_Core/ARPG_DynamicEvent/Scene_Map.ts
    var _Scene_Map_Mixin = class extends Scene_Map {
        initialize() {
            _Scene_Map_Mixin._initialize.call(this);
            this._mapLoaders = [];
        }
        create() {
            _Scene_Map_Mixin._create.call(this);
            this.preMapLoad();
        }
        isReady() {
            for (const mapLoader of this._mapLoaders) {
                if (!mapLoader.isLoaded())
                    return false;
            }
            return _Scene_Map_Mixin._isReady.call(this);
        }
        onMapLoaded() {
            for (const mapLoader of this._mapLoaders) {
                const mapData = mapLoader.mapData();
                $gameTemp.setMapDataCache(mapLoader.mapId(), mapData);
                DataManager.extractMetadata(mapData);
                DataManager.extractArrayMetadata(mapData.events);
            }
            _Scene_Map_Mixin._onMapLoaded.call(this);
        }
        preMapLoad() {
            for (const mapId of ARPG_CorePluginParams.CopyEventSetting.DynamicEventSrcMapIds) {
                const mapData = $gameTemp.mapDataCache(mapId);
                if (!mapData) {
                    const mapLoader = new MapLoader(mapId);
                    this._mapLoaders.push(mapLoader);
                }
            }
        }
    };
    var Scene_Map_Mixin = _Scene_Map_Mixin;
    Scene_Map_Mixin._initialize = Scene_Map.prototype.initialize;
    Scene_Map_Mixin._create = Scene_Map.prototype.create;
    Scene_Map_Mixin._isReady = Scene_Map.prototype.isReady;
    Scene_Map_Mixin._onMapLoaded = Scene_Map.prototype.onMapLoaded;
    mixin(Scene_Map, Scene_Map_Mixin);

    // ts/ARPG_Core/ARPG_DynamicEvent/Spriteset_Map.ts
    var _Spriteset_Map_Mixin = class extends Spriteset_Map {
        update() {
            _Spriteset_Map_Mixin._update.call(this);
            this.updateCreateCharacterSprites();
        }
        updateCreateCharacterSprites() {
            const mapEvents = /* @__PURE__ */ new Set([...$gameMap.events()]);
            const hasSpriteEvents = /* @__PURE__ */ new Set();
            for (const sprite of this._characterSprites) {
                const character = sprite.character();
                if (character instanceof Game_Event) {
                    hasSpriteEvents.add(character);
                }
            }
            for (const event of mapEvents) {
                if (!hasSpriteEvents.has(event))
                    this.createCharacterSprite(event);
            }
            for (const event of hasSpriteEvents) {
                if (!mapEvents.has(event))
                    this.deleteCharacterSprite(event);
            }
        }
        createCharacterSprite(character) {
            const sprite = new Sprite_Character(character);
            this._characterSprites.push(sprite);
            this._tilemap.addChild(sprite);
        }
        deleteCharacterSprite(character) {
            const sprite = this.findTargetSprite(character);
            if (!sprite)
                return;
            if (character.isAnimationPlaying())
                return;
            this._characterSprites = this._characterSprites.filter((characterSprite) => characterSprite !== sprite);
            this._tilemap.removeChild(sprite);
        }
    };
    var Spriteset_Map_Mixin = _Spriteset_Map_Mixin;
    Spriteset_Map_Mixin._update = Spriteset_Map.prototype.update;
    mixin(Spriteset_Map, Spriteset_Map_Mixin);

    // ts/ARPG_Core/ARPG_DynamicEvent/Sprite_Character.ts
    var Sprite_Character_Mixin = class extends Sprite_Character {
        character() {
            return this._character;
        }
    };
    mixin(Sprite_Character, Sprite_Character_Mixin);

    // ts/ARPG_Core/ARPG_DynamicEvent/Game_SelfSwitches.ts
    var Game_SelfSwitches_Mixin = class extends Game_SelfSwitches {
        clearSelfSwitches(mapId, eventId, switchName) {
            for (const key in this._data) {
                const keyParams = key.split(",");
                const keyMapId = parseInt(keyParams[0]);
                const keyEventId = parseInt(keyParams[1]);
                const keySwitchName = keyParams[2];
                if (keyMapId === mapId && (eventId == null || keyEventId === eventId) && (switchName == null || keySwitchName === switchName)) {
                    delete this._data[key];
                }
            }
        }
    };
    mixin(Game_SelfSwitches, Game_SelfSwitches_Mixin);

    // ts/ARPG_Core/ARPG_DamagePopup/Sprite_FieldDamage.ts
    var Sprite_FieldDamage = class extends Sprite_Damage {
        initialize() {
            super.initialize();
            if (ARPG_CorePluginParams.UseImageDamage) {
                this._damageBitmap = ImageManager.loadSystem("Damage");
            }
        }
        digitWidth() {
            return this._damageBitmap ? this._damageBitmap.width / 10 : 0;
        }
        digitHeight() {
            return this._damageBitmap ? this._damageBitmap.height / 5 : 0;
        }
        setActionResult(actionResult) {
            this._actionResult = actionResult;
        }
        setup(target) {
            const result = this._actionResult;
            if (!result)
                throw new Error(`actionResult is undefined.`);
            this._actionResult = void 0;
            if (result.missed || result.evaded) {
                this._colorType = 0;
                this.createMiss();
            } else if (result.hpAffected) {
                this._colorType = result.hpDamage >= 0 ? 0 : 1;
                this.createDigits(result.hpDamage);
            } else if (target.isAlive() && result.mpDamage !== 0) {
                this._colorType = result.mpDamage >= 0 ? 2 : 3;
                this.createDigits(result.mpDamage);
            }
            if (result.critical) {
                this.setupCriticalEffect();
            }
        }
        createMiss() {
            if (ARPG_CorePluginParams.UseImageDamage) {
                const w = this.digitWidth();
                const h = this.digitHeight();
                const sprite = this.createChildImageSprite();
                sprite.setFrame(0, 4 * h, 4 * w, h);
                sprite.dy = 0;
            } else {
                super.createMiss();
            }
        }
        createDigits(value) {
            if (ARPG_CorePluginParams.UseImageDamage) {
                const baseRow = 0;
                const string = Math.abs(value).toString();
                const row = baseRow + (value < 0 ? 1 : 0);
                const w = this.digitWidth();
                const h = this.digitHeight();
                for (let i = 0; i < string.length; i++) {
                    const sprite = this.createChildImageSprite();
                    const n = Number(string[i]);
                    sprite.setFrame(n * w, row * h, w, h);
                    sprite.x = (i - (string.length - 1) / 2) * w;
                    sprite.dy = -i;
                }
            } else {
                super.createDigits(value);
            }
        }
        createChildImageSprite() {
            const sprite = new Sprite();
            sprite.bitmap = this._damageBitmap;
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 1;
            sprite.y = -40;
            sprite.ry = sprite.y;
            this.addChild(sprite);
            return sprite;
        }
        destroy(options) {
            if (ARPG_CorePluginParams.UseImageDamage) {
                Sprite.prototype.destroy.call(this, options);
            } else {
                super.destroy(options);
            }
        }
    };
    Sprite_FieldDamage._initialize = Sprite_Damage.prototype.initialize;
    Sprite_FieldDamage._createMiss = Sprite_Damage.prototype.createMiss;
    Sprite_FieldDamage._createDigits = Sprite_Damage.prototype.createDigits;
    Sprite_FieldDamage._destroy = Sprite_Damage.prototype.destroy;

    // ts/ARPG_Core/ARPG_DamagePopup/Sprite_Character.ts
    var _Sprite_Character_Mixin = class extends Sprite_Character {
        initMembers() {
            _Sprite_Character_Mixin._initMembers.call(this);
            this._damages = [];
        }
        update() {
            _Sprite_Character_Mixin._update.call(this);
            const character = this._character;
            if (character.isBattler()) {
                this.setBattler(character.battler().battler());
            } else {
                this.setBattler(void 0);
            }
            this.updateDamagePopup();
        }
        setBattler(battler) {
            this._battler = battler;
        }
        updateDamagePopup() {
            if (!this._battler)
                return;
            this.setupDamagePopup();
            if (this._damages.length > 0) {
                for (const damage of this._damages) {
                    damage.update();
                }
                if (!this._damages[0].isPlaying()) {
                    this.destroyDamageSprite(this._damages[0]);
                }
            }
        }
        setupDamagePopup() {
            const actionResult = $gameTemp.checkRequestedFieldDamagePopup(this._character);
            if (actionResult) {
                this.createDamageSprite(actionResult);
            }
        }
        createDamageSprite(actionResult) {
            const last = this._damages[this._damages.length - 1];
            const sprite = new Sprite_FieldDamage();
            if (last) {
                sprite.x = last.x + 8;
                sprite.y = last.y - 16;
            } else {
                sprite.x = this.x + this.damageOffsetX();
                sprite.y = this.y + this.damageOffsetY();
            }
            sprite.setActionResult(actionResult);
            sprite.setup(this._battler);
            this._damages.push(sprite);
            this.parent.addChild(sprite);
        }
        destroyDamageSprite(sprite) {
            this.parent.removeChild(sprite);
            this._damages.remove(sprite);
            sprite.destroy();
        }
        damageOffsetX() {
            return 0;
        }
        damageOffsetY() {
            return 0;
        }
    };
    var Sprite_Character_Mixin2 = _Sprite_Character_Mixin;
    Sprite_Character_Mixin2._initMembers = Sprite_Character.prototype.initMembers;
    Sprite_Character_Mixin2._update = Sprite_Character.prototype.update;
    mixin(Sprite_Character, Sprite_Character_Mixin2);

    // ts/ARPG_Core/ARPG_DamagePopup/Scene_Map.ts
    var _Scene_Map_isReady = Scene_Map.prototype.isReady;
    Scene_Map.prototype.isReady = function() {
        let ready = true;
        const result = _Scene_Map_isReady.call(this);
        if (!result)
            ready = false;
        if (ARPG_CorePluginParams.UseImageDamage) {
            const damageBitmap = ImageManager.loadSystem("Damage");
            if (!damageBitmap.isReady())
                ready = false;
        }
        return ready;
    };

    // ts/ARPG_Core/ARPG_State/Main.ts
    var _Game_Battler_Mixin = class extends Game_Battler {
        clearStates() {
            _Game_Battler_Mixin._clearStates.call(this);
            this._statesDuration = [];
        }
        addState(stateId) {
            _Game_Battler_Mixin._addState.call(this, stateId);
            const state = $dataStates[stateId];
            if (typeof state.meta.duration === "string") {
                let update = false;
                if (!(this._statesDuration[stateId] != null && this._statesDuration[stateId] > 0)) {
                    update = true;
                } else if (state.meta.overWriteDuration) {
                    update = true;
                }
                if (update) {
                    const duration = parseInt(state.meta.duration);
                    this._statesDuration[stateId] = duration;
                }
            }
        }
        eraseState(stateId) {
            _Game_Battler_Mixin._eraseState.call(this, stateId);
            delete this._statesDuration[stateId];
        }
        updateStatesDuration() {
            if ($gameMap.isEventRunning())
                return;
            for (const stateId of this._states) {
                if (this._statesDuration[stateId] == null)
                    continue;
                if (this._statesDuration[stateId] > 0) {
                    this._statesDuration[stateId]--;
                    if (this._statesDuration[stateId] <= 0) {
                        this.eraseState(stateId);
                    }
                }
            }
        }
    };
    var Game_Battler_Mixin = _Game_Battler_Mixin;
    Game_Battler_Mixin._clearStates = Game_Battler.prototype.clearStates;
    Game_Battler_Mixin._addState = Game_Battler.prototype.addState;
    Game_Battler_Mixin._eraseState = Game_Battler.prototype.eraseState;
    mixin(Game_Battler, Game_Battler_Mixin);

    // ts/ARPG_Core/ARPG_TargetSelect/Main.ts
    var import_DotMoveSystem2 = __require("DotMoveSystem");
    var TargetSelecter = class extends Component {
        constructor(selectTargetType, opt = {}) {
            super();
            this._onlyNearTheScreen = opt.onlyNearTheScreen ?? true;
            this._selectTargetType = selectTargetType;
        }
        start() {
            super.start();
            let target;
            if (this._selectTargetType === "actor") {
                ({ character: target } = ARPG_Utils.searchNearBattler($gamePlayer, "friend"));
            } else {
                ({ character: target } = ARPG_Utils.searchNearBattler($gamePlayer, "opponent"));
            }
            if (target && target.isInTheScreen(0, 0)) {
                $gameTemp.arpgGlobalTempData().selectingTarget = target;
            } else {
                $gameMap.endTargetSelect();
            }
        }
        update() {
            super.update();
            if (Input.isTriggered("left")) {
                this.prevSelect();
            } else if (Input.isTriggered("right")) {
                this.nextSelect();
            } else if (Input.isTriggered("ok")) {
                this.doSelect();
            }
        }
        touchCharacter(character) {
            const allCharacters = this.allCharactersByTargetType();
            for (const chr of allCharacters) {
                if (chr === character) {
                    if (character === $gameTemp.arpgGlobalTempData().selectingTarget) {
                        this.doSelect();
                    } else {
                        this.doChangeSelectingTarget(character);
                    }
                    return;
                }
            }
        }
        nextSelect() {
            const character = this.searchNextCharacter();
            if (character) {
                this.doChangeSelectingTarget(character);
            }
        }
        prevSelect() {
            const character = this.searchPrevCharacter();
            if (character) {
                this.doChangeSelectingTarget(character);
            }
        }
        doChangeSelectingTarget(targetCharacter) {
            SoundManager.playCursor();
            $gameTemp.arpgGlobalTempData().selectingTarget = targetCharacter;
        }
        doSelect() {
            SoundManager.playOk();
            const arpgGlobalTempData = $gameTemp.arpgGlobalTempData();
            const target = arpgGlobalTempData.selectingTarget;
            if (target) {
                if (arpgGlobalTempData.selectedTargetCharacterKindVariableId > 0) {
                    $gameVariables.setValue(arpgGlobalTempData.selectedTargetCharacterKindVariableId, ARPG_Utils.characterKindValue(target));
                }
                if (target instanceof Game_Event && arpgGlobalTempData.selectedTargetEventIdVariableId > 0) {
                    $gameVariables.setValue(arpgGlobalTempData.selectedTargetEventIdVariableId, target.eventId());
                }
                if (arpgGlobalTempData.selectResultSwitchId > 0) {
                    $gameSwitches.setValue(arpgGlobalTempData.selectResultSwitchId, true);
                }
            }
            $gameMap.endTargetSelect();
        }
        searchNextCharacter() {
            const allCharacters = this.allCharactersByTargetType();
            if (allCharacters.length <= 1)
                return void 0;
            const index = allCharacters.indexOf($gameTemp.arpgGlobalTempData().selectingTarget);
            if (index >= 0) {
                if (index < allCharacters.length - 1) {
                    return allCharacters[index + 1];
                } else {
                    return allCharacters[0];
                }
            }
            return void 0;
        }
        searchPrevCharacter() {
            const allCharacters = this.allCharactersByTargetType();
            if (allCharacters.length <= 1)
                return void 0;
            const index = allCharacters.indexOf($gameTemp.arpgGlobalTempData().selectingTarget);
            if (index >= 0) {
                if (index > 0) {
                    return allCharacters[index - 1];
                } else {
                    return allCharacters[allCharacters.length - 1];
                }
            }
            return void 0;
        }
        allCharactersByTargetType() {
            let characters;
            if (this._selectTargetType === "actor") {
                characters = ARPG_Utils.allAliveActorCharacters();
            } else {
                characters = ARPG_Utils.allAliveEnemyCharacters();
            }
            if (this._onlyNearTheScreen) {
                characters = characters.filter((character) => character.isInTheScreen(0, 0));
            }
            return characters;
        }
    };
    var TriangleDrawer = class {
        constructor(bitmap) {
            this._bitmap = bitmap;
        }
        drawTriangle(x1, y1, x2, y2, x3, y3, strokeColor, fillColor) {
            const ctx = this._bitmap.context;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.closePath();
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = fillColor;
            ctx.fill();
        }
    };
    var SpriteMover = class extends Component {
        constructor(moveSpeed) {
            super();
            this._moveSpeed = moveSpeed;
            this._targetX = 0;
            this._targetY = 0;
            this._moving = false;
        }
        get moveSpeed() {
            return this._moveSpeed;
        }
        set moveSpeed(_moveSpeed) {
            this._moveSpeed = _moveSpeed;
        }
        update() {
            super.update();
            if (this._moving)
                this.updateMove();
        }
        updateMove() {
            const sprite = this.user();
            const oy = this._targetY - sprite.y;
            const ox = this._targetX - sprite.x;
            const rad = Math.atan2(oy, ox);
            const disX = this._moveSpeed * Math.cos(rad);
            const disY = this._moveSpeed * Math.sin(rad);
            sprite.x += disX;
            sprite.y += disY;
            if (disX < 0 && sprite.x + disX < this._targetX || disX > 0 && sprite.x + disX > this._targetX)
                sprite.x = this._targetX;
            if (disY < 0 && sprite.y + disY < this._targetY || disY > 0 && sprite.y + disY > this._targetY)
                sprite.y = this._targetY;
            if (sprite.x === this._targetX && sprite.y === this._targetY)
                this._moving = false;
        }
        isMoving() {
            return this._moving;
        }
        isBusy() {
            return this.isMoving();
        }
        startMove(targetPoint) {
            this._targetX = targetPoint.x;
            this._targetY = targetPoint.y;
            this._moving = true;
        }
        changeTarget(targetPoint) {
            this._targetX = targetPoint.x;
            this._targetY = targetPoint.y;
        }
        fastMove(targetPoint) {
            this.user().x = targetPoint.x;
            this.user().y = targetPoint.y;
            this._moving = false;
        }
        forceEndMove() {
            this.user().x = this._targetX;
            this.user().y = this._targetY;
            this._moving = false;
        }
    };
    var _CursorAnimation = class extends Component {
        constructor() {
            super();
            this._nowAnimation = true;
            this._animationTime = 0;
            this._animationSign = 1;
        }
        update() {
            super.update();
            if (this._nowAnimation)
                this.updateAnimation();
        }
        updateAnimation() {
            if (this._animationTime >= 0) {
                this.user().y = this._animationTime / 4;
            } else {
                this.user().y = -this._animationTime / 4;
            }
            this._animationTime += this._animationSign;
            if (this._animationTime >= _CursorAnimation.MAX_ANIMATION_TIME) {
                this._animationSign = -1;
            } else if (this._animationTime <= -_CursorAnimation.MAX_ANIMATION_TIME) {
                this._animationSign = 1;
            }
        }
    };
    var CursorAnimation = _CursorAnimation;
    CursorAnimation.MAX_ANIMATION_TIME = 30;
    var Sprite_CursorArrow = class extends Sprite {
        initialize() {
            super.initialize();
            this.createBitmap();
            this.anchor.x = 0.5;
            this.anchor.y = 1;
            this.addComponent(new CursorAnimation());
        }
        createBitmap() {
            if (ARPG_CorePluginParams.UseImageTargetSelectCursor) {
                this.bitmap = ImageManager.loadBitmap("img/", ARPG_CorePluginParams.TargetSelectCursorImageFileName);
            } else {
                this.bitmap = new Bitmap(32, 24);
                const w = 32;
                const h = 24;
                const x1 = 0;
                const y1 = 0;
                const x2 = x1 + w;
                const y2 = 0;
                const x3 = (x1 + w) / 2;
                const y3 = h;
                this.drawTriangle(x1, y1, x2, y2, x3, y3, "#000000", "#ffffff");
            }
        }
        drawTriangle(x1, y1, x2, y2, x3, y3, strokeColor, fillColor) {
            new TriangleDrawer(this.bitmap).drawTriangle(x1, y1, x2, y2, x3, y3, strokeColor, fillColor);
        }
    };
    var _Sprite_TargetSelect = class extends Sprite {
        initialize() {
            super.initialize();
            this.hide();
            this.anchor.x = 0.5;
            this.anchor.y = 1;
            const cusrorArrow = new Sprite_CursorArrow();
            this.addChild(cusrorArrow);
            this._mover = new SpriteMover(1);
            this.addComponent(this._mover);
        }
        update() {
            super.update();
            let needShow = false;
            const target = $gameTemp.arpgGlobalTempData().selectingTarget;
            if (target) {
                const targetSprite = target.getSprite();
                if (targetSprite) {
                    needShow = true;
                    if (this._lastTarget === target) {
                        if (!this._mover.isMoving()) {
                            this.x = targetSprite.x;
                            this.y = targetSprite.y - targetSprite.height;
                        }
                    } else {
                        let fast = this._lastTarget == null;
                        this.moveToTarget(targetSprite, fast);
                        this._lastTarget = target;
                    }
                }
            }
            if (needShow) {
                this.show();
            } else {
                this.hide();
                this._lastTarget = void 0;
            }
        }
        moveToTarget(target, fast = false) {
            const targetPos = new import_DotMoveSystem2.DotMovePoint(target.x, target.y - target.height);
            if (fast) {
                this._mover.fastMove(targetPos);
            } else {
                const fromPos = new import_DotMoveSystem2.DotMovePoint(this.x, this.y);
                this._mover.moveSpeed = this.calcCursorMoveSpeed(fromPos, targetPos);
                this._mover.startMove(targetPos);
            }
        }
        calcCursorMoveSpeed(fromPos, targetPos) {
            return fromPos.calcFar(targetPos) / _Sprite_TargetSelect.CURSOR_MOVE_DURATION;
        }
    };
    var Sprite_TargetSelect = _Sprite_TargetSelect;
    Sprite_TargetSelect.CURSOR_MOVE_DURATION = 8;
    var _Spriteset_Map_Mixin2 = class extends Spriteset_Map {
        createLowerLayer() {
            _Spriteset_Map_Mixin2._createLowerLayer.call(this);
            this.createTargetSelectSprite();
        }
        createTargetSelectSprite() {
            this._targetSelectSprite = new Sprite_TargetSelect();
            this._tilemap.addChild(this._targetSelectSprite);
        }
    };
    var Spriteset_Map_Mixin2 = _Spriteset_Map_Mixin2;
    Spriteset_Map_Mixin2._createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
    mixin(Spriteset_Map, Spriteset_Map_Mixin2);
    var _Game_Map_Mixin2 = class extends Game_Map {
        initialize() {
            _Game_Map_Mixin2._initialize.call(this);
            this._targetSelecting = false;
            this._targetSelectCancelable = false;
        }
        startTargetSelect(opt = {}) {
            const wait = opt.wait ?? false;
            const cancelable = opt.cancelable ?? false;
            this._targetSelecting = true;
            this._targetSelectCancelable = cancelable;
            $gamePlayer.onStartTargetSelect();
            this._targetSelecter = new TargetSelecter("enemy", { onlyNearTheScreen: opt.onlyNearTheScreen });
            $gameTemp.arpgGlobalTempData().controlCharacter.addComponent(this._targetSelecter);
            if (wait) {
                this.stop();
            }
        }
        isTargetSelecting() {
            return this._targetSelecting;
        }
        isTargetSelectCancelable() {
            return this._targetSelectCancelable;
        }
        endTargetSelect() {
            if (this._targetSelecting) {
                this._targetSelecting = false;
                $gamePlayer.onEndTargetSelect();
                $gameTemp.arpgGlobalTempData().selectingTarget = void 0;
                this._targetSelecter?.end();
                this._targetSelecter = void 0;
            }
            this.resume();
        }
        touchCharacter(character) {
            if (!this.isTargetSelecting())
                return;
            if (!this._targetSelecter)
                return;
            this._targetSelecter.touchCharacter(character);
        }
    };
    var Game_Map_Mixin2 = _Game_Map_Mixin2;
    Game_Map_Mixin2._initialize = Game_Map.prototype.initialize;
    Game_Map_Mixin2._update = Game_Map.prototype.update;
    mixin(Game_Map, Game_Map_Mixin2);
    var _Scene_Map_Mixin2 = class extends Scene_Map {
        update() {
            _Scene_Map_Mixin2._update.call(this);
            this.updateTargetSelect();
        }
        isMenuEnabled() {
            const result = _Scene_Map_Mixin2._isMenuEnabled.call(this);
            if (!result)
                return false;
            if ($gameMap.isTargetSelecting())
                return false;
            return true;
        }
        updateTargetSelect() {
            if (this.isMenuCalled() && $gameMap.isTargetSelectCancelable()) {
                $gameMap.endTargetSelect();
            }
        }
        onMapTouch() {
            if ($gameMap.isTargetSelecting())
                return;
            _Scene_Map_Mixin2._onMapTouch.call(this);
        }
    };
    var Scene_Map_Mixin2 = _Scene_Map_Mixin2;
    Scene_Map_Mixin2._update = Scene_Map.prototype.update;
    Scene_Map_Mixin2._updateCallMenu = Scene_Map.prototype.updateCallMenu;
    Scene_Map_Mixin2._isMenuEnabled = Scene_Map.prototype.isMenuEnabled;
    Scene_Map_Mixin2._onMapTouch = Scene_Map.prototype.onMapTouch;
    mixin(Scene_Map, Scene_Map_Mixin2);

    // ts/CommonLibrary/TimerComponent.ts
    var TimerComponent = class extends Component {
        constructor(timeoutCallback) {
            super();
            this._time = 0;
            this._timeoutFlag = false;
            this._timeoutCallback = timeoutCallback;
        }
        update() {
            super.update();
            if (this._time > 0) {
                this._time--;
                if (this._time === 0) {
                    this.timeoutProcess();
                }
            }
        }
        startTimer(time) {
            this.resume();
            if (time > 0) {
                this._time = time;
                this._timeoutFlag = false;
            } else {
                this.forceTimeout();
            }
        }
        checkTimeout() {
            if (this._timeoutFlag) {
                this._timeoutFlag = false;
                this.stop();
                return true;
            }
            return false;
        }
        isTimerRunning() {
            if (this.isStopped())
                return false;
            if (this._time === 0)
                return false;
            return true;
        }
        forceTimeout() {
            this._time = 0;
            this.timeoutProcess();
        }
        cancel() {
            this._time = 0;
            this._timeoutFlag = false;
        }
        timeoutProcess() {
            this._timeoutFlag = true;
            if (this._timeoutCallback)
                this._timeoutCallback();
        }
    };

    // ts/ARPG_Core/Game_ControlCharacter.ts
    var CHANGE_ACTOR_WAIT_TIME = 10;
    var Game_ControlCharacter = class extends Game_Character {
        setup(skillNameWindowController) {
            this.addComponent(skillNameWindowController);
            this.addComponent(new VisibleHitBoxProcess());
            this.addComponent(new ChangeActorProcess());
        }
    };
    var VisibleHitBoxProcess = class extends Component {
        update() {
            super.update();
            if (!$gameTemp.isPlaytest())
                return;
            const keysym = ARPG_Utils.getKeySymbol("VisibleHitBox");
            if (keysym && Input.isTriggered(keysym)) {
                const visibleHitBoxSwitchValue = $gameSwitches.value(ARPG_CorePluginParams.HitBoxSetting.VisibleHitAreaSwitchId);
                $gameSwitches.setValue(ARPG_CorePluginParams.HitBoxSetting.VisibleHitAreaSwitchId, !visibleHitBoxSwitchValue);
            }
        }
    };
    var ChangeActorProcess = class extends Component {
        constructor() {
            super(...arguments);
            this._waitChangeActorTimer = new TimerComponent();
        }
        setup() {
            super.setup();
            this.addComponent(this._waitChangeActorTimer);
        }
        update() {
            super.update();
            let request = $gameTemp.checkRequestedChangeNextActor();
            if (request) {
                if (request.force) {
                    this.forceChangeNextActor();
                } else {
                    this.changeNextActor();
                }
            } else {
                const enableSwitchId = ARPG_CorePluginParams.EnableChangeControlActorSwitchId;
                if (enableSwitchId === 0 || $gameSwitches.value(enableSwitchId)) {
                    const keysym = ARPG_Utils.getKeySymbol("ChangeControlActor");
                    if (keysym && Input.isTriggered(keysym)) {
                        this.changeNextActor();
                    }
                }
            }
            if ($gamePlayer.battler().isAlive() && $gameParty.leader().isAlive()) {
                const leaderActorId = $gameParty.leader().actorId();
                if (leaderActorId != $gamePlayer.battler().actorId()) {
                    $gamePlayer.battler().changeActor(leaderActorId);
                    $gamePlayer.refresh();
                }
            }
        }
        changeNextActor() {
            if (!this.isChangeActorEnabled())
                return;
            if (this._waitChangeActorTimer.isTimerRunning())
                return;
            this.forceChangeNextActor();
        }
        forceChangeNextActor() {
            const changed = $gameParty.changeNextActor($gamePlayer.battler().actorId());
            if ($gamePlayer.isBattler()) {
                $gamePlayer.battler().changeActor($gameParty.leader().actorId());
            }
            if (changed) {
                this._waitChangeActorTimer.startTimer(CHANGE_ACTOR_WAIT_TIME);
                const actorChangeSeParam = ARPG_CorePluginParams.SESetting.ActorChange;
                if (actorChangeSeParam) {
                    const se = {
                        name: actorChangeSeParam.FileName,
                        volume: actorChangeSeParam.Volume,
                        pitch: actorChangeSeParam.Pitch,
                        pan: actorChangeSeParam.Pan,
                        pos: actorChangeSeParam.Pos
                    };
                    AudioManager.playSe(se);
                }
            }
        }
        isChangeActorEnabled() {
            if ($gameMap.isEventRunning())
                return false;
            if (!ARPG_Utils.isChangeActorEnabled())
                return false;
            return true;
        }
    };

    // ts/ARPG_Core/Window_CommonMessage.ts
    var Window_CommonMessage = class extends Window_Base {
        constructor() {
            super(...arguments);
            this._text = "";
        }
        get text() {
            return this._text;
        }
        set text(_text) {
            this._text = _text;
            this.refresh();
        }
        refresh() {
            this.drawText(this.text, 0, 0, this.width - this.padding * 2, "center");
        }
    };

    // ts/ARPG_Core/MessageWindowController.ts
    var _MessageWindowController = class extends Component {
        constructor() {
            super(...arguments);
            this._windowDatas = [];
            this._showWindowTimer = new TimerComponent(this.showWindowTimerTimeout.bind(this));
            this._setupCompleted = false;
            this._afterFirst = false;
            this._manualWait = false;
            this._showWindowGuardTimer = new TimerComponent(this.showWindowGuardTimerTimeout.bind(this));
        }
        start() {
            super.start();
            this.addComponent(this._showWindowTimer);
            this.addComponent(this._showWindowGuardTimer);
        }
        showWindow(text, rect, opt = {}) {
            if (!this._setupCompleted)
                throw new Error("MessageWindowController is not setup completed.");
            const time = opt.time ?? _MessageWindowController.DEFAULT_SHOW_WINDOW_TIME;
            const type = opt.type ?? "common";
            let window2;
            if (type === "common") {
                window2 = new Window_CommonMessage(rect);
            } else {
                throw new Error(`${type} is invalid type.`);
            }
            window2.text = text;
            window2.y = this.calcWindowYPos(this._windowDatas.length);
            this._windowDatas.push(new WindowData(text, rect, window2, type, time));
            if (!this.isManualWaiting() && !this._showWindowTimer.isTimerRunning()) {
                this._showWindowTimer.startTimer(time);
            }
            this._showWindowGuardTimer.startTimer(_MessageWindowController.SHOW_WINDOW_GUARD_TIME);
            this._createWindowCallback(window2);
        }
        startManualWait() {
            if (this._showWindowTimer.isTimerRunning()) {
                this._manualWait = true;
                this._showWindowTimer.stop();
            }
        }
        endManualWait() {
            this._manualWait = false;
            this._showWindowTimer.resume();
        }
        isManualWaiting() {
            return this._manualWait;
        }
        clearAllWindows() {
            for (const winData of this._windowDatas) {
                this._deleteWindowCallback(winData.window);
            }
            this._windowDatas = [];
        }
        sceneStart(createWindowCallback, deleteWindowCallback) {
            this._createWindowCallback = createWindowCallback;
            this._deleteWindowCallback = deleteWindowCallback;
            this._setupCompleted = true;
            if (this._afterFirst) {
                this._windowDatas.forEach((winData, i) => {
                    let window2;
                    if (winData.type === "common") {
                        window2 = new Window_CommonMessage(winData.rect);
                    } else {
                        throw new Error(`${winData.type} is invalid type.`);
                    }
                    window2.text = winData.text;
                    window2.y = this.calcWindowYPos(i);
                    winData.window = window2;
                    this._createWindowCallback(window2);
                });
            } else {
                this._afterFirst = true;
            }
        }
        sceneTerminate() {
            this._setupCompleted = false;
            for (const winData of this._windowDatas) {
                this._deleteWindowCallback(winData.window);
                winData.window = void 0;
            }
        }
        calcWindowYPos(index) {
            return index * 64 + 8;
        }
        showWindowTimerTimeout() {
            const windowData = this._windowDatas.splice(0, 1)[0];
            if (this._windowDatas.length > 0) {
                this._showWindowTimer.startTimer(windowData.time);
            } else {
                this._showWindowGuardTimer.cancel();
            }
            this._windowDatas.forEach((winData, i) => {
                if (winData.window) {
                    winData.window.y = this.calcWindowYPos(i);
                }
            });
            this._deleteWindowCallback(windowData.window);
        }
        // NOTE: 何かしらの要因でウィンドウが破棄されなかった場合、永久的にウィンドウが残り続けるため、
        //       SHOW_WINDOW_GUARD_TIMEが経過した場合強制的に全ウィンドウをクリアする。
        showWindowGuardTimerTimeout() {
            this.clearAllWindows();
            this._manualWait = false;
            this._showWindowTimer.cancel();
        }
    };
    var MessageWindowController = _MessageWindowController;
    MessageWindowController.DEFAULT_SHOW_WINDOW_TIME = 60;
    MessageWindowController.SHOW_WINDOW_GUARD_TIME = 6e3;
    var WindowData = class {
        constructor(text, rect, window2, type, time) {
            this.text = text;
            this.rect = rect;
            this.window = window2;
            this.type = type;
            this.time = time;
        }
    };

    // ts/ARPG_Core/ARPG_GlobalTempData.ts
    var ARPG_GlobalTempData = class {
        constructor() {
            this.selectResultSwitchId = 0;
            this.selectedTargetCharacterKindVariableId = 0;
            this.selectedTargetEventIdVariableId = 0;
            this.controlCharacter = new Game_ControlCharacter();
            this.skillNameWindowController = new MessageWindowController();
            this.controlCharacter.setup(this.skillNameWindowController);
        }
    };

    // ts/ARPG_Core/Game_Temp.ts
    var _Game_Temp_Mixin2 = class extends Game_Temp {
        initialize() {
            _Game_Temp_Mixin2._initialize.call(this);
            this._arpgCharacterTempDatas = /* @__PURE__ */ new Map();
            this._fieldDamagePopupRequest = /* @__PURE__ */ new Map();
        }
        arpgGlobalTempData() {
            if (!this._arpgGlobalTempData) {
                this._arpgGlobalTempData = new ARPG_GlobalTempData();
            }
            return this._arpgGlobalTempData;
        }
        arpgCharacterTempData(character) {
            let tempData = this._arpgCharacterTempDatas.get(character);
            if (tempData)
                return tempData;
            tempData = character.createArpgTempData();
            this._arpgCharacterTempDatas.set(character, tempData);
            return tempData;
        }
        clearUnusedArpgCharacterTempDatas() {
            const allCharacters = $gameMap.allCharacters();
            for (const character of this._arpgCharacterTempDatas.keys()) {
                if (!allCharacters.has(character)) {
                    this._arpgCharacterTempDatas.delete(character);
                }
            }
        }
        requestFieldDamagePopup(character, result) {
            this._fieldDamagePopupRequest.set(character, result);
        }
        checkRequestedFieldDamagePopup(character) {
            const result = this._fieldDamagePopupRequest.get(character);
            this._fieldDamagePopupRequest.delete(character);
            return result;
        }
        requestChangeNextActor(request = {}) {
            this._changeNextActorRequest = request;
        }
        checkRequestedChangeNextActor() {
            if (this._changeNextActorRequest) {
                const request = this._changeNextActorRequest;
                this._changeNextActorRequest = void 0;
                return request;
            }
            return void 0;
        }
    };
    var Game_Temp_Mixin2 = _Game_Temp_Mixin2;
    Game_Temp_Mixin2._initialize = Game_Temp.prototype.initialize;
    mixin(Game_Temp, Game_Temp_Mixin2);

    // ts/ARPG_Core/ARPG_Skill.ts
    var _ARPG_Skill = class {
        constructor(skillOrItem, idOrName) {
            this._actionName = "";
            this._actionCommonEventId = 0;
            this._cancelAcceleration = true;
            this._disableMove = true;
            this._commonEventVariables = [];
            this._commonEventSwitches = [];
            this._skillOrItem = skillOrItem;
            if (typeof idOrName === "number") {
                this._id = idOrName;
            } else {
                if (skillOrItem === "item") {
                    this._id = this.findItemIdByName(idOrName);
                } else {
                    this._id = this.findSkillIdByName(idOrName);
                }
            }
            if (skillOrItem === "skill") {
                this._data = $dataSkills[this._id];
            } else if (skillOrItem === "item") {
                this._data = $dataItems[this._id];
            } else {
                throw new Error(`ARPG_Skill error (skillOrItem=${skillOrItem}, id=${this._id})`);
            }
            if (this._data.meta.params) {
                try {
                    this._params = JSON.parse(`{${this._data.meta.params}}`);
                } catch (e) {
                    throw new Error(`Skill parameter (${this._data.meta.params}) is invalid.`);
                }
            } else {
                this._params = {};
            }
            if (typeof this._data.meta.noAttackFrame === "string") {
                const strNoAttackFrame = this._data.meta.noAttackFrame.replace(/\s/, "");
                this._noAttackFrame = parseInt(strNoAttackFrame);
            } else {
                this._noAttackFrame = _ARPG_Skill.DEFAULT_NO_ATTACK_FRAME;
            }
            if (typeof this._data.meta.noDamageFrame === "string") {
                const strNoDamageFrame = this._data.meta.noDamageFrame.replace(/\s/, "");
                this._noDamageFrame = parseInt(strNoDamageFrame);
            } else {
                this._noDamageFrame = _ARPG_Skill.DEFAULT_NO_DAMAGE_FRANE;
            }
            if (typeof this._data.meta.action === "string") {
                const actionName = this._data.meta.action.replace(/\s/, "");
                if (actionName != null) {
                    this._actionName = actionName;
                    if (actionName.match(/^\d+$/)) {
                        this._actionCommonEventId = parseInt(actionName);
                    } else {
                        const commonEventId = this.searchCommonEventId(actionName);
                        if (commonEventId)
                            this._actionCommonEventId = commonEventId;
                    }
                }
            }
            if (this._data.meta.showSkillName) {
                this._showSkillName = true;
            } else {
                this._showSkillName = false;
            }
            if (typeof this._data.meta.cancelAcceleration === "string" && this._data.meta.cancelAcceleration.match(/\s*false$/)) {
                this._cancelAcceleration = false;
            }
            if (typeof this._data.meta.disableMove === "string" && this._data.meta.disableMove.match(/\s*false$/)) {
                this._disableMove = false;
            }
            this._commonEventSwitches = this.parseCommonEventSwitches();
            this._commonEventVariables = this.parseCommonEventVariables();
        }
        get skillOrItem() {
            return this._skillOrItem;
        }
        get id() {
            return this._id;
        }
        parseCommonEventSwitches() {
            let commonEventSwitches = /* @__PURE__ */ new Set();
            for (const matchData of this._data.note.matchAll(/\<set-sw\s*\:\s*(.+)\s*\>/g)) {
                if (matchData && matchData[1]) {
                    const id = parseInt(matchData[1]);
                    commonEventSwitches.add(id);
                }
            }
            return [...commonEventSwitches];
        }
        parseCommonEventVariables() {
            let commonEventVariables = /* @__PURE__ */ new Set();
            for (const matchData of this._data.note.matchAll(/\<set-var\s*\:\s*(.+)\s*\,\s*(.+)\>/g)) {
                if (matchData && matchData[1] && matchData[2]) {
                    const id = parseInt(matchData[1]);
                    const value = parseInt(matchData[2]);
                    commonEventVariables.add({ id, value });
                }
            }
            return [...commonEventVariables];
        }
        findSkillIdByName(name) {
            for (const skillData of $dataSkills) {
                if (!skillData)
                    continue;
                if (skillData.name === name) {
                    return skillData.id;
                }
            }
            throw new Error(`${name} is not fount in all skills.`);
        }
        findItemIdByName(name) {
            for (const itemData of $dataItems) {
                if (!itemData)
                    continue;
                if (itemData.name === name) {
                    return itemData.id;
                }
            }
            throw new Error(`${name} is not fount in all items.`);
        }
        isSkill() {
            return this._skillOrItem === "skill";
        }
        isItem() {
            return this._skillOrItem === "item";
        }
        params() {
            return this._params;
        }
        commonEventVariables() {
            return this._commonEventVariables;
        }
        commonEventSwitches() {
            return this._commonEventSwitches;
        }
        noAttackFrame() {
            return this._noAttackFrame;
        }
        noDamageFrame() {
            return this._noDamageFrame;
        }
        actionName() {
            return this._actionName;
        }
        actionCommonEventId() {
            return this._actionCommonEventId;
        }
        isOverwriteCollideAttack() {
            return !!this._data.meta.overwriteCollideAttack;
        }
        data() {
            return this._data;
        }
        checkItemScope(list) {
            return list.includes(this._data.scope);
        }
        isForOpponent() {
            return this.checkItemScope([1, 2, 3, 4, 5, 6, 14]);
        }
        isForFriend() {
            return this.checkItemScope([7, 8, 9, 10, 11, 12, 13, 14]);
        }
        isForEveryone() {
            return this.checkItemScope([14]);
        }
        isForAliveFriend() {
            return this.checkItemScope([7, 8, 11, 14]);
        }
        isForDeadFriend() {
            return this.checkItemScope([9, 10]);
        }
        isForUser() {
            return this.checkItemScope([11]);
        }
        isShowSkillName() {
            return this._showSkillName;
        }
        isCancelAcceleration() {
            return this._cancelAcceleration;
        }
        isMoveDisabled() {
            return this._disableMove;
        }
        elementIds() {
            return ARPG_Utils.itemAttackElementIds(this._data);
        }
        searchCommonEventId(commonEventName) {
            const foundCommonEvent = $dataCommonEvents.find((commonEvent) => {
                if (!commonEvent)
                    return false;
                return commonEvent.name === commonEventName;
            });
            if (foundCommonEvent)
                return foundCommonEvent.id;
            return void 0;
        }
    };
    var ARPG_Skill = _ARPG_Skill;
    ARPG_Skill.DEFAULT_NO_ATTACK_FRAME = 60;
    ARPG_Skill.DEFAULT_NO_DAMAGE_FRANE = 30;

    // ts/ARPG_Core/ARPG_EffectResult.ts
    var DamageKind = {
        NONE: 0,
        HP_DAMAGE: 1,
        MP_DAMAGE: 2,
        TP_DAMAGE: 3
    };
    var DamageType = {
        NORMAL: 1,
        MISSED: 2,
        EVADED: 3,
        CRITICAL: 4
    };
    var ARPG_EffectResult = class {
        constructor(actionResult, damageDeg, guardResult) {
            this._actionResult = this.copyActionResult(actionResult);
            this._damageDeg = damageDeg;
            if (guardResult == null) {
                this._guardResult = "NO_GUARD";
            } else {
                this._guardResult = guardResult;
            }
        }
        actionResult() {
            return this._actionResult;
        }
        damageKind() {
            if (this._actionResult.hpAffected) {
                return DamageKind.HP_DAMAGE;
            } else {
                if (this._actionResult.mpDamage > 0) {
                    return DamageKind.MP_DAMAGE;
                } else if (this._actionResult.tpDamage > 0) {
                    return DamageKind.TP_DAMAGE;
                }
            }
            return DamageKind.NONE;
        }
        damageType() {
            if (this._actionResult.missed) {
                return DamageType.MISSED;
            } else if (this._actionResult.evaded) {
                return DamageType.EVADED;
            } else if (this._actionResult.critical) {
                return DamageType.CRITICAL;
            } else {
                return DamageType.NORMAL;
            }
        }
        hpDamageValue() {
            return this._actionResult.hpDamage;
        }
        mpDamageValue() {
            return this._actionResult.mpDamage;
        }
        tpDamageValue() {
            return this._actionResult.tpDamage;
        }
        damageDeg() {
            return this._damageDeg;
        }
        damageDir4() {
            if (this._damageDeg == null)
                return void 0;
            return this._damageDeg.toDirection4(0);
        }
        guardResult() {
            return this._guardResult;
        }
        copyActionResult(actionResult) {
            const copyActionResult = new Game_ActionResult();
            copyActionResult.used = actionResult.used;
            copyActionResult.missed = actionResult.missed;
            copyActionResult.evaded = actionResult.evaded;
            copyActionResult.physical = actionResult.physical;
            copyActionResult.drain = actionResult.drain;
            copyActionResult.critical = actionResult.critical;
            copyActionResult.success = actionResult.success;
            copyActionResult.hpAffected = actionResult.hpAffected;
            copyActionResult.hpDamage = actionResult.hpDamage;
            copyActionResult.mpDamage = actionResult.mpDamage;
            copyActionResult.tpDamage = actionResult.tpDamage;
            copyActionResult.addedStates = actionResult.addedStates;
            copyActionResult.removedStates = actionResult.removedStates;
            copyActionResult.addedBuffs = actionResult.addedBuffs;
            copyActionResult.addedDebuffs = actionResult.addedDebuffs;
            copyActionResult.removedBuffs = actionResult.removedBuffs;
            return copyActionResult;
        }
    };

    // ts/ARPG_Core/ARPG_Effect.ts
    var formulaFuncTbl = /* @__PURE__ */ new Map();
    var ARPG_Effect = class {
        constructor(subject, target, skill, deg) {
            this._subject = subject;
            this._target = target;
            this._skill = skill;
            this._damageDeg = deg;
        }
        applyToTarget() {
            const action = new Game_ARPGAction(this._subject.battler());
            action.setItemObject(this._skill.data());
            action.setGuardResult(this._guardResult);
            action.apply(this._target.battler());
            const result = new ARPG_EffectResult(this._target.battler().result(), this._damageDeg, this._guardResult);
            if (ARPG_CorePluginParams.UseDamagePopup == null || ARPG_CorePluginParams.UseDamagePopup) {
                $gameTemp.requestFieldDamagePopup(this._target.user(), result.actionResult());
            }
            return result;
        }
        testApplyToTarget() {
            const action = new Game_ARPGAction(this._subject.battler());
            action.setItemObject(this._skill.data());
            action.setGuardResult(this._guardResult);
            return action.testApply(this._target.battler());
        }
        damageDir4() {
            if (this._damageDeg == null)
                return void 0;
            return this._damageDeg.toDirection4(0);
        }
        damageDeg() {
            return this._damageDeg;
        }
        setDamageDeg(damageDeg) {
            this._damageDeg = damageDeg;
        }
        subject() {
            return this._subject;
        }
        target() {
            return this._target;
        }
        skill() {
            return this._skill;
        }
        noDamageFrame() {
            return this._skill.noDamageFrame();
        }
        setGuardResult(guardResult) {
            this._guardResult = guardResult;
            if (guardResult != "NO_GUARD") {
                this.setDamageDeg(void 0);
            }
        }
    };
    var Game_ARPGAction = class extends Game_Action {
        setSubject(subject) {
            this._subject = subject;
        }
        subject() {
            return this._subject;
        }
        // ジャストガードの場合、ダメージ関連のリザルトを設定しない。
        apply(target) {
            super.apply(target);
            if (this._guardResult === "JUST_GUARD") {
                target.result().hpAffected = false;
                target.result().missed = false;
                target.result().evaded = false;
            }
        }
        evalDamageFormula(target) {
            try {
                const item = this.item();
                const a = this.subject();
                const b = target;
                const v = $gameVariables._data;
                const sign = [3, 4].includes(item.damage.type) ? -1 : 1;
                const formula = item.damage.formula;
                let func = formulaFuncTbl.get(formula);
                if (!func) {
                    func = new Function("a", "b", "v", `return (${formula});`);
                    formulaFuncTbl.set(formula, func);
                }
                const value = Math.max(func(a, b, v), 0) * sign;
                return isNaN(value) ? 0 : value;
            } catch (e) {
                return 0;
            }
        }
        applyGuard(damage, target) {
            if (this._guardResult === "JUST_GUARD") {
                return 0;
            } else if (this._guardResult === "NORMAL_GUARD") {
                return damage / 2;
            }
            return damage;
        }
        setGuardResult(guardResult) {
            this._guardResult = guardResult;
        }
        // ARPGモードの場合に対応
        testApply(target) {
            return this.testLifeAndDeath(target) && (this.isHpRecover() && target.hp < target.mhp || this.isMpRecover() && target.mp < target.mmp || this.hasItemAnyValidEffects(target) || this.evalDamageFormula(target) !== 0);
        }
        applyCritical(damage) {
            return damage * 2;
        }
    };

    // ts/CommonLibrary/Processor.ts
    var Processor = class extends Component {
        update() {
            super.update();
            if (!this._generator)
                this._generator = this.process();
            const res = this._generator.next();
            if (res.done) {
                this._generator = void 0;
                this.end();
            }
        }
        *waitProcess(waitTime, exitCheckFunc = null) {
            while (waitTime > 0) {
                if (exitCheckFunc) {
                    if (exitCheckFunc())
                        break;
                }
                waitTime--;
                yield;
            }
        }
        *waitComponent(component) {
            while (!component.isStopped())
                yield;
        }
    };

    // ts/CommonLibrary/CommonEventComponent.ts
    var CommonEventComponent = class extends Component {
        constructor(commonEventId) {
            super();
            this._interpreter = new Game_Interpreter();
            this._commonEventId = commonEventId;
        }
        interpreter() {
            return this._interpreter;
        }
        start() {
            super.start();
            const commonEventData = $dataCommonEvents[this._commonEventId];
            if (!commonEventData) {
                this.end();
                return;
            }
            const user = this.user();
            if (user instanceof Game_Event) {
                this._interpreter.setup(commonEventData.list, user.eventId());
            } else {
                this._interpreter.setup(commonEventData.list);
            }
        }
        update() {
            super.update();
            if (this._interpreter.isRunning()) {
                this._interpreter.update();
            } else {
                if (!$gameMessage.isBusy()) {
                    this.end();
                }
            }
        }
        terminate() {
            super.terminate();
            this._interpreter.clear();
        }
    };

    // ts/ARPG_Core/BattlerCommonEventComponent.ts
    var BattlerCommonEventComponent = class extends CommonEventComponent {
        constructor(commonEventId, lock = false) {
            super(commonEventId);
            this._lock = lock;
        }
        start() {
            super.start();
            const character = this.user();
            if (character instanceof Game_Event) {
                const parallelInterpreter = character.interpreter();
                if (parallelInterpreter) {
                    if (this._lock)
                        parallelInterpreter.lock("common_event");
                }
                this._interpreter.setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.UserKindCommonVariableId, 3);
                this._interpreter.setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.UserEventIdCommonVariableId, character.eventId());
            } else if (character instanceof Game_Player) {
                this._interpreter.setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.UserKindCommonVariableId, 1);
            }
        }
        terminate() {
            super.terminate();
            const character = this.user();
            if (character instanceof Game_Event) {
                const parallelInterpreter = character.interpreter();
                if (parallelInterpreter) {
                    if (this._lock)
                        parallelInterpreter.unlock("common_event");
                }
            }
        }
    };

    // ts/ARPG_Core/BattlerRecvDamageCommonEventComponent.ts
    var BattlerRecvDamageCommonEventComponent = class extends BattlerCommonEventComponent {
        constructor(commonEventId, damageEffectResult) {
            super(commonEventId, true);
            this._damageEffectResult = damageEffectResult;
        }
        start() {
            super.start();
            const character = this.user();
            const damageDir4 = this._damageEffectResult.damageDir4();
            let dir;
            if (damageDir4) {
                dir = damageDir4;
            } else {
                dir = character.reverseDir(character.direction());
            }
            if (ARPG_CorePluginParams.BattlerSetting.DamageDegCommonVariableId > 0) {
                this._interpreter.setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.DamageDegCommonVariableId, Degree.fromDirection(dir).value);
            }
            const damageKind = this._damageEffectResult.damageKind();
            if (ARPG_CorePluginParams.BattlerSetting.DamageKindCommonVariableId > 0) {
                this._interpreter.setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.DamageKindCommonVariableId, damageKind);
            }
            if (ARPG_CorePluginParams.BattlerSetting.DamageTypeCommonVariableId > 0) {
                this._interpreter.setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.DamageTypeCommonVariableId, this._damageEffectResult.damageType());
            }
            if (ARPG_CorePluginParams.BattlerSetting.DamageValueCommonVariableId > 0) {
                switch (damageKind) {
                    case DamageKind.HP_DAMAGE:
                        this._interpreter.setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.DamageValueCommonVariableId, this._damageEffectResult.hpDamageValue());
                        break;
                    case DamageKind.MP_DAMAGE:
                        this._interpreter.setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.DamageValueCommonVariableId, this._damageEffectResult.mpDamageValue());
                        break;
                    case DamageKind.TP_DAMAGE:
                        this._interpreter.setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.DamageValueCommonVariableId, this._damageEffectResult.tpDamageValue());
                        break;
                }
            }
        }
    };

    // ts/ARPG_Core/ARPG_CustomManager.ts
    var ARPG_CustomManager = class {
        static addAction(actionName, actionFunc) {
            this._actionTable.set(actionName, actionFunc);
        }
        static getAction(actionName) {
            return this._actionTable.get(actionName);
        }
        static actionComponent(user, skill) {
            if (skill.actionName() !== "") {
                const action = this.getAction(skill.actionName());
                if (action)
                    return action(user, skill);
            }
            if (skill.actionCommonEventId() > 0) {
                return new ActionCommonEventComponent(skill);
            }
            return void 0;
        }
        static actorGuardStart(actor) {
            if (ARPG_CorePluginParams.ActorSetting.StartGuardCommonEventId > 0) {
                return new BattlerCommonEventComponent(ARPG_CorePluginParams.ActorSetting.StartGuardCommonEventId, true);
            }
            return void 0;
        }
        static actorGuardEnd(actor) {
            if (ARPG_CorePluginParams.ActorSetting.EndGuardCommonEventId > 0) {
                return new BattlerCommonEventComponent(ARPG_CorePluginParams.ActorSetting.EndGuardCommonEventId, true);
            }
            return void 0;
        }
        static actorRecvDamageComponent(actor, result, guardResult) {
            if (guardResult === "NORMAL_GUARD") {
                return new BattlerRecvDamageCommonEventComponent(ARPG_CorePluginParams.ActorSetting.NormalGuardCommonEventId, result);
            } else if (guardResult === "JUST_GUARD") {
                return new BattlerRecvDamageCommonEventComponent(ARPG_CorePluginParams.ActorSetting.JustGuardCommonEventId, result);
            } else {
                return new BattlerRecvDamageCommonEventComponent(ARPG_CorePluginParams.ActorSetting.DamageCommonEventId, result);
            }
        }
        static actorDeadComponent(actor, result) {
            return new BattlerDeadCommonEventComponent(ARPG_CorePluginParams.ActorSetting.DeadCommonEventId, result);
        }
        static enemyRecvDamageComponent(enemy, result) {
            return new BattlerRecvDamageCommonEventComponent(enemy.damageCommonEventId(), result);
        }
        static enemyDefeatComponent(enemy, result) {
            return new BattlerDeadCommonEventComponent(enemy.defeatEnemyCommonEventId(), result);
        }
        static gameoverComponent() {
            if (ARPG_CorePluginParams.ActorSetting.GameOverCommonEventId > 0) {
                return new CommonEventComponent(ARPG_CorePluginParams.ActorSetting.GameOverCommonEventId);
            }
            return void 0;
        }
        static chantComponent(battler, chantCommonEventId) {
            if (chantCommonEventId > 0) {
                return new CommonEventComponent(chantCommonEventId);
            }
            return void 0;
        }
        static levelUpComponent(actor) {
            if (ARPG_CorePluginParams.ActorSetting.LevelUpCommonEventId > 0) {
                return new CommonEventComponent(ARPG_CorePluginParams.ActorSetting.LevelUpCommonEventId);
            }
            return void 0;
        }
        static fieldObjectRecvDamageComponent(fieldObject) {
            const damageCommonEventId = fieldObject.damageCommonEventId();
            if (damageCommonEventId > 0) {
                return new CommonEventComponent(damageCommonEventId);
            }
            return void 0;
        }
    };
    ARPG_CustomManager._actionTable = /* @__PURE__ */ new Map();
    var ActionCommonEventComponent = class extends CommonEventComponent {
        constructor(skill) {
            super(skill.actionCommonEventId());
            this._skill = skill;
        }
        start() {
            super.start();
            const character = this.user();
            if (character instanceof Game_Event) {
                this._interpreter.setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.UserKindCommonVariableId, 3);
                this._interpreter.setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.UserEventIdCommonVariableId, character.eventId());
            } else if (character instanceof Game_Player) {
                this._interpreter.setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.UserKindCommonVariableId, 1);
            }
            for (const switchId of this._skill.commonEventSwitches()) {
                this._interpreter.setCommonSwitchValue(switchId, true);
            }
            for (const { id, value } of this._skill.commonEventVariables()) {
                this._interpreter.setCommonVariableValue(id, value);
            }
        }
    };
    var BattlerDeadCommonEventComponent = class extends BattlerCommonEventComponent {
        constructor(commonEventId, result) {
            super(commonEventId, true);
            this._result = result;
        }
        start() {
            super.start();
            const character = this.user();
            const damageDir4 = this._result.damageDir4();
            let dir;
            if (damageDir4) {
                dir = damageDir4;
            } else {
                dir = character.reverseDir(character.direction());
            }
            if (ARPG_CorePluginParams.BattlerSetting.DamageDegCommonVariableId > 0) {
                this.interpreter().setCommonVariableValue(ARPG_CorePluginParams.BattlerSetting.DamageDegCommonVariableId, Degree.fromDirection(dir).value);
            }
        }
    };

    // ts/CommonLibrary/ChainComponent.ts
    var ChainComponent = class extends Component {
        constructor(components) {
            super();
            this._componentIndex = 0;
            this._components = components;
        }
        start() {
            super.start();
            this.updateChain();
        }
        update() {
            super.update();
            this.updateChain();
        }
        updateChain() {
            while (this._componentIndex < this._components.length) {
                const component = this._components[this._componentIndex];
                if (component == null) {
                    this._componentIndex++;
                    continue;
                }
                if (component instanceof Component) {
                    if (this._running) {
                        if (component.isBusy()) {
                            break;
                        } else {
                            this._running = false;
                            this._componentIndex++;
                        }
                    } else {
                        this._running = true;
                        this.addComponent(component);
                        break;
                    }
                } else {
                    component();
                    this._componentIndex++;
                }
            }
            if (this._componentIndex >= this._components.length) {
                this.end();
            }
        }
    };

    // ts/CommonLibrary/FrameCounter.ts
    var FrameCounter = class extends Component {
        constructor() {
            super(...arguments);
            this._frame = 0;
        }
        get frame() {
            return this._frame;
        }
        update() {
            super.update();
            this._frame++;
        }
        reset() {
            this._frame = 0;
        }
    };

    // ts/ARPG_Core/ARPG_ComboController.ts
    var ARPG_ComboController = class extends Component {
        constructor() {
            super(...arguments);
            this._numCombo = 0;
            this._lastSkillId = 0;
            this._frameCounter = new FrameCounter();
        }
        setup() {
            super.setup();
            this.addComponent(this._frameCounter);
        }
        checkDerivationSkill(useSkill) {
            if (ARPG_CorePluginParams.ActionComboSetting == null)
                return void 0;
            if (this._numCombo <= 0)
                return void 0;
            let prevDerivationSkillId;
            for (const actionComboData of ARPG_CorePluginParams.ActionComboSetting) {
                if (this._numCombo === 1) {
                    prevDerivationSkillId = actionComboData.SkillId;
                } else {
                    const prevDerivation = actionComboData.ActionComboDerivations[this._numCombo - 2];
                    prevDerivationSkillId = prevDerivation.DerivationSkillId;
                }
                const derivation = actionComboData.ActionComboDerivations[this._numCombo - 1];
                if (prevDerivationSkillId === this._lastSkillId) {
                    if (derivation && derivation.FromSkillId === useSkill.id) {
                        const frame = this._frameCounter.frame;
                        if (derivation.MinComboFrame <= frame && frame <= derivation.MaxComboFrame) {
                            return new ARPG_Skill("skill", derivation.DerivationSkillId);
                        }
                    }
                }
            }
            return void 0;
        }
        cancelCombo() {
            this._numCombo = 0;
        }
        startCombo(useSkill) {
            this._numCombo = 1;
            this._frameCounter.reset();
            this._lastSkillId = useSkill.id;
        }
        toNextCombo(useSkill) {
            this._numCombo++;
            this._frameCounter.reset();
            this._lastSkillId = useSkill.id;
        }
    };

    // ts/ARPG_Core/ARPG_Battler.ts
    var ARPG_Battler = class extends Component {
        constructor() {
            super(...arguments);
            this._noDamageTimer = new TimerComponent();
            this._noAttackTimer = new TimerComponent();
            this._damageHitChecker = new HitChecker("damage");
            this._attackHitChecker = new HitChecker("attack");
            this._customHitCheckers = /* @__PURE__ */ new Map();
            this._isConsumeCost = true;
            this._totalDamageWhenUsingSkill = 0;
            this._skillCancelWhenDamageEnable = false;
            this._guardReasons = /* @__PURE__ */ new Set();
            this._justGuardTimer = new TimerComponent();
            this._skillActivating = false;
            this._comboController = new ARPG_ComboController();
        }
        get damageHitChecker() {
            return this._damageHitChecker;
        }
        get attackHitChecker() {
            return this._attackHitChecker;
        }
        get customHitCheckers() {
            return this._customHitCheckers;
        }
        get hp() {
            return this.battler().hp;
        }
        set hp(value) {
            this.battler().setHp(value);
        }
        get mp() {
            return this.battler().mp;
        }
        set mp(value) {
            this.battler().setMp(value);
        }
        get tp() {
            return this.battler().tp;
        }
        set tp(value) {
            this.battler().setTp(value);
        }
        get mhp() {
            return this.battler().mhp;
        }
        get mmp() {
            return this.battler().mmp;
        }
        get def() {
            return this.battler().def;
        }
        get atk() {
            return this.battler().atk;
        }
        get mat() {
            return this.battler().mat;
        }
        get mdf() {
            return this.battler().mdf;
        }
        get agi() {
            return this.battler().agi;
        }
        get luk() {
            return this.battler().luk;
        }
        get hit() {
            return this.battler().hit;
        }
        get eva() {
            return this.battler().eva;
        }
        get cri() {
            return this.battler().cri;
        }
        get cev() {
            return this.battler().cev;
        }
        get mev() {
            return this.battler().mev;
        }
        get mrf() {
            return this.battler().mrf;
        }
        get cnt() {
            return this.battler().cnt;
        }
        get hrg() {
            return this.battler().hrg;
        }
        get mrg() {
            return this.battler().mrg;
        }
        get trg() {
            return this.battler().trg;
        }
        get tgr() {
            return this.battler().tgr;
        }
        get grd() {
            return this.battler().grd;
        }
        get rec() {
            return this.battler().rec;
        }
        get pha() {
            return this.battler().pha;
        }
        get mcr() {
            return this.battler().mcr;
        }
        get tcr() {
            return this.battler().tcr;
        }
        get pdr() {
            return this.battler().pdr;
        }
        get mdr() {
            return this.battler().mdr;
        }
        get fdr() {
            return this.battler().fdr;
        }
        get exr() {
            return this.battler().exr;
        }
        start() {
            super.start();
            this.addComponent(this._damageHitChecker);
            this.addComponent(this._attackHitChecker);
            this.addComponent(this._noDamageTimer);
            this.addComponent(this._noAttackTimer);
            this.addComponent(this._justGuardTimer);
            this.addComponent(this._comboController);
            this.updateHitChecker();
        }
        update() {
            super.update();
            this.updateRecvDamage();
            if (this._chantComponent) {
                if (this._chantComponent.isTerminated()) {
                    this._chantComponent = void 0;
                }
            }
            this.updateHitChecker();
        }
        updateHitChecker() {
            if (this.isAlive()) {
                this._damageHitChecker.removeDisableReason("dead");
                this._attackHitChecker.removeDisableReason("dead");
            } else {
                this._damageHitChecker.addDisableReason("dead");
                this._attackHitChecker.addDisableReason("dead");
            }
        }
        isActor() {
            return false;
        }
        isEnemy() {
            return false;
        }
        isDead() {
            if (this.battler().isDead())
                return true;
            return false;
        }
        isAlive() {
            return !this.isDead();
        }
        isGuarding() {
            return this._guardReasons.size > 0;
        }
        startGuard(reason) {
            const lastGuarding = this.isGuarding();
            this._guardReasons.add(reason);
            if (!lastGuarding)
                this.onGuardStart();
        }
        endGuard(reason) {
            this._guardReasons.delete(reason);
            if (!this.isGuarding())
                this.onGuardEnd();
        }
        onGuardStart() {
            let justGuardFrame = this.arpgParameters().justGuardFrame;
            if (justGuardFrame == null) {
                justGuardFrame = ARPG_CorePluginParams.ActorSetting.JustGuardFrame;
            }
            if (justGuardFrame > 0) {
                this._justGuardTimer.startTimer(justGuardFrame);
            }
        }
        onGuardEnd() {
            this._justGuardTimer.stop();
        }
        checkSuccessGuard(damageEffect) {
            let successGuard = false;
            if (this.isGuarding()) {
                const damageDir4 = damageEffect.damageDir4();
                if (damageDir4 == null) {
                    successGuard = true;
                } else {
                    if (this.user().direction() === this.user().reverseDir(damageDir4)) {
                        successGuard = true;
                    }
                }
            }
            if (successGuard) {
                if (this._justGuardTimer.isTimerRunning()) {
                    return "JUST_GUARD";
                } else {
                    return "NORMAL_GUARD";
                }
            }
            return "NO_GUARD";
        }
        startNoDamage(frame) {
            if (!this._noDamageTimer.isTimerRunning())
                this._noDamageTimer.startTimer(frame);
        }
        isNoDamage() {
            if (this.arpgParameters().noDamageFlag)
                return true;
            if (this._noDamageTimer.isTimerRunning())
                return true;
            return false;
        }
        startNoAttack(frame) {
            this._noAttackTimer.startTimer(frame);
        }
        isNoAttackMode() {
            if (this.arpgParameters().noAttackFlag)
                return true;
            return false;
        }
        gainHp(value) {
            this.battler().gainHp(value);
        }
        gainSilentTp(value) {
            this.battler().gainSilentTp(value);
        }
        canPaySkillCost(skill) {
            return this.battler().canPaySkillCost(skill.data());
        }
        paySkillCost(skill) {
            this.battler().paySkillCost(skill.data());
        }
        setCollideAttackSkillId(skillId) {
            this._collideAttackSkillId = skillId;
        }
        collideAttackSkillId() {
            if (this.usingSkill && this.usingSkill.isOverwriteCollideAttack()) {
                return this.usingSkill.id;
            }
            if (this._collideAttackSkillId == null)
                return 2;
            return this._collideAttackSkillId;
        }
        recvDamage(damageEffect) {
            const guardResult = this.checkSuccessGuard(damageEffect);
            damageEffect.setGuardResult(guardResult);
            const result = damageEffect.applyToTarget();
            this.skillCancelWhenRecvDamage(result);
            if (this.isAlive()) {
                this.startNoDamage(damageEffect.noDamageFrame());
            }
            this._recvDamageEffect = damageEffect;
            this.stopCharacterMove("recvDamage");
            this.stopEventInterpreter("recvDamage");
            this._behaviorComponent?.stop();
            this._comboController.cancelCombo();
            const recvDamageComponent = this.makeRecvDamageComponent(result);
            this.addComponent(new ChainComponent([recvDamageComponent, this.onEndRecvDamage.bind(this)]));
        }
        onEndRecvDamage() {
            this.resumeCharacterMove("recvDamage");
            this.resumeEventInterpreter("recvDamage");
            if (this._behaviorComponent) {
                if (this.isDead()) {
                    this._behaviorComponent.end();
                    this._behaviorComponent = void 0;
                } else {
                    this._behaviorComponent.resume();
                }
            }
            this._recvDamageEffect = void 0;
        }
        canUsableSkill() {
            if (this.isNoAttackMode())
                return false;
            if (this.isSkillUsing())
                return false;
            if (this.isDamageReceiving())
                return false;
            if ($gameMap.isEventRunning())
                return false;
            return true;
        }
        useSkill(skillOrItem, idOrName, opt = {}) {
            if (!this.canUsableSkill())
                return;
            let skill = new ARPG_Skill(skillOrItem, idOrName);
            if (skill.isSkill()) {
                const comboSkill = this._comboController.checkDerivationSkill(skill);
                if (comboSkill) {
                    skill = comboSkill;
                    this._comboController.toNextCombo(comboSkill);
                } else {
                    if (this._noAttackTimer.isTimerRunning()) {
                        return;
                    } else {
                        this._comboController.startCombo(skill);
                    }
                }
            } else {
                this._comboController.cancelCombo();
            }
            this._isConsumeCost = opt.isConsumeCost ?? true;
            this._useSkillProcessor = new ARPG_UseSkillProcessor(this, skill);
            this.addComponent(this._useSkillProcessor);
            this._totalDamageWhenUsingSkill = 0;
        }
        isSkillUsing() {
            return !!(this._useSkillProcessor && !this._useSkillProcessor.isTerminated());
        }
        isDamageReceiving() {
            return !!this._recvDamageEffect;
        }
        consumeCost(skill) {
            if (!this._isConsumeCost)
                return;
            if (skill.isSkill()) {
                this.user().battler().paySkillCost(skill);
            } else if (skill.isItem()) {
                if (this.isActor()) {
                    $gameParty.gainItem(skill.data(), -1);
                }
            }
        }
        checkConsumeCost(skill) {
            if (!this._isConsumeCost)
                return true;
            if (skill.isSkill()) {
                if (!this.canPaySkillCost(skill))
                    return false;
            } else if (skill.isItem()) {
                if (this.isActor()) {
                    if (!$gameParty.hasItem(skill.data()))
                        return false;
                }
            }
            return true;
        }
        skillActivation(chantCommonEventId = 0) {
            if (!this.usingSkill) {
                throw ErrorManager.skillActivationUnusedSkillError();
            }
            this._skillActivating = true;
            if (this.usingSkill.isCancelAcceleration()) {
                this.user().cancelAcceleration();
            }
            if (this.usingSkill.isShowSkillName()) {
                $gameMap.arpgBattleManager().showSkillNameWindow(this, this.usingSkill);
            }
            this.consumeCost(this.usingSkill);
            this.requestRefreshShortcutWindowHook();
            if (this.usingSkill.isMoveDisabled()) {
                this.stopCharacterMove("skill");
            }
            this.stopEventInterpreter("skill");
            const chantComponent = ARPG_CustomManager.chantComponent(this, chantCommonEventId);
            if (chantComponent) {
                this._chantComponent = chantComponent;
                this.addComponent(this._chantComponent);
            }
        }
        checkDamageElement(elementName) {
            if (!this.isDamageReceiving())
                return false;
            const allElements = $dataSystem.elements;
            const attackElementIds = this._recvDamageEffect.subject().attackElementIds().concat(this._recvDamageEffect.skill().elementIds());
            for (let i = 0; i < allElements.length; i++) {
                if (allElements[i] === elementName) {
                    if (attackElementIds.includes(i))
                        return true;
                }
            }
            return false;
        }
        attackElementIds() {
            return this.battler().attackElements();
        }
        stopCharacterMove(reason) {
            const character = this.user();
            if (character instanceof Game_Event) {
                character.stopSelfMovement(reason);
            } else if (character instanceof Game_Player) {
                character.stopMoveByInput(reason);
            }
        }
        resumeCharacterMove(reason) {
            const character = this.user();
            if (character instanceof Game_Event) {
                character.resumeSelfMovement(reason);
            } else if (character instanceof Game_Player) {
                character.resumeMoveByInput(reason);
            }
        }
        stopEventInterpreter(reason) {
            const character = this.user();
            if (character instanceof Game_Event) {
                const interpreter = character.interpreter();
                if (interpreter)
                    interpreter.lock(reason);
            }
            this._behaviorComponent?.stop();
        }
        resumeEventInterpreter(reason) {
            const character = this.user();
            if (character instanceof Game_Event) {
                const interpreter = character.interpreter();
                if (interpreter)
                    interpreter.unlock(reason);
            }
        }
        setSkillCancelWhenDamageEnable(enabled) {
            this._skillCancelWhenDamageEnable = enabled;
        }
        isDamageSkillCancelEnabled() {
            if (this._chantComponent)
                return true;
            return this._skillCancelWhenDamageEnable;
        }
        requestRefreshShortcutWindowHook() {
        }
        applySkillEffect(skill) {
            if (!this.usingSkill) {
                throw ErrorManager.applySkillEffectUnusedSkillError();
            }
            if (!this.skillActivation) {
                throw ErrorManager.applySkillEffectUnActivate();
            }
            if (skill == null) {
                skill = this.usingSkill;
            }
            const effect = new ARPG_Effect(this, this, skill, void 0);
            effect.applyToTarget();
        }
        testApplySkillEffect(skill) {
            if (!this.usingSkill) {
                throw ErrorManager.testApplySkillEffectUnusedSkillError();
            }
            if (skill == null) {
                skill = this.usingSkill;
            }
            const effect = new ARPG_Effect(this, this, skill, void 0);
            return effect.testApplyToTarget();
        }
        isSkillActivating() {
            return this._skillActivating;
        }
        endSkillActivation() {
            if (this.isSkillActivating()) {
                if (this.usingSkill.isShowSkillName()) {
                    $gameMap.arpgBattleManager().endShowSkillNameWindow();
                }
                this._skillActivating = false;
                this.startNoAttack(this.usingSkill.noAttackFrame());
            }
            if (this.usingSkill?.isMoveDisabled()) {
                this.resumeCharacterMove("skill");
            }
            this.resumeEventInterpreter("skill");
        }
        makeSkillObject(srcMapId, srcEventIdOrName, skill, x = 0, y = 0) {
            if (!this.isSkillActivating()) {
                throw ErrorManager.makeSkillObjectUnActivate();
            }
            const event = $gameMap.makeDynamicEvent(srcMapId, srcEventIdOrName, x, y);
            if (skill == null) {
                skill = this.usingSkill;
            }
            event.setupSkillObject(skill.skillOrItem, skill.id, this);
            const userCharacter = this.user();
            let userEventId;
            if (userCharacter instanceof Game_Event) {
                userEventId = userCharacter.eventId();
            } else {
                userEventId = 0;
            }
            const userKind = ARPG_Utils.characterKindValue(userCharacter);
            if (ARPG_CorePluginParams.SkillObjectSetting.SkillObjectUserKindSelfVariableId > 0) {
                event.setSelfVariableValue(ARPG_CorePluginParams.SkillObjectSetting.SkillObjectUserKindSelfVariableId, userKind);
            }
            if (ARPG_CorePluginParams.SkillObjectSetting.SkillObjectUserEventIdSelfVariableId > 0) {
                event.setSelfVariableValue(ARPG_CorePluginParams.SkillObjectSetting.SkillObjectUserEventIdSelfVariableId, userEventId);
            }
            return event;
        }
        behaviorComponent() {
            return this._behaviorComponent;
        }
        setBehaviorComponent(component) {
            if (this._behaviorComponent)
                this._behaviorComponent.end();
            this._behaviorComponent = component;
            if (component)
                this.addComponent(component);
        }
        updateRecvDamage() {
            if (this.isDead())
                return;
            const character = this.user();
            if (character instanceof Game_Event) {
                if (character.isErased())
                    return;
            }
            const hitCharacters = this._damageHitChecker.checkHit("attack");
            for (const character2 of hitCharacters) {
                if (character2.isSkillObject()) {
                    this.recvDamageProcessBySkillObjectCharacter(character2);
                } else if (character2.isBattler()) {
                    this.recvDamageProcessByBattlerCharacter(character2);
                }
            }
        }
        applyCollideDamageEffectToTarget(target, arpgSkill) {
            if (target.isNoDamage())
                return;
            const effect = new ARPG_Effect(this, target, arpgSkill, Degree.fromDirection(this.user().direction()));
            target.recvDamage(effect);
        }
        isChanting() {
            return !!this._chantComponent;
        }
        recvDamageProcessBySkillObjectCharacter(character) {
            if (character instanceof Game_Event) {
                if (character.isErased())
                    return;
            }
            if (character.isSkillObject()) {
                const skillObject = character.skillObject();
                if (!this.checkTargetBattler(skillObject.userBattler(), skillObject.skill()))
                    return;
                skillObject.applyDamageEffectToBattler(this, skillObject.skill());
            }
        }
        recvDamageProcessByBattlerCharacter(character) {
            if (character.battler().isDead())
                return;
            if (character instanceof Game_Event) {
                if (character.isErased())
                    return;
            }
            if (!this.checkOpponent(character.battler()))
                return;
            const skillId = character.battler().collideAttackSkillId();
            if (skillId > 0) {
                const arpgSkill = new ARPG_Skill("skill", skillId);
                character.battler().applyCollideDamageEffectToTarget(this, arpgSkill);
            }
        }
        skillCancelWhenRecvDamage(result) {
            if (this.isDead()) {
                this.doSkillCancel();
            } else {
                if (!this.isDamageSkillCancelEnabled())
                    return;
                this._totalDamageWhenUsingSkill += result.hpDamageValue();
                const rate = this._totalDamageWhenUsingSkill / this.mhp;
                if (rate >= this.arpgParameters().skillCancelDamageRate) {
                    this.doSkillCancel();
                }
            }
        }
        doSkillCancel() {
            if (this._chantComponent) {
                this._chantComponent.end();
                this._chantComponent = void 0;
            }
            this.endSkillActivation();
            if (this._useSkillProcessor)
                this._useSkillProcessor.damageCancel();
        }
        checkTargetBattler(user, arpgSkill) {
            if (this.isActor()) {
                return this.checkTargetActor(user, arpgSkill);
            } else if (this.isEnemy()) {
                return this.checkTargetEnemy(user, arpgSkill);
            }
            return false;
        }
        checkTargetEnemy(user, arpgSkill) {
            if (arpgSkill.isForEveryone()) {
                return true;
            } else if (user.isActor() && arpgSkill.isForOpponent()) {
                return true;
            } else if (user.isEnemy() && arpgSkill.isForFriend()) {
                return true;
            }
            return false;
        }
        checkTargetActor(user, arpgSkill) {
            if (arpgSkill.isForEveryone()) {
                return true;
            } else if (user.isEnemy() && arpgSkill.isForOpponent()) {
                return true;
            } else if (user.isActor() && arpgSkill.isForFriend()) {
                return true;
            }
            return false;
        }
    };
    var ARPG_UseSkillProcessor = class extends Processor {
        constructor(battler, skill) {
            super();
            this._damageCanceled = false;
            this._battler = battler;
            this._skill = skill;
        }
        setup() {
            super.setup();
            this._battler.usingSkill = this._skill;
            this.makeUseSkillBackup();
        }
        *process() {
            if (!this._battler.checkConsumeCost(this._skill))
                return;
            const actionComponent = ARPG_CustomManager.actionComponent(this._battler, this._skill);
            if (actionComponent) {
                this.addComponent(actionComponent);
                yield* this.waitComponent(actionComponent);
            }
        }
        damageCancel() {
            this._damageCanceled = true;
            this.end(true);
        }
        terminate() {
            super.terminate();
            if (this._battler.isActor()) {
                if (!this._damageCanceled && !this._battler.isSkillActivating()) {
                    SoundManager.playBuzzer();
                }
            }
            this._battler.endSkillActivation();
            this._battler.usingSkill = void 0;
            this.restoreUseSkillBackup();
        }
        makeUseSkillBackup() {
            this._backup = {
                moveSpeed: this.user().moveSpeed(),
                dpf: this.user()._dpf,
                characterName: this.user().characterName(),
                characterIndex: this.user().characterIndex(),
                directionFixed: this.user().isDirectionFixed()
            };
        }
        restoreUseSkillBackup() {
            this.user().setMoveSpeed(this._backup.moveSpeed);
            this.user().setDpf(this._backup.dpf);
            this.user().setImage(this._backup.characterName, this._backup.characterIndex);
            this.user().setDirectionFix(this._backup.directionFixed);
        }
    };

    // ts/ARPG_Core/BattlerDeadComponent.ts
    var BattlerDeadComponent = class extends Component {
        constructor(deadProcessComponent) {
            super();
            this._deadProcessComponent = deadProcessComponent;
        }
        start() {
            super.start();
            const character = this.user();
            if (character instanceof Game_Player) {
                character.stopMoveByInput("dead");
            } else if (character instanceof Game_Event) {
                character.interpreter()?.lock("dead");
                character.stopSelfMovement("dead");
            }
            character.cancelAcceleration();
            character.cancelMove();
            if (character._moveRoute) {
                character.processRouteEnd();
            }
            if (this._deadProcessComponent)
                this.addComponent(this._deadProcessComponent);
        }
        update() {
            super.update();
            if (!this._deadProcessComponent || this._deadProcessComponent.isTerminated()) {
                this.end();
            }
        }
        terminate() {
            super.terminate();
            const character = this.user();
            if (character instanceof Game_Player) {
                character.resumeMoveByInput("dead");
            } else if (character instanceof Game_Event) {
                character.interpreter()?.unlock("dead");
                character.resumeSelfMovement("dead");
            }
        }
    };

    // ts/ARPG_Core/ARPG_Actor.ts
    var ARPG_Actor = class extends ARPG_Battler {
        constructor(actorId) {
            super();
            this._actorId = actorId;
        }
        battler() {
            return $gameActors.actor(this._actorId);
        }
        actor() {
            return this.battler();
        }
        actorId() {
            return this._actorId;
        }
        name() {
            return this.actor().name();
        }
        arpgParameters() {
            return this.actor().arpgParameters();
        }
        isActor() {
            return true;
        }
        checkOpponent(battler) {
            return battler.isEnemy();
        }
        changeActor(actorId) {
            this._actorId = actorId;
            this.requestRefreshShortcutWindowHook();
        }
        makeRecvDamageComponent(result) {
            const recvDamageComponent = ARPG_CustomManager.actorRecvDamageComponent(this, result, result.guardResult());
            let damageComponent;
            if (this.isAlive()) {
                damageComponent = recvDamageComponent;
            } else {
                const deadComponent = new BattlerDeadComponent(ARPG_CustomManager.actorDeadComponent(this, result));
                damageComponent = new ChainComponent([recvDamageComponent, deadComponent, this.onDead.bind(this)]);
            }
            return damageComponent;
        }
        onDead() {
            $gameMap.arpgBattleManager()?.deadActor(this);
        }
        weaponActionSkillIds() {
            const weapons = this.actor().weapons();
            return weapons.map((weapon) => {
                const metaSkill = weapon.meta.skill;
                if (typeof metaSkill === "string") {
                    let skillId;
                    const strSkill = metaSkill.replace(/\s/, "");
                    if (strSkill.match(/^\d+$/)) {
                        skillId = parseInt(strSkill);
                    } else {
                        skillId = ARPG_Utils.searchSkillId(strSkill);
                    }
                    if (skillId && skillId > 0)
                        return skillId;
                }
                return this.normalAttackSkillId();
            });
        }
        normalAttackSkillId() {
            if (ARPG_CorePluginParams.ActorSetting.NormalAttackSkillId == null)
                return 1;
            return ARPG_CorePluginParams.ActorSetting.NormalAttackSkillId;
        }
        onGuardStart() {
            super.onGuardStart();
            const component = ARPG_CustomManager.actorGuardStart(this);
            if (component)
                this.addComponent(component);
        }
        onGuardEnd() {
            super.onGuardEnd();
            const component = ARPG_CustomManager.actorGuardEnd(this);
            if (component)
                this.addComponent(component);
        }
    };

    // ts/ARPG_Core/ARPG_CharacterTempData.ts
    var ARPG_CharacterTempData = class {
        constructor() {
            this.lastARPGMode = false;
        }
    };

    // ts/ARPG_Core/CharacterBlowAwayProcessor.ts
    var CharacterBlowAwayProcessor = class extends Processor {
        constructor(deg, initialVelocity, duration) {
            super();
            this._deg = deg;
            this._initialVelocity = initialVelocity;
            this._duration = duration;
        }
        start() {
            super.start();
            const character = this.user();
            if (character instanceof Game_Event) {
                character.interpreter()?.lock("knockback");
                character.stopSelfMovement("knockback");
            } else if (character instanceof Game_Player) {
                character.stopMoveByInput("knockback");
            }
            character.cancelAcceleration();
            character.cancelMove();
            if (character._moveRoute) {
                character.processRouteEnd();
            }
        }
        *process() {
            const character = this.user();
            const tmpMoveSpeed = character.moveSpeed();
            const tmpDpf = character._dpf;
            const tmpMaxAcceleration = character._maxAcceleration;
            const tmpAccelerationPlus = character._accelerationPlus;
            const tmpIntertia = character._inertia;
            const tmpDirFixed = character.isDirectionFixed();
            character.setDirectionFix(true);
            character.setDpf(0.1);
            character.setAcc(0, 0);
            for (let i = 0; i < this._duration; i++) {
                const dpf = this._initialVelocity - i * (this._initialVelocity / this._duration);
                character.setDpf(dpf);
                character.dotMoveByDeg(this._deg.value);
                yield;
            }
            character.setDirectionFix(tmpDirFixed);
            character.setMoveSpeed(tmpMoveSpeed);
            character.setDpf(tmpDpf);
            character.setAcc(tmpMaxAcceleration, tmpAccelerationPlus);
            character.setInertia(tmpIntertia);
        }
        terminate() {
            super.terminate();
            const character = this.user();
            if (character instanceof Game_Event) {
                character.interpreter()?.unlock("knockback");
                character.resumeSelfMovement("knockback");
            } else if (character instanceof Game_Player) {
                character.resumeMoveByInput("knockback");
            }
        }
    };

    // ts/ARPG_Core/CharacterActionWaitProcessor.ts
    var CharacterActionWaitProcessor = class extends Processor {
        constructor(duration) {
            super();
            this._duration = duration;
        }
        start() {
            super.start();
            const character = this.user();
            if (character instanceof Game_Event) {
                character.interpreter()?.lock("stop");
                character.stopSelfMovement("stop");
            } else if (character instanceof Game_Player) {
                character.stopMoveByInput("stop");
            }
            character.cancelAcceleration();
            character.cancelMove();
            if (character._moveRoute) {
                character.processRouteEnd();
            }
        }
        *process() {
            yield* this.waitProcess(this._duration);
        }
        terminate() {
            super.terminate();
            const character = this.user();
            if (character instanceof Game_Event) {
                character.interpreter()?.unlock("stop");
                character.resumeSelfMovement("stop");
            } else if (character instanceof Game_Player) {
                character.resumeMoveByInput("stop");
            }
        }
    };

    // ts/ARPG_Core/Game_Character.ts
    var _Game_Character_Mixin = class extends Game_Character {
        update() {
            if ($gameMap.isEnabledARPGMode()) {
                if (!this.arpgTempData().lastARPGMode) {
                    this.arpgTempData().lastARPGMode = true;
                    this.startARPGProcess();
                }
            } else {
                if (this.arpgTempData().lastARPGMode) {
                    this.arpgTempData().lastARPGMode = false;
                    this.endARPGProcess();
                }
            }
            this.arpgTempData().componentRunner?.prepareUpdate();
            _Game_Character_Mixin._update.call(this);
            this.arpgTempData().componentRunner?.update();
        }
        isInTheScreen(xMargin, yMargin) {
            const gw = Graphics.width;
            const gh = Graphics.height;
            const tw = $gameMap.tileWidth();
            const th = $gameMap.tileHeight();
            const px = this.scrolledX() * tw + tw / 2 - gw / 2;
            const py = this.scrolledY() * th + th / 2 - gh / 2;
            const dw = gw / 2 + xMargin * tw;
            const dh = gh / 2 + yMargin * th;
            return px >= -dw && px <= dw && py >= -dh && py <= dh;
        }
        addDisableMoveReason(reason) {
            if (this._disableMoveReason == null) {
                this._disableMoveReason = [reason];
            } else {
                this._disableMoveReason = [...new Set(this._disableMoveReason.concat([reason]))];
            }
        }
        removeDisableMoveReason(reason) {
            if (this._disableMoveReason != null)
                this._disableMoveReason = this._disableMoveReason.filter((r) => r !== reason);
        }
        isDisableMove() {
            if (this._disableMoveReason == null)
                return false;
            return this._disableMoveReason.length > 0;
        }
        setDirection(d) {
            if (!this.isDisableMove()) {
                _Game_Character_Mixin._setDirection.call(this, d);
            }
        }
        moveCancel() {
            this.mover().cancelMove();
            this.processRouteEnd();
        }
        isNoCheckMapValid() {
            if (this._noCheckMapValid == null)
                return false;
            return this._noCheckMapValid;
        }
        setNoCheckMapValid(noCheckMapValid) {
            this._noCheckMapValid = noCheckMapValid;
        }
        createArpgTempData() {
            const tempData = new ARPG_CharacterTempData();
            return tempData;
        }
        arpgTempData() {
            return $gameTemp.arpgCharacterTempData(this);
        }
        startARPGProcess() {
        }
        endARPGProcess() {
        }
        battler() {
            const battler = this.arpgTempData().battler;
            if (!battler)
                throw new Error("_battler is undefined.");
            return battler;
        }
        isBattler() {
            return !!this.arpgTempData().battler;
        }
        isSkillObject() {
            return !!this.arpgTempData().skillObject;
        }
        isFieldObject() {
            return !!this.arpgTempData().fieldObject;
        }
        skillObject() {
            const skillObject = this.arpgTempData().skillObject;
            if (!skillObject)
                throw new Error("skillObject is undefined.");
            return skillObject;
        }
        fieldObject() {
            const fieldObject = this.arpgTempData().fieldObject;
            if (!fieldObject)
                throw new Error("fieldObject is undefined.");
            return fieldObject;
        }
        isNeedCharacterHpGauge() {
            if (!this.isBattler())
                return false;
            if (this.battler().isEnemy()) {
                const enemy = this.battler();
                if (enemy.isNeedCharacterHpGauge())
                    return true;
            }
            return false;
        }
        isCharacterHpGaugeVisibled() {
            if (!this.isBattler())
                return false;
            if (this.battler().isEnemy()) {
                const enemy = this.battler();
                if (enemy.isCharacterHpGaugeVisibled())
                    return true;
            }
            return false;
        }
        hpGaugeColor1() {
            if (!this.isBattler())
                return void 0;
            if (this.battler().isEnemy()) {
                const enemy = this.battler();
                return enemy.normalHpGaugeOption()?.hpGaugeColor1;
            }
            return void 0;
        }
        hpGaugeColor2() {
            if (!this.isBattler())
                return void 0;
            if (this.battler().isEnemy()) {
                const enemy = this.battler();
                return enemy.normalHpGaugeOption()?.hpGaugeColor2;
            }
            return void 0;
        }
        hpGaugePosition() {
            if (this.isBattler() && this.battler().isEnemy()) {
                const enemy = this.battler();
                const hpGaugePosition = enemy.normalHpGaugeOption()?.hpGaugePosition;
                if (hpGaugePosition)
                    return hpGaugePosition;
            }
            return "up";
        }
        hpGaugeYOffset() {
            if (this.isBattler() && this.battler().isEnemy()) {
                const enemy = this.battler();
                const hpGaugeYOffset = enemy.normalHpGaugeOption()?.hpGaugeYOffset;
                if (hpGaugeYOffset)
                    return hpGaugeYOffset;
            }
            return -8;
        }
        hpGaugeHeight() {
            if (this.isBattler() && this.battler().isEnemy()) {
                const enemy = this.battler();
                const hpGaugeHeight = enemy.normalHpGaugeOption()?.hpGaugeHeight;
                if (hpGaugeHeight)
                    return hpGaugeHeight;
            }
            return 6;
        }
        setupActor(actorId) {
            this.arpgTempData().battler?.end();
            const battler = new ARPG_Actor(actorId);
            this.arpgTempData().battler = battler;
            this.addComponent(battler);
            for (const hitBoxParam of ARPG_CorePluginParams.ActorSetting.ActorHitBox.DamageHitBoxList) {
                const rect = new Rectangle(hitBoxParam.X, hitBoxParam.Y, hitBoxParam.Width, hitBoxParam.Height);
                const hitBox = new HitBox("damage", this, rect, ARPG_CorePluginParams.HitBoxSetting.DamageHitBoxColor);
                this.battler().damageHitChecker.addHitBox(hitBox);
            }
        }
        moveTowardNearActor() {
            const actorCharacters = [$gamePlayer];
            let minFar = 65535;
            let minFarActor = null;
            for (const character of actorCharacters) {
                const far = this.calcFar(character);
                if (far <= minFar) {
                    minFar = far;
                    minFarActor = character;
                }
            }
            if (minFarActor)
                this.moveTowardCharacter(minFarActor);
        }
        moveAwayNearActor() {
            const { character } = ARPG_Utils.searchNearBattler(this, "opponent");
            if (character)
                this.moveAwayFromCharacter(character);
        }
        addComponent(component) {
            let componentRunner = this.arpgTempData().componentRunner;
            if (!componentRunner) {
                componentRunner = new ComponentRunner(this);
                this.arpgTempData().componentRunner = componentRunner;
            }
            componentRunner.addComponent(component);
        }
        removeComponent(component) {
            let componentRunner = this.arpgTempData().componentRunner;
            if (!componentRunner) {
                componentRunner = new ComponentRunner(this);
                this.arpgTempData().componentRunner = componentRunner;
            }
            componentRunner.removeComponent(component);
        }
        hasComponent(component) {
            let componentRunner = this.arpgTempData().componentRunner;
            if (!componentRunner) {
                componentRunner = new ComponentRunner(this);
                this.arpgTempData().componentRunner = componentRunner;
            }
            return componentRunner.hasComponent(component);
        }
        hasComponentByClass(componentClass) {
            let componentRunner = this.arpgTempData().componentRunner;
            if (!componentRunner) {
                componentRunner = new ComponentRunner(this);
                this.arpgTempData().componentRunner = componentRunner;
            }
            return componentRunner.hasComponentByClass(componentClass);
        }
        startBlowAway(deg, initialVelocity, duration) {
            if (this.isBlowingAway())
                return;
            this.addComponent(new CharacterBlowAwayProcessor(deg, initialVelocity, duration));
        }
        isBlowingAway() {
            return this.hasComponentByClass(CharacterBlowAwayProcessor);
        }
        startActionWait(duration) {
            if (this.isBlowingAway())
                return;
            this.addComponent(new CharacterActionWaitProcessor(duration));
        }
        isActionWaiting() {
            return this.hasComponentByClass(CharacterActionWaitProcessor);
        }
        onPress() {
        }
        onClick() {
            $gameMap.touchCharacter(this);
        }
    };
    var Game_Character_Mixin = _Game_Character_Mixin;
    Game_Character_Mixin._update = Game_Character.prototype.update;
    Game_Character_Mixin._setDirection = Game_Character.prototype.setDirection;
    mixin(Game_Character, Game_Character_Mixin);

    // ts/ARPG_Core/ARPG_BattleManager.ts
    var ACTOR_DEAD_CHANGE_NO_DAMAGE_FRAME = 60;
    var ARPG_BattleManager = class extends Component {
        constructor() {
            super(...arguments);
            this._showSkillNameCount = 0;
        }
        deadActor(actor) {
            const aliveMembers = $gameParty.aliveMembers();
            if (aliveMembers.length === 0) {
                this.gameover();
            } else {
                $gameTemp.requestChangeNextActor({ force: true });
            }
            $gamePlayer.battler().startNoDamage(ACTOR_DEAD_CHANGE_NO_DAMAGE_FRAME);
        }
        gameover() {
            const gameoverComponent = ARPG_CustomManager.gameoverComponent();
            if (gameoverComponent) {
                this.addComponent(gameoverComponent);
            } else {
                SceneManager.goto(Scene_Gameover);
            }
        }
        showSkillNameWindow(user, skill) {
            const w = 320;
            const h = 64;
            const x = Graphics.boxWidth / 2 - w / 2;
            const y = 0;
            const rect = new Rectangle(x, y, w, h);
            const skillData = skill.data();
            const text1 = skillData.message1.format(user.name(), skillData.name);
            $gameMap.showCommonMessageWindow(text1, rect);
            if (skillData.message2 && skillData.message2 != "") {
                const text2 = skillData.message2.format(user.name(), skillData.name);
                $gameMap.showCommonMessageWindow(text2, rect);
            }
            if (this._showSkillNameCount === 0) {
                $gameTemp.arpgGlobalTempData().skillNameWindowController.startManualWait();
            }
            this._showSkillNameCount++;
        }
        endShowSkillNameWindow() {
            if (this._showSkillNameCount > 0) {
                this._showSkillNameCount--;
                if (this._showSkillNameCount === 0) {
                    $gameTemp.arpgGlobalTempData().skillNameWindowController.endManualWait();
                }
            }
        }
    };

    // ts/ARPG_Core/TransparentObject.ts
    var TransparentObject = class extends Game_Character {
        constructor(...args) {
            super(...args);
        }
        initialize(...args) {
            super.initialize();
            this.setNoCheckMapValid(true);
            this.setEnableWallSlide(false);
            this._remainFar = 0;
            this._slideLengthX = 0;
            this._slideLengthY = 0;
        }
        castTo(deg, far) {
            let loopCount = 0;
            this._remainFar = far;
            while (true) {
                if (++loopCount > 255)
                    throw new Error("endless loop error");
                const pos = this.positionPoint();
                if (!$gameMap.isValid(pos.x, pos.y)) {
                    return false;
                }
                this.dotMoveByDeg(deg.value);
                if (!this.isMovementSucceeded()) {
                    return true;
                }
                if (this._remainFar <= 0) {
                    this.dotMoveByDeg(deg.value);
                    if (!this.isMovementSucceeded()) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }
        distancePerFrame() {
            return 1;
        }
        moveCallback(moved, dpf) {
            super.moveCallback(moved, dpf);
            if (moved) {
                this._remainFar -= dpf;
            }
        }
        checkCollisionTargetCharacter(x, y, d, character) {
            if (character instanceof Game_Player) {
                return this.checkCollisionTargetPlayer(x, y, d, character);
            } else if (character instanceof Game_Follower) {
                if ($gamePlayer.followers().isVisible()) {
                    return this.checkCollisionTargetFollower(x, y, d, character);
                }
            } else if (character instanceof Game_Event) {
                return this.checkCollisionTargetEvent(x, y, d, character);
            } else if (character instanceof Game_Vehicle) {
                return this.checkCollisionTargetVehicle(x, y, d, character);
            }
            return false;
        }
    };

    // ts/ARPG_Core/Game_Map.ts
    var _Game_Map_initialize = Game_Map.prototype.initialize;
    Game_Map.prototype.initialize = function() {
        _Game_Map_initialize.call(this);
        this._arpgMode = false;
        this._stopped = false;
    };
    var _Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        _Game_Map_setup.call(this, mapId);
        this.endARPGMode();
    };
    Game_Map.prototype.outOfMap = function(character) {
        const pos = character.positionPoint();
        return pos.x + character.width() < 0 || pos.y > this.width() || (pos.y + character.height() < 0 || pos.y > this.height());
    };
    Game_Map.prototype.stop = function() {
        return this._stopped = true;
    };
    Game_Map.prototype.resume = function() {
        return this._stopped = false;
    };
    Game_Map.prototype.isStopped = function() {
        return this._stopped;
    };
    Game_Map.prototype.startARPGMode = function() {
        if (!this._arpgMode) {
            const controlCharacter = $gameTemp.arpgGlobalTempData().controlCharacter;
            if (!this._arpgBattleManager) {
                this._arpgBattleManager = new ARPG_BattleManager();
                controlCharacter.addComponent(this._arpgBattleManager);
            }
            this._arpgMode = true;
        }
        $gameSwitches.setValue(ARPG_CorePluginParams.EnableARPGSwitchId, true);
    };
    Game_Map.prototype.endARPGMode = function() {
        if (this._arpgMode) {
            this._arpgBattleManager?.end();
            this._arpgBattleManager = void 0;
            $gameTemp.arpgGlobalTempData().bossHpGaugeTargetEnemy = void 0;
            this._arpgMode = false;
        }
        $gameSwitches.setValue(ARPG_CorePluginParams.EnableARPGSwitchId, false);
    };
    Game_Map.prototype.isEnabledARPGMode = function() {
        return this._arpgMode;
    };
    Game_Map.prototype.arpgBattleManager = function() {
        return this._arpgBattleManager;
    };
    var _Game_Map_allCharacters = Game_Map.prototype.allCharacters;
    Game_Map.prototype.allCharacters = function() {
        const characters = _Game_Map_allCharacters.call(this);
        for (const hitBox of this.allHitBoxs()) {
            characters.add(hitBox);
        }
        if (this._transparentObject)
            characters.add(this._transparentObject);
        return characters;
    };
    Game_Map.prototype.allHitBoxs = function() {
        const hitBoxs = /* @__PURE__ */ new Set();
        if ($gamePlayer.isBattler()) {
            for (const hitBox of $gamePlayer.battler().damageHitChecker.hitBoxs) {
                hitBoxs.add(hitBox);
            }
            for (const hitBox of $gamePlayer.battler().attackHitChecker.hitBoxs) {
                hitBoxs.add(hitBox);
            }
        }
        for (const event of this.events()) {
            if (event.isBattler()) {
                const battler = event.battler();
                for (const hitBox of battler.damageHitChecker.hitBoxs) {
                    hitBoxs.add(hitBox);
                }
                for (const hitBox of battler.attackHitChecker.hitBoxs) {
                    hitBoxs.add(hitBox);
                }
                for (const customHitChecker of battler.customHitCheckers.values()) {
                    for (const hitBox of customHitChecker.hitBoxs) {
                        hitBoxs.add(hitBox);
                    }
                }
            } else if (event.isSkillObject()) {
                const skillObject = event.skillObject();
                for (const hitBox of skillObject.attackHitChecker.hitBoxs) {
                    hitBoxs.add(hitBox);
                }
                for (const customHitChecker of skillObject.customHitCheckers.values()) {
                    for (const hitBox of customHitChecker.hitBoxs) {
                        hitBoxs.add(hitBox);
                    }
                }
            } else if (event.isFieldObject()) {
                const fieldObject = event.fieldObject();
                for (const customHitChecker of fieldObject.customHitCheckers.values()) {
                    for (const hitBox of customHitChecker.hitBoxs) {
                        hitBoxs.add(hitBox);
                    }
                }
            }
        }
        return hitBoxs;
    };
    Game_Map.prototype.showCommonMessageWindow = function(text, rect, opt = {}) {
        $gameTemp.arpgGlobalTempData().skillNameWindowController.showWindow(text, rect, opt);
    };
    Game_Map.prototype.startSceneIndication = function(scene) {
        let skillNameWindowController = $gameTemp.arpgGlobalTempData().skillNameWindowController;
        const createWindowCallback = scene.createSkillNameWindowCallback.bind(scene);
        const deleteWindowCallback = scene.deleteSkillNameWindowCallback.bind(scene);
        skillNameWindowController.sceneStart(createWindowCallback, deleteWindowCallback);
        if ($gamePlayer.isBattler()) {
            $gamePlayer.battler().changeActor($gameParty.leader().actorId());
        } else {
            $gamePlayer.setupActor($gameParty.leader().actorId());
        }
    };
    Game_Map.prototype.terminateSceneIndication = function(scene) {
        $gameTemp.arpgGlobalTempData().skillNameWindowController?.sceneTerminate();
    };
    Game_Map.prototype.transparentObjectCastTo = function(pos, deg, far, opt = {}) {
        this._transparentObject = new TransparentObject();
        this._transparentObject.setPositionPoint(pos);
        if (opt.width)
            this._transparentObject.setWidth(opt.width);
        if (opt.height)
            this._transparentObject.setHeight(opt.height);
        const collided = this._transparentObject.castTo(deg, far);
        let result;
        if (collided)
            result = this._transparentObject.positionPoint();
        $gameTemp.removeUnusedCache();
        this._transparentObject = void 0;
        $gameTemp.removeUnusedCache();
        return result;
    };

    // ts/ARPG_Core/PlayerBehavior.ts
    var PlayerBehavior = class extends Component {
        constructor() {
            super(...arguments);
            this._attackProcess = new AttackProcess();
            this._guardProcess = new GuardProcess();
        }
        setup() {
            super.setup();
            this.addComponent(this._attackProcess);
            this.addComponent(this._guardProcess);
        }
        delayAttackable(delayTime) {
            this._attackProcess.delayAttackable(delayTime);
        }
    };
    var _AttackProcess = class extends Component {
        constructor() {
            super(...arguments);
            this._waitAttackTimer = new TimerComponent();
            this._delayAttackableTimer = new TimerComponent();
        }
        setup() {
            super.setup();
            this.addComponent(this._waitAttackTimer);
            this.addComponent(this._delayAttackableTimer);
        }
        delayAttackable(delayTime) {
            this._delayAttackableTimer.startTimer(delayTime);
        }
        update() {
            super.update();
            if ($gameMap.isEventRunning()) {
                this._waitAttackTimer.stop();
            }
            if (this._waitAttackTimer.checkTimeout()) {
                if (!$gameMap.isEventRunning()) {
                    const actor = this.user().battler();
                    const skillIds = actor.weaponActionSkillIds();
                    if (skillIds.length > 0)
                        actor.useSkill("skill", skillIds[0]);
                }
            }
            if (!$gameMap.isEventRunning() && !this._delayAttackableTimer.isTimerRunning()) {
                const keysym = ARPG_Utils.getKeySymbol("ActorNormalAttack");
                if (keysym && Input.isTriggered(keysym)) {
                    this._waitAttackTimer.startTimer(_AttackProcess.WAIT_ATTACK_TIME);
                }
            }
        }
    };
    var AttackProcess = _AttackProcess;
    AttackProcess.WAIT_ATTACK_TIME = 2;
    var GuardProcess = class extends Component {
        update() {
            super.update();
            if (this.user().battler().isGuarding()) {
                const keysym = ARPG_Utils.getKeySymbol("ActorGuard");
                if (!(keysym && Input.isPressed(keysym))) {
                    this.user().battler().endGuard("input");
                }
            } else {
                const keysym = ARPG_Utils.getKeySymbol("ActorGuard");
                if (keysym && Input.isPressed(keysym)) {
                    this.user().battler().startGuard("input");
                }
            }
        }
    };

    // ts/ARPG_Core/Game_Player.ts
    var _Game_Player_Mixin = class extends Game_Player {
        initMembers() {
            _Game_Player_Mixin._initMembers.call(this);
            this._stopMoveByInputReasons = [];
        }
        update(sceneActive) {
            if ($gameMap.isEnabledARPGMode()) {
                if (!this._playerBehavior) {
                    this._playerBehavior = new PlayerBehavior();
                    this.addComponent(this._playerBehavior);
                }
            } else {
                this._playerBehavior?.end();
                this._playerBehavior = void 0;
            }
            _Game_Player_Mixin._update.call(this, sceneActive);
            $gameParty.leader().updateStatesDuration();
        }
        onStartTargetSelect() {
            this.addDisableMoveReason("targetSelect");
        }
        onEndTargetSelect() {
            this.removeDisableMoveReason("targetSelect");
            this._playerBehavior.delayAttackable(2);
        }
        moveByInput() {
            if (this.isStoppedMoveByInput())
                return;
            _Game_Player_Mixin._moveByInput.call(this);
        }
        stopMoveByInput(reason) {
            if (!this._stopMoveByInputReasons.includes(reason))
                this._stopMoveByInputReasons.push(reason);
        }
        resumeMoveByInput(reason) {
            this._stopMoveByInputReasons = this._stopMoveByInputReasons.filter((r) => r !== reason);
        }
        isStoppedMoveByInput() {
            return this._stopMoveByInputReasons.length > 0;
        }
    };
    var Game_Player_Mixin = _Game_Player_Mixin;
    Game_Player_Mixin._initMembers = Game_Player.prototype.initMembers;
    Game_Player_Mixin._update = Game_Player.prototype.update;
    Game_Player_Mixin._moveByInput = Game_Player.prototype.moveByInput;
    mixin(Game_Player, Game_Player_Mixin);

    // ts/ARPG_Core/ARPG_BattlerParameters.ts
    var ARPG_BattlerParameters = class {
        constructor() {
            this._skillCancelDamageRate = 0;
            this._noDamageFlag = false;
            this._noAttackFlag = false;
        }
        get skillCancelDamageRate() {
            return this._skillCancelDamageRate;
        }
        set skillCancelDamageRate(value) {
            this._skillCancelDamageRate = value;
        }
        get justGuardFrame() {
            return this._justGuardFrame;
        }
        set justGuardFrame(value) {
            this._justGuardFrame = value;
        }
        get noDamageFlag() {
            return this._noDamageFlag;
        }
        set noDamageFlag(_noDamageFlag) {
            this._noDamageFlag = _noDamageFlag;
        }
        get noAttackFlag() {
            return this._noAttackFlag;
        }
        set noAttackFlag(_noAttackFlag) {
            this._noAttackFlag = _noAttackFlag;
        }
    };

    // ts/ARPG_Core/ARPG_Enemy.ts
    var ARPG_Enemy = class extends ARPG_Battler {
        constructor(enemyId, opt = {}) {
            super();
            this._needHpGauge = false;
            this._showHpGauge = true;
            this._defeated = false;
            this._arpgParameters = new ARPG_BattlerParameters();
            this._enemy = new Game_Enemy(enemyId, 0, 0);
            this._enemy.refresh();
            this._enemy.recoverAll();
            if (opt.collideAttackSkillId != null)
                this.setCollideAttackSkillId(opt.collideAttackSkillId);
            if (opt.damageCommonEventId != null)
                this._damageCommonEventId = opt.damageCommonEventId;
            if (opt.defeatEnemyCommonEventId != null)
                this._defeatEnemyCommonEventId = opt.defeatEnemyCommonEventId;
        }
        update() {
            super.update();
            this.battler().updateStatesDuration();
        }
        battler() {
            return this._enemy;
        }
        enemy() {
            return this.battler();
        }
        name() {
            return this.enemy().battlerName();
        }
        arpgParameters() {
            return this._arpgParameters;
        }
        isEnemy() {
            return true;
        }
        checkOpponent(battler) {
            return battler.isActor();
        }
        exp() {
            return this._enemy.exp();
        }
        gold() {
            return this._enemy.gold();
        }
        isNeedCharacterHpGauge() {
            return this._needHpGauge;
        }
        isCharacterHpGaugeVisibled() {
            if (this.isDefeated())
                return false;
            return this._showHpGauge;
        }
        setupNormalHpGauge(opt = {}) {
            this._needHpGauge = true;
            this._normalHpGaugeOption = {
                hpGaugeColor1: opt.hpGaugeColor1,
                hpGaugeColor2: opt.hpGaugeColor2,
                hpGaugePosition: opt.hpGaugePosition,
                hpGaugeYOffset: opt.hpGaugeYOffset,
                hpGaugeHeight: opt.hpGaugeHeight
            };
        }
        setHpGaugeVisible(visible) {
            this._showHpGauge = visible;
        }
        normalHpGaugeOption() {
            return this._normalHpGaugeOption;
        }
        makeRecvDamageComponent(result) {
            const recvDamageComponent = ARPG_CustomManager.enemyRecvDamageComponent(this, result);
            let damageComponent;
            if (this.isAlive()) {
                damageComponent = recvDamageComponent;
            } else {
                const deadComponent = new BattlerDeadComponent(ARPG_CustomManager.enemyDefeatComponent(this, result));
                damageComponent = new ChainComponent([recvDamageComponent, deadComponent, this.onDefeat.bind(this)]);
            }
            return damageComponent;
        }
        onDefeat() {
            this._defeated = true;
            const exp = this.exp();
            for (const actor of $gameParty.allMembers()) {
                actor.gainExp(exp);
            }
            $gameParty.gainGold(this.gold());
        }
        isDefeated() {
            return this._defeated;
        }
        damageCommonEventId() {
            if (this._damageCommonEventId != null && this._damageCommonEventId > 0)
                return this._damageCommonEventId;
            return ARPG_CorePluginParams.EnemySetting.DamageCommonEventId;
        }
        defeatEnemyCommonEventId() {
            if (this._defeatEnemyCommonEventId != null && this._defeatEnemyCommonEventId > 0)
                return this._defeatEnemyCommonEventId;
            return ARPG_CorePluginParams.EnemySetting.DefeatEnemyCommonEventId;
        }
    };

    // ts/ARPG_Core/ARPG_SkillObject.ts
    var import_DotMoveSystem3 = __require("DotMoveSystem");
    var ARPG_SkillObject = class extends Component {
        constructor(skill, user) {
            super();
            this._attackHitChecker = new HitChecker("attack");
            this._customHitCheckers = /* @__PURE__ */ new Map();
            this._skillObjectPositionController = new SkillObjectPositionController(this);
            this._skill = skill;
            this._userBattler = user;
        }
        get attackHitChecker() {
            return this._attackHitChecker;
        }
        get customHitCheckers() {
            return this._customHitCheckers;
        }
        setup() {
            super.setup();
            this.addComponent(this._attackHitChecker);
            this.addComponent(this._skillObjectPositionController);
        }
        skill() {
            return this._skill;
        }
        userBattler() {
            return this._userBattler;
        }
        setAttackDeg(deg) {
            this._attackDeg = deg;
        }
        attackDeg() {
            return this._attackDeg;
        }
        isUserPositionSynchronized() {
            return this._skillObjectPositionController.isBusy();
        }
        setUserPositionSynchronize(synchronize) {
            if (synchronize) {
                this._skillObjectPositionController.resume();
            } else {
                this._skillObjectPositionController.stop();
            }
        }
        makeSkillObject(srcMapId, srcEventIdOrName, skill, x = 0, y = 0) {
            const event = $gameMap.makeDynamicEvent(srcMapId, srcEventIdOrName, x, y);
            if (skill == null) {
                skill = this._skill;
            }
            event.setupSkillObject(skill.skillOrItem, skill.id, this._userBattler);
            let userKind = 0;
            let userEventId = 0;
            const userCharacter = this._userBattler.user();
            if (userCharacter instanceof Game_Player) {
                userKind = 1;
            } else if (userCharacter instanceof Game_Event) {
                userKind = 3;
                userEventId = userCharacter.eventId();
            }
            if (ARPG_CorePluginParams.SkillObjectSetting.SkillObjectUserKindSelfVariableId > 0) {
                event.setSelfVariableValue(ARPG_CorePluginParams.SkillObjectSetting.SkillObjectUserKindSelfVariableId, userKind);
            }
            if (ARPG_CorePluginParams.SkillObjectSetting.SkillObjectUserEventIdSelfVariableId > 0) {
                event.setSelfVariableValue(ARPG_CorePluginParams.SkillObjectSetting.SkillObjectUserEventIdSelfVariableId, userEventId);
            }
            return event;
        }
        createEffect(subject, target, skill) {
            return new ARPG_Effect(subject, target, skill, this.attackDeg());
        }
        applyDamageEffectToBattler(battler, arpgSkill) {
            if (battler.isNoDamage())
                return;
            const effect = this.createEffect(this.userBattler(), battler, arpgSkill);
            this.user().setExSelfSwitchValue(ARPG_CorePluginParams.SkillObjectSetting.CollisionDetectExSelfSwitchId, true);
            battler.recvDamage(effect);
        }
        hitFlagOn() {
            this.user().setExSelfSwitchValue(ARPG_CorePluginParams.SkillObjectSetting.CollisionDetectExSelfSwitchId, true);
        }
    };
    var SkillObjectPositionController = class extends Component {
        constructor(skillObject) {
            super();
            this._skillObject = skillObject;
            this.stop();
        }
        update() {
            super.update();
            const skillObjectEvent = this._skillObject.user();
            const currentUserPosition = this._skillObject.userBattler().user().positionPoint();
            if (this._lastUserPosition && !this._lastUserPosition.equals(currentUserPosition)) {
                const diffX = currentUserPosition.x - this._lastUserPosition.x;
                const diffY = currentUserPosition.y - this._lastUserPosition.y;
                const diff = new import_DotMoveSystem3.DotMovePoint(diffX, diffY);
                skillObjectEvent.setPositionPoint(skillObjectEvent.positionPoint().add(diff));
            }
            this._lastUserPosition = currentUserPosition;
        }
    };

    // ts/ARPG_Core/ARPG_FieldObject.ts
    var ARPG_FieldObject = class extends Component {
        constructor(opt = {}) {
            super();
            this._damageHitChecker = new HitChecker("damage");
            this._customHitCheckers = /* @__PURE__ */ new Map();
            this._damageCommonEventId = opt.damageCommonEventId ?? 0;
        }
        get damageHitChecker() {
            return this._damageHitChecker;
        }
        get customHitCheckers() {
            return this._customHitCheckers;
        }
        start() {
            super.start();
            this.addComponent(this._damageHitChecker);
        }
        update() {
            super.update();
            this.updateRecvDamage();
        }
        updateRecvDamage() {
            const character = this.user();
            if (character instanceof Game_Event) {
                if (character.isErased())
                    return;
            }
            const hitCharacters = this._damageHitChecker.checkHit("attack");
            let skill;
            let skillUser;
            let hitObject;
            for (const character2 of hitCharacters) {
                if (character2.isSkillObject()) {
                    hitObject = character2.skillObject();
                    skill = character2.skillObject().skill();
                    skillUser = character2.skillObject().userBattler();
                } else if (character2.isBattler()) {
                    hitObject = character2.battler();
                    const skillId = character2.battler().collideAttackSkillId();
                    if (skillId > 0) {
                        skill = new ARPG_Skill("skill", skillId);
                        skillUser = character2.battler();
                    }
                }
            }
            if (hitObject && skill && skillUser) {
                this._recvDamageInfo = { skill, skillUser };
                const component = ARPG_CustomManager.fieldObjectRecvDamageComponent(this);
                if (component)
                    this.addComponent(new ChainComponent([component, this.onEndRecvDamage.bind(this)]));
                if (hitObject instanceof ARPG_SkillObject)
                    hitObject.hitFlagOn();
            }
        }
        damageCommonEventId() {
            return this._damageCommonEventId;
        }
        isDamageReceiving() {
            return !!this._recvDamageInfo;
        }
        checkDamageElement(elementName) {
            if (!this._recvDamageInfo)
                return false;
            const allElements = $dataSystem.elements;
            const attackElementIds = this._recvDamageInfo.skillUser.attackElementIds().concat(this._recvDamageInfo.skill.elementIds());
            for (let i = 0; i < allElements.length; i++) {
                if (allElements[i] === elementName) {
                    if (attackElementIds.includes(i))
                        return true;
                }
            }
            return false;
        }
        onEndRecvDamage() {
            this._recvDamageInfo = void 0;
        }
    };

    // ts/ARPG_Core/Game_Event.ts
    var _Game_Event_Mixin2 = class extends Game_Event {
        initMembers() {
            _Game_Event_Mixin2._initMembers.call(this);
            this._stopSelfMovementReasons = [];
        }
        isValid() {
            const margin = 2;
            if (this._realX >= $gameMap.displayX() - margin && this._realY >= $gameMap.displayY() - margin) {
                if (this._realX + this.width() <= $gameMap.displayX() + 17 + margin && this._realY + this.height() <= $gameMap.displayY() + 13 + margin) {
                    return true;
                }
            }
            return false;
        }
        endARPGProcess() {
            Game_Character.prototype.endARPGProcess.call(this);
            const battler = this.arpgTempData().battler;
            if (battler && battler.isEnemy()) {
                battler.end();
                this.arpgTempData().battler = void 0;
            }
            const skillObject = this.arpgTempData().skillObject;
            if (skillObject) {
                skillObject.end();
                this.arpgTempData().skillObject = void 0;
            }
        }
        isErased() {
            return this._erased;
        }
        setupSkillObject(skillOrItem, id, user) {
            const skill = new ARPG_Skill(skillOrItem, id);
            const skillObject = new ARPG_SkillObject(skill, user);
            this.arpgTempData().skillObject = skillObject;
            this.addComponent(skillObject);
        }
        setupEnemy(enemyId, opt = {}) {
            const battler = new ARPG_Enemy(enemyId, opt);
            this.arpgTempData().battler = battler;
            this.addComponent(battler);
        }
        setupFieldObject(opt = {}) {
            const fieldObject = new ARPG_FieldObject(opt);
            this.arpgTempData().fieldObject = fieldObject;
            this.addComponent(fieldObject);
        }
        updateRoutineMove() {
            if (!(this.isBattler() && this.battler().isEnemy()) || !SceneManager._scene._messageWindow.isOpen()) {
                _Game_Event_Mixin2._updateRoutineMove.call(this);
            }
        }
        updateSelfMovement() {
            if (this.isStoppedSelfMovement())
                return;
            _Game_Event_Mixin2._updateSelfMovement.call(this);
        }
        stopSelfMovement(reason) {
            if (!this._stopSelfMovementReasons.includes(reason))
                this._stopSelfMovementReasons.push(reason);
        }
        resumeSelfMovement(reason) {
            this._stopSelfMovementReasons = this._stopSelfMovementReasons.filter((r) => r !== reason);
        }
        isStoppedSelfMovement() {
            return this._stopSelfMovementReasons.length > 0;
        }
        interpreter() {
            if (this._interpreter == null)
                return void 0;
            return this._interpreter;
        }
        updateParallel() {
            if (this._interpreter && this._interpreter.isLocked())
                return;
            _Game_Event_Mixin2._updateParallel.call(this);
        }
    };
    var Game_Event_Mixin2 = _Game_Event_Mixin2;
    Game_Event_Mixin2._initMembers = Game_Event.prototype.initMembers;
    Game_Event_Mixin2._updateRoutineMove = Game_Event.prototype.updateRoutineMove;
    Game_Event_Mixin2._updateSelfMovement = Game_Event.prototype.updateSelfMovement;
    Game_Event_Mixin2._updateParallel = Game_Event.prototype.updateParallel;
    mixin(Game_Event, Game_Event_Mixin2);

    // ts/ARPG_Core/LevelUpProcessor.ts
    var LevelUpProcessor = class extends Processor {
        constructor(actor, levelUpMessage, newSkills) {
            super();
            this._actor = actor;
            this._displayLevelUpProcessor = new DisplayLevelUpProcessor(levelUpMessage, newSkills);
        }
        *process() {
            this.addComponent(this._displayLevelUpProcessor);
            const component = ARPG_CustomManager.levelUpComponent(this._actor);
            if (component) {
                $gamePlayer.addComponent(component);
                yield* this.waitComponent(component);
            }
            yield* this.waitComponent(this._displayLevelUpProcessor);
        }
    };
    var DisplayLevelUpProcessor = class extends Processor {
        constructor(levelUpMessage, newSkills) {
            super();
            this._levelUpMessage = levelUpMessage;
            this._newSkills = newSkills;
        }
        *process() {
            const w = 640;
            const h = 64;
            const x = Graphics.boxWidth / 2 - w / 2;
            const y = 0;
            const rect = new Rectangle(x, y, w, h);
            $gameMap.showCommonMessageWindow(this._levelUpMessage, rect);
            for (const skill of this._newSkills) {
                yield* this.waitProcess(30);
                const text = TextManager.obtainSkill.format(skill.name);
                $gameMap.showCommonMessageWindow(text, rect);
            }
        }
    };

    // ts/ARPG_Core/Game_Actor.ts
    var _Game_Actor_Mixin = class extends Game_Actor {
        initialize(actorId) {
            _Game_Actor_Mixin._initialize.call(this, actorId);
            this._arpgParameters = new ARPG_BattlerParameters();
        }
        displayLevelUp(newSkills) {
            if (SceneManager._scene instanceof Scene_Map) {
                const text = TextManager.levelUp.format(
                    this._name,
                    TextManager.level,
                    this._level
                );
                $gamePlayer.addComponent(new LevelUpProcessor(this, text, newSkills));
            } else {
                _Game_Actor_Mixin._displayLevelUp.call(this, newSkills);
            }
        }
        arpgParameters() {
            return this._arpgParameters;
        }
    };
    var Game_Actor_Mixin = _Game_Actor_Mixin;
    Game_Actor_Mixin._initialize = Game_Actor.prototype.initialize;
    Game_Actor_Mixin._displayLevelUp = Game_Actor.prototype.displayLevelUp;
    mixin(Game_Actor, Game_Actor_Mixin);

    // ts/ARPG_Core/Game_Party.ts
    var Game_Party_Mixin = class extends Game_Party {
        changeNextActor(currentActorId) {
            let currentIndex = -1;
            let nextIndex = -1;
            for (let i = 0; i < this._actors.length - 1; i++) {
                if (this.allMembers()[i].actorId() === currentActorId) {
                    currentIndex = i;
                    break;
                }
            }
            if (currentIndex < 0)
                return false;
            for (let i = currentIndex + 1; i < this._actors.length; i++) {
                if (this.allMembers()[i].isAlive()) {
                    nextIndex = i;
                    break;
                }
            }
            if (nextIndex < 0)
                return false;
            const currentId = this._actors[currentIndex];
            const nextId = this._actors[nextIndex];
            this._actors = this._actors.filter((id) => id !== currentId && id !== nextId);
            this._actors.push(currentId);
            this._actors.unshift(nextId);
            $gamePlayer.refresh();
            return true;
        }
        leader() {
            for (const member of this.allMembers()) {
                if (member.isAlive())
                    return member;
            }
            return this.battleMembers()[0];
        }
    };
    mixin(Game_Party, Game_Party_Mixin);

    // ts/ARPG_Core/Game_Interpreter.ts
    var _Game_Interpreter_Mixin = class extends Game_Interpreter {
        initialize() {
            _Game_Interpreter_Mixin._initialize.call(this);
            this._needChantWait = false;
            this._needTargetSelectWait = false;
        }
        clear() {
            _Game_Interpreter_Mixin._clear.call(this);
            this._lockReason = [];
        }
        lock(reason) {
            if (!this._lockReason.includes(reason)) {
                this._lockReason.push(reason);
            }
        }
        unlock(reason) {
            this._lockReason = this._lockReason.filter((r) => r !== reason);
        }
        isLocked() {
            return this._lockReason.length > 0;
        }
        update() {
            if (this.isLocked())
                return;
            _Game_Interpreter_Mixin._update.call(this);
        }
        event() {
            return $gameMap.event(this._eventId);
        }
        findCharacterBySpecification(param) {
            let characterKind = 0;
            if (param.CharacterKindByVariable === 0) {
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
            } else {
                characterKind = $gameVariables.value(param.CharacterKindByVariable);
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
        findArpgSkillBySpecification(param) {
            if (param.SkillOrItem === "skill") {
                let idOrName;
                if (param.SkillIdByVariable > 0) {
                    idOrName = $gameVariables.value(param.SkillIdByVariable);
                } else if (param.SkillByName && param.SkillByName !== "") {
                    idOrName = param.SkillByName;
                } else {
                    idOrName = param.SkillId;
                }
                return new ARPG_Skill("skill", idOrName);
            } else if (param.SkillOrItem === "item") {
                let idOrName;
                if (param.ItemIdByVariable > 0) {
                    idOrName = $gameVariables.value(param.ItemIdByVariable);
                } else if (param.ItemByName && param.ItemByName !== "") {
                    idOrName = param.ItemByName;
                } else {
                    idOrName = param.ItemId;
                }
                return new ARPG_Skill("item", idOrName);
            }
            throw new Error(`${JSON.stringify(param)} is invalid.`);
        }
        eventNameToId(eventName) {
            for (const event of $gameMap.events()) {
                if (event.event().name === eventName) {
                    return event.eventId();
                }
            }
            throw new Error(`Event name(${eventName}) is not found.`);
        }
        arpgCharacter() {
            if (this._eventId > 0) {
                return $gameMap.event(this._eventId);
            } else {
                return $gamePlayer;
            }
        }
        updateWait() {
            const result = _Game_Interpreter_Mixin._updateWait.call(this);
            if (result)
                return true;
            return this.updateWait_ARPG_Core();
        }
        updateWait_ARPG_Core() {
            const character = this.arpgCharacter();
            if (!character)
                return false;
            if (this._needChantWait) {
                if (character.isBattler() && character.battler().isChanting()) {
                    return true;
                } else {
                    this._needChantWait = false;
                    return false;
                }
            } else if (this._needTargetSelectWait) {
                if ($gameMap.isTargetSelecting()) {
                    return true;
                } else {
                    this._needTargetSelectWait = false;
                    return false;
                }
            } else if (this._blowAwayWaitCharacter) {
                if (this._blowAwayWaitCharacter.isBlowingAway()) {
                    return true;
                } else {
                    this._blowAwayWaitCharacter = void 0;
                    return false;
                }
            } else if (this._actionWaitCharacter) {
                if (this._actionWaitCharacter.isActionWaiting()) {
                    return true;
                } else {
                    this._actionWaitCharacter = void 0;
                    return false;
                }
            }
            return false;
        }
    };
    var Game_Interpreter_Mixin = _Game_Interpreter_Mixin;
    Game_Interpreter_Mixin._initialize = Game_Interpreter.prototype.initialize;
    Game_Interpreter_Mixin._clear = Game_Interpreter.prototype.clear;
    Game_Interpreter_Mixin._update = Game_Interpreter.prototype.update;
    Game_Interpreter_Mixin._updateWait = Game_Interpreter.prototype.updateWait;
    mixin(Game_Interpreter, Game_Interpreter_Mixin);

    // ts/ARPG_Core/Game_Action.ts
    var Game_Action_Mixin = class extends Game_Action {
        calcElementRate(target) {
            const attackElementIds = new Set(this.subject().attackElements());
            for (const elementId of ARPG_Utils.itemAttackElementIds(this.item())) {
                attackElementIds.add(elementId);
            }
            return this.elementsMaxRate(target, this.subject().attackElements().concat(...attackElementIds));
        }
    };
    mixin(Game_Action, Game_Action_Mixin);

    // ts/ARPG_Core/Sprite_HitBox.ts
    var Sprite_HitBox = class extends Sprite {
        constructor(...args) {
            super(...args);
        }
        initialize(hitBox) {
            super.initialize();
            this.initMembers();
            this._hitBox = hitBox;
            this.bitmap = this.createBitmap();
            this.update();
        }
        initMembers() {
            this.anchor.x = 0;
            this.anchor.y = 0;
        }
        createBitmap() {
            const width = this._hitBox.width() * $gameMap.tileWidth();
            const height = this._hitBox.height() * $gameMap.tileHeight();
            const bitmap = new Bitmap(width, height);
            bitmap.fillRect(0, 0, width, height, this._hitBox.hitBoxColor);
            return bitmap;
        }
        hitBox() {
            return this._hitBox;
        }
        checkHitBox(hitBox) {
            return this._hitBox === hitBox;
        }
        update() {
            super.update();
            this.updatePosition();
            this.updateVisibility();
        }
        updatePosition() {
            this.x = this._hitBox.screenX();
            this.y = this._hitBox.screenY();
            this.z = this._hitBox.screenZ();
        }
        updateVisibility() {
            this.visible = this._hitBox.isEnabled();
        }
    };

    // ts/ARPG_Core/Sprite_CommonGauge.ts
    var Sprite_CommonGauge = class extends Sprite_Gauge {
        constructor(...args) {
            super(...args);
        }
        initialize(...args) {
            const [width, height, config] = args;
            this._config = Object.assign({}, config);
            this._gaugeWidth = width;
            this._gaugeHeight = height;
            super.initialize();
        }
        gaugeWidth() {
            return this._gaugeWidth;
        }
        gaugeHeight() {
            return this._gaugeHeight;
        }
        bitmapWidth() {
            return this.gaugeWidth();
        }
        bitmapHeight() {
            return this.gaugeHeight();
        }
        gaugeColor1() {
            switch (this._statusType) {
                case "hp":
                    if (this._config.hpGaugeColor1)
                        return this._config.hpGaugeColor1;
                    return ColorManager.hpGaugeColor1();
                case "mp":
                    if (this._config.mpGaugeColor1)
                        return this._config.mpGaugeColor1;
                    return ColorManager.mpGaugeColor1();
                case "tp":
                    if (this._config.tpGaugeColor1)
                        return this._config.tpGaugeColor1;
                    return ColorManager.tpGaugeColor1();
                case "time":
                    if (this._config.ctGaugeColor1)
                        return this._config.ctGaugeColor1;
                    return ColorManager.ctGaugeColor1();
                default:
                    if (this._config.normalColor)
                        return this._config.normalColor;
                    return ColorManager.normalColor();
            }
        }
        gaugeColor2() {
            switch (this._statusType) {
                case "hp":
                    if (this._config.hpGaugeColor2)
                        return this._config.hpGaugeColor2;
                    return ColorManager.hpGaugeColor2();
                case "mp":
                    if (this._config.mpGaugeColor2)
                        return this._config.mpGaugeColor2;
                    return ColorManager.mpGaugeColor2();
                case "tp":
                    if (this._config.tpGaugeColor2)
                        return this._config.tpGaugeColor2;
                    return ColorManager.tpGaugeColor2();
                case "time":
                    if (this._config.ctGaugeColor2)
                        return this._config.ctGaugeColor2;
                    return ColorManager.ctGaugeColor2();
                default:
                    return ColorManager.normalColor();
            }
        }
        drawGauge() {
            const gaugeX = this.gaugeX();
            const gaugeY = 0;
            const gaugewidth = this.gaugeWidth();
            const gaugeHeight = this.gaugeHeight();
            this.drawGaugeRect(gaugeX, gaugeY, gaugewidth, gaugeHeight);
        }
        gaugeX() {
            return 0;
        }
        textHeight() {
            return 0;
        }
        redraw() {
            this.bitmap.clear();
            const currentValue = this.currentValue();
            if (!isNaN(currentValue)) {
                this.drawGauge();
            }
        }
    };

    // ts/ARPG_Core/Sprite_Label.ts
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

    // ts/CommonLibrary/Container.ts
    var Container = class extends PIXI.Container {
        constructor(...args) {
            super();
            this.initialize(...args);
        }
        initialize(...args) {
            this._hidden = false;
        }
        update() {
            for (const child of this.children) {
                if (child.update) {
                    child.update();
                }
            }
        }
        hide() {
            this._hidden = true;
            this.updateVisibility();
        }
        show() {
            this._hidden = false;
            this.updateVisibility();
        }
        updateVisibility() {
            this.visible = !this._hidden;
        }
        move(x, y) {
            this.x = x;
            this.y = y;
        }
    };

    // ts/ARPG_Core/BossHpGaugeContainer.ts
    var BossHpGaugeContainer = class extends Container {
        initialize() {
            super.initialize();
            this._bossHpGauge = this.createBossHpGauge();
            this.addChild(this._bossHpGauge);
            this._bossHpGaugeLabel = this.createBossHpGaugeLabel();
            this.addChild(this._bossHpGaugeLabel);
        }
        setupBossHpGauge(battler) {
            this._bossHpGauge.setup(battler.battler(), "hp");
        }
        createBossHpGauge() {
            const hpGaugeColor1 = ARPG_CorePluginParams.EnemyHpGaugeSetting.BossEnemyHpGaugeColor1;
            const hpGaugeColor2 = ARPG_CorePluginParams.EnemyHpGaugeSetting.BossEnemyHpGaugeColor2;
            const hpGaugeYOffset = ARPG_CorePluginParams.EnemyHpGaugeSetting.BossEnemyHpGaugeYOffset == null ? 16 : ARPG_CorePluginParams.EnemyHpGaugeSetting.BossEnemyHpGaugeYOffset;
            const hpGaugeWidth = ARPG_CorePluginParams.EnemyHpGaugeSetting.BossEnemyHpGaugeWidth == null ? 500 : ARPG_CorePluginParams.EnemyHpGaugeSetting.BossEnemyHpGaugeWidth;
            const hpGaugeHeight = ARPG_CorePluginParams.EnemyHpGaugeSetting.BossEnemyHpGaugeHeight == null ? 12 : ARPG_CorePluginParams.EnemyHpGaugeSetting.BossEnemyHpGaugeHeight;
            const bossHpGauge = new Sprite_CommonGauge(hpGaugeWidth, hpGaugeHeight, { hpGaugeColor1, hpGaugeColor2 });
            bossHpGauge.x = (Graphics.boxWidth - bossHpGauge.gaugeWidth()) / 2;
            bossHpGauge.y = hpGaugeYOffset;
            bossHpGauge.anchor.y = 0.5;
            return bossHpGauge;
        }
        createBossHpGaugeLabel() {
            const bossHpGaugeLabel = new Sprite_Label(64, Math.floor($gameSystem.mainFontSize() * 1.5));
            bossHpGaugeLabel.anchor.x = 1;
            bossHpGaugeLabel.x = this._bossHpGauge.x;
            bossHpGaugeLabel.anchor.y = 0.5;
            bossHpGaugeLabel.y = this._bossHpGauge.y + this._bossHpGauge.bitmapHeight() / 2;
            bossHpGaugeLabel.text = ARPG_CorePluginParams.EnemyHpGaugeSetting.BossEnemyHpGaugeLabel;
            return bossHpGaugeLabel;
        }
    };

    // ts/ARPG_Core/Spriteset_Map.ts
    var _Spriteset_Map_Mixin3 = class extends Spriteset_Map {
        initialize() {
            _Spriteset_Map_Mixin3._initialize.call(this);
            this._hitBoxSprites = /* @__PURE__ */ new Set();
        }
        update() {
            _Spriteset_Map_Mixin3._update.call(this);
            if ($gameMap.isStopped()) {
                this._tilemap.stopAnimation();
            } else {
                this._tilemap.resumeAnimation();
            }
            this.updateBossHpGauge();
            this.updateHitBoxSprites();
        }
        updateHitBoxSprites() {
            if (ARPG_CorePluginParams.HitBoxSetting.VisibleHitAreaSwitchId > 0 && $gameSwitches.value(ARPG_CorePluginParams.HitBoxSetting.VisibleHitAreaSwitchId)) {
                const hitBoxs = $gameMap.allHitBoxs();
                const hasSpriteHitBoxs = /* @__PURE__ */ new Set();
                for (const sprite of this._hitBoxSprites) {
                    hasSpriteHitBoxs.add(sprite.hitBox());
                }
                for (const hitBox of hitBoxs) {
                    if (!hasSpriteHitBoxs.has(hitBox))
                        this.createHitBoxSprite(hitBox);
                }
                for (const hitBox of hasSpriteHitBoxs) {
                    if (!hitBoxs.has(hitBox))
                        this.deleteHitBoxSprite(hitBox);
                }
            } else {
                for (const sprite of this._hitBoxSprites) {
                    this.deleteHitBoxSprite(sprite.hitBox());
                }
            }
        }
        createHitBoxSprite(hitBox) {
            const sprite = new Sprite_HitBox(hitBox);
            this._hitBoxSprites.add(sprite);
            this._tilemap.addChild(sprite);
        }
        deleteHitBoxSprite(hitBox) {
            const sprite = this.findTargetHitBoxSprite(hitBox);
            if (!sprite)
                return;
            this._hitBoxSprites.delete(sprite);
            this._tilemap.removeChild(sprite);
        }
        findTargetHitBoxSprite(target) {
            return [...this._hitBoxSprites].find((sprite) => sprite.checkHitBox(target));
        }
        updatePosition() {
            const screen = $gameScreen;
            const scale = screen.zoomScale();
            this._baseSprite.scale.x = scale;
            this._baseSprite.scale.y = scale;
            this._baseSprite.x = Math.round(-screen.zoomX() * (scale - 1));
            this._baseSprite.y = Math.round(-screen.zoomY() * (scale - 1));
            this._baseSprite.x += Math.round(screen.shake());
        }
        // TODO: 本当に必要か要検討
        destroy(options) {
        }
        createLowerLayer() {
            _Spriteset_Map_Mixin3._createLowerLayer.call(this);
            this.createBossHpGaugeContainer();
        }
        createBossHpGaugeContainer() {
            this._bossHpGaugeContainer = new BossHpGaugeContainer();
            this._bossHpGaugeContainer.hide();
            this.addChild(this._bossHpGaugeContainer);
        }
        setupBossHpGauge(battler) {
            this._bossHpGaugeContainer.setupBossHpGauge(battler);
            this._bossHpGaugeContainer.show();
        }
        updateBossHpGauge() {
            const enemy = $gameTemp.arpgGlobalTempData().bossHpGaugeTargetEnemy;
            if (enemy && enemy.isCharacterHpGaugeVisibled()) {
                this._bossHpGaugeContainer.show();
            } else {
                this._bossHpGaugeContainer.hide();
            }
        }
    };
    var Spriteset_Map_Mixin3 = _Spriteset_Map_Mixin3;
    Spriteset_Map_Mixin3._initialize = Spriteset_Map.prototype.initialize;
    Spriteset_Map_Mixin3._update = Spriteset_Map.prototype.update;
    Spriteset_Map_Mixin3._createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
    Spriteset_Map_Mixin3._findTargetSprite = Spriteset_Map.prototype.findTargetSprite;
    mixin(Spriteset_Map, Spriteset_Map_Mixin3);

    // ts/ARPG_Core/Sprite_MapEventGauge.ts
    var _Sprite_MapEventGauge = class extends Sprite_CommonGauge {
        constructor(...args) {
            super(...args);
        }
        initialize(...args) {
            const [characterSprite, position, yOffset, height, config] = args;
            this._characterSprite = characterSprite;
            this._position = position;
            this._yOffset = yOffset;
            let width = this._characterSprite.spriteWidth();
            width = width > 48 ? this._characterSprite.spriteWidth() : 48;
            super.initialize(width, height, config);
        }
        initMembers() {
            super.initMembers();
            this.anchor.x = 0.5;
            if (this._position === "up") {
                this.anchor.y = 1;
            } else {
                this.anchor.y = 0;
            }
            this.inner = new Point();
            this.inner.x = 0;
            if (this._position === "up") {
                let height = this._characterSprite.spriteHeight();
                height = height > 48 ? this._characterSprite.spriteHeight() : 48;
                this.inner.y = -height + this._yOffset;
            } else {
                this.inner.y = this._yOffset;
            }
            this._currentBitmapWidth = 0;
        }
        redraw() {
            this.bitmap.clear();
            const currentValue = this.currentValue();
            if (!isNaN(currentValue)) {
                this.drawGauge();
            }
        }
        update() {
            _Sprite_MapEventGauge._update.call(this);
            if (this._currentBitmapWidth !== this.bitmapWidth()) {
                this.bitmap?.destroy();
                this.createBitmap();
            }
            if (this._position === "up") {
                let height = this._characterSprite.spriteHeight();
                height = height > 48 ? this._characterSprite.spriteHeight() : 48;
                this.inner.y = -height + this._yOffset;
            } else {
                this.inner.y = this._yOffset;
            }
        }
        createBitmap() {
            _Sprite_MapEventGauge._createBitmap.call(this);
            this._currentBitmapWidth = this.bitmapWidth();
        }
    };
    var Sprite_MapEventGauge = _Sprite_MapEventGauge;
    Sprite_MapEventGauge._update = Sprite_CommonGauge.prototype.update;
    Sprite_MapEventGauge._createBitmap = Sprite_CommonGauge.prototype.createBitmap;

    // ts/ARPG_Core/Sprite_Character.ts
    var _Sprite_Character_Mixin2 = class extends Sprite_Character {
        initMembers() {
            _Sprite_Character_Mixin2._initMembers.call(this);
            this._innerChildren = [];
            this._pressed = false;
        }
        update() {
            _Sprite_Character_Mixin2._update.call(this);
            this.updateHpGauge();
            this.updateInnerChildren();
            this.processTouch();
        }
        character() {
            return this._character;
        }
        addInnerChild(child) {
            this._innerChildren.push(child);
            const tilemap = SceneManager._scene._spriteset._tilemap;
            tilemap.addChild(child);
            tilemap._sortChildren();
        }
        removeInnerChild(child) {
            this._innerChildren = this._innerChildren.filter((cld) => cld !== child);
            const tilemap = SceneManager._scene._spriteset._tilemap;
            tilemap.removeChild(child);
        }
        updateInnerChildren() {
            for (const child of this._innerChildren) {
                if (!child.inner)
                    continue;
                child.x = this.x + child.inner.x;
                child.y = this.y + child.inner.y;
                if (child.innerVisible == null) {
                } else {
                    child.visible = child.innerVisible;
                }
            }
        }
        updateHpGauge() {
            if (this._character.isNeedCharacterHpGauge()) {
                if (!this._hpGauge) {
                    this.createHpGauge();
                }
                this._hpGauge.visible = this._character.isCharacterHpGaugeVisibled();
            }
        }
        createHpGauge() {
            const position = this._character.hpGaugePosition();
            const yOfs = this._character.hpGaugeYOffset();
            const hpGaugeColor1 = this._character.hpGaugeColor1();
            const hpGaugeColor2 = this._character.hpGaugeColor2();
            const hpGaugeHeight = this._character.hpGaugeHeight();
            this._hpGauge = new Sprite_MapEventGauge(this, position, yOfs, hpGaugeHeight, { hpGaugeColor1, hpGaugeColor2 });
            this.addInnerChild(this._hpGauge);
            this._hpGauge.setup(this._character.battler().battler(), "hp");
        }
        processTouch() {
            if (this.isClickEnabled()) {
                if (this.isBeingTouched()) {
                    if (TouchInput.isTriggered()) {
                        this._pressed = true;
                        this.onPress();
                    }
                } else {
                    this._pressed = false;
                }
                if (this._pressed && TouchInput.isReleased()) {
                    this._pressed = false;
                    this.onClick();
                }
            } else {
                this._pressed = false;
            }
        }
        isPressed() {
            return this._pressed;
        }
        isClickEnabled() {
            return this.worldVisible;
        }
        isBeingTouched() {
            const touchPos = new Point(TouchInput.x, TouchInput.y);
            const localPos = this.worldTransform.applyInverse(touchPos);
            return this.hitTest(localPos.x, localPos.y);
        }
        hitTest(x, y) {
            const width = this.spriteWidth();
            const height = this.spriteHeight();
            const rect = new Rectangle(
                -this.anchor.x * width,
                -this.anchor.y * height,
                width,
                height
            );
            return rect.contains(x, y);
        }
        spriteWidth() {
            let baseWidth;
            if (this._bushDepth > 0 && this._upperBody && this._lowerBody) {
                baseWidth = this._upperBody.width;
            } else {
                baseWidth = this.width;
            }
            return baseWidth * this.scale.x;
        }
        spriteHeight() {
            let baseHeight;
            if (this._bushDepth > 0 && this._upperBody && this._lowerBody) {
                baseHeight = this._upperBody.height + this._lowerBody.height;
            } else {
                baseHeight = this.height;
            }
            return baseHeight * this.scale.y;
        }
        onPress() {
            this._character.onPress();
        }
        onClick() {
            this._character.onClick();
        }
    };
    var Sprite_Character_Mixin3 = _Sprite_Character_Mixin2;
    Sprite_Character_Mixin3._initMembers = Sprite_Character.prototype.initMembers;
    Sprite_Character_Mixin3._update = Sprite_Character.prototype.update;
    mixin(Sprite_Character, Sprite_Character_Mixin3);

    // ts/ARPG_Core/Scene_Map.ts
    if (!Scene_Map.prototype.hasOwnProperty("isAutosaveEnabled")) {
        Scene_Map.prototype.isAutosaveEnabled = function() {
            return Scene_Base.prototype.isAutosaveEnabled.call(this);
        };
    }
    var _Scene_Map_Mixin3 = class extends Scene_Map {
        initialize() {
            _Scene_Map_Mixin3._initialize.call(this);
            this._setupBossHpGaugeCompleted = false;
        }
        start() {
            _Scene_Map_Mixin3._start.call(this);
            $gameMap.startSceneIndication(this);
        }
        update() {
            _Scene_Map_Mixin3._update.call(this);
            if (!this._setupBossHpGaugeCompleted) {
                const battler = $gameTemp.arpgGlobalTempData().bossHpGaugeTargetEnemy;
                if (battler) {
                    this._spriteset.setupBossHpGauge(battler);
                    this._setupBossHpGaugeCompleted = true;
                }
            }
        }
        terminate() {
            Scene_Message.prototype.terminate.call(this);
            if (!SceneManager.isNextScene(Scene_Battle)) {
                this._spriteset.update();
                this._mapNameWindow.hide();
                this.hideMenuButton();
                SceneManager.snapForBackground();
            }
            $gameScreen.clearZoom();
            $gameMap.terminateSceneIndication(this);
        }
        createSpriteset() {
            if (!this._spriteset) {
                this._spriteset = new Spriteset_Map();
                this.addChild(this._spriteset);
                this._spriteset.update();
            }
        }
        createSkillNameWindowCallback(window2) {
            this.addWindow(window2);
        }
        deleteSkillNameWindowCallback(window2) {
            this._windowLayer.removeChild(window2);
        }
        checkGameover() {
            if (!$gameMap.isEnabledARPGMode()) {
                _Scene_Map_Mixin3._checkGameover.call(this);
            }
        }
        isMenuEnabled() {
            const result = _Scene_Map_Mixin3._isMenuEnabled.call(this);
            if (!result)
                return false;
            if ($gameMap.isEnabledARPGMode()) {
                if ($gamePlayer.battler().isChanting())
                    return false;
            }
            return true;
        }
        isMenuCalled() {
            if (TouchInput.isCancelled())
                return true;
            let keysym = ARPG_Utils.getKeySymbol("Menu");
            if (keysym == null)
                keysym = "menu";
            if (Input.isTriggered(keysym))
                return true;
            return false;
        }
        updateMain() {
            $gameTemp.arpgGlobalTempData().controlCharacter.update();
            if (!$gameMap.isStopped()) {
                _Scene_Map_Mixin3._updateMain.call(this);
            }
        }
        isAutosaveEnabled() {
            const result = _Scene_Map_Mixin3._isAutosaveEnabled.call(this);
            if (!result)
                return false;
            if ($gameMap.isEnabledARPGMode())
                return false;
            return true;
        }
    };
    var Scene_Map_Mixin3 = _Scene_Map_Mixin3;
    Scene_Map_Mixin3._initialize = Scene_Map.prototype.initialize;
    Scene_Map_Mixin3._start = Scene_Map.prototype.start;
    Scene_Map_Mixin3._update = Scene_Map.prototype.update;
    Scene_Map_Mixin3._checkGameover = Scene_Map.prototype.checkGameover;
    Scene_Map_Mixin3._isMenuEnabled = Scene_Map.prototype.isMenuEnabled;
    Scene_Map_Mixin3._updateMain = Scene_Map.prototype.updateMain;
    Scene_Map_Mixin3._isAutosaveEnabled = Scene_Map.prototype.isAutosaveEnabled;
    mixin(Scene_Map, Scene_Map_Mixin3);

    // ts/ARPG_Core/Tilemap.ts
    var _Tilemap_Mixin = class extends Tilemap {
        initialize() {
            _Tilemap_Mixin._initialize.call(this);
            this._stoppedAnimation = false;
        }
        update() {
            if (!this._stoppedAnimation) {
                this.animationCount++;
                this.animationFrame = Math.floor(this.animationCount / 30);
            }
            for (const child of this.children) {
                if (child.update) {
                    child.update();
                }
            }
        }
        stopAnimation() {
            this._stoppedAnimation = true;
        }
        resumeAnimation() {
            this._stoppedAnimation = false;
        }
    };
    var Tilemap_Mixin = _Tilemap_Mixin;
    Tilemap_Mixin._initialize = Tilemap.prototype.initialize;
    Tilemap_Mixin._update = Tilemap.prototype.update;
    mixin(Tilemap, Tilemap_Mixin);

    // ts/ARPG_Core/Game_System.ts
    var _Game_System_Mixin = class extends Game_System {
        isSaveEnabled() {
            const result = _Game_System_Mixin._isSaveEnabled.call(this);
            if (!result)
                return false;
            if ($gameMap.isEnabledARPGMode())
                return false;
            return true;
        }
    };
    var Game_System_Mixin = _Game_System_Mixin;
    Game_System_Mixin._isSaveEnabled = Game_System.prototype.isSaveEnabled;
    mixin(Game_System, Game_System_Mixin);

    // ts/ARPG_Core/CharacterMover.ts
    var import_DotMoveSystem4 = __require("DotMoveSystem");
    var _CharacterMover_Mixin = class extends import_DotMoveSystem4.CharacterMover {
        continuousMoveProcess() {
            if (this._character.isDisableMove()) {
                this._character.cancelAcceleration();
                this._character._moving = false;
                this.cancelMove();
            } else {
                _CharacterMover_Mixin._continuousMoveProcess.call(this);
            }
        }
        dotMoveByDeg(deg, dpf = this._character.distancePerFrame()) {
            if (this._character.isDisableMove()) {
                this._character.cancelAcceleration();
                this._character._moving = false;
                this.cancelMove();
            } else {
                _CharacterMover_Mixin._dotMoveByDeg.call(this, deg, dpf);
            }
        }
    };
    var CharacterMover_Mixin = _CharacterMover_Mixin;
    CharacterMover_Mixin._continuousMoveProcess = import_DotMoveSystem4.CharacterMover.prototype.continuousMoveProcess;
    CharacterMover_Mixin._dotMoveByDeg = import_DotMoveSystem4.CharacterMover.prototype.dotMoveByDeg;
    mixin(import_DotMoveSystem4.CharacterMover, CharacterMover_Mixin);

    // ts/ARPG_Core/CharacterCollisionChecker.ts
    var import_DotMoveSystem5 = __require("DotMoveSystem");
    var _CharacterCollisionChecker_Mixin = class extends import_DotMoveSystem5.CharacterCollisionChecker {
        checkPassMass(ix, iy, d) {
            if (!$gameMap.isValid(ix, iy)) {
                if (this._character.isNoCheckMapValid()) {
                    return true;
                } else {
                    return false;
                }
            }
            return _CharacterCollisionChecker_Mixin._checkPassMass.call(this, ix, iy, d);
        }
    };
    var CharacterCollisionChecker_Mixin = _CharacterCollisionChecker_Mixin;
    CharacterCollisionChecker_Mixin._checkPassMass = import_DotMoveSystem5.CharacterCollisionChecker.prototype.checkPassMass;
    mixin(import_DotMoveSystem5.CharacterCollisionChecker, CharacterCollisionChecker_Mixin);

    // ts/ARPG_Core/Window_MenuCommand.ts
    var _Window_MenuCommand_Mixin = class extends Window_MenuCommand {
        isFormationEnabled() {
            const result = _Window_MenuCommand_Mixin._isFormationEnabled.call(this);
            if (!result)
                return false;
            if (!ARPG_Utils.isChangeActorEnabled())
                return false;
            return true;
        }
    };
    var Window_MenuCommand_Mixin = _Window_MenuCommand_Mixin;
    Window_MenuCommand_Mixin._isFormationEnabled = Window_MenuCommand.prototype.isFormationEnabled;
    mixin(Window_MenuCommand, Window_MenuCommand_Mixin);

    // ts/ARPG_Core/Sprite.ts
    var _Sprite_Mixin = class extends Sprite {
        initialize(...args) {
            _Sprite_Mixin._initialize.call(this, ...args);
            this._componentRunner = new ComponentRunner(this);
        }
        update() {
            _Sprite_Mixin._update.call(this);
            this._componentRunner.update();
        }
        addComponent(component) {
            this._componentRunner.addComponent(component);
        }
        removeComponent(component) {
            this._componentRunner.removeComponent(component);
        }
        hasComponent(component) {
            return this._componentRunner.hasComponent(component);
        }
        hasComponentByClass(componentClass) {
            return this._componentRunner.hasComponentByClass(componentClass);
        }
    };
    var Sprite_Mixin = _Sprite_Mixin;
    Sprite_Mixin._initialize = Sprite.prototype.initialize;
    Sprite_Mixin._update = Sprite.prototype.update;
    mixin(Sprite, Sprite_Mixin);

    // ts/ARPG_Core/Main.ts
    simpleExport("ARPG_Core/ARPG_Actor/ARPG_Actor", ARPG_Actor);
    simpleExport("ARPG_Core/ARPG_BattleManager/ARPG_BattleManager", ARPG_BattleManager);
    simpleExport("ARPG_Core/ARPG_Battler/ARPG_Battler", ARPG_Battler);
    simpleExport("ARPG_Core/ARPG_BattlerParameters/ARPG_BattlerParameters", ARPG_BattlerParameters);
    simpleExport("ARPG_Core/ARPG_CharacterTempData/ARPG_CharacterTempData", ARPG_CharacterTempData);
    simpleExport("ARPG_Core/ARPG_CorePluginParams/ARPG_CorePluginParams", ARPG_CorePluginParams);
    simpleExport("ARPG_Core/ARPG_Effect/ARPG_Effect", ARPG_Effect);
    simpleExport("ARPG_Core/ARPG_SkillObject/ARPG_SkillObject", ARPG_SkillObject);
    simpleExport("ARPG_Core/ARPG_Enemy/ARPG_Enemy", ARPG_Enemy);
    simpleExport("ARPG_Core/ARPG_Skill/ARPG_Skill", ARPG_Skill);
    simpleExport("ARPG_Core/ARPG_Utils/ARPG_Utils", ARPG_Utils);
    simpleExport("ARPG_Core/ARPG_CustomManager/ARPG_CustomManager", ARPG_CustomManager);
    simpleExport("ARPG_Core/HitBox/HitBox", HitBox);
    simpleExport("ARPG_Core/HitChecker/HitChecker", HitChecker);
    simpleExport("ARPG_Core/CharacterBlowAwayProcessor/CharacterBlowAwayProcessor", CharacterBlowAwayProcessor);
    simpleExport("ARPG_Core/LevelUpProcessor/LevelUpProcessor", LevelUpProcessor);
    simpleExport("ARPG_Core/PlayerBehavior/PlayerBehavior", PlayerBehavior);
    simpleExport("ARPG_Core/MessageWindowController/MessageWindowController", MessageWindowController);
    simpleExport("ARPG_Core/Sprite_HitBox/Sprite_HitBox", Sprite_HitBox);
    simpleExport("ARPG_Core/Sprite_MapEventGauge/Sprite_MapEventGauge", Sprite_MapEventGauge);
    simpleExport("ARPG_Core/Sprite_Label/Sprite_Label", Sprite_Label);
    simpleExport("CommonLibrary/ChainComponent/ChainComponent", ChainComponent);
    simpleExport("CommonLibrary/CommonEventComponent/CommonEventComponent", CommonEventComponent);
    simpleExport("CommonLibrary/Component/Component", Component);
    simpleExport("CommonLibrary/ComponentRunner/ComponentRunner", ComponentRunner);
    simpleExport("CommonLibrary/Degree/Degree", Degree);
    simpleExport("CommonLibrary/HttpRequest/HttpRequest", HttpRequest);
    simpleExport("CommonLibrary/HttpResponse/HttpResponse", HttpResponse);
    simpleExport("CommonLibrary/MapLoader/MapLoader", MapLoader);
    simpleExport("CommonLibrary/mixin/mixin", mixin);
    simpleExport("CommonLibrary/PluginParamsParser/PluginParamsParser", PluginParamsParser);
    simpleExport("CommonLibrary/Processor/Processor", Processor);
    simpleExport("CommonLibrary/TimerComponent/TimerComponent", TimerComponent);
    window.ARPG_BattlerParameters = ARPG_BattlerParameters;
})();

require = __tmp__require;

