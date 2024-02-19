//=============================================================================
// TN_SpriteExtender.js
//=============================================================================
/*:ja
 * @plugindesc 【有償ライセンス】任意の比率で歩行グラフィックの胴体を引き伸ばし、頭身を上げます。
 * @author terunon's Lab
 * @version 1.08 (International)
 * @target MZ
 * @url https://twitter.com/trinitroterunon
 *
 * @param bodyRate
 * @text 引き伸ばし率
 * @desc 1でデフォルトと同じ頭身になります。高いほど頭身が上がります。
 * @default 1.42
 *
 * @param headRange
 * @text 頭の範囲
 * @desc 歩行グラフィック上端を0とし、ここに指定した値までは引き伸ばしを行いません。
 * @default 14
 *
 * @param exclude_P
 * @text 除外ファイル（部分一致）
 * @desc 画像ファイル名に特定の文字列が含まれる場合、頭身引き伸ばしを行いません。【スペース無しのカンマ区切りで複数指定可】
 * @default !,Damage
 *
 * @param exclude_E
 * @text 除外ファイル（完全一致）
 * @desc ここに記載された画像ファイルは、頭身引き伸ばしを行いません。【スペース無しのカンマ区切りで複数指定可】
 * @default Nature,Monster,Vehicle
 *
 * @param applyWindowClasses
 * @text ウィンドウ系への適用
 * @desc ウィンドウ上に描画された歩行グラフィック画像（Window_Base.drawCharacter）の頭身も同様に変更します。
 * @type boolean
 * @on する
 * @off しない
 * @default true
 *
 * @help
 * 頭身をお好きな比率に調節することができます。
 * 微妙な数値変更で、胴体のどのドットが引き伸ばされるか変わるため
 * 引き伸ばし方が気に入らない場合は、0.1～0.01単位で各値を調節してみてください。
 * 数値によっては、ホコグラの上端に別のホコグラ由来の線が見えることがありますが、
 * 0.01ほど数値を調整すれば消失します。
 *
 * 画像（characterフォルダ）のファイル名を
 * 「ファイル名_x小数点を省いた比率.png」 にすると、
 * そのキャラのみ、プラグインパラメータの設定値ではなく
 * ファイル名で指定した比率が適用されます。
 *  （例: AbsentedAge_x120.png → 比率1.20、
 *    Karen_x080 または Karen_x80 → 比率0.80）
 *
 * 再定義を含むため、プラグインリストの上の方への適用が望ましいです。
 */
