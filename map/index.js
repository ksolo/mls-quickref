(function () {
  // zoom level is the street level
  const zoom = 15;

  function geocodeAddress(address) {
    return new Promise(function(resolve, reject){
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ address }, function(results, status) {
        if (status === "OK") {
          resolve(results[0].geometry.location);
        } else {
          reject({error: status})
        }
      });
    });
  }

  function createMap(center) {
    return new google.maps.Map(document.getElementById("map"), {
      center, zoom
    });
  }

  function setMarker(map, position) {
    new google.maps.Marker({map, position});
  }

  function createMapWithMarker(position) {
    const map = createMap(position);
    setMarker(map, position);
  }

  // export the initMap function expected by the Google Map script
  window.initMap = function () {
    chrome.storage.local.get(["listing"], function(data) {
      if (!data.listing) return;
      geocodeAddress(data.listing.address).then(createMapWithMarker);
    });
  }
})();
