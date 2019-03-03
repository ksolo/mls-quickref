(function () {
  let center;

  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 15
    });
  }

  function setCenterFromStorage() {
    chrome.storage.local.get("location", function(data) {
      if (!data) return;

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({address: data.location.address}, function(results, success) {
        if (success === "OK") {
          map.setCenter(results[0].geometry.location);
          new google.maps.Marker({
            map,
            position: results[0].geometry.location
          })
        }
      });
    });
  }

  window.initMap = initMap;

  setTimeout(setCenterFromStorage, 10);
})();
