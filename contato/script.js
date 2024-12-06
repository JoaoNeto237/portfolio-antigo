document.getElementById('form').addEventListener('submit', function (event) {
  event.preventDefault(); // Evita o envio do formulário de forma tradicional

  // Captura os dados do formulário
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const mensagem = document.getElementById('mensagem').value;

  // Validação de nome
  if (nome.length < 3) {
      alert("Por favor, preencha o seu nome");
      return;
  }

  // Validação de email
  if (email === "" || !isEmailValid(email)) {
      alert("Por favor, preencha o seu email corretamente");
      return;
  }

  // Validação de mensagem
  if (mensagem === "") {
      alert("Por favor, escreva uma mensagem");
      return;
  }

  // Se tudo estiver correto, envia o formulário
  enviarFormulario(nome, email, mensagem);
});

// Função para validar email
function isEmailValid(email) {
  const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-z]{2,}$/);
  return emailRegex.test(email);
}

function enviarFormulario(nome, email, mensagem) {
  const formData = {
      nome: nome,
      email: email,
      mensagem: mensagem
  };

  fetch('http://localhost:3000/enviar-email', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
      if (data.status === 'success') {
          alert('Mensagem enviada com sucesso!');
      } else {
          alert('Erro ao enviar mensagem');
      }
  })
  .catch(error => {
      console.error('Erro:', error);
      alert('Erro ao enviar o e-mail. Tente novamente.');
  });
}
