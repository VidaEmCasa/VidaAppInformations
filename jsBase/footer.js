// NOVO CÓDIGO PARA /jsBase/footer.js

document.addEventListener("DOMContentLoaded", function() {
  const footerPlaceholder = document.getElementById("footer-placeholder");

  // Esta é a função que ativa todos os ícones na página.
  // Vamos garantir que ela seja chamada apenas uma vez, no momento certo.
  const activateAllIcons = () => {
    lucide.createIcons();
  };

  // Verificamos se a página atual realmente tem um lugar para o rodapé.
  if (footerPlaceholder) {
    // Se tiver, buscamos o arquivo do rodapé.
    fetch("./layoutBase/footer.html") // <-- VERIFIQUE SE ESTE CAMINHO ESTÁ CORRETO!
      .then(response => {
        // Se o arquivo não for encontrado (erro 404), gera um erro.
        if (!response.ok) {
          throw new Error('Arquivo do rodapé não encontrado.');
        }
        return response.text();
      })
      .then(data => {
        // O rodapé foi baixado com sucesso!
        // 1. Inserimos o HTML do rodapé na página.
        footerPlaceholder.innerHTML = data;
        
      })
      .catch(error => {
        // Se houver qualquer erro ao buscar o rodapé...
        console.error('Falha ao carregar o rodapé:', error);
        
      });
  }

  activateAllIcons();
});