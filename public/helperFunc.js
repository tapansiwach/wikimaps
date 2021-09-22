
let mapId = 1;
let modal = document.getElementById('exampleModal');
let modalInputform;

function shareFunc(map_id) {
  console.log(`Clicked the Share button for id: ${map_id}`);
  mapId = map_id;

  var modalTitle = modal.querySelector('#exampleModalLabel');
  modalInputform = modal.querySelector('#exampleInputEmail1');
  // Clear the form's email value every time the modal pops up.
  modalInputform.value = '';

  modalTitle.textContent = `Share map #${map_id}!`;
  // var modalBodyInput = mod.querySelector('.modal-body input')
}

function addCollaborator() {
  console.log(`addCollaborator() called from save button for map#${mapId}`)

  console.log(`Here we can do a INSERT INTO authorizations WHERE email = ${modalInputform.value}`);
  modal.querySelector('#form_map_id').value=mapId;
  modal.querySelector('#exampleModalData').submit();

}
