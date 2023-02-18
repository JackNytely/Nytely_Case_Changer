/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */

export function toConstantCase(Text: string): string {
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

export function toVariableCase(Text: string): string {
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
		.replace(/([A-Z])/g, " $1") // Adds a trailing White Space to all Capital Letters
		.replace(/\s+/g, " ") // Removes Extra White Spaces (EG: "Test  Case" becomes "Test Case")
		.trim() // Removes Trailing and Leading White Spaces from the entire Text
		.toLowerCase(); // Converts the Entire Text to Lower Case

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