/*:
 * @plugindesc Stretch the torso of the character image at any ratio to raise the body proportion.
 * @author terunon's Lab
 * @version 1.08 (International)
 * @target MZ
 * @url https://twitter.com/trinitroterunon
 *
 * @param bodyRate
 * @text character image enlargement rate
 * @desc The higher it is, the larger the proportion. (1= MV/MZ default)
 * @default 1.42
 *
 * @param headRange
 * @text Range of the head
 * @desc The upper end of the walking image is set to 0, and will not be stretched to the position specified.
 * @default 14
 *
 * @param exclude_P
 * @text Excluded file (Partial match)
 * @desc The scale of the character image will not change if specific text string is included in the image name. [Add by using "," without space]
 * @default !,Damage
 *
 * @param exclude_E
 * @text Excluded file (Exact match)
 * @desc The image names listed will not have their scale changed.[Add by using "," without space]
 * @default Nature,Monster,Vehicle
 *
 * @param applyWindowClasses
 * @text applyWindowClasses
 * @desc Apply to Window_Base.drawCharacter
 * @type boolean
 * @on ON
 * @off OFF 
 * @default true
 *
 * @help
 * Adjust the body to your desired proportions.
 * Try adjusting each value in increments of 0.1 to 0.01 since subtle numerical
 * adjustments will change the parts that will be stretched.
 * Depending on the value, you may see a line from another cell at the top of a
 * character, but it will disappear after adjusting the value by about 0.01.
 *
 * If the image (character folder) is named as file name_x ratio.png,
 * the image will be scaled by the specified ratio, not the plugin setting value.
 * (e.g. AbsentedAge_x120.png → Ratio 1:20)
 * This function is implemented by extending the processing of bushes.
 * It is recommended to be applied to the top of the plugin list since it
 * includes re-definition.
*/
(function(){var parameters=PluginManager.parameters("TN_SpriteExtender");var bodyRate=Number(parameters["bodyRate"]);var bodyMargin=Number(parameters["headRange"]);var disableKeys=String(parameters["exclude_P"]).split(",");var disableFiles=String(parameters["exclude_E"]).split(",");var disableKeysL=disableKeys.length;var disableFilesL=disableFiles.length;var modifyDrawCharacter=parameters["applyWindowClasses"]==="true";if(isNaN(bodyRate))window.alert('TN_SpriteExtender.js Plugin Parameter Error: bodyRate "'+
parameters["bodyRate"]+'" is NaN.');if(isNaN(bodyMargin))window.alert('TN_SpriteExtender.js Plugin Parameter Error: headRange "'+parameters["headRange"]+'" is NaN.');Sprite_Character.prototype.updateBitmap=function(){if(this.isImageChanged()){this._tilesetId=$gameMap.tilesetId();this._tileId=this._character.tileId();this._characterName=this._character.characterName();this._characterIndex=this._character.characterIndex();this._isSeperated=this.isSeperated();this._bodyRate=this.bodyRate();this.removeChild(this._upperBody);
this.removeChild(this._lowerBody);this._upperBody=null;this._lowerBody=null;if(this._tileId>0)this.setTileBitmap();else this.setCharacterBitmap()}};var TN_dn=172;Sprite_Character.prototype.isSeperated=function(){return isSeperated(this._characterName)};Sprite_Character.prototype.bodyRate=function(){return getBodyRate(this._characterName)};var isSeperated=function(str){for(var i=0;i<disableKeysL;i++)if(str.contains(disableKeys[i]))return false;for(var i$0=0;i$0<disableFilesL;i$0++)if(str===disableFiles[i$0])return false;
return true};var getBodyRate=function(str){if(!str.includes("_x"))return bodyRate;var seeds=str.split("_x");var seed=seeds[seeds.length-1];return+seed/100||bodyRate};Sprite_Character.prototype.updateCharacterFrameDef=Sprite_Character.prototype.updateCharacterFrame;Sprite_Character.prototype.updateCharacterFrame=function(){this.updateCharacterFrameDef();if(this._isSeperated){this.createHalfBodySprites();if(this._bushDepth>0)this._lowerBody.opacity=128;else this._lowerBody.opacity=255;this._upperBody.bitmap=
this.bitmap;this._upperBody.visible=true;this._lowerBody.bitmap=this.bitmap;this._lowerBody.visible=true;this._upperBody.y=-bodyMargin*this._bodyRate;this._lowerBody.scale.y=this._bodyRate;var pw=this.patternWidth();var ph=this.patternHeight();var sx=(this.characterBlockX()+this.characterPatternX())*pw;var sy=(this.characterBlockY()+this.characterPatternY())*ph;this._upperBody.setFrame(sx,sy,pw,ph-bodyMargin);this._lowerBody.setFrame(sx,sy+ph-bodyMargin,pw,bodyMargin);this.setFrame(sx,sy,0,ph);if(this._bushDepth===
0){this._upperBody.setBlendColor(this.getBlendColor());this._lowerBody.setBlendColor(this.getBlendColor());this._upperBody.setColorTone(this.getColorTone());this._lowerBody.setColorTone(this.getColorTone())}this._upperBody.blendMode=this.blendMode;this._lowerBody.blendMode=this.blendMode;var tone=this._character._tone;if(tone){this._upperBody.setColorTone(tone);this._lowerBody.setColorTone(tone)}}};if(modifyDrawCharacter){var org_Window_Base_drawCharacter=Window_Base.prototype.drawCharacter;Window_Base.prototype.drawCharacter=
function(characterName,characterIndex,x,y){if(isSeperated(characterName))this.drawCharacterHeadsTall(characterName,characterIndex,x,y);else org_Window_Base_drawCharacter.apply(this,arguments)};Window_Base.prototype.drawCharacterHeadsTall=function(characterName,characterIndex,x,y){var bitmap=ImageManager.loadCharacter(characterName);var big=ImageManager.isBigCharacter(characterName);var pw=bitmap.width/(big?3:12);var ph=bitmap.height/(big?4:8);var n=characterIndex;var sx=(n%4*3+1)*pw;var sy=Math.floor(n/
4)*4*ph;var inputBitmap=new Bitmap(pw,ph);var bodyRate=getBodyRate(characterName);var dh=Math.ceil(bodyMargin*bodyRate-bodyMargin);this.contents.blt(bitmap,sx,sy,pw,ph-bodyMargin,x-pw/2,y-ph-dh);this.contents.blt(bitmap,sx,sy+ph-bodyMargin,pw,bodyMargin,x-pw/2,y-bodyMargin-dh,pw,bodyMargin*bodyRate)}}})();