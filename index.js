import express from 'express';
import session from 'express-session';
import verificarAutenticacao from './middlewares/verificar-autenticacao.js'

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'my-secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000, // 1 hour
  }
}));

app.post('/login', (request, response) => {
  const { username, password } = request.body;

  if (username === 'luan' && password === '123') {
    request.session.autenticado = true;

    if (request.session.tentouAcessar) {
      response.redirect(request.session.tentouAcessar);
    } else {
      response.redirect('/painel');
    }
  } else {
    response.redirect('/credenciais-invalidas.html');
  }
});

app.get('/logout', (request, response) => {
  request.session.destroy();
  response.redirect('/login.html');
});

app.use(express.static('publico'));
app.use(verificarAutenticacao, express.static('privado'));

const APP_PORT = 3030
const HOST = '0.0.0.0'

app.listen(APP_PORT, HOST, () => {
  console.log(`O servidor está rodando em http://${HOST}:${APP_PORT}`);
});
