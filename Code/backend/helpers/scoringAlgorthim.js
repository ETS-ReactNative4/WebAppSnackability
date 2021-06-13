const { getIngCategory } = require('../controllers/snacks.controller');
var CSVFile = './datacleaned/first_ing_list.csv';
var fs = require('fs');

var firstIng = function firstIng(ingredient) {
	//regex to break down to first ingredient and set to lower case
	var regex = ingredient.replace(/\s+/g, ' ').toLowerCase();

	// split items at a comma, in order to get first ingredient
	regex = regex.split(',');

	//we only want first ingredient
	regex = regex[0];

	// remove every character that is not a number, letter or a percentage sign
	regex = regex.replace(/[^0-9a-z%]/gi, ' ');

	// if there is more than one space between words, remove it
	regex = regex.replace(/  +/g, ' ');

	// remove all spaces at the end, if any
	regex = regex.replace(/\s*$/, '');

	// remove the comma at the end due to for loop
	regex = regex.toString().replace(/\,$/, '');
	regex = regex.split(',');

	var test1 = regex.length;
	var test2 = regex.length;
	var test3 = '';

	// check for both singular and plural of the first ingredient
	for (var i = 0; i < test1; i++) {
		try {
			throw i;
		} catch (ii) {
			test3 = regex[ii].slice(-1);
			if (test3 == 's') {
				regex[test2] = regex[ii].substring(0, regex[ii].length - 1);
				test2++;
			} else {
				regex[test2] = regex[ii] + 's';
				test2++;
			}
		}
	}
	// remove the comma at the end due to for loop
	regex = regex.toString().replace(/\,$/, '');
	regex = regex.split(',');

	var test1 = regex.length;
	var test2 = regex.length;
	var test3 = '';

	// check for both singular and plural of the first ingredient
	for (var i = 0; i < test1; i++) {
		try {
			throw i;
		} catch (ii) {
			test3 = regex[ii].slice(-1);
			if (test3 == 's') {
				regex[test2] = regex[ii].substring(0, regex[ii].length - 1);
				test2++;
			} else {
				regex[test2] = regex[ii] + 's';
				test2++;
			}
		}
	}
	// read first ing from csv file, set all to lowercase and split at ,
	var dataCSV = fs.readFileSync(CSVFile, { encoding: 'utf8' });
	var first_ing = dataCSV
		.toString()
		.toLowerCase()
		.replace(/\n/g, ',')
		.split(',');

	var category = 'other';

	// loop thru all combinations of the first ingredient
	regex.forEach(function (snack, i) {
		//console.log('All combinations of first ingredient: ' + snack)
		first_ing.forEach(function (item, j) {
			if (j + 1 < first_ing.length) {
				item = first_ing[j + 1];
				item = item.replace(/\s/g, '');
				if (item == snack) {
					category = first_ing[j];
					console.log('*Matching first ing: ' + snack);
				}
			}
		});
	});

	console.log('Ingredients after checking db: ' + category);

	switch (category) {
		case 'dairy':
		case 'proteins-nut':
		case 'whole grains':
		case 'vegetables':
		case 'fruits':
		case 'proteins':
			return 2;
			break;
		case 'They are Secret!':
			if (!isLocal && name.toLowerCase().replace('Yogurt').length > 0) return 2;
			return 0;
			break;
		case 'other':
			return 0;
			break;
		case 'none':
			console.log('It appears there are no ingredients?');
			return 0;
			break;
		default:
			return 0;
	}
};

module.exports = firstIng;
