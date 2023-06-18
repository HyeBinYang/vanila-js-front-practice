const topBtn = document.getElementById("top-btn");

function setTopBtnDisplayByScrollPos() {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  topBtn.style.display = scrollTop + clientHeight >= scrollHeight ? "block" : "none";
}

function handleScrollWindow() {
  setTopBtnDisplayByScrollPos();
}

function moveScrollToTop() {
  document.documentElement.scrollTo({
    top: 0,
  });
}

function handleClickTopButton() {
  moveScrollToTop();
}

window.addEventListener("scroll", handleScrollWindow);
topBtn.addEventListener("click", handleClickTopButton);
