const { run } = require('packrs');

run({
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
