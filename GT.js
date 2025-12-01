// helper
  const get = id => document.getElementById(id);

  // animation helper (keeps previous approach)
  function showCardWithAnim(currentEl, nextEl) {
    if (!currentEl || !nextEl || currentEl === nextEl) {
      document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
      nextEl.classList.add('active');
      return;
    }
    nextEl.classList.add('anim-enter');
    // force reflow
    nextEl.getBoundingClientRect();

    currentEl.classList.add('anim-leave');
    requestAnimationFrame(() => {
      currentEl.classList.add('anim-leave-to');
      nextEl.classList.add('anim-enter-to');
    });

    const time = 420;
    setTimeout(() => {
      currentEl.classList.remove('active', 'anim-leave', 'anim-leave-to');
      nextEl.classList.add('active');
      nextEl.classList.remove('anim-enter', 'anim-enter-to');
    }, time);
  }

  // dynamic text definitions for IMC (exact as you provided)
  const imcTexts = {
    abaixo: `
      <p><strong>IMC abaixo de 18,5 — Abaixo do peso</strong></p>
      <p>Seu IMC indica que você está abaixo do peso. Isso pode significar que seu corpo não está recebendo todos os nutrientes necessários. É importante manter uma alimentação equilibrada e, se possível, procurar um nutricionista ou médico para uma avaliação mais detalhada.</p>
      <p><strong>Dicas gerais:</strong></p>
      <ul>
        <li>Faça refeições regulares e nutritivas.</li>
        <li>Inclua fontes de proteínas, carboidratos e gorduras boas.</li>
        <li>Evite pular refeições.</li>
      </ul>`,

    normal: `
      <p><strong>IMC entre 18,5 e 24,9 — Peso normal</strong></p>
      <p>Parabéns! Seu IMC está dentro da faixa considerada ideal. Isso significa que você está com um peso saudável em relação à sua altura.</p>
      <p><strong>Dicas para manter:</strong></p>
      <ul>
        <li>Continue com uma alimentação equilibrada.</li>
        <li>Pratique atividades físicas regularmente.</li>
        <li>Mantenha bons hábitos de sono e hidratação.</li>
      </ul>`,

    sobrepeso: `
      <p><strong>IMC entre 25,0 e 29,9 — Sobrepeso</strong></p>
      <p>Seu IMC indica sobrepeso. Diminua o consumo de ultraprocessados e bebidas açucaradas. Priorize alimentos naturais e ricos em fibras. Pratique atividades físicas regularmente.</p>
      <p>Consulte um nutricionista para um plano personalizado.</p>`,

    obes1: `
      <p><strong>IMC entre 30,0 e 34,9 — Obesidade Grau I</strong></p>
      <p>Seu IMC está na faixa de obesidade grau I. Procure orientação médica e nutricional. Estabeleça metas realistas e mantenha uma rotina de exercícios adequada ao seu nível físico.</p>`,

    obes2: `
      <p><strong>IMC entre 35,0 e 39,9 — Obesidade Grau II (severa)</strong></p>
      <p>Seu IMC indica obesidade grau II. É altamente recomendável buscar acompanhamento profissional para planejar mudanças seguras e eficazes.</p>`,

    obes3: `
      <p><strong>IMC acima de 40 — Obesidade Grau III (mórbida)</strong></p>
      <p>Seu IMC está na faixa de obesidade mórbida. Procure um médico o quanto antes. Há opções de tratamento nutricional, psicológico e, em alguns casos, cirúrgico. Mudanças graduais e acompanhamento adequado são essenciais.</p>`
  };

  // objective texts (as you provided)
  const objetivoTexts = {
    manter: (maintenance) => `
      <p><strong>🔵 Para manter o peso</strong></p>
      <p>Para manter seu peso atual, o ideal é consumir em média <strong>${maintenance} kcal/dia</strong>, equivalente ao seu gasto calórico total.</p>
      <p><strong>Dicas importantes:</strong></p>
      <ul>
        <li>Mantenha uma alimentação variada e balanceada, com boas fontes de proteínas, carboidratos complexos e gorduras boas.</li>
        <li>Beba bastante água ao longo do dia.</li>
        <li>Evite o consumo excessivo de alimentos ultraprocessados.</li>
        <li>Continue com uma rotina de atividade física regular.</li>
      </ul>
      <p>⚖️ Objetivo: manter o equilíbrio entre energia ingerida e energia gasta.</p>
    `,
    perder: (maintenance, lose) => `
      <p><strong>🟢 Para perder peso</strong></p>
      <p>Para perder peso de forma saudável, é recomendado consumir cerca de <strong>${lose} kcal/dia</strong>, ou aproximadamente 300–500 kcal a menos do que seu gasto calórico total (${maintenance} kcal/dia).</p>
      <p><strong>Dicas práticas:</strong></p>
      <ul>
        <li>Prefira alimentos naturais e nutritivos: frutas, verduras, legumes, proteínas magras e grãos integrais.</li>
        <li>Evite dietas muito restritivas; foque em déficit moderado e sustentável.</li>
        <li>Inclua exercícios de força e aeróbicos na sua rotina.</li>
        <li>Durma bem e controle o estresse.</li>
      </ul>
      <p>🔥 Objetivo: eliminar gordura corporal e melhorar a composição física com saúde e constância.</p>
    `,
    ganhar: (maintenance, gain) => `
      <p><strong>🟠 Para ganhar massa muscular</strong></p>
      <p>Se o objetivo é ganhar massa muscular, recomenda-se consumir cerca de <strong>${gain} kcal/dia</strong> (aprox. 300–500 kcal a mais que o gasto total de ${maintenance} kcal/dia).</p>
      <p><strong>Dicas essenciais:</strong></p>
      <ul>
        <li>Priorize proteínas de alta qualidade (carnes magras, ovos, peixes, leite, iogurte, leguminosas).</li>
        <li>Consuma carboidratos complexos (arroz integral, aveia, batata) para energia de treino.</li>
        <li>Inclua gorduras boas (azeite, castanhas, abacate).</li>
        <li>Faça refeições a cada 3–4 horas e mantenha treino de resistência com progressão de carga.</li>
        <li>Priorize sono e recuperação.</li>
      </ul>
      <p>💪 Objetivo: promover o crescimento muscular de forma saudável, com energia adequada e foco em qualidade nutricional.</p>
    `
  };

  // get elements
  const cardIMC = get("cardIMC");
  const cardTMB = get("cardTMB");
  const cardFinal = get("cardFinal");

  // store values
  let computedIMC = null;
  let imcCategoryKey = null;
  let computedTMB = null;
  let maintenanceCalories = null;
  let selectedObjective = null;

  // helper to set IMC title with dot
  function setIMCTitleDot(key) {
    const titleEl = get("titleIMC");
    let dotColor = "#00a86b"; // default green
    let label = "Calculo do seu IMC";
    if (key === "abaixo") { dotColor = "#00a86b"; label = "Calculo do seu IMC"; } // green
    else if (key === "normal") { dotColor = "#00a86b"; }
    else if (key === "sobrepeso") { dotColor = "#ffb300"; } // yellow
    else if (key === "obes1" || key === "obes2" || key === "obes3") { dotColor = "#e03b3b"; } // red
    // put dot colored span before text
    titleEl.innerHTML = `<span class="dot" style="background:${dotColor}"></span> ${label}`;
  }

  // IMC step
  get("btnSeguirIMC").addEventListener("click", () => {
    const pesoVal = parseFloat(get("peso").value);
    const alturaVal = parseFloat(get("altura").value) / 100;

    if (!pesoVal || !alturaVal) {
      get("resultadoIMC").textContent = "Preencha peso e altura para continuar.";
      return;
    }

    const imc = +(pesoVal / (alturaVal * alturaVal)).toFixed(1);
    computedIMC = imc;

    // define category key
    if (imc < 18.5) imcCategoryKey = 'abaixo';
    else if (imc < 24.9) imcCategoryKey = 'normal';
    else if (imc < 29.9) imcCategoryKey = 'sobrepeso';
    else if (imc < 34.9) imcCategoryKey = 'obes1';
    else if (imc < 39.9) imcCategoryKey = 'obes2';
    else imcCategoryKey = 'obes3';

    // show immediate IMC small result
    get("resultadoIMC").textContent = `Seu IMC: ${imc}`;

    // prepare final IMC text now (stored for final)
    get("textoIMC").innerHTML = imcTexts[imcCategoryKey];

    // set colored dot on title
    setIMCTitleDot(imcCategoryKey);

    // move to TMB
    showCardWithAnim(cardIMC, cardTMB);
    setTimeout(()=> get("pesoTMB").focus(), 420);
  });

  // TMB step
  get("btnSeguirTMB").addEventListener("click", () => {
    const pesoVal = parseFloat(get("pesoTMB").value);
    const alturaVal = parseFloat(get("alturaTMB").value);
    const idadeVal = parseInt(get("idadeTMB").value, 10);
    const sexoVal = get("sexoTMB").value;
    const atividadeVal = parseFloat(get("atividade").value);
    const objetivoVal = get("objetivoTMB").value;

    if (!pesoVal || !alturaVal || !idadeVal || !sexoVal || !atividadeVal || !objetivoVal) {
      get("resultadoTMB").textContent = "Preencha todos os campos (atividade e objetivo incluídos).";
      return;
    }

    // compute TMB (Harris-Benedict)
    let tmb = 0;
    if (sexoVal === "Masculino") {
      tmb = 88.36 + 13.4 * pesoVal + 4.8 * alturaVal - 5.7 * idadeVal;
    } else {
      tmb = 447.6 + 9.2 * pesoVal + 3.1 * alturaVal - 4.3 * idadeVal;
    }
    computedTMB = Math.round(tmb);

    // maintenance (TDEE) estimated by activity factor
    maintenanceCalories = Math.round(computedTMB * atividadeVal);

    // estimates for lose/gain
    const lose = Math.round(maintenanceCalories - 300);
    const gain = Math.round(maintenanceCalories + 300);

    // small immediate TMB result
    get("resultadoTMB").innerHTML = `${computedTMB} kcal (TMB). Est. manutenção: ${maintenanceCalories} kcal.`;

    // populate final TMB box
    get("valorTMB").innerHTML = `
      <p>Sua Taxa Metabólica Basal (TMB) estimada é <strong>${computedTMB} kcal/dia</strong>.</p>
      <p>Estimativa de gasto diário (usando nível de atividade selecionado): <strong>${maintenanceCalories} kcal/dia</strong>.</p>
      <p>Estimativas de objetivo:</p>
      <ul>
        <li>Perder peso: cerca de <strong>${lose} kcal/dia</strong> (déficit ~300 kcal).</li>
        <li>Manter peso: cerca de <strong>${maintenanceCalories} kcal/dia</strong>.</li>
        <li>Ganhar massa: cerca de <strong>${gain} kcal/dia</strong> (superávit ~300 kcal).</li>
      </ul>`;

    // store selected objective for final box
    selectedObjective = objetivoVal;

    // prepare objective text for final
    if (selectedObjective === "manter") {
      get("textoObjetivo").innerHTML = objetivoTexts.manter(maintenanceCalories);
    } else if (selectedObjective === "perder") {
      get("textoObjetivo").innerHTML = objetivoTexts.perder(maintenanceCalories, lose);
    } else {
      get("textoObjetivo").innerHTML = objetivoTexts.ganhar(maintenanceCalories, gain);
    }

    // move to final
    showCardWithAnim(cardTMB, cardFinal);
    setTimeout(()=> get("btnFinalizar").focus(), 420);
  });

  // Finalizar: reset everything and go back
  get("btnFinalizar").addEventListener("click", () => {
    // reset forms
    get("formIMC").reset();
    get("formTMB").reset();
    // clear stored values
    computedIMC = null;
    imcCategoryKey = null;
    computedTMB = null;
    maintenanceCalories = null;
    selectedObjective = null;
    // clear displays
    get("resultadoIMC").textContent = "";
    get("resultadoTMB").textContent = "";
    get("textoIMC").innerHTML = "";
    get("valorTMB").innerHTML = "";
    get("textoObjetivo").innerHTML = "";
    // reset IMC title
    get("titleIMC").innerHTML = "Calculo do seu IMC";
    // animate back to IMC
    showCardWithAnim(cardFinal, cardIMC);
    setTimeout(()=> get("peso").focus(), 420);
  });

  // initial focus
  window.addEventListener("load", ()=> setTimeout(()=> get("peso").focus(), 120));
