var score = 0;
var table = 7;
var multiplicateur = 1;
var proposition = "";
var audio;

var keyNumberMap = {};
keyNumberMap[224] = 0;
keyNumberMap[38] = 1;
keyNumberMap[233] = 2;
keyNumberMap[34] = 3;
keyNumberMap[39] = 4;
keyNumberMap[40] = 5;
keyNumberMap[167] = 6;
keyNumberMap[232] = 7;
keyNumberMap[33] = 8;
keyNumberMap[231] = 9;

keyNumberMap[48] = 0;
keyNumberMap[49] = 1;
keyNumberMap[50] = 2;
keyNumberMap[51] = 3;
keyNumberMap[52] = 4;
keyNumberMap[53] = 5;
keyNumberMap[54] = 6;
keyNumberMap[55] = 7;
keyNumberMap[56] = 8;
keyNumberMap[57] = 9;

$(document).ready(function() {
  $('#score').on('click', function() {
    score = 20;
    boucle({keyCode:999});
  });
  $('#ardoise').on('click', function(e) {
      litArdoise(function() { boucle(e); });
  });
  window.onkeypress=boucle;
  init();
});

function operationSuivante() {
  var multiplicateurCourant = multiplicateur;
  while(multiplicateur == multiplicateurCourant) {
    multiplicateur = Math.ceil(Math.random()*10);
  }
}

function ecritOperationSurArdoise(multiplicateur) {
  $('#operation').text(table + "x" + multiplicateur + "=");
  $('#resultat').text("");
}

function ecritResultatSurArdoise(resultat){
  $("#audio").attr('src', multiplicateur + '.mp3');
  $('#resultat').text(resultat);
}

function deplace(ardoise) {
  if(score > 9) {
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

function litArdoise(cb) {
  var audio = $("#audio");
  audio.unbind('ended');
  audio.bind('ended', function() {
    operationSuivante();
    score += 1;
    cb();
    ecritScore();
  });
  document.getElementById('audio').play();
}

function litClavier(e) {
  if(e && e.keyCode) {
    if(e.keyCode in keyNumberMap) {
      proposition += keyNumberMap[e.keyCode];
    }
  }
}

function init() {
  var ardoise = $('#ardoise');
  centre(ardoise)
  ecritOperationSurArdoise(multiplicateur);
  ecritResultatSurArdoise(table * multiplicateur);
  ecritScore();
}

function boucle(e) {

  var ardoise = $('#ardoise');

  centre(ardoise)
  ecritOperationSurArdoise(multiplicateur);

  if(score < 20) {
    ecritResultatSurArdoise(table * multiplicateur);
    deplace(ardoise);
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
  var cEstBon = verifiResultat();
  if(cEstBon || proposition.length >= 2) {
    if(cEstBon){
      litArdoise(function() {
        proposition="";
        boucle();
      });
    }
    else {
        proposition="";
    }
  }
}

function verifiResultat() {
  return proposition == multiplicateur * table;
}
