'use strict';

var fs = require('fs'),
	jf = require('jsonfile');


// start at 6am to 1am
var crowdDay= [];
var index= 0;

for(var i=360; i<1500;i++) {
	
	var aTime = {};
	aTime.time = i;

	var crowd = 0;

	if(i<450) {
		// 6h -> 7h30
		crowd = 100 + Math.random()*200;
	} else if (i>=450 && i<540) {
		// 7h30 -> 8h30
		crowd = crowdDay[index-1].crowd + Math.random()*200;
	} else if (i>=540 && i<630) {
		// 8h30 -> 10h
		crowd = crowdDay[index-1].crowd - Math.random()*100;
	} else if (i>=630 && i<1050) {
		// 10h -> 17h
		crowd = Math.random()*200;
	} else if (i>=1050 && i<1140) {
		// 17h -> 18h30
		crowd = crowdDay[index-1].crowd + Math.random()*200;
	} else if (i>=1140 && i<1230) {
		// 18h30 -> 20h
		crowd = crowdDay[index-1].crowd - Math.random()*100;
	} else {
		// 20h -> 1h
		crowd = Math.random()*200;
	}
	aTime.crowd = crowd;

	crowdDay.push(aTime);
	index ++;
}
jf.writeFileSync('fakeDay.json', crowdDay);