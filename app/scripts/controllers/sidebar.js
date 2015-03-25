
angular.module('dashApp')
.controller('SidebarCtrl', function ($scope, $location, program) {
    $scope.isActive = function(route) {
        return route === $location.path();
        console.log($location.path());
    }

});