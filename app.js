$(document).ready(() => {

  window.onscroll = () => {fixedTop();}
  
  const nav = $(".navbar");
  const navOffset = nav.offset().top;
  
  function fixedTop() {
    if(window.pageYOffset > navOffset) {
      nav.addClass("top-fixed");
    } else {
      nav.removeClass("top-fixed");
    }
  
  }
  const sideBar = $(".mobile-sidebar");
  const sideBtn = $("#nav-icon4");
  
  const sideOpen = () => {
    sideBar.css('width', '150px');
    sideBtn.css('marginLeft', '150px');
  };
  const sideClose = () => {
    sideBar.css('width', '0px');
    sideBtn.css('marginLeft', '0px');
  };
  
  $('#nav-icon4').click( () => {
    const navIcon4 = $('#nav-icon4');
    if(!navIcon4.hasClass('open')) {
      navIcon4.toggleClass('open');
      sideOpen();
    } else {
      navIcon4.toggleClass('open');
      sideClose();
    }
    
  })

  const mapDiv = document.querySelector('#map');
  const initMap = () => {
    const happyHwa = {lat:24.816500, lng:121.026738};
    const map = new google.maps.Map(mapDiv, {
      center: happyHwa,
      zoom: 18
    }); 
    const marker = new google.maps.Marker({position: happyHwa, map:map})
  }
  initMap();
})