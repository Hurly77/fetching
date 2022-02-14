const page = document.querySelector('#page');
const items = [
  {
    imgUrl: 'https://flxt.tmsimg.com/assets/p8204516_b_h8_ap.jpg',
    title: 'Sherlock Holmes',
    description:
      'once you have eliminated the imposable not matter how unlikely or improbably whatever remains must be the truth.',
  },
];

async function get(url) {
  // plug-in your URL to fetch(Your-URL)
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function getItemById(url, id) {
  // Use the Api documentation to find out how to get a document by Id
  const response = await fetch(`${url}/${id}`);
  const data = await response.json();
  return data;
}

async function getItemByName(name, url) {
  const response = await fetch(`${url}/${id}`);
  const data = await response.json();
  return data;
}

function itemCard(imgUrl, title, description) {
  return `
  <div class="h-96 w-96 bg-gray-200  rounded-lg overflow-hidden">
    <img src='${imgUrl}' class="w-full h-auto bg-black"/>
    <div class="p-10">
      <h1 class="text-2xl">${title}</h1>
      <p class="text-gray-500">${description}</p>
    </div>
  </div>
`;
}

function displayListOfItems(items) {
  return `
      <div>
        ${items.map((item) =>
          itemCard(
            item.imgUrl,
            item.title,
            item.description,
          ),
        )}
      </div>
    `;
}

page.innerHTML = displayListOfItems(items);
