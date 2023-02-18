/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/semi */
//Required Modules
import * as vscode from "vscode";

//Classes
import ChangeCase from "./Classes/ChangeCase_Class";
import AutoFormatter from "./Classes/AutoFormatter_Class";

//Start the Auto Formatter
new AutoFormatter();

//Exports
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "nytely-case-changer" is now active!');

	//context.subscriptions.push(disposable);
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

// This method is called when your extension is deactivated
export function deactivate() {}
