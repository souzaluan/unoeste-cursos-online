function verificarAutenticacao (request, response, next) {
  if (request?.session?.autenticado) {
    request.session.tentouAcessar = null;
    return next();
  }
  request.session.tentouAcessar = request.path;
  response.redirect('/login.html');
};

export default verificarAutenticacao
