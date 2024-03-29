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
	//Check if the String Only contains Upper Case Letters
	const Upper_Case_Only = Text.toUpperCase() === Text;

	//Replaces "_" and "-" With A White Space
	let formatted_text = Text.replace(/\_|\-/g, " ");

	//Add a trailing White Space to the Formatted Text if it does not consist of only Upper Case Letters
	if (!Upper_Case_Only) formatted_text = formatted_text.replace(/([A-Z])/g, " $1");

	//Format the Text
	formatted_text = formatted_text
		.replace(/\s+/g, " ") // Removes Extra White Spaces (EG: "Test  Case" becomes "Test Case")
		.trim() // Removes Trailing and Leading White Spaces from the entire Text;
		.toLowerCase(); // Converts the Text to Lower Case

	//Convert the Formatted Text to an Array
	const Formatted_Text_Array = formatted_text.split(" ");

	//Return the Formatted Text Array
	return Formatted_Text_Array;
}

function Capitilize_First_Letter_Of_Word(Text_Array: Array<string>) {
	//
	// Capitalize the first letter of every word in the Array and Return the new Array
	return Text_Array.map(Word => Word.at(0)?.toUpperCase() + Word.slice(1));
}
