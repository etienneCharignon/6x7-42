var score = 0;
var table = 7;
var multiplicateur = 1;
var proposition = "";
var audio;

var keyNumberMap = {
  224:0, 48: 0,
  38: 1, 49: 1,
  233:2, 50: 2,
  34: 3, 51: 3,
  39: 4, 52: 4,
  40: 5, 53: 5,
  167:6, 54: 6,
  232:7, 55: 7,
  33: 8, 56: 8,
  231:9, 57: 9
};

$(document).on('ready', function() {

  window.onkeypress=boucle;

  $('#score').on('click', function() {
    score = 20;
    boucle();
  });

  var $ardoise = $('#ardoise');
  $ardoise.on('click', cEstBon);

  $('#audio').bind('ended', finLectureArdoise);

  centre($ardoise)
  ecritOperationSurArdoise(multiplicateur);
  ecritResultatSurArdoise(table * multiplicateur);

  ecritScore();
});

function operationSuivante() {
  var multiplicateurCourant = multiplicateur;
  while(multiplicateur == multiplicateurCourant) {
    multiplicateur = Math.ceil(Math.random()*10);
  }
}

function ecritOperationSurArdoise(multiplicateur) {
  $('#operation').text(table + "x" + multiplicateur + "=");
  $("#audio").attr('src', multiplicateur + '.mp3');
  $('#resultat').text("");
}

function ecritResultatSurArdoise(resultat){
  $('#resultat').text(resultat);
}

function deplace(ardoise) {
  if(score > 9 && score < 20) {
    var anciennePosition = ardoise.css('top');
    while(ardoise.css('top') == anciennePosition) {
      ardoise.css('top', Math.random() * 80 + "%");
    }
  }
}

function centre($ardoise) {
  $ardoise.css('top', '40%');
}

function pourcentage(score) {
  return 1.0 / 30 * (30 - score);
}

function ecritScore() {
  $('#tableau').css('background-color', "rgba(255, 255, 255, "+ pourcentage(score) +")");
  $('#score').text(score);
}

function cEstBon() {
  document.getElementById('audio').play();
}

function finLectureArdoise() {
  var $ardoise = $('#ardoise');
  operationSuivante();
  proposition="";
  score += 1;
  ecritScore();
  centre($ardoise)
  boucle();
  deplace($ardoise);
}

function litClavier(e) {
  if(e && e.keyCode) {
    if(e.keyCode in keyNumberMap) {
      proposition += keyNumberMap[e.keyCode];
    }
  }
}

function boucle(e) {

  var ardoise = $('#ardoise');

  ecritOperationSurArdoise(multiplicateur);

  if(score < 20) {
    ecritResultatSurArdoise(table * multiplicateur);
    litClavier(e);
    if(!(table*multiplicateur).toString().startsWith(proposition)) {
      proposition = "";
    }
  }
  else {
    $('#resultat').css('color', "black");
    ardoise.unbind('click');
    litClavier(e);
    ecritResultatSurArdoise(proposition);
  }
  controle();
}

function controle() {
  if(verifiResultat()) {
    cEstBon();
  }
  if (proposition.length >= 2){
    proposition="";
  }
}

function verifiResultat() {
  return proposition == multiplicateur * table;
}
