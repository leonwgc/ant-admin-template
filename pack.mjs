import { run } from 'packrs';

run({
  port: 3002,
  proxy: [
    {
      context: ['/book-engine-dev'],
      target: 'localhost:3001',
      pathRewrite: {
        '^/book-engine-dev': '',
      },
      changeOrigin: true,
      logLevel: 'silent',
    },
  ],
  rsConfig: {
    html: {
      template: './index.html',
      title: 'React Playground',
      favicon: './public/favicon.svg',
    },
    server: {
      open: true,
    },
  },
});
