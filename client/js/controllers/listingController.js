angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getFlowers().then(function(response) {
      $scope.listings = response.data;
      $scope.curListing = response.data[0];
      $scope.getSightings(response.data[0]);
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    Listings.getLocations().then(function(response) {
      $scope.locations = [];
      response.data.forEach((location) => {
        $scope.locations.push(location.LOCATION);
      });
      buildDropDown($scope.locations);
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.addListing = function() {
     // Create a newListing object and add all attributes
     var newListing = {};
     newListing.code = $scope.newListing.code;
     newListing.name = $scope.newListing.name;
     newListing.address = $scope.newListing.address;

     $scope.listings.push(newListing);
     Listings.create(newListing);

    };

    $scope.deleteListing = function(index) {
     var listing = $scope.listings[index];

     Listings.delete(listing._id);

    $scope.listings.splice(index, 1);
    };

    $scope.showDetails = function(listing) {
      $scope.curListing = listing;
      $scope.getSightings(listing);
    };

    $scope.getSightings = function(listing) {
      Listings.getSightings(listing.COMNAME).then((res) => {
        $scope.sightings = res.data;
      });
    };

    $scope.submit = function() {
      var selected = $('#dropdown_coins')[0].textContent;
      var found = false;

      $scope.locations.forEach((location) => {
        if (selected == location) {
          found = true;
        }
      });

      if (found) {
        var sighting = {};
        sighting.name = $scope.curListing;
        sighting.person = $scope.newSighting.name;
        sighting.location = selected;
        sighting.sighted = $scope.newSighting.date.convert();

        Listings.addSighting(sighting);
      }
    };
  }
]);

Date.prototype.convert = function() {
  var m = this.getMonth() + 1;
  var d = this.getDay();

  return [this.getFullYear(),
        (m>9 ? '' : '0') + m,
        (d>9 ? '' : '0') + d
      ].join('-');
};

//Find the input search box
let search = document.getElementById("searchCoin")

//Find every item inside the dropdown
let items = document.getElementsByClassName("dropdown-item")
function buildDropDown(values) {
    let contents = []
    for (let name of values) {
    contents.push('<input type="button" class="dropdown-item" type="button" value="' + name + '"/>')
    }
    $('#menuItems').append(contents.join(""))

    //Hide the row that shows no items were found
    $('#empty').hide()
}

//Capture the event when user types into the search box
window.addEventListener('input', function () {
    filter(search.value.trim().toLowerCase())
})

//For every word entered by the user, check if the symbol starts with that word
//If it does show the symbol, else hide it
function filter(word) {
    let length = items.length
    let collection = []
    let hidden = 0
    for (let i = 0; i < length; i++) {
    if (items[i].value.toLowerCase().startsWith(word)) {
        $(items[i]).show()
    }
    else {
        $(items[i]).hide()
        hidden++
    }
    }

    //If all items are hidden, show the empty view
    if (hidden === length) {
    $('#empty').show()
    }
    else {
    $('#empty').hide()
    }
}

//If the user clicks on any item, set the title of the button as the text of the item
$('#menuItems').on('click', '.dropdown-item', function(){
    $('#dropdown_coins').text($(this)[0].value)
    $("#dropdown_coins").dropdown('toggle');
})
