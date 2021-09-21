function renderMapsFromData(collabs, map) {
  const parsedDate = map.created_on.getFullYear() + '/' + map.created_on.getMonth() + '/' +
    map.created_on.getDate();
  let output =  `
  <tr>
    <td>`;

  for (const user of collabs) {
    output += `<img class="rounded-circle me-2" width="30" height="30" src="${user.profile_pic_url}"></img>`
  };
    output += `</td>
    <td>${map.title}</td>
    <td>${map.city}</td>
    <td>105</td>
    <td>${parsedDate}<br></td>
    <td><a class="btn btn-primary btn-icon-split" role="button"><span
                class="text-white-50 icon"><i
                    class="fas fa-share-alt"></i></span><span
                class="text-white text">Share</span></a></td>
</tr>
`;

return output;
}

module.exports = renderMapsFromData;
