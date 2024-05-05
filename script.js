var funcionarios = {};

function adicionarTarefa() {
    var nome = document.getElementById('nome').value;
    var tarefa = document.getElementById('tarefa').value;
    var tempoEstimado = parseInt(document.getElementById('tempo-estimado').value);
    var tempoGasto = parseInt(document.getElementById('tempo-gasto').value);

    if (nome && tarefa && tempoEstimado && tempoGasto) {
        if (!funcionarios[nome]) {
            funcionarios[nome] = {
                tarefas: [],
                saldo: 0
            };
        }

        var saldo = tempoEstimado - tempoGasto;

        funcionarios[nome].tarefas.push({
            tarefa: tarefa,
            tempoEstimado: tempoEstimado,
            tempoGasto: tempoGasto,
            saldo: saldo
        });

        document.getElementById('tarefa').value = '';
        document.getElementById('tempo-estimado').value = '';
        document.getElementById('tempo-gasto').value = '';

        alert('Tarefa adicionada com sucesso!');
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function calcularSaldo() {
    var resultado = document.getElementById('funcionarios');
    resultado.innerHTML = '';

    for (var nome in funcionarios) {
        var funcionario = funcionarios[nome];
        var saldo = 0;

        funcionario.tarefas.forEach(function(tarefa) {
            saldo += (tarefa.tempoEstimado - tarefa.tempoGasto);
        });

        funcionario.saldo = saldo;

        var emoji = saldo > 0 ? '😊' : saldo < 0 ? '😢' : '👍'; // Adicionando um joinha para saldo zero

        var funcionarioHTML = document.createElement('div');
        funcionarioHTML.classList.add('funcionario');
        funcionarioHTML.innerHTML = `
            <h3>${nome}</h3>
            <p>Saldo: <span class="${saldo >= 0 ? 'saldo-positivo' : 'saldo-negativo'}">${saldo}</span> ${emoji}</p>
            <ul>
                ${funcionario.tarefas.map(function(tarefa) {
                    return `<li>${tarefa.tarefa} - Estimado: ${tarefa.tempoEstimado} dias, Gasto: ${tarefa.tempoGasto} dias</li>`;
                }).join('')}
            </ul>
        `;

        resultado.appendChild(funcionarioHTML);
    }
}

function downloadSaldos() {
    var conteudo = "Nome do Funcionário, Saldo\n";
    for (var nome in funcionarios) {
        conteudo += `${nome}, ${funcionarios[nome].saldo}\n`;
    }

    var blob = new Blob([conteudo], { type: 'text/csv' });
    var url = URL.createObjectURL(blob);

    var link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'saldos.csv');
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}
