angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {

  $scope.calc = function(obj){
    var obj = [
  {name:obj.name,rs:obj.money,result:[]},
  {name:obj.name1,rs:obj.money1,result:[]},
  {name:obj.name2,rs:obj.money2,result:[]},
  {name:obj.name3,rs:obj.money3,result:[]},
  //{name:"Jay",rs:1500,result:[]},
];
var avg = 0;
var neutral = [];

_.each(obj,function(item){avg+=item.rs});    // Total 

var newVal = _.each(obj, function(item){ item.rs = item.rs-(avg/obj.length)});   // Average with json assign

neutral.push(_.findWhere(newVal, {'rs':0}));  // Talley user

newVal = _.without(newVal, _.findWhere(newVal, {rs: 0})); // Remove Talley user from json

var finalVal = _.each(newVal, function(item){
    
    var credited    = multiplemax(newVal,'rs')[0].rs;
    var minObj      = multiplemin(newVal,'rs')[0];
    var maxObj      = multiplemax(newVal,'rs')[0];
    
    if(maxObj.rs <= Math.abs(minObj.rs)){
            minObj.rs           = -(Math.abs(maxObj.rs - Math.abs(minObj.rs)));
            maxObj.result.push({'give' : minObj.name, 'money': maxObj.rs});
            maxObj.rs           = "null"; 
    }else {
            maxObj.rs           = (Math.abs(maxObj.rs - Math.abs(minObj.rs)));
            maxObj.result.push({'give' : minObj.name, 'money': Math.abs(minObj.rs)});
            minObj.rs           = "null"; 
    }
});

function multiplemin(arr, compare) {
  var min = _.min(arr, function(v){return v[compare]});
  return _.filter(arr, function(v){return v[compare]==min[compare]});
}
function multiplemax(arr, compare) {
  var max = _.max(arr, function(v){return v[compare]});
  return _.filter(arr, function(v){return v[compare]==max[compare]});
}
finalVal = _.each(finalVal,function(item){
  item.result = _.without(item.result, _.findWhere(item.result, {money:-0}))
});
console.log(finalVal);

$scope.lists = finalVal;


  }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
