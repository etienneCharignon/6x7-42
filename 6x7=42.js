var repetition = 0;
var table = 7;
var multiplicateur = 1;

function operationSuivante() {
  multiplicateur = Math.ceil(Math.random()*10);
}

function ecritOperationSur(ardoise, multiplicateur) {
  ardoise.textContent= table + "x" + multiplicateur + "=";
}

function ecritResultatSur(ardoise, resultat){
  ardoise.textContent=  ardoise.textContent + resultat;
}

function deplace(ardoise) {
  if(repetition > 10) {
    ardoise.style.top = Math.random() * 80 + "%";
  }
}

function boucle(e) {
  repetition += 1;

  var ardoise = document.getElementById('ardoise');
  ecritOperationSur(ardoise, multiplicateur);
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
      }
      else {
        repetition -= 1;
        proposition += e.keyCode - 48;
        ecritResultatSur(ardoise, proposition);
      }
    }
  }
  document.getElementById('repetition').textContent = repetition;
}

function apprendre(ardoise) {
  ecritResultatSur(ardoise, table * multiplicateur);
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
  proposition="";
}
