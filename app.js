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
})
const mapDiv = document.querySelector('#map');
let happyHwa = {lat:24.816500, lng:121.026738};
const map = new google.maps.Map(mapDiv, {
  center: happyHwa,
  zoom: 17
}); 
const marker = new google.maps.Marker({
  position: happyHwa,
  map:map,
  draggable:true
});

const circleRange = new google.maps.Circle({
  strokeColor:'#313131',
  strokeOpacity:0.3,
  fillColor:'#fff',
  fillOpacity:0.4,
  map:map,
  center:happyHwa,
  radius:100
});
circleRange.bindTo('center', marker, 'position');
let bounds = circleRange.getBounds();

const checkAddress = $('#check-address');
const invalid = $("#invalid");
let adsLatLng;
let geocoder = new google.maps.Geocoder();
let addressMarker;

function checkRange() {
  if(bounds.contains(adsLatLng)) {
    checkAddress.text("你所處的地方在外送範圍內唷~!");
  } else {
    checkAddress.text(`很可惜~你所在的位置在服務範圍之外>"<`);
  }
}

const getGeocode = (geocoder) => {
  const address = $('#address').val();
  geocoder.geocode({'address':address}, (results, status) => {

    if(status ==='OK') {
      if(addressMarker) {
      addressMarker.setMap(null);
      }
       addressMarker = new google.maps.Marker({
        map:map,
        position:results[0].geometry.location,
        animation:google.maps.Animation.DROP
      });

      adsLatLng = results[0].geometry.location;

      checkRange();
    } else {
      invalid.text("請輸入有效地址!!");
      setTimeout(()=>{invalid.text('')}, 2000);
      console.log('Something is wrong!' + status);
    }
  });
}

$('#submit').on('click', function(){
  getGeocode(geocoder)}
  );
  
google.maps.event.addListener(marker, "dragend", () => {
  happyHwa = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
  bounds = circleRange.getBounds();
  checkRange()
})