//=============================================================================
// TN_SpriteExtenderEx.js（ホコグラの頭身を自在に変えるプラグインEX）
//=============================================================================
/*:
 * @plugindesc 【DLC】characterフォルダの全pngの頭身変更差分を生成します。
 * @author terunon's Lab
 * @version 1.01
 * @target MZ
 * @url https://twitter.com/trinitroterunon
 *
 * @param bodyRate
 * @text 頭身変更：引き伸ばし率
 * @desc 1でデフォルトと同じ頭身になります。高いほど頭身が上がります。
 * @default 1.42
 *
 * @param headRange
 * @text 頭身変更：頭の範囲
 * @desc 歩行グラフィック上端を0とし、ここに指定した値までは引き伸ばしを行いません。
 * @default 14
 * 
 * @param directoryspex
 * @text 出力先フォルダ
 * @desc 生成画像の保存先フォルダ名です。フォルダが無い場合は自動作成され、既に同名画像がある場合上書きされます。
 * @default TN_SpriteExtenderEx
 * 
 * @help
 * 【使用方法】-------------------------------------------------------
 * 本プラグインはRPGツクールMV・RPGツクールMZどちらでも動作します。
 * characterフォルダに対して一括処理を行うため、
 * ご使用の際はpng画像以外のファイルは入れないようにしてください。
 * 
 * 本プラグインをONにしてテストプレイを起動すると、characterフォルダを読み込み
 * プロジェクト内の「TN_SpriteExtenderEx」フォルダに
 * 独自アルゴリズムで頭身を任意の比率に変えた差分pngを生成します。
 * 
 * ※オブジェクトキャラクター
 * （接頭辞「!」で始まり、ホコグラと表示位置が違う宝箱などのオブジェ群）
 * 　からは画像を生成しません。
 * 
 * フォルダや、中身の画像をcharacterフォルダに置き換えることで
 * 一括で頭身を変更できます。誤操作防止のためバックアップをお勧めします。
 * 必要な画像を回収したらフォルダは削除いただいて差し支えございません。
 * 
 * 本プラグインがあなたのゲームに彩りをもたらすことを願っています。
 * 
 * 【頭身変更のコツ】-------------------------------------------------------
 * 頭身変更：引き伸ばし率、頭の範囲　の２パラメータを基準に頭身拡縮を行います。
 * 
 * 引き伸ばし率は、微妙な数値変更で引き伸ばされるドットが変動するため
 * 引き伸ばし方が気に入らない場合は0.1～0.01単位で調節してください。
 * 値によっては、小数点処理の関係でホコグラの上端に
 * 隣の画像由来の線が出ることがありますが、0.01ほど値を調節すると消失します。
 * どうしても消失しない場合は、ペイントソフト等で消すことをご検討ください。
 * 
 * 頭の範囲は、ツクールMV/MZ形式の通常ホコグラの場合
 * デフォルト(=14)のままご使用いただけます。
 * 子供素体など、頭の位置が違う場合は調節が必要な場合があります。
 * 
 * 【関連プラグイン】-------------------------------------------------------
 * ・TN_8DirectionGenerator.js
 * （4方向ホコグラから8方向画像を自動生成するプラグイン）
 * 　8方向画像を自動生成・一括出力できるプラグインです。
 * 　本プラグインと連携が可能で、
 * 　併用すると「頭身を変更した8方向画像」を生成できます。
 * 
 * ・TN_SpriteExtender.js（ホコグラの頭身を自在に変えるプラグイン）
 * 　元祖(2019年版)頭身変更プラグインです。
 * 　本プラグインと同様の頭身変更機能を持ちますが、
 * 　ファイルを生成せずゲーム内表示のみを変更する挙動を取ります。
 * 
 * 　ナナメ画像やファイル生成は無いものの、ゲーム内で引き延ばしが完結するため
 * 　プロジェクトのファイルサイズを節約できる、素材管理がゴチャつかない、
 * 　頭身変更パラメータをゲーム内で確認しやすいなど
 * 　設計上、取り回しでは一部こちらが優れている面もあります。
 * 
 */
