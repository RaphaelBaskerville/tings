var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/freetings');
var db = mongoose.connection;
var exports = module.exports;

db.on('error', console.error.bind(console, 'Connection Error'));
	var PostSchema = new mongoose.Schema({
		title: String,
		digits: Number,
		time: String,
		location: String,
		info: String
	});
	var RowSchema = new mongoose.Schema({
		title: String,
		postURI: String,
		time: String,
		location: String
	});
	var TradeSchema = new mongoose.Schema({
		title: String,
		postURI: String,
		time: String,
		location: String
	});
	var RealPostSchema = new mongoose.Schema({
		title: String,
		digits: Number,
		time: String,
		location: String,
		info: String
	});
	var Post = mongoose.model('Post', PostSchema)
	var Row = mongoose.model('Row', RowSchema)
	var Trade = mongoose.model('Trade', TradeSchema)
	var RealPost = mongoose.model('RealPost', RealPostSchema)
Row.remove();
Trade.remove();
db.once('open', function(){
	console.log('we are connected to the db')
})
exports.realPost = function(obj){
	var realpost = new RealPost({title:obj.a})
}
exports.show = function(request, response){
	return Row.find({}, function (error, result){
		if(error){
			console.log(error, 'error in the show Row');
		} else {
			return result
		}
	})
	// Row.save();
}
exports.post = function(jsonObj){
	// console.log(jsonObj.href)
	var post = new Post({title:jsonObj.a, postURI:jsonObj.href, time:jsonObj.time, location:jsonObj.location});

	post.save(function(err, row){
		if(err){
			console.log('error in the post method')
		} else {
			return row
		}
	})
}
exports.tradePost = function(jsonObj){
	var trade = new Trade({title:jsonObj.a, postURI:jsonObj.href, time:jsonObj.time, location:jsonObj.location});

	trade.save(function(err, row){
		if(err){
			console.log('error in the post method')
		} else {
			return row
		}
	})
}
exports.trade = function (request, reponse){
	return Trade.find({}, function (error, result){
		if(error){
			console.log(error, 'error in the trade');
		} else {
			return result;
		}
	})
}
