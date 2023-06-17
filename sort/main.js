// init
const $container = document.getElementById("container");

async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments");
  return await response.json();
}

function appendTableRow($parent, $element, content) {
  $element.textContent = content;
  $parent.appendChild($element);
}

function setTableByData(data) {
  const $table = document.querySelector("#container > table");
  const $tbody = document.querySelector("#container > table > tbody");

  // body
  data.forEach((obj) => {
    const { id, name, email } = obj;
    const $bodyTr = document.createElement("tr");
    appendTableRow($bodyTr, document.createElement("td"), id);
    appendTableRow($bodyTr, document.createElement("td"), name);
    appendTableRow($bodyTr, document.createElement("td"), email);
    $tbody.appendChild($bodyTr);
  });

  $table.appendChild($tbody);
}

async function init() {
  const data = await fetchUsers();
  setTableByData(data);
}

addEventListener("DOMContentLoaded", init);

// Sort
const $idHeader = document.getElementById("id-header");
const $nameHeader = document.getElementById("name-header");
const $usernameHeader = document.getElementById("email-header");
const sortOptions = {
  id: "desc",
  name: null,
  email: null,
};

function removeOriginRows() {
  const $tbody = document.querySelector("tbody");
  while ($tbody.firstChild) {
    $tbody.removeChild($tbody.firstChild);
  }
}

function appendNewRows(rowsArr) {
  const $tbody = document.querySelector("tbody");
  for (const row of rowsArr) {
    $tbody.appendChild(row);
  }
}

function sortByHeader(header) {
  const $rows = document.querySelectorAll("tbody > tr");
  const rowsArr = Array.from($rows);

  switch (header) {
    case "id":
      const { id } = sortOptions;

      sortOptions.id = id === "desc" ? "asc" : "desc";
      sortOptions.name = null;
      sortOptions.username = null;

      rowsArr.sort((a, b) => {
        const numberContentA = Number(a.children[0].textContent);
        const numberContentB = Number(b.children[0].textContent);

        return sortOptions.id === "desc" ? numberContentA - numberContentB : numberContentB - numberContentA;
      });

      return rowsArr;
    case "name":
      const { name } = sortOptions;

      sortOptions.id = null;
      sortOptions.name = !name || name === "desc" ? "asc" : "desc";
      sortOptions.username = null;

      if (sortOptions.name === "desc") {
        rowsArr.sort((a, b) => {
          const nameA = a.children[1].textContent;
          const nameB = b.children[1].textContent;

          if (nameA > nameB) return -1;
          else if (nameA < nameB) return 1;
          else return 0;
        });
      } else {
        rowsArr.sort((a, b) => {
          const nameA = a.children[1].textContent;
          const nameB = b.children[1].textContent;

          if (nameA > nameB) return 1;
          else if (nameA < nameB) return -1;
          else return 0;
        });
      }

      return rowsArr;
    case "email":
      const { email } = sortOptions;

      sortOptions.id = null;
      sortOptions.name = null;
      sortOptions.email = !email || email === "desc" ? "asc" : "desc";

      if (sortOptions.email === "desc") {
        rowsArr.sort((a, b) => {
          const emailA = a.children[2].textContent;
          const emailB = b.children[2].textContent;

          if (emailA > emailB) return -1;
          else if (emailA < emailB) return 1;
          else return 0;
        });
      } else {
        rowsArr.sort((a, b) => {
          const emailA = a.children[2].textContent;
          const emailB = b.children[2].textContent;

          if (emailA > emailB) return 1;
          else if (emailA < emailB) return -1;
          else return 0;
        });
      }

      return rowsArr;
  }
}

function handleClickHeader(header) {
  return () => {
    const sortedArr = sortByHeader(header);
    removeOriginRows();
    appendNewRows(sortedArr);
  };
}

$idHeader.addEventListener("click", handleClickHeader("id"));
$nameHeader.addEventListener("click", handleClickHeader("name"));
$usernameHeader.addEventListener("click", handleClickHeader("email"));
