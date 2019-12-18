// parse-test script
const nearley = require("nearley");
const grammar = require("./grammar.js");
const util = require("util");

function parse(s){
	// create a Parser object from our grammar.
	var parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
	try {
		// parse something!
		parser.feed(s);

		// parser.results is an array of possible parsings.
		console.log("Parse Succesful: \n", 
			util.inspect(parser.results, { depth: 10}), 
			"\n");
		// console.log("Parse succesful:", parser.results);
	} catch (e) {
		console.log("Parse failure: \n", e.message);
		// console.log("Error at character " + e.parseError.offset);
	}
}

// parseNumbers();
// parseComments();
// parseStrings();
// parseKeywords();
// parseRing();
parseInst();
// parseSet();

// Parse numbers
function parseNumbers(){
	parse("012");
	parse("34");
	parse("-56");
	parse("7.89");
	parse("1.0111213141E5");
	// parse("1 + 2 / 4");
}

// Parse comments
function parseComments(){
	parse("// a comment here");
	parse("# another comment");
	parse("$ also a type of comment");
	// parse("// 1.0111213141E5 < commented");
}

// Parse strings
function parseStrings(){
	parse('"hello world"');
	parse("'also a string'");
	parse("`and another! `");
	parse("'this works?`");
	parse('` this does as well?"');

	// Parse identifier/name
	parse('kick_dub');
	parse('_dub');
	parse('foley-02');
}

// Parse keywords
function parseKeywords(){
	parse("ring");
	parse("new");
	parse("set");

	parse("data");
	parse("add");
	parse("apply");
}

function parseRing(){
	parse("ring myVal  3.14");
	parse("ring myArr [ 1 2 3.4 56 7.89e10 ]");
	parse("ring hats [hat_dub hat_dub_open]");
	parse("ring ring2D [ 1 2 [3 4] 5 [6 [7 8] 9] 10 11 ] ");

	parse("ring beat euclid(16 4 0)")
	parse("ring arpMel clone( palin( spread(5 0 12) ) 0 0 7 3 )");
	parse("ring bsLine clone( spray( bassBt spread(5 0 17) ) )" );
}

function parseInst(){
	// parse("note(0 2)");
	parse("new synth saw note (0 0)");
	parse("new sample kick_dub time(0.25) speed(0.9) ");
	// parse(" new loop amen-break02");
	// parse(' new loop "05samp"');
	// parse(' new loop k');
}

function parseSet(){
	parse("set k amp(0.3)");
	parse("set bass fx(delay 3 5 0.3) fx(double)");
	parse(" set a-name ");
}