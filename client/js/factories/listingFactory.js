angular.module('listings', []).factory('Listings', function($http) {
  var url = 'https://database-interface.herokuapp.com';
  // var url = 'http://localhost:8080'

  var methods = {
    getFlowers: function() {
      return $http.get(url+'/api/flowers');
    },

    create: function(listing) {
      return $http.post(url+'/api/listings', listing);
    },

    getSightings: function(comname) {
      return $http.get(url+'/api/flowers/'+comname)
    },

    delete: function(id) {
       return $http.delete(url+'/api/flowers/'+id);
    },

    getImage: function(query) {
      return $http.get('https://www.googleapis.com/customsearch/v1?key=API_KEY&cx=000341502786206353755:5khgo8zcvky&searchType=image&num=1&q='+query)
    },

    getLocations: function() {
      return $http.get(url+'/api/locations');
    },

    addSighting: function(sighting) {
      return $http.post(url+'/api/sightings', sighting);
    },

    updateFlower: function(flower) {
      return $http.put(url+'/api/flowers/', flower)
    }
  };

  return methods;
});
