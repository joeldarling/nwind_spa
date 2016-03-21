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

    $scope.moveTaskUp = function(task){

      var newPriority = $scope.tasks[task-1].priority;

      if(newPriority>1)
        newPriority--;

      $scope.changePriority($scope.tasks[task], newPriority);

    };
    $scope.moveTaskDown = function(task){
      var newPriority = $scope.tasks[task+1].priority + 1;

      $scope.changePriority($scope.tasks[task], newPriority);

    };

    $scope.changePriority = function(item, priority){
      $http.put('/task/' + item._id + '/' + priority)
      .then(function(){
        $scope.getTasks();
      });

    };

    $scope.getTasks();

});
