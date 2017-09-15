var makeDate = function() {
	var d = new Date();
	var formattedDate = '';

	// add month. month is in array so + 1
	formattedDate += (d.getMonth() + 1) + '_';
	//add date
	formattedDate += d.getDate() + '_';
	// add year
	formattedDate += d.getFullYear();

	return formattedDate;
};

module.exports = makeDate;