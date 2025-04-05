const {run} = require('packrs');


run({
  proxy: [
    {
      context: ['/fadadaProxyApi'],
      target: 'http://localhost:3002',
      pathRewrite: {
        '^/fadadaProxyApi': '',
      },
      changeOrigin: true,
      logLevel: 'silent',
    },
    {
      context: ['/proxyApi'],
      target: 'http://localhost:3001',
      pathRewrite: {
        '^/proxyApi': '',
      },
      changeOrigin: true,
      logLevel: 'silent',
    },
    {
      context: ['/e-sign'],
      target: 'http://localhost:3002',
      pathRewrite: {
        '^/e-sign': '',
      },
      changeOrigin: true,
      logLevel: 'silent',
    },
  ],
  rsConfig: {
    source: {
      define: {
        MOCK: JSON.stringify(false),
      },
    },
    html: {
      template: './index.html',
      title: 'admin',
      favicon: './src/images/favicon.ico',
      templateParameters: {
        // https://developers.docusign.com/docs/esign-rest-api/esign101/concepts/embedding/docusign-js-embedded-reference/#introduction
        docusignApiTag: '-d',
      },
    },
    performance: {
      buildCache: true
    }
  },
});
