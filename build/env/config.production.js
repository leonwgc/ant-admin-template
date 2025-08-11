/**
 * @file config.production.js
 * @author leon.wang(leon.wang@derbysoft.net)
 */

module.exports = {

    port: '8000',

    proxyTable: {
        '/book-engine': 'https://sso-gateway-us-west-2.derbysoftsec.com'
    }

};
