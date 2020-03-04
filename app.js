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