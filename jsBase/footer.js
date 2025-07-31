// Arquivo: /jsBase/footer.js (VERSÃO FINAL)

document.addEventListener("DOMContentLoaded", function() {
    
    // Função para avisar a página que os ícones foram renderizados
    const notifyIconsRendered = () => {
        document.dispatchEvent(new CustomEvent('iconsRendered'));
    };

    // 1ª ATIVAÇÃO: Ícones da página principal
    lucide.createIcons();
    notifyIconsRendered(); // Avisa que a primeira leva de ícones está pronta

    const footerPlaceholder = document.getElementById("footer-placeholder");

    if (footerPlaceholder) {
        fetch("../layoutBase/footer.html")
            .then(response => {
                if (!response.ok) throw new Error('Rodapé não encontrado.');
                return response.text();
            })
            .then(data => {
                footerPlaceholder.innerHTML = data;
                
                // 2ª ATIVAÇÃO: Ícones do rodapé que acabaram de ser adicionados
                lucide.createIcons();
                notifyIconsRendered(); // Avisa novamente, caso algo precise reagir aos novos ícones
            })
            .catch(error => console.error('Falha ao carregar o rodapé:', error));
    }
});