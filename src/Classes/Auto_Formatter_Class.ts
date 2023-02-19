/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
//Required Modules
import * as vscode from "vscode";

//Custom Imports
import { Helpers } from "../Helpers/Helpers";
import * as Interfaces from "../Helpers/Interfaces";
import * as Case_Styler from "../Helpers/Case_Stylers";
import * as Text_Formatter from "../Helpers/Text_Formatter";

//Setup Class
export default class AutoFormatter {
	//
	//Setup the Constructor
	constructor() {
		//
		//Start the Listener
		vscode.workspace.onDidSaveTextDocument(this.Format_Document);
	}

	//Setup the Private Methods
	private async Format_Document(document: vscode.TextDocument) {
		//
		//Get the Configuration
		const Case_Configuration = vscode.workspace.getConfiguration("Nytely Case Changer");

		//Check if Auto Change Case on Save is not Enabled
		if (!Case_Configuration.get("Change Cases on Save")) return;

		//Check if the Current Document is Supported
		if (document.languageId !== "javascript") return;

		//Setup the Symbol Editor
		const Symbol_Editor = new vscode.WorkspaceEdit();

		//Setup the Symbols List
		const Symbols_List = await Find_Symbols(document);

		//Setup the Edit List
		const Edit_List = new Array();

		//Loop through Each Symbol
		for (const Symbol of Symbols_List) {
			//
			//Generate the Editor for the Specified Symbol
			const Generated_Editor = await Generate_Symbol_Editor(document, Symbol);

			//Push the Generated Edits to the Edit List
			Edit_List.push(...Generated_Editor.get(document.uri));
		}

		//Add the edits to the Symbol Editor
		Symbol_Editor.set(document.uri, Edit_List);

		//Apply the Edits
		vscode.workspace.applyEdit(Symbol_Editor);
	}
}

//Setup the Symbol Editor Generator
async function Generate_Symbol_Editor(
	document: vscode.TextDocument,
	Symbol: Interfaces.Symbol_Interface
): Promise<vscode.WorkspaceEdit> {
	//
	//Setup the Formatted String
	const Formatted_String = Text_Formatter.Format_Text(Symbol.Summary.Name, Symbol.Summary.Kind);

	//Setup the Workspace Editor
	const Rename_Constants_Editor: vscode.WorkspaceEdit = await vscode.commands.executeCommand(
		"vscode.executeDocumentRenameProvider",
		document.uri,
		Symbol.Summary.Position,
		Formatted_String
	);

	//Return the Workspace Editor
	return Rename_Constants_Editor;
}

//Setup the Symbol Finder
async function Find_Symbols(document: vscode.TextDocument): Promise<Interfaces.Symbol_Interface[]> {
	//
	//Get the Symbol List
	const Symbol_List: vscode.DocumentSymbol[] = await vscode.commands.executeCommand(
		"vscode.executeDocumentSymbolProvider",
		document.uri
	);

	//Get the Filtered Symbols
	const Filtered_Symbols = Filter_Symbols(Symbol_List);

	//Setup the Symbol Kind List
	const Symbol_Kind_List = new Map(Object.entries(vscode.SymbolKind));

	//Setup the New Symbol List
	const New_Symbol_List = new Array();

	//Build the New Symbol
	for (const Symbol of Filtered_Symbols) {
		//
		//Get the Line where the Symbol is defined
		const Symbol_Line = document.lineAt(Symbol.range.start.line).text;

		//Split the Symbol Line into it's Different Components
		const Symbol_Line_Array = Symbol_Line.split(" ");

		//Get the Symbol's Definition
		const Symbol_Definition =
			Get_Definition_From_String_Array(Symbol_Line_Array) ||
			Symbol_Kind_List.get(String(Symbol.kind));

		//Setup the Symbol's Position
		var symbol_position = Symbol.selectionRange.start;

		//Build the New Symbol
		const New_Symbol: Interfaces.Symbol_Interface = {
			Raw: Symbol,
			Summary: {
				Name: Symbol.name,
				Kind: Symbol_Definition,
				Uri: document.uri,
				Position: symbol_position,
			},
		};

		//Push the Symbol to the New Symbol List
		New_Symbol_List.push(New_Symbol);
	}

	//Setup the Constant Variables
	return New_Symbol_List;
}

//Setup the Symbol Fiilterer
function Filter_Symbols(Symbols: vscode.DocumentSymbol[]): vscode.DocumentSymbol[] {
	//
	//Map the Symbols
	const Symbols_Map = Symbols.map((symbol) => Filter_Symbols(symbol.children));

	//Reduce the Mapped Symbols
	const Reduced_Symbols = Symbols_Map.reduce((a, b) => a.concat(b), []);

	//Setup the Concatenated Symbols
	const Concat_Symbols = Symbols.concat(Reduced_Symbols);

	//Setup the Final Filtered Symbols
	const Filtered_Symbols = Concat_Symbols;

	//Return the Filtered Symbols
	return Filtered_Symbols;
}

function Get_Definition_From_String_Array(String_Array: string[]) {
	//
	//Setup the Requested Definition
	var requested_definition;

	//Loop through the String Array
	for (const Given_String of String_Array) {
		//
		//Filter the Given String
		const Filtered_String = Given_String.replaceAll(/\s|[^\w\s]/g, "").toLowerCase();

		//Get the Definition from the Filtered String
		const Definition = Helpers.Definition_Map.get(Filtered_String);

		//Check if No definition was found
		if (!Definition) continue;

		//Set the Requested Definition
		requested_definition = Definition;

		//Break the Loop
		break;
	}

	//Return the Requested Definition
	return requested_definition;
}
