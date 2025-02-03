const { run } = require('packrs');

run({
  proxy: {
    context: ['/dsapi'],
    target: 'http://localhost:3001',
    pathRewrite: {
      '^/dsapi': '',
    },
    changeOrigin: true,
    logLevel: 'silent',
  },
  rsConfig: {
    source: {
      define: {
        MOCK: JSON.stringify(true),
      },
    },
    html: {
      template: './index.html',
      title: 'admin',
      favicon: './src/images/favicon.ico',
    },
  },
});
