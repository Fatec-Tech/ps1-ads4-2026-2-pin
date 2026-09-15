// Array que guarda os pacientes cadastrados (em memória, só nesta sessão)
const pacientes = [];

// Referências aos elementos do DOM que vamos usar várias vezes
const formulario = document.getElementById('form-paciente');
const tabela = document.getElementById('tabela-pacientes');
const contadorPacientes = document.getElementById('contador-pacientes');

// Função responsável por adicionar um paciente ao array
function adicionarPaciente(nome, email, nascimento, telefone) {
	const novoPaciente = { nome, email, nascimento, telefone, };
	pacientes.push(novoPaciente);
}

function calcularIdade(nascimento) {
	const dataNascimento = new Date(nascimento);
	const dataAtual = new Date();

	let idade = dataAtual.getFullYear() - dataNascimento.getFullYear();
	const mes = dataAtual.getMonth() - dataNascimento.getMonth();

	if (mes < 0 || (mes === 0 && dataAtual.getDate() < dataNascimento.getDate())) {
		idade--;
	}

	return idade;
}

function emailRepetido(email) {
	const emailNormalizado = email.trim().toLowerCase();
	return pacientes.some((paciente) => paciente.email.trim().toLowerCase() === emailNormalizado);
}

// Função responsável por desenhar a tabela inteira a partir do array
function renderizarTabela() {
	tabela.innerHTML = ''; // limpa a tabela antes de redesenhar
	contadorPacientes.textContent = pacientes.length; // atualiza o contador de pacientes

	pacientes.forEach((paciente) => {
		const linha = document.createElement('tr');

		linha.innerHTML = `
      <td>${paciente.nome}</td>
      <td>${paciente.email}</td>
      <td>${formatarData(paciente.nascimento)}</td>
      <td>${calcularIdade(paciente.nascimento)}</td>
	  <td>${paciente.telefone}</td>
	  <td><button class="btn-excluir">Excluir</button></td>
    `;

		tabela.appendChild(linha);
	});
}

// Função utilitária para calcular a idade a partir da data de nascimento
function calcularIdade(dataISO) {
	const nascimento = new Date(`${dataISO}T00:00:00`);
	const hoje = new Date();

	let idade = hoje.getFullYear() - nascimento.getFullYear();
	const mesAtual = hoje.getMonth();
	const mesNascimento = nascimento.getMonth();
	const diaAtual = hoje.getDate();
	const diaNascimento = nascimento.getDate();

	if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
		idade--;
	}

	return idade;
}

// Função utilitária só para formatar a data no padrão dd/mm/aaaa
function formatarData(dataISO) {
	const [ano, mes, dia] = dataISO.split('-');
	return `${dia}/${mes}/${ano}`;
}

// Evento disparado quando o formulário é enviado
formulario.addEventListener('submit', (event) => {
	event.preventDefault(); // evita o recarregamento da página

	const nome = document.getElementById('nome').value;
	const email = document.getElementById('email').value;
	const nascimento = document.getElementById('nascimento').value;
	const telefone = document.getElementById('Telefone').value;

	if (emailRepetido(email)) {
		alert('Esse e-mail já está cadastrado!');
		return;
	}

	adicionarPaciente(nome, email, nascimento, telefone);
	renderizarTabela();

	formulario.reset(); // limpa os campos do formulário
});

// Evento disparado quando um botão de excluir é clicado
tabela.addEventListener('click', (event) => {
	if (event.target.classList.contains('btn-excluir')) {
		const linha = event.target.closest('tr');
		const email = linha.cells[1].textContent; // pega o email da célula correspondente
		removerPacientePorEmail(email); // remove o paciente do array
		renderizarTabela(); // redesenha a tabela
	}
});

function removerPacientePorEmail(email) {
	const index = pacientes.findIndex((paciente) => paciente.email === email);

	if (index !== -1) {
		pacientes.splice(index, 1);
	}
}
