const site = "localhost"
const port = "8080"

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll("tr").forEach(row => {
    row.addEventListener('click', function() {
      console.log(`clicked on map id ${this.getAttribute('data-mapId')}`);
      const mapId = this.getAttribute('data-mapId');

      window.location.replace(`/test-map${mapId}`);
    });
  });

});
