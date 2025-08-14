document.addEventListener('DOMContentLoaded', function() {
    const quantidadeInput = document.getElementById('quantidade');
    const adicionarBtn = document.getElementById('adicionar');
    const removerBtn = document.getElementById('remover');
    const precoUnitario = document.getElementById('preco-unitario');
    const totalElement = document.getElementById('valor-total');
    const vagasDisponiveis = document.getElementById('vagas-disponiveis');

    const precoBase = parseFloat(precoUnitario.getAttribute('data-valor'));
    const maxVagas = parseInt(vagasDisponiveis.getAttribute('data-vagas'));

    function atualizarTotal() {
        const quantidade = parseInt(quantidadeInput.value);
        const total = quantidade * precoBase;

        totalElement.textContent = total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        const botaoInscrever = document.getElementById('btn-inscrever');
        if (quantidade > 0) {
            botaoInscrever.classList.remove('disabled');
        } else {
            botaoInscrever.classList.add('disabled');
        }
    }

    if (adicionarBtn) {
        adicionarBtn.addEventListener('click', function() {
            const valorAtual = parseInt(quantidadeInput.value);
            if (valorAtual < maxVagas) {
                quantidadeInput.value = valorAtual + 1;
                atualizarTotal();
            }
        });
    }

    if (removerBtn) {
        removerBtn.addEventListener('click', function() {
            const valorAtual = parseInt(quantidadeInput.value);
            if (valorAtual > 1) {
                quantidadeInput.value = valorAtual - 1;
                atualizarTotal();
            }
        });
    }

    if (quantidadeInput) {
        quantidadeInput.addEventListener('change', function() {
            let valor = parseInt(this.value);

            if (isNaN(valor)) {
                valor = 1;
            }

            if (valor < 1) {
                valor = 1;
            } else if (valor > maxVagas) {
                valor = maxVagas;
            }

            this.value = valor;
            atualizarTotal();
        });

        atualizarTotal();
    }

    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            const quantidade = parseInt(quantidadeInput.value);

            if (quantidade <= 0 || quantidade > maxVagas) {
                event.preventDefault();
                alert('Por favor, selecione uma quantidade válida de vagas.');
            }
        });
    }
});
