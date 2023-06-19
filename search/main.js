// init
async function fetchPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return await response.json();
}

function renderRowsByData(data) {
  const $tbody = document.querySelector("tbody");

  for (const post of data) {
    const $tr = document.createElement("tr");
    const $titleTd = document.createElement("td");
    $titleTd.textContent = post.title;
    $tr.appendChild($titleTd);
    const $bodyTd = document.createElement("td");
    $bodyTd.textContent = post.body;
    $tr.appendChild($bodyTd);

    $tbody.appendChild($tr);
  }
}

async function init() {
  const posts = await fetchPosts();
  renderRowsByData(posts);
}

addEventListener("DOMContentLoaded", init);

// search && search highlight && search history
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchedHistory = [];

function renderMatched(value) {
  const $tableRows = document.querySelectorAll("tbody > tr");
  const rowsArr = Array.from($tableRows);

  for (const $row of rowsArr) {
    const title = $row.children[0].textContent;

    if (title.includes(value)) {
      if (value) {
        const re = new RegExp(value, "g");
        let matchArr;
        let first = 0;
        let last = 0;
        let resultString = "";

        while ((matchArr = re.exec(title)) !== null) {
          last = matchArr.index;
          resultString += `${title.substring(first, last)}<strong class="highlighting">${matchArr[0]}</strong>`;
          first = re.lastIndex;
        }

        resultString += title.substring(first, $row.children[0].textContent.length);
        $row.children[0].innerHTML = resultString;
      } else {
        const removedHighlightStr = title.replace(/<strong*/, "");
        $row.children[0].innerHTML = removedHighlightStr;
      }

      $row.style.display = "table-row";
    } else {
      $row.style.display = "none";
    }
  }
}

function renderHistory() {
  const $searchHistoryList = document.getElementById("search-history-list");

  while ($searchHistoryList.firstChild) {
    $searchHistoryList.removeChild($searchHistoryList.firstChild);
  }

  for (const text of searchedHistory) {
    const $li = document.createElement("li");
    $li.textContent = text;
    $searchHistoryList.appendChild($li);
  }
}

function pushSearchHistory(value) {
  const idx = searchedHistory.indexOf(value);
  if (idx !== -1) searchedHistory.splice(idx, 1);
  searchedHistory.unshift(value);
  if (searchedHistory.length > 5) searchedHistory.pop();
  renderHistory();
}

function handleKeyupSearchInput({ target: { value } }) {
  renderMatched(value);
}

function handleClickSearch() {
  pushSearchHistory(searchInput.value);
  searchInput.value = "";
}

searchInput.addEventListener("keyup", handleKeyupSearchInput);
searchBtn.addEventListener("click", handleClickSearch);
