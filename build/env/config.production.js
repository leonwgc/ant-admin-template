/**
 * @file config.production.js
 * @author leon.wang
 */

module.exports = {
  port: '8000',

  proxyTable: {
    '/book-engine': 'https://xxxx',
  },
};
