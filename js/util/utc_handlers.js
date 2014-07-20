define(function () {

    function utcToLocal12hrTime (durationUTC) {
        var localDuration = new Date(),
            localOffset = localDuration.getTimezoneOffset(),

            duration = durationUTC - (localOffset * (1000 * 60)),

            minutes = parseInt((duration / (1000*60))%60),
            hours = parseInt((duration / (1000*60*60))%24),
            timeOfDay;

        if (hours < 12) {
            timeOfDay = "AM";
            if (hours === 0) hours = 12; // fix for midnight = 00:00
        } else {
            timeOfDay = "PM";
            if (hours > 12) hours = hours - 12; // fix for 24-hour time
        }

        minutes = (minutes < 10) ? "0" + minutes : minutes;

        return hours + ":" + minutes + timeOfDay;
    }
    return { utcToLocal12hrTime: utcToLocal12hrTime }
});

//function utcToLocal12hrTime(durationUTC) {
//
//    var localDuration = new Date(),
//        localOffset = localDuration.getTimezoneOffset();
//
//    var duration = durationUTC - (localOffset * (1000 * 60));
//
//    var minutes = parseInt((duration / (1000*60))%60),
//        hours = parseInt((duration / (1000*60*60))%24),
//        timeOfDay;
//
//    if (hours < 12) {
//        timeOfDay = "AM";
//        if (hours === 0) hours = 12; // fix for midnight = 00:00
//    } else {
//        timeOfDay = "PM";
//        if (hours > 12) hours = hours - 12; // fix for 24-hour time
//    }
//
//    minutes = (minutes < 10) ? "0" + minutes : minutes;
//
//    return hours + ":" + minutes + timeOfDay;
//}

// unit tests
//alert(utcToLocal12hrTime(1394713986000)); // noonish
//alert(utcToLocal12hrTime(1394670786000)); // midnightish
//alert(utcToLocal12hrTime(1394699586000)); // am
//alert(utcToLocal12hrTime(1389208209480)); // pm