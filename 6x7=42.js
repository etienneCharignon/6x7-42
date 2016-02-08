var score = 0;
var table = 7;
var multiplicateur = 1;
var proposition = "";

function choisisNouvelleOperation() {
  var multiplicateurCourant = multiplicateur;
  while(multiplicateur == multiplicateurCourant) {
    multiplicateur = Math.ceil(Math.random()*10);
  }
}

function ecritOperationSurArdoise(multiplicateur) {
  $('#operation').text(table + "x" + multiplicateur + "=");
  $('#resultat').text("");
}

function ecrisSurArdoise(resultat){
  $('#resultat').text(resultat);
}

function deplace(ardoise) {
  if(modeApprentissage() && score > 9) {
    var anciennePosition = ardoise.css('top');
    while(ardoise.css('top') == anciennePosition) {
      ardoise.css('top', Math.random() * 80 + "%");
    }
  }
}

function centre($ardoise) {
  $ardoise.css('top', '40%');
}

function opacite(score) {
  return 1.0 / 30 * (30 - score);
}

function ecrisScore() {
  $('#tableau').css('background-color', "rgba(255, 255, 255, "+ opacite(score) +")");
  $('#score').text(score);
}

function passeALOperationSuivante() {
  var $ardoise = $('#ardoise');
  choisisNouvelleOperation();
  proposition="";
  score += 1;
  ecrisScore();
  centre($ardoise)
  boucle();
  deplace($ardoise);
}

function entreeChiffre(chiffre) {
  proposition += chiffre;

  boucle();
}

function modeApprentissage() {
  return score < 20;
}

function boucle() {
  ecritOperationSurArdoise(multiplicateur);

  if(modeApprentissage()) {
    ecrisSurArdoise(resultatAttendu());
    if(!resultatAttendu().toString().startsWith(proposition)) {
      proposition = "";
    }
  } else {
    $('#resultat').css('color', "black");
    ecrisSurArdoise(proposition);
  }
  if(proposition == resultatAttendu()) {
    cEstBon();
  }
  if (proposition.length >= 2){
    proposition="";
  }
}

function cEstBon() {
}

function clicArdoise() {
  if(modeApprentissage()) {
    cEstBon();
  }
}

function resultatAttendu() {
  return table*multiplicateur;
}
