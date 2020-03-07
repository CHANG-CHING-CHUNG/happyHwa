window.onscroll = () => {fixedTop();}

const nav = document.querySelector(".navbar");
const navOffset = nav.offsetTop;

function fixedTop() {
  if(window.pageYOffset > navOffset) {
    nav.classList.add("top-fixed");
  } else {
    nav.classList.remove("top-fixed");
  }

}
const sideBar = document.querySelector(".mobile-sidebar");
const mainContent = document.querySelector("#main-content");

const sideOpen = () => {
  sideBar.style.width = "150px";
  mainContent.style.marginLeft ="150px"
};
const sideClose = () => {
  sideBar.style.width = "0px";
  mainContent.style.marginLeft ="0"
};