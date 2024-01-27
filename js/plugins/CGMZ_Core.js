/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/core/
 * @target MZ
 * @plugindesc Core CGMZ Plugin, should be placed above all other CGMZ Plugins.
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.14.0
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.7.0
 * ----------------------------------------------------------------------------
 * Description: This is the core CGMZ plugin which is used extensively
 * by other CGMZ plugins and is likely to be required.
 * ----------------------------------------------------------------------------
 * Documentation:
 * ----------------------Checking for Updates----------------------------------
 * This plugin can automatically check if any CGMZ plugin you have is out of
 * date. To see out of date plugins, open the console while playtesting by
 * pressing F8.
 *
 * To enable this, turn Check for Updates parameter to true. The game will
 * *NOT* check for updates in deployed games, even if this parameter is true.
 * -------------------------Plugin Commands------------------------------------
 * The following plugin commands are supported:
 * 
 * • Initialize
 * Re-initializes the CGMZ Core. Only use this if you know what you are doing!
 * Erases CGMZ data.
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games. This means you can:
 *
 * ✓ Add this plugin to a saved game and it will work as expected
 * ✓ Change any plugin params and changes will be reflected in saved games
 * ✓ Remove the plugin with no issue to save data
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_Core.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * -------------------------Version History------------------------------------
 * 1.0 - Initial release
 * 
 * 1.1:
 * - Added function to automatically check if any CGMZ plugin is out of date
 * - Added function to split a string into multiple lines if the string is too
 * long for a window to handle without reducing font size (text wrap).
 * - Added class CGMZ_Window_Scrollable which can scroll vertically with
 * handlers but no visible cursor. A mix between Window_Base,
 * Window_Scrollable, and Window_Selectable
 * - Added CGMZ map name meta access
 *
 * 1.2:
 * - Removed unused code for a title window as this no longer fits with MZ
 * touch buttons.
 * - Added draw gauge functionality to windows that do not need sprite gauges
 *
 * 1.2.1:
 * - Updated api call for version check to use semantic versioning
 * - Added link to update directly from console
 * - Cut down on outdated CGMZ plugin warnings in console
 *
 * 1.3.0:
 * - Added basic input processing for all keys on keyboard
 * - Added option to open dev tools on game start
 *
 * 1.4.0:
 * - Added option to show fps on game start
 * - Added option to go fullscreen on game start
 * - Bugfix to add cap to scrollable window size
 *
 * 1.5.0:
 * - Added new draw text function for text codes with automatic line breaks
 * - Added update behavior
 * - Added behavior after load in CGMZ classes
 * - Added new timer class
 * - Optimized existing code
 *
 * 1.5.1:
 * - Added parameter to simulate deployed environment during playtest
 * - Added new draw text function for drawing for a single line of text
 *   with text codes
 *
 * 1.5.2:
 * - More concise error reporting
 * - Bugfix for font size changes throwing off line wrap when drawing text
 *   with text codes
 *
 * 1.5.3:
 * - Added function for getting file info
 * - Removed deprecated code (if getting crash after update, update crashing
 *   plugin)
 *
 * 1.6.0:
 * - Added support for subfolders for images
 * - Added more customizable selectable window with categories
 * - Added function to draw a divider on windows
 * - Added support for spritesheet animations on map
 * - Various bug fixes for text code drawing in unusual cases
 *
 * 1.7.0:
 * - Added horizontally scrolling windows
 * - Added filesystem functions
 *
 * 1.7.1:
 * - Changed some CGMZ draw text functions to adjust width of text if too wide
 * - Documentation should no longer horizontally scroll
 *
 * 1.8.0:
 * - Added gamepad meta info detection
 * - Added idle detection
 * - Added CGMZ_Utils to replace some CGMZ_Temp utility functions
 * - Added JSON parse helper function to better report errors
 * - Added functions to help change data after saved game loaded
 * - Fixed bug with centered text drawing when scaled into a small area with an offset
 * - Out of date plugin checker should now only check once at boot
 * - Documentation updated
 *
 * 1.8.1:
 * - Add gamepad release function
 * - Add Spanish language support
 * - Bug fix for scaled left-align text drawing
 *
 * 1.9.0:
 * - Added utility function for easier compare of numbers
 * - Added utility function to draw background rectangle
 * - Added utility function to draw input styles for checkbox, radio, and toggle switch
 * - Added utility function to draw N-gons
 * - Added utility function for opening URLs
 * - Fix outdated plugin message for alpha/beta plugins
 *
 * 1.10.0:
 * - Expanded function for getting item data objects to include skill/states
 * - Added locale options
 * - Moved date functions to CGMZ_Utils from CGMZ_Temp
 *
 * 1.11.0:
 * - Added function to draw step animation on windows
 * - Added sprite layer above/below windows in menus
 * - Fix crash when using Event Test
 *
 * 1.12.0:
 * - Added tracking for last input type
 * - Added function to parse JSON SE parameters
 *
 * 1.13.0:
 * - Added function to draw a gradient filled rect
 * - Added function to parse JSON Tone parameters
 * - Added function to setup common toast parameters
 *
 * 1.14.0:
 * - Added selectable window that can show a tilemap
 * - Added lerp functions
 * - Fix gradient rect function to clear with contents
 *
 * @command Initialize
 * @desc Re-initializes some CGMZ Classes. Only call this if you know what you
 * are doing. Will reset all CGMZ Data as if you started a new game.
 *
 * @param Check for Updates
 * @type boolean
 * @desc Check for updates to CGMZ plugins on game start?
 * @default true
 *
 * @param Dev Tools on Start
 * @type boolean
 * @desc Open the dev tool console on game start?
 * @default false
 *
 * @param Show FPS Counter
 * @type boolean
 * @desc Show fps counter on game start?
 * @default false
 *
 * @param Fullscreen
 * @type boolean
 * @desc Go fullscreen on game start?
 * @default false
 *
 * @param Simulate Production Env
 * @type boolean
 * @desc If set to true, this will cause the game to think you are NOT playtesting even when launched in editor
 * @default false
 *
 * @param Force Locale
 * @desc Forces the game to use this locale type (if blank, will use the user's local locale type)
 *
 * @param Fallback Locale
 * @desc The locale type to fall back to for use in locale strings.
 * @default en-US
*/
/*:es
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/core/
 * @target MZ
 * @plugindesc Core CGMZ Plugin, debe colocarse por encima de todos los demás complementos CGMZ
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
 * Versión: 1.14.0
 * ----------------------------------------------------------------------------
 * Compatibilidad: Sólo probado con mis CGMZ plugins.
 * Hecho para RPG Maker MZ 1.7.0
 * ----------------------------------------------------------------------------
 * Descripción: Este es el plugin principal de CGMZ que otros plugin de CGMZ 
 * utilizan ampliamente y es probable que sea necesario.
 * ----------------------------------------------------------------------------
 * Documentación:
 * Este plugin puede verificar automáticamente si algún complemento CGMZ que 
 * tienes está desactualizado. Para ver complementos desactualizados, abre la 
 * consola mientras prueba presionando F8. El juego no buscará actualizaciones 
 * en los juegos implementados.
 * -----------------------Comandos de Plugin-----------------------------------
 * Se admiten los siguientes comandos de complemento:
 * • Initialize
 * Reinicializa el CGMZ Core. Solo usa esto si sabes lo que ¡Tú lo estás
 * haciendo! Borra los datos de CGMZ.
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games. This means you can:
 *
 * ✓ Add this plugin to a saved game and it will work as expected
 * ✓ Change any plugin params and changes will be reflected in saved games
 * ✓ Remove the plugin with no issue to save data
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_Core.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * -------------------------Historial de versiones-----------------------------
 * 1.0 - Versión inicial
 *
 * 1.1:
 * - Función agregada para verificar automáticamente si algún complemento CGMZ 
 *   está desactualizado
 * - Función agregada para dividir una cadena en varias líneas si la cadena es 
 *   demasiado larga para que la maneje una ventana sin reducir el tamaño de 
 *   fuente (ajuste de texto).
 * - Clase agregada CGMZ_Window_Scrollable que puede desplazarse verticalmente 
 *   con controladores pero sin cursor visible. Una mezcla entre Window_Base,
 *   Window_Scrollable y Window_Selectable
 * - Se agregó el metaacceso al nombre del mapa CGMZ
 *
 * 1.2:
 * - Se eliminó el código no utilizado para una ventana de título, ya que ya 
 *   no se ajusta a los botones táctiles MZ.
 * - Se agregó la funcionalidad de indicador de dibujo a las ventanas que no 
 *   necesitan indicadores de sprites.
 *
 * 1.2.1:
 * - Llamada api actualizada para verificación de versión para usar control de 
 *   versiones semántico
 * - Enlace agregado para actualizar directamente desde la consola
 * - Reduzca las advertencias obsoletas del complemento CGMZ en la consola
 *
 * 1.3.0:
 * - Procesamiento de entrada básico agregado para todas las teclas del teclado
 * - Opción agregada para abrir herramientas de desarrollo al inicio del juego
 *
 * 1.4.0:
 * - Opción agregada para mostrar fps al inicio del juego
 * - Opción agregada para ir a pantalla completa al inicio del juego
 * - Corrección de errores para agregar un límite al tamaño de la ventana
 *   desplazable
 *
 * 1.5.0:
 * - Se agregó una nueva función de dibujar texto para códigos de texto con 
 *   saltos de línea automáticos
 * - Comportamiento de actualización agregado
 * - Comportamiento agregado después de la carga en clases CGMZ
 * - Se agregó una nueva clase de temporizador
 * - Código existente optimizado
 *
 * 1.5.1:
 * - Parámetro agregado para simular el entorno desplegado durante la prueba de
 *   juego
 * - Se agregó una nueva función de dibujo de texto para dibujar una sola línea 
 *   de texto con códigos de texto
 *
 * 1.5.2:
 * - Informe de errores más conciso
 * - Corrección de errores para los cambios de tamaño de fuente que arrojan el 
 *   ajuste de línea al dibujar texto con códigos de texto
 *
 * 1.5.3:
 * - Función agregada para obtener información del archivo
 * - Se eliminó el código obsoleto (si se bloquea después de la actualización, 
 *   actualice el complemento de bloqueo)
 *
 * 1.6.0:
 * - Se agregó soporte para subcarpetas para imágenes.
 * - Se agregó una ventana seleccionable más personalizable con categorías
 * - Función agregada para dibujar un divisor en las ventanas
 * - Soporte agregado para animaciones de hojas de sprites en el mapa
 * - Varias correcciones de errores para el dibujo de código de texto en casos 
 *   inusuales
 *
 * 1.7.0:
 * - Se agregaron ventanas de desplazamiento horizontal
 * - Funciones de sistema de archivos añadidas
 *
 * 1.7.1:
 * - Se cambiaron algunas funciones de dibujo de texto CGMZ para ajustar el ancho 
 *   del texto si es demasiado ancho
 * - La documentación ya no debería desplazarse horizontalmente
 *
 * 1.8.0:
 * - Added gamepad meta info detection
 * - Added idle detection
 * - Added CGMZ_Utils to replace some CGMZ_Temp utility functions
 * - Added JSON parse helper function to better report errors
 * - Added functions to help change data after saved game loaded
 * - Fixed bug with centered text drawing when scaled into a small area with an offset
 * - Out of date plugin checker should now only check once at boot
 * - Documentation updated
 *
 * 1.8.1:
 * - Add gamepad release function
 * - Add Spanish language support
 * - Bug fix for scaled left-align text drawing
 *
 * 1.9.0:
 * - Added utility function for easier compare of numbers
 * - Added utility function to draw background rectangle
 * - Added utility function to draw input styles for checkbox, radio, and toggle switch
 * - Added utility function to draw N-gons
 * - Added utility function for opening URLs
 * - Fix outdated plugin message for alpha/beta plugins
 *
 * 1.10.0:
 * - Expanded function for getting item data objects to include skill/states
 * - Added locale options
 * - Moved date functions to CGMZ_Utils from CGMZ_Temp
 *
 * 1.11.0:
 * - Added function to draw step animation on windows
 * - Added sprite layer above/below windows in menus
 * - Fix crash when using Event Test
 *
 * 1.12.0:
 * - Added tracking for last input type
 * - Added function to parse JSON SE parameters
 *
 * 1.13.0:
 * - Added function to draw a gradient filled rect
 * - Added function to parse JSON Tone parameters
 * - Added function to setup common toast parameters
 *
 * 1.14.0:
 * - Added selectable window that can show a tilemap
 * - Added lerp functions
 * - Fix gradient rect function to clear with contents
 *
 * @command Initialize
 * @text Inicializar 
 * @desc Reinicializa algunas clases de CGMZ. Solo llama a esto si sabes lo que
 * estás haciendo. Restablecerá todos los datos de CGMZ como si comenzara un nuevo juego.
 *
 * @param Check for Updates
 * @text Buscar actualizaciones
 * @type boolean
 * @desc ¿Busca actualizaciones de los complementos de CGMZ al iniciar el juego?
 * @default true
 *
 * @param Dev Tools on Start
 * @text Herramientas de desarrollo al inicio
 * @type boolean
 * @desc ¿Abrir la consola de herramientas de desarrollo al iniciar el juego?
 * @default false
 *
 * @param Show FPS Counter
 * @text Mostrar contador de FPS
 * @type boolean
 * @desc ¿Mostrar contador de fps al inicio del juego?
 * @default false
 *
 * @param Fullscreen
 * @text Pantalla completa
 * @type boolean
 * @desc ¿Ir a pantalla completa al inicio del juego?
 * @default false
 *
 * @param Simulate Production Env
 * @text Simular entorno de producción
 * @type boolean
 * @desc Si se establece en verdadero, esto hará que el juego piense que NO estás probando incluso cuando se inicia en el editor.
 * @default false
 *
 * @param Force Locale
 * @desc Forces the game to use this locale type (if blank, will use the user's local locale type)
 *
 * @param Fallback Locale
 * @desc The locale type to fall back to for use in locale strings.
 * @default es
*/
var Imported = Imported || {};
Imported.CGMZ_Core = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["CGMZ Core"] = "1.14.0";
CGMZ.Core = {};
CGMZ.Core.parameters = PluginManager.parameters('CGMZ_Core');
CGMZ.Core.CheckForUpdates = (CGMZ.Core.parameters["Check for Updates"] === "true");
CGMZ.Core.ShowDevTools = (CGMZ.Core.parameters["Dev Tools on Start"] === "true");
CGMZ.Core.StartFullscreen = (CGMZ.Core.parameters["Fullscreen"] === "true");
CGMZ.Core.ShowFPSCounter = (CGMZ.Core.parameters["Show FPS Counter"] === "true");
CGMZ.Core.SimulateProductionEnv = (CGMZ.Core.parameters["Simulate Production Env"] === "true");
CGMZ.Core.ForceLanguage = CGMZ.Core.parameters["Force Locale"];
CGMZ.Core.FallbackLanguage = CGMZ.Core.parameters["Fallback Locale"];
//=============================================================================
// CGMZ_Utils
//-----------------------------------------------------------------------------
// Utility functions used by the plugin
//=============================================================================
function CGMZ_Utils() {
    throw new Error("This is a static class");
}
//-----------------------------------------------------------------------------
// Calculate the average party level
//-----------------------------------------------------------------------------
CGMZ_Utils.calcAvgPartyLevel = function() {
	let avgLevel = 0;
	let totalActors = 0;
	for(const actor of $gameParty.members()) {
		avgLevel += actor._level;
		totalActors++;
	}
	return Math.max(0, Math.round(avgLevel / totalActors));
};
//-----------------------------------------------------------------------------
// Takes a filepath of folder+filename and returns object with separate folder+filename
//-----------------------------------------------------------------------------
CGMZ_Utils.getImageData = function(fullPath, root) {
	const splitPath = fullPath.split("/");
	const file = splitPath.pop();
	const path = splitPath.join("/");
	return {folder: root + "/" + path + "/", filename: file};
};
//-----------------------------------------------------------------------------
// Take a JSON string and optional object to return when null. It also takes
// the plugin name that is trying to parse the JSON and an error message.
// If error, reports to console and returns the returnObjWhenError.
// If no error, returns the parsed JSON object.
//-----------------------------------------------------------------------------
CGMZ_Utils.parseJSON = function(jsonString, returnObjWhenError = null, errorPlugin = "CGMZ Core", suggestion = "Check JSON parameters.") {
	try {
		const obj = JSON.parse(jsonString);
		return obj;
	} catch(e) {
		this.reportError("Error parsing JSON: " + e, errorPlugin, suggestion);
	}
	return returnObjWhenError;
};
//-----------------------------------------------------------------------------
// Takes a JSON parameter with "Name", "Volume", "Pitch" and "Pan" and returns
// a sound effect object
//-----------------------------------------------------------------------------
CGMZ_Utils.parseSoundEffectJSON = function(seJSON, callingPlugin = "CGMZ Core") {
	const defaultSE = {Name:"",Volume:90,Pitch:100,Pan:0};
	const parsedSE = this.parseJSON(seJSON, defaultSE, callingPlugin, "You had a Sound Effect parameter with invalid JSON. It could not be read.");
	const se = {};
	se.name = parsedSE.Name;
	se.volume = Number(parsedSE.Volume);
	se.pitch = Number(parsedSE.Pitch);
	se.pan = Number(parsedSE.Pan);
	return se;
};
//-----------------------------------------------------------------------------
// Takes a JSON parameter with "Red", "Green", and "Blue" and returns
// a tone object
//
// In CGMZ plugins, tones with a -256 value for Red are ignored
//-----------------------------------------------------------------------------
CGMZ_Utils.parseToneJSON = function(toneJSON, callingPlugin = "CGMZ Core") {
	const defaultTone = {Red:-256,Green:0,Blue:0};
	const parseTone = this.parseJSON(toneJSON, defaultTone, callingPlugin, "You had a Tone parameter with invalid JSON. It could not be read.");
	const tone = {};
	tone.Red = Number(parseTone.Red);
	tone.Blue = Number(parseTone.Blue);
	tone.Green = Number(parseTone.Green);
	return tone;
};
//-----------------------------------------------------------------------------
// Takes a Parsed Toast parameter with possible toast common params and returns
// a toast object with common options set up as toast manager expects them
// Possible properties include:
// Display - Text - Either true or false, if false will not parse the toast and return null
// Sound Effect - See CGMZ_Utils.parseSoundEffectJSON
// Tone - See CGMZ_Utils.parseToneJSON
// Background Style - Text - Either Transparent, Dim, or Window
// Windowskin - Text - Path to windowskin image file
// Width - Number - The width in pixels of the toast
// Height - Number - The number of text lines that can fit in the window
// Any extra parameters will not be touched.
//-----------------------------------------------------------------------------
CGMZ_Utils.setupToast = function(parseToast, callingPlugin = "CGMZ Core") {
	if(parseToast.Display === "false") return null; // If the toast object is not going to be used anyways, no need to continue parsing object
	const toast = {};
	if(parseToast.hasOwnProperty("Sound Effect")) toast.SE = this.parseSoundEffectJSON(parseToast["Sound Effect"], callingPlugin);
	if(parseToast.hasOwnProperty("Tone") && !parseToast.Tone.includes("-256")) {
		toast.windowskinTone = parseToast.Tone;
	}
	if(parseToast.hasOwnProperty("Background Style")) toast.backgroundStyle = parseToast["Background Style"];
	if(parseToast.hasOwnProperty("Windowskin") && parseToast.Windowskin) toast.windowskin = this.getImageData(parseToast["Windowskin"], "img");
	if(parseToast.hasOwnProperty("Width") && parseToast.Width !== "0") toast.width = Number(parseToast["Width"]);
	if(parseToast.hasOwnProperty("Height") && parseToast.Height !== "0") toast.height = Number(parseToast["Height"]);
	return toast;
};
//-----------------------------------------------------------------------------
// Opens a URL in browser depending on environment
//-----------------------------------------------------------------------------
CGMZ_Utils.openURL = function(url) {
	(Utils.isNwjs()) ? require('nw.gui').Shell.openExternal(url) : window.open(url);
};
//-----------------------------------------------------------------------------
// Check if can get the user's language
//-----------------------------------------------------------------------------
CGMZ_Utils.canUseUserLanguage = function() {
	return !!(navigator && navigator.language);
};
//-----------------------------------------------------------------------------
// Get the user's language, default to "en-US" if no language detected
//-----------------------------------------------------------------------------
CGMZ_Utils.userLocale = function() {
	return (CGMZ.Core.ForceLanguage) ? CGMZ.Core.ForceLanguage : this.canUseUserLanguage() ? navigator.language : CGMZ.Core.FallbackLanguage;
};
//-----------------------------------------------------------------------------
// Creates a locale date string from a given date and in expected format
//-----------------------------------------------------------------------------
CGMZ_Utils.createDateText = function(format = 0, date = new Date(Date.now())) {
	const locale = this.userLocale();
	const options = this.makeDateOptions(format);
	return date.toLocaleString(locale, options);
};
//-----------------------------------------------------------------------------
// Make the options for the date string
//-----------------------------------------------------------------------------
CGMZ_Utils.makeDateOptions = function(format) {
	const options = {};
	switch(format) {
		case 0:
		case 1:
		case 2:
			options.day = "numeric";
			options.month = "numeric";
			options.year = "numeric";
			break;
		case 3:
		case 4:
			options.day = "numeric";
			options.month = "long";
			options.year = "numeric";
			break;
		case 5:
		case 6:
			options.day = "numeric";
			options.month = "short";
			options.year = "numeric";
			break;
		case 7:
		case 8:
			options.day = "numeric";
			options.month = "numeric";
			break;
		default:
			options.day = "numeric";
			options.month = "numeric";
			options.year = "numeric";
	}
	return options;
};
//-----------------------------------------------------------------------------
// Takes a number and returns it's toLocaleString value
//-----------------------------------------------------------------------------
CGMZ_Utils.numberSplit = function(num) {
	return num.toLocaleString();
};
//-----------------------------------------------------------------------------
// Takes an amount of frames and gives back the time in hours:minutes:seconds
//-----------------------------------------------------------------------------
CGMZ_Utils.timeSplit = function(frameCount) {
	let temp = frameCount/60;
	let seconds = temp%60;
	let minutes = Math.floor(temp/60) % 60;
	let hours = Math.floor(temp/60/60) % 60;
    return hours.padZero(2) + ':' + minutes.padZero(2) + ':' + seconds.padZero(2);
};
//-----------------------------------------------------------------------------
// Look up data item given type and id
//-----------------------------------------------------------------------------
CGMZ_Utils.lookupItem = function(type, id) {
	switch(type) {
		case 'item': return $dataItems[id];
		case 'weapon': return $dataWeapons[id];
		case 'armor': return $dataArmors[id];
		case 'skill': return $dataSkills[id];
		case 'state': return $dataStates[id];
	}
	this.reportError("Item type setup incorrectly", "CGMZ Core", "Check item parameters set up through CGMZ plugins");
	return null;
};
//-----------------------------------------------------------------------------
// Look up item given type and id
//-----------------------------------------------------------------------------
CGMZ_Utils.numberValueCompare = function(value1, value2, comparator) {
	switch(comparator) {
		case '=': return value1 === value2;
		case '!=': return value1 !== value2;
		case '>': return value1 > value2;
		case '>=': return value1 >= value2;
		case '<': return value1 < value2;
		case '<=': return value1 <= value2;
	}
	this.reportError("Unknown comparator: " + comparator, "CGMZ Core", "Check number comparisons set up through CGMZ plugins");
	return false;
};
//-----------------------------------------------------------------------------
// Report an error to the console
//-----------------------------------------------------------------------------
CGMZ_Utils.reportError = function(error, origin, suggestion = "Update Plugins") {
	console.warn("Error in plugin: " + origin + "\nError description: " + error + "\nPossible solution: " + suggestion);
};
//-----------------------------------------------------------------------------
// Save file to filesystem
// This will cause web hosted games to crash
//-----------------------------------------------------------------------------
CGMZ_Utils.saveToLocalFile = function(folder, filename, ext, data, encoding = 'base64') {
    const dirPath = this.fileDirectoryPath(folder);
    const filePath = this.filePath(folder, filename, ext);
    const backupFilePath = filePath + "_";
    return new Promise((resolve, reject) => {
        this.fsMkdir(dirPath);
        this.fsUnlink(backupFilePath);
        this.fsRename(filePath, backupFilePath);
        try {
            this.fsWriteFile(filePath, data, encoding);
            this.fsUnlink(backupFilePath);
            resolve();
        } catch (e) {
            try {
                this.fsUnlink(filePath);
                this.fsRename(backupFilePath, filePath);
            } catch (e2) {
                //
            }
            reject(e);
        }
    });
};
//-----------------------------------------------------------------------------
// Get directory path
// This will cause web hosted games to crash
//-----------------------------------------------------------------------------
CGMZ_Utils.fileDirectoryPath = function(folder) {
    const path = require("path");
    const base = path.dirname(process.mainModule.filename);
    return path.join(base, folder);
};
//-----------------------------------------------------------------------------
// Get file path
// This will cause web hosted games to crash
//-----------------------------------------------------------------------------
CGMZ_Utils.filePath = function(folder, filename, ext) {
    const dir = this.fileDirectoryPath(folder);
    return dir + filename + ext;
};
//-----------------------------------------------------------------------------
// Make directory (if no exists)
// This will cause web hosted games to crash
//-----------------------------------------------------------------------------
CGMZ_Utils.fsMkdir = function(path) {
    const fs = require("fs");
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
};
//-----------------------------------------------------------------------------
// Rename file if exists
// This will cause web hosted games to crash
//-----------------------------------------------------------------------------
CGMZ_Utils.fsRename = function(oldPath, newPath) {
    const fs = require("fs");
    if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
    }
};
//-----------------------------------------------------------------------------
// Unlink file
// This will cause web hosted games to crash
//-----------------------------------------------------------------------------
CGMZ_Utils.fsUnlink = function(path) {
    const fs = require("fs");
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
};
//-----------------------------------------------------------------------------
// Write file
// This will cause web hosted games to crash
//-----------------------------------------------------------------------------
CGMZ_Utils.fsWriteFile = function(path, data, encoding) {
    const fs = require("fs");
    fs.writeFileSync(path, data, encoding);
};
//-----------------------------------------------------------------------------
// Linear Interpolation between 2 values
//-----------------------------------------------------------------------------
CGMZ_Utils.lerp = function(start, end, percent) {
    return (start + (end - start) * percent);
};
//-----------------------------------------------------------------------------
// Function to have an "ease in" effect for a lerp
//-----------------------------------------------------------------------------
CGMZ_Utils.lerpEaseIn = function(percent) {
	return (percent * percent);
};
//-----------------------------------------------------------------------------
// Function to flip a function for a lerp
//-----------------------------------------------------------------------------
CGMZ_Utils.lerpFlip = function(x) {
	return 1 - x;
};
//-----------------------------------------------------------------------------
// Function to have an "ease out" effect for a lerp
//-----------------------------------------------------------------------------
CGMZ_Utils.lerpEaseOut = function(percent) {
	const flippedPct = this.lerpFlip(percent);
	return this.lerpFlip(flippedPct * flippedPct);
};
//-----------------------------------------------------------------------------
// Function to have both an ease in and out effect for a lerp
//-----------------------------------------------------------------------------
CGMZ_Utils.lerpEaseInOut = function(percent) {
	return this.lerp(this.lerpEaseIn(percent), this.lerpEaseOut(percent), percent);
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// This class stores data not saved for CGMZ plugins
//=============================================================================
function CGMZ_Temp() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initialize = function() {
	this._inputCurrentState = {};
	this._animationQueue = [];
	this.createPluginData();
	this.createMappedFunctions();
	this.registerPluginCommands();
	this.initEnvVariables();
	this.initCoreVariables();
	this.addWindowEventListeners();
};
//-----------------------------------------------------------------------------
// Set up environment variables
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initEnvVariables = function() {
	const canvas = document.createElement('canvas');
	const gl = canvas.getContext('webgl');
	if(gl) {
		this._maxCanvasSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
	} else {
		this._maxCanvasSize = 16384; // 2^14
	}
};
//-----------------------------------------------------------------------------
// Get the max canvas size
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getMaxCanvasSize = function() {
	return this._maxCanvasSize;
};
//-----------------------------------------------------------------------------
// Set up CGMZ core variables
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initCoreVariables = function() {
	this._idleCounter = 0;
	this._lastGamePadId = null;
	this._lastInputType = null;
};
//-----------------------------------------------------------------------------
// Check the version of CGMZ plugins against most up to date from server
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkCGMZPluginVersions = function(jsonData) {
	let warned = false;
	let pluginName = "";
	jsonData.versions.forEach((version) => {
		if(CGMZ.Versions[version.name] && CGMZ.Versions[version.name].toString() !== version.version.toString()) {
			if(!warned) {
				console.warn("Warning! Out of date CGMZ Plugin(s) found:");
				warned = true;
			}
			pluginName = version.name;
			if(pluginName === "CGMZ Core") {
				pluginName = "Core";
			}
			const isPublic = !(version.version[0] === "A" || version.version[0] === "B");
			const urlMessage = isPublic ? "You can download an update from https://www.caspergaming.com/plugins/cgmz/" + version.url + "/" : "You can download an update from Patreon or Itch.io. Plugin Info available at: https://www.caspergaming.com/plugins/cgmz/" + version.url + "/";
			console.warn("CGMZ " + pluginName + " had a local version of " + CGMZ.Versions[version.name] + " but a server version of " + version.version + "\n" + urlMessage);
		}
	});
};
//-----------------------------------------------------------------------------
// To be overridden by CGMZ plugins
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.createPluginData = function() {
	// Used by CGMZ plugins
};
//-----------------------------------------------------------------------------
// Update CGMZ Timers and other plugins
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.update = function() {
	this.updateTimers();
	this.updateIdleTimer();
};
//-----------------------------------------------------------------------------
// Update CGMZ Timers
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.updateTimers = function() {
	const timer = $cgmz.getEarliestTimer();
	if(timer && timer._frameCount < Graphics.frameCount) {
		$cgmz.executeEarliestTimer();
	}
};
//-----------------------------------------------------------------------------
// Update Idle Timer
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.updateIdleTimer = function() {
	this._idleCounter++;
};
//-----------------------------------------------------------------------------
// Reset Idle Timer to 0
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.resetIdleTimer = function() {
	this._idleCounter = 0;
};
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.registerPluginCommands = function() {
	PluginManager.registerCommand("CGMZ_Core", "Initialize", this.pluginCommandReinitialize);
};
//-----------------------------------------------------------------------------
// Reinitializes the plugin - Plugin Command
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandReinitialize = function() {
	$cgmzTemp.createPluginData();
	$cgmz.createPluginData();
};
//-----------------------------------------------------------------------------
// Report an error to the console
// Deprecated. Use CGMZ_Utils.reportError instead.
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.reportError = function(error, origin, suggestion = "Update Plugins") {
	console.warn("Error in plugin: " + origin + "\nError description: " + error + "\nPossible solution: " + suggestion);
};
//-----------------------------------------------------------------------------
// Takes a filepath of folder+filename and returns object with separate folder+filename
// Deprecated. Use CGMZ_Utils.getImageData instead.
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getImageData = function(imageLoc) {
	const splitPath = imageLoc.split("/");
	const file = splitPath.pop();
	const path = splitPath.join("/");
	return {folder: "img/" + path + "/", filename: file};
};
//-----------------------------------------------------------------------------
// Takes a number and returns it's toLocaleString value
// Deprecated. Use CGMZ_Utils.numberSplit instead.
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.numberSplit = function(num) {
	return num.toLocaleString();
};
//-----------------------------------------------------------------------------
// Takes an amount of frames and gives back the time in hours:minutes:seconds
// Deprecated. Use CGMZ_Utils.timeSplit instead.
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.timeSplit = function(frameCount) {
	let temp = frameCount/60;
	let seconds = temp%60;
	let minutes = Math.floor(temp/60) % 60;
	let hours = Math.floor(temp/60/60) % 60;
    return hours.padZero(2) + ':' + minutes.padZero(2) + ':' + seconds.padZero(2);
};
//-----------------------------------------------------------------------------
// Takes an amount of seconds and tries to approximate it to Hours, Minutes, or Seconds
// Does not go above days as a time unit.
// For example, 30 seconds would return [30, "seconds"]
//              45 minutes would return [45, "minutes"]
//              18 hours would return   [18, "hours"]
//              28 days would return    [28, "days"]
// If there is an error, it will return an empty array
// If forceApproximation is true, will round down to nearest even unit provided
// by approximateToUnitString
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.approximateTimeValue = function(seconds, forceApproximation, approximateToUnitString) {
	forceApproximation = forceApproximation || false;
	let value = [];
	if (forceApproximation) {
		value[0] = this.approximateTimeValueToUnit(seconds, approximateToUnitString);
		value[1] = approximateToUnitString;
	}
	else if (seconds >= 86400) { // 86400 seconds in a day
		value[0] = Math.floor(seconds/60/60/24);
		value[1] = "Days";
	}
	else if (seconds >= 3600 && seconds < 86400) { // 3060 seconds in an hour, 86400 seconds in a day
		value[0] = Math.floor(seconds/60/60);
		value[1] = "Hours";
	}
	else if (seconds >= 60 && seconds < 3600) { // 60 seconds in a minute, 3600 seconds in an hour
		value[0] = Math.floor(seconds/60);
		value[1] = "Minutes";
	}
	else if (seconds < 60) { // 60 seconds in a minute
		value[0] = seconds;
		value[1] = "Seconds";
	}
	return value;
};
//-----------------------------------------------------------------------------
// Takes an amount of seconds and approximates it to an amount of time units (minute, hour, day)
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.approximateTimeValueToUnit = function(seconds, unitString) {
	switch(unitString) {
		case "Days": return Math.floor(seconds/60/60/24);
		case "Hours": return Math.floor(seconds/60/60);
		case "Minutes": return Math.floor(seconds/60);
		case "Seconds": return seconds;
	}
	const script = "CGMZ Core";
	const error = "Unrecognized unitString in approximateTimeValueToUnit()";
	this.reportError(error, script);
	return 0;
};
//-----------------------------------------------------------------------------
// Take javascript getDate, getMonth, and getFullYear and return formatted date text
// Valid formats (using / as delim):
// 0: MM/DD/YYYY     (ex: 1/20/2001)
// 1: DD/MM/YYYY     (ex: 20/1/2001)
// 2: YYYY/MM/DD     (ex: 2001/1/20)
// 3: Month DD, YYYY (ex: January 20, 2001)
// 4: DD Month YYYY  (ex: 20 January 2001)
// 5: Mon. DD, YYYY  (ex: Jan 20, 2001)
// 6: DD Mon. YYYY   (ex: 20 Jan 2001)
// 7: MM/DD          (ex: 1/20)
// 8: DD/MM          (ex: 20/1)
// Deprecated. Use CGMZ_Utils.createDateText instead. Please be aware of 
// changes to function arguments and usage
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.createDateText = function(day, month, year, format, delim) {
	switch(format) {
		case 0: return (month+1).toString() + delim + day.toString() + delim + year.toString();
		case 1: return day.toString() + delim + (month+1).toString() + delim + year.toString();
		case 2: return year.toString() + delim + (month+1).toString() + delim + day.toString();
		case 3: return this.getFullMonthName(month) + " " + day.toString() + ", " + year.toString();
		case 4: return day.toString() + " " + this.getFullMonthName(month) + " " + year.toString();
		case 5: return this.getShortMonthName(month) + " " + day.toString() + ", " + year.toString();
		case 6: return day.toString() + " " + this.getShortMonthName(month) + " " + year.toString();
		case 7: return (month+1).toString() + delim + day.toString();
		case 8: return day.toString() + delim + (month+1).toString();
	}
	this.reportError("createDateText: Out of range", "CGMZ Core");
	return "Unknown Date";
};
//-----------------------------------------------------------------------------
// Convert javascript getMonth int to full name of month string
// Deprecated. See CGMZ_Temp.createDateText for more info
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getFullMonthName = function(month) {
	switch(month) {
		case 0: return "January";
		case 1: return "February";
		case 2: return "March";
		case 3: return "April";
		case 4: return "May";
		case 5: return "June";
		case 6: return "July";
		case 7: return "August";
		case 8: return "September";
		case 9: return "October";
		case 10: return "November";
		case 11: return "December";
	}
	this.reportError("getFullMonthName: Out of range", "CGMZ Core");
	return "Unknown";
};
//-----------------------------------------------------------------------------
// Convert javascript getMonth int to abbreviated name of month string
// Deprecated. See CGMZ_Temp.createDateText for more info
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getShortMonthName = function(month) {
	switch(month) {
		case 0: return "Jan";
		case 1: return "Feb";
		case 2: return "Mar";
		case 3: return "Apr";
		case 4: return "May";
		case 5: return "Jun";
		case 6: return "Jul";
		case 7: return "Aug";
		case 8: return "Sep";
		case 9: return "Oct";
		case 10: return "Nov";
		case 11: return "Dec";
	}
	this.reportError("getShortMonthName: Out of range", "CGMZ Core", "Update CGMZ Plugins");
	return "Unknown";
};
//-----------------------------------------------------------------------------
// Look up item given type and id
// Deprecated. Use CGMZ_Utils.lookupItem instead.
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.lookupItem = function(type, id) {
	switch(type) {
		case 'item': return $dataItems[id];
		case 'weapon': return $dataWeapons[id];
		case 'armor': return $dataArmors[id];
	}
	this.reportError("Item type setup incorrectly", "CGMZ Core", "Check item parameters set up through CGMZ plugins");
	return null;
};
//-----------------------------------------------------------------------------
// Request a response from an API using fetch, and output response to custom
// function
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.requestResponse = function(url, func) {
	fetch(url).then(response => {
		if(response.status >= 200 && response.status < 300)
			return response.json();
		console.warn("Request error, received non-OK response: " + response.status);
	}).then(data => {
		func.call(this, data);
	}).catch((e) => { // JSON error
		console.warn('Error with response JSON: ', e);
	});
};
//-----------------------------------------------------------------------------
// Add listeners to window events
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.addWindowEventListeners = function() {
	const pf = { passive: false };
    document.addEventListener("mousedown", this.onAnyInput.bind(this));
    document.addEventListener("mousemove", this.onAnyInput.bind(this));
    document.addEventListener("mouseup", this.onAnyInput.bind(this));
    document.addEventListener("wheel", this.onAnyInput.bind(this), pf);
    document.addEventListener("touchstart", this.onAnyInput.bind(this), pf);
    document.addEventListener("touchmove", this.onAnyInput.bind(this), pf);
    document.addEventListener("touchend", this.onAnyInput.bind(this));
    document.addEventListener("touchcancel", this.onAnyInput.bind(this));
	document.addEventListener("keydown", this.onAnyInput.bind(this));
    document.addEventListener("keyup", this.onAnyInput.bind(this));
};
//-----------------------------------------------------------------------------
// Handler for any input detected
// event MAY be a gamepad, KeyboardEvent, MouseEvent, or TouchEvent
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.onAnyInput = function(event) {
	this.resetIdleTimer();
};
//-----------------------------------------------------------------------------
// Update the last used gamepad - called when gamepad input detected
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.updateLastGamepad = function(gamepad) {
	this._lastGamePadId = gamepad.id;
	this.onAnyInput(gamepad);
	this._lastInputType = "gamepad";
};
//-----------------------------------------------------------------------------
// Update gamepad release - called when no gamepad input detected
// This function will always be called even when there has been no gamepad
// input in a while
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.updateGamepadRelease = function(gamepad) {
	//
};
//-----------------------------------------------------------------------------
// Clear input
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.inputClear = function() {
	this._inputCurrentState = {};
};
//-----------------------------------------------------------------------------
// on key down
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.onKeyDown = function(event) {
	let key = event.key;
	if(key) {
		this._inputCurrentState[key] = true;
		this.refreshForKeysDown();
		this._lastInputType = "keyboard";
	}
};
//-----------------------------------------------------------------------------
// on key up
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.onKeyUp = function(event) {
	let key = event.key;
	if(key) {
		this._inputCurrentState[key] = false;
		this.refreshForKeysUp();
	}
};
//-----------------------------------------------------------------------------
// Refresh plugins on key down
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.refreshForKeysDown = function() {
	//Used by other plugins
};
//-----------------------------------------------------------------------------
// Refresh plugins on key up
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.refreshForKeysUp = function() {
	//Used by other plugins
};
//-----------------------------------------------------------------------------
// is Key Pressed?
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.isKeyPressed = function(key) {
	return this._inputCurrentState[key];
};
//-----------------------------------------------------------------------------
// Create mapped functions
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.createMappedFunctions = function() {
	this._mappedFunctions = {}
};
//-----------------------------------------------------------------------------
// Call a mapped function
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.callMappedFunctions = function(funcName, args) {
	func = this._mappedFunctions[funcName];
	if(func) {
		func.call(this, args);
	}
};
//-----------------------------------------------------------------------------
// Request a map animation
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.requestMapAnimation = function(imageData, x, y, frameWidth, frameHeight, animationSpeed, options = {}) {
	const request = {};
	request.bitmap = imageData;
	request.x = x;
	request.y = y;
	request.frameWidth = frameWidth;
	request.frameHeight = frameHeight;
	request.animationSpeed = animationSpeed;
	request.options = options;
	this._animationQueue.push(request);
};
//-----------------------------------------------------------------------------
// Retrieve a map animation request
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.retrieveMapAnimationRequest = function() {
	return this._animationQueue.shift();
};
//-----------------------------------------------------------------------------
// Save file to filesystem
// This will cause web hosted games to crash
// Deprecated. Use CGMZ_Utils.saveToLocalFile instead.
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.saveToLocalFile = function(folder, filename, ext, data, encoding = 'base64') {
    const dirPath = this.fileDirectoryPath(folder);
    const filePath = this.filePath(folder, filename, ext);
    const backupFilePath = filePath + "_";
    return new Promise((resolve, reject) => {
        this.fsMkdir(dirPath);
        this.fsUnlink(backupFilePath);
        this.fsRename(filePath, backupFilePath);
        try {
            this.fsWriteFile(filePath, data, encoding);
            this.fsUnlink(backupFilePath);
            resolve();
        } catch (e) {
            try {
                this.fsUnlink(filePath);
                this.fsRename(backupFilePath, filePath);
            } catch (e2) {
                //
            }
            reject(e);
        }
    });
};
//-----------------------------------------------------------------------------
// Get directory path
// This will cause web hosted games to crash
// Deprecated. Use CGMZ_Utils.fileDirectoryPath instead.
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.fileDirectoryPath = function(folder) {
    const path = require("path");
    const base = path.dirname(process.mainModule.filename);
    return path.join(base, folder);
};
//-----------------------------------------------------------------------------
// Get file path
// This will cause web hosted games to crash
// Deprecated. Use CGMZ_Utils.filePath instead.
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.filePath = function(folder, filename, ext) {
    const dir = this.fileDirectoryPath(folder);
    return dir + filename + ext;
};
//-----------------------------------------------------------------------------
// Make directory (if no exists)
// This will cause web hosted games to crash
// Deprecated. Use CGMZ_Utils.fsMkdir instead.
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.fsMkdir = function(path) {
    const fs = require("fs");
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
};
//-----------------------------------------------------------------------------
// Rename file if exists
// This will cause web hosted games to crash
// Deprecated. Use CGMZ_Utils.fsRename instead.
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.fsRename = function(oldPath, newPath) {
    const fs = require("fs");
    if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
    }
};
//-----------------------------------------------------------------------------
// Unlink file
// This will cause web hosted games to crash
// Deprecated. Use CGMZ_Utils.fsUnlink instead.
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.fsUnlink = function(path) {
    const fs = require("fs");
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
};
//-----------------------------------------------------------------------------
// Write file
// This will cause web hosted games to crash
// Deprecated. Use CGMZ_Utils.fsWriteFile instead.
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.fsWriteFile = function(path, data, encoding) {
    const fs = require("fs");
    fs.writeFileSync(path, data, encoding);
};
//=============================================================================
// CGMZ_Core
//-----------------------------------------------------------------------------
// This class contains some common methods for other CGMZ plugins.
//=============================================================================
function CGMZ_Core() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize CGMZ_Core
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initialize = function() {
	this._cgmzTimers = [];
	this.createPluginData();
};
//-----------------------------------------------------------------------------
// To be overridden by CGMZ plugins
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.createPluginData = function() {
	// Used by CGMZ plugins
};
//-----------------------------------------------------------------------------
// Check if anything needs to be done after a saved game is loaded
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.onAfterLoad = function() {
	if(!this._cgmzTimers) this._cgmzTimers = [];
	this.deleteAfterLoad();
	this.patchAfterLoad();
	this.createAfterLoad();
	// Used by CGMZ plugins
};
//-----------------------------------------------------------------------------
// Any deletions needed after load
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.deleteAfterLoad = function() {
	// Used by CGMZ plugins
};
//-----------------------------------------------------------------------------
// Any patches needed after load
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.patchAfterLoad = function() {
	// Used by CGMZ plugins
};
//-----------------------------------------------------------------------------
// Any new data needed after load
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.createAfterLoad = function() {
	// Used by CGMZ plugins
};
//-----------------------------------------------------------------------------
// Get earliest timer
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEarliestTimer = function() {
	if(this._cgmzTimers) return this._cgmzTimers[0];
	return null;
};
//-----------------------------------------------------------------------------
// Get all timers
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAllTimers = function() {
	return this._cgmzTimers;
};
//-----------------------------------------------------------------------------
// Get timer by id
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getTimerById = function(id) {
	return this._cgmzTimers.find(timer => timer._id === id);
};
//-----------------------------------------------------------------------------
// Request adding a timer, if valid will add the timer to the timer array
// sorted by each timer's frameCount
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.requestNewTimer = function(timer) {
	if(!timer) return;
	const existingTimer = this.getTimerById(timer._id);
	if(existingTimer) {
		existingTimer._frameCount = timer._frameCount;
	} else {
		this._cgmzTimers.push(timer);
	}
	this._cgmzTimers.sort((a, b) => (a._frameCount > b._frameCount) ? 1 : -1);
};
//-----------------------------------------------------------------------------
// Execute earliest timer
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.executeEarliestTimer = function() {
	timer = this._cgmzTimers.shift();
	if(timer) {
		$cgmzTemp.callMappedFunctions(timer._funcName, timer._args);
	}
};
//-----------------------------------------------------------------------------
// Execute timer by id
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.executeTimerById = function(id) {
	for(let i = 0; i < this._cgmzTimers.length; i++) {
		if(this._cgmzTimers[i]._id === id) {
			const removedTimer = this._cgmzTimers.splice(i, 1)[0];
			$cgmzTemp.callMappedFunctions(removedTimer._funcName, removedTimer._args);
			break;
		}
	}
};
//=============================================================================
// CGMZ_Timer
//-----------------------------------------------------------------------------
// Handles a timer (by frame count)
//=============================================================================
function CGMZ_Timer() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Reputation
//-----------------------------------------------------------------------------
CGMZ_Timer.prototype.initialize = function(frameCount, id, funcName, args = {}) {
	this._id = id;
	this._frameCount = Graphics.frameCount + frameCount;
	this._funcName = funcName;
	this._args = args;
};
//=============================================================================
// Game_Map
//-----------------------------------------------------------------------------
// Add function for getting map name (unique to CGMZ plugins)
//=============================================================================
//-----------------------------------------------------------------------------
// Get CGMZ map name
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_getMapName = function() {
    let name = "Unknown";
	if($dataMap && $dataMap.meta && $dataMap.meta.cgmzname) {
		name = $dataMap.meta.cgmzname;
	}
	return name;
};
//=============================================================================
// Game_System
//-----------------------------------------------------------------------------
// Add call to CGMZ_Core after load
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also check if CGMZ_Core needs to do anything after load
//-----------------------------------------------------------------------------
const alias_CGMZ_Core_GameSystem_onAfterLoad = Game_System.prototype.onAfterLoad;
Game_System.prototype.onAfterLoad = function() {
    alias_CGMZ_Core_GameSystem_onAfterLoad.call(this);
	$cgmz.onAfterLoad();
};
//=============================================================================
// DataManager
//-----------------------------------------------------------------------------
// Saving and loading CGMZ data. Also checks for out of date plugins
// modified functions: createGameObjects, makeSaveContents, extractSaveContents
// 					   setupNewGame
//=============================================================================
$cgmz = null;
$cgmzTemp = null;
//-----------------------------------------------------------------------------
// Initialize the $cgmz variable
//-----------------------------------------------------------------------------
const CGMZ_Core_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    CGMZ_Core_createGameObjects.call(this);
	$cgmz = new CGMZ_Core();
	$cgmzTemp = new CGMZ_Temp();
};
//-----------------------------------------------------------------------------
// Save CGMZ data
//-----------------------------------------------------------------------------
const CGMZ_Core_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    const contents = CGMZ_Core_makeSaveContents.call(this);
    contents.cgmz = $cgmz;
    return contents;
};
//-----------------------------------------------------------------------------
// Load CGMZ data
//-----------------------------------------------------------------------------
const CGMZ_Core_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    CGMZ_Core_extractSaveContents.call(this, contents);
	contents.cgmz ? $cgmz = contents.cgmz : console.warn("Could not load CGMZ data!");
};
//=============================================================================
// SceneManager
//-----------------------------------------------------------------------------
// Update CGMZ_Core every frame
// modified functions: updateMain
//=============================================================================
//-----------------------------------------------------------------------------
// Update CGMZ_Core
//-----------------------------------------------------------------------------
const alias_CGMZ_Core_SceneManager_updateMain = SceneManager.updateMain;
SceneManager.updateMain = function() {
	alias_CGMZ_Core_SceneManager_updateMain.call(this);
	if($cgmzTemp) $cgmzTemp.update();
};
//=============================================================================
// Scene_Boot
//-----------------------------------------------------------------------------
// Opens dev tools on startup if test play and plugin parameter is configured
//=============================================================================
//-----------------------------------------------------------------------------
// Also open dev tool console if user wishes
//-----------------------------------------------------------------------------
const alias_CGMZ_Core_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
    alias_CGMZ_Core_Scene_Boot_start.apply(this, arguments);
	if($gameTemp.isPlaytest() && CGMZ.Core.ShowDevTools) {
		SceneManager.showDevTools();
	}
	if($gameTemp.isPlaytest() && CGMZ.Core.ShowFPSCounter) {
		Graphics._switchFPSCounter();
	}
	if(CGMZ.Core.StartFullscreen) {
		Graphics._requestFullScreen();
	}
	if($gameTemp.isPlaytest() && CGMZ.Core.CheckForUpdates) {
		const url = 'https://www.caspergaming.com/api/public/cgmz/v2/versions/';
		$cgmzTemp.requestResponse(url, $cgmzTemp.checkCGMZPluginVersions);
	}
};
//=============================================================================
// CGMZ_Window_Scrollable
//-----------------------------------------------------------------------------
// Window used by CGMZ Scripts to allow for more info to be shown than would
// otherwise fit and also scroll automatically to show info.
// A mix between the default Window_Scrollable and Window_Selectable with the
// functionality of: handlers (selectable), vertical scrolling (scrollable).
//=============================================================================
function CGMZ_Window_Scrollable() {
    this.initialize(...arguments);
}
CGMZ_Window_Scrollable.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_Scrollable.prototype.constructor = CGMZ_Window_Scrollable;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.initialize = function(rect, heightMultiplier, scrollWait = 300, scrollSpeed = 1,
													   autoscroll = true, deceleration = 0.92) {
    Window_Base.prototype.initialize.call(this, rect);
	this._handlers = {};
	this._scroll = false;
	this._autoScroll = autoscroll;
	this._scrollTouching = false;
    this._scrollLastTouchY = 0;
    this._scrollAccelY = 0;
	this._scrollMode = 0; // 0 = down, 1 = up
	this._scrollTimer = 0;
	this._scrollWait = scrollWait;
	this._scrollSpeed = scrollSpeed;
	this._decelerationRate = deceleration;
    this._neededHeight = 0;
	this._windowHeight = rect.height;
	this._heightMultiplier = heightMultiplier;
	this.createContents();
};
//-----------------------------------------------------------------------------
// Get contents height
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.contentsHeight = function() {
	let height = this._windowHeight * this._heightMultiplier;
	if(height > $cgmzTemp.getMaxCanvasSize()) {
		height = $cgmzTemp.getMaxCanvasSize();
	}
	return height;
};
//-----------------------------------------------------------------------------
// If refresh is requested
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.requestRefresh = function() {
    this.refresh();
	this._neededHeight += $gameSystem.windowPadding()*2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Process Handling
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.processHandling = function() {
    if (this.isActive()) {
        if (this.isCancelEnabled() && (Input.isRepeated('cancel') || TouchInput.isCancelled())) {
            this.processCancel();
		}
    }
};
//-----------------------------------------------------------------------------
// Process Cancel
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.processCancel = function() {
    SoundManager.playCancel();
    this.updateInputData();
    this.deactivate();
    this.callCancelHandler();
};
//-----------------------------------------------------------------------------
// Update Input Data
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.updateInputData = function() {
    Input.update();
    TouchInput.update();
};
//-----------------------------------------------------------------------------
// Call Cancel Handler
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.callCancelHandler = function() {
    this.callHandler('cancel');
};
//-----------------------------------------------------------------------------
// Updates for scroll (if needed)
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.processHandling();
	this.updateArrows();
	if(this._scroll) {
		this.processArrowKeys();
		this.processWheel();
		this.processTouch();
		this.updateScrollAccel();
		if(this._autoScroll) {
			if(this._scrollTimer > this._scrollWait) {
				this.updateScroll();
			}
			this._scrollTimer += 1;
		}
    }
};
//-----------------------------------------------------------------------------
// Update the automatic scroll effect
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.updateArrows = function() {
	this.downArrowVisible = (this.origin.y + this._windowHeight < this._neededHeight && this._scroll);
    this.upArrowVisible = this.origin.y > 0;
};
//-----------------------------------------------------------------------------
// Update the automatic scroll effect
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.updateScroll = function() {
	if(this.origin.y + this._windowHeight >= this._neededHeight && this._scrollMode == 0) {
		this._scrollMode = 1; // Scroll up
		this._scrollTimer = 0;
	}
	else if(this.origin.y <= 0 && this._scrollMode == 1) {
		this._scrollMode = 0; // Scroll down
		this._scrollTimer = 0;
	}
	else {
		const speed = (this._scrollMode == 1) ? -this._scrollSpeed : this._scrollSpeed;
		this.processScroll(speed);
	}
};
//-----------------------------------------------------------------------------
// Process Arrow Key Input
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.processArrowKeys = function() {
    if(this.isActive()) {
        if(Input.isPressed('down')) {
            this.processScroll(this._scrollSpeed*5);
			this._scrollTimer = 0;
        }
        if(Input.isPressed('up')) {
            this.processScroll(-this._scrollSpeed*5);
			this._scrollTimer = 0;
        }
    }
};
//-----------------------------------------------------------------------------
// Process Wheel Input
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.processWheel = function() {
    if (this.isActive()) {
        const threshold = 20;
        if (TouchInput.wheelY >= threshold) {
            this.processScroll(this._scrollSpeed*20);
			this._scrollTimer = 0;
        }
        if (TouchInput.wheelY <= -threshold) {
            this.processScroll(-this._scrollSpeed*20);
			this._scrollTimer = 0;
        }
    }
};
//-----------------------------------------------------------------------------
// Process Touch Scrolling
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.processTouch = function() {
    if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
        this.onTouchScrollStart();
    }
    if (this._scrollTouching) {
		this._scrollTimer = 0;
        if (TouchInput.isReleased()) {
            this.onTouchScrollEnd();
        } else if (TouchInput.isMoved()) {
            this.onTouchScroll();
        }
    }
};
//-----------------------------------------------------------------------------
// Determine if window has been touched inside the window frame
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.isTouchedInsideFrame = function() {
    const touchPos = new Point(TouchInput.x, TouchInput.y);
    const localPos = this.worldTransform.applyInverse(touchPos);
    return this.innerRect.contains(localPos.x, localPos.y);
};
//-----------------------------------------------------------------------------
// Processing for when window is touched
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.onTouchScrollStart = function() {
    this._scrollTouching = true;
    this._scrollLastTouchY = TouchInput.y;
    this.setScrollAccel(0, 0);
};
//-----------------------------------------------------------------------------
// Handling for current scroll via touch
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.onTouchScroll = function() {
    const accelY = this._scrollLastTouchY - TouchInput.y;
    this.setScrollAccel(accelY);
    this._scrollLastTouchY = TouchInput.y;
};
//-----------------------------------------------------------------------------
// Processing for letting go of touch scroll
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.onTouchScrollEnd = function() {
    this._scrollTouching = false;
};
//-----------------------------------------------------------------------------
// Update Scroll Acceleration
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.updateScrollAccel = function() {
    if(this._scrollAccelY !== 0) {
        this.processScroll(this._scrollAccelY);
        this._scrollAccelY *= this.getDecelerationRate();
        if(Math.abs(this._scrollAccelY) < 1) {
            this._scrollAccelY = 0;
        }
    }
};
//-----------------------------------------------------------------------------
// Get deceleration rate
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.getDecelerationRate = function() {
    return this._decelerationRate;
};
//-----------------------------------------------------------------------------
// Set x and y acceleration for scrolling
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.setScrollAccel = function(y) {
    this._scrollAccelY = y;
};
//-----------------------------------------------------------------------------
// Process scrolling
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.processScroll = function(scrollAmount) {
	if(this.origin.y + this._windowHeight + scrollAmount > this._neededHeight) {
		this.origin.y = this._neededHeight - this._windowHeight;
	}
	else if(this.origin.y + scrollAmount < 0) {
		this.origin.y = 0;
	}
	else {
		this._scrollMode = (scrollAmount < 0) ? 1 : 0;
		this.origin.y += scrollAmount;
	}
};
//-----------------------------------------------------------------------------
// Check if needs to scroll (might change after drawing contents because bitmap)
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.checkForScroll = function() {
	if(this._neededHeight > this._windowHeight) {
		this._scroll = true;
	}
};
//-----------------------------------------------------------------------------
// Reset variables for new object
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.setupWindowForNewEntry = function() {
	this.origin.y = 0;
	this._scrollTimer = 0;
	this._scrollMode = 0;
	this._neededHeight = 0;
    this._scrollLastTouchY = 0;
    this._scrollAccelY = 0;
	this._scroll = false;
	this._scrollTouching = false;
	this.contents.clear();
};
//-----------------------------------------------------------------------------
// Check if window is active
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.isActive = function() {
	return this.active;
};
//-----------------------------------------------------------------------------
// Set Handler same as Window_Selectable
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.setHandler = function(symbol, method) {
    this._handlers[symbol] = method;
};
//-----------------------------------------------------------------------------
// check if is handled same as Window_Selectable
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.isHandled = function(symbol) {
    return !!this._handlers[symbol];
};
//-----------------------------------------------------------------------------
// Call Handler same as Window_Selectable
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.callHandler = function(symbol) {
    if (this.isHandled(symbol)) {
        this._handlers[symbol]();
    }
};
//-----------------------------------------------------------------------------
// Check if cancel handling exists
//-----------------------------------------------------------------------------
CGMZ_Window_Scrollable.prototype.isCancelEnabled = function() {
    return this.isHandled('cancel');
};
//=============================================================================
// CGMZ_Window_HorzScrollable
//-----------------------------------------------------------------------------
// Window that inherits from CGMZ_Window_Scrollable with the difference that it
// allows horizontal scrolling instead of vertical scrolling.
//=============================================================================
function CGMZ_Window_HorzScrollable() {
    this.initialize(...arguments);
}
CGMZ_Window_HorzScrollable.prototype = Object.create(CGMZ_Window_Scrollable.prototype);
CGMZ_Window_HorzScrollable.prototype.constructor = CGMZ_Window_HorzScrollable;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.initialize = function(rect, widthMultiplier, scrollWait = 300, scrollSpeed = 1,
													   autoscroll = true, deceleration = 0.92) {
    CGMZ_Window_Scrollable.prototype.initialize.call(this, rect, 1, scrollWait, scrollSpeed, autoscroll, deceleration);
    this._scrollLastTouchX = 0;
    this._scrollAccelX = 0;
    this._neededWidth = 0;
	this._windowWidth = rect.width;
	this._widthMultiplier = widthMultiplier;
	this.createContents();
};
//-----------------------------------------------------------------------------
// Get contents width
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.contentsWidth = function() {
	let width = this._windowWidth * this._widthMultiplier;
	if(width > $cgmzTemp.getMaxCanvasSize()) {
		width = $cgmzTemp.getMaxCanvasSize();
	}
	return width;
};
//-----------------------------------------------------------------------------
// If refresh is requested
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.requestRefresh = function() {
    this.refresh();
	this._neededWidth += $gameSystem.windowPadding()*2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Update the automatic scroll effect
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.updateArrows = function() {
	this.downArrowVisible = (this.origin.x + this._windowWidth < this._neededWidth && this._scroll);
    this.upArrowVisible = this.origin.x > 0;
};
//-----------------------------------------------------------------------------
// Update the automatic scroll effect
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.updateScroll = function() {
	if(this.origin.x + this._windowWidth >= this._neededWidth && this._scrollMode == 0) {
		this._scrollMode = 1; // Scroll left
		this._scrollTimer = 0;
	}
	else if(this.origin.x <= 0 && this._scrollMode == 1) {
		this._scrollMode = 0; // Scroll right
		this._scrollTimer = 0;
	}
	else {
		const speed = (this._scrollMode == 1) ? -this._scrollSpeed : this._scrollSpeed;
		this.processScroll(speed);
	}
};
//-----------------------------------------------------------------------------
// Process Arrow Key Input
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.processArrowKeys = function() {
    if(this.isActive()) {
        if(Input.isPressed('right')) {
            this.processScroll(this._scrollSpeed*5);
			this._scrollTimer = 0;
        }
        if(Input.isPressed('left')) {
            this.processScroll(-this._scrollSpeed*5);
			this._scrollTimer = 0;
        }
    }
};
//-----------------------------------------------------------------------------
// Processing for when window is touched
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.onTouchScrollStart = function() {
    this._scrollTouching = true;
    this._scrollLastTouchX = TouchInput.x;
    this.setScrollAccel(0);
};
//-----------------------------------------------------------------------------
// Handling for current scroll via touch
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.onTouchScroll = function() {
    const accelX = this._scrollLastTouchX - TouchInput.x;
    this.setScrollAccel(accelX);
    this._scrollLastTouchX = TouchInput.x;
};
//-----------------------------------------------------------------------------
// Update Scroll Acceleration
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.updateScrollAccel = function() {
    if(this._scrollAccelX !== 0) {
        this.processScroll(this._scrollAccelX);
        this._scrollAccelX *= this.getDecelerationRate();
        if(Math.abs(this._scrollAccelX) < 1) {
            this._scrollAccelX = 0;
        }
    }
};
//-----------------------------------------------------------------------------
// Set x acceleration for scrolling
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.setScrollAccel = function(x) {
    this._scrollAccelX = x;
};
//-----------------------------------------------------------------------------
// Process scrolling
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.processScroll = function(scrollAmount) {
	if(this.origin.x + this._windowWidth + scrollAmount > this._neededWidth) {
		this.origin.x = this._neededWidth - this._windowWidth;
	}
	else if(this.origin.x + scrollAmount < 0) {
		this.origin.x = 0;
	}
	else {
		this._scrollMode = (scrollAmount < 0) ? 1 : 0;
		this.origin.x += scrollAmount;
	}
};
//-----------------------------------------------------------------------------
// Check if needs to scroll (might change after drawing contents because bitmap)
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.checkForScroll = function() {
	if(this._neededWidth > this._windowWidth) {
		this._scroll = true;
	}
};
//-----------------------------------------------------------------------------
// Reset variables for new object
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype.setupWindowForNewEntry = function() {
	this.origin.x = 0;
	this._scrollTimer = 0;
	this._scrollMode = 0;
	this._neededWidth = 0;
    this._scrollLastTouchX = 0;
    this._scrollAccelX = 0;
	this._scroll = false;
	this._scrollTouching = false;
	this.contents.clear();
};
//-----------------------------------------------------------------------------
// Refresh "up" (left) and "down" (right) arrows
// Note: variable names not changed to reuse inherited code.
//-----------------------------------------------------------------------------
CGMZ_Window_HorzScrollable.prototype._refreshArrows = function() {
    const w = this._width;
    const h = this._height;
    const p = 24;
    const q = p / 2;
    const sx = 96 + p;
    const sy = 0 + p;
    this._downArrowSprite.bitmap = this._windowskin;
    this._downArrowSprite.anchor.x = 0.5;
    this._downArrowSprite.anchor.y = 0.5;
	this._downArrowSprite.setFrame(sx + p + q, sy + q, q, p);
    this._downArrowSprite.move(w - q, h / 2);
    this._upArrowSprite.bitmap = this._windowskin;
    this._upArrowSprite.anchor.x = 0.5;
    this._upArrowSprite.anchor.y = 0.5;
	this._upArrowSprite.setFrame(sx, sy + q, q, p);
    this._upArrowSprite.move(q, h / 2);
};
//=============================================================================
// CGMZ_Window_Selectable
//-----------------------------------------------------------------------------
// Window used by CGMZ Scripts to allow for categories within a selectable
// window which are expandable/minimizable. It also allows each item to
// define its own width/height, which may vary per item.
//=============================================================================
function CGMZ_Window_Selectable() {
    this.initialize(...arguments);
}
CGMZ_Window_Selectable.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_Selectable.prototype.constructor = CGMZ_Window_Selectable;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
	this._category = null;
	this._data = [];
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.item = function() {
	if(this._data && this.index() >= 0) return this._data[this.index()];
	return null;
};
//-----------------------------------------------------------------------------
// Level Adjustment for width / x offset
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.levelAdjustment = function(level) {
	return level * 8;
};
//-----------------------------------------------------------------------------
// Change width by index
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.itemWidth = function(index) {
	if(this._data[index] && this._data[index].hasOwnProperty("width")) {
		return this._data[index].width;
	}
	if(this._data[index] && this._data[index].hasOwnProperty("level")) {
		return Window_Selectable.prototype.itemWidth.call(this) - this.levelAdjustment(this._data[index].level);
	}
    return Window_Selectable.prototype.itemWidth.call(this);
};
//-----------------------------------------------------------------------------
// Change height by index
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.itemHeight = function(index = -1) {
	if(index >= 0 && this._data && this._data[index] && this._data[index].hasOwnProperty("height")) {
		return this._data[index].height;
	}
	if(index >= 0 && this._data && this._data[index] && this._data[index].hasOwnProperty("heightMultiplier")) {
		return Window_Scrollable.prototype.itemHeight.call(this) * this._data[index].heightMultiplier + 8;
	}
    return Window_Scrollable.prototype.itemHeight.call(this) + 8;
};
//-----------------------------------------------------------------------------
// Get item height of previous entries
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.itemHeightOfIndex = function(index) {
	let height = 0;
	for(i = 0; i < index; i++) {
		height += this.itemHeight(i);
	}
	return height;
};
//-----------------------------------------------------------------------------
// Get contents height
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.contentsHeight = function() {
    return this.innerHeight + this.itemHeight() * 2;
};
//-----------------------------------------------------------------------------
// Get overall height
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.overallHeight = function() {
    return this.itemHeightOfIndex(this.maxItems());
};
//-----------------------------------------------------------------------------
// Get top row
// TODO: Make this better, right now kind of hackish
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.topRow = function() {
	return Math.max(0, (Math.floor(this.scrollY() / this.itemHeight()) - 5));
};
//-----------------------------------------------------------------------------
// Get item rect
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.itemRect = function(index) {
	const level = (this._data && this._data[index] && this._data[index].hasOwnProperty('level')) ? this._data[index].level : 0;
    const maxCols = this.maxCols();
    const itemWidth = this.itemWidth(index);
    const itemHeight = this.itemHeight(index);
    const colSpacing = this.colSpacing();
    const rowSpacing = this.rowSpacing();
    const col = index % maxCols;
    const row = Math.floor(index / maxCols);
    const x = (col * itemWidth + colSpacing / 2 - this.scrollBaseX()) + this.levelAdjustment(level);
    const y = this.itemHeightOfIndex(index) + rowSpacing / 2 - this.scrollBaseY();
    const width = itemWidth - colSpacing;
    const height = itemHeight - rowSpacing;
    return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Ensure Cursor is Visible
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.ensureCursorVisible = function(smooth) {
    if (this._cursorAll) {
        this.scrollTo(0, 0);
    } else if (this.innerHeight > 0 && this.row() >= 0) {
        const scrollY = this.scrollY();
        const itemTop = this.itemHeightOfIndex(this.index());
        const itemBottom = itemTop + this.itemHeight(this.index());
        const scrollMin = itemBottom - this.innerHeight;
        if (scrollY > itemTop) {
            if (smooth) {
                this.smoothScrollTo(0, itemTop);
            } else {
                this.scrollTo(0, itemTop);
            }
        } else if (scrollY < scrollMin) {
            if (smooth) {
                this.smoothScrollTo(0, scrollMin);
            } else {
                this.scrollTo(0, scrollMin);
            }
        }
    }
};
//-----------------------------------------------------------------------------
// Pass index to drawing background rect for color differentiation
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.drawItemBackground = function(index) {
    const rect = this.itemRect(index);
    this.drawBackgroundRect(rect, index);
};
//-----------------------------------------------------------------------------
// Look for color property on index
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.drawBackgroundRect = function(rect, index) {
	const item = this.getPreviousCategoryItem(index);
	this.setNewCategory(item);
	if(!this._category) {
		Window_Selectable.prototype.drawBackgroundRect.call(this, rect);
		return;
	}
    const c1 = this._category._color1;
    const c2 = this._category._color2;
    const x = rect.x;
    const y = rect.y;
    const w = rect.width;
    const h = rect.height;
    this.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);
    this.contentsBack.strokeRect(x, y, w, h, c1);
};
//-----------------------------------------------------------------------------
// Get the closest category with index smaller than current index
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.getPreviousCategoryItem = function(index) {
    for(let i = index; i >= 0; i--) {
		const item = this._data[i];
		if(item && item.isCategory) {
			return item;
		}
	}
	return null;
};
//-----------------------------------------------------------------------------
// Get the closest category with index smaller than current index
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.processOk = function() {
	const item = this.item();
	if(item && item.isCategory) {
		this.handleCategorySelection(item);
		this.playOkSound();
	} else {
		Window_Selectable.prototype.processOk.call(this);
	}
};
//-----------------------------------------------------------------------------
// Set new category. Used by individual instances to set category.
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.setNewCategory = function(item) {
    this._category = item;
};
//-----------------------------------------------------------------------------
// Handling for when category is selected and OK press occurs
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.handleCategorySelection = function(item) {
    // Used by plugins to minimize / expand category
};
//-----------------------------------------------------------------------------
// Always handle OK
//-----------------------------------------------------------------------------
CGMZ_Window_Selectable.prototype.isOkEnabled = function() {
    return true;
};
//=============================================================================
// Window_Base
//-----------------------------------------------------------------------------
// Adding functions for CGMZ Windows. Drawing gauges and text processing
//=============================================================================
//-----------------------------------------------------------------------------
// Use bitmap gauge - don't always need full sprite gauge
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawGauge = function(rect, rate, color1, color2, color0 = ColorManager.gaugeBackColor()) {
	const fillW = Math.floor((rect.width - 2) * rate);
    const fillH = rect.height - 2;
	this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color0);
    this.contents.gradientFillRect(rect.x + 1, rect.y + 1, fillW, fillH, color1, color2);
};
//-----------------------------------------------------------------------------
// Draw Header
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawHeader = function(header, y, color1 = 1, color2 = 0) {
	const textWidth = this.textWidth(header);
	const divWidth = this.contents.width / 2 - textWidth / 2 - $gameSystem.windowPadding() * 2;
	const rect1 = new Rectangle($gameSystem.windowPadding(), y + this.lineHeight() / 2, divWidth, 2);
	const rect2 = new Rectangle(this.contents.width / 2 + textWidth / 2 + $gameSystem.windowPadding(), y + this.lineHeight() / 2, divWidth, 2);
	this.CGMZ_drawDivider(rect1, ColorManager.textColor(color1), ColorManager.textColor(color2));
	this.CGMZ_drawDivider(rect2, ColorManager.textColor(color2), ColorManager.textColor(color1));
	this.drawText(header, 0, y, this.contents.width, 'center');
};
//-----------------------------------------------------------------------------
// Draw a divider / hr
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawDivider = function(rect, color1 = ColorManager.gaugeBackColor(), color2 = ColorManager.gaugeBackColor()) {
    this.contents.gradientFillRect(rect.x, rect.y, rect.width, rect.height, color1, color2);
};
//-----------------------------------------------------------------------------
// Draw a semi-transparent background rectangle
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawBackgroundRectangle = function(rect, color = "rgba(32, 32, 32, 0.5)") {
    this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
};
//-----------------------------------------------------------------------------
// Draw a background rectangle with a gradient
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawBackgroundGradientRectangle = function(rect, c1 = ColorManager.itemBackColor1(), c2 = ColorManager.itemBackColor2(), vertical = true) {
    const x = rect.x;
    const y = rect.y;
    const w = rect.width;
    const h = rect.height;
    this.contents.gradientFillRect(x, y, w, h, c1, c2, vertical);
    this.contents.strokeRect(x, y, w, h, c1);
};
//-----------------------------------------------------------------------------
// Draw a checkbox
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawCheckbox = function(rect, checked, lineWidth = 2, color = "rgba(255, 255, 255, 1)", color2 = "rgba(255, 255, 255, 1)") {
    this.contents.CGMZ_strokeRect(rect.x, rect.y, rect.width, rect.height, color, lineWidth);
	if(checked) {
		const point0 = new Point(rect.x + rect.width * .3, rect.y + (rect.height * .6));
		const point1 = new Point(rect.x + (rect.width / 2), rect.y + rect.height - (rect.height * .2));
		const point2 = new Point(rect.x + rect.width * .8, rect.y + rect.height * .2);
		this.contents.CGMZ_strokeLinePath([point0, point1, point2], color2, lineWidth);
	}
};
//-----------------------------------------------------------------------------
// Draw a radio input
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawRadio = function(point, radius, checked, lineWidth = 2, color = "rgba(255, 255, 255, 1)", color2 = "rgba(255, 255, 255, 1)") {
    this.contents.CGMZ_strokeCircle(point.x, point.y, radius, color, lineWidth, true);
	if(checked) {
		this.contents.drawCircle(point.x, point.y, radius - (lineWidth / 2) - (radius * .2), color2);
	}
};
//-----------------------------------------------------------------------------
// Draw a toggle switch
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawToggleSwitch = function(rect, checked, onText, offText, lineWidth = 2, color = "rgba(255, 255, 255, 1)", color2 = "rgba(255, 255, 255, 1)") {
	const radius = rect.height / 2;
	this.contents.CGMZ_strokeCurvedRectangle(rect, radius, color, lineWidth);
	if(checked) {
		this.contents.drawCircle((rect.x + rect.width) - radius, rect.y + radius, radius - (lineWidth / 2) - (radius * .2), color2);
		this.contents.drawText(onText, rect.x, rect.y + 2, rect.width - (radius * 2), rect.height - 4, 'center');
	} else {
		this.contents.drawCircle(rect.x + radius, rect.y + radius, radius - (lineWidth / 2) - (radius * .2), color2);
		this.contents.drawText(offText, rect.x + radius * 2, rect.y + 2, rect.width - (radius * 2), rect.height - 4, 'center');
	}
};
//-----------------------------------------------------------------------------
// Draw a triangle
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawTriangle = function(rect, fill, lineWidth = 2, color = "rgba(255, 255, 255, 1)") {
	const point0 = new Point(rect.x + rect.width / 2, rect.y);
	const point1 = new Point(rect.x, rect.y + rect.height);
	const point2 = new Point(rect.x + rect.width, rect.y + rect.height);
	const points = [point0, point1, point2, point0];
	if(fill) {
		this.contents.CGMZ_fillLinePath(points, color, lineWidth);
	} else {
		this.contents.CGMZ_strokeLinePath(points, color, lineWidth);
	}
};
//-----------------------------------------------------------------------------
// Draw a pentagon/hexagon/septagon/octagon. Can draw N-gon with more than 8
// sides, but bottom side will not be horizontal/flat. 5/7/8 side shapes have
// a shift to get them to align. Will need to create a more generic formula to
// draw an aligned N-gon of any side in the future
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawShape = function(rect, fill, numSides, lineWidth = 2, color = "rgba(255, 255, 255, 1)") {
	const size = rect.width / 2;
	const xCenter = rect.x + rect.width / 2;
	const yCenter = rect.y + rect.height / 2;
	const step = 2 * Math.PI / numSides;
	const shift = (numSides === 5) ? (Math.PI / 180.0) * -18 : (numSides === 7) ? (Math.PI / 180) * 12 : (numSides === 8) ? (Math.PI / 180) * 21 : 0;
	const points = [];
	for (let i = 0; i <= numSides; i++) {
    	const curStep = i * step + shift;
		points.push(new Point(xCenter + size * Math.cos(curStep), yCenter + size * Math.sin(curStep)));
    }
	if(fill) {
		this.contents.CGMZ_fillLinePath(points, color, lineWidth);
	} else {
		this.contents.CGMZ_strokeLinePath(points, color, lineWidth);
	}
};
//-----------------------------------------------------------------------------
// Draw a character with specific frame in step animation,
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawCharacter = function(
    characterName, characterIndex, x, y, frameXOffset = 0, frameYOffset = 0
) {
    const bitmap = ImageManager.loadCharacter(characterName);
    const big = ImageManager.isBigCharacter(characterName);
    const pw = bitmap.width / (big ? 3 : 12);
    const ph = bitmap.height / (big ? 4 : 8);
    const n = big ? 0: characterIndex;
    const sx = (((n % 4) * 3 + 1) * pw) + (pw * frameXOffset);
    const sy = (Math.floor(n / 4) * 4 * ph) + (ph * frameYOffset);
    this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);
};
//-----------------------------------------------------------------------------
// Draw a string of text with text codes and word wrapping.
// It can also handle a first-line offset.
// Returns the overall output height
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawText = function(string, x, firstLineX, y, width, alignment = "left") {
	this.resetFontSettings();
    const textState = this.createTextState(string, x, y, width);
	textState.drawing = false;
	textState.x = firstLineX;
	textState.lastSpaceIndex = 0;
	let additionalWidth = 0;
	while (textState.index < textState.text.length) {
		const c = textState.text[textState.index++];
		let neededWidth = additionalWidth + this.textWidth(textState.buffer) + this.CGMZ_textSizeEx(c).width * (c !== ' ');
		if(neededWidth > width && textState.lastSpaceIndex > 0) {
			textState.text = textState.text.substring(0, textState.lastSpaceIndex) + '\n' + textState.text.substring(textState.lastSpaceIndex + 1);
			textState.x = x;
			additionalWidth = 0;
		}
		if (c.charCodeAt(0) < 0x20) {
			this.flushTextState(textState);
			this.processControlCharacter(textState, c);
			additionalWidth = textState.x - x;
		} else if(c === " ") {
			textState.buffer += c;
			this.flushTextState(textState);
			textState.lastSpaceIndex = textState.index - 1;
			additionalWidth = textState.x - x;
		} else {
			textState.buffer += c;
		}
	}
	switch(alignment) {
		case "left":
			const textState2 = this.createTextState(textState.text, x, y, width);
			textState2.x = firstLineX;
			this.processAllText(textState2);
			return textState2.outputHeight;
		case "center":
		case "right":
			let totalHeight = 0;
			let firstLine = true;
			const lines = textState.text.split("\n");
			for(line of lines) {
				const textState2 = this.createTextState(line, x, y + totalHeight, width);
				const color = this.contents.textColor;
				const fs = this.contents.fontSize;
				const textWidth = this.CGMZ_textSizeEx(line).width;
				this.contents.textColor = color;
				this.contents.fontSize = fs;
				if(alignment === "right") textState2.x = width + textState2.x - textWidth;
				if(alignment === "center") textState2.x += (width - textWidth) / 2;
				if(firstLine && (firstLineX > textState2.x)) textState2.x = firstLineX;
				firstLine = false;
				this.processAllText(textState2);
				totalHeight += textState2.outputHeight;
			}
			return totalHeight;
	}
	return 0;
};
//-----------------------------------------------------------------------------
// Draw one line of string of text with any character codes.
// Use of \n here will cause visual issues.
// This function will adjust the horizontal size of the text to fit the width provided.
// Returns the output height of the line drawn
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawTextLine = function(string, x, y, width, alignment = "left") {
	const textWidth = this.CGMZ_textSizeEx(string).width;
	let scale = 1;
	if(textWidth > width) {
		scale = width/textWidth;
	}
	this.contents.context.save();
	this.contents.context.scale(scale, 1);
	const outputHeight = this.CGMZ_drawTextLineNoResize(string, x, y, width, alignment, scale);
	this.contents.context.restore();
	return outputHeight;
};
//-----------------------------------------------------------------------------
// Draw one line of string of text with any character codes.
// While \n IS supported, it is not recommended for this function since it assumes only one line will be drawn
// It can also handle an x offset.
// Returns the output height of the line drawn
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawTextLineNoResize = function(string, x, y, width, alignment = "left", scale = 1) {
	const textState = this.createTextState(string, x, y, width);
	const textWidth = this.CGMZ_textSizeEx(string).width;
	switch(alignment) {
		case "left": 
			if(scale < 1) {
				textState.x = x * (1/scale);
				if(textState.x < 0) textState.x = 0;
			}
			break;
		case "center":
			textState.x = width + textState.x - textWidth;
			textState.x = (textState.x / 2) + (x / 2);
			break;
		case "right":
			textState.x = width + textState.x - textWidth;
	}
	if(textState.x < x) {
		textState.x = x;
		if(scale < 1) {
			textState.x = x * (1/scale);
		}
	}
	this.processAllText(textState);
	return textState.outputHeight;
};
//-----------------------------------------------------------------------------
// Get the size of the text without resetting font settings
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_textSizeEx = function(text) {
    const textState = this.createTextState(text, 0, 0, 0);
    textState.drawing = false;
    this.processAllText(textState);
    return { width: textState.outputWidth, height: textState.outputHeight };
};
//=============================================================================
// Spriteset_Map
//-----------------------------------------------------------------------------
// Add cgmz animations
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also init cgmz animation array
//-----------------------------------------------------------------------------
const alias_CGMZ_Core_Spriteset_Map_initialize = Spriteset_Map.prototype.initialize;
Spriteset_Map.prototype.initialize = function() {
    alias_CGMZ_Core_Spriteset_Map_initialize.call(this);
    this._cgmzAnimations = [];
};
//-----------------------------------------------------------------------------
// Alias. Also Update cgmz animations
//-----------------------------------------------------------------------------
const alias_CGMZ_Core_Spriteset_Map_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function() {
    alias_CGMZ_Core_Spriteset_Map_update.call(this);
    this.updateCGMZAnimations();
};
//-----------------------------------------------------------------------------
// Alias. Also remove all cgmz animations
//-----------------------------------------------------------------------------
const alias_CGMZ_Core_Spriteset_Map_destroy = Spriteset_Map.prototype.destroy;
Spriteset_Map.prototype.destroy = function(options) {
    this.removeAllCGMZAnimations();
    alias_CGMZ_Core_Spriteset_Map_destroy.call(this, options);
};
//-----------------------------------------------------------------------------
// Update cgmz animations
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.updateCGMZAnimations = function() {
    for(const sprite of this._cgmzAnimations) {
        if (!sprite.isPlaying()) {
            this.removeCGMZAnimation(sprite);
        }
    }
    this.processCGMZAnimationRequests();
};
//-----------------------------------------------------------------------------
// Process new animation requests
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.processCGMZAnimationRequests = function() {
    for(;;) {
        const request = $cgmzTemp.retrieveMapAnimationRequest();
        if (request) {
            this.createCGMZAnimation(request);
        } else {
            break;
        }
    }
};
//-----------------------------------------------------------------------------
// Create a new CGMZ animation
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.createCGMZAnimation = function(request) {
	const sprite = new Sprite_CGMZ_MapAnimation(request);
	this._effectsContainer.addChild(sprite);
	this._cgmzAnimations.push(sprite);
};
//-----------------------------------------------------------------------------
// Remove a CGMZ animation
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.removeCGMZAnimation = function(sprite) {
    this._cgmzAnimations.remove(sprite);
    this._effectsContainer.removeChild(sprite);
    sprite.destroy();
};
//-----------------------------------------------------------------------------
// Remove all CGMZ animations
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.removeAllCGMZAnimations = function() {
    for(const sprite of this._cgmzAnimations.clone()) {
        this.removeCGMZAnimation(sprite);
    }
};
//=============================================================================
// Sprite_CGMZ_MapAnimation
//-----------------------------------------------------------------------------
// Sprite class for basic map animations
//=============================================================================
function Sprite_CGMZ_MapAnimation() {
    this.initialize(...arguments);
}
Sprite_CGMZ_MapAnimation.prototype = Object.create(Sprite.prototype);
Sprite_CGMZ_MapAnimation.prototype.constructor = Sprite_CGMZ_MapAnimation;
//-----------------------------------------------------------------------------
// Initialize the sprite
// request should have:
// bitmap - Object with folder and filename properties to load the image with
// x - x coordinate (tile) of animation center
// y - y coordinate (tile) of animation center
// frameWidth - width of 1 animation cell
// frameHeight - height of 1 animation cell
// animationSpeed - how many frames to wait before swapping animation cells
// options - custom options to alter sprite behavior
//-----------------------------------------------------------------------------
Sprite_CGMZ_MapAnimation.prototype.initialize = function(request) {
    Sprite.prototype.initialize.call(this);
	this._isPlaying = true;
	this._needsUpdate = false;
	this._waitCounter = 0;
	this._currentFrame = 0;
	this._maxFrames = 0;
	this.anchor.x = 0.5;
    this.anchor.y = 0.5;
	this._request = request;
	this.startBitmapLoad(request.bitmap);
};
//-----------------------------------------------------------------------------
// Start loading the bitmap
//-----------------------------------------------------------------------------
Sprite_CGMZ_MapAnimation.prototype.startBitmapLoad = function(bitmap) {
	this._bitmap = ImageManager.loadBitmap(bitmap.folder, bitmap.filename);
	this._bitmap.addLoadListener(this.onImageLoaded.bind(this));
};
//-----------------------------------------------------------------------------
// After bitmap is loaded
//-----------------------------------------------------------------------------
Sprite_CGMZ_MapAnimation.prototype.onImageLoaded = function() {
	this.calculateMaxFrames();
	this._needsUpdate = true;
	const pw = this._request.frameWidth;
	const ph = this._request.frameHeight;
	const sx = 0;
	const sy = 0;
    this.setFrame(sx, sy, pw, ph);
};
//-----------------------------------------------------------------------------
// Calculate max amount of frames
//-----------------------------------------------------------------------------
Sprite_CGMZ_MapAnimation.prototype.calculateMaxFrames = function() {
	this._maxFrames = Math.floor(this._bitmap.width / this._request.frameWidth);
};
//-----------------------------------------------------------------------------
// Check if sprite is still playing
//-----------------------------------------------------------------------------
Sprite_CGMZ_MapAnimation.prototype.isPlaying = function() {
	return this._isPlaying;
};
//-----------------------------------------------------------------------------
// Update sprite
//-----------------------------------------------------------------------------
Sprite_CGMZ_MapAnimation.prototype.update = function() {
    Sprite.prototype.update.call(this);
	if(this._needsUpdate) {
		this.updateFrame();
		this.updatePosition();
	}
};
//-----------------------------------------------------------------------------
// Update frame of animation
//-----------------------------------------------------------------------------
Sprite_CGMZ_MapAnimation.prototype.updateFrame = function() {
	this._waitCounter++;
	if(this._waitCounter > this._request.animationSpeed) {
		if(this._currentFrame + 1 > this._maxFrames) {
			this._isPlaying = false;
			return;
		}
		this._waitCounter = 0;
		this._currentFrame++;
		const pw = this._request.frameWidth;
		const ph = this._request.frameHeight;
		const sx = this._currentFrame * pw;
		const sy = 0;
        this.setFrame(sx, sy, pw, ph);
	}
};
//-----------------------------------------------------------------------------
// Update position of sprite on screen
//-----------------------------------------------------------------------------
Sprite_CGMZ_MapAnimation.prototype.updatePosition = function() {
	const tw = $gameMap.tileWidth();
	const th = $gameMap.tileHeight();
	this.x = Math.floor($gameMap.adjustX(this._request.x) * tw + tw / 2);
    this.y = Math.floor($gameMap.adjustY(this._request.y) * th + th / 2);
};
//=============================================================================
// Input
//-----------------------------------------------------------------------------
// Pass input keycodes to CGMZ Temp
//=============================================================================
//-----------------------------------------------------------------------------
// Pass Inputs to CGMZ Temp
//-----------------------------------------------------------------------------
const CGMZ_Core_Input_onKeyDown = Input._onKeyDown;
Input._onKeyDown = function(event) {
    CGMZ_Core_Input_onKeyDown.call(this, event);
	if($cgmzTemp) $cgmzTemp.onKeyDown(event);
};
//-----------------------------------------------------------------------------
// Pass Inputs to CGMZ Temp
//-----------------------------------------------------------------------------
const CGMZ_Core_Input_onKeyUp = Input._onKeyUp;
Input._onKeyUp = function(event) {
    CGMZ_Core_Input_onKeyUp.call(this, event);
	if($cgmzTemp) $cgmzTemp.onKeyUp(event);
};
//-----------------------------------------------------------------------------
// Also clear CGMZ Input
//-----------------------------------------------------------------------------
const CGMZ_Core_Input_onLostFocus = Input._onLostFocus;
Input._onLostFocus = function() {
    CGMZ_Core_Input_onLostFocus.call(this);
	if($cgmzTemp) $cgmzTemp.inputClear();
};
//-----------------------------------------------------------------------------
// Send gamepad id to CGMZ Temp
//-----------------------------------------------------------------------------
const CGMZ_Core_Input_updateGamepadState = Input._updateGamepadState;
Input._updateGamepadState = function(gamepad) {
    CGMZ_Core_Input_updateGamepadState.call(this, gamepad);
	if(this._gamepadStates[gamepad.index].some((item) => item === true)) {
		$cgmzTemp.updateLastGamepad(gamepad);
	} else {
		$cgmzTemp.updateGamepadRelease(gamepad);
	}
};
//=============================================================================
// Game_Temp
//-----------------------------------------------------------------------------
// Simulate production environment parameter
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Always pass false if simulating production
//-----------------------------------------------------------------------------
const CGMZ_Core_GameTemp_isPlaytest = Game_Temp.prototype.isPlaytest;
Game_Temp.prototype.isPlaytest = function() {
	return (CGMZ.Core.SimulateProductionEnv) ? false : CGMZ_Core_GameTemp_isPlaytest.call(this);
};
//=============================================================================
// Bitmap
//-----------------------------------------------------------------------------
// Add new shape drawing capabilities
//=============================================================================
//-----------------------------------------------------------------------------
// Copy of bitmap's stroke rect with added configurable line width
//-----------------------------------------------------------------------------
Bitmap.prototype.CGMZ_strokeRect = function(x, y, width, height, color, lineWidth = 1) {
    const context = this.context;
    context.save();
    context.strokeStyle = color;
	context.lineWidth = lineWidth;
    context.strokeRect(x, y, width, height);
    context.restore();
    this._baseTexture.update();
};
//-----------------------------------------------------------------------------
// Draw a line path through an array of points
//-----------------------------------------------------------------------------
Bitmap.prototype.CGMZ_strokeLinePath = function(points, color, lineWidth) {
    const context = this.context;
    context.save();
	context.strokeStyle = color;
	context.lineWidth = lineWidth;
	context.beginPath();
	context.moveTo(points[0].x, points[0].y);
	for(let i = 1; i < points.length; i++) {
		context.lineTo(points[i].x, points[i].y);
	}
    context.stroke();
    context.restore();
    this._baseTexture.update();
};
//-----------------------------------------------------------------------------
// Draw and fill a line path through an array of points
//-----------------------------------------------------------------------------
Bitmap.prototype.CGMZ_fillLinePath = function(points, color, lineWidth) {
    const context = this.context;
    context.save();
	context.fillStyle = color;
	context.strokeStyle = color;
	context.lineWidth = lineWidth;
	context.beginPath();
	context.moveTo(points[0].x, points[0].y);
	for(let i = 1; i < points.length; i++) {
		context.lineTo(points[i].x, points[i].y);
	}
	context.stroke();
    context.fill();
    context.restore();
    this._baseTexture.update();
};
//-----------------------------------------------------------------------------
// Stroke a circle
//-----------------------------------------------------------------------------
Bitmap.prototype.CGMZ_strokeCircle = function(x, y, radius, color, lineWidth) {
    const context = this.context;
    context.save();
    context.strokeStyle = color;
	context.lineWidth = lineWidth;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.stroke();
    context.restore();
    this._baseTexture.update();
};
//-----------------------------------------------------------------------------
// Stroke a curved rectangle
//-----------------------------------------------------------------------------
Bitmap.prototype.CGMZ_strokeCurvedRectangle = function(rect, radius, color, lineWidth) {
    const context = this.context;
	const x = rect.x;
	const y = rect.y;
	const width = rect.width;
	const height = rect.height;
    context.save();
    context.strokeStyle = color;
	context.lineWidth = lineWidth;
    context.beginPath();
	context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
	context.closePath();
    context.stroke();
    context.restore();
    this._baseTexture.update();
};
//=============================================================================
// Scene_MenuBase
//-----------------------------------------------------------------------------
// Add sprites below windows and above windows
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also add sprites above everything else
//-----------------------------------------------------------------------------
const CGMZCore_SceneMenuBase_create = Scene_MenuBase.prototype.create;
Scene_MenuBase.prototype.create = function() {
    CGMZCore_SceneMenuBase_create.apply(this, arguments);
	this.CGMZ_createUpperSprites();
};
//-----------------------------------------------------------------------------
// Alias. Also add sprites below everything else (besides background)
//-----------------------------------------------------------------------------
const CGMZCore_SceneMenuBase_createBackground = Scene_MenuBase.prototype.createBackground;
Scene_MenuBase.prototype.createBackground = function() {
    CGMZCore_SceneMenuBase_createBackground.apply(this, arguments);
	this.CGMZ_createLowerSprites();
};
//-----------------------------------------------------------------------------
// Create sprites below everything else
//-----------------------------------------------------------------------------
Scene_MenuBase.prototype.CGMZ_createLowerSprites = function() {
    // Used by CGMZ plugins
};
//-----------------------------------------------------------------------------
// Create sprites above everything else
//-----------------------------------------------------------------------------
Scene_MenuBase.prototype.CGMZ_createUpperSprites = function() {
    // Used by CGMZ plugins
};
//=============================================================================
// CGMZ_Window_Map
//-----------------------------------------------------------------------------
// A window that displays the tilemap
// For width/height, it is on you to make sure the tiles will fit in the
// window. To calculate do [Tile Width / Height] * 48 + [Padding] * 2 - 1
// Standard tile width/height is 48, standard padding is 12.
// Ex: if wanting to show 10 tiles, do 10 * 48 + 12 * 2 - 1 = 503
//
// Currently seems to be a bug if the window height/width matches exactly in
// that the tilemap will start to show the next tile.
//
// Due to tilemap strictness, it is recommended you base other windows off of
// the map window's dimensions.
//=============================================================================
function CGMZ_Window_Map() {
    this.initialize(...arguments);
}
CGMZ_Window_Map.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_Map.prototype.constructor = CGMZ_Window_Map;
$dataMapCGMZ = null;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.initialize = function(rect, mapId) {
    Window_Selectable.prototype.initialize.call(this, rect);
	this.select(0);
	this.activate();
	this.leftArrowVisible = false;
	this.rightArrowVisible = false;
	this._setupTilemap = false;
	this._tilemap = new Tilemap();
	this._tilemap.width = Math.floor(this.innerWidth / $gameMap.tileWidth()) * $gameMap.tileWidth();
	this._tilemap.height = Math.floor(this.innerHeight / $gameMap.tileHeight()) * $gameMap.tileHeight();
	this._tilemap.x = this.padding;
	this._tilemap.y = this.padding;
	this._tilemap._margin = 0;
	this.addChildToBack(this._tilemap);
	this._mapId = mapId;
	const filename = "Map%1.json".format(this._mapId.padZero(3));
	DataManager.loadDataFile("$dataMapCGMZ", filename);
	this._loadingMap = true;
};
//-----------------------------------------------------------------------------
// Update
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
    if(!$dataMapCGMZ) return;
	if(this._loadingMap) {
		if(DataManager.isMapLoaded()) {
			this._loadingMap = false;
		}
		return;
	}
	if(!this._setupTilemap) {
		this.setupTilemap();
		this._setupTilemap = true;
	} else {
		this._tilemap.origin.x = this.leftRow() * $gameMap.tileWidth();
		this._tilemap.origin.y = this.topRow() * $gameMap.tileHeight();
	}
};
//-----------------------------------------------------------------------------
// Create tilemap
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.setupTilemap = function() {
    this._tilemap.tileWidth = $gameMap.tileWidth();
    this._tilemap.tileHeight = $gameMap.tileHeight();
    this._tilemap.setData($dataMapCGMZ.width, $dataMapCGMZ.height, $dataMapCGMZ.data);
    this._tilemap.horizontalWrap = false;
    this._tilemap.verticalWrap = false;
    this.loadTileset();
};
//-----------------------------------------------------------------------------
// Load Tileset
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.loadTileset = function() {
    this._tileset = $dataTilesets[$dataMapCGMZ.tilesetId];
    if (this._tileset) {
        const bitmaps = [];
        const tilesetNames = this._tileset.tilesetNames;
        for (const name of tilesetNames) {
            bitmaps.push(ImageManager.loadTileset(name));
        }
        this._tilemap.setBitmaps(bitmaps);
        this._tilemap.flags = this._tileset.flags;
    }
};
//-----------------------------------------------------------------------------
// Get max columns
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.maxCols = function() {
	if(!$dataMapCGMZ) return 0;
    return $dataMapCGMZ.width;
};
//-----------------------------------------------------------------------------
// Get max items
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.maxItems = function() {
	if(!$dataMapCGMZ) return 0;
    return $dataMapCGMZ.width * $dataMapCGMZ.height;
};
//-----------------------------------------------------------------------------
// Get column spacing
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.colSpacing = function() {
    return 0;
};
//-----------------------------------------------------------------------------
// Get row spacing
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.rowSpacing = function() {
    return 0;
};
//-----------------------------------------------------------------------------
// Get item width
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.itemWidth = function() {
    return $gameMap.tileWidth();
};
//-----------------------------------------------------------------------------
// Get item height
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.itemHeight = function() {
    return $gameMap.tileHeight();
};
//-----------------------------------------------------------------------------
// No item padding
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.itemPadding = function() {
	return 0;
};
//-----------------------------------------------------------------------------
// Do not draw background
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.drawItemBackground = function(index) {
};
//-----------------------------------------------------------------------------
// Calculate the overall width of the window
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.overallWidth = function() {
    return this.maxCols() * this.itemWidth();
};
//-----------------------------------------------------------------------------
// Get the current column
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.column = function() {
    return this.index() % this.maxCols();
};
//-----------------------------------------------------------------------------
// Get the left-most row
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.leftRow = function() {
    return Math.floor(this.scrollX() / this.itemWidth());
};
//-----------------------------------------------------------------------------
// Ensure cursor visible for horizontal movement
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.ensureCursorVisible = function(smooth) {
	if (this.innerWidth > 0 && this.column() >= 0) {
        const scrollX = this.scrollX();
        const itemTopX = this.column() * this.itemWidth();
        const itemBottomX = itemTopX + this.itemWidth();
        const scrollMinX = itemBottomX - this.innerWidth;
        if (scrollX > itemTopX) {
            if (smooth) {
                this.smoothScrollTo(itemTopX, this.scrollY());
            } else {
                this.scrollTo(itemTopX, this.scrollY());
            }
        } else if (scrollX < scrollMinX) {
            if (smooth) {
                this.smoothScrollTo(scrollMinX, this.scrollY());
            } else {
                this.scrollTo(scrollMinX, this.scrollY());
            }
        }
    }
    if (this.innerHeight > 0 && this.row() >= 0) {
        const scrollY = this.scrollY();
        const itemTop = this.row() * this.itemHeight();
        const itemBottom = itemTop + this.itemHeight();
        const scrollMin = itemBottom - this.innerHeight;
        if (scrollY > itemTop) {
            if (smooth) {
                this.smoothScrollTo(this.scrollX(), itemTop);
            } else {
                this.scrollTo(this.scrollX(), itemTop);
            }
        } else if (scrollY < scrollMin) {
            if (smooth) {
                this.smoothScrollTo(this.scrollX(), scrollMin);
            } else {
                this.scrollTo(this.scrollX(), scrollMin);
            }
        }
    }
};
//-----------------------------------------------------------------------------
// Create left and right arrow sprites too
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype._createArrowSprites = function() {
	Window_Selectable.prototype._createArrowSprites.call(this);
    this._leftArrowSprite = new Sprite();
    this.addChild(this._leftArrowSprite);
    this._rightArrowSprite = new Sprite();
    this.addChild(this._rightArrowSprite);
};
//-----------------------------------------------------------------------------
// Update arrow visibility
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.updateArrows = function() {
	Window_Selectable.prototype.updateArrows.call(this);
    this.rightArrowVisible = this.scrollX() < this.maxScrollX();
    this.leftArrowVisible = this.scrollX() > 0;
};
//-----------------------------------------------------------------------------
// Update the left and right arrows
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype._updateArrows = function() {
	Window_Selectable.prototype._updateArrows.call(this);
	this._leftArrowSprite.visible = this.isOpen() && this.leftArrowVisible;
    this._rightArrowSprite.visible = this.isOpen() && this.rightArrowVisible;
};
//-----------------------------------------------------------------------------
// Refresh the left and right arrows
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype._refreshArrows = function() {
    Window_Selectable.prototype._refreshArrows.call(this);
	const w = this._width;
    const h = this._height;
    const p = 24;
    const q = p / 2;
    const sx = 96 + p;
    const sy = 0 + p;
    this._rightArrowSprite.bitmap = this._windowskin;
    this._rightArrowSprite.anchor.x = 0.5;
    this._rightArrowSprite.anchor.y = 0.5;
	this._rightArrowSprite.setFrame(sx + p + q, sy + q, q, p);
    this._rightArrowSprite.move(w - q, h / 2);
    this._leftArrowSprite.bitmap = this._windowskin;
    this._leftArrowSprite.anchor.x = 0.5;
    this._leftArrowSprite.anchor.y = 0.5;
	this._leftArrowSprite.setFrame(sx, sy + q, q, p);
    this._leftArrowSprite.move(q, h / 2);
};
//-----------------------------------------------------------------------------
// Do not update padding
//-----------------------------------------------------------------------------
CGMZ_Window_Map.prototype.setMapId = function(mapId) {
	this._mapId = mapId;
	const filename = "Map%1.json".format(this._mapId.padZero(3));
	DataManager.loadDataFile("$dataMapCGMZ", filename);
	this._setupTilemap = false;
	this._loadingMap = true;
};