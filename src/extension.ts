//Required Modules
import * as vscode from "vscode";

//Required Constants
const COMMAND = "case-change";

//Classes
import ChangeCase from "./Classes/ChangeCase_Class";

//Exports
export function activate(context: vscode.ExtensionContext) {
	//
	//Setup the Context Subscriptions
	context.subscriptions.push(
		//
		//Setup the Available Languages for the Extension
		vscode.languages.registerCodeActionsProvider(
			[
				{ scheme: "file", language: "javascript" },
				{ scheme: "file", language: "typescript" },
				{ scheme: "file", language: "html" },
				{ scheme: "file", language: "css" },
				{ scheme: "file", language: "less" },
				{ scheme: "file", language: "typescriptreact" },
				{ scheme: "file", language: "scss" },
				{ scheme: "file", language: "python" },
				{ scheme: "file", language: "markdown" },
				{ scheme: "file", language: "json" },
				{ scheme: "file", language: "javascriptreact" },
				{ scheme: "file", language: "sass" },
				{ scheme: "file", language: "go" },
			],

			//Add the ChangeCase Subscription
			new ChangeCase(),
			{
				//
				//Provide the Code Actions
				providedCodeActionKinds: ChangeCase.providedCodeActionKinds,
			}
		)
	);
}
