/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

define(function (require, exports, module) {
    "use strict";
	
	var CommandManager = brackets.getModule("command/CommandManager"),
		Menus = brackets.getModule("command/Menus"),
		PreferencesManager = brackets.getModule("preferences/PreferencesManager"),
		ExtensionUtils = brackets.getModule("utils/ExtensionUtils");

	ExtensionUtils.loadStyleSheet(module, "fonts.css");
	
	var preferences = PreferencesManager.getPreferenceStorage("extensions.code-font"), 
		menu = Menus.addMenu("Font", "code-font", Menus.AFTER, Menus.AppMenuBar.VIEW_MENU);
	
	// the array of fonts
	var fonts = [["code-font.default","Default"],["code-font-simsun","宋体"]];

	// function that changes the font, the font name to change to is passed to the function
	function changeFont(font){
		
		$("#editor-holder").attr("class","");
				
		if(font === fonts[0][1]){
			//default don't do anything	
		}
		else if(font === fonts[1][1]){
			//$('body').append("<link href='http://fonts.googleapis.com/css?family=SimSun' rel='stylesheet' type='text/css'>");
			$("#editor-holder").addClass("code-font-simsun");
		}
	}	
	
	//get the current saved font
	var selectedFont = preferences.getValue("selectedFont");
	
	// If there is no font selected, use default font
	if (selectedFont === undefined) {
		preferences.setValue("selectedFont", "Default");
		selectedFont = preferences.getValue("selectedFont");
		return;
	}
	
	//function to create each font menu item and it's command
	function createFontMenu(i){
		CommandManager.register(fonts[i][1], fonts[i][0] , function () {
			preferences.setValue("selectedFont", fonts[i][1]);
			selectedFont = preferences.getValue("selectedFont");
			changeFont(selectedFont);
		});
		menu.addMenuItem(fonts[i][0]);	
	}
	
	// loop through the array of fonts to create the menu
	for(var i=0; i < fonts.length; i++){
		createFontMenu(i);
	}
	
	//set the font on page load
	changeFont(selectedFont);

});
