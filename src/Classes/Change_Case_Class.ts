/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
//Required Modules
import * as vscode from "vscode";

//Custom Imports
import * as Case_Styler from "../Helpers/Case_Stylers";

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
		const Editor = vscode.window.activeTextEditor;

		//Check if the Editor does not Exist
		if (!Editor) {
			return;
		}

		//Get the User's Selection
		const Selection: vscode.Selection = Editor.selection;
		const Text: string = Editor.document.getText(Selection);

		//Setup the Preferred Cases
		const Enabled_Cases: vscode.CodeAction[] = new Array();

		//Build  the Actions
		for (const Case of Case_Styler.Cases) {
			//
			//Push the Fix for the Specific Setting to the Enabled Cases List
			Enabled_Cases.push(this.createFix(document, range, Case, Text));
		}

		//Return the Preferred Cases
		return Enabled_Cases;
	}

	Format_Text_Selection(selectedCase: string, text: string): string {
		//
		//Get the Requested Case
		const Requested_Case = Case_Styler.Stylers.get(selectedCase);

		//Check if the Requested Case Does not Exist
		if (!Requested_Case) return "Errors";

		//Run the Requested Case
		const Formatted_Text = Requested_Case(text);

		//Return the Formatted Text
		return Formatted_Text;
	}

	private createFix(
		document: vscode.TextDocument,
		Range: vscode.Range,
		Selected_Case: string,
		Text: string
	): vscode.CodeAction {
		//
		//Setup the Case Name
		const Case_Name = Selected_Case.replace("_", " ");

		//Setup the Quick Fix Action
		const Fix = new vscode.CodeAction(`Change to ${Case_Name}`, vscode.CodeActionKind.QuickFix);

		//Setup the Editor Environment
		const Editor = vscode.window.activeTextEditor;

		//Set the Quick Fix Action to a Workspace Editor
		Fix.edit = new vscode.WorkspaceEdit();

		//Check if the Editor does not Exist
		if (!Editor) {
			return Fix;
		}

		//Get the Selected Text to Edit
		const Selections = Editor.selections;

		//Edit the Selected Text
		Editor.edit((textSelected) => {
			//
			//Loop over the Selections
			for (const Selection of Selections) {
				//
				//Check if the Workspace Editor Does not Exist
				if (!Fix.edit) continue;

				//Get the Formatted Text
				const Formatted_Text = this.Format_Text_Selection(Selected_Case, Text);

				//Run the Action on the Selected Text and Replace the Selected Text with the Action Output
				Fix.edit.replace(document.uri, Selection, Formatted_Text);
			}
		});

		//Return the Fix
		return Fix;
	}
}
