let map;
// let mapid;
// let latt;
// let lngg;
// let zoomm;

function initMap() {

  const element = document.getElementById("map");
  let data = element.getAttribute("data-map");
  data = JSON.parse(data);

  console.log(data);
  const mapLatLng = { lat: data.lat, lng: data.long };

  const map = new google.maps.Map(element, {
    zoom: data.zoom,
    center: mapLatLng,
  });
  // // Create the initial InfoWindow.
  // let infoWindow = new google.maps.InfoWindow({
  //   content: `Add a Pin by clicking the map`,
  //   position: mapLatLng,
  // });

  // infoWindow.open(map);

  // display the pins on the map
  for (const pin of data.pins) {
    const marker = new google.maps.Marker({
      position: { lat: pin.lat, lng: pin.long },
      map: map
    });

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: `
        <h2>${pin.title}</h2>
        <img src="${pin.img_url}" alt="">
        <p>${pin.description}</p>
        `,
      })

      infoWindow.open(map, marker);
    });

  }

  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    // infoWindow.close();

    const coords = mapsMouseEvent.latLng.toJSON();
    console.log(coords);

    // const marker = new google.maps.Marker({
    //   position: coords,
    //   map,
    //   title: "New Pin",
    // });

    // Close the current InfoWindow.
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
      content: `
      <form class="new-pin" method="post" action="/new-pin">
        <div class="mb-3"><input class="form-control " type="text" id="newPinTitle" aria-describedby="title"
            placeholder="Title..." name="title"></div>
        <div class="mb-3"><input class="form-control " type="text" id="newPinLatitude"
            aria-describedby="latitude" placeholder="Latitude..." name="latitude" value="${coords.lat}"></div>
        <div class="mb-3"><input class="form-control " type="text" id="newPinLongitude"
            aria-describedby="longitude" placeholder="Longitude..." name="longitude" value="${coords.lng}"></div>
        <div class="mb-3"><input class="form-control " type="text" id="newPinDescription"
            aria-describedby="description" placeholder="Description..." name="description"></div>
        <div class="mb-3"><input class="form-control " type="text" id="newPinImageUrl"
            aria-describedby="image-url" placeholder="Url for Image..." name="image_url"></div>
        <input type="hidden" name="map_id" value="${this.id}">

        <button class="btn btn-primary d-block btn-user w-100" type="submit">Create
          Pin</button>
        <hr>
      </form>
      `,
    });

    // infoWindow.setContent(
    //   JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    // );
    infoWindow.open(map);
  });
}
