/*!/*:
@target MZ
@plugindesc CharacterImageEx v1.1.2
@author unagi ootoro
@help
This plugin introduces various extensions for character images.
By using this plugin, the following functions can be used.
・Rotation and scaling of characters
・Use of picture images
・Change hue
・Sub-priority setting of events

【How to use】
■ Set the angle at which the character's image is displayed.
In the first annotation on the event page
<angle: display angle>
If you write, you can set the display angle of the character image to the specified value.

Example: If you want the character to face 90 degrees
<angle: 90>

■ Flip character images left and right
In the first Comment on the event page
<mirror>
in the first Comment on the event page, the character image will be displayed reversed left to right.

■ Change character magnification rate
In the first Comment on the event page
<scaleX: X-axis scaling factor>
<scaleY: Y-axis scaling factor>
to display the character image reversed left to right.

Example: To magnify by 1.5x
<scaleX: 1.5>
<scaleY: 1.5>

■ Set the origin of rotation/scaling
In the first Comment on the event page
<anchorX: origin of X axis>
<anchorY: Y-axis origin>
in the first Comment on the event page, you can set the origin for rotation/scaling.

Example: To set the center as the origin
<anchorX: 0.5>
<anchorY: 0.5>

If you do not set the origin, anchorX=0.5 and anchorY=1 will be applied by default.

■ Character Image Color Tone
In the first Comment on the event page
<tone: RED, GREEN, BLUE, GRAY>
in the first Comment on the event page, you can change the color tone of the character image.

Example: To change RED=255, GREEN=64, BLUE=64, GRAY=0
<tone: 255, 64, 64, 0>

■ Displaying Picture Images
In the first Comment on the event page
<picture: image name>
in the first Comment on the event page, the specified picture will be displayed.
For the image name, use the image name registered in the "List of registered images" plugin parameter.

Example: To specify an image with Actor1_2 as the image name
<picture: Actor1_2>

It is also possible to partially display a picture by including the following in the Comment.
<pictureFrame X-coordinate, Y-coordinate, width, height>

Example: To display only the range of X coordinate=100, Y coordinate=100, width=200, height=200
<pictureFrame 100, 100, 200, 200>

■ Displaying icon images
in the first annotation on the event page
<iconIndex: icon number>
will display the specified icon.

Example: When specifying icon number 100
<iconIndex: 100>

■ Event display subpriority function
The order in which events are displayed on the screen (priority) can be set to "Below characters", "Same as characters" or "Above characters".
However, by specifying a subpriority, you can decide which priority is given to a character when the priority is the same.
To specify a subpriority, add the following to the first Comment on the event page
<subpri: subpriority value>
in the first Comment on the event page.
If no subpriority is specified, the default value of 100 is applied.

Example: To set subpriority value = 110
<subpri: 110>

■ Comment settings are applied to all event pages
The above Comment settings are applied to each event page.
However, if you include the following information in the first Comment on the first page
The settings will be applied to all pages.
<imageExAllPagesApply>

If you set Comments on pages other than the first page with this setting, the Comment setting will take precedence.

■ Changing Comment parameter values by the plugin commands
You can change the value of the parameter specified by Comment with plugin commands.
See the plugin commands for the detail.
If the value of the Comment parameter has been changed, then the parameter doesn't reflect the Comment settings.

■ Character Rotation
The "Start Rotation" plug-in command rotates the specified character.
Executing "Stop Rotation" will stop the rotation of the character. If "Start Rotation" is executed again in this state, the rotation will resume.
the character will resume rotation. To return to the original state, execute "Stop Rotation" and then "Reset Rotation".
to return to the original state.

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


@command SetAngle
@text Set angle
@desc Set the angle of the character.

@arg CharacterSpecification
@text Character Specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
Specify the target character.

@arg Angle
@text Angle (constant)
@type number
@min 0
@max 359.99
@decimals 2
@default 0
@desc
Specify a constant angle.

@arg AngleByVariable
@text Angle (variable)
@type variable
@default 0
@desc
Specify a variable ID which is referred to for the angle.


@command SetMirror
@text Mirror settings
@desc Specify image mirror settings.

@arg CharacterSpecification
@text Character Specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
Specify a target character.

@arg Mirror
@text Mirror
@type boolean
@default true
@desc
Specify mirror or not.


@command SetScale
@text Set scale
@desc Specify a scale for the character.

@arg CharacterSpecification
@text Character Specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
Specify a target character.

@arg ScaleX
@text Scale X (constant)
@type number
@min 0
@max 1
@decimals 2
@default 1
@desc
Specify the constant horizontal scale.

@arg ScaleXByVariable
@text Scale X (variable)
@type variable
@default 0
@desc
Specify a variable ID which is referred to for the horizontal scale.

@arg ScaleY
@text Scale Y (constant)
@type number
@min 0
@max 1
@decimals 2
@default 1
@desc
Specify the constant vertical scale.

@arg ScaleYByVariable
@text Scale Y (variable)
@type variable
@default 0
@desc
Specify a variable ID which is referred to for the vertical scale.


@command SetAnchor
@text SetOrigin
@desc Sets the character's display origin.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification
@desc
Specify the target character.

@arg X
@text Origin X coordinate (specify directly)
@type number
@min 0
@max 1
@decimals 2
@default 0
@desc
Specify the X coordinate of the origin when specifying directly.

@arg XByVariable
@text X coordinate of origin (specify variable)
@type variable
@default 0
@desc
Specify the X coordinate of the origin when specifying a variable.

@arg Y
@text Origin Y coordinate (directly specified)
@type number
@min 0
@max 1
@decimals 2
@default 0
@desc
Specify the Y coordinate of the origin when specifying directly.

@arg YByVariable
@text Y coordinate of origin (specify variable)
@type variable
@default 0
@desc
Specify Y-coordinate of origin when variable is specified.

@command SetTone
@text Set tone
@desc Specify tones for the character.

@arg CharacterSpecification
@text Character Specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
Specify a target character.

@arg Red
@text Red
@type number
@min 0
@max 255
@default 0
@desc
Specify the red value.

@arg Green
@text Green
@type number
@min 0
@max 255
@default 0
@desc
Specify the green value.

@arg Blue
@text Blue
@type number
@min 0
@max 255
@default 0
@desc
Specify the blue value.

@arg Gray
@text Gray
@type number
@min 0
@max 255
@default 0
@desc
Specify the gray value.


@command SetPicture
@text Set picture
@desc Specify the picture for the character.

@arg CharacterSpecification
@text Character Specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
Specify a target character.

@arg PictureName
@text Picture name
@type string
@desc
Specify an image name which is included in the plugin parameter "List of registered images".

@arg PictureFrame
@text Picture frame
@type struct<PictureFrame>
@desc
Specify a picture frame.


@command SetSubPriority
@text Sub-priority settings
@desc Sub-priority settings for characters.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
Specify a target character.

@arg SubPriority
@text Sub-priority (constant)
@type number
@min 0
@default 100
@desc
Specify a constant value for the sub-priority.

@arg SubPriorityByVariable
@text Sub-priority (variable)
@type variable
@default 0
@desc
Specify a variable ID which is referred to for the sub-priority.


@command StartRotation
@text Start rotation
@desc Start character rotation.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
Specify the target character.

@arg RotationSpeed
@text rotation speed
@type number
@default 4
@desc
Specify the rotation speed.

@arg RotationDirection
@text Rotation direction
@type select
@option left
@value left
@option right
@value right
@default right
@desc
Specifies the direction of rotation.

@command StopRotation
@text Stop Rotation
@desc Stop rotation of the character.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
Specify the target character.


@command ResetRotation
@text Reset rotation
@desc Resets the character rotation.

@arg CharacterSpecification
@text Character specification
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
Specify a target character.


@param RegisterImages
@text List of registered images
@type struct<RegisterImage>[]
@default []
@desc
Register image files to be used with this plugin.

*/
/*!/*~struct~CharacterSpecification:
@param CharacterKind
@text Character type
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
/*!/*~struct~RegisterImage:
@param ImageName
@text imageName
@type string
@desc
Specify the name of the image to be registered. The name set here is used for Comments, etc.

@param FileName
@text File name
@type file
@dir img
@desc
Specify the file name of the image.
*/
/*!/*~struct~PictureFrame:
@param X
@text X coordinate
@type number
@min 0
@decimals 2
@default 0
@desc
Specifies the X coordinate.

@param Y
@text Y coordinate
@type number
@min 0
@decimals 2
@default 0
@desc
Specifies the Y coordinate.

@param Width
@text Width
@type number
@min 0
@decimals 2
@default 1
@desc
Specifies the width.

@param Height
@text Height
@type number
@min 0
@decimals 2
@default 1
@desc
Specifies the height.
*/
/*!/*:ja
@target MZ
@plugindesc キャラクター画像拡張 v1.1.2
@author うなぎおおとろ
@help
キャラクター画像についてさまざまな拡張機能を導入するプラグインです。
このプラグインを使用することで以下の機能を使用することができるようになります。
・キャラクターの回転拡大縮小
・ピクチャ画像の使用
・色相の変更
・イベントのサブプライオリティ設定

【使用方法】
■ キャラクターの画像表示角度設定
イベントページの最初の注釈に
<angle: 表示角度>
と記載するとキャラクター画像の表示角度を指定した値にすることができます。

例: 90度の方を向かせる場合
<angle: 90>

■ キャラクター画像の左右反転
イベントページの最初の注釈に
<mirror>
と記載するとキャラクター画像を左右反転して表示します。

■ キャラクター拡大率の変更
イベントページの最初の注釈に
<scaleX: X軸の拡大率>
<scaleY: Y軸の拡大率>
と記載するとキャラクター画像を左右反転して表示します。

例: 1.5倍に拡大する場合
<scaleX: 1.5>
<scaleY: 1.5>

■ 回転/拡大縮小の原点の設定
イベントページの最初の注釈に
<anchorX: X軸の原点>
<anchorY: Y軸の原点>
と記載すると回転/拡大縮小を行う際の原点を設定することができます。

例: 中心を原点に設定する場合
<anchorX: 0.5>
<anchorY: 0.5>

なお、原点を設定しなかった場合、anchorX=0.5, anchorY=1がデフォルトで適用されます。

■ キャラクター画像の色調
イベントページの最初の注釈に
<tone: RED, GREEN, BLUE, GRAY>
と記載するとキャラクター画像の色調を変更することができます。

例: RED=255, GREEN=64, BLUE=64, GRAY=0 に変更する場合
<tone: 255, 64, 64, 0>

■ ピクチャ画像の表示
イベントページの最初の注釈に
<picture: 画像名>
と記載すると指定した画像を表示します。
画像名についてはプラグインパラメータ「登録画像一覧」で
登録した画像名を使用してください。

例: 画像名にActor1_2を指定した画像を指定する場合
<picture: Actor1_2>

また、注釈に以下のように記載することでピクチャを部分的に
表示することも可能です。
<pictureFrame X座標, Y座標, 横幅, 縦幅>

例: X座標=100, Y座標=100, 横幅=200, 縦幅=200 の範囲のみ表示する場合
<pictureFrame 100, 100, 200, 200>

■ アイコン画像の表示
イベントページの最初の注釈に
<iconIndex: アイコン番号>
と記載すると指定したアイコンを表示します。

例: アイコン番号100を指定する場合
<iconIndex: 100>

■ イベント表示サブプライオリティ機能
イベントの画面表示順(プライオリティ)は「通常キャラの下」「通常キャラと同じ」「通常キャラの上」の3種類が指定できますが、
サブプライオリティを指定することでプライオリティが同じ場合に更にどちらを優先するかを決めることができます。
サブプライオリティを指定する場合、イベントページの最初の注釈に
<subpri: サブプライオリティ値>
と記載します。
サブプライオリティを記載しなかった場合、デフォルトで100が適用されます。

例: サブプライオリティ値=110を設定する場合
<subpri: 110>

■ 注釈の設定を全てのイベントページに反映する
上記までの注釈の設定についてはイベントページごとに反映されますが、
1ページ目の最初の注釈に設定を記載したうえで以下の内容を併せて記載すると
全てのページに設定が反映されます。
<imageExAllPagesApply>

※ この設定を行った状態で1ページ目以外に注釈を設定するとその注釈の設定が優先されます。

■ プラグインコマンドからの注釈パラメータ変更
プラグインコマンドを使用することで注釈で指定したパラメータを変更することが可能です。
詳細は各プラグインコマンドを参照してください。
なお、プラグインコマンドで注釈パラメータを変更した場合、
以後そのパラメータについては注釈の設定は反映されなくなります。

■ キャラクターの回転
プラグインコマンド「回転開始」を実行すると指定したキャラクターを回転させることができます。
「回転停止」を実行するとキャラクターの回転を停止します。この状態で再び「回転開始」を実行すると
回転を再開します。元の状態に戻す場合は「回転停止」を実行したうえで「回転リセット」を
実行してください。


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


@command SetAngle
@text 角度設定
@desc キャラクターの表示角度を設定します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg Angle
@text 角度(直接指定)
@type number
@min 0
@max 359.99
@decimals 2
@default 0
@desc
直接指定を行う場合の角度を指定します。

@arg AngleByVariable
@text 角度(変数指定)
@type variable
@default 0
@desc
変数指定を行う場合の角度が格納された変数IDを指定します。


@command SetMirror
@text 左右反転設定
@desc キャラクターの左右反転を設定します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg Mirror
@text 反転
@type boolean
@default true
@desc
反転のON/OFFを設定します。


@command SetScale
@text 拡大率設定
@desc キャラクターの拡大率を開始します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg ScaleX
@text X軸拡大率(直接指定)
@type number
@min 0
@max 1
@decimals 2
@default 1
@desc
直接指定を行う場合のX軸方向の拡大率を指定します。

@arg ScaleXByVariable
@text X軸拡大率(変数指定)
@type variable
@default 0
@desc
変数指定を行う場合のX軸方向の拡大率が格納された変数IDを指定します。

@arg ScaleY
@text Y軸拡大率(直接指定)
@type number
@min 0
@max 1
@decimals 2
@default 1
@desc
直接指定を行う場合のX軸方向の拡大率を指定します。

@arg ScaleYByVariable
@text Y軸拡大率(変数指定)
@type variable
@default 0
@desc
変数指定を行う場合のY軸方向の拡大率が格納された変数IDを指定します。


@command SetAnchor
@text 原点設定
@desc キャラクターの表示原点を設定します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg X
@text 原点X座標(直接指定)
@type number
@min 0
@max 1
@decimals 2
@default 0.5
@desc
直接指定を行う場合の原点のX座標を指定します。

@arg XByVariable
@text 原点X座標(変数指定)
@type variable
@default 0
@desc
変数指定を行う場合の原点のX座標が格納された変数IDを指定します。

@arg Y
@text 原点Y座標(直接指定)
@type number
@min 0
@max 1
@decimals 2
@default 1
@desc
直接指定を行う場合の原点のY座標を指定します。

@arg YByVariable
@text 原点Y座標(変数指定)
@type variable
@default 0
@desc
変数指定を行う場合の原点のY座標が格納された変数IDを指定します。


@command SetTone
@text 色調設定
@desc キャラクターの色調を設定します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg Red
@text 赤
@type number
@min 0
@max 255
@default 0
@desc
色調の赤の数値を指定します。

@arg Green
@text 緑
@type number
@min 0
@max 255
@default 0
@desc
色調の緑の数値を指定します。

@arg Blue
@text 青
@type number
@min 0
@max 255
@default 0
@desc
色調の青の数値を指定します。

@arg Gray
@text グレー
@type number
@min 0
@max 255
@default 0
@desc
色調のグレーの数値を指定します。


@command SetPicture
@text ピクチャ設定
@desc キャラクターの表示ピクチャを設定します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg PictureName
@text 画像名
@type string
@desc
表示する画像名を指定します。画像名についてはプラグインパラメータ「登録画像一覧」で登録した画像名を使用してください。

@arg PictureFrame
@text ピクチャ表示枠
@type struct<PictureFrame>
@desc
ピクチャの表示枠を指定します。


@command SetSubPriority
@text 表示サブプライオリティ設定
@desc キャラクターの表示サブプライオリティを設定します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg SubPriority
@text サブプライオリティ(直接指定)
@type number
@min 0
@default 100
@desc
直接指定を行う場合のサブプライオリティを指定します。

@arg SubPriorityByVariable
@text サブプライオリティ(変数指定)
@type variable
@default 0
@desc
変数指定を行う場合のサブプライオリティが格納された変数IDを指定します。


@command StartRotation
@text 回転開始
@desc キャラクターの回転を開始します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。

@arg RotationSpeed
@text 回転速度
@type number
@default 4
@desc
回転速度を指定します。

@arg RotationDirection
@text 回転方向
@type select
@option 左
@value left
@option 右
@value right
@default right
@desc
回転方向を指定します。


@command StopRotation
@text 回転停止
@desc キャラクターの回転を停止します。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。


@command ResetRotation
@text 回転リセット
@desc キャラクターの回転角度をリセットします。

@arg CharacterSpecification
@text キャラクター指定
@type struct<CharacterSpecification>
@default {"CharacterKind":"thisEvent","CharacterKindByVariable":"0","EventIdOrName":"1","EventIdByVariable":"0","FollowerIndex":"1","FollowerIndexByVariable":"0","VehicleKind":"boat","VehicleKindByVariable":"0"}
@desc
対象となるキャラクターを指定します。


@param RegisterImages
@text 登録画像一覧
@type struct<RegisterImage>[]
@default []
@desc
本プラグインで使用する画像ファイルを登録します。
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
/*!/*~struct~RegisterImage:ja
@param ImageName
@text 画像名
@type string
@desc
登録する画像名を指定します。ここで設定した名前を注釈などで使用します。

@param FileName
@text ファイル名
@type file
@dir img
@desc
画像のファイル名を指定します。
*/
/*!/*~struct~PictureFrame:ja
@param X
@text X座標
@type number
@min 0
@decimals 2
@default 0
@desc
X座標を指定します。

@param Y
@text Y座標
@type number
@min 0
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

    // ts/CommonLibrary/mixin.ts
    function mixin(dest, src) {
        for (const name of Object.getOwnPropertyNames(src.prototype)) {
            if (name === "constructor")
                continue;
            const value = Object.getOwnPropertyDescriptor(src.prototype, name) || /* @__PURE__ */ Object.create(null);
            Object.defineProperty(dest.prototype, name, value);
        }
    }

    // ts/CharacterImageEx/CharacterImageEx.ts
    var CharacterImageExPluginName = document.currentScript ? decodeURIComponent(document.currentScript.src.match(/^.*\/(.+)\.js$/)[1]) : "CharacterImageEx";
    var CharacterImageExPluginParams = PluginParamsParser.parse(PluginManager.parameters(CharacterImageExPluginName));
    var DEFAULT_SUB_PRIORITY = 100;
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
    PluginManager.registerCommand(CharacterImageExPluginName, "SetAngle", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        const angle = params.AngleByVariable > 0 ? $gameVariables.value(params.AngleByVariable) : params.Angle;
        character.setAngle(angle);
    });
    PluginManager.registerCommand(CharacterImageExPluginName, "SetMirror", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        character.setMirror(!!params.Mirror);
    });
    PluginManager.registerCommand(CharacterImageExPluginName, "SetScale", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        const scaleX = params.ScaleXByVariable > 0 ? $gameVariables.value(params.ScaleXByVariable) : params.ScaleX;
        const scaleY = params.ScaleYByVariable > 0 ? $gameVariables.value(params.ScaleYByVariable) : params.ScaleY;
        character.setAnchorX(scaleX);
        character.setAnchorY(scaleY);
    });
    PluginManager.registerCommand(CharacterImageExPluginName, "SetAnchor", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        const x = params.XByVariable > 0 ? $gameVariables.value(params.XByVariable) : params.X;
        const y = params.YByVariable > 0 ? $gameVariables.value(params.YByVariable) : params.Y;
        character.setAnchorX(x);
        character.setAnchorY(y);
    });
    PluginManager.registerCommand(CharacterImageExPluginName, "SetTone", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        character.setTone([params.Red, params.Green, params.Blue, params.Gray]);
    });
    PluginManager.registerCommand(CharacterImageExPluginName, "SetPicture", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        character.setPicture(params.PictureName);
        const frame = new Rectangle(params.PictureFrame.X, params.PictureFrame.Y, params.PictureFrame.Width, params.PictureFrame.Height);
        character.setPictureFrame(frame);
    });
    PluginManager.registerCommand(CharacterImageExPluginName, "SetSubPriority", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        const subPriority = params.SubPriorityByVariable > 0 ? $gameVariables.value(params.SubPriorityByVariable) : params.SubPriority;
        character.setSubPriority(subPriority);
    });
    PluginManager.registerCommand(CharacterImageExPluginName, "StartRotation", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        character.startRotation(params.RotationSpeed, params.RotationDirection);
    });
    PluginManager.registerCommand(CharacterImageExPluginName, "StopRotation", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        character.stopRotation();
    });
    PluginManager.registerCommand(CharacterImageExPluginName, "ResetRotation", function(args) {
        const params = PluginParamsParser.parse(args);
        const character = this.findCharacterBySpecification(params.CharacterSpecification);
        character.resetRotation();
    });
    var REGISTERED_IMAGES = {};
    for (const registerImage of CharacterImageExPluginParams.RegisterImages) {
        REGISTERED_IMAGES[registerImage.ImageName] = registerImage.FileName;
    }
    var CharacterImageExTempData = class {
        constructor() {
            this.angle = 0;
            this.mirror = false;
            this.anchorX = 0.5;
            this.anchorY = 1;
            this.scaleX = 1;
            this.scaleY = 1;
            this.tone = void 0;
            this.picture = void 0;
            this.pictureFrame = void 0;
            this.iconIndex = 0;
            this.subPriority = DEFAULT_SUB_PRIORITY;
        }
    };
    var _Game_CharacterBase_Mixin = class extends Game_CharacterBase {
        characterImageExTempData() {
            return $gameTemp.characterImageExTempData(this);
        }
        angle() {
            if (this._angle == null)
                return this.characterImageExTempData().angle;
            return this._angle;
        }
        setAngle(rotation) {
            this._angle = rotation;
        }
        isMirror() {
            if (this._mirror == null)
                return this.characterImageExTempData().mirror;
            return this._mirror;
        }
        setMirror(mirror) {
            this._mirror = mirror;
        }
        startRotation(rotationSpeed = 8, rotationDirection = "right") {
            this._rotating = true;
            this._rotationSpeed = rotationSpeed;
            this._rotationDirection = rotationDirection;
        }
        stopRotation() {
            this._rotating = false;
        }
        resetRotation() {
            this._angle = 0;
        }
        anchorX() {
            if (this._anchorX == null)
                return this.characterImageExTempData().anchorX;
            return this._anchorX;
        }
        setAnchorX(anchorX) {
            this._anchorX = anchorX;
        }
        anchorY() {
            if (this._anchorY == null)
                return this.characterImageExTempData().anchorY;
            return this._anchorY;
        }
        setAnchorY(anchorY) {
            this._anchorY = anchorY;
        }
        scaleX() {
            if (this._scaleX == null)
                return this.characterImageExTempData().scaleX;
            return this._scaleX;
        }
        setScaleX(scaleX) {
            this._scaleX = scaleX;
        }
        scaleY() {
            if (this._scaleY == null)
                return this.characterImageExTempData().scaleY;
            return this._scaleY;
        }
        setScaleY(scaleY) {
            this._scaleY = scaleY;
        }
        tone() {
            if (this._tone == null)
                return this.characterImageExTempData().tone;
            return this._tone;
        }
        setTone(tone) {
            this._tone = tone;
        }
        update() {
            _Game_CharacterBase_Mixin._update.call(this);
            if (this._rotating)
                this.updateRotation();
        }
        updateRotation() {
            let angle = new Degree(this.angle());
            if (this._rotationDirection === "right") {
                angle = angle.add(this._rotationSpeed);
            } else {
                angle = angle.sub(this._rotationSpeed);
            }
            this._angle = angle.value;
        }
        screenX() {
            const tw = $gameMap.tileWidth();
            return Math.floor(this.scrolledX() * tw + tw * this.anchorX());
        }
        screenY() {
            const th = $gameMap.tileHeight();
            return Math.floor(
                this.scrolledY() * th + th * this.anchorY() - this.shiftY() - this.jumpHeight()
            );
        }
        picture() {
            if (this._picture == null)
                return this.characterImageExTempData().picture;
            return this._picture;
        }
        setPicture(picture) {
            this._picture = picture;
        }
        pictureFrame() {
            if (this._pictureFrame == null)
                return this.characterImageExTempData().pictureFrame;
            return this._pictureFrame;
        }
        setPictureFrame(pictureFrame) {
            this._pictureFrame = pictureFrame;
        }
        iconIndex() {
            if (this._iconIndex == null)
                return this.characterImageExTempData().iconIndex;
            return this._iconIndex;
        }
        setIconIndex(iconIndex) {
            this._iconIndex = iconIndex;
        }
        setSubPriority(subPriority) {
            this._subPriority = subPriority;
        }
        getSprite() {
            if (!(SceneManager._scene instanceof Scene_Map))
                return void 0;
            const spriteset = SceneManager._scene._spriteset;
            return spriteset.findTargetSprite(this);
        }
        screenZ2() {
            if (this._subPriority == null)
                return this.characterImageExTempData().subPriority;
            return this._subPriority;
        }
        characterName() {
            const picture = this.picture();
            if (picture)
                return `picture:${picture}`;
            return _Game_CharacterBase_Mixin._characterName.call(this);
        }
        characterIndex() {
            if (this.picture())
                return 0;
            return _Game_CharacterBase_Mixin._characterIndex.call(this);
        }
    };
    var Game_CharacterBase_Mixin = _Game_CharacterBase_Mixin;
    Game_CharacterBase_Mixin._update = Game_CharacterBase.prototype.update;
    Game_CharacterBase_Mixin._characterName = Game_CharacterBase.prototype.characterName;
    Game_CharacterBase_Mixin._characterIndex = Game_CharacterBase.prototype.characterIndex;
    mixin(Game_CharacterBase, Game_CharacterBase_Mixin);
    var _Game_Character_Mixin = class extends Game_Character {
        update() {
            _Game_Character_Mixin._update.call(this);
            if (this._rotating)
                this.updateRotation();
        }
    };
    var Game_Character_Mixin = _Game_Character_Mixin;
    Game_Character_Mixin._update = Game_Character.prototype.update;
    mixin(Game_Character, Game_Character_Mixin);
    var _Game_Event_Mixin = class extends Game_Event {
        initMembers() {
            _Game_Event_Mixin._initMembers.call(this);
        }
        refresh() {
            _Game_Event_Mixin._refresh.call(this);
            this.refreshImageEx();
        }
        refreshImageEx() {
            if (this._pageIndex < 0)
                return;
            const valuesPage0 = this.getAnnotationValues(0);
            if (valuesPage0.imageExAllPagesApply) {
                this.applyImageExAnnotationValues(valuesPage0, false);
                if (this._pageIndex >= 1) {
                    const values = this.getAnnotationValues(this._pageIndex);
                    this.applyImageExAnnotationValues(values, true);
                }
            } else {
                if (this._pageIndex >= 1) {
                    const values = this.getAnnotationValues(this._pageIndex);
                    this.applyImageExAnnotationValues(values, false);
                } else {
                    this.applyImageExAnnotationValues(valuesPage0, false);
                }
            }
        }
        applyImageExAnnotationValues(values, update) {
            const tempData = this.characterImageExTempData();
            if (values.angle != null) {
                tempData.angle = parseFloat(values.angle);
            } else if (!update) {
                tempData.angle = 0;
            }
            if (values.mirror != null) {
                tempData.mirror = values.mirror === "true";
            } else if (!update) {
                tempData.mirror = false;
            }
            if (values.anchorX != null) {
                tempData.anchorX = parseFloat(values.anchorX);
            } else if (!update) {
                tempData.anchorX = 0.5;
            }
            if (values.anchorY != null) {
                tempData.anchorY = parseFloat(values.anchorY);
            } else if (!update) {
                tempData.anchorY = 1;
            }
            if (values.scaleX != null) {
                tempData.scaleX = parseFloat(values.scaleX);
            } else if (!update) {
                tempData.scaleX = 1;
            }
            if (values.scaleY != null) {
                tempData.scaleY = parseFloat(values.scaleY);
            } else if (!update) {
                tempData.scaleY = 1;
            }
            if (values.scaleY != null) {
                tempData.scaleY = parseFloat(values.scaleY);
            } else if (!update) {
                tempData.scaleY = 1;
            }
            if (values.tone != null) {
                tempData.tone = JSON.parse(`[${values.tone}]`);
            } else if (!update) {
                tempData.tone = void 0;
            }
            if (values.picture != null) {
                tempData.picture = values.picture.replace(/^\s+/, "");
            } else if (!update) {
                tempData.picture = void 0;
            }
            if (values.pictureFrame != null) {
                tempData.pictureFrame = new Rectangle(...JSON.parse(`[${values.pictureFrame}]`));
            } else if (!update) {
                tempData.pictureFrame = void 0;
            }
            if (values.iconIndex != null) {
                tempData.iconIndex = parseInt(values.iconIndex);
            } else if (!update) {
                tempData.iconIndex = 0;
            }
            if (values.subpri != null) {
                tempData.subPriority = parseInt(values.subpri);
            } else if (!update) {
                tempData.subPriority = DEFAULT_SUB_PRIORITY;
            }
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
    Game_Event_Mixin._initMembers = Game_Event.prototype.initMembers;
    Game_Event_Mixin._refresh = Game_Event.prototype.refresh;
    mixin(Game_Event, Game_Event_Mixin);
    var _Game_Temp_Mixin = class extends Game_Temp {
        initialize() {
            _Game_Temp_Mixin._initialize.call(this);
            this._characterImageExTempDatas = /* @__PURE__ */ new Map();
        }
        characterImageExTempData(character) {
            let tempData = this._characterImageExTempDatas.get(character);
            if (tempData)
                return tempData;
            tempData = new CharacterImageExTempData();
            this._characterImageExTempDatas.set(character, tempData);
            return tempData;
        }
        clearCharacterImageExTempDatas() {
            this._characterImageExTempDatas = /* @__PURE__ */ new Map();
        }
    };
    var Game_Temp_Mixin = _Game_Temp_Mixin;
    Game_Temp_Mixin._initialize = Game_Temp.prototype.initialize;
    mixin(Game_Temp, Game_Temp_Mixin);
    var _Sprite_Character_Mixin = class extends Sprite_Character {
        initMembers() {
            _Sprite_Character_Mixin._initMembers.call(this);
            this._iconIndex = 0;
        }
        character() {
            return this._character;
        }
        update() {
            _Sprite_Character_Mixin._update.call(this);
            this.updateAnchor();
            this.updateRotate();
            this.updateScale();
            this.updateTone();
            this.updateZ2();
        }
        createHalfBodySprites() {
            _Sprite_Character_Mixin._createHalfBodySprites.call(this);
            this._upperBody.anchor.x = 0.5;
            this._upperBody.anchor.y = 1;
            this._lowerBody.anchor.x = 0.5;
            this._lowerBody.anchor.y = 0;
        }
        updateHalfBodySprites() {
            _Sprite_Character_Mixin._updateHalfBodySprites.call(this);
            if (this._bushDepth > 0) {
                const halfBodyPos = this.calcHalfBodyPos();
                this._upperBody.x = halfBodyPos.x;
                this._upperBody.y = halfBodyPos.y;
                this._lowerBody.x = halfBodyPos.x;
                this._lowerBody.y = halfBodyPos.y;
            }
        }
        calcHalfBodyPos() {
            const tw = $gameMap.tileWidth();
            const th = $gameMap.tileHeight();
            const atx = 0.5;
            const aty = 1 - this._bushDepth / th;
            const x = (atx - this._character.anchorX()) * tw;
            const y = (aty - this._character.anchorY()) * th;
            return new Point(x, y);
        }
        updateRotate() {
            this.rotation = new Degree(this._character.angle() + 90).toRad();
        }
        updateAnchor() {
            this.anchor.x = this._character.anchorX();
            this.anchor.y = this._character.anchorY();
        }
        updateScale() {
            if (this._character.isMirror()) {
                this.scale.x = -this._character.scaleX();
            } else {
                this.scale.x = this._character.scaleX();
            }
            this.scale.y = this._character.scaleY();
        }
        updateTone() {
            const tone = this._character.tone();
            if (tone) {
                if (this._toneFilter == null) {
                    if (this.filters == null)
                        this.filters = [];
                    this._toneFilter = new ColorFilter();
                    this.filters.push(this._toneFilter);
                }
                this._toneFilter.setColorTone(tone);
            } else {
                if (this._toneFilter) {
                    this.filters = this.filters.filter((filter) => filter !== this._toneFilter);
                    this._toneFilter = void 0;
                }
            }
        }
        updateBitmap() {
            if (this.isImageChanged()) {
                this._tilesetId = $gameMap.tilesetId();
                this._tileId = this._character.tileId();
                this._characterName = this._character.characterName();
                this._characterIndex = this._character.characterIndex();
                this._pictureImageName = this._character.picture();
                this._iconIndex = this._character.iconIndex();
                if (this._character.picture()) {
                    this.setPictureBitmap();
                } else if (this._character.iconIndex() > 0) {
                    this.setIconBitmap();
                } else if (this._tileId > 0) {
                    this.setTileBitmap();
                } else {
                    this.setCharacterBitmap();
                }
            }
        }
        isImageChanged() {
            const result = _Sprite_Character_Mixin._isImageChanged.call(this);
            if (result)
                return true;
            if (this._pictureImageName !== this._character.picture())
                return true;
            if (this._iconIndex !== this._character.iconIndex())
                return true;
            return false;
        }
        updateZ2() {
            this.z2 = this._character?.screenZ2();
        }
        setPictureBitmap() {
            const pictureImageName = this._character.picture();
            if (pictureImageName) {
                const fileName = REGISTERED_IMAGES[pictureImageName];
                this.bitmap = ImageManager.loadBitmap("img/", fileName);
            }
        }
        setIconBitmap() {
            if (this._character.iconIndex() > 0) {
                this.bitmap = ImageManager.loadSystem("IconSet");
            }
        }
        updateFrame() {
            if (this._character.picture()) {
                const pictureFrame = this._character.pictureFrame();
                if (pictureFrame) {
                    this.setFrame(pictureFrame.x, pictureFrame.y, pictureFrame.width, pictureFrame.height);
                } else {
                    this.setFrame(0, 0, this.bitmap.width, this.bitmap.height);
                }
            } else if (this._character.iconIndex() > 0) {
                const iconIndex = this._character.iconIndex();
                const pw = ImageManager.iconWidth;
                const ph = ImageManager.iconHeight;
                const sx = iconIndex % 16 * pw;
                const sy = Math.floor(iconIndex / 16) * ph;
                this.setFrame(sx, sy, pw, ph);
            } else {
                _Sprite_Character_Mixin._updateFrame.call(this);
            }
        }
        updateVisibility() {
            Sprite.prototype.updateVisibility.call(this);
            if (this.isEmptyCharacter() || this._character.isTransparent()) {
                this.visible = false;
            }
        }
        isEmptyCharacter() {
            const result = _Sprite_Character_Mixin._isEmptyCharacter.call(this);
            if (!result)
                return false;
            if (this._pictureImageName)
                return false;
            if (this._iconIndex != null && this._iconIndex > 0)
                return false;
            return true;
        }
    };
    var Sprite_Character_Mixin = _Sprite_Character_Mixin;
    Sprite_Character_Mixin._initMembers = Sprite_Character.prototype.initMembers;
    Sprite_Character_Mixin._update = Sprite_Character.prototype.update;
    Sprite_Character_Mixin._createHalfBodySprites = Sprite_Character.prototype.createHalfBodySprites;
    Sprite_Character_Mixin._updateBitmap = Sprite_Character.prototype.updateBitmap;
    Sprite_Character_Mixin._isImageChanged = Sprite_Character.prototype.isImageChanged;
    Sprite_Character_Mixin._updateFrame = Sprite_Character.prototype.updateFrame;
    Sprite_Character_Mixin._isEmptyCharacter = Sprite_Character.prototype.isEmptyCharacter;
    Sprite_Character_Mixin._updateHalfBodySprites = Sprite_Character.prototype.updateHalfBodySprites;
    mixin(Sprite_Character, Sprite_Character_Mixin);
    var _Scene_Map_Mixin = class extends Scene_Map {
        start() {
            _Scene_Map_Mixin._start.call(this);
            $gameTemp.clearCharacterImageExTempDatas();
            for (const event of $gameMap.events()) {
                event.refreshImageEx();
            }
        }
    };
    var Scene_Map_Mixin = _Scene_Map_Mixin;
    Scene_Map_Mixin._start = Scene_Map.prototype.start;
    mixin(Scene_Map, Scene_Map_Mixin);
    var Tilemap_Mixin = class extends Tilemap {
        _compareChildOrder(a, b) {
            const aZ2 = a.z2 ?? DEFAULT_SUB_PRIORITY;
            const bZ2 = b.z2 ?? DEFAULT_SUB_PRIORITY;
            if (a.z !== b.z) {
                return a.z - b.z;
            } else if (aZ2 !== bZ2) {
                return aZ2 - bZ2;
            } else if (a.y !== b.y) {
                return a.y - b.y;
            } else {
                return a.spriteId - b.spriteId;
            }
        }
    };
    mixin(Tilemap, Tilemap_Mixin);
})();

require = __tmp__require;

