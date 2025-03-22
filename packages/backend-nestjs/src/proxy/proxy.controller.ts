import { All, Controller, Next, Req, Res } from '@nestjs/common';
import { fixRequestBody, createProxyMiddleware } from 'http-proxy-middleware';

const proxy = createProxyMiddleware({
  target: 'https://9ec4a2d6.personal-portfolio-62x.pages.dev/',
  changeOrigin: true, // Ensures correct Host header
  pathRewrite: (path, req) => path.replace(/^\/portfolio/, ''), // Removes "/portfolio" from path
  on: {
    proxyReq: fixRequestBody,
    error: (err, req, res) => {
      console.error(err);
    }
  },
})

@Controller('portfolio')
export class ProxyController {

  constructor() {

  }

  @All('*')
  get(@Req() req, @Res() res, @Next() next) {
    proxy(req, res, next)
  }
}
