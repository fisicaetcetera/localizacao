let url;
var Lat, Lon;
let city;
let estado;
let country;
function setup(){
   createCanvas(100,50);

   fetch('https://api.geoapify.com/v1/ipinfo?apiKey=df56ea8b09b64183882faaf437ac2620')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        Lat = data.location.latitude;
        Lon = data.location.longitude;
        console.log(Lat, Lon);
        city = data.city.name;
        estado = data.state.name;
        country = data.country.name;
        continent = data.continent.name;
        createP('Lat: ' + Lat + ' Lon: ' + Lon);
        createP(city +', '+ estado+', '+ country+', '+ continent);
        New();
      }  
    )
    function New(){
  console.log(Lat, Lon);
  part1 = 'https://api.open-meteo.com/v1/forecast?';
  part2 = 'latitude=' + Lat +'&longitude=' + Lon;
  part3 = '&current=temperature_2m,windspeed_10m';
  url = part1 + part2;
  console.log(url);
  loadJSON(url, gotData);
  function gotData(data){
  console.log(data);
  }
  }//New
  }//setup
