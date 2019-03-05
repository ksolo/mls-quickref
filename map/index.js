(function () {
  // zoom level is the street level
  const zoom = 15;

  function createMap(center) {
    return new google.maps.Map(document.getElementById("map"), {
      center, zoom
    });
  }

  function setMarker(map, position) {
    new google.maps.Marker({map, position});
  }

  function initMap() {
    chrome.storage.local.get(["listing"], function(data) {
      if (!data) return;

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({address: data.listing.address}, function(results, success) {
        if (success === "OK") {
          const position = results[0].geometry.location;
          const map = createMap(position);
          setMarker(map, position);
        }
      });
    });
  }

  window.initMap = initMap;
})();
