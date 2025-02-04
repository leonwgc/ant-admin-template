const { run } = require('packrs');

run({
  proxy: {
    context: ['/proxyApi'],
    target: 'http://localhost:3001',
    pathRewrite: {
      '^/proxyApi': '',
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
