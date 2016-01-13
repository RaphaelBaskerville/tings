var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var db = require('./db.js')
var jsonData = require('./results.js')
var tradeDate = require('./barterresults.js')
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/client')))



app.get('/items', function (request, response, next){
	for(var i = 0; i < jsonData.length; i++){
		db.post(jsonData[i])
	}
	db.show(request, response).then(function(data){
		response.status(200).send(data)
	});
})

// app.get('/listitem', function (request, response, next){
	// response.redirect('postpost')
// })

app.get('/trades', function (request, response, next){
	for (var i = 0; i < tradeDate.length; i++) {
	db.tradePost(tradeDate[i])
	};
	db.trade(request, response).then(function(data){
		response.status(200).send(data)
	})
})
app.post('/listitem', function (request, response){
	response.status(200).send(request.body)
})
app.listen(3000);



















// app.use(function(request, response, next){
//   response.header("Access-Control-Allow-Origin", "*");
//   response.header("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS");
//   response.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
//   next();
// });