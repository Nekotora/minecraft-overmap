var proxy = require('http-proxy-middleware');

var options = {
  target: 'http://flag.moe/',
  changeOrigin: true,
  pathRewrite: {
    '^/p/': '/',
  },
  logLevel: "debug"
};
var proxy = proxy(options);

export { proxy };