var Xray = require('x-ray');

var xray = new Xray();

xray('https://sfbay.craigslist.org/search/bar', '.row',
	[{
			a: '.hdrlnk',
			href: '.i @href',
			time: 'time',
			location: '.pnr small'
	}]
)
	.write('barterresults.json')