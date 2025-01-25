const { run } = require('packrs');
const path = require('path');

run({
  banner: 'admin',
  index: './src/index.tsx',
  dist: './dist',
  port: 3000,
  less: true,
  sass: true,
  rsConfig: {
    // resolve: {
    //   aliasStrategy: 'prefer-alias',
    //   alias: {
    //     '~': path.resolve(__dirname, 'src'),
    //   },
    // },
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
