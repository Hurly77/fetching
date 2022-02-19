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

function itemCard({ name, desc }) {
  return `
  <div class="card w-56 bg-base-300 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">${name}</h2>
      <div>
      <div class="card-actions">
      <label for="my-modal" class="btn btn-xs rounded btn-primary modal-button">details ...</label>

      </div>
        <!-- Put this part before </body> tag -->
        <input type="checkbox" id="my-modal" class="modal-toggle">
        <div class="modal">
          <div class="modal-box">
            <h3 class="font-bold text-lg">${name}</h3>
            <p class="py-4">
              ${desc}
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

async function spellList(limit) {
  let container = document.querySelector('#spells');
  const data = await get('https://www.dnd5eapi.co/api/spells');
  const spells = await data.results;
  const list = [];

  for (let i = 0; i < limit; i++) {
    const res = await fetch(
      `https://www.dnd5eapi.co/api/spells/${spells[i].index}`,
    );
    const data = await res.json();
    if (res.ok && data) {
      list.push(data);
    } else {
      console.log('hello');
    }
  }
  container.innerHTML = list
    .map((item) => {
      return itemCard(item);
    })
    .join('');
}
console.log(spellList(1));
