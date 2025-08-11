import { run } from '@derbysoft/pack';

run({
  proxy: [
    {
      context: ['/book-engine-dev'],
      target: 'localhost:3001',
      pathRewrite: {
        '^/book-engine-dev': '',
      },
      changeOrigin: true,
    },
    {
      context: ['/book-engine-qa'],
      target: 'https://unifyplatform.qa.derbysoft-test.com/',
      changeOrigin: true,
    },
    {
      context: ['/book-engine-uat'],
      target: 'https://api-gateway2.derbysoft-test.com/',
      changeOrigin: true,
    },
  ],
  rsConfig: {
    html: {
      template: './index.html',
    },
  },
});
