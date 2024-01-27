/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/fasttravel/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_ToastManager
 * @plugindesc Allows you to fast travel between locations in your game
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.1.0
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.6.0
 * ----------------------------------------------------------------------------
 * Description: Allows you to fast travel between different locations in your
 * game. It can handle as many fast travel points as you want, and it also
 * allows you to set gold or item costs to use the travel (optional). You can
 * also show/hide fast travel locations via plugin command.
 * ----------------------------------------------------------------------------
 * Documentation:
 * -----------------------------Required Setup---------------------------------
 * Before using this plugin, please set up at least one fast travel point.
 * --------------------------Adding to Main Menu-------------------------------
 * To add Fast Travel to the main menu, use CGMZ Menu Command Window or similar
 * plugin. The JavaScript code to call the scene from the plugin is:
 * SceneManager.push(CGMZ_Scene_FastTravel);
 * ------------------------------Point Names-----------------------------------
 * Fast Travel Point names must be unique, as they are used as an ID to refer
 * to the fast travel point. This means you cannot have 2 fast travel points
 * with the same name.
 * ------------------------------Categories------------------------------------
 * If using categories, the category parameter in the Fast Travel point and
 * the category in the Call Scene command must match exactly. For example, if
 * a fast travel point has the category "Ice Land" then to include this point
 * in the scene, the Call Scene command must either be empty or have the
 * category "Ice Land" listed.
 * ----------------------------Plugin Commands---------------------------------
 * • Reinitialize
 * Reset all fast travel points to defaults
 * 
 * • Call Scene
 * Opens the Fast Travel Scene. Optionally, provide categories so the scene
 * only displays specific categories of fast travel points
 *
 * • Discover Fast Travel Point
 * Changes the discovery status of the fast travel point
 *
 * • Enable Fast Travel Point
 * Enables/Disables a fast travel point
 *
 * • Change Map
 * Changes the map (and x, y) coordinates of the fast travel point
 *
 * • Change Category
 * Changes the category of the fast travel point
 * ------------------------------Saved Games-----------------------------------
 * This plugin partially supports saved games. You can add new fast travel
 * points to saved games with no issues. Removing and editing fast travel
 * points is not supported (outside of plugin commands).
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_FastTravel.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * ----------------------------Version History---------------------------------
 * Version 1.0.0 - Initial Release
 *
 * Version 1.1.0
 * - Added option to disable (but still show) fast travel points. This comes
 *   with a plugin command to change the enabled property of a point.
 * - Added option to hide categories if no points for that category are
 *   discovered
 * - Added option to change the list window's width
 * - Added option to hide the Touch UI space if not using Touch UI
 * - Added option to show the list window on the right side of screen
 * - Added option to make fast travel scene windows transparent
 * - Added option to change default fast travel scene background image
 * - Added Spanish Language help documentation
 * - This plugin now warns in the console if your JSON parameters are not set
 *   up correctly instead of crashing. If not working, please check console
 *   for troubleshooting before reporting bug.
 *
 * @command Reinitialize
 * @desc Reinitializes all fast travel data. Use this to debug saved games, not meant for use in released games.
 *
 * @command Call Scene
 * @desc Calls the Fast Travel scene
 *
 * @arg categories
 * @type text[]
 * @default []
 * @desc The categories to include in the scene, leave blank if not using categories.
 *
 * @command discover
 * @text Discover Fast Travel Point
 * @desc Discovers a fast travel point (or undiscovers)
 *
 * @arg name
 * @text Fast Travel Point Name
 * @desc The name of the fast travel point to discover/undiscover
 *
 * @arg discover
 * @type boolean
 * @desc Discovers the fast travel if true. Undiscovers the fast travel if false.
 * @default true
 *
 * @command Enable Fast Travel Point
 * @desc Enable/Disable a fast travel point
 *
 * @arg Name
 * @desc The name of the fast travel point to enable/disable
 *
 * @arg Enable
 * @type boolean
 * @desc Enables the fast travel point if true. Disables the point if false.
 * @default true
 *
 * @command Change Map
 * @desc Change which map the fast travel point goes to
 *
 * @arg name
 * @text Fast Travel Point Name
 * @desc The name of the fast travel point to change
 *
 * @arg map
 * @type number
 * @min 0
 * @desc New Map ID to use when fast travelling to this point
 *
 * @arg x
 * @type number
 * @default 0
 * @min 0
 * @desc New x coordinate to use when fast travelling to this point
 *
 * @arg y
 * @type number
 * @default 0
 * @min 0
 * @desc New y coordinate to use when fast travelling to this point
 *
 * @arg direction
 * @type number
 * @default 2
 * @min 0
 * @desc The direction to face after transfer. 2 = down, 4 = left, 6 = right, 8 = up
 *
 * @command Change Category
 * @desc Change which category of a fast travel point
 *
 * @arg name
 * @text Fast Travel Point Name
 * @desc The name of the fast travel point to change
 *
 * @arg category
 * @desc New category to assign to the fast travel point
 *
 * @param Fast Travel Points
 * @type struct<FastTravelPoint>[]
 * @default []
 * @desc Set up different fast travel points here
 *
 * @param Window Options
 *
 * @param Show Categories
 * @parent Window Options
 * @type boolean
 * @desc Whether to show a category window or not
 * @default false
 *
 * @param Use Costs
 * @parent Window Options
 * @type boolean
 * @desc Determine if there will ever be costs associated with fast travel
 * @default true
 *
 * @param Cost Text
 * @parent Window Options
 * @desc Text to show at the top of the cost window
 * @default \c[1]Costs:\c[0]
 *
 * @param Free Text
 * @parent Window Options
 * @desc Text to show for costs if the location has no cost
 * @default None
 *
 * @param Cost Window Lines
 * @parent Window Options
 * @type number
 * @min 2
 * @desc The number of lines of text to show in the cost window if using costs.
 * @default 3
 *
 * @param List Alignment
 * @parent Window Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The text alignment of the list window
 * @default left
 *
 * @param Background Image
 * @parent Window Options
 * @type file
 * @dir img/
 * @desc Image to show in the background of the scene. Default blurry map used if none provided.
 *
 * @param Transparent Windows
 * @parent Window Options
 * @type boolean
 * @desc If true, will cause fast travel scene window backgrounds to be transparent
 * @default false
 *
 * @param Disable Touch UI Space
 * @parent Window Options
 * @type boolean
 * @desc If true, will not leave space for Touch UI buttons if Touch UI is disabled
 * @default false
 *
 * @param Hide Empty Categories
 * @parent Window Options
 * @type boolean
 * @desc If true, will not display fast travel categories with no discovered points
 * @default false
 *
 * @param List Window Right
 * @parent Window Options
 * @type boolean
 * @desc If true, will display the list and cost windows on the right side of screen
 * @default false
 *
 * @param List Window Width
 * @parent Window Options
 * @type number
 * @desc Width as a % of the screen, for example 40 = 40% of the screen
 * @default 33
 *
 * @param Other CGMZ Plugin Options
 *
 * @param Show Discover Toast
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default true
 * @desc Show a toast window when a new fast travel point is discovered? (requires CGMZ ToastManager)
 *
 * @param Toast Text
 * @parent Other CGMZ Plugin Options
 * @default \c[1]Fast Travel Unlocked:\c[0]
 * @desc Text to describe a new fast travel point in the toast window (requires CGMZ ToastManager)
