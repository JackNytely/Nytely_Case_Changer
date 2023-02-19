/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
//Required Modules
import * as vscode from "vscode";

//Custom Imports
import * as Case_Styler from "../Helpers/Case_Stylers";

//Functions
export function Format_Text(Given_String: string, Symbol_Kind: string) {
	//
	//Get the Configuration
	const Case_Configuration = vscode.workspace.getConfiguration("Nytely Case Changer");

	//Setup the Styler Type
	const Styler_Type = Case_Configuration.get(`${Symbol_Kind} Case`);

	//Setup the Styler
	const Styler = Case_Styler.Stylers.get(Styler_Type);

	//Check if the Styler Does not exist
	if (!Styler) return Given_String;

	//Style the Text
	return Styler(Given_String);
}
