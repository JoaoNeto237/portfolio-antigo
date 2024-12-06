// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importar pacotes necessários
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

// Inicializar o app Express
const app = express();

// Configurar CORS para permitir requisições do frontend (ajuste as origens permitidas)
const allowedOrigins = ['http://localhost:3000']; // Adicione as origens que você deseja permitir
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Origem não permitida pelo CORS"));
    }
  }
}));

// Configurar o body-parser para processar os dados enviados via POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Verificar se as variáveis de ambiente obrigatórias estão definidas
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_DESTINO) {
  console.error("⚠️ As variáveis de ambiente EMAIL_USER, EMAIL_PASS e EMAIL_DESTINO são obrigatórias!");
  process.exit(1); // Encerra o servidor caso as variáveis estejam ausentes
}

// Configuração do transporte de e-mail usando o Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use o serviço de sua escolha (exemplo: Gmail)
  auth: {
    user: process.env.EMAIL_USER, // E-mail de envio
    pass: process.env.EMAIL_PASS  // Senha do e-mail ou senha de aplicativo (se for Gmail com 2FA)
  }
});

// Rota para receber os dados do formulário e enviar e-mail
app.post('/enviar-email', (req, res) => {
  console.log("Dados recebidos:", req.body);

  const { nome, email, mensagem } = req.body;

  // Validar os campos obrigatórios
  if (!nome || !email || !mensagem) {
    return res.status(400).json({
      status: 'error',
      message: 'Todos os campos (nome, email e mensagem) são obrigatórios.'
    });
  }

  // Configurações do e-mail a ser enviado
  const emailConfig = {
    from: email, // E-mail do remetente
    to: process.env.EMAIL_DESTINO, // Destinatário (configurado no .env)
    subject: `Nova mensagem de ${nome}`, // Assunto do e-mail
    text: `Você recebeu uma nova mensagem de ${nome} (${email}):\n\n ${mensagem}` // Corpo do e-mail
  };

  // Enviar o e-mail com o Nodemailer
  transporter.sendMail(emailConfig, (error, info) => {
    if (error) {
      console.error("Erro ao enviar e-mail:", error);
      return res.status(500).json({
        status: 'error',
        message: 'Erro ao enviar o e-mail. Por favor, tente novamente mais tarde.'
      });
    }

    console.log('E-mail enviado com sucesso:', info.response);
    res.status(200).json({
      status: 'success',
      message: 'E-mail enviado com sucesso!'
    });
  });
});

// Iniciar o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
