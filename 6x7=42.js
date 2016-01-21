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
  ecritOperationSur(ardoise, multiplicateur);
  if(repetition < 20) {
    document.getElementById('ardoise').onclick=boucle;
    window.onkeypress=undefined;
    apprendre(document.getElementById('ardoise'));
  }
  else {
    document.getElementById('ardoise').onclick=undefined;
    window.onkeypress=boucle;
    if(e.keyCode)
      controle(e);
  }
  document.getElementById('repetition').textContent = repetition;
}

function apprendre(ardoise) {
  ecritResultatSur(ardoise, table * multiplicateur);
  deplace(ardoise);
  operationSuivante();
}

var proposition = "";

function controle(e) {
  var ardoise = document.getElementById('ardoise');
  if(e.keyCode == 13) {
    if(proposition == multiplicateur * table) {
      operationSuivante();
      ecritOperationSur(ardoise, multiplicateur);
    }
    else {
    }
    proposition="";
    return;
  }
  proposition += e.keyCode - 48;
  ecritResultatSur(ardoise, proposition);
}