/*:
 * @plugindesc [DLC Assets] Generates the head change diffs for all pngs in the character folder.
 * @author terunon's Lab
 * @version 1.01
 * @target MZ
 * @url https://twitter.com/trinitroterunon
 *
 * @param bodyRate
 * @text Change the headdress: percentage of stretch.
 * @desc 1 makes the head height the same as the default. The higher the value, the taller the head.
 * @default 1.42
 *
 * @param headRange
 * @text Head change: head range
 * @desc The top edge of the walk graphic is set to 0, and no stretching is performed up to the value specified here.
 * @default 14
 * 
 * @param directoryspex
 * @text output folder
 * @desc The name of the folder where the generated images will be saved. If the folder does not exist, it will be automatically created, and if an image with the same name already exists, it will be overwritten.
 * @default TN_SpriteExtenderEx
 * 
 * @help
 * 【How to use】-------------------------------------------------------
 * This plug-in works with both RPG Maker MV and RPG Maker MZ.
 *  To perform batch processing for the character folder,
 * Please do not include any files other than png images when using this plug-in.
 * 
 * When this plug-in is turned on and test play is started, the character folder is read
 * In the "TN_SpriteExtenderEx" folder in the project
 * Generates a difference png with the head height changed to an arbitrary ratio using a proprietary algorithm.
 * 
 * object character
 * (a group of objects, such as treasure chests, whose display position differs from that of hocographies, beginning with the prefix "! (a group of objects, such as treasure chests, whose display position differs from that of hocographies, starting with the prefix "!)
 * which are not displayed in the same position as the hocographies, will not generate images.
 * 
 * You can change the head in a batch by replacing the folder and the images in it with the character folder. 
 * Backups are recommended to prevent accidental manipulation.
 * Once you have collected the necessary images, you may delete the folders.
 * 
 * We hope this plug-in will bring color to your game.
 * 
 * 【Tips for changing the head】-------------------------------------------------------
 * Head Height Change: The head height is expanded or contracted based on two parameters: the stretch ratio and the head range.
 * 
 * The stretch ratio should be adjusted in increments of 0.1 to 0.01 if you do not like the way the image is stretched, 
 * since subtle changes in the value will cause the stretched dots to fluctuate.
 * Depending on the value, a line derived from the adjacent image may appear at the top edge of the gait graphic due to decimal point processing,
 * but it disappears when the value is adjusted by about 0.01.
 * If the image does not disappear by any means, please consider erasing it with paint software, etc.
 * 
 * The head range can be used as default (=14) 
 * for normal walking graphics in MV/MZ format.
 * Adjustment may be necessary for different head positions, e.g., for children's bodies.
 * 
 * 【Related Plug-ins】-------------------------------------------------------
 * ・TN_DiagonalSpriteGenerator.js　※Steam version to be released in 2024.
 * （Diagonal Sprite Generators）
 * 　This plug-in enables automatic generation and batch output of 8-way images.
 * 　This plug-in can be linked with this plug-in, 
 * 　and when used together, it can generate "8-way images with modified heads".
 * 
 * ・TN_SpriteExtender.js（Sprite Height Modifier）
 * 　This is the original (2019) head height change plugin.
 * 　It has the same head height change functionality as this plugin, but,
 * 　file and only changes the in-game display.
 * 
 * 　Although it does not generate naname images or files, 
 * 　it is superior in some aspects of design and handling, 
 * 　such as saving the project file size since the stretching is completed in the game, 
 * 　avoiding messy material management, and making it easier to check the parameters for head height changes in the game.
 * 
 */

