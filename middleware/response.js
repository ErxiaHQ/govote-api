function respond(ctx, status, data, message) {
  ctx.status = status;
  ctx.body = {
    message: message || '',
    data: data
  };
  return ctx;
}

function createResponseMiddleware() {
  function patch(ctx) {
    ctx.sendJson = respond.bind(ctx, ctx, 200);
    ctx.abortJson = respond.bind(ctx, ctx, 400);
    return ctx;
  }

  function responseMiddleware(ctx, next) {
    patch(ctx);
    return next();
  }
  return responseMiddleware;
}

module.exports = createResponseMiddleware;
