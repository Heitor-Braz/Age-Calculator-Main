const formulario = document.querySelector('form');
const campoDia = document.getElementById('day');
const campoMes = document.getElementById('month');
const campoAno = document.getElementById('year');
const anoSpan = document.querySelector('.year');
const mesSpan = document.querySelector('.month');
const diaSpan = document.querySelector('.day');

function esconderMensagensDeErro() {
  var mensagensDeErro = document.querySelectorAll('.field-required');
  for (var i = 0; i < mensagensDeErro.length; i++) {
    mensagensDeErro[i].classList.add('hide');
  }

  var mensagensValidacao = document.querySelectorAll('.valid-info');
  for (var j = 0; j < mensagensValidacao.length; j++) {
    mensagensValidacao[j].classList.add('hide');
  }
}

function mostrarErro(input, mensagem) {
  var spanErro = input.nextElementSibling;
  spanErro.classList.remove('hide');
  spanErro.textContent = mensagem;
}

function validarFormulario() {
  var dia = parseInt(campoDia.value);
  var mes = parseInt(campoMes.value) - 1; 
  var ano = parseInt(campoAno.value);
  var hoje = new Date();

  var valido = true;


  if (!dia || dia < 1 || dia > 31) {
    mostrarErro(campoDia, 'Dia inválido');
    valido = false;
  }


  if (mes < 0 || mes > 11) { 
    mostrarErro(campoMes, 'Mês inválido');
    valido = false;
  }


  if (!ano || ano > hoje.getFullYear() || (ano === hoje.getFullYear() && mes > hoje.getMonth()) || (ano === hoje.getFullYear() && mes === hoje.getMonth() && dia > hoje.getDate())) {
    mostrarErro(campoAno, 'O ano não pode ser no futuro');
    valido = false;
  }


  if (ano < 1910) {
    mostrarErro(campoAno, 'O ano de nascimento não pode ser antes de 1910');
    valido = false;
  }

  return valido;
}

function calcularIdade() {
  var dia = parseInt(campoDia.value);
  var mes = parseInt(campoMes.value) - 1 ; // Ajuste para o mês (0-11)
  var ano = parseInt(campoAno.value);

  var dataNascimento = new Date(ano, mes, dia);
  var hoje = new Date();

  var idade = hoje - dataNascimento;
  var idadeData = new Date(idade);

  var anos = idadeData.getUTCFullYear() - 1970;
  var meses = hoje.getMonth() - mes;
  var dias = hoje.getDate() - dia;


  var mesesFinais = meses < 0 ? 12 + meses : meses;
  var diasFinais = dias < 0 ? new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate() + dias : dias;

  anoSpan.textContent = anos;
  mesSpan.textContent = mesesFinais;
  diaSpan.textContent = diasFinais;
}

function aoSubmeterFormulario(evento) {
  evento.preventDefault();

  esconderMensagensDeErro();

  if (validarFormulario()) {
    calcularIdade();
  }
}

formulario.addEventListener('submit', aoSubmeterFormulario);