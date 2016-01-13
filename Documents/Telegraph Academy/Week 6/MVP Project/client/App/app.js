var app = angular.module('freetings', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('items', {
      templateUrl: '../getPost.html',
      url: '/items',
      controller: "ftController"
    })
    .state('postitem', {
      templateUrl: '../postIndex.html',
      url: '/listitem',
      controller: "postController"
    })
    .state('trades', {
    	templateUrl: '../getTrade.html',
    	url: '/trades',
    	controller: "tradeController"
    })
    
  $urlRouterProvider.otherwise('/items')
});


app.controller('ftController', ['$scope','$state', 'ftFactory', function ($scope, $state, ftFactory){
	$scope.data = [];

	$scope.parseData = function(){
		ftFactory.getData().then(function (passedOverdata){
			$scope.data = passedOverdata
		}).catch(function (err){
			console.error(err)
		})
	}

	$scope.go = function(){
		console.log('heelo')
		$state.go('postitem')
	}
	$scope.goTrade = function(){
		console.log('haiii')
		$state.go('trades')
	}
	$scope.parseData();
}]);

app.controller('postController', ['$scope', '$state', 'ftFactory', function ($scope, $state, ftFactory){
	$scope.test = "test"
	$scope.postItem = function(title, date, location, info){
		console.log('woooot')
		ftFactory.postData({title: title, time: new Date(), location: location, info: info}).then(function (passedOverdata){
			console.log('postitem in controller ', passedOverdata);
		}).catch(function (err){
			console.error(err)
		});
		$state.go('items');
	}
	$scope.goSwoop = function(){
		$state.go('items')
	}
	$scope.goTrade = function(){
		$state.go('trades')
	}
}]);

app.controller('tradeController', ['$scope','ftFactory', '$state', function ($scope, ftFactory,$state){
	$scope.data = [];

	$scope.parseData = function(){
		ftFactory.getTrade().then(function (passedOverdata){
			$scope.data = passedOverdata
		}).catch(function (err){
			console.error(err)
		})
	}
	$scope.goPost = function(){
		console.log('heelo')
		$state.go('postitem')
	}
	$scope.goSwoop = function(){
		console.log('byee')
		$state.go('items')
	}
	$scope.parseData();
}]);

app.factory('ftFactory', ['$http', function ($http){
	var getData = function(){
		return $http.get('/items').then(function (response){
			return response.data;
		})
	};
	var postData = function(json){
		return $http.post('/listitem', json).then(function (response){
			return response.data
		})
	};
	var getTrade = function(){
		return $http.get('/trades').then(function (response){
			return response.data
		})
	};
	return {
		getData: getData,
		postData: postData,
		getTrade: getTrade
	}
}]);
