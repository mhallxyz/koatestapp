const Koa = require('koa');
const app = new Koa();

let ms = null;

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  // Test for latency
  // ms = Date.now() - start;
  ms = 40;
  console.log(`Response Delay: ${ctx.method} ${ctx.url} - ${ms}`);
});

// response

  let latency = (time) => {
    if (time <10) {
      return {key: "123456789"}
    } else {
      return `Latency is too high to use this app. Last check ${ms}ms`
    }
  }

app.use(async ctx => {
  ctx.body = ms === undefined || null ? `Test server active. Refresh to find the delay` : latency(ms);
});

app.listen(3000);