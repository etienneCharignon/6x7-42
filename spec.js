describe('Le jeu', function() {
  beforeEach(function() {
    spyOn(window, 'cEstBon');
  });

  describe("en mode apprentissage", function() {
    it("fait bouger l'ardoise après le score 10", function() {
      $(document.body).append("<div id='ardoise'></div>");
      var ardoise = $('#ardoise');
      score = 8;
      ardoise.css('top', "40%");
      passeALOperationSuivante();
      expect(ardoise.css('top')).toBe('40%');

      score = 9;
      ardoise.css('top', "40%");
      passeALOperationSuivante();
      expect(ardoise.css('top')).not.toBe('40%');
    });

    it("change d'opération quand on clique sur l'ardoise", function() {
      clicArdoise();
      expect(window.cEstBon).toHaveBeenCalled();
    });
  });

  describe('en mode examen', function(){
    beforeEach(function() {
      score = 20;
    });

    it("quand on clique sur l'ardoise, reste sur l'opération en cours", function() {
      clicArdoise();
      expect(window.cEstBon).not.toHaveBeenCalled();
    });

    it("si la proposition est bonne, incrémente le score et propose une nouvelle opération", function(){
      multiplicateur = 1;
      proposition = "7";

      boucle();

      expect(window.cEstBon).toHaveBeenCalled();

      passeALOperationSuivante();

      expect(score).toBe(21);
      expect(multiplicateur).not.toBe(1);
    });

    it("affiche le résultat tapé", function() {
      proposition = "";
      multiplicateur = 2;

      entreeChiffre('1');
      expect(proposition).toBe("1");
      expect(score).toBe(20);
      entreeChiffre('4');
      expect(proposition).toBe("");
      expect(score).toBe(20);
    });
  });

  describe('score', function() {
    it("Devrait afficher un fond de plus en plus rouge quand le score augmente", function() {
      expect(opacite(0)).toBe(1);
      expect(opacite(30)).toBe(0);
    });
  });
});
