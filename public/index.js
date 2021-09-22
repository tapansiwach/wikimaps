let map;
let latt;
let lngg;
let zoomm;

function setCoords(latt, lngg, zoomm) {
  this.latt = latt;
  this.lngg = lngg;
  this.zoomm = zoomm
}

// var GoogleMaps = GoogleMaps || {};

// GoogleMaps.initMap = function() {
//   return function() {
//     map = new google.maps.Map(document.getElementById("map"), {
//       center: { lat: this.latt, lng: this.lngg },
//       zoom: this.zoomm,
//     });

//     // Create the initial InfoWindow.
//     let infoWindow = new google.maps.InfoWindow({
//       content: "Click the map to get Lat/Lng!",
//       position: myLatlng,
//     });

//     infoWindow.open(map);

//   }()
// }


function initMap() {
  const myLatlng = { lat: this.latt, lng: this.lngg };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: this.zoomm,
    center: myLatlng,
  });
  // Create the initial InfoWindow.
  let infoWindow = new google.maps.InfoWindow({
    content: "Click the map to get Lat/Lng!",
    position: myLatlng,
  });

  infoWindow.open(map);
  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    console.log(mapsMouseEvent.latLng.toJSON());
    // Close the current InfoWindow.
    infoWindow.close();
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    );
    infoWindow.open(map);
  });
}

