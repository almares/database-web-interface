angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getFlowers: function() {
      return $http.get('http://localhost:8080/api/flowers');
    },

    create: function(listing) {
      return $http.post('http://localhost:8080/api/listings', listing);
    },

    getSightings: function(comname) {
      return $http.get('http://localhost:8080/api/flowers/'+comname)
    },

    delete: function(id) {
       return $http.delete('http://localhost:8080/api/flowers/'+id);
    },

    getImage: function(query) {
      return $http.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyDCk9YpTrftPCzUJ7Y5EsFMl9i4LwsQ9SA&cx=000341502786206353755:5khgo8zcvky&searchType=image&num=1&q='+query)
    },

    getLocations: function() {
      return $http.get('http://localhost:8080/api/locations');
    },

    addSighting: function(sighting) {
      return $http.post('http://localhost:8080/api/sightings', sighting);
    },

    updateFlower: function(flower) {
      return $http.put('http://localhost:8080/api/flowers/', flower)
    }
  };

  return methods;
});
