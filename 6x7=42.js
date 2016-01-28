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

function operationSuivante() {
  $("#audio").attr('src', multiplicateur + '.mp3');
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

function afficheScore() {
  $('#tableau').css('background-color', "rgba(255, 255, 255, "+ pourcentage(score) +")");
  $('#score').text(score);
}

function lireArdoise(cb) {
  var audio = $("#audio");
  audio.unbind("ended");
  audio.bind('ended', cb);
  document.getElementById('audio').play();
}


function boucle(e) {

  var ardoise = $('#ardoise');
  ardoise.unbind("click");
  window.onkeypress=undefined;

  centre(ardoise)
  ecritOperationSurArdoise(multiplicateur);
  if(score < 20) {
    ardoise.on("click", function(e) {
        lireArdoise(function() { boucle(e); });
    });
    apprendre(ardoise);
    score += 1;
  }
  else {
    window.onkeypress=boucle;
    $('#resultat').css('color', "black");
    if(e.keyCode) {
      if(e.keyCode in keyNumberMap) {
        proposition += keyNumberMap[e.keyCode];
        ecritResultatSurArdoise(proposition);
        var cEstBon = controle();
        if(cEstBon || proposition.length >= 2) {
          if(cEstBon){
            operationSuivante();
            score += 1;
            lireArdoise(function() {
              proposition="";
              ecritOperationSurArdoise(multiplicateur);
            });
          }
          else {
              proposition="";
          }
        }
      }
    }
  }
  afficheScore();
}

function apprendre(ardoise) {
  ecritResultatSurArdoise(table * multiplicateur);
  deplace(ardoise);
  operationSuivante();
}

function controle() {
  return proposition == multiplicateur * table;
}
