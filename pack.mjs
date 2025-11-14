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
    {
      context: ['/book-engine-qa'],
      target: 'https://unifyplatform.qa.derbysoft-test.com/',
      changeOrigin: true,
      logLevel: 'silent',
    },
    {
      context: ['/book-engine-uat'],
      target: 'https://api-gateway2.derbysoft-test.com/',
      changeOrigin: true,
      logLevel: 'silent',
    },
  ],
  rsConfig: {
    html: {
      template: './index.html',
      title: 'React admin template',
    },
    server: {
      open: true,
    },
  },
});
