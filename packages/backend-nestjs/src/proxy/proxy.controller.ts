import { All, Controller, Next, Req, Res } from '@nestjs/common';
import { fixRequestBody, legacyCreateProxyMiddleware } from 'http-proxy-middleware';

const proxy = legacyCreateProxyMiddleware({
  target: 'http://127.0.0.1:8000',
  changeOrigin: false, // Ensures correct Host header
  pathRewrite: (path, req) => path.replace(/^\/proxy/, ''), // Removes "/proxy" from path
  on: {
    proxyReq: fixRequestBody,
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
  },
})

@Controller('proxy')
export class ProxyController {

  constructor() {

  }

  @All('*')
  get(@Req() req, @Res() res, @Next() next) {
    console.log('wow')

    proxy(req, res, next)
  }
}
