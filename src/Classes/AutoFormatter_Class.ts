/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
//Required Modules
import * as vscode from "vscode";

//Custom Imports
import * as Nytely_Text_Formatter from "../Helpers/NytelyText_Formatter";

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

		//console.log(Edit_List);
		Symbol_Editor.set(document.uri, Edit_List);

		//Apply the Edits
		//vscode.workspace.applyEdit(Symbol_Editor);
	}
}

//Setup the Symbol Editor Generator
async function Generate_Symbol_Editor(
	document: vscode.TextDocument,
	symbol: vscode.DocumentSymbol
): Promise<vscode.WorkspaceEdit> {
	//
	//Setup the Symbol Kind List
	const Symbol_Kind_List = new Map(Object.entries(vscode.SymbolKind));

	//Setup the Kind String for the Given Symbol
	const Symbol_Kind_String = String(Symbol_Kind_List.get(String(symbol.kind))).toLowerCase();

	//Setup the Formatted String
	let formatted_string = String(symbol.name);

	//Format the String to the Nytely Standard
	if (Symbol_Kind_String === "variable")
		formatted_string = Nytely_Text_Formatter.toVariableCase(formatted_string);

	if (Symbol_Kind_String === "constant")
		formatted_string = Nytely_Text_Formatter.toConstantCase(formatted_string);

	//Setup the Workspace Editor
	const Rename_Constants_Editor: vscode.WorkspaceEdit = await vscode.commands.executeCommand(
		"vscode.executeDocumentRenameProvider",
		document.uri,
		symbol.range.start,
		formatted_string
	);

	//Return the Workspace Editor
	return Rename_Constants_Editor;
}

//Setup the Symbol Finder
async function Find_Symbols(document: vscode.TextDocument): Promise<vscode.DocumentSymbol[]> {
	//
	//Get the Symbol List
	const Symbol_List: vscode.DocumentSymbol[] = await vscode.commands.executeCommand(
		"vscode.executeDocumentSymbolProvider",
		document.uri
	);

	//Get the Filtered Symbols
	const Filtered_Symbols = Filter_Symbols(Symbol_List);

	//Setup the Constant Variables
	return Filtered_Symbols;
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
