const form = document.getElementById('form');
const nome = document.querySelector('#nome');
const email = document.querySelector('#email');
const mensagem = document.querySelector('#mensagem');
const btn = document.querySelector('#btn');

form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Validação de nome
    if (nome.value.length < 3) {
        alert("Por favor, preencha o seu nome");
        return;
    }

    // Validação de email
    if (email.value === "" || !isEmailValid(email.value)) {
        alert("Por favor, preencha o seu email corretamente");
        return;
    }

    // Validação de mensagem
    if (mensagem.value === "") {
        alert("Por favor, escreva uma mensagem");
        return;
    }

    // Se tudo estiver correto, envia o formulário via fetch
    enviarFormulario(nome.value, email.value, mensagem.value);
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
