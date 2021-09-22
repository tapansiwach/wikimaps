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
const lati = -34.397;
const longi = 150.644

GoogleMaps.initMap = function () {
  return function () {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: this.latt, lng: this.lngg },
      zoom: this.zoomm,
    });
  }()
}

function initMapOriginal() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

function returnInit() {
}

function initialize() {
  return returnInit;
}
