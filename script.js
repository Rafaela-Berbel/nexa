/* NEXA | Projeto Nebulosas — script.js
   Quiz interativo reutilizável (questão de vestibular e demo do jogo).
   Sem dependências. Funciona também sem JS: o gabarito (<details>) continua acessível. */
(function () {
  "use strict";

  document.querySelectorAll("[data-quiz]").forEach(function (quiz) {
    var opcoes = quiz.querySelectorAll(".alt");
    var feedback = quiz.querySelector(".feedback");
    var reiniciar = quiz.querySelector(".btn-reiniciar");
    var jogo = quiz.closest(".jogo");
    var pontosEl = jogo ? jogo.querySelector("[data-pontos]") : null;
    var medalha = quiz.querySelector(".medalha");
    var valor = parseInt(quiz.getAttribute("data-valor") || "0", 10);
    var respondida = false;

    function responder(botao) {
      if (respondida) return;
      respondida = true;

      var acertou = botao.hasAttribute("data-correta");

      opcoes.forEach(function (op) {
        op.disabled = true;
        if (op.hasAttribute("data-correta")) op.classList.add("correta");
      });
      if (!acertou) botao.classList.add("errada");

      if (feedback) {
        var prefixo = acertou ? "Correto! " : "Ainda não. ";
        feedback.textContent =
          prefixo + (botao.getAttribute("data-feedback") || "");
        feedback.className = "feedback " + (acertou ? "ok" : "erro");
        feedback.hidden = false;
      }

      if (acertou && pontosEl && valor) {
        pontosEl.textContent = String(
          parseInt(pontosEl.textContent, 10) + valor
        );
      }
      if (acertou && medalha) medalha.hidden = false;
      if (reiniciar) reiniciar.hidden = false;
    }

    function recomecar() {
      respondida = false;
      opcoes.forEach(function (op) {
        op.disabled = false;
        op.classList.remove("correta", "errada");
      });
      if (feedback) feedback.hidden = true;
      if (medalha) medalha.hidden = true;
      if (reiniciar) reiniciar.hidden = true;
      if (pontosEl) pontosEl.textContent = "0";
    }

    opcoes.forEach(function (op) {
      op.addEventListener("click", function () {
        responder(op);
      });
    });
    if (reiniciar) reiniciar.addEventListener("click", recomecar);
  });
})();
