//Required Modules
import * as vscode from "vscode";

//Setup Class
export default class ChangeCase implements vscode.CodeActionProvider {
	//
	//Get the Provided Action Kinds
	public static readonly providedCodeActionKinds = [vscode.CodeActionKind.QuickFix];

	//Set the Code Actions
	public provideCodeActions(
		document: vscode.TextDocument,
		range: vscode.Range
	): vscode.CodeAction[] | undefined {
		//
		//Setup the Editor Environment
		var editor = vscode.window.activeTextEditor;

		//Check if the Editor does not Exist
		if (!editor) {
			return;
		}

		//Get the User's Selection
		var selection = editor.selection;
		var text = editor.document.getText(selection);

		//Setup the Actions
		const changeToVariableCase = this.createFix(document, range, "Variable Case", text);
		const changeToConstantCase = this.createFix(document, range, "Constant Case", text);

		//Set the Preferred Action
		changeToConstantCase.isPreferred = true;
		changeToVariableCase.isPreferred = true;

		//Setup the Preferred Cases
		const preferredCases: any = [];

		//Setup the Setting to Function Map
		const settingToFunctionMapping: any = {
			snakeCase: changeToVariableCase,
			constantCase: changeToConstantCase,
		};

		//Setup the Settings
		const caseSettings = ["variableCase", "constantCase"];

		//Map the VS Code Setting to their Respective Method
		caseSettings.map((setting: string) => {
			//
			//Check if the Setting does not Exist
			if (vscode.workspace.getConfiguration("nytely.case.change.settings")[setting]) return;

			//Push the function for the Specific Setting to the Preferred Cases
			preferredCases.push(settingToFunctionMapping[setting]);
		});

		//Return the Preferred Cases
		return preferredCases;
	}

	toConstantCase(Text: string) {
		//
		//Format the Text to a Workable Array
		const Formatted_Text_Array = this.Get_Formatted_Text_Array(Text);

		//Modify the Formatted Text Array
		const Modified_Text_Array = this.Capitilize_First_Letter_Of_Word(Formatted_Text_Array);

		//Build the Final Text
		const Final_Text = Modified_Text_Array.join("_");

		//Return the Final Text
		return Final_Text;
	}

	toVariableCase(Text: string) {
		//
		//Format the Text to a Workable Array
		const Formatted_Text_Array = this.Get_Formatted_Text_Array(Text);

		//Build the Final Text
		const Final_Text = Formatted_Text_Array.join("_");

		//Return the Final Text
		return Final_Text;
	}

	mapFunctionToArguments(selectedCase: string, text: string): string {
		//
		//Setup the Cases Map
		const Cases = new Map();

		//Add Cases to the Cases Map
		Cases.set("Variable Case", this.toVariableCase);
		Cases.set("Constant Case", this.toConstantCase);

		//Check if the Requested Case Does not Exist
		if (!Cases.has(selectedCase)) return "Errors";

		//Get the Requested Case
		const Requested_Case = Cases.get(selectedCase);

		//Run the Requested Case
		const Formatted_Text = Requested_Case(text);

		//Return the Formatted Text
		return Formatted_Text;
	}

	private createFix(
		document: vscode.TextDocument,
		range: vscode.Range,
		selectedCase: string,
		text: string
	): vscode.CodeAction {
		//
		//Setup the Quick Fix Action
		const fix = new vscode.CodeAction(`Change to ${selectedCase}`, vscode.CodeActionKind.QuickFix);

		//Set the Quick Fix Action to a Workspace Editor
		fix.edit = new vscode.WorkspaceEdit();

		//Setup the Editor Environment
		var editor = vscode.window.activeTextEditor;

		//Check if the Editor does not Exist
		if (!editor) {
			return fix;
		}

		//Get the Selected Text to Edit
		const selections: Readonly<vscode.Selection[]> = editor.selections;

		//Edit the Selected Text
		editor.edit((textSelected) => {
			//
			//Loop over the Selections
			for (const selection of selections) {
				//
				//Check if the Workspace Editor Does not Exist
				if (!fix.edit) continue;

				//Run the Action on the Selected Text and Replace the Selected Text with the Action Output
				fix.edit.replace(document.uri, selection, this.mapFunctionToArguments(selectedCase, text));
			}
		});

		//Return the Fix
		return fix;
	}

	private Get_Formatted_Text_Array(Text: string) {
		//
		//Format the Given Text
		const Formatted_Text = Text.replace(/\_|\-/g, " ") // Replaces "_" and "-" With A White Space
			.replace(/([A-Z])/g, " $1") // Adds a trailing White Space to all Capital Letters
			.replace(/\s+/g, " ") // Removes Extra White Spaces (EG: "Test  Case" becomes "Test Case")
			.trim() // Removes Trailing and Leading White Spaces from the entire Text
			.toLowerCase(); // Converts the Entire Text to Lower Case

		//Convert the Formatted Text to an Array
		const Formatted_Text_Array = Formatted_Text.split(" ");

		//Return the Formatted Text Array
		return Formatted_Text_Array;
	}

	private Capitilize_First_Letter_Of_Word(Text_Array: Array<string>) {
		//
		// Capitalize the first letter of every word in the Array and Return the new Array
		return Text_Array.map((Word) => Word.at(0)?.toUpperCase() + Word.slice(1));
	}
}
