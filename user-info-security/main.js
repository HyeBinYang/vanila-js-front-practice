// init
let users = [];

async function fetchUsers() {
  const response = await fetch("./data.json");
  return await response.json();
}

function hideUserData(user) {
  const nameArr = user.name.split("");
  nameArr[0] = "*";
  nameArr[2] = "*";
  return { name: nameArr.join(""), email: user.email.replace(/[a-zA-Z0-9]*@/g, "*****@") };
}

function renderData(data) {
  for (const user of data) {
    const $tbody = document.querySelector("tbody");
    const $tr = document.createElement("tr");
    const { name, email } = hideUserData(user);
    const $nameTd = document.createElement("td");
    $nameTd.textContent = name;
    $tr.appendChild($nameTd);
    const $emailTd = document.createElement("td");
    $emailTd.textContent = email;
    $tr.appendChild($emailTd);
    $tbody.appendChild($tr);
  }
}

async function init() {
  const data = await fetchUsers();
  users = [...data];
  renderData(data);
}

addEventListener("DOMContentLoaded", init);

// 개인정보 보호 checkbox
const allCheckbox = document.getElementById("all-checkbox");

function handleChangeHideCheckbox({ target: { checked } }) {
  const rows = document.querySelectorAll("tbody > tr");
  if (checked) {
    rows.forEach(($row, index) => {
      $row.children[0].textContent = users[index].name;
      $row.children[1].textContent = users[index].email;
    });
  } else {
    rows.forEach(($row, index) => {
      const { name, email } = hideUserData(users[index]);
      $row.children[0].textContent = name;
      $row.children[1].textContent = email;
    });
  }
}

allCheckbox.addEventListener("change", handleChangeHideCheckbox);

// 복사 막기
window.addEventListener("copy", (e) => {
  e.preventDefault();
  alert("복사하면 안됩니다!!");
});
