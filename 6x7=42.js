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

  afficheurScore.onclick = function() {
    score = 20;
    passeALOperationSuivante();
  };

  ardoise.onclick = cEstBon;

  $('#audio').bind('ended', passeALOperationSuivante);

  centreArdoise()
  ecritOperationSurArdoise(multiplicateur);
  ecritResultatSurArdoise(table * multiplicateur);

  ecritScore();
});

function choisiNouvelleOperation() {
  var multiplicateurCourant = multiplicateur;
  while(multiplicateur == multiplicateurCourant) {
    multiplicateur = Math.ceil(Math.random()*10);
  }
}

function ecritOperationSurArdoise(multiplicateur) {
  operation.innerHTML = table + "x" + multiplicateur + "=";
  document.getElementById('audio').src = multiplicateur + '.mp3';
  resultat.innerHTML = "";
}

function ecritResultatSurArdoise(text){
  resultat.innerHTML = text;
}

function deplaceArdoise() {
  if(score > 9 && score < 20) {
    var anciennePosition = ardoise.style.top;
    while(ardoise.style.top == anciennePosition) {
      ardoise.style.top = Math.random() * 80 + '%';
    }
  }
}

function centreArdoise() {
  ardoise.style.top = '40%';
}

function pourcentage(score) {
  return 1.0 / 30 * (30 - score);
}

function ecritScore() {
  tableau.style.backgroundColor = 'rgba(255, 255, 255, '+ pourcentage(score) +')';
  afficheurScore.innerHTML = score;
}

function cEstBon() {
  document.getElementById('audio').play();
  // à la fin de la lecture de l'ardoise, on passe à l'oppération suivante
}

function passeALOperationSuivante() {
  choisiNouvelleOperation();
  proposition="";
  score += 1;
  ecritScore();
  centreArdoise()
  boucle();
  deplaceArdoise();
}

function litClavier(e) {
  if(e && e.keyCode) {
    if(e.keyCode in keyNumberMap) {
      proposition += keyNumberMap[e.keyCode];
    }
  }
}

function boucle(e) {

  ecritOperationSurArdoise(multiplicateur);

  if(score < 20) {
    ecritResultatSurArdoise(table * multiplicateur);
    litClavier(e);
    if(!(table*multiplicateur).toString().startsWith(proposition)) {
      proposition = "";
    }
  }
  else {
    resultat.style.color = "black";

    ardoise.onclick = undefined;
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
