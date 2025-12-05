/**
 * @file config.uat.js
 * @author leon.wang
 */

module.exports = {
  port: '8000',
  proxyTable: {
    '/book-engine-uat': 'https://api-gateway2.derbysoft-test.com',
  },
};
