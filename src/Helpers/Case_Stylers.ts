/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */

//Setup the Case Stylers Map
export const Stylers = new Map();

//Setup the Supported Case List
export const Cases = [
	"Snake_Case",
	"Pascal_Snake_Case",
	"Camel_Case",
	"Kebab_Case",
	"Screaming_Case",
	"Flat_Case",
	"Constant_Case",
	"Pascal_Case",
];

//Build the Case Stylers Map
for (const Case of Cases) {
	//
	//Get the Styler for the Given Case
	const Case_Styler = eval(`To_${Case}`);

	//Add the Styler to the Case Stylers Map
	Stylers.set(Case, Case_Styler);
}

//EXAMPLE: PascalCase
function To_Pascal_Case(Text: string): string {
	//
	//Format the Text to a Workable Array
	const Formatted_Text_Array = Get_Formatted_Text_Array(Text);

	//Modify the Formatted Text Array
	const Modified_Text_Array = Capitilize_First_Letter_Of_Word(Formatted_Text_Array);

	//Build the Final Text
	const Final_Text = Modified_Text_Array.join("");

	//Return the Final Text
	return Final_Text;
}

//EXAMPLE: CONSTANT_CASE
function To_Constant_Case(Text: string): string {
	//
	//Format the Text to a Workable Array
	const Formatted_Text_Array = Get_Formatted_Text_Array(Text);

	//Build the Final Text
	const Final_Text = Formatted_Text_Array.join("_").toUpperCase();

	//Return the Final Text
	return Final_Text;
}

//EXAMPLE: flatcase
function To_Flat_Case(Text: string): string {
	//
	//Format the Text to a Workable Array
	const Formatted_Text_Array = Get_Formatted_Text_Array(Text);

	//Build the Final Text
	const Final_Text = Formatted_Text_Array.join("");

	//Return the Final Text
	return Final_Text;
}

//EXAMPLE: SCREAMINGCASE
function To_Screaming_Case(Text: string): string {
	//
	//Format the Text to a Workable Array
	const Formatted_Text_Array = Get_Formatted_Text_Array(Text);

	//Build the Final Text
	const Final_Text = Formatted_Text_Array.join("").toUpperCase();

	//Return the Final Text
	return Final_Text;
}

//EXAMPLE: kebab-case
function To_Kebab_Case(Text: string): string {
	//
	//Format the Text to a Workable Array
	const Formatted_Text_Array = Get_Formatted_Text_Array(Text);

	//Build the Final Text
	const Final_Text = Formatted_Text_Array.join("-");

	//Return the Final Text
	return Final_Text;
}

//EXAMPLE: camelCase
function To_Camel_Case(Text: string): string {
	//
	//Format the Text to a Workable Array
	const Formatted_Text_Array = Get_Formatted_Text_Array(Text);

	//Modify the Formatted Text Array
	const Modified_Text_Array = Capitilize_First_Letter_Of_Word(Formatted_Text_Array);

	//Change the first word to Lower Case
	Modified_Text_Array[0] = Modified_Text_Array[0].toLowerCase();

	//Build the Final Text
	const Final_Text = Modified_Text_Array.join("");

	//Return the Final Text
	return Final_Text;
}

//EXAMPLE: Pascal_Snake_Case
function To_Pascal_Snake_Case(Text: string): string {
	//
	//Format the Text to a Workable Array
	const Formatted_Text_Array = Get_Formatted_Text_Array(Text);

	//Modify the Formatted Text Array
	const Modified_Text_Array = Capitilize_First_Letter_Of_Word(Formatted_Text_Array);

	//Build the Final Text
	const Final_Text = Modified_Text_Array.join("_");

	//Return the Final Text
	return Final_Text;
}

//EXAMPLE: snake_case
function To_Snake_Case(Text: string): string {
	//
	//Format the Text to a Workable Array
	const Formatted_Text_Array = Get_Formatted_Text_Array(Text);

	//Build the Final Text
	const Final_Text = Formatted_Text_Array.join("_");

	//Return the Final Text
	return Final_Text;
}

function Get_Formatted_Text_Array(Text: string) {
	//
	//Format the Given Text
	const Formatted_Text = Text.replace(/\_|\-/g, " ") // Replaces "_" and "-" With A White Space
		.replace(/\s+/g, " ") // Removes Extra White Spaces (EG: "Test  Case" becomes "Test Case")
		.trim() // Removes Trailing and Leading White Spaces from the entire Text
		.toLowerCase(); // Converts the Entire Text to Lower Case

	/*
		BUG: The Statement Below is used to split words apart based on Capitilization
			 However, when the entire word is capitilized then all of it's letters
			 are split into their own word <== This should to happen

			 .replace(/([A-Z])/g, " $1") // Adds a trailing White Space to all Capital Letters
	*/

	//Convert the Formatted Text to an Array
	const Formatted_Text_Array = Formatted_Text.split(" ");

	//Return the Formatted Text Array
	return Formatted_Text_Array;
}

function Capitilize_First_Letter_Of_Word(Text_Array: Array<string>) {
	//
	// Capitalize the first letter of every word in the Array and Return the new Array
	return Text_Array.map((Word) => Word.at(0)?.toUpperCase() + Word.slice(1));
}
