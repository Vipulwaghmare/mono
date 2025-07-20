import { Get, Post, Controller, Next, Req, Res } from '@nestjs/common';
import { fixRequestBody, createProxyMiddleware } from 'http-proxy-middleware';

const proxy = createProxyMiddleware({
  target: 'https://vipulwaghmare.com/',
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
export class PortfolioController {
  @Get('*')
  get(@Req() req, @Res() res, @Next() next) {
    proxy(req, res, next)
  }

  @Post('*')
  post(@Req() req, @Res() res, @Next() next) {
    proxy(req, res, next)
  }
}