*/
/*~struct~FastTravelPoint:
 * @param Name
 * @type text
 * @desc The name of the fast travel point.
 * 
 * @param Discovered
 * @type boolean
 * @default true
 * @desc Determine whether the fast travel point is discovered at the start of the game.
 * 
 * @param Enabled
 * @type boolean
 * @default true
 * @desc Determine whether the fast travel point is enabled at the start of the game.
 * 
 * @param Description
 * @desc Fast Travel description
 * 
 * @param Category
 * @desc The category this fast travel point belongs to (if using categories).
 *
 * @param Image
 * @type file
 * @dir img
 * @desc The image to show for the fast travel point.
 *
 * @param Map
 * @type number
 * @default 0
 * @desc The map to transfer to
 *
 * @param X
 * @type number
 * @min 0
 * @default 0
 * @desc The x-coordinate to transfer to on the map
 *
 * @param Y
 * @type number
 * @min 0
 * @default 0
 * @desc The y-coordinate to transfer to on the map
 *
 * @param Direction
 * @type number
 * @min 0
 * @default 2
 * @desc The direction to face after transfer. 2 = down, 4 = left, 6 = right, 8 = up
 *
 * @param Gold Cost
 * @type number
 * @min 0
 * @default 0
 * @desc The amount of currency using this travel point costs.
 *
 * @param Item Cost Item
 * @type item
 * @min 0
 * @default 0
 * @desc The item id that is consumed upon using this travel point.
 *
 * @param Item Cost Amount
 * @type number
 * @min 0
 * @default 0
 * @desc The amount of the given item using this travel point costs.
 *
 * @param Travel Sound Effect
 * @type file
 * @dir audio/se
 * @desc The sound effect to play when fast travelling here
 *
 * @param Toast Sound Effect
 * @type file
 * @dir audio/se
 * @desc The sound effect to play when displaying a toast window for this fast travel point. Requires CGMZ ToastManager
*/
/*:zh-CN
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/fasttravel/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_ToastManager
 * @plugindesc 快速传送点系统（可以在已激活的传送点之间进行快速传送）
 * @help
 * ============================================================================
 * 【使用条款】
 * 1、本插件可作商用或非商用。
 * 2、须注明插件作者"Casper Gaming"。
 * 3、须提供该插件的作者网站链接。
 * 4、最终使用条款以作者官网公告为准。https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * 【赞助支持】
 * 您可以登陆以下网站并对作者进行支持和赞助。
 * 然后获得作者和其插件的最新资讯，以及测试版插件的试用。
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * 【插件版本】 V 1.0.0
 * ----------------------------------------------------------------------------
 * 【兼容性】仅测试作者所制作的插件
 * 【RM版本】RPG Maker MZ 1.6.0
 * ----------------------------------------------------------------------------
 * 【插件描述】
 *  让角色可以在不同地区之间快速传送。
 *  可以选择是否以金币或道具作为传送的消耗品。
 *  可以通过插件命令来激活或关闭传送点。
 * ----------------------------------------------------------------------------
 * 【使用说明】
 *
 * 一、必须设置
 * 在使用本插件之前，要求必须先设置至少一个传送点。
 *
 * 二、如何将快速传送添加至菜单
 * 如要将快速传送添加为菜单选项，需要使用"CGMZ Menu Command Window"或类似的插件添加。
 
 * 三、用脚本打开传送界面
 * 脚本命令：SceneManager.push(CGMZ_Scene_FastTravel);
 *
 *  四、传送点和区域
 * "传送点"的名字必须是唯一的，它会作为参数被读取。您不能设置2个相同的地名。
 *
 * "区域"作用于将传送点划分为各种不相同的类型，如草原、冰原和沙漠等。
 *
 * 无论是传送点名字或区域名字，你需要确保它们在各类设置中必须一致。
 * 举例：在英文中Ice Land和ICE land，字符一致但大小写不一致，
 *       在插件设置中将被定义为不相同的区域或传送点。
 * 
 * 五、保存的游戏
 * This plugin partially supports saved games. You can add new fast travel
 * points to saved games with no issues. Removing and editing fast travel
 * points is not supported (outside of plugin commands).
 * 
 * 六、插件指令
 * 本插件可以通过事件设置使用以下插件指令：
 * 1、重置 - 重置所有快速传送点至默认值。（调试用指令）
 * 2、打开传送界面 - 打开快速传送界面。可根据“区域”的定义来打开不同类型的传送点。
 * 3、激活传送点 - 使某个传送点激活或关闭。
 * 4、修改传送点 - 修改某个传送点到达的地图和坐标。
 * 5、修改区域 - 修改某个传送点所属的区域。
 * 
 * ----------------------------------------------------------------------------
 * 【版本历史】
 * V 1.0.0 - 原始版本
 * Version 1.1.0
 * - Added option to disable (but still show) fast travel points. This comes
 *   with a plugin command to change the enabled property of a point.
 * - Added option to hide categories if no points for that category are
 *   discovered
 * - Added option to change the list window's width
 * - Added option to hide the Touch UI space if not using Touch UI
 * - Added option to show the list window on the right side of screen
 * - Added option to make fast travel scene windows transparent
 * - Added option to change default fast travel scene background image
 * - Added Spanish Language help documentation
 * - This plugin now warns in the console if your JSON parameters are not set
 *   up correctly instead of crashing. If not working, please check console
 *   for troubleshooting before reporting bug.
 *
 * @command Reinitialize
 * @text 重置传送点（调试用指令）
 * @desc 重置并初始化所有传送点。用于测试游戏，不适用于正常游戏中。
 *
 * @command Call Scene
 * @text 打开传送界面
 * @desc 打开传送界面。如果输入"目录"名字则只打开对应分类的传送点。
 *
 * @arg categories
 * @text 区域
 * @type text[]
 * @default []
 * @desc 输入区域的名字以打开对应区域的传送点。空白则打开所有传送点。
 *
 * @command discover
 * @text 激活传送点
 * @desc 激活或关闭传送点。
 *
 * @arg name
 * @text 传送点名字
 * @desc 使这个传送点被激活或关闭。
 *
 * @arg discover
 * @text 激活/关闭
 * @type boolean
 * @desc True - 激活， False - 关闭。
 * @default true
 *
 * @command Enable Fast Travel Point
 * @desc Enable/Disable a fast travel point
 *
 * @arg Name
 * @desc The name of the fast travel point to enable/disable
 *
 * @arg Enable
 * @type boolean
 * @desc Enables the fast travel point if true. Disables the point if false.
 * @default true
 *
 * @command Change Map
 * @text 切换地图
 * @desc 切换某个传送点所到达的地图位置。
 *
 * @arg name
 * @text 传送点名字
 * @desc 需要修改的传送点的名字。
 *
 * @arg map
 * @text 地图ID
 * @type number
 * @min 0
 * @desc 传送点指向的新地图的ID。
 *
 * @arg x
 * @text X轴坐标
 * @type number
 * @default 0
 * @min 0
 * @desc 传送点指向的新地图的X轴坐标位置。
 *
 * @arg y
 * @text Y轴坐标
 * @type number
 * @default 0
 * @min 0
 * @desc 传送点指向的新地图的Y轴坐标位置。
 *
 * @arg direction
 * @text 角色朝向
 * @type number
 * @default 2
 * @min 0
 * @desc 角色传送后的朝向。（默认是2面朝下, 4向左, 6向右, 8面朝上）
 *
 * @command Change Category
 * @text 修改区域
 * @desc 修改一个传送点所属的区域。
 *
 * @arg name
 * @text 传送点名字
 * @desc 将要修改区域的传送点的名字。
 *
 * @arg category
 * @text 区域名字
 * @desc 传送点所属的新区域的名字。
 *
 * @param Fast Travel Points
 * @text 设置传送点
 * @type struct<FastTravelPoint>[]
 * @default []
 * @desc 在这里设置你需要的传送点的参数。
 *
 * @param Window Options
 * @text 窗口设置
 *
 * @param Show Categories
 * @text 显示"区域"
 * @parent Window Options
 * @type boolean
 * @desc 是否需要显示关于“传送点所属区域”的设定？默认关闭。
 * @default false
 *
 * @param Use Costs
 * @text 传送消耗
 * @parent Window Options
 * @type boolean
 * @desc 使用快速传送时是否需要消耗品。
 * @default true
 *
 * @param Cost Text
 * @text 消耗的描述
 * @parent Window Options
 * @desc 在传送窗口内关于传送所需消耗品的描述。
 * @default \c[1]需消耗:\c[0] 
 *
 * @param Free Text
 * @text 无消耗的描述
 * @parent Window Options
 * @desc 在传送窗口内关于传送不需要消耗品的描述。
 * @default 无消耗
 *
 * @param Cost Window Lines
 * @text 消耗品描述的文本行数
 * @parent Window Options
 * @type number
 * @min 2
 * @desc 消耗品描述所显示的文本行数。默认3行。
 * @default 3
 *
 * @param List Alignment
 * @text 文本对齐
 * @parent Window Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc 文本描述的对齐位置。left-靠左，center-居中，right-靠右。
 * @default left
 *
 * @param Background Image
 * @parent Window Options
 * @type file
 * @dir img/
 * @desc Image to show in the background of the scene. Default blurry map used if none provided.
 *
 * @param Transparent Windows
 * @parent Window Options
 * @type boolean
 * @desc If true, will cause fast travel scene window backgrounds to be transparent
 * @default false
 *
 * @param Disable Touch UI Space
 * @parent Window Options
 * @type boolean
 * @desc If true, will not leave space for Touch UI buttons if Touch UI is disabled
 * @default false
 *
 * @param Hide Empty Categories
 * @parent Window Options
 * @type boolean
 * @desc If true, will not display fast travel categories with no discovered points
 * @default false
 *
 * @param List Window Right
 * @parent Window Options
 * @type boolean
 * @desc If true, will display the list and cost windows on the right side of screen
 * @default false
 *
 * @param List Window Width
 * @parent Window Options
 * @type number
 * @desc Width as a % of the screen, for example 40 = 40% of the screen
 * @default 33
 *
 * @param Other CGMZ Plugin Options
 * @text 作者其他相关插件的设置
 *
 * @param Show Discover Toast
 * @text 传送点激活提示
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default true
 * @desc 提示激活或关闭了传送点，需配合插件"CGMZ ToastManager"使用。
 *
 * @param Toast Text
 * @text 提示的描述
 * @parent Other CGMZ Plugin Options
 * @default \c[1]传送点激活:\c[0]
 * @desc 提示激活了某个传送点，需配合插件"CGMZ ToastManager"使用。
*/
/*~struct~FastTravelPoint:zh-CN
 * @param Name
 * @text 传送点
 * @type text
 * @desc 设置传送点的名字。
 * 
 * @param Discovered
 * @text 是否初始传送点
 * @type boolean
 * @default true
 * @desc 设置该传送点是否在游戏开始时已激活。
 * 
 * @param Enabled
 * @type boolean
 * @default true
 * @desc Determine whether the fast travel point is enabled at the start of the game.
 * 
 * @param Description
 * @text 描述
 * @desc 关于这个传送点的描述。
 * 
 * @param Category
 * @text 区域
 * @desc 该传送点所属的区域。如：雪山、海岛、平原等。
 *
 * @param Image
 * @text 图片
 * @type file
 * @dir img
 * @desc 在传送界面选择该传送点时显示的背景图片。
 *
 * @param Map
 * @text 地图ID
 * @type number
 * @default 0
 * @desc 该传送点指向的地图编号。
 *
 * @param X
 * @text X轴坐标
 * @type number
 * @min 0
 * @default 0
 * @desc 传送点指向地图的X轴坐标位置。
 *
 * @param Y
 * @text Y轴坐标
 * @type number
 * @min 0
 * @default 0
 * @desc 传送点指向地图的Y轴坐标位置。
 *
 * @param Direction
 * @text 角色朝向
 * @type number
 * @min 0
 * @default 2
 * @desc 角色传送后的朝向。（默认是2面朝下, 4向左, 6向右, 8面朝上）
 *
 * @param Gold Cost
 * @text 消耗金币
 * @type number
 * @min 0
 * @default 0
 * @desc 本次传送需要消耗的金币数量。
 *
 * @param Item Cost Item
 * @text 消耗道具
 * @type item
 * @min 0
 * @default 0
 * @desc 本次传送需要消耗的道具ID。
 *
 * @param Item Cost Amount
 * @text 道具数量
 * @type number
 * @min 0
 * @default 0
 * @desc 本次传送需要消耗的道具的数量。
 *
 * @param Travel Sound Effect
 * @text 传送音效
 * @type file
 * @dir audio/se
 * @desc 设置传送到该地点的音效。
 *
 * @param Toast Sound Effect
 * @text 提示音效
 * @type file
 * @dir audio/se
 * @desc 设置关于激活传送点等提示的音效。需配合插件"CGMZ ToastManager"使用。
*/
/*:es
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/fasttravel/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_ToastManager
 * @plugindesc Te permite viajar rápido entre ubicaciones en tu juego.
 * @help
 * ============================================================================
 * Para términos y condiciones de uso de este pluging en tu juego, por favor
 * visita:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * ¡Conviértete en un Patrocinador para obtener acceso a los plugings beta y
 * alfa, ademas de otras cosas geniales!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Versión: 1.0.0
 * ----------------------------------------------------------------------------
 * Compatibilidad: Sólo probado con mis CGMZ plugins.
 * Hecho para RPG Maker MZ 1.6.0
 * ----------------------------------------------------------------------------
 * Descripción: Te permite viajar rápido entre diferentes lugares en tu juego. 
 * Puedes manejar tantos puntos de viaje rápido como desees, y también te
 * permite establecer costos de oro o artículos para usar el viaje (opcional).
 * También puede mostrar/ocultar ubicaciones de viajes rápidos a través del
 * comando de plugin.
 * ----------------------------------------------------------------------------
 * Documentación:
 * ----------------------Configuración requerida-------------------------------
 * Antes de usar este complemento, configure al menos un punto de viaje rápido.
 * ----------------------Adición al menú principal-----------------------------
 * Para agregar viajes rápidos al menú principal, use la ventana de comandos
 * del menú CGMZ o un complemento similar. El código JavaScript para llamar a
 * la escena desde el plugin es:
 * SceneManager.push(CGMZ_Scene_FastTravel);
 * -------------------------Nombres de puntos----------------------------------
 * Los nombres de los puntos de viaje rápido deben ser únicos, ya que se
 * utilizan como identificación para referirse al punto de viaje rápido. Esto
 * significa que no puede tener 2 puntos de viaje rápido con el mismo nombre.
 * ------------------------------Categorías------------------------------------
 * Si usas categorías, el parámetro de categoría en el punto de viaje rápido y 
 * la categoría en el comando Escena de llamada deben coincidir exactamente. 
 * Por ejemplo, si un punto de viaje rápido tiene la categoría "Ice Land"
 * (Tierra de hielo), para incluir este punto en la escena, el comando Call
 * Scene debe estar vacío o tener la categoría "Ice Land" en la lista.
 * -----------------------------Partidas guardadas-----------------------------
 * Este plugin admite parcialmente juegos guardados. Puede agregar nuevos 
 * puntos de viaje rápido a los juegos guardados sin problemas. No se admite
 * la eliminación y edición de puntos de viaje rápido (fuera de los comandos del 
 * plugin).
 * --------------------------Comandos de Plugin--------------------------------
 * • Reinicializar
 * Restablece todos los puntos de viaje rápido a los valores predeterminados
 *
 * • Escena de llamada
 * Abre la escena de viaje rápido. Opcionalmente, proporcione categorías para
 * que la escena solo muestre categorías específicas de puntos de viaje rápido.
 *
 * • Discover Fast Travel Point
 * Cambia el estado de descubrimiento del punto de viaje rápido.
 *
 * • Enable Fast Travel Point
 * Enables/Disables a fast travel point
 *
 * • Cambiar mapa
 * cambia las coordenadas del mapa (y x, y) del punto de viaje rápido
 *
 * • Cambiar Categoría
 * Cambia la categoría del punto de viaje rápido
 * -------------------------Historial de Versiones-----------------------------
 * Versión 1.0.0 - Versión Inicial
 *
 * Versión 1.1.0
 * - Added option to disable (but still show) fast travel points. This comes
 *   with a plugin command to change the enabled property of a point.
 * - Added option to hide categories if no points for that category are
 *   discovered
 * - Added option to change the list window's width
 * - Added option to hide the Touch UI space if not using Touch UI
 * - Added option to show the list window on the right side of screen
 * - Added option to make fast travel scene windows transparent
 * - Added option to change default fast travel scene background image
 * - Added Spanish Language help documentation
 * - This plugin now warns in the console if your JSON parameters are not set
 *   up correctly instead of crashing. If not working, please check console
 *   for troubleshooting before reporting bug.
 *
 * @command Reinitialize
 * @text Reinicializar
 * @desc Reinicializa todos los datos de viaje rápido. Use esto para depurar juegos guardados, no destinados para su uso en juegos lanzados.
 *
 * @command Call Scene
 * @text Escena de Llamada
 * @desc Llama a la escena de los viajes rápidos
 *
 * @arg categories
 * @text Categorías
 * @type text[]
 * @default []
 * @desc Las categorías a incluir en la escena, déjalas en blanco si no usa categorías.
 *
 * @command discover
 * @text Descubra el punto de viaje rápido
 * @desc Descubre un punto de viaje rápido (o no descubre)
 *
 * @arg name
 * @text Nombre del punto de viaje rápido
 * @desc El nombre del punto de viaje rápido para descubrir/no-descubrir.
 *
 * @arg discover
 * @text Descubrir viaje rápido
 * @type boolean
 * @desc Descubre el viaje rápido si es cierto. No descubre el viaje rápido si es falso.
 * @default true
 *
 * @command Enable Fast Travel Point
 * @desc Enable/Disable a fast travel point
 *
 * @arg Name
 * @desc The name of the fast travel point to enable/disable
 *
 * @arg Enable
 * @type boolean
 * @desc Enables the fast travel point if true. Disables the point if false.
 * @default true
 *
 * @command Change Map
 * @text Cambiar Mapa
 * @desc Cambiar a qué mapa va el punto de viaje rápido.
 *
 * @arg name
 * @text Nombre del punto de viaje rápido
 * @desc El nombre del punto de viaje rápido a cambiar.
 *
 * @arg map
 * @text Mapa
 * @type number
 * @min 0
 * @desc Nueva identificación de mapa para usar cuando viaje rápido a este punto
 *
 * @arg x
 * @text Coordenada X
 * @type number
 * @default 0
 * @min 0
 * @desc Nueva coordenada X para usar cuando viaje rápido a este punto.
 *
 * @arg y
 * @text Coordenada Y
 * @type number
 * @default 0
 * @min 0
 * @desc Nueva coordenada Y para usar cuando viaje rápido a este punto
 *
 * @arg direction
 * @text Dirección
 * @type number
 * @default 2
 * @min 0
 * @desc La dirección a mirar después de la transferencia. 2 = abajo, 4 = izquierda, 6 = derecha, 8 = arriba.
 *
 * @command Change Category
 * @text Cambiar Categoría
 * @desc Cambiar qué categoría de un punto de viaje rápido.
 *
 * @arg name
 * @text Fast Travel Point Name
 * @desc El nombre del punto de viaje rápido a cambiar.
 *
 * @arg category
 * @text Categoría
 * @desc Nueva categoría para asignar al punto de viaje rápido.
 *
 * @param Fast Travel Points
 * @text Puntos de viaje rápido
 * @type struct<FastTravelPoint>[]
 * @default []
 * @desc Configura diferentes puntos de viaje rápido aquí.
 *
 * @param Window Options
 * @text Opciones de ventana
 *
 * @param Show Categories
 * @text Mostrar Categorías
 * @parent Window Options
 * @type boolean
 * @desc Mostrar o no una ventana de categoría.
 * @default false
 *
 * @param Use Costs
 * @text Costos de uso
 * @parent Window Options
 * @type boolean
 * @desc Determine si alguna vez habrá costos asociados con los viajes rápidos.
 * @default true
 *
 * @param Cost Text
 * @text Texto de costo
 * @text Texto de costo
 * @parent Window Options
 * @desc Texto para mostrar en la parte superior de la ventana de costos.
 * @default \c[1]Costs:\c[0]
 *
 * @param Free Text
 * @text Texto Libre/Gratis
 * @parent Window Options
 * @desc Texto para mostrar los costos si la ubicación no tiene costo.
 * @default None
 *
 * @param Cost Window Lines
 * @text Líneas de ventana de costo
 * @parent Window Options
 * @type number
 * @min 2
 * @desc La cantidad de líneas de texto que se mostrarán en la ventana de costos si se usan costos.
 * @default 3
 *
 * @param List Alignment
 * @text Lista de alineación
 * @parent Window Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc La alineación del texto de la ventana de lista.
 * @default left
 *
 * @param Background Image
 * @parent Window Options
 * @type file
 * @dir img/
 * @desc Image to show in the background of the scene. Default blurry map used if none provided.
 *
 * @param Transparent Windows
 * @parent Window Options
 * @type boolean
 * @desc If true, will cause fast travel scene window backgrounds to be transparent
 * @default false
 *
 * @param Disable Touch UI Space
 * @parent Window Options
 * @type boolean
 * @desc If true, will not leave space for Touch UI buttons if Touch UI is disabled
 * @default false
 *
 * @param Hide Empty Categories
 * @parent Window Options
 * @type boolean
 * @desc If true, will not display fast travel categories with no discovered points
 * @default false
 *
 * @param List Window Right
 * @parent Window Options
 * @type boolean
 * @desc If true, will display the list and cost windows on the right side of screen
 * @default false
 *
 * @param List Window Width
 * @parent Window Options
 * @type number
 * @desc Width as a % of the screen, for example 40 = 40% of the screen
 * @default 33
 *
 * @param Other CGMZ Plugin Options
 * @text Otras opciones del complemento CGMZ
 *
 * @param Show Discover Toast
 * @text Mostrar mensaje Descubrir
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default true
 * @desc ¿Mostrar una ventana emergente cuando se descubre un nuevo punto de viaje rápido? (requiere CGMZ ToastManager)
 *
 * @param Toast Text
 * @text Mensaje de texto
 * @parent Other CGMZ Plugin Options
 * @default \c[1]Fast Travel Unlocked:\c[0]
 * @desc Texto para describir un nuevo punto de viaje rápido en la ventana del mensaje (requiere CGMZ ToastManager).
*/
/*~struct~FastTravelPoint:es
 * @param Name
 * @text Nombre
 * @type text
 * @desc El nombre del punto de viaje rápido.
 * 
 * @param Discovered
 * @text Descubierto
 * @type boolean
 * @default true
 * @desc Determine si el punto de viaje rápido se descubre al comienzo del juego.
 * 
 * @param Enabled
 * @type boolean
 * @default true
 * @desc Determine whether the fast travel point is enabled at the start of the game.
 * 
 * @param Description
 * @text Descripción
 * @desc Descripción de viajes rápidos,
 * 
 * @param Category
 * @text Categoría
 * @desc La categoría a la que pertenece este punto de viaje rápido (si usa categorías).
 *
 * @param Image
 * @text Imagen
 * @type file
 * @dir img
 * @desc La imagen que se mostrará para el punto de viaje rápido.
 *
 * @param Map
 * @text Mapa
 * @type number
 * @default 0
 * @desc El mapa al cual transferir.
 *
 * @param X
 * @text Coordenada X
 * @type number
 * @min 0
 * @default 0
 * @desc La coordenada X a la que transferir en el mapa.
 *
 * @param Y
 * @text Coordenada Y
 * @type number
 * @min 0
 * @default 0
 * @desc La coordenada Y a la que transferir en el mapa
 *
 * @param Direction
 * @text Dirección
 * @type number
 * @min 0
 * @default 2
 * @desc La dirección a mirar después de la transferencia. 2 = abajo, 4 = izquierda, 6 = derecha, 8 = arriba.
 *
 * @param Gold Cost
 * @text Costo de oro
 * @type number
 * @min 0
 * @default 0
 * @desc La cantidad de moneda que usa este punto de viaje.
 *
 * @param Item Cost
 * @text Costo del artículo
 * @type item
 * @min 0
 * @default 0
 * @desc La identificación del artículo que se consume al usar este punto de viaje.
 *
 * @param Item Cost Amount
 * @text Monto del costo del artículo
 * @type number
 * @min 0
 * @default 0
 * @desc La cantidad del artículo dado usando este costo de puntos de viaje.
 *
 * @param Travel Sound Effect
 * @text Efecto de sonido de viaje
 * @type file
 * @dir audio/se
 * @desc El efecto de sonido para reproducir cuando se viaja rápido aquí.
 *
 * @param Toast Sound Effect
 * @text Efecto de sonido de mensaje
 * @type file
 * @dir audio/se
 * @desc El efecto de sonido que se reproducirá cuando se muestre una ventana de mensaje para este punto de viaje rápido. Requiere CGMZ ToastManager.
*/
var Imported = Imported || {};
Imported.CGMZ_FastTravel = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Fast Travel"] = "1.1.0";
CGMZ.FastTravel = {};
CGMZ.FastTravel.parameters = PluginManager.parameters('CGMZ_FastTravel');
CGMZ.FastTravel.Points = CGMZ_Utils.parseJSON(CGMZ.FastTravel.parameters["Fast Travel Points"], [], "CGMZ Fast Travel", "Your Fast Travel Points parameter is set up incorrectly.");
CGMZ.FastTravel.UseCosts = (CGMZ.FastTravel.parameters["Use Costs"] === "true");
CGMZ.FastTravel.ShowDiscoverToast = (CGMZ.FastTravel.parameters["Show Discover Toast"] === "true");
CGMZ.FastTravel.UseCategories = (CGMZ.FastTravel.parameters["Show Categories"] === "true");
CGMZ.FastTravel.DisableTouchUISpace = (CGMZ.FastTravel.parameters["Disable Touch UI Space"] === "true");
CGMZ.FastTravel.ListWindowRight = (CGMZ.FastTravel.parameters["List Window Right"] === "true");
CGMZ.FastTravel.TransparentWindows = (CGMZ.FastTravel.parameters["Transparent Windows"] === "true");
CGMZ.FastTravel.HideEmptyCategories = (CGMZ.FastTravel.parameters["Hide Empty Categories"] === "true");
CGMZ.FastTravel.CostWindowLines = Number(CGMZ.FastTravel.parameters["Cost Window Lines"]);
CGMZ.FastTravel.ListWindowWidth = Number(CGMZ.FastTravel.parameters["List Window Width"]);
CGMZ.FastTravel.CostText = CGMZ.FastTravel.parameters["Cost Text"];
CGMZ.FastTravel.FreeText = CGMZ.FastTravel.parameters["Free Text"];
CGMZ.FastTravel.ToastText = CGMZ.FastTravel.parameters["Toast Text"];
CGMZ.FastTravel.ListAlignment = CGMZ.FastTravel.parameters["List Alignment"];
CGMZ.FastTravel.BackgroundImage = CGMZ.FastTravel.parameters["Background Image"];
//=============================================================================
// CGMZ_FastTravelPoint
//-----------------------------------------------------------------------------
// Store and manage fast travel point data
//=============================================================================
function CGMZ_FastTravelPoint() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize fast travel point
//-----------------------------------------------------------------------------
CGMZ_FastTravelPoint.prototype.initialize = function(point) {
	this._name = point.Name;
	this._discovered = (point.Discovered === "true");
	this._enabled = (point.Enabled === "true");
	this._description = point.Description;
	this._image = point.Image;
	this._mapId = Number(point.Map);
	this._x = Number(point.X);
	this._y = Number(point.Y);
	this._dir = Number(point.Direction);
	this._category = point.Category;
	this.setupCosts(point);
	this._travelSe = point["Travel Sound Effect"];
	this._toastSe = point["Toast Sound Effect"];
};
//-----------------------------------------------------------------------------
// Initialize fast travel point costs
//-----------------------------------------------------------------------------
CGMZ_FastTravelPoint.prototype.setupCosts = function(point) {
	this._goldCost = Number(point["Gold Cost"]);
	this._itemCostAmount = Number(point["Item Cost Amount"]);
	this._itemCostId = Number(point["Item Cost Item"]);
	this._hasCosts = (this._goldCost > 0 || this._itemCostAmount > 0);
};
//-----------------------------------------------------------------------------
// Determine if the fast travel point has costs
//-----------------------------------------------------------------------------
CGMZ_FastTravelPoint.prototype.hasCosts = function(point) {
	return this._hasCosts;
};
//-----------------------------------------------------------------------------
// Subtract the costs from the player inventory
//-----------------------------------------------------------------------------
CGMZ_FastTravelPoint.prototype.takeCosts = function() {
	$gameParty.loseGold(this._goldCost);
	$gameParty.loseItem($dataItems[this._itemCostId], this._itemCostAmount, false);
};
//-----------------------------------------------------------------------------
// Discover/undiscover the fast travel point
//-----------------------------------------------------------------------------
CGMZ_FastTravelPoint.prototype.discover = function(discovered) {
	this._discovered = discovered;
	if(discovered && Imported.CGMZ_ToastManager && CGMZ.FastTravel.ShowDiscoverToast) {
		this.setupDiscoverToast();
	}
};
//-----------------------------------------------------------------------------
// Discover/undiscover the fast travel point
//-----------------------------------------------------------------------------
CGMZ_FastTravelPoint.prototype.enable = function(enabled) {
	this._enabled = enabled;
};
//-----------------------------------------------------------------------------
// Set up the toast for if a point is discovered
//-----------------------------------------------------------------------------
CGMZ_FastTravelPoint.prototype.setupDiscoverToast = function() {
	const toast = {};
	toast.CGMZFastTravelToast = true;
	toast.name = this._name;
	if(this._toastSe !== "") toast.SE = {name: this._toastSe, pan: 0, pitch: 100, volume: 100};
	$cgmzTemp.createNewToast(toast);
};
//=============================================================================
// CGMZ
//-----------------------------------------------------------------------------
// Manage fast travel data
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also initialize fast travel data
//-----------------------------------------------------------------------------
const alias_CGMZ_FastTravel_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZ_FastTravel_createPluginData.call(this);
	this.initializeFastTravelData(false);
};
//-----------------------------------------------------------------------------
// Initialize fast travel data
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initializeFastTravelData = function(reinitialize) {
	if(!this._fastTravelPoints || reinitialize) {
		this.setupFastTravelVariables();
	}
	for(const pointData of CGMZ.FastTravel.Points) {
		const data = CGMZ_Utils.parseJSON(pointData, null, "CGMZ Fast Travel", "You have a Fast Travel Point set up without proper JSON: " + pointData);
		if(data) {
			const point = new CGMZ_FastTravelPoint(data);
			const existingPoint = this.getFastTravelPoint(point._name);
			if(!existingPoint) this._fastTravelPoints.push(point);
			// patch in enabled property default to existing save file points
			if(existingPoint && !existingPoint.hasOwnProperty("_enabled")) existingPoint._enabled = point._enabled;
		}
	}
};
//-----------------------------------------------------------------------------
// Initialize fast travel variables
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setupFastTravelVariables = function() {
	this._fastTravelPoints = [];
};
//-----------------------------------------------------------------------------
// Load new fast travel data after load
//-----------------------------------------------------------------------------
const alias_CGMZ_FastTravel_CGMZCore_onAfterLoad = CGMZ_Core.prototype.onAfterLoad;
CGMZ_Core.prototype.onAfterLoad = function() {
	alias_CGMZ_FastTravel_CGMZCore_onAfterLoad.call(this);
	this.initializeFastTravelData(false);
};
//-----------------------------------------------------------------------------
// Returns array of all fast travel points
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAllFastTravelPoints = function() {
	return this._fastTravelPoints;
};
//-----------------------------------------------------------------------------
// Returns array of all discovered fast travel points
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAllDiscoveredFastTravelPoints = function() {
	return this._fastTravelPoints.filter(point => point._discovered);
};
//-----------------------------------------------------------------------------
// Get fast travel point by name. Returns null if unsuccessful
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getFastTravelPoint = function(name) {
	return this._fastTravelPoints.find(point => point._name === name);
};
//-----------------------------------------------------------------------------
// Get fast travel point categories
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getFastTravelPointCategories = function() {
	const categories = [];
	for(const point of this._fastTravelPoints) {
		if(point._discovered && !categories.includes(point._category)) categories.push(point._category);
	}
	return categories;
};
//-----------------------------------------------------------------------------
// Returns array of all discovered fast travel points from a specific category
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAllDiscoveredFastTravelPointsFromCategory = function(category) {
	return (category === "all") ? this.getAllDiscoveredFastTravelPoints() : this._fastTravelPoints.filter(point => point._category === category && point._discovered);
};
//-----------------------------------------------------------------------------
// Alters the discovered property of a fast travel point
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.discoverFastTravelPoint = function(name, discovered) {
	const point = this.getFastTravelPoint(name);
	if(point) {
		point.discover(discovered);
	}
};
//-----------------------------------------------------------------------------
// Alters the enabled property of a fast travel point
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.enableFastTravelPoint = function(name, enabled) {
	const point = this.getFastTravelPoint(name);
	if(point) {
		point._enabled = enabled;
	}
};
//-----------------------------------------------------------------------------
// Alters the map settings of a fast travel point
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.changeFastTravelPointMap = function(name, mapId, x, y, dir) {
	const point = this.getFastTravelPoint(name);
	if(point) {
		point._mapId = mapId;
		point._x = x;
		point._y = y;
		point._dir = dir;
	}
};
//-----------------------------------------------------------------------------
// Alters the map settings of a fast travel point
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.changeFastTravelPointCategory = function(name, category) {
	const point = this.getFastTravelPoint(name);
	if(point) {
		point._category = category;
	}
};
//-----------------------------------------------------------------------------
// Get the number of fast travel locations discovered
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getTotalFastTravelPointsDiscovered = function() {
	return this.getAllDiscoveredFastTravelPoints().length;
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Register and handling for plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_FastTravel_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_FastTravel_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_FastTravel", "Call Scene", this.pluginCommandFastTravelCallScene);
	PluginManager.registerCommand("CGMZ_FastTravel", "Reinitialize", this.pluginCommandFastTravelReinitialize);
	PluginManager.registerCommand("CGMZ_FastTravel", "discover", this.pluginCommandFastTravelDiscover);
	PluginManager.registerCommand("CGMZ_FastTravel", "Enable Fast Travel Point", this.pluginCommandFastTravelEnable);
	PluginManager.registerCommand("CGMZ_FastTravel", "Change Map", this.pluginCommandFastTravelChangeMap);
	PluginManager.registerCommand("CGMZ_FastTravel", "Change Category", this.pluginCommandFastTravelChangeCategory);
};
//-----------------------------------------------------------------------------
// Plugin Command - Call fast travel scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandFastTravelCallScene = function(args) {
	const categories = JSON.parse(args.categories);
	SceneManager.push(CGMZ_Scene_FastTravel);
	if(categories.length > 0) {
		SceneManager.prepareNextScene(categories);
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - Reinitialize the fast travel data (for saved games)
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandFastTravelReinitialize = function() {
	$cgmz.initializeFastTravelData(true);
};
//-----------------------------------------------------------------------------
// Plugin Command - Set the discover status of a fast travel point
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandFastTravelDiscover = function(args) {
	$cgmz.discoverFastTravelPoint(args.name, (args.discover === 'true'));
};
//-----------------------------------------------------------------------------
// Plugin Command - Change map settings of fast travel point
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandFastTravelChangeMap = function(args) {
	$cgmz.changeFastTravelPointMap(args.name, Number(args.map), Number(args.x), Number(args.y), Number(args.direction));
};
//-----------------------------------------------------------------------------
// Plugin Command - Change category of fast travel point
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandFastTravelChangeCategory = function(args) {
	$cgmz.changeFastTravelPointCategory(args.name, args.category);
};
//-----------------------------------------------------------------------------
// Plugin Command - Set the enable status of a fast travel point
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandFastTravelEnable = function(args) {
	$cgmz.enableFastTravelPoint(args.Name, (args.Enable === 'true'));
};
//=============================================================================
// CGMZ_Scene_FastTravel
//-----------------------------------------------------------------------------
// Handle the fast travel scene
//=============================================================================
function CGMZ_Scene_FastTravel() {
    this.initialize.apply(this, arguments);
}
CGMZ_Scene_FastTravel.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_FastTravel.prototype.constructor = CGMZ_Scene_FastTravel;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.initialize = function(categories = null) {
	this.createCategories(categories);
    Scene_MenuBase.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Prepare
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.prepare = function(categories = null) {
	this.createCategories(categories);
};
//-----------------------------------------------------------------------------
// Prepare
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.createCategories = function(categories) {
	this._categories = (categories) ? categories : $cgmz.getFastTravelPointCategories();
	if(CGMZ.FastTravel.HideEmptyCategories && this._categories.length > 0) {
		this._categories = this._categories.filter(category => $cgmz.getAllDiscoveredFastTravelPointsFromCategory(category).length > 0);
	}
};
//-----------------------------------------------------------------------------
// Create fast travel windows
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	if(CGMZ.FastTravel.UseCategories) {
		this.createCategoryWindow();
	}
	this.createListWindow();
	if(CGMZ.FastTravel.UseCosts) {
		this.createCostWindow();
	}
	this.createDescriptionWindow();
	this.createImageWindow();
};
//-----------------------------------------------------------------------------
// Create category window
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.createCategoryWindow = function() {
	const rect = this.categoryWindowRect();
    this._categoryWindow = new CGMZ_Window_FastTravelCategory(rect, this._categories);
	this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
	this._categoryWindow.setHandler('ok', this.onCategoryOk.bind(this));
    this.addWindow(this._categoryWindow);
};
//-----------------------------------------------------------------------------
// Get category window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.categoryWindowRect = function() {
	const x = 0;
	const y = this.hasTouchUI() ? this.mainAreaTop() : 0;
	const width = Graphics.boxWidth;
	const height = this.calcWindowHeight(1, true);
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create list window
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.createListWindow = function() {
	const rect = this.listWindowRect();
    this._listWindow = new CGMZ_Window_FastTravelList(rect);
	this._listWindow.setHandler('ok', this.onListOk.bind(this));
	if(CGMZ.FastTravel.UseCategories) {
		this._listWindow.setHandler('cancel', this.onListCancel.bind(this));
		this._categoryWindow.setListWindow(this._listWindow);
	} else {
		this._listWindow.setHandler('cancel', this.popScene.bind(this));
		this._listWindow.activate();
		this._listWindow.select(0);
	}
	this._listWindow.refresh();
    this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// Get list window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.listWindowRect = function() {
	const y = (CGMZ.FastTravel.UseCategories) ? this._categoryWindow.y + this._categoryWindow.height : (this.hasTouchUI()) ? this.mainAreaTop() : 0;
	const width = Graphics.boxWidth * (CGMZ.FastTravel.ListWindowWidth / 100.0);
	let height = Graphics.boxHeight - y;
	if(CGMZ.FastTravel.UseCosts) {
		height -= this.calcWindowHeight(CGMZ.FastTravel.CostWindowLines, false);
	}
	const x = CGMZ.FastTravel.ListWindowRight ? Graphics.boxWidth - width : 0;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create cost window
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.createCostWindow = function() {
	const rect = this.costWindowRect();
    this._costWindow = new CGMZ_Window_FastTravelCost(rect);
	this._costWindow.refresh();
	this._listWindow.setCostWindow(this._costWindow);
    this.addWindow(this._costWindow);
};
//-----------------------------------------------------------------------------
// Get cost window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.costWindowRect = function() {
	const x = this._listWindow.x;
	const y = this._listWindow.height + this._listWindow.y;
	const width = this._listWindow.width;
	const height = this.calcWindowHeight(CGMZ.FastTravel.CostWindowLines, false);
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create display window
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.createDescriptionWindow = function() {
	const rect = this.descriptionWindowRect()
    this._descriptionWindow = new CGMZ_Window_FastTravelDescription(rect);
	this._descriptionWindow.refresh();
	this._listWindow.setDescriptionWindow(this._descriptionWindow);
    this.addWindow(this._descriptionWindow);
};
//-----------------------------------------------------------------------------
// Get display window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.descriptionWindowRect = function() {
	const x = CGMZ.FastTravel.ListWindowRight ? 0 : this._listWindow.width;
	const y = this._listWindow.y;
	const width = Graphics.boxWidth - this._listWindow.width;
	const height = this.calcWindowHeight(2, false);
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create display window
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.createImageWindow = function() {
	const rect = this.imageWindowRect()
    this._imageWindow = new CGMZ_Window_FastTravelImage(rect);
	this._imageWindow.refresh();
	this._listWindow.setImageWindow(this._imageWindow);
    this.addWindow(this._imageWindow);
};
//-----------------------------------------------------------------------------
// Get display window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.imageWindowRect = function() {
	const x = this._descriptionWindow.x;
	const y = this._descriptionWindow.height + this._descriptionWindow.y;
	const width = this._descriptionWindow.width;
	const height = Graphics.boxHeight - y;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Check if should make room for Touch UI
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.hasTouchUI = function() {
	return !CGMZ.FastTravel.DisableTouchUISpace || ConfigManager.touchUI;
};
//-----------------------------------------------------------------------------
// On Category Ok
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.onCategoryOk = function() {
	this._categoryWindow.deactivate();
	this._listWindow.activate();
	this._listWindow.select(0);
};
//-----------------------------------------------------------------------------
// On List Cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.onListCancel = function() {
	this._listWindow.select(0);
	this._listWindow.ensureCursorVisible();
	this._listWindow.deselect();
	this._listWindow.deactivate();
	this._categoryWindow.activate();
	this._descriptionWindow.contents.clear();
	this._imageWindow.contents.clear();
	this._imageWindow._sprite.hide();
	if(CGMZ.FastTravel.UseCosts) {
		this._costWindow.contents.clear();
	}
};
//-----------------------------------------------------------------------------
// On List Ok
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.onListOk = function() {
	const fastTravel = this._listWindow.item();
	if(fastTravel._travelSe) {
		const se = {name: fastTravel._travelSe, pan: 0, pitch: 100, volume: 100};
		AudioManager.playSe(se);
	}
	fastTravel.takeCosts();
	$gamePlayer.reserveTransfer(fastTravel._mapId, fastTravel._x, fastTravel._y, fastTravel._dir, 0);
	SceneManager.goto(Scene_Map);
};
//-----------------------------------------------------------------------------
// Add background image
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.createBackground = function() {
	Scene_MenuBase.prototype.createBackground.call(this);
	if(CGMZ.FastTravel.BackgroundImage) {
		const data = CGMZ_Utils.getImageData(CGMZ.FastTravel.BackgroundImage, "img/");
		this._backgroundCustomSprite = new Sprite();
		this._backgroundCustomSprite.bitmap = ImageManager.loadBitmap(data.folder, data.filename);
		this.addChild(this._backgroundCustomSprite);
	}
};
//=============================================================================
// CGMZ_Window_FastTravelCost
//-----------------------------------------------------------------------------
// Shows cost of the fast travel location
//=============================================================================
function CGMZ_Window_FastTravelCost(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_FastTravelCost.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_FastTravelCost.prototype.constructor = CGMZ_Window_FastTravelCost;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelCost.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.FastTravel.TransparentWindows));
	this.refresh();
	this._item = null;
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelCost.prototype.refresh = function() {
	this.contents.clear();
	if(this._item) {
		this.drawCost();
	}
};
//-----------------------------------------------------------------------------
// Draw the item description
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelCost.prototype.drawCost = function() {
	this.CGMZ_drawTextLine(CGMZ.FastTravel.CostText, 0, 0, this.contents.width, 'center');
	let y = this.lineHeight();
	if(!this._item.hasCosts()) {
		this.CGMZ_drawTextLine(CGMZ.FastTravel.FreeText, 0, y, this.contents.width, 'center');
	}
	if(this._item._goldCost > 0) {
		this.drawText(this._item._goldCost + TextManager.currencyUnit, 0, y, this.contents.width, 'center');
		y += this.lineHeight();
	}
	if(this._item._itemCostAmount > 0) {
		const item = $dataItems[this._item._itemCostId];
		let widthNeeded = this.textWidth(this._item._itemCostAmount + "x ");
		widthNeeded += ImageManager.iconWidth + 4;
		widthNeeded += this.textWidth(item.name);
		let x = ((this.contents.width - widthNeeded) / 2).clamp(0, this.contents.width);
		this.drawText(this._item._itemCostAmount + "x", x, y, this.contents.width, 'left');
		x += this.textWidth(this._item._itemCostAmount + "x ");
		this.drawItemName(item, x, y, this.contents.width-x);
	}
};
//-----------------------------------------------------------------------------
// Set item
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelCost.prototype.setItem = function(item) {
	if(this._item === item) return;
	this._item = item;
	this.refresh();
};
//=============================================================================
// CGMZ_Window_FastTravelDescription
//-----------------------------------------------------------------------------
// Shows description of the fast travel location
//=============================================================================
function CGMZ_Window_FastTravelDescription(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_FastTravelDescription.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_FastTravelDescription.prototype.constructor = CGMZ_Window_FastTravelDescription;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelDescription.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.FastTravel.TransparentWindows));
	this._item = null;
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelDescription.prototype.refresh = function() {
	this.contents.clear();
	if(this._item) {
		this.drawItemDescription();
	}
};
//-----------------------------------------------------------------------------
// Draw the item description
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelDescription.prototype.drawItemDescription = function() {
	this.CGMZ_drawText(this._item._description, 0, 0, 0, this.contents.width);
};
//-----------------------------------------------------------------------------
// Set item
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelDescription.prototype.setItem = function(item) {
	if(this._item === item) return;
	this._item = item;
	this.refresh();
};
//=============================================================================
// CGMZ_Window_FastTravelImage
//-----------------------------------------------------------------------------
// Shows image for the fast travel location
//=============================================================================
function CGMZ_Window_FastTravelImage(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_FastTravelImage.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_FastTravelImage.prototype.constructor = CGMZ_Window_FastTravelImage;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelImage.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.FastTravel.TransparentWindows));
	this._item = null;
	this._sprite = new Sprite();
	this.addInnerChild(this._sprite);
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelImage.prototype.refresh = function() {
	this.contents.clear();
	if(this._item) {
		this.drawItemImage();
	}
};
//-----------------------------------------------------------------------------
// Draw the item description
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelImage.prototype.drawItemImage = function() {
	this._sprite.hide();
	const imageData = $cgmzTemp.getImageData(this._item._image);
	this._sprite.bitmap = ImageManager.loadBitmap(imageData.folder, imageData.filename);
	this._sprite.bitmap.addLoadListener(this.drawImage.bind(this));
};
//-----------------------------------------------------------------------------
// Draw the item description
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelImage.prototype.drawImage = function() {
	let scaleX = 1;
	let scaleY = 1;
	if(this._sprite.width > this.contents.width) {
		scaleX = this.contents.width/this._sprite.width;
	}
	if(this._sprite.height > this.contents.height) {
		scaleY = this.contents.height/this._sprite.height;
	}
	this._sprite.scale.x = scaleX;
	this._sprite.scale.y = scaleY;
	this._sprite.x = (this.contents.width - this._sprite.width * scaleX) / 2;
	this._sprite.y = (this.contents.height - this._sprite.height * scaleY) / 2;
	this._sprite.show();
};
//-----------------------------------------------------------------------------
// Set item
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelImage.prototype.setItem = function(item) {
	if(this._item === item) return;
	this._item = item;
	this.refresh();
};
//=============================================================================
// CGMZ_Window_FastTravelList
//-----------------------------------------------------------------------------
// Selectable window for choosing a fast travel point in a list.
//=============================================================================
function CGMZ_Window_FastTravelList(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_FastTravelList.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_FastTravelList.prototype.constructor = CGMZ_Window_FastTravelList;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.FastTravel.TransparentWindows));
	this._category = {name: "all"};
};
//-----------------------------------------------------------------------------
// Set Item
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.setItem = function(category) {
    if(category === this._category) return;
	this._category = category;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Determine if current item enabled
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this.item());
};
//-----------------------------------------------------------------------------
// Determine if point is enabled
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.isEnabled = function(point) {
    return (point && point._enabled && this.meetsCosts(point));
};
//-----------------------------------------------------------------------------
// Determine if achievement is enabled
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.meetsCosts = function(point) {
    if(point.hasCosts()) {
		if(point._goldCost > $gameParty.gold()) {
			return false;
		}
		if(point._itemCostAmount > 0) {
			const numItems = $gameParty.numItems($dataItems[point._itemCostId]);
			return (numItems >= point._itemCostAmount);
		}
	}
	return true;
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.refresh = function() {
    this.makeItemList();
    Window_Selectable.prototype.refresh.call(this);
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.makeItemList = function() {
	if(this._category) {
		this._data = $cgmz.getAllDiscoveredFastTravelPointsFromCategory(this._category.name);
	} else {
		this._data = [];
	}
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.drawItem = function(index) {
    const item = this._data[index];
    const rect = this.itemRectWithPadding(index);
	this.changePaintOpacity(this.isEnabled(item));
    this.drawText(item._name, rect.x, rect.y, rect.width, CGMZ.FastTravel.ListAlignment);
};
//-----------------------------------------------------------------------------
// Set description window
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.setDescriptionWindow = function(descriptionWindow) {
    this._descriptionWindow = descriptionWindow;
    this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// Set image window
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.setImageWindow = function(imageWindow) {
    this._imageWindow = imageWindow;
    this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// Set cost window
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.setCostWindow = function(costWindow) {
    this._costWindow = costWindow;
    this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if can update description window
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.callUpdateHelp = function() {
    if(this._descriptionWindow) {
		this._descriptionWindow.setItem(this.item());
	}
	if(this._imageWindow) {
		this._imageWindow.setItem(this.item());
	}
	if(this._costWindow) {
		this._costWindow.setItem(this.item());
	}
};
//=============================================================================
// CGMZ_Window_FastTravelCategory
//-----------------------------------------------------------------------------
// Command window for choosing a category in the fast travel scene
//=============================================================================
function CGMZ_Window_FastTravelCategory(rect, categories) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_FastTravelCategory.prototype = Object.create(Window_HorzCommand.prototype);
CGMZ_Window_FastTravelCategory.prototype.constructor = CGMZ_Window_FastTravelCategory;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelCategory.prototype.initialize = function(rect, categories) {
	this._categories = categories;
    Window_HorzCommand.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.FastTravel.TransparentWindows));
	this.refresh();
	this.activate();
};
//-----------------------------------------------------------------------------
// Make list of commands to display
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelCategory.prototype.makeCommandList = function() {
	for(const category of this._categories) {
		const name = category;
		const symbol = category;
		this.addCommand(name, symbol, true);
	}
};
//-----------------------------------------------------------------------------
// Draw the item with text codes
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelCategory.prototype.drawItem = function(index) {
	const rect = this.itemLineRect(index);
	this.resetTextColor();
	this.changePaintOpacity(this.isCommandEnabled(index));
	this.drawText(this.commandName(index), rect.x, rect.y, rect.width, this.itemTextAlign());
};
//-----------------------------------------------------------------------------
// Set list (helper) window
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelCategory.prototype.setListWindow = function(listWindow) {
	this._listWindow = listWindow;
	this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if able to update helper windows
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelCategory.prototype.callUpdateHelp = function() {
	if(this.active) {
		this.updateHelperWindows();
	}
};
//-----------------------------------------------------------------------------
// See if able to update helper windows
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelCategory.prototype.updateHelperWindows = function() {
	if(this._listWindow) {
		this._listWindow.setItem(this.currentData());
	}
};
//=============================================================================
// CGMZ_Window_Toast
//-----------------------------------------------------------------------------
// Handle CGMZ Fast Travel Toasts
//=============================================================================
//-----------------------------------------------------------------------------
// Processing for custom toasts. Alias
//-----------------------------------------------------------------------------
if(Imported.CGMZ_ToastManager) {
const alias_CGMZ_FastTravel_processCustomToast = CGMZ_Window_Toast.prototype.processCustomToast;
CGMZ_Window_Toast.prototype.processCustomToast = function(toastObject) {
	alias_CGMZ_FastTravel_processCustomToast.call(this, toastObject);
	if(toastObject.hasOwnProperty('CGMZFastTravelToast')) {
		this.CGMZ_drawTextLine(CGMZ.FastTravel.ToastText, 0, 0, this.contents.width, 'center');
		this.CGMZ_drawTextLine(toastObject.name, 0, this.lineHeight(), this.contents.width, 'center');
	}
};
}