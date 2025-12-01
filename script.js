// Quando clicar no botão JOIN NOW, rola até a seção "WHAT WE OFFER"
document.getElementById("joinBtn").addEventListener("click", function() {
  document.querySelector(".offers").scrollIntoView({ behavior: "smooth" });
});

    const logoElement = document.getElementById('logo-text');
    const textToType = logoElement.textContent;
    logoElement.textContent = ''; // Limpa o texto inicial
    logoElement.style.visibility = 'visible'; // Torna o container visível

    let charIndex = 0;
    const typingSpeed = 100; // Tempo em milissegundos entre cada letra

    function typeWriter() {
      if (charIndex < textToType.length) {
        // Adiciona a próxima letra ao conteúdo
        logoElement.textContent += textToType.charAt(charIndex);
        charIndex++;
        // Chama a função novamente após o intervalo de tempo
        setTimeout(typeWriter, typingSpeed);
      }
    }

    // Inicia o efeito de digitação quando a página carrega
    window.onload = typeWriter; 
  