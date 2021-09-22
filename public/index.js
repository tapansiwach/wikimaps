let map;
let latt;
let lngg;
let zoomm;

function setCoords(latt,lngg, zoomm){
  this.latt = latt;
  this.lngg = lngg;
  this.zoomm = zoomm
}

var GoogleMaps = GoogleMaps || {};

GoogleMaps.initMap = function () {
  return function () {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: this.latt, lng: this.lngg },
      zoom: this.zoomm,
    });
  }()
}
