var app = angular.module('nwind_spa', []);

app.controller('TaskListController', function($scope, $http) {

    $scope.getTasks = function(){
      $http.get('/task')
      .then(function(response){
        $scope.tasks = response.data;
      });
    };

    $scope.inputs = {
      name: '',
      priority: ''
    };

    $scope.addTask = function(){
      $http.post('/task', $scope.inputs)
      .then(function(){
        $scope.getTasks();
      });
    };

    $scope.deleteTask = function(task){
      var toDelete =  $scope.tasks[task]._id;
      $http.delete('/task/' + toDelete)
      .then(function(response){
        $scope.getTasks();
      });
    };

    $scope.getTasks();

});
