// eslint-disable-next-line @typescript-eslint/no-require-imports
const { build } = require('packrs');

build({
  dist: './docs',
  rsConfig: {
    html: {
      template: './index.html',
      title: 'Ant Admin',
      favicon: './public/favicon.ico',
    },
    resolve: {
      aliasStrategy: 'prefer-tsconfig',
    },
  },
});
