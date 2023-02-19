/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
//Required Modules
import * as vscode from "vscode";

//Custom Imports
import * as Case_Styler from "../Helpers/Case_Stylers";

//Get the Configuration
const Case_Configuration = vscode.workspace.getConfiguration("nytely.case.change.settings");

//Functions
export function Format_Text(Given_String: string, Symbol_Kind: string) {
	//
	//Setup the Text Styler
	//const Text_Styler = Case_Styler.Stylers.get(Case);

	//Setup the Auto Case Change Configuration
	const Auto_Case_Change_Configuration = Case_Configuration.Auto_Case_Change_Map;

	//Check if the given Configuration is not Valid
	if (typeof Auto_Case_Change_Configuration !== "object") return Given_String;

	//Set the Auto Case Change Configuration Map
	const Auto_Case_Change_Configuration_Map = new Map(
		Object.entries(Auto_Case_Change_Configuration)
	);

	//Get the Styler Type
	const Styler_Type = Auto_Case_Change_Configuration_Map.get(Symbol_Kind);

	//Get the Styler
	const Styler = Case_Styler.Stylers.get(Styler_Type);

	//Check if the Styler Does not exist
	if (!Styler) return Given_String;

	//Style the Text
	return Styler(Given_String);
}
