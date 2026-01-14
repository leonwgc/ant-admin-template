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
      title: 'React Neat Starter',
      favicon: './public/favicon.ico',
    },
    server: {
      open: true,
    },
  },
});
