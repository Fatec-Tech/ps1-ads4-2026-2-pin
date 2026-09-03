// Array que guarda os pacientes cadastrados (em memória, só nesta sessão)
const pacientes = [];

// Referências aos elementos do DOM que vamos usar várias vezes
const formulario = document.getElementById('form-paciente');
const tabela = document.getElementById('tabela-pacientes');

// Função responsável por adicionar um paciente ao array
function adicionarPaciente(nome, email, nascimento, idade, telefone) {
	const novoPaciente = { nome, email, nascimento, idade, telefone, idade: calcularIdade(nascimento) };
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
	return pacientes.some((paciente) => paciente.email === email);
}

// Função responsável por desenhar a tabela inteira a partir do array
function renderizarTabela() {
	tabela.innerHTML = ''; // limpa a tabela antes de redesenhar

	pacientes.forEach((paciente) => {
		const linha = document.createElement('tr');
		const contador = document.getElementById('contador-pacientes');
		contador.textContent = pacientes.length;
		


		linha.innerHTML = `
      <td>${paciente.nome}</td>
      <td>${paciente.email}</td>
      <td>${formatarData(paciente.nascimento)}</td>
	  <td>${paciente.telefone}</td>
		<td>${paciente.idade} anos</td>
    `;

		tabela.appendChild(linha);
	});
}

// Função utilitária só para formatar a data no padrão dd/mm/aaaa
function formatarData(dataISO) {
	const [ano, mes, dia] = dataISO.split('-');
	return `${dia}/${mes}/${ano}`;
}

// Evento disparado quando o formulário é enviado
formulario.addEventListener('submit', (event) => {
	event.preventDefault(); // evita o recarregamento da página
	
	const idade = calcularIdade(document.getElementById('nascimento').value);

	if (emailRepetido(email)) {
	alert('Este email já está cadastrado!');
	return;
}

	const nome = document.getElementById('nome').value;
	const email = document.getElementById('email').value;
	const nascimento = document.getElementById('nascimento').value;
	const telefone = document.getElementById('Telefone').value;
	adicionarPaciente(nome, email, nascimento, idade, telefone);
	renderizarTabela();

	formulario.reset(); // limpa os campos do formulário
});
