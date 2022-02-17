const spellContainer = document.querySelector('#spells');

async function get(url) {
  // plug-in your URL to fetch(Your-URL)
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function getDesc(url) {
  // plug-in your URL to fetch(Your-URL)
  const response = await fetch(url);
  const data = await response.json();
  const slug = url.split('/');
  const id = document.querySelector('#' + slug[slug.length - 1]);
  id.innerHTML = data?.desc[0];
  return data;
}

async function getItemById(url, id) {
  // Use the Api documentation to find out how to get a document by Id
  const response = await fetch(`${url}/${id}`);
  const data = await response.json();
  return data;
}

async function getItemByName(name, url) {
  const response = await fetch(`${url}/${name}`);
  const data = await response.json();
  return data;
}

function itemCard(title, slug, itemData) {
  return `
  <div class="card w-56 bg-base-300 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">${title}</h2>
      <div>
      <div class="card-actions">
      <label for="my-modal" class="btn btn-xs rounded btn-primary modal-button">details ...</label>
      <label onclick="console.log('${itemData}')
      )}')" class="btn btn-xs rounded btn-secondary modal-button">log</label>
      </div>
        <!-- Put this part before </body> tag -->
        <input type="checkbox" id="my-modal" class="modal-toggle">
        <div class="modal">
          <div class="modal-box">
            <h3 class="font-bold text-lg">${title}</h3>
            <p class="py-4">

            </p>
            <div class="modal-action">
              <label for="my-modal" class="btn btn-xs rounded-full absolute top-3 right-3">x</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

`;
}

async function spellList() {
  const spells = await get('https://www.dnd5eapi.co/api/spells');
  const list = spells.results.map(({ index, name }) => {
    const itemData = get(`https://www.dnd5eapi.co/api/spells/${index}`);
    return itemCard(name, index, itemData);
  });
  spellContainer.innerHTML = list.join('');
}
spellList();
