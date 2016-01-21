var repetition = 0;
var table = 7;
var multiplicateur = 1;

function operationSuivante() {
  multiplicateur = Math.ceil(Math.random()*10);
}

function ecritOperationSurArdoise(multiplicateur) {
  document.getElementById('operation').textContent= table + "x" + multiplicateur + "=";
  document.getElementById('resultat').textContent= "";
}

function ecritResultatSurArdoise(resultat){
  document.getElementById('resultat').textContent=  resultat;
}

function deplace(ardoise) {
  if(repetition > 10) {
    ardoise.style.top = Math.random() * 80 + "%";
  }
}

function centre(ardoise) {
  ardoise.style.top = '40%';
}

function boucle(e) {
  repetition += 1;

  var ardoise = document.getElementById('ardoise');
  centre(ardoise)
  ecritOperationSurArdoise(multiplicateur);
  if(repetition < 20) {
    ardoise.onclick=boucle;
    window.onkeypress=undefined;
    apprendre(ardoise);
  }
  else {
    ardoise.onclick=undefined;
    window.onkeypress=boucle;
    if(e.keyCode) {
      if(e.keyCode == 13) {
        controle();
        proposition="";
        ecritOperationSurArdoise(multiplicateur);
      }
      else {
        repetition -= 1;
        proposition += e.keyCode - 48;
        ecritResultatSurArdoise(proposition);
      }
    }
  }
  document.getElementById('repetition').textContent = repetition;
}

function apprendre(ardoise) {
  ecritResultatSurArdoise(table * multiplicateur);
  deplace(ardoise);
  operationSuivante();
}

var proposition = "";

function controle() {
  if(proposition == multiplicateur * table) {
    operationSuivante();
  }
  else {
    repetition -= 1;
  }
}
