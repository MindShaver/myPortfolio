angular.module("wikiApp", [])
  .controller("wikiController", function($scope, $http) {

    $scope.items = [];
    $scope.searchText = "Egypt";

    $scope.clear = function() {
      $scope.searchText = "";
      $scope.items = [];
    }

    $scope.getData = function() {
      $scope.items = [];
      var query = $scope.searchText;

      var api = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=5&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="
      var URL = 'https://en.wikipedia.org/?curid=';

      $http.jsonp(api + query + "&callback=JSON_CALLBACK")
        .success(function(json) {
          items = json.query.pages;
          angular.forEach(items, function(i, j) {

            var dataSet = {
              title: i.title,
              body: i.extract,
              URL: URL + i.pageid
            }

            $scope.items.push(dataSet);
            console.log(items)
          })

        })
    }

  });