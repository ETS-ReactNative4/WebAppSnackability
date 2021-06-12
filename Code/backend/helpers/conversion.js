exports.convertUnit = (units, portion) => {
	let result = portion;
	switch (units) {
		case 'lbs':
			result = portion * 453.59237;
			return result;
		case 'oz':
			result = portion * 28.3495;
			return result;
		case 'tbsp':
			result = portion * 15;
			return result;
		case 'tsp':
			result = portion * 4;
			return result;
		case 'kg':
			result = portion * 1000;
			return result;
		default:
			return portion;
	}
};
