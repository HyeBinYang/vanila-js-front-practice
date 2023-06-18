// init
async function fetchPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return await response.json();
}

function setTableBodyByData(data) {
  const $tbody = document.querySelector("tbody");

  for (const post of data) {
    const $tr = document.createElement("tr");
    const $userId = document.createElement("td");
    $userId.textContent = post.userId;
    $tr.appendChild($userId);

    const $id = document.createElement("td");
    $id.textContent = post.id;
    $tr.appendChild($id);

    const $title = document.createElement("td");
    $title.textContent = post.title;
    $tr.appendChild($title);

    const $body = document.createElement("td");
    $body.textContent = post.body;
    $tr.appendChild($body);

    $tbody.appendChild($tr);
  }
}

async function init() {
  const data = await fetchPosts();
  setTableBodyByData(data);
}

addEventListener("DOMContentLoaded", init);

// filter
const filterCheckbox = document.getElementById("filter-checkbox");

function handleChangeFilterCheckbox({ target: { checked } }) {
  const rows = document.querySelectorAll("tbody > tr");

  if (checked) {
    for (const row of rows) {
      if (row.children[0].textContent === "2") continue;
      row.style.display = "none";
    }
  } else {
    for (const row of rows) {
      row.style.display = "table-row";
    }
  }
}

filterCheckbox.addEventListener("change", handleChangeFilterCheckbox);
