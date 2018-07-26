function crearCarousel(selector,images){
  var carousel = '<div class="container col-sm-6">';
  carousel += "<div id='carousel1' class='carousel slide' data-ride='carousel'>";
  carousel += "<ol class='carousel-indicators'>";
  carousel += "<li data-target='#carousel1' data-slide-to='0' class='active'></li>";
  for(i=1; i<images.length; i++){
    carousel +="<li data-target='#carousel1' data-slide-to=" + i + "></li>";
  }
  carousel += "</ol>";
  carousel += "<div class='carousel-inner' role='listbox'>";
  carousel += "<div class='item active'>";
  carousel += "<img src='" + images[0].url + "' alt='imagen' class='img-responsive'>";
  carousel += "</div>";
  for(i=1;i<images.length;i++){
    carousel += "<div class='item'>";
    carousel += "<img src='" + images[i].url + "' alt='imagen' class='img-responsive'>";
    if(images[i].description != null){
      carousel += "<div class='carousel-caption'>";
      carousel += "<h3>" + images[i].description + "</h3>";
      carousel += "</div>";
    }
    carousel += "</div>" ;
  }
  // Controles
  carousel += "<a class='left carousel-control' href='#carousel1' role='button' data-slide='prev'>";
  carousel += "<span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span>";
  carousel += "<span class='sr-only'>Previous</span></a>";
  carousel += "<a class='right carousel-control controles' href='#carousel1' role='button' data-slide='next'>";
  carousel += "<span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span>";
  carousel += "<span class='sr-only'>Next</span></a>";
  carousel += "</div></div>";

  selector.append(carousel);
}


function show_accomodation(){
  var accomodation = accomodations[$(this).attr('no')];
//  console.log(accomodation);
  var nombre = accomodation.basicData.name;
  var lat = accomodation.geoData.latitude;
  var lon = accomodation.geoData.longitude;
  var description = accomodation.basicData.body;
  var cat = accomodation.extradata.categorias.categoria.item[1]['#text'];
  var subcat = accomodation.extradata.categorias.categoria
   .subcategorias.subcategoria.item[1]['#text'];

  var images = accomodation.multimedia.media;   //multimedia puede ser null
  $('#hotel').html("<h1 class='col-xs-12'>" + nombre + "</h1>");
  $('#hotel').append('<p class="col-xs-12">Tipo: ' + cat + ', categoría: ' + subcat + '</p>');
  $('#hotel').append("<h4 class='col-sm-6'>" + description + "</h4>");
  if(images.length > 1){
    selector = $('#hotel');
    crearCarousel(selector,images);
  } else if(images.length == 1){
    $('#hotel').append('<img src="' + images[0].url + 'class="img-responsive" alt="imagen">');
  }
  

  
}

function get_accomodations(){
  $.getJSON("data/alojamientos.json", function(data) {
    $('#get').html('').hide();
    accomodations = data.serviceList.service
//    $('#list').after('<h1>' + accomodations.length + '</h1>');
    var list = '<h4>Alojamientos<h4>'
    list += '<h5>Alojamientos encontrados: ' + accomodations.length
     + ' (haz click sobre uno para ver sus detalles y su localizacion en el mapa)</b></h5>'
    for (var i = 0; i < accomodations.length; i++) {
      list = list + '<li><a href="#" no=' + i + '>' + accomodations[i].basicData.title + '</li>';
    }
    list = list + '</ul>';
    $('#lista').html(list);
    $('#lista').show();
    $('a').click(show_accomodation);
  });
};

$(document).ready(function(){
	initMap();
	$('#get').click(get_accomodations);
});