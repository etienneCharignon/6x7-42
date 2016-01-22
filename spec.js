describe('controle', function(){
  it("Devrait incrémenter le score si la proposition est bonne et proposer une nouvelle opération", function(){
    score = 1;
    multiplicateur = 1;
    proposition = "7";

    controle();

    expect(score).toBe(2);
    expect(multiplicateur).not.toBe(1);
  });
});

describe('apprendre', function() {
  it("Devrait faire bouger l'ardoise après le score 10", function() {
    $(document.body).append("<div id='ardoise'></div>");
    var ardoise = $('#ardoise');
    score = 9;
    ardoise.css('top', "40%");
    boucle();
    expect(ardoise.css('top')).toBe('40%');

    score = 10;
    ardoise.css('top', "40%");
    boucle();
    expect(ardoise.css('top')).not.toBe('40%');
  });
});

describe('score', function() {
  it("Devrait afficher un fond de plus en plus rouge quand le score augmente", function() {
    expect(pourcentage(0)).toBe(1);
    expect(pourcentage(30)).toBe(0);
  });
});
