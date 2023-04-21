const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.use(
  '/myservice',
  createProxyMiddleware({
    target: 'http://m.aoyou.com/api/GetApiData',
    // changeOrigin: true,
    pathRewrite: {
      [`^/myservice`]: '',
    },
    onProxyReq: function onProxyReq(proxyReq, req, res) {
      console.log('111', req.method, req.baseUrl, '---->', proxyReq.host + proxyReq.path);
    },
    onProxyRes: function onProxyReq(proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*"; // 或者直接写"http://localhost:3000"成为唯一好友
    }
  })
);

app.listen(3000);
