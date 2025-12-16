import { run } from 'packrs';

run({
  port: 3002,
  proxy: [
    {
      context: ['/neat-api-dev'],
      target: 'localhost:3001',
      pathRewrite: {
        '^/neat-api-dev': '',
      },
      changeOrigin: true,
      logLevel: 'silent',
    },
  ],
  rsConfig: {
    html: {
      template: './index.html',
      title: 'Neat Admin Template',
      favicon: './public/favicon.svg',
    },
    server: {
      open: true,
    },
  },
});
