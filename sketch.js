//Trabalhando com liga-desliga de imagens
var imageUrl;
let largura = 20;
let altura = 10;
let escala = 1;
let visitas;
var canvas;

function preload() {
  visitas = loadJSON("./visitas.json");
}


var icone = L.icon({
  iconUrl: './marker-icon.png',
  shadowUrl: './marker-shadow.png',
  iconSize: [18, 95], // size of the icon
  shadowSize: [20, 95], // size of the shadow
  iconAnchor: [9, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [2, 94], // the same for the shadow
  popupAnchor: [0, -79] // point from which the popup should open relative to the iconAnchor
})

function setup() {

  //noCanvas();

  //=====localização

  var map = L.map('mapid').setView([51.505, -0.09], 13);
  map.locate({
    setView: [31, 35],
    maxZoom: 13
  });

  map.on('locationfound', onLocationFound);


  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  //+++++++

  function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
      .bindPopup("Você!").openPopup();

    L.circle(e.latlng, radius).addTo(map);
  }

  function onLocationError(e) {
    alert(e.message);
  }

  map.on('locationerror', onLocationError);


  //^^^^^^^^^^^^^^^^^^^^^^^
  //                        | | |
  //Mostra visitas à página V V V

  //console.log(visitas);

  var pos = visitas.posicao;
  //console.log(pos[10]);

  for (var i = 0; i < pos.length; i++) {
    var time = pos[i].timestamp;
    var tempo = new Date(time);
    var year = tempo.getFullYear();
    var month = tempo.getMonth() + 1; // beware: January = 0; February = 1, etc.
    var day = tempo.getDate();
    var hora = tempo.getHours();
    var min = tempo.getMinutes();
    L.marker([pos[i].lat, pos[i].lon]).addTo(map).bindPopup(day + '/' + month).openPopup();
  }

} //setup