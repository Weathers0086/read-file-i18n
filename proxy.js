/**
 * 请求接口：http://192.168.204.60:3000/myservice
 * */

const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// 允许所有来源跨域访问
app.use(cors());

app.use(
  '/myservice',
  createProxyMiddleware({
    target: 'http://test-kerja.kupu.id/',
    changeOrigin: true,
    pathRewrite: {
      [`^/myservice`]: '',
    }
  })
);

app.listen(3000);