var TN=TN||{};
(function(){function SpriteProcessor(){throw new Error("This is a static class");}var parameters=PluginManager.parameters("TN_SpriteExtenderEx");var bodyRate=Number(parameters["bodyRate"]);var bodyMargin=Number(parameters["headRange"]);var directory=String(parameters["directoryspex"]);if(isNaN(bodyRate))window.alert('TN_SpriteExtenderEx.js Plugin Parameter Error: bodyRate "'+parameters["bodyRate"]+'" is NaN.');if(isNaN(bodyMargin))window.alert('TN_SpriteExtenderEx.js Plugin Parameter Error: headRange "'+parameters["headRange"]+
'" is NaN.');if(!directory)window.alert("TN_SpriteExtenderEx.js Plugin Parameter Error: directory name is empty.");var SceneManagerUpdate=SceneManager.update;SceneManager.update=function(){SceneManagerUpdate.call(this);SpriteProcessor.update()};SpriteProcessor._bodyRate=bodyRate;SpriteProcessor._bodyMargin=bodyMargin;SpriteProcessor._initialized=false;SpriteProcessor._setupFinished=false;SpriteProcessor.initialize=function(){if(this.isSpriteExtenderExActive())this._pathSpex=this.localDirectoryPathSpex();
if(this.is8DirectionGeneratorActive())this._path8dir=TN._8DirectionGenerator.localDirectoryPath8Dir();var fs=require("fs");fs.readdir("./img/characters/",function(err,files){if(err)throw err;this._files=files}.bind(this));this._initialized=true};SpriteProcessor.is8DirectionGeneratorActive=function(){return!!TN._8DirectionGenerator};SpriteProcessor.isSpriteExtenderExActive=function(){return!!TN._SpriteExtenderEx};SpriteProcessor.setup=function(){this._files=this._files.filter(function(filename){return filename.includes(".png")&&
!ImageManager.isObjectCharacter(filename)});this._fileLength=this._files.length;this._processedIndex=0;this._setupFinished=true};SpriteProcessor.localDirectoryPathSpex=function(){var path=require("path");var base=path.dirname(process.mainModule.filename);return path.join(base,directory+"/")};SpriteProcessor.processBitmaps=function(){if(this._processedIndex===this._fileLength-1){this.endProcess();this._processedIndex++}else{var i=this._processedIndex;var l=this._fileLength;var bitmap=void 0;var filename=
void 0;for(;i<l;i++){filename=this._files[i].replace(".png","");bitmap=ImageManager.loadCharacter(filename);if(bitmap.isReady())this.processBitmap(filename,bitmap);else return;this._processedIndex=i}}};SpriteProcessor.endProcess=function(){var prefix="Done! \nCheck project folder: \n";var suffix="\n-----------------------------------------------"+"\nPress [OK] to exit this program. Have a good Gamemaking!"+"\n ('\u03c9')\u4e09";var pathes="  "+(this._pathSpex||"")+"\n  "+(this._path8dir||"");alert(prefix+
pathes+suffix);SceneManager.terminate()};SpriteProcessor.update=function(){if(this._setupFinished){this.processBitmaps();this.refreshInformation()}else if(this._initialized){if(this._files)this.setup()}else this.initialize()};SpriteProcessor.refreshInformation=function(){document.title="Processing img/character ... "+(this._processedIndex+1)+"/"+this._fileLength+" - "+this._files[this._processedIndex]};SpriteProcessor.processBitmap=function(filename,bitmap){var htBitmap;if(this.isSpriteExtenderExActive()){htBitmap=
this.processHeadsTallBitmap(filename,bitmap);this.saveToLocalFileSpex(filename,htBitmap)}else htBitmap=this.duplicateBitmap(bitmap);if(this.is8DirectionGeneratorActive())TN._8DirectionGenerator.process8DirBitmapByLayouts(filename,htBitmap)};SpriteProcessor.bodyRate=function(){return this._bodyRate||1};SpriteProcessor.bodyMargin=function(){return this._bodyMargin||0};SpriteProcessor.saveToLocalFileSpex=function(filename,bitmap){var data=bitmap._canvas.toDataURL("image/png").replace(/^.*,/,"");var fs=
require("fs");var dirPath=this._pathSpex;var filePath=dirPath+filename+".png";if(!fs.existsSync(dirPath))fs.mkdirSync(dirPath);fs.writeFileSync(filePath,new Buffer(data,"base64"))};SpriteProcessor.saveToLocalFile8dir=function(filename,bitmap){var data=bitmap._canvas.toDataURL("image/png").replace(/^.*,/,"");var fs=require("fs");var dirPath=this._path8dir;var filePath=dirPath+filename+".png";if(!fs.existsSync(dirPath))fs.mkdirSync(dirPath);fs.writeFileSync(filePath,new Buffer(data,"base64"))};SpriteProcessor.processHeadsTallBitmap=
function(filename,original){var bodyRate=this.bodyRate();var bodyMargin=this.bodyMargin();var w=original.width;var h=original.height;var hPadForPreventFootJutting=7;var bitmap=new Bitmap(w,Math.ceil(hPadForPreventFootJutting+(h-bodyMargin+bodyMargin*bodyRate)/8)*8);var sw=this.patternWidth(filename,original);var sh=this.patternHeight(filename,original);var cellsX=w/sw;var cellsY=h/sh;var dw=sw;var dh=bitmap.height/cellsY;var hPadForPreventFootJutting2=cellsY===4?9:0;var sx;var sy;var dx;var dy;var i=
0;for(;i<cellsX;i++){var j=0;for(;j<cellsY;j++){sx=sw*i;sy=sh*j;dx=dw*i;dy=dh*j+hPadForPreventFootJutting2;bitmap.blt(original,sx,sy,sw,sh-bodyMargin,dx,dy,dw,sh-bodyMargin);bitmap.blt(original,sx,sy+sh-bodyMargin,sw,bodyMargin,dx,dy+sh-bodyMargin,dw,bodyMargin*bodyRate)}}return bitmap};SpriteProcessor.patternWidth=function(filename,bitmap){if(ImageManager.isBigCharacter(filename))return bitmap.width/3;else return bitmap.width/12};SpriteProcessor.patternHeight=function(filename,bitmap){if(ImageManager.isBigCharacter(filename))return bitmap.height/
4;else return bitmap.height/8};TN._SpriteExtenderEx=SpriteProcessor})();
