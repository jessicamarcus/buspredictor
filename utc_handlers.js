function utcToLocal12hrTime(durationUTC) {

	var localDuration = new Date();
	var localOffset = localDuration.getTimezoneOffset();

	var duration = durationUTC - (localOffset * (1000 * 60));

	var minutes = parseInt((duration / (1000*60))%60),
		hours = parseInt((duration / (1000*60*60))%24),
		timeOfDay = "AM";

	if (hours === 0) {
		hours = 12;
	} else if (hours < 12){
		// this space intentionally left blank
	} else if (hours > 12) {
		hours = hours - 12;
		timeOfDay = "PM";
	} else {
		timeOfDay = "PM";
	}
	minutes = (minutes < 10) ? "0" + minutes : minutes;

	return hours + ":" + minutes + timeOfDay;
}

// unit tests
//alert(utcToLocal12hrTime(1394713986000)); // noonish
//alert(utcToLocal12hrTime(1394670786000)); // midnightish
//alert(utcToLocal12hrTime(1394699586000)); // am
//alert(utcToLocal12hrTime(1389208209480)); // pm