var Xray = require('x-ray');

var xray = new Xray();

var test = xray('http://sfbay.craigslist.org/search/zip', '.row',
	[{
			a: '.hdrlnk',
			img: 'img@src',
			href: '.i @href',
			time: 'time',
			location: '.pnr small'
	}]
).write().then(function(data){
	console.log(data)
})