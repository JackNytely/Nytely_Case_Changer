/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */

//Setup the Supported Languages
const Supported_Languages = [
	"javascript",
	"typescript",
	"javascriptreact",
	"typescriptreact",
	"html",
];

//Setup the Supported Definitions Map
const Definition_Map = new Map();

//Build the Definition Map
Definition_Map.set("const", "Constant");
Definition_Map.set("let", "Variable");
Definition_Map.set("function", "Function");
Definition_Map.set("class", "Class");

//Setup the Namespace
export const Helpers = {
	Definition_Map,
	Supported_Languages,
};
