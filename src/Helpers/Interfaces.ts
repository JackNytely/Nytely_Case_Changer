/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
//Required Modules
import * as vscode from "vscode";

//Create a Symbol Summary Interface
interface Symbol_Summary_Interface {
	Name: string;
	Kind: string;
	Uri: vscode.Uri;
	Position: vscode.Position;
}

//Create a New Interface for the Symbol
export interface Symbol_Interface {
	Raw: vscode.DocumentSymbol;
	Summary: Symbol_Summary_Interface;
}
