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

const checkAddress = $('#check-address');

const invalid = $("#invalid");

let happyHwa = {lat:24.816500, lng:121.026738};

let LatLngList = [happyHwa];

const extendBounds = new google.maps.LatLngBounds();

const computeDistanceBetween = google.maps.geometry.spherical;

let addressMarker;


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

const input = document.getElementById('autoinput');

const autoSearch = new google.maps.places.Autocomplete(input);

autoSearch.setComponentRestrictions(
  {'country': ['tw']});


function checkRange(computeDistance, addsMarker, markerCenter) {
  if(100 > computeDistance.computeDistanceBetween(addsMarker.getPosition(), markerCenter.getPosition())) {
    checkAddress.text("你所處的地方在外送範圍內唷~!");
  } else {
    checkAddress.text(`很可惜~你所在的位置在服務範圍之外>"<`);
  }
}


function setAddressMarker(location) {
  if(addressMarker) {
    addressMarker.setMap(null);
    }
     addressMarker = new google.maps.Marker({
      map:map,
      position:(Array.isArray(location)) ? location[0].geometry.location : location,
      animation:google.maps.Animation.DROP
    });
    LatLngList.push(addressMarker.position);
    for(let i = 0; i < LatLngList.length; i++) {
      extendBounds.extend(LatLngList[i]);
    }
    map.fitBounds(extendBounds);
    checkRange(computeDistanceBetween, addressMarker,marker);
  }
  
  
  function invalidMessage() {
    invalid.text('請輸入有效的地址!');
    setTimeout(() => invalid.text(''), 2500);
  }

  
  
  google.maps.event.addListener(marker, "dragend", () => {
    happyHwa = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
  bounds = circleRange.getBounds();
  if(addressMarker) {
    checkRange(computeDistanceBetween,addressMarker, marker);
  }
})

autoSearch.addListener('place_changed', function() {
  const place = autoSearch.getPlace();
  if(!place.geometry) {
    invalidMessage();
  } else {
    setAddressMarker(place.geometry.location)
    }
})
