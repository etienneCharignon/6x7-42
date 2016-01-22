var score = 0;
var table = 7;
var multiplicateur = 1;
var proposition = "";

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
  $('#resultat').text(resultat);
}

function deplace(ardoise) {
  if(score > 9) {
    var anciennePosition = ardoise.style.top;
    while(ardoise.style.top == anciennePosition) {
      ardoise.style.top = Math.random() * 80 + "%";
    }
  }
}

function centre(ardoise) {
  ardoise.style.top = '40%';
}

function pourcentage(score) {
  return 1.0 / 30 * (30 - score);
}

function afficheScore() {
  $('#tableau').css('background-color', "rgba(255, 255, 255, "+ pourcentage(score) +")");
  $('#score').text(score);
}

function boucle(e) {

  var ardoise = document.getElementById('ardoise');
  centre(ardoise)
  ecritOperationSurArdoise(multiplicateur);
  if(score < 20) {
    ardoise.onclick=boucle;
    window.onkeypress=undefined;
    apprendre(ardoise);
    score += 1;
  }
  else {
    ardoise.onclick=undefined;
    window.onkeypress=boucle;
    $('#resultat').css('color', "black");
    if(e.keyCode) {
      if(e.keyCode == 13) {
        controle();
        proposition="";
        ecritOperationSurArdoise(multiplicateur);
      }
      else {
        proposition += e.keyCode - 48;
        ecritResultatSurArdoise(proposition);
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
  if(proposition == multiplicateur * table) {
    operationSuivante();
    score += 1;
  }
}
